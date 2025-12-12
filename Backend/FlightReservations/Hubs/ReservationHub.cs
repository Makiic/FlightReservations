using Microsoft.AspNetCore.SignalR;
namespace FlightReservations.Hubs
{
    public class ReservationHub : Hub
    {
        // Ova metoda se može koristiti ako želiš da klijent manuelno šalje update
        public async Task SendReservationUpdate(int flightId)
        {
            await Clients.All.SendAsync("ReceiveReservationUpdate", flightId);
        }
    }
}