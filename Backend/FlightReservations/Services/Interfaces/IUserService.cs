using FlightReservations.DTO;
using FlightReservations.Models;

namespace FlightReservations.Services.Interfaces
{
    public interface IUserService
    {
        User Register(RegisterRequestDTO request);
    }
}
