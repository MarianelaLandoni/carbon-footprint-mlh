import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DidYouKnowCardComponent } from '../../components/cards/did-you-know-card/did-you-know-card.component';

@Component({
  selector: 'app-advice-view',
  standalone: true,
  imports: [
    CommonModule, DidYouKnowCardComponent
  ],
  templateUrl: './advice-view.component.html',
  styleUrl: './advice-view.component.scss',
})
export class AdviceViewComponent { }
