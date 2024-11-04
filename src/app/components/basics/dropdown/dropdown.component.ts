import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [
    CommonModule,DropdownModule, FormsModule
  ],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
})
export class DropdownComponent {
  months: any;
  selectedMonth!: any;

  ngOnInit() {
    this.months = [
      { name: "enero", shortName: "ene" },
      { name: "febrero", shortName: "feb" },
      { name: "marzo", shortName: "mar" },
      { name: "abril", shortName: "abr" },
      { name: "mayo", shortName: "may" },
      { name: "junio", shortName: "jun" },
      { name: "julio", shortName: "jul" },
      { name: "agosto", shortName: "ago" },
      { name: "septiembre", shortName: "sep" },
      { name: "octubre", shortName: "oct" },
      { name: "noviembre", shortName: "nov" },
      { name: "diciembre", shortName: "dic" }
    ];

}
}
