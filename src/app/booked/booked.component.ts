import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Hotel,BookedHotel } from '../hotel.reducer'; 

@Component({
  selector: 'app-booked',
  templateUrl: './booked.component.html',
  styleUrls: ['./booked.component.css']
})
export class BookedComponent implements OnInit {
  bookedHotels$: Observable<BookedHotel[]>; 

  constructor(private store: Store<{ hotels: { bookedHotels: BookedHotel[] } }>) { }

  ngOnInit(): void {

    this.bookedHotels$ = this.store.pipe(select(state => state.hotels.bookedHotels));

    
  }
}
