import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReservationService } from '../../services/reservation.service';
import { SeatClass } from '../../enums/seat-class.enum';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-reservation-modal',
  standalone: true,
  templateUrl: './reservation-modal.component.html',
  styleUrls: ['./reservation-modal.component.css'],
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule]
})
export class ReservationModalComponent {
  form: FormGroup;
  SeatClass = SeatClass;

  constructor(
    private fb: FormBuilder,
    private reservationService: ReservationService,
    private dialogRef: MatDialogRef<ReservationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { flightId: number }
  ) {
    this.form = this.fb.group({
      reservedSeats: [1, [Validators.required, Validators.min(1)]],
      seatClass: [SeatClass.Economy, Validators.required],
      bags: [0, [Validators.required, Validators.min(0)]]
    });
  }

  submit() {
    if (this.form.invalid) return;

    const request = {
      flightId: this.data.flightId,
      reservedSeats: this.form.value.reservedSeats,
      seatClass: Number(this.form.value.seatClass),
      bags: this.form.value.bags ?? 0
    };

    console.log('Reservation request:', request);

    this.reservationService.createReservation(request).subscribe({
      next: (res) => this.dialogRef.close(res),
      error: (err) => {
        console.error('Reservation error:', err);
        alert('Failed to create reservation');
      }
    });
  }
  close() {
    this.dialogRef.close();
  }

}
