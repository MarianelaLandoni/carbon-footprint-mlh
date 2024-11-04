import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FoodFormComponent } from '../../logic/forms/food-form/food-form.component';


@Component({
  selector: 'app-food-section',
  standalone: true,
  imports: [
    CommonModule,
    FoodFormComponent
  ],
  templateUrl: './food-section.component.html',
  styleUrl: './food-section.component.scss',
})
export class FoodSectionComponent { }
