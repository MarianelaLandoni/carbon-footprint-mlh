import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, type OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CommonModule,ReactiveFormsModule, CalendarModule
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent implements OnInit {

  @Input() initialMonth: any;
  @Output() monthChange = new EventEmitter<Date>();
  monthForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.monthForm = this.fb.group({
      month: [this.initialMonth || new Date()],
    });

    this.monthForm.get('month')?.valueChanges.subscribe((value) => {
      this.monthChange.emit(value);
     // this.clearPreviousMonthData();
    });
  }

  clearPreviousMonthData() {
    localStorage.removeItem('carTravelData');
    localStorage.removeItem('airTravelData');
    localStorage.removeItem('railTravelData');
    localStorage.removeItem('busTravelData');
  }

}
