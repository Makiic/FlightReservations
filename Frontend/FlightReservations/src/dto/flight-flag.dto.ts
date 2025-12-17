import { FlightDTO } from "./flight.dto";

export interface FlightWithFlag extends FlightDTO {
  id: number;
  lowSeats: boolean;
}