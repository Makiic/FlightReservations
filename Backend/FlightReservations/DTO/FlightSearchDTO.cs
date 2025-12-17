using FlightReservations.Enums;
using System;

namespace FlightReservations.DTO
{
    public class FlightSearchDTO
    {
        public City? DepartureCity { get; set; }
        public City? ArrivalCity { get; set; }
        public bool DirectOnly { get; set; } = false;
    }
}
