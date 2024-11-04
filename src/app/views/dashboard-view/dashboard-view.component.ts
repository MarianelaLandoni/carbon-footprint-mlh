import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EmissionsCardComponent } from '../../components/cards/emissions-card/emissions-card.component';
import { TotalEmissionsCardComponent } from '../../components/cards/total-emissions-card/total-emissions-card.component';
import { StackedBarGraphComponent } from '../../components/graphs/stacked-bar-graph/stacked-bar-graph.component';
import { DoughnutGraphComponent } from '../../components/graphs/doughnut-graph/doughnut-graph.component';


@Component({
  selector: 'app-dashboard-view',
  standalone: true,
  imports: [
    CommonModule,
    EmissionsCardComponent,
    TotalEmissionsCardComponent,
    StackedBarGraphComponent,
    DoughnutGraphComponent,
  ],
  templateUrl: './dashboard-view.component.html',
  styleUrl: './dashboard-view.component.scss',
})
export class DashboardViewComponent {
  emissionsLabels = ['Alimentación', 'Transporte', 'Viajes', 'Tecnología', 'Compras'];
  emissionsBackground = ['#c7ea46', '#90b816', '#547d48', '#146e45', '#084c2d'];
  emissionsData = [20, 20, 40, 10, 10];

  compareEmissionsTargetLabels = ['Meta', 'Actual'];
  compareEmissionsTargetData = [20, 50];
  compareEmissionsTargetBackground = ['#c7ea46', '#084c2d'];

  legendCompare = [
    {label: 'Meta', color: '#c7ea46'},
    {label: 'Actual', color: '#084c2d'},
  ]
  
}
