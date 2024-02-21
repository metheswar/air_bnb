import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from '../app/booking/booking.component';
import { HomeComponent } from './home/home.component';
import { BookedComponent } from './booked/booked.component';
import { SuccessComponent } from './success/success.component';

const routes: Routes = [
  { path: '', component: HomeComponent } ,
  { path: 'bookings', component: BookingComponent } ,
  { path: 'booked', component: BookedComponent } ,
  {path:'success' , component:SuccessComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
