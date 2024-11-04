import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  foodOptions = [
    {
      value: 'meat',
      label: 'Carne',
      name: 'meat',
      activityId: 'consumer_goods-type_meat_products_beef',
    },
    {
      value: 'fish',
      label: 'Pescado',
      name: 'fish',
      activityId: 'consumer_goods-type_fish_products',
    },
    {
      value: 'dairy',
      label: 'Productos lácteos',
      name: 'dairy',
      activityId: 'consumer_goods-type_dairy_products',
    },
    {
      value: 'fruits',
      label: 'Frutas',
      name: 'fruits',
      activityId: 'consumer_goods-type_other_fresh_or_chilled_fruit',
    },
    {
      value: 'vegetables',
      label: 'Verduras',
      name: 'vegetables',
      activityId: 'consumer_goods-type_other_fresh_or_chilled_vegetables',
    },
    {
      value: 'others',
      label: 'Otros',
      name: 'others',
      activityId: 'consumer_goods-type_food_products_not_elsewhere_specified',
    },
  ];

  devicesOptions = [
    {
      value: 'smartphone',
      label: 'Móvil',
      name: 'mobileNumber',
      activityId: 'electronics-type_mobile_phone',
    },
    {
      value: 'tablet',
      label: 'Tablet',
      name: 'tabletNumber',
      activityId: 'electronics-type_tablet',
    },
    {
      value: 'laptop',
      label: 'Portátil',
      name: 'laptopNumber',
      activityId: 'electronics-type_laptop_14_inches',
    },
    {
      value: 'desktop',
      label: 'Ordenador',
      name: 'desktopNumber',
      activityId: 'electronics-type_desktop',
    },
  ];

  homeOptions = [
    {
      value: 'energy',
      label: 'Energía',
      name: 'energy',
      activityId: 'electricity-supply_grid-source_supplier_mix',
      placeholder: 'Gasto en kWh',
    },
  ];

  shoppingOptions = [
    { value: 'clothing', label: 'Ropa', name: 'clothing', activityId: 'consumer_goods-type_clothing' },
    { value: 'footwear', label: 'Calzado', name: 'footwear', activityId: 'consumer_goods-type_footwear' },
  ];

  fuelTypes = [
    { label: 'Gasolina', value: 'gasoline' },
    { label: 'Diésel', value: 'diesel' },
    { label: 'Híbrido', value: 'hybrid' },
    { label: 'Híbrido enchufable (PHEV)', value: 'PHEV' },
    { label: 'Eléctrico', value: 'electric' },
    { label: 'Gas Natural Comprimido (GNC)', value: 'CNG' },
    { label: 'Gas Licuado de Petróleo (GLP)', value: 'LPG' },
  ];

  getFuelActivityId(fuelType: string) {
    switch (fuelType) {
      case 'gasoline':
        return 'passenger_vehicle-vehicle_type_car-fuel_source_petrol-engine_size_na-vehicle_age_na-vehicle_weight_na';
      case 'diesel':
        return 'passenger_vehicle-vehicle_type_car-fuel_source_diesel-engine_size_na-vehicle_age_na-vehicle_weight_na';
      case 'hybrid':
        return 'passenger_vehicle-vehicle_type_car-fuel_source_diesel_hev-engine_size_na-vehicle_age_na-vehicle_weight_na';
      case 'PHEV':
        return 'passenger_vehicle-vehicle_type_car-fuel_source_hev-engine_size_na-vehicle_age_na-vehicle_weight_na';
      case 'electric':
        return 'passenger_vehicle-vehicle_type_van-fuel_source_bev-engine_size_na-vehicle_age_na-vehicle_weight_lt_3.5t';
      case 'CNG':
        return 'passenger_vehicle-vehicle_type_car-fuel_source_cng-engine_size_na-vehicle_age_na-vehicle_weight_na';
      case 'LPG':
        return 'passenger_vehicle-vehicle_type_car-fuel_source_lpg-engine_size_na-vehicle_age_na-vehicle_weight_naa';
      default:
        return '';
    }
  }

  railTransportOptions = [
    { value: 'train', label: 'Tren' },
    { value: 'subway', label: 'Metro' },
    { value: 'tram', label: 'Tranvía' },
  ];

  trainTypes = [
    { label: 'Cercanías', value: 'short-distance' },
    { label: 'Media distancia', value: 'medium-distance' },
    { label: 'Larga distancia', value: 'long-distance' },
    { label: 'AVE', value: 'high-speed' },
  ];

  getRailActivityId(transportMode: string, trainType: string) {
    if (transportMode === 'subway') {
      return 'passenger_train-route_type_underground-fuel_source_na';
    } else if (transportMode === 'tram') {
      return 'passenger_train-route_type_light_rail_and_tram-fuel_source_na';
    } else {
      switch (trainType) {
        case 'short-distance':
          return 'passenger_train-route_type_local-fuel_source_electricity';
        case 'medium-distance':
          return 'passenger_train-route_type_regional_express-fuel_source_na';
        case 'long-distance':
          return 'passenger_train-route_type_long_distance-fuel_source_electricity';
        case 'high-speed':
          return 'passenger_train-route_type_high_speed-fuel_source_na';
        default:
          return '';
      }
    }
  }

}
