import { ReservationStatus } from "../enums/reservation-status.enum";
import { SeatClass } from "../enums/seat-class.enum";
import { Flight } from "./flight.model";
import { User } from "./user.model";

export interface Reservation {
  id: number;
  flightId: number;
  flight?: Flight;
  userId: number;
  user?: User; 
  status: ReservationStatus;
  reservedSeats: number;
  price: number;
  bags: number;
  createdAt: string;
  seatClass: SeatClass;
}