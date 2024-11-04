import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MeasureService } from '../../../logic/services/measure-service/measure.service';

@Component({
  selector: 'app-total-emissions-card',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './total-emissions-card.component.html',
  styleUrl: './total-emissions-card.component.scss',
})
export class TotalEmissionsCardComponent {

  constructor(private measureService: MeasureService) {}

  get totalEmissionesText() {
    return ` ${this.totalEmissions['totalCarbonFootprint'].toFixed(2)} kg`;
  }

  get totalEmissions() {
    return this.measureService.getTotalCarbonFootprint();
  }
 }
