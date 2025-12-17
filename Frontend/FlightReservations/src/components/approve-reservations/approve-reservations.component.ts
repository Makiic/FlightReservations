import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReservationService } from '../../services/reservation.service';
import { Reservation } from '../../models/reservation.model';
import { ReservationStatus } from '../../enums/reservation-status.enum';
import { City } from '../../enums/city.enum';
import { SeatClass } from '../../enums/seat-class.enum';
import { RouterModule } from '@angular/router';
import { AgentComponent } from '../agent/agent.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-approve-reservations',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    RouterModule,
    AgentComponent
  ],
  templateUrl: './approve-reservations.component.html',
  styleUrls: ['./approve-reservations.component.css']
})
export class ApproveReservationsComponent implements OnInit {
  reservations: Reservation[] = [];
  loading = false;
  ReservationStatus = ReservationStatus;
  constructor(private reservationService: ReservationService, private dialog: MatDialog) { }
  showAgentPanel = false;
  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations() {
    this.loading = true;
    this.reservationService.getReservations().subscribe({
      next: (res) => {
        this.reservations = res;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  approve(reservationId: number) {
    this.reservationService.approveReservation(reservationId).subscribe({
      next: () => this.loadReservations(),
      error: (err) => console.error(err)
    });
  }
  getCityName(city?: City) {
    switch (city) {
      case City.Beograd: return 'Beograd';
      case City.Pristina: return 'Pristina';
      case City.Nis: return 'Niš';
      case City.Kraljevo: return 'Kraljevo';
      default: return 'Nepoznato';
    }
  }
  getStatus(status: ReservationStatus): string {
    switch (status) {
      case ReservationStatus.Pending: return 'Pending'
      case ReservationStatus.Confirmed: return 'Confirmed'; // zeleno
      case ReservationStatus.Cancelled: return 'Cancelled'; // crveno

    }
  }
  getSeatClass(seatClass?: SeatClass) {
    switch (seatClass) {
      case SeatClass.Economy: return 'Economy';
      case SeatClass.Business: return 'Business';
      case SeatClass.FirstClass: return 'First Class';
      default: return 'Nepoznato';
    }

  }
  openAgentPanel() {
    this.dialog.open(AgentComponent, {
      width: '95vw',
      height: '95vh',
      maxWidth: 'none',
      panelClass: 'agent-dialog'
    });
  }

}
