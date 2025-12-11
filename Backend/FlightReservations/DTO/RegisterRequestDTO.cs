

using FlightReservations.Enums;

namespace FlightReservations.DTO
{
    public class RegisterRequestDTO
    {
        public string Name { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public int PhoneNumber { get; set; }
        public Roles Role { get; set; }
    }
}
