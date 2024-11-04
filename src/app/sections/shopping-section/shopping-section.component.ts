import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ShoppingFormComponent } from '../../logic/forms/shopping-form/shopping-form.component';

@Component({
  selector: 'app-shopping-section',
  standalone: true,
  imports: [
    CommonModule, ShoppingFormComponent
  ],
  templateUrl: './shopping-section.component.html',
  styleUrl: './shopping-section.component.scss',
})
export class ShoppingSectionComponent { }
