import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReservationRequestDTO } from '../dto/reservation-request.dto';
import { Reservation } from '../models/reservation.model';


@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'https://localhost:7061/api/Reservation';

  constructor(private http: HttpClient) {}

  createReservation(request: ReservationRequestDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, request);
  }

getUserReservations(userId: number) {
  return this.http.get<any[]>(`${this.apiUrl}/my-reservations/${userId}`);
}
 getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}/reservations`);
  }

  approveReservation(reservationId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/approve/${reservationId}`, {});
  }
}
