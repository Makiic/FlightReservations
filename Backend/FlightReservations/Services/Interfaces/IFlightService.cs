using FlightReservations.DTO;
using FlightReservations.Models;

namespace FlightReservations.Services.Interfaces
{
    public interface IFlightService
    {
        Flight CreateFlight (FlightDTO flight);
        IEnumerable<Flight> GetAllFlights();
        void DeleteFlight (int id);
        IEnumerable<Flight> SearchFlights(FlightSearchDTO search);
        
    }
}
