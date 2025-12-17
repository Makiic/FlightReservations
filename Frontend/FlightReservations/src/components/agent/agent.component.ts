import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- za *ngFor, *ngIf
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule ,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
   MatDatepickerModule,
    MatNativeDateModule]
})
export class AgentComponent implements OnInit {

  flights: FlightWithFlag[] = [];
  successMessage = '';
  errorMessage = '';
  readonly City = City;
  constructor(private flightService: FlightService) {}

  ngOnInit() {
    this.loadFlights();
  }

  loadFlights() {
    this.flightService.getAllFlights().subscribe({
      next: (res) => this.flights = res,
      error: (err) => this.errorMessage = 'Failed to load flights'
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
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const flight: FlightDTO = {
      departureCity: Number(formData.get('departureCity')) as unknown as City,
      arrivalCity:   Number(formData.get('arrivalCity')) as unknown as City,
      flightDate:    new Date(formData.get('flightDate') as string).toISOString(),
      layovers:      Number(formData.get('layovers')),
      totalSeats:    Number(formData.get('totalSeats')),
      availableSeats:Number(formData.get('totalSeats')),
      isCanceled:    false
    };

    this.flightService.createFlight(flight).subscribe({
      next: () => {
        this.successMessage = 'Flight created successfully';
        this.errorMessage = '';
        form.reset();
        this.loadFlights();
      },
      error: (err) => {
        this.errorMessage = 'Failed to create flight';
        this.successMessage = '';
      }
    });
  }

  approveReservation(reservationId: number) {
    this.flightService.approveReservation(reservationId).subscribe({
      next: () => this.loadFlights(),
      error: (err) => this.errorMessage = 'Failed to approve reservation'
    });
  }
}
