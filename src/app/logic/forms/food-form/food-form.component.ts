import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import { EstimateCarbonFootprintService } from '../../services/estimate-carbon-footprint-service/estimate-carbon-footprint.service';
import { MeasureService } from '../../services/measure-service/measure.service';
import { UtilsService } from '../../services/utils-service/utils.service';
import { InfoBoxComponent } from '../../../components/cards/info-box/info-box.component';

@Component({
  selector: 'app-food-form',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, InputNumberModule, FloatLabelModule, ButtonModule, CalendarModule, InfoBoxComponent
  ],
  templateUrl: './food-form.component.html',
  styleUrl: './food-form.component.scss',
})
export class FoodFormComponent {
  foodForm!: FormGroup;
  foodCarbon: number = 0;
  foodCarbonUnit: string = '';

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private estimateCarbonFootprintService: EstimateCarbonFootprintService,
    private utilsService: UtilsService,
    private measureService: MeasureService
  ) {
    this.foodForm = this.fb.group({
      meat: [null,],
      fish: [null,],
      dairy: [null,],
      fruits: [null,],
      vegetables: [null,],
      others: [null,],
      month: [this.getCurrentMonth(), Validators.required],
    });
  }


  ngOnInit(): void {
    const savedFood = localStorage.getItem('food');
    if (savedFood) {
      const parsedData = JSON.parse(savedFood);
      this.foodCarbon = parsedData.totalCarbon;
      this.foodCarbonUnit = parsedData.carbonUnit;
    }
  }

  get foodOptions(){
    return this.utilsService.foodOptions;
  }

  get foodCarbonValue() {
    return this.foodCarbon.toFixed(2);
  }

  getCurrentMonth(): Date {
    const currentDate = new Date();
    return currentDate;
  }


  onSubmitFood() {
    if (this.foodForm.valid) {
      this.estimateCarbonFootprintService.onSubmitForm(this.foodForm, this.foodOptions, 'money', 'food')
        .subscribe((data) => {
          this.foodCarbon = data.totalCarbon.toFixed(2);
          this.foodCarbonUnit = data.carbonUnit;
          console.log('Estimación de huella de carbono comida:', data);

          this.measureService.updateCarbonData({ foodCarbon: data.totalCarbon });
        });
    } else {
      console.log('Formulario no válido');
    }
  }
}

