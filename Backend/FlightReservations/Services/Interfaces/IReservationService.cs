using FlightReservations.DTO;
using FlightReservations.Models;

namespace FlightReservations.Services.Interfaces
{
    public interface IReservationService
    {
        Task<Reservation> CreateReservation(ReservationRequestDTO request);
        Task<IEnumerable<Reservation>> GetUserReservations(int userId);
        Task<bool> ApproveReservation(int reservationId);
        Task<IEnumerable<Reservation>> GetReservations();

    }
}
