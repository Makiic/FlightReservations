using FlightReservations.Enums;

namespace FlightReservations.DTO
{
    public class ReservationRequestDTO
    {
        public int FlightId { get; set; }
        public int UserId { get; set; }
        public int ReservedSeats { get; set; }
        public SeatClass SeatClass { get; set; }
        public int Bags { get; set; } = 0; 
    }
}
