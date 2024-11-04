import { TestBed } from '@angular/core/testing';
import { EstimateCarbonFootprintService } from './estimate-carbon-footprint.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../../environments/environment';

describe('EstimateCarbonFootprintService', () => {
  let service: EstimateCarbonFootprintService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EstimateCarbonFootprintService],
    });
    service = TestBed.inject(EstimateCarbonFootprintService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should estimate car fuel carbon emissions', () => {
    const activityId = 'passenger_vehicle-vehicle_type_car-fuel_source_petrol-engine_size_na-vehicle_age_na-vehicle_weight_na';
    const parameters = {
      distance: 200,
      distance_unit: 'km'
    };

    const expectedResponse = {
      co2e: 32.9
    };

    service.estimateCarbon(activityId, parameters).subscribe((response) => {
      // Verifica que el valor de co2e es el esperado
      expect(response.co2e).toBe(32.9);
    });

    const req = httpMock.expectOne(`${environment.API_URL}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${environment.API_KEY}`);
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.body).toEqual({
      emission_factor: {
        activity_id: activityId,
        data_version: '^6',
      },
      parameters: parameters,
    });

    req.flush(expectedResponse); // Simula la respuesta del servidor
  });
});
