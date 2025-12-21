import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlightService } from '../../services/flight.service';
import { FlightDTO } from '../../dto/flight.dto';
import { City } from '../../enums/city.enum';
import { FlightWithFlag } from '../../dto/flight-flag.dto';
import { HttpClientModule } from '@angular/common/http';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-agent',
  standalone: true,
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class AgentComponent implements OnInit {

  flights: FlightWithFlag[] = [];

  successMessage = '';
  errorMessage = '';
  dateError = '';

  flightDateValue = '';

  readonly City = City;

  departureCity: City = City.Beograd;
  arrivalCity: City = City.Beograd;

  minDateTime = '';

  cityOptions = [
    { value: City.Beograd, name: 'Beograd' },
    { value: City.Pristina, name: 'Pristina' },
    { value: City.Nis, name: 'Niš' },
    { value: City.Kraljevo, name: 'Kraljevo' },
  ];

  constructor(private flightService: FlightService) {}

  ngOnInit() {
    this.setMinDateTime();
    this.loadFlights();
  }

  // Postavlja minimalni datum i vreme za input
  setMinDateTime() {
    const now = new Date();
    now.setSeconds(0, 0);
    this.minDateTime = now.toISOString().slice(0, 16); // "YYYY-MM-DDTHH:mm"
  }

  loadFlights() {
    this.flightService.getAllFlights().subscribe({
      next: (res) => this.flights = res,
      error: () => this.errorMessage = 'Failed to load flights'
    });
  }

  getCityName(city: City): string {
    switch (city) {
      case City.Beograd: return 'Beograd';
      case City.Pristina: return 'Pristina';
      case City.Nis: return 'Niš';
      case City.Kraljevo: return 'Kraljevo';
      default: return 'Nepoznato';
    }
  }

  createFlight(event: Event) {
    event.preventDefault();

    // Reset poruka
    this.successMessage = '';
    this.errorMessage = '';
    this.dateError = '';

    if (!this.flightDateValue) {
      this.dateError = 'Date and time are required';
      return;
    }

    const flightDate = new Date(this.flightDateValue);
    const now = new Date();
    if (flightDate < now) {
      this.dateError = 'Flight date cannot be in the past';
      return;
    }

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const flight: FlightDTO = {
      departureCity: this.departureCity,
      arrivalCity: this.arrivalCity,
      flightDate: flightDate.toISOString(),
      layovers: Number(formData.get('layovers')),
      totalSeats: Number(formData.get('totalSeats')),
      availableSeats: Number(formData.get('totalSeats')),
      isCanceled: false
    };

    this.flightService.createFlight(flight).subscribe({
      next: () => {
        this.successMessage = 'Flight created successfully';
        form.reset();
        this.flightDateValue = '';
        this.setMinDateTime();
        this.loadFlights();
      },
      error: () => {
        this.errorMessage = 'Failed to create flight';
      }
    });
  }

  approveReservation(reservationId: number) {
    this.flightService.approveReservation(reservationId).subscribe({
      next: () => this.loadFlights(),
      error: () => this.errorMessage = 'Failed to approve reservation'
    });
  }
}
