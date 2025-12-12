using FlightReservations.Enums;

namespace FlightReservations.Models
{
    public class Reservation
    {
        public int Id { get; set; }
        public int FlightId { get; set; }
        public Flight Flight { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public ReservationStatus Status { get; set; } = ReservationStatus.Pending;
        public int ReservedSeats { get; set; }
        public double Price { get; set; }
        public int Bags { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public SeatClass SeatClass { get; set; }


        public Reservation() { }
    }
}
