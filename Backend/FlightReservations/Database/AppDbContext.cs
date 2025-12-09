using Microsoft.EntityFrameworkCore;
using FlightReservations.Models;

namespace FlightReservations.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public DbSet<Flight> Flights { get; set; }  
        public DbSet<User> Users { get; set; }
        public DbSet<Reservation> Reservations { get; set; }    
    }
}
