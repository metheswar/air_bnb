import { createAction, props } from '@ngrx/store';
import { Hotel } from './hotel.reducer';

export const addHotelToSelected = createAction(
  '[Hotel] Add to Selected',
  props<{ hotelId: number }>()
);

export const clearSelectedHotel = createAction('[Hotel] Clear Selected Hotel');

export const addHotelToBooked = createAction(
  '[Hotel] Add to Booked',
  props<{ hotel: Hotel, checkInDate: string, checkOutDate: string, totalPrice: number }>()
);
