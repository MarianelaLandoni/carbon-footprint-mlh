import { CommonModule } from '@angular/common';
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
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { MeasureService } from '../../../services/measure-service/measure.service';
import { UtilsService } from '../../../services/utils-service/utils.service';
import { EstimateCarbonFootprintService } from '../../../services/estimate-carbon-footprint-service/estimate-carbon-footprint.service';

@Component({
  selector: 'app-rail-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SelectButtonModule,
    RadioButtonModule,
    FloatLabelModule,
    InputNumberModule,
    ButtonModule,
  ],
  templateUrl: './rail-form.component.html',
  styleUrl: './rail-form.component.scss',
})
export class RailFormComponent {
  railTravelForm!: FormGroup;
  railTravel: number = 0;
  railTravelUnit: string = '';


  constructor(
    private fb: FormBuilder,
    private measureService: MeasureService,
    private utilsService: UtilsService,
    private estimateCarbonFootprintService: EstimateCarbonFootprintService
  ) {
    this.railTravelForm = this.fb.group({
      transportMode: [null, [Validators.required]],
      trainType: [null],
      passengers: [null, [Validators.required, Validators.min(1)]],
      distance: [null, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    const savedRailTravel = localStorage.getItem('railTravelData');
    if (savedRailTravel) {
      const parsedData = JSON.parse(savedRailTravel);
      this.railTravel = parsedData.railTravel;
      this.railTravelUnit = parsedData.railTravelUnit;
    }

    this.railTravelForm.get('transportMode')?.valueChanges.subscribe((mode) => {
      const trainTypeControl = this.railTravelForm.get('trainType');
      if (mode === 'train') {
        trainTypeControl?.setValidators([Validators.required]);
      } else {
        trainTypeControl?.clearValidators();
      }
      trainTypeControl?.updateValueAndValidity();
    });
  }

  get isTrain() {
    return this.railTravelForm.get('transportMode')?.value === 'train';
  }

  get currentMonth() {
    return this.measureService.currentMonth;
  }

  get railTransportOptions(){
    return this.utilsService.railTransportOptions;
  }

  get trainTypes(){
    return this.utilsService.trainTypes;
  }


  onSubmitTravel() {

    const transportMode = this.railTravelForm.value.transportMode;
    const trainType = this.railTravelForm.value.trainType;
    const options = [
      {
        name: 'distance',
        activityId: this.utilsService.getRailActivityId(transportMode, trainType),
      },
    ];

    const additionalParameters = {
      passengers: this.railTravelForm.value.passengers,
      distance: this.railTravelForm.value.distance,
      distance_unit: 'km',
    };

    this.estimateCarbonFootprintService
      .onSubmitForm(
        this.railTravelForm,
        options,
        'distance',
        'airTravelData',
        additionalParameters
      )
      .subscribe({
        next: (data) => {
          this.railTravel = data.totalCarbon;
          this.railTravelUnit = data.carbonUnit;

          const railTravelData = {
            airTravel: this.railTravel,
            airTravelUnit: this.railTravelUnit,
            month: this.currentMonth,
          };

          localStorage.setItem('railTravelData', JSON.stringify(railTravelData));
        },
        error: (error) => {
          console.error('Error en la estimación de huella de carbono:', error);
        },
      });
  }
}
