import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MeasureService } from '../../../logic/services/measure-service/measure.service';

@Component({
  selector: 'app-emissions-card',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './emissions-card.component.html',
  styleUrl: './emissions-card.component.scss',
})
export class EmissionsCardComponent implements OnInit { 
  carbonEmissions: any;
  categories: any;

  constructor(private measureService: MeasureService){
}

  ngOnInit(): void {
    this.carbonEmissions = this.measureService.getTotalCarbonFootprint();

    this.categories = [
      {name: 'Alimentación', emissions: this.foodEmissions},
      {name: 'Viajes', emissions: this.travelEmissions},
      {name: 'Tecnología', emissions: this.techEmissions},
      {name: 'Compras', emissions: this.shoppingEmissions},
      {name: 'Energía', emissions: this.energyEmissions},
    ];
  }


  get foodEmissions(){
    return this.carbonEmissions['foodCarbon'].toFixed(2);
  }

  get travelEmissions(){
    return this.carbonEmissions['travelCarbon'].toFixed(2);
  }

  get techEmissions(){
    return this.carbonEmissions['techCarbon'].toFixed(2);
  }

  get shoppingEmissions(){
    return this.carbonEmissions['shoppingCarbon'].toFixed(2);
  }

  get energyEmissions(){
    return this.carbonEmissions['energyCarbon'].toFixed(2);
  }

}
