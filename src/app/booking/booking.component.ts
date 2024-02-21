import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Hotel, AppState } from '../hotel.reducer';
import { addHotelToBooked } from '../hotel.action';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  today: string = new Date().toISOString().split('T')[0];
  selectedHotel$: Observable<Hotel | null>;
  totalPrice: number | null = null;
  bookingForm: FormGroup;

  constructor(
    private store: Store<{ hotels: AppState }>,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.selectedHotel$ = this.store.pipe(select(state => state.hotels.selectedHotel));
    this.selectedHotel$.subscribe(selectedHotel => {
      if (!selectedHotel) {
        this.router.navigate(['/']);
      }
    });

    this.bookingForm = this.fb.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  calculatePrice(): void {
    if (this.bookingForm.valid) {
      this.selectedHotel$.subscribe(selectedHotel => {
        if (selectedHotel && this.bookingForm.value.checkInDate && this.bookingForm.value.checkOutDate) {
          const pricePerNight = selectedHotel.price;
          const checkIn = new Date(this.bookingForm.value.checkInDate);
          const checkOut = new Date(this.bookingForm.value.checkOutDate);
          let totalPrice = 0;
          for (let currentDate = new Date(checkIn); currentDate <= checkOut; currentDate.setDate(currentDate.getDate() + 1)) {
            const dayOfWeek = currentDate.getDay();
            const isWeekend = (dayOfWeek === 0 || dayOfWeek === 6);
            if (isWeekend) {
              totalPrice += pricePerNight * 1.1;
            } else {
              totalPrice += pricePerNight;
            }
          }
          this.totalPrice = totalPrice;
        } else {
          this.totalPrice = null;
        }
      });
    }
  }

  bookHotel(): void {
    if (this.bookingForm.valid && this.totalPrice !== null) {
      this.selectedHotel$.subscribe(selectedHotel => {
        if (selectedHotel) {
          this.store.dispatch(addHotelToBooked({
            hotel: selectedHotel,
            checkInDate: this.bookingForm.value.checkInDate,
            checkOutDate: this.bookingForm.value.checkOutDate,
            totalPrice: this.totalPrice
          }));
          this.router.navigate(['/success']);
        }
      });
    }
  }
}
