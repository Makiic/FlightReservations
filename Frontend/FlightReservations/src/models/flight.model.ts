import { City } from "../enums/city.enum";

export interface Flight {
  id: number;
  departureCity: City;
  arrivalCity: City;
  flightDate: string;
  layovers: number;
  totalSeats: number;
  availableSeats: number;
  isCanceled: boolean;
}
