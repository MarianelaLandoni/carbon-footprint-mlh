import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CarFormComponent } from '../../logic/forms/travel/car-form/car-form.component';
import { FlightsFormComponent } from '../../logic/forms/travel/flights-form/flights-form.component';
import { RailFormComponent } from '../../logic/forms/travel/rail-form/rail-form.component';
import { BusFormComponent } from '../../logic/forms/travel/bus-form/bus-form.component';
import { InfoBoxComponent } from '../../components/cards/info-box/info-box.component';


@Component({
  selector: 'app-travel-section',
  standalone: true,
  imports: [
    CommonModule, FormsModule, DropdownModule, CarFormComponent,FlightsFormComponent, RailFormComponent, BusFormComponent, InfoBoxComponent
  ],
  templateUrl: './travel-section.component.html',
  styleUrl: './travel-section.component.scss',
})
export class TravelSectionComponent {
  travelSelected: string = 'car';

  travelOptions = [
    { value: 'car', label: 'Coche' },
    { value: 'bus', label: 'Autobús' },
    { value: 'train', label: 'Tren' },
    { value: 'plane', label: 'Avión' }
  ];


 }
