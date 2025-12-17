import { City } from "../enums/city.enum";

export interface FlightDTO {
  departureCity: City;
  arrivalCity: City;
  flightDate: string; 
  layovers: number;
  totalSeats: number;
  availableSeats: number;
  isCanceled: boolean;
}
