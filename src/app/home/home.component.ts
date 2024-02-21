import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Hotel } from '../hotel.reducer'; 
import { addHotelToSelected, clearSelectedHotel } from '../hotel.action'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  hotels$: Observable<Hotel[]>;
  filteredHotels: Hotel[] = [];
  searchTerm: string = '';
  selectedAmenities: string[] = [];
  selectedCities: string[] = [];
  amenities: string[] = []; 
  cities: string[] = []; 

  constructor(private store: Store<{ hotels: { hotels: Hotel[] } }>, private router: Router) {
    this.hotels$ = this.store.pipe(select(state => state.hotels.hotels));
    this.store.dispatch(clearSelectedHotel());
  }

  ngOnInit(): void {
    this.hotels$.subscribe(hotels => {
      this.filteredHotels = hotels;
      this.amenities = this.extractAmenities(hotels);
      this.cities = this.extractCities(hotels);
    });
  }

  onViewDetails(hotelId: number): void {
    this.store.dispatch(addHotelToSelected({ hotelId }));
    this.router.navigate(['/bookings']); 
  }

  onSearch(): void {
    this.applyFilters();
  }

  onFilterByAmenity(amenity: string): void {
    if (this.selectedAmenities.includes(amenity)) {
      this.selectedAmenities = this.selectedAmenities.filter(item => item !== amenity);
    } else {
      this.selectedAmenities.push(amenity);
    }
    this.applyFilters();
  }

  onFilterByCity(city: string): void {
    if (this.selectedCities.includes(city)) {
      this.selectedCities = this.selectedCities.filter(item => item !== city);
    } else {
      this.selectedCities.push(city);
    }
    this.applyFilters();
  }

  applyFilters(): void {
    this.hotels$.subscribe(hotels => {
      this.filteredHotels = hotels.filter(hotel => {

        if (this.searchTerm.trim() !== '' && !hotel.name.toLowerCase().includes(this.searchTerm.toLowerCase())) {
          return false;
        }

        if (this.selectedAmenities.length > 0 && !this.selectedAmenities.every(amenity => hotel.amenities.includes(amenity))) {
          return false;
        }

        if (this.selectedCities.length > 0 && !this.selectedCities.includes(hotel.location)) {
          return false;
        }
        return true;
      });
    });
  }

  extractAmenities(hotels: Hotel[]): string[] {
    const amenitiesSet = new Set<string>();
    hotels.forEach(hotel => {
      hotel.amenities.forEach(amenity => amenitiesSet.add(amenity));
    });
    return Array.from(amenitiesSet);
  }

  extractCities(hotels: Hotel[]): string[] {
    const citiesSet = new Set<string>();
    hotels.forEach(hotel => citiesSet.add(hotel.location));
    return Array.from(citiesSet);
  }
}
