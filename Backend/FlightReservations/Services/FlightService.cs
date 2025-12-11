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
            var existing = _dbContext.Flights.FirstOrDefault(f => f.Id == id);
            if (existing != null)
            {
                _dbContext.Flights.Remove(existing);
                _dbContext.SaveChanges();
            }
        }
        public IEnumerable<Flight> SearchFlights(FlightSearchDTO search)
        {
            var query = _dbContext.Flights.AsQueryable();

            query = query.Where(f => f.DepartureCity == search.DepartureCity &&
                                     f.ArrivalCity == search.ArrivalCity &&
                                     f.AvailableSeats > 0);


            if (search.DirectOnly)
                query = query.Where(f => f.Layovers == 0);

            return query.ToList();
        }


    }
}
