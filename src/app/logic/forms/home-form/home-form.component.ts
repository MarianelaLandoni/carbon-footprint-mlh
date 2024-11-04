import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { EstimateCarbonFootprintService } from '../../services/estimate-carbon-footprint-service/estimate-carbon-footprint.service';
import { MeasureService } from '../../services/measure-service/measure.service';
import { environment } from '../../../../environments/environment';
import { UtilsService } from '../../services/utils-service/utils.service';
import { InfoBoxComponent } from '../../../components/cards/info-box/info-box.component';

@Component({
  selector: 'app-home-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputNumberModule,
    ButtonModule,
    FloatLabelModule,
    InfoBoxComponent
  ],
  templateUrl: './home-form.component.html',
  styleUrl: './home-form.component.scss',
})
export class HomeFormComponent {
  homeForm!: FormGroup;
  homeCarbon: number = 0;
  homeCarbonUnit: string = '';


  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private estimateCarbonFootprintService: EstimateCarbonFootprintService,
    private utilsService: UtilsService,
    private measureService: MeasureService
  ) {
    this.homeForm = this.fb.group({
      energy: [null],
    });
  }

  ngOnInit(): void {
    const savedHomeData = localStorage.getItem('homeData');
    if (savedHomeData) {
      const parsedData = JSON.parse(savedHomeData);
      this.homeCarbon = parsedData.homeCarbon;
      this.homeCarbonUnit = parsedData.homeCarbonUnit;
    }
  }

  get homeOptions(){
    return this.utilsService.homeOptions;
  }


  estimateHomeCarbon(activityId: string, energy: number) {
    const headers = {
      Authorization: `Bearer ${environment.API_KEY}`,
      'Content-Type': 'application/json',
    };

    const body = {
      emission_factor: {
        activity_id: activityId,
        data_version: '^6',
      },
      parameters: {
        energy: energy,
        energy_unit: 'kWh',
      },
    };

    return this.http.post(`${environment.API_URL}`, body, { headers });
  }


  onSubmitHome() {
    if (this.homeForm.valid) {
      this.estimateCarbonFootprintService
        .onSubmitForm(this.homeForm, this.homeOptions, 'energy', 'energy')
        .subscribe((data) => {
          // Actualizar los datos en el componente cuando la solicitud esté completa
          this.homeCarbon = data.totalCarbon.toFixed(2);
          this.homeCarbonUnit = data.carbonUnit;
          console.log('Estimación de huella de carbono home:', data);

          this.measureService.updateCarbonData({
            energyCarbon: data.totalCarbon,
          });
          console.log(this.measureService.carbonData);
        });
    } else {
      console.log('Formulario no válido');
    }
  }
}
