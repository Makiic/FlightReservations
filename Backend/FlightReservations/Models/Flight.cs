using FlightReservations.Enums;

namespace FlightReservations.Models
{
    public class Flight
    {
        public int Id { get; set; }
        public City DepartureCity { get; set; }
        public City ArrivalCity { get; set; }
        public DateTime FlightDate { get; set; }
        public int Layovers { get; set; }
        public int TotalSeats { get; set; }
        public int AvailableSeats { get; set; }
        public bool IsCanceled { get; set; }

        public Flight() { }


    }
}
