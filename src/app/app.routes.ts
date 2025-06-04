import { Routes } from '@angular/router';
import { HomeFragrancesComponent } from './home-fragrances/home-fragrances.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';

export const routes: Routes = [
    { path: '', component: HomeFragrancesComponent },
    { path: 'payment', component: PaymentFormComponent }
];
