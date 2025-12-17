import { SeatClass } from "../enums/seat-class.enum";

export interface ReservationRequestDTO {
 flightId: number;
  reservedSeats: number;
  seatClass: SeatClass;
  bags?: number;
}