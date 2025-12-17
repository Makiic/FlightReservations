import { City } from "../enums/city.enum";

export interface FlightSearchRequest {
  departureCity?: City | null;
  arrivalCity?: City | null;
  directOnly: boolean;
}