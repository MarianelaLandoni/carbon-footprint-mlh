import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HomeFormComponent } from '../../logic/forms/home-form/home-form.component';

@Component({
  selector: 'app-home-section',
  standalone: true,
  imports: [
    CommonModule,HomeFormComponent
  ],
  templateUrl: './home-section.component.html',
  styleUrl: './home-section.component.scss',
})
export class HomeSectionComponent { }
