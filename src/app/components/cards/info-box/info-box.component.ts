import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-box',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './info-box.component.html',
  styleUrl: './info-box.component.scss',
})
export class InfoBoxComponent {
  @Input() infoText = '';
 }
