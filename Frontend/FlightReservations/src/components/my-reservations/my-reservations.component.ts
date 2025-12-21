import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { SignalRService } from '../../services/signalr.service'; // ako koristiš SignalR
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { City } from '../../enums/city.enum';
import { SeatClass } from '../../enums/seat-class.enum';
import { ReservationStatus } from '../../enums/reservation-status.enum';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-my-reservations',
  standalone: true,
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.css'],
  imports: [CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule],
})
export class MyReservationsComponent implements OnInit {
  reservations: any[] = [];
  currentUserId = 1;

  constructor(
    private reservationService: ReservationService,
    private signalRService: SignalRService,
    private dialogRef: MatDialogRef<MyReservationsComponent>
  ) {}

  ngOnInit(): void {
    this.loadReservations();

    this.signalRService.reservationUpdated$
      .subscribe(() => {
        this.loadReservations();
      });
  }

  loadReservations() {
    this.reservationService
      .getUserReservations(this.currentUserId)
      .subscribe(res => {
        this.reservations = res;
      });
  }

  getCityName(id: number) {
    return City[id] ?? 'Nepoznat grad';
  }

  getSeatClassName(id: number) {
    return SeatClass[id] ?? 'Nepoznata klasa';
  }

  getStatusName(id: number) {
    return ReservationStatus[id] ?? 'Nepoznat status';
  }

  close() {
    this.dialogRef.close();
  }
}
