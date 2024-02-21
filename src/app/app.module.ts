import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { BookingComponent } from './booking/booking.component';
import { SuccessComponent } from './success/success.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from './hotel.reducer';
import { FormsModule } from '@angular/forms';
import { BookedComponent } from './booked/booked.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    BookingComponent,
    SuccessComponent,
    BookedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ hotels: reducer }),
    FormsModule,
    ReactiveFormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
