// signalr.service.ts
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SignalRService {
    private hubConnection!: signalR.HubConnection;
    public reservationsUpdated = new BehaviorSubject<void>(undefined);
    public reservations$ = new BehaviorSubject<any[]>([]);
    public startConnection() {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl('https://localhost:5001/reservationHub')
            .withAutomaticReconnect()
            .build();

        this.hubConnection
            .start()
            .then(() => console.log('SignalR connected'))
            .catch(err => console.log('Error connecting SignalR: ', err));
        this.hubConnection.on('ReceiveReservationUpdate', (reservation: any) => {

            const current = this.reservations$.getValue();
            const index = current.findIndex(r => r.id === reservation.id);
            if (index > -1) {
                current[index] = reservation;
            } else {
                current.push(reservation);
            }
            this.reservations$.next([...current]);
        });

    }
}
