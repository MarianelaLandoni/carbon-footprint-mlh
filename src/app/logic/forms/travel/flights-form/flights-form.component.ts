import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { MeasureService } from '../../../services/measure-service/measure.service';
import { EstimateCarbonFootprintService } from '../../../services/estimate-carbon-footprint-service/estimate-carbon-footprint.service';

@Component({
  selector: 'app-flights-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FloatLabelModule,
    InputNumberModule,
    CheckboxModule,
    ButtonModule,
  ],
  templateUrl: './flights-form.component.html',
  styleUrl: './flights-form.component.scss',
})
export class FlightsFormComponent implements OnInit {
  airTravelForm!: FormGroup;
  airTravel: number = 0;
  airTravelUnit: string = '';


  constructor(
    private fb: FormBuilder,
    private measureService: MeasureService,
    private estimateCarbonFootprintService: EstimateCarbonFootprintService
  ) {
    this.airTravelForm = this.fb.group({
      passengers: [null, [Validators.required, Validators.min(1)]],
      distance: [null, [Validators.required, Validators.min(1)]],
      isFirstClass: [false],
    });
  }

  ngOnInit(): void {
    const savedAirTravel = localStorage.getItem('airTravelData');
    if (savedAirTravel) {
      const parsedData = JSON.parse(savedAirTravel);
      this.airTravel = parsedData.airTravel;
      this.airTravelUnit = parsedData.airTravelUnit;
    }
  }

  get currentMonth(){
    return this.measureService.currentMonth;
  }

  get isFirstClass() {
    return this.airTravelForm.get('isFirstClass')?.value[0]
      ? 'passenger_flight-route_type_outside_uk-aircraft_type_na-distance_na-class_first-rf_excluded-distance_uplift_included'
      : 'passenger_flight-route_type_outside_uk-aircraft_type_na-distance_na-class_economy-rf_excluded-distance_uplift_included';
  }


  onSubmitTravel() {
    const options = [
      {
        name: 'distance',
        activityId: this.isFirstClass,
      },
    ];

    const additionalParameters = {
      passengers: this.airTravelForm.value.passengers,
      distance: this.airTravelForm.value.distance,
      distance_unit: 'km',
    };

    this.estimateCarbonFootprintService
      .onSubmitForm(
        this.airTravelForm,
        options,
        'distance',
        'airTravelData',
        additionalParameters
      )
      .subscribe({
        next: (data) => {
          this.airTravel = data.totalCarbon;
          this.airTravelUnit = data.carbonUnit;

          const airTravelData = {
            airTravel: this.airTravel,
            airTravelUnit: this.airTravelUnit,
            month: this.currentMonth,
          };

          localStorage.setItem('airTravelData', JSON.stringify(airTravelData));
        },
        error: (error) => {
          console.error('Error en la estimación de huella de carbono:', error);
        },
      });
  }
}
