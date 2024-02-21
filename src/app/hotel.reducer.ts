import { createReducer, on } from '@ngrx/store';
import { addHotelToSelected, clearSelectedHotel, addHotelToBooked } from './hotel.action';

export interface Hotel {
  id: number;
  name: string;
  description: string;
  location: string;
  amenities: string[];
  price: number;
  imageUrl: string;
}

export interface BookedHotel extends Hotel {
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
}

export interface AppState {
  hotels: Hotel[];
  selectedHotel: Hotel | null;
  bookedHotels: BookedHotel[]; 
}

const localStorageKey = 'bookedHotels';

const bookedHotelsFromLocalStorage: BookedHotel[] = JSON.parse(localStorage.getItem(localStorageKey) || '[]');

export const initialState: AppState = {
    hotels: [
        { 
          id: 1, 
          name: 'Hotel A', 
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 
          location: 'City X', 
          amenities: ['Free Wi-Fi', 'Swimming Pool', 'Spa', 'Fitness Center'],
          price: 1500,
          imageUrl: 'https://source.unsplash.com/random/200x200?house?sig=1' 
        },
        { 
          id: 2, 
          name: 'Hotel B', 
          description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.', 
          location: 'City Y', 
          amenities: ['Gym', 'Restaurant', 'Bar', 'Room Service'],
          price: 2000, 
          imageUrl: 'https://source.unsplash.com/random/200x200?house?sig=2'
        },
        {
          id: 3,
          name: 'Hotel C',
          description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
          location: 'City Z',
          amenities: ['Free Parking', 'Airport Shuttle', 'Conference Rooms', 'Laundry Service'],
          price: 1800,
          imageUrl: 'https://source.unsplash.com/random/200x200?house?sig=3'
        },
        {
          id: 4,
          name: 'Hotel D',
          description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
          location: 'City X',
          amenities: ['Pet-friendly', 'Swimming Pool', 'Spa', 'Restaurant'],
          price: 2200,
          imageUrl: 'https://source.unsplash.com/random/200x200?house?sig=4'
        },
        {
          id: 5,
          name: 'Hotel E',
          description: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
          location: 'City Y',
          amenities: ['Free Wi-Fi', 'Fitness Center', 'Bar', 'Room Service'],
          price: 1900,
          imageUrl: 'https://source.unsplash.com/random/200x200?house?sig=5'
        },
        {
          id: 6,
          name: 'Hotel F',
          description: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.',
          location: 'City Z',
          amenities: ['Swimming Pool', 'Spa', 'Free Parking', 'Restaurant'],
          price: 2100,
          imageUrl: 'https://source.unsplash.com/random/200x200?house?sig=6'
        },
        {
          id: 7,
          name: 'Hotel G',
          description: 'Suspendisse potenti. Curabitur ac felis arcu. Sed ut felis consequat, luctus enim nec, vulputate dolor.',
          location: 'City X',
          amenities: ['Gym', 'Free Wi-Fi', 'Bar', 'Room Service'],
          price: 1700,
          imageUrl: 'https://source.unsplash.com/random/200x200?house?sig=7'
        },
        {
          id: 8,
          name: 'Hotel H',
          description: 'Integer nec enim a libero tristique vehicula at nec mi. Nulla in nulla id velit convallis maximus.',
          location: 'City Y',
          amenities: ['Free Parking', 'Airport Shuttle', 'Fitness Center', 'Conference Rooms'],
          price: 2300,
          imageUrl: 'https://source.unsplash.com/random/200x200?house?sig=8'
        },
        {
          id: 9,
          name: 'Hotel I',
          description: 'In ac metus in mauris dignissim consequat non eget purus. Nullam tristique lectus sit amet neque sodales, id congue risus sagittis.',
          location: 'City Z',
          amenities: ['Swimming Pool', 'Spa', 'Restaurant', 'Free Wi-Fi'],
          price: 2000,
          imageUrl: 'https://source.unsplash.com/random/200x200?house?sig=9'
        },
        {
          id: 10,
          name: 'Hotel J',
          description: 'Praesent ut risus in dolor mollis tincidunt vitae nec libero. In at velit cursus, scelerisque eros id, aliquet velit.',
          location: 'City X',
          amenities: ['Room Service', 'Bar', 'Gym', 'Free Parking'],
          price: 1800,
          imageUrl: 'https://source.unsplash.com/random/200x200?house?sig=10'
        }
      ],
      
  selectedHotel: null,
  bookedHotels: bookedHotelsFromLocalStorage  
};

const hotelReducer = createReducer(
  initialState,
  on(addHotelToSelected, (state, { hotelId }) => {
    const selectedHotel = state.hotels.find(hotel => hotel.id === hotelId) || null;
    return { ...state, selectedHotel };
  }),
  on(clearSelectedHotel, state => ({ ...state, selectedHotel: null })),
  on(addHotelToBooked, (state, { hotel, checkInDate, checkOutDate, totalPrice }) => {
    const updatedBookedHotels = [...state.bookedHotels, { ...hotel, checkInDate, checkOutDate, totalPrice }];
    localStorage.setItem(localStorageKey, JSON.stringify(updatedBookedHotels));
    return {
      ...state,
      bookedHotels: updatedBookedHotels
    };
  })
);

export function reducer(state: AppState | undefined, action: any) {
  return hotelReducer(state, action);
}
