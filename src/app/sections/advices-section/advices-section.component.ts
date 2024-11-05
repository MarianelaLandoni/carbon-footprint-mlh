import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DidYouKnowCardComponent } from '../../components/cards/did-you-know-card/did-you-know-card.component';

@Component({
  selector: 'app-advices-section',
  standalone: true,
  imports: [CommonModule, DidYouKnowCardComponent],
  templateUrl: './advices-section.component.html',
  styleUrl: './advices-section.component.scss',
})
export class AdvicesSectionComponent {

  articlesGreen = [
    {
      id: 1,
      text: 'Caminar solo 1 km en vez de conducir puede evitar la emisión de hasta 150g de CO2. ¡Tus pies también son ecológicos, sostenibles y benefician tu salud!',
      image: '/assets/icons/foot.svg',
    },
    {
      id: 3,
      text: 'Apoya a los productores locales y disfruta de alimentos frescos y nutritivos. Menos transporte, más sabor y beneficios para el planeta.',
      image: '/assets/icons/local-product.svg',
    },
    {
      id: 4,
      text: 'Elige electricidad de fuentes limpias como la solar o eólica, y contribuye a un futuro más verde. ¡Ilumina tu hogar y tu vida con energía sostenible y ayuda a reducir tu huella de carbono!',
      image: '/assets/icons/solar-energy.svg',
    },
    {
      id: 5,
      text: 'Elige la bici, el transporte público o comparte coche para reducir tu huella en cada trayecto y las emisiones de CO2. Cada viaje sostenible contribuye a un aire más limpio.',
      image: '/assets/icons/bike.svg',
    },
  ];
}
