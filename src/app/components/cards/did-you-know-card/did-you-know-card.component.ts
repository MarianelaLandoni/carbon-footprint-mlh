import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-did-you-know-card',
  standalone: true,
  imports: [
    CommonModule, RouterLink
  ],
  templateUrl: './did-you-know-card.component.html',
  styleUrl: './did-you-know-card.component.scss',
})
export class DidYouKnowCardComponent { 
  @Input() title: string = '¿Sabías que...';
  @Input() text: string = '';
  @Input() image: string = '';
  @Input() showLink: boolean = false;
  @Input() showTitle: boolean = true;
}
