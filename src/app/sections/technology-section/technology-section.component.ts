import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ElectronicDevicesFormComponent } from '../../logic/forms/electronic-devices-form/electronic-devices-form.component';

@Component({
  selector: 'app-technology-section',
  standalone: true,
  imports: [
    CommonModule,ElectronicDevicesFormComponent
  ],
  templateUrl: './technology-section.component.html',
  styleUrl: './technology-section.component.scss',
})
export class TechnologySectionComponent { }
