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
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { MeasureService } from '../../../services/measure-service/measure.service';
import { EstimateCarbonFootprintService } from '../../../services/estimate-carbon-footprint-service/estimate-carbon-footprint.service';

@Component({
  selector: 'app-bus-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FloatLabelModule,
    InputNumberModule,
    ButtonModule,
  ],
  templateUrl: './bus-form.component.html',
  styleUrl: './bus-form.component.scss',
})
export class BusFormComponent {
  busTravelForm!: FormGroup;
  busTravel: number = 0;
  busTravelUnit: string = '';
  busTravelDistance: number = 0;

  constructor(

    private fb: FormBuilder,
    private estimateCarbonFootprintService: EstimateCarbonFootprintService,
    private measureService: MeasureService
  ) { }

  ngOnInit(): void {
    const savedBusTravel = localStorage.getItem('busTravelData');
    if (savedBusTravel) {
      const parsedData = JSON.parse(savedBusTravel);
      this.busTravel = parsedData.busTravel;
      this.busTravelUnit = parsedData.busTravelUnit;
      this.busTravelDistance = parsedData.busTravelDistance;
    }

    this.busTravelForm = this.fb.group({
      distance: [null, [Validators.required, Validators.min(1)]],
    });
  }

  get currentMonth() {
    return this.measureService.currentMonth;
  }


  onSubmitTravel() {
    const options = [
      {
        name: 'distance',
        activityId:
          'passenger_vehicle-vehicle_type_bus-fuel_source_na-engine_size_na-vehicle_age_na-vehicle_weight_na',
      },
    ];

    const additionalParameters = {
      passengers: 1,
      distance_unit: 'km',
    };

    this.estimateCarbonFootprintService
      .onSubmitForm(
        this.busTravelForm,
        options,
        'distance',
        'busTravelData',
        additionalParameters
      )
      .subscribe({
        next: (data) => {
          console.log('Estimación de huella de carbono viaje doméstico:', data);

          this.busTravel = data.totalCarbon;
          this.busTravelUnit = data.carbonUnit;
          this.busTravelDistance = this.busTravelForm.value.distance;

          const busTravelData = {
            busTravel: this.busTravel,
            busTravelUnit: this.busTravelUnit,
            busTravelDistance: this.busTravelDistance,
            month: this.currentMonth,
          };

          localStorage.setItem('busTravelData', JSON.stringify(busTravelData));
        },
        error: (error) => {
          console.error('Error en la estimación de huella de carbono:', error);
        },
      });
  }
}

