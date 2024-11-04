import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { forkJoin, map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstimateCarbonFootprintService {

  carbonData: any = {};

 constructor(
   private http: HttpClient,
 ) { }

 estimateCarbon (activityId: string, parameters: any): Observable<any> {
   const headers = {
     Authorization: `Bearer ${environment.API_KEY}`,
     'Content-Type': 'application/json',
   };

   const body = {
     emission_factor: {
       activity_id: activityId,
       data_version: '^6',
     },
     parameters: parameters,
   };

   return this.http.post(`${environment.API_URL}`, body, { headers });
 }

 onSubmitForm(formGroup: FormGroup, options: any[], parameterKey: string, storageKey: string, additionalParameters?: any): Observable<any> {
   if (formGroup.valid) {
     const formData = formGroup.value;
     const requests = options
       .map((option) => {
         const parameterValue = formData[option.name];
         if (parameterValue) {
          const parameters = {
            ...additionalParameters,
            [parameterKey]: parameterValue
          };
           return this.estimateCarbon(option.activityId, parameters);
         }
         return null;
       })
       .filter((request) => request !== null);

     if (requests.length > 0) {
       return forkJoin(requests).pipe(
         map((responses: any[]) => {
           const totalCarbon = responses.reduce((total, response) => total + response.co2e, 0);
           const carbonUnit = responses[0]?.co2e_unit || '';

           // Guardar en LocalStorage
           const data = {
             totalCarbon: totalCarbon,
             carbonUnit: carbonUnit,
           };
           localStorage.setItem(storageKey, JSON.stringify(data));

           return data;
         })
       );
     }
   }

   // Retornar un Observable vacío si el formulario no es válido
   return new Observable();
 }

}
