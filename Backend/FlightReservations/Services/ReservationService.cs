using FlightReservations.Data;
using FlightReservations.DTO;
using FlightReservations.Enums;
using FlightReservations.Hubs;
using FlightReservations.Models;
using FlightReservations.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace FlightReservations.Services
{
    public class ReservationService : IReservationService
    {
        private readonly AppDbContext _dbContext;
        private readonly IHubContext<ReservationHub> _hubContext;

        public ReservationService(AppDbContext dbContext, IHubContext<ReservationHub> hubContext)
        {
            _dbContext = dbContext;
            _hubContext = hubContext;
        }

        public async Task<Reservation> CreateReservation(ReservationRequestDTO request)
        {
            var flight = await _dbContext.Flights.FindAsync(request.FlightId);
            if (flight == null)
                throw new Exception("Flight not found");

            if (flight.FlightDate < DateTime.UtcNow.AddDays(3))
                throw new Exception("Cannot book a flight less than 3 days away");

            if (request.ReservedSeats > flight.AvailableSeats)
                throw new Exception("Not enough seats available");

            var reservation = new Reservation
            {
                FlightId = flight.Id,
                UserId = request.UserId,
                ReservedSeats = request.ReservedSeats,
                Bags = request.Bags,
                SeatClass = request.SeatClass,
                Status = Enums.ReservationStatus.Pending,
                Price = request.ReservedSeats * 100,
                CreatedAt = DateTime.UtcNow
            };

            flight.AvailableSeats -= request.ReservedSeats;

            _dbContext.Reservations.Add(reservation);
            await _dbContext.SaveChangesAsync();


            await _hubContext.Clients.All.SendAsync("ReceiveReservationUpdate", flight.Id);

            return reservation;
        }

        public async Task<IEnumerable<Reservation>> GetUserReservations(int userId)
        {
            return await _dbContext.Reservations
                .Include(r => r.Flight)
                .Where(r => r.UserId == userId)
                .ToListAsync();
        }

        public async Task<bool> ApproveReservation(int reservationId)
        {
            var reservation = await _dbContext.Reservations
                .Include(r => r.Flight)
                .FirstOrDefaultAsync(r => r.Id == reservationId);

            if (reservation == null)
                throw new Exception("Reservation not found");

            if (reservation.Status != ReservationStatus.Pending)
                throw new Exception("Reservation is already processed");
            reservation.Status = ReservationStatus.Approved;
       

            await _dbContext.SaveChangesAsync();

            // Obavesti sve klijente da je rezervacija ažurirana
            await _hubContext.Clients.All.SendAsync("ReceiveReservationUpdate", reservation.FlightId);

            return true;
        }
        public async Task<IEnumerable<Reservation>> GetReservations()
        {
            return await _dbContext.Reservations
                .Include(r => r.Flight)
                .Include(r=>r.User)
                .ToListAsync();
        }

    }
}
