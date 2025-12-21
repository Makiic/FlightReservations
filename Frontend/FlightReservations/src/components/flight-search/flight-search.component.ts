import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { FlightService } from '../../services/flight.service';
import { City } from '../../enums/city.enum';
import { SignalRService } from '../../services/signalr.service';
import { ReservationService } from '../../services/reservation.service';
import { ReservationRequestDTO } from '../../dto/reservation-request.dto';
import { SeatClass } from '../../enums/seat-class.enum';
import { ReservationModalComponent } from '../reservation-modal/reservation-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MyReservationsComponent } from '../my-reservations/my-reservations.component';
@Component({
  selector: 'app-flight-search',
  standalone: true,
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatCardModule,
    MatDialogModule
  ]
})
export class FlightSearchComponent implements OnInit {
  City = City;
  departureCity: City | null = null;
  arrivalCity: City | null = null;
  directOnly: boolean = false;
  flights: any[] = [];

  constructor(private flightService: FlightService, private dialog: MatDialog, private signalR: SignalRService) { }

  ngOnInit() {
    this.signalR.startConnection();
    this.signalR.reservationUpdated$.subscribe(() => this.searchFlights());
     this.searchFlights();  
  }
  searchFlights() {
    const body = {
      departureCity: this.departureCity,
      arrivalCity: this.arrivalCity,
      directOnly: this.directOnly
    };

    this.flightService.searchFlights(body).subscribe({
      next: (res) => this.flights = res,
      error: (err) => console.error('Search error:', err)
    });
  }

  getCityName(city: City) {
    switch (city) {
      case City.Beograd: return 'Beograd';
      case City.Pristina: return 'Pristina';
      case City.Nis: return 'Niš';
      case City.Kraljevo: return 'Kraljevo';
      default: return 'Nepoznato';
    }
  }

  openReservationModal(flightId: number) {
    const dialogRef = this.dialog.open(ReservationModalComponent, {
      width: '400px',
      data: { flightId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Reservation created:', result);
      }
    });
  }
  openMyReservations() {
    const dialogRef = this.dialog.open(MyReservationsComponent, {
      width: '75vw',
      height: '90vh',
      maxWidth: 'none',
      maxHeight: 'none',
      panelClass: 'large-modal'
    });


    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Reservation created:', result);
      }
    });
  }
  clearSearch() {
    this.departureCity = null;
  this.arrivalCity = null;
  this.directOnly = false;
   this.flights = [];
    this.signalR.startConnection();
  this.searchFlights();
    
  }

}
