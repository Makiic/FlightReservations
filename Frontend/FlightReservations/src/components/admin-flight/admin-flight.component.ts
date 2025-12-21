import { Component, OnInit } from '@angular/core';
import { FlightService } from '../../services/flight.service';
import { Flight } from '../../models/flight.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardActions, MatCardContent, MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-admin-flight',
  standalone: true,
  templateUrl: './admin-flight.component.html',
  styleUrls: ['./admin-flight.component.css'],
  imports: [MatCardActions, MatCardContent,
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    HttpClientModule
  ]
})
export class AdminFlightComponent implements OnInit {

  flights: Flight[] = [];
  loading = true;

  constructor(
    private flightService: FlightService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadFlights();
  }

  loadFlights() {
    this.loading = true;
    this.flightService.getAllFlights().subscribe({
      next: (res) => {
        this.flights = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.snackBar.open('Failed to load flights', 'Close', { duration: 3000 });
      }
    });
  }

  deleteFlight(flightId: number) {
    if (!confirm('Are you sure you want to delete this flight?')) return;

    this.flightService.deleteFlight(flightId).subscribe({
      next: () => {
        this.snackBar.open('Flight deleted', 'Close', { duration: 2000 });
        this.loadFlights();
      },
      error: () => this.snackBar.open('Failed to delete flight', 'Close', { duration: 3000 })
    });
  }

  getCityName(city: any): string {
    switch (city) {
      case 0: return 'Beograd';
      case 1: return 'Pristina';
      case 2: return 'Niš';
      case 3: return 'Kraljevo';
      default: return 'Nepoznato';
    }
  }
 openRegisterModal() {
  this.dialog.open(RegisterComponent, {
    width: '390px',
   
    panelClass: 'custom-dialog',
    autoFocus: false
  });
}


}
