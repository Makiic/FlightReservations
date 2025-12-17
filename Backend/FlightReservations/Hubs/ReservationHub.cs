using Microsoft.AspNetCore.SignalR;
namespace FlightReservations.Hubs
{
    public class ReservationHub : Hub
    {
     
        public async Task SendReservationUpdate(int flightId)
        {
            await Clients.All.SendAsync("ReceiveReservationUpdate", flightId);
        }
    }
}