import { Routes } from '@angular/router';
import { DashboardViewComponent } from './views/dashboard-view/dashboard-view.component';
import { MeasureViewComponent } from './views/measure-view/measure-view.component';
import { AdviceViewComponent } from './views/advice-view/advice-view.component';

export const routes: Routes = [
    {path: 'dashboard', component: DashboardViewComponent},
    {path: 'measure', component: MeasureViewComponent},
    {path: 'advice', component: AdviceViewComponent},
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
    
];
