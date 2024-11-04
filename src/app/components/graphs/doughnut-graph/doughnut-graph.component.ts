import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-doughnut-graph',
  standalone: true,
  imports: [
    CommonModule, BaseChartDirective
  ],
  templateUrl: './doughnut-graph.component.html',
  styleUrl: './doughnut-graph.component.scss',
})
export class DoughnutGraphComponent implements OnInit { 
  @Input() labels: string[] = [];
  @Input() data: number[] = [];
  @Input() backgroundColor: string[] = [];
  @Input() cutout = '';
  @Input() isSmall = false;


  doughnutChartLegend = true;
  doughnutChartPlugins = [];
  doughnutChartData: ChartConfiguration<'doughnut'>['data'] = {
    datasets: []
  };
 
  doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
   
  };

  constructor() {
  }

  ngOnInit(): void {
    this.doughnutChartData = {
      labels: this.labels,
      datasets: [{
        data: this.data,
        backgroundColor: this.backgroundColor,
        hoverOffset: 4,
        borderRadius: 24,
        spacing: 4,
      }]
    };

    this.doughnutChartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            useBorderRadius: true,
            borderRadius: 8,
            boxWidth: 12,
          },
        },
      },
      cutout: this.cutout,
    };
  }

 

}
