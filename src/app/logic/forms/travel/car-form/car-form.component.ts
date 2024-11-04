import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { MeasureService } from '../../../services/measure-service/measure.service';
import { environment } from '../../../../../environments/environment';
import { UtilsService } from '../../../services/utils-service/utils.service';
import { EstimateCarbonFootprintService } from '../../../services/estimate-carbon-footprint-service/estimate-carbon-footprint.service';

@Component({
  selector: 'app-car-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DropdownModule,
    FloatLabelModule,
    InputNumberModule,
    ButtonModule,
  ],
  templateUrl: './car-form.component.html',
  styleUrl: './car-form.component.scss',
})
export class CarFormComponent {
  carTravelForm!: FormGroup;
  carTravel: number = 0;
  carTravelUnit: string = '';


  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private measureService: MeasureService,
    private utilsService: UtilsService,
    private estimateCarbonFootprintService: EstimateCarbonFootprintService,
  ) {
    this.carTravelForm = this.fb.group({
      fuelType: [null, [Validators.required]],
      distance: [null, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    const savedCarTravel = localStorage.getItem('carTravelData');
    if (savedCarTravel) {
      const parsedData = JSON.parse(savedCarTravel);
      this.carTravel = parsedData.carTravel;
      this.carTravelUnit = parsedData.carTravelUnit;
    }
  }

  get currentMonth() {
    return this.measureService.currentMonth;
  }

  get fuelTypes(){
    return this.utilsService.fuelTypes;
  }


  onSubmitTravel() {
    const options = [
      {
        name: 'distance',
        activityId: this.utilsService.getFuelActivityId(this.carTravelForm.value.fuelType),
      },
    ];

    const additionalParameters = {
      distance_unit: 'km',
    };

    this.estimateCarbonFootprintService
    .onSubmitForm(this.carTravelForm, options, 'distance', 'carTravelData', additionalParameters)
    .subscribe({
      next: (data) => {
        console.log('Estimación de huella de carbono viaje doméstico:', data);
        this.carTravel = data.totalCarbon;
        this.carTravelUnit = data.carbonUnit;

        const carTravelData = {
          carTravel: this.carTravel,
          carTravelUnit: this.carTravelUnit,
          month: this.currentMonth,
        };
        localStorage.setItem('carTravelData', JSON.stringify(carTravelData));
      },
      error: (error) => {
        console.error('Error en la estimación de huella de carbono:', error);
      },
    });
  }

}
