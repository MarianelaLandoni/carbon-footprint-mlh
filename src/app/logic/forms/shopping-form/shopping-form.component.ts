import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { EstimateCarbonFootprintService } from '../../services/estimate-carbon-footprint-service/estimate-carbon-footprint.service';
import { MeasureService } from '../../services/measure-service/measure.service';
import { UtilsService } from '../../services/utils-service/utils.service';
import { InfoBoxComponent } from '../../../components/cards/info-box/info-box.component';


@Component({
  selector: 'app-shopping-form',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, ButtonModule, InputNumberModule, FloatLabelModule, InfoBoxComponent
  ],
  templateUrl: './shopping-form.component.html',
  styleUrl: './shopping-form.component.scss',
})
export class ShoppingFormComponent {
  shoppingForm!: FormGroup;
  shoppingCarbon: number = 0;
  shoppingCarbonUnit: string = '';


  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private estimateCarbonFootprintService: EstimateCarbonFootprintService,
    private utilsService: UtilsService,
    private measureService: MeasureService
  ) {
    this.shoppingForm = this.fb.group({
      clothing: [null],
      footwear: [null],
    });
  }

  ngOnInit(): void {
    const savedShopping = localStorage.getItem('shoppingData');
    if (savedShopping) {
      const parsedData = JSON.parse(savedShopping);
      this.shoppingCarbon = parsedData.shoppingCarbon;
      this.shoppingCarbonUnit = parsedData.shoppingCarbonUnit;
    }
  }

  get shoppingOptions(){
    return this.utilsService.shoppingOptions;
  }


  onSubmitShopping() {
    if (this.shoppingForm.valid) {
      this.estimateCarbonFootprintService.onSubmitForm(this.shoppingForm, this.shoppingOptions, 'money', 'shopping')
        .subscribe((data) => {
          // Actualizar los datos en el componente cuando la solicitud esté completa
          this.shoppingCarbon = data.totalCarbon.toFixed(2);
          this.shoppingCarbonUnit = data.carbonUnit;
          console.log('Estimación de huella de carbono compras:', data);

          this.measureService.updateCarbonData({ shoppingCarbon: data.totalCarbon });
          console.log(this.measureService.carbonData);
        });
    } else {
      console.log('Formulario no válido');
    }
  }
 }
