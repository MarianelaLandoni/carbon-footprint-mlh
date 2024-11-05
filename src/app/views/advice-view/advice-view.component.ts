import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AdvicesSectionComponent } from '../../sections/advices-section/advices-section.component';

@Component({
  selector: 'app-advice-view',
  standalone: true,
  imports: [
    CommonModule, AdvicesSectionComponent
  ],
  templateUrl: './advice-view.component.html',
  styleUrl: './advice-view.component.scss',
})
export class AdviceViewComponent { }
