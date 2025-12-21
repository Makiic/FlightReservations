
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class SignalRService {
  private hubConnection!: signalR.HubConnection;

  reservationUpdated$ = new Subject<number>();

  startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7061/reservationHub')
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start()
      .catch(err => console.error(err));

    this.hubConnection.on(
      'ReceiveReservationUpdate',
      (flightId: number) => {
        this.reservationUpdated$.next(flightId);
      }
    );
  }
}
