import { Injectable } from '@angular/core';
import { CarbonData } from '../../models/carbon-data';

@Injectable({
  providedIn: 'root',
})
export class MeasureService {
  monthSelected: Date = new Date();
  totalCarbonFootprint: number = 0;
  carbonData: any[] = [];
  travelCarbon: number = 0;

  constructor() {
    const storedData = localStorage.getItem('carbonData');
    if (storedData) {
      this.carbonData = JSON.parse(storedData);
    }
  }

  get currentMonth() {
    return this.monthSelected.getMonth() + 1;
  }

  updateCarbonData(newData: CarbonData): void {
    //debugger;
    const existingData = this.carbonData.find(
      (data) => data.month === this.monthSelected.getMonth() + 1
    );

    if (existingData) {
      Object.assign(existingData, {
        ...existingData, // Mantener las propiedades existentes
        ...newData, // Sobrescribir solo las propiedades de newData
      });
    } else {
      // Si no existe, agrega un nuevo objeto
      const newCarbonData: CarbonData = {
        month: this.monthSelected.getMonth() + 1,
        foodCarbon: newData.foodCarbon || 0,
        travelCarbon: newData.travelCarbon || 0,
        techCarbon: newData.techCarbon || 0,
        shoppingCarbon: newData.shoppingCarbon || 0,
        energyCarbon: newData.energyCarbon || 0,
      };

      this.carbonData.push(newCarbonData);
    }

    // Guardar en localStorage
    localStorage.setItem('carbonData', JSON.stringify(this.carbonData));
  }

  getDataFromLocalStorage(key: string): any {
    return JSON.parse(localStorage.getItem(key) || 'null');
  }

  calculateFoodCarbon(): number {
    const foodData = this.getDataFromLocalStorage('food');
    return foodData ? foodData.totalCarbon || 0 : 0;
  }

  calculateTravelCarbon(): number {
    const airTravelData = this.getDataFromLocalStorage('airTravelData');
    const busTravelData = this.getDataFromLocalStorage('busTravelData');
    const carTravelData = this.getDataFromLocalStorage('carTravelData');
    const railTravelData = this.getDataFromLocalStorage('railTravelData');

    let travelCarbon = 0;

    // Solo sumamos los datos del mes seleccionado
    const currentMonth = this.currentMonth; // Mes actual (1-12)

    if (airTravelData && airTravelData.month === currentMonth)
      travelCarbon += airTravelData.airTravel || 0;
    if (busTravelData && busTravelData.month === currentMonth)
      travelCarbon += busTravelData.busTravel || 0;
    if (carTravelData && carTravelData.month === currentMonth)
      travelCarbon += carTravelData.carTravel || 0;
    if (railTravelData && railTravelData.month === currentMonth)
      travelCarbon += railTravelData.railTravel || 0;

    // Actualiza los datos de huella de carbono solo para el mes seleccionado
    this.updateCarbonData({ travelCarbon });

    return travelCarbon;
  }

  calculateTechCarbon(): number {
    const devicesData = this.getDataFromLocalStorage('devices');
    return devicesData ? devicesData.totalCarbon || 0 : 0;
  }

  calculateEnergyCarbon(): number {
    const homeData = this.getDataFromLocalStorage('energy');
    return homeData ? homeData.totalCarbon || 0 : 0;
  }

  calculateShoppingCarbon(): number {
    const shoppingData = this.getDataFromLocalStorage('shopping');
    return shoppingData ? shoppingData.totalCarbon || 0 : 0;
  }

  getTotalCarbonFootprint(): { [key: string]: number } {
    // Calcular los valores por categoría
    const foodCarbon = this.calculateFoodCarbon();
    const travelCarbon = this.calculateTravelCarbon();
    const techCarbon = this.calculateTechCarbon();
    const energyCarbon = this.calculateEnergyCarbon();
    const shoppingCarbon = this.calculateShoppingCarbon();

    // Calcular el total general
    const totalCarbonFootprint =
      foodCarbon + travelCarbon + techCarbon + energyCarbon + shoppingCarbon;

    // Devolver los valores por categoría y el total
    return {
      totalCarbonFootprint,
      foodCarbon,
      travelCarbon,
      techCarbon,
      shoppingCarbon,
      energyCarbon,
    };
  }
}
