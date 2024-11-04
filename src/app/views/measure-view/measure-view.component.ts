import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FoodSectionComponent } from '../../sections/food-section/food-section.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';
import { MeasureService } from '../../logic/services/measure-service/measure.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarComponent } from '../../components/basics/calendar/calendar.component';
import { TravelSectionComponent } from '../../sections/travel-section/travel-section.component';
import { TechnologySectionComponent } from '../../sections/technology-section/technology-section.component';
import { ShoppingSectionComponent } from '../../sections/shopping-section/shopping-section.component';
import { HomeSectionComponent } from '../../sections/home-section/home-section.component';

@Component({
  selector: 'app-measure-view',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FoodSectionComponent,
    TabMenuModule,
    CalendarComponent,
    TravelSectionComponent,
    TechnologySectionComponent,
    ShoppingSectionComponent,
    HomeSectionComponent,
  ],
  templateUrl: './measure-view.component.html',
  styleUrl: './measure-view.component.scss',
})
export class MeasureViewComponent implements OnInit {
  measureSections: MenuItem[] | undefined;
  activeSection: MenuItem | undefined;
  scrollable: boolean = false;

  constructor(private measureService: MeasureService) {}

  ngOnInit(): void {
    this.measureSections = [
      { label: 'Alimentación', icon: 'assets/icons/tab-food.svg' },
      { label: 'Viajes', icon: '' },
      { label: 'Tecnología', icon: '' },
      { label: 'Compras', icon: '' },
      { label: 'Energía', icon: '' },
    ];

    this.activeSection = this.measureSections[0];
    console.log(this.measureService.carbonData);
  }

  getBackgroundImage() {
    switch (this.activeSection) {
      case this.measureSections![0]:
        return "url('/assets/images/bg-food.svg')";
      case this.measureSections![1]:
        return "url('/assets/images/bg-suitcase.svg')";
      case this.measureSections![2]:
        return "url('/assets/images/bg-technology.svg')";
      case this.measureSections![3]:
        return "url('/assets/images/bg-shopping.svg')";
      case this.measureSections![4]:
        return "url('/assets/images/bg-energy.svg')";
      default:
        return 'none';
    }
  }

  // getBackgroundClass() {
  //   switch (this.activeSection) {
  //     case this.measureSections![0]:
  //       return 'food-background';
  //     case this.measureSections![1]:
  //       return 'travel-background';
  //     case this.measureSections![2]:
  //       return 'technology-background';
  //     case this.measureSections![3]:
  //       return 'shopping-background';
  //     case this.measureSections![4]:
  //       return 'home-background';
  //     default:
  //       return '';
  //   }
  // }

  setActiveSection(event: MenuItem) {
    this.activeSection = event;
  }

  get monthSelected() {
    return this.measureService.monthSelected;
  }

  onMonthChange(newMonth: Date) {
    console.log(newMonth);
    this.measureService.monthSelected = newMonth;
  }
}
