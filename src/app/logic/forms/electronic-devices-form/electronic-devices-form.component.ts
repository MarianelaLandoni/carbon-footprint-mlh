import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EstimateCarbonFootprintService } from '../../services/estimate-carbon-footprint-service/estimate-carbon-footprint.service';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { MeasureService } from '../../services/measure-service/measure.service';
import { UtilsService } from '../../services/utils-service/utils.service';
import { InfoBoxComponent } from '../../../components/cards/info-box/info-box.component';

@Component({
  selector: 'app-electronic-devices-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FloatLabelModule,
    InputNumberModule,
    ButtonModule,
    InfoBoxComponent,
  ],
  templateUrl: './electronic-devices-form.component.html',
  styleUrl: './electronic-devices-form.component.scss',
})
export class ElectronicDevicesFormComponent {
  devicesForm!: FormGroup;
  devicesCarbon: number = 0;
  devicesCarbonUnit: string = '';

  constructor(
    private fb: FormBuilder,
    private estimateCarbonFootprintService: EstimateCarbonFootprintService,
    private utilsService: UtilsService,
    private measureService: MeasureService
  ) {
    this.devicesForm = this.fb.group({
      mobileNumber: [null],
      tabletNumber: [null],
      laptopNumber: [null],
      desktopNumber: [null],
    });
  }

  ngOnInit(): void {
    const savedFormValues = localStorage.getItem('devicesFormValues');
    if (savedFormValues) {
      this.devicesForm.patchValue(JSON.parse(savedFormValues));
    }

    const savedDevices = localStorage.getItem('devices');
    if (savedDevices) {
      const parsedData = JSON.parse(savedDevices);
      this.devicesCarbon = parsedData.totalCarbon.toFixed(2);
      this.devicesCarbonUnit = parsedData.carbonUnit;
    }
  }

  get devicesOptions(){
    return this.utilsService.devicesOptions;
  }

  onSubmitDevices() {
    if (this.devicesForm.valid) {
      this.estimateCarbonFootprintService
        .onSubmitForm(
          this.devicesForm,
          this.devicesOptions,
          'number',
          'devices'
        )
        .subscribe((data) => {
          this.devicesCarbon = data.totalCarbon.toFixed(2);
          this.devicesCarbonUnit = data.carbonUnit;
          console.log(
            'Estimación de huella de carbono dispositivos electrónicos:',
            data
          );

          this.measureService.updateCarbonData({
            techCarbon: data.totalCarbon,
          });
          console.log(this.measureService.carbonData);
        });
    } else {
      console.log('Formulario no válido');
    }
  }
}
