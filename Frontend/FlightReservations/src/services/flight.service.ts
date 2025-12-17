import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FlightDTO } from '../dto/flight.dto';
import { FlightWithFlag } from '../dto/flight-flag.dto';
import { FlightSearchComponent } from '../components/flight-search/flight-search.component';
import { Flight } from '../models/flight.model';
import { FlightSearchRequest } from '../dto/flight-search-request.dto';



@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private apiUrl = `https://localhost:7061/api/Flight`;

  constructor(private http: HttpClient) {}

createFlight(flight: FlightDTO): Observable<FlightDTO> {
    const token = localStorage.getItem('token'); // JWT token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<FlightDTO>(this.apiUrl, flight, { headers });
  }

  getAllFlights(): Observable<FlightWithFlag[]> {
    return this.http.get<FlightWithFlag[]>(`${this.apiUrl}`);
  }

  approveReservation(reservationId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/Reservation/approve/${reservationId}`, {});
  }

  searchFlights(search: FlightSearchRequest): Observable<Flight[]> {
    return this.http.post<Flight[]>(`${this.apiUrl}/search`, search);
  }
      deleteFlight(flightId: number): Observable<any> {
   return this.http.delete(`${this.apiUrl}/${flightId}`, {  });
  }
}
