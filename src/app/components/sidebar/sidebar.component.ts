import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { DidYouKnowCardComponent } from '../cards/did-you-know-card/did-you-know-card.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, DidYouKnowCardComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  @Input() isSidebarOpen: boolean = false;
@Output() closeSidebar = new EventEmitter<void>();

  constructor(private router: Router) {}
  
  pagesList = [
    {
      name: 'Dashboard',
      icon: 'assets/icons/home-icon.svg',
      iconActive: 'assets/icons/home-active-icon.svg',
      route: 'dashboard',
    },
    {
      name: 'Mediciones CO₂',
      icon: 'assets/icons/measure-icon.svg',
      iconActive: 'assets/icons/measure-active-icon.svg',
      route: 'measure',
    },
    {
      name: 'Consejos',
      icon: 'assets/icons/leaf-icon.svg',
      iconActive: 'assets/icons/leaf-active-icon.svg',
      route: 'advice',
    },
  ];

  get adviceText() {
    return 'Un solo árbol puede absorber hasta 22 kg de CO2 al año? ¡Plantar un árbol es plantar un futuro más limpio!'
  }

  isActive(route: string) {
    return this.router.url.includes(route);
  }
}
