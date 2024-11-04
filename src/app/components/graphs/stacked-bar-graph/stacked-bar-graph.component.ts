import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { MeasureService } from '../../../logic/services/measure-service/measure.service';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-stacked-bar-graph',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, ChartModule],
  templateUrl: './stacked-bar-graph.component.html',
  styleUrl: './stacked-bar-graph.component.scss',
})
export class StackedBarGraphComponent implements OnInit {
  @ViewChild(BaseChartDirective) barChart?: BaseChartDirective;

  //TODO: responsive, en mobile cuando recargas la pagina pone los valores por defecto de la librería en los estilos
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dic',
    ],
    datasets: [
      {
        data: [],
        label: 'Alimentación',
        backgroundColor: '#c7ea46',
        borderRadius: 30,
        barThickness: 14,
        borderColor: '#fff',
        borderWidth: 1,
      },
      {
        data: [],
        label: 'Viajes',
        backgroundColor: '#90b816',
        borderRadius: 30,
        barThickness: 14,
        borderColor: '#fff',
        borderWidth: 1,
      },
      {
        data: [],
        label: 'Tecnología',
        backgroundColor: '#547d48',
        borderRadius: 30,
        barThickness: 14,
        borderColor: '#fff',
        borderWidth: 1,
      },
      {
        data: [],
        label: 'Compras',
        backgroundColor: '#146e45',
        borderRadius: 30,
        barThickness: 14,
        borderColor: '#fff',
        borderWidth: 1,
      },
      {
        data: [],
        label: 'Energía',
        backgroundColor: '#084c2d',
        borderRadius: 30,
        barThickness: 14,
        borderColor: '#fff',
        borderWidth: 1,
      },
    ],
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          useBorderRadius: true,
          borderRadius: 4,
          boxWidth: 12,
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
      },
      y: {
        stacked: true,
      },
    },
  };

  constructor(private measureService: MeasureService) {}

  ngOnInit(): void {
    this.loadCarbonData();
  }

  loadCarbonData() {
    //debugger;
    // Crear arrays para almacenar los datos de cada categoría por mes
    const foodData = Array(12).fill(0);
    const travelData = Array(12).fill(0);
    const techData = Array(12).fill(0);
    const shoppingData = Array(12).fill(0);
    const energyData = Array(12).fill(0);

    const carbonData = this.measureService.carbonData;
    console.log('carbon data grafico', carbonData);

    carbonData.forEach((data) => {
      const monthIndex = data.month - 1;

      foodData[monthIndex] = data.foodCarbon || 0;
      travelData[monthIndex] = data.travelCarbon || 0;
      techData[monthIndex] = data.techCarbon || 0;
      shoppingData[monthIndex] = data.shoppingCarbon || 0;
      energyData[monthIndex] = data.energyCarbon || 0;
    });

    this.barChartData.datasets[0].data = foodData;
    this.barChartData.datasets[1].data = travelData;
    this.barChartData.datasets[2].data = techData;
    this.barChartData.datasets[3].data = shoppingData;
    this.barChartData.datasets[4].data = energyData;

    // Actualizar el gráfico
    this.barChart?.update();
  }
}
