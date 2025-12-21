using FlightReservations.Data;
using FlightReservations.DTO;
using FlightReservations.Models;
using FlightReservations.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace FlightReservations.Services
{
    public class FlightService: IFlightService
    {
        private readonly AppDbContext _dbContext;
        public FlightService(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Flight CreateFlight(FlightDTO flight)
        {
            var entity = new Flight
            {
                DepartureCity = flight.DepartureCity,
                ArrivalCity = flight.ArrivalCity,
                FlightDate = flight.FlightDate,
                Layovers = flight.Layovers,
                TotalSeats = flight.TotalSeats,
                AvailableSeats = flight.TotalSeats,
                IsCanceled = flight.IsCanceled
            };

            _dbContext.Flights.Add(entity);
            _dbContext.SaveChanges();

            flight.AvailableSeats = entity.AvailableSeats;
            return entity;
        }
        public IEnumerable<Flight> GetAllFlights()
        {
            return _dbContext.Flights.ToList();
        }
        public void DeleteFlight(int id)
        {
            
            var existingFlight = _dbContext.Flights.FirstOrDefault(f => f.Id == id);
            if (existingFlight == null)
                return;

            var relatedReservations = _dbContext.Reservations
                                                .Where(r => r.FlightId == id)
                                                .ToList();

            if (relatedReservations.Any())
            {
                _dbContext.Reservations.RemoveRange(relatedReservations);
            }

            _dbContext.Flights.Remove(existingFlight);

            _dbContext.SaveChanges();
        }

        public IEnumerable<Flight> SearchFlights(FlightSearchDTO search)
        {
            var query = _dbContext.Flights.AsQueryable();
            if (search.DepartureCity != null) 
            {
                query = query.Where(f => f.DepartureCity == search.DepartureCity);
            }
            if (search.ArrivalCity != null)
            {
                query = query.Where(f => f.ArrivalCity == search.ArrivalCity);
            }
            query = query.Where(f => f.AvailableSeats > 0);
            if (search.DirectOnly)
            {
                query = query.Where(f => f.Layovers == 0);
            }
            return query.ToList();
        }
       


    }
}
