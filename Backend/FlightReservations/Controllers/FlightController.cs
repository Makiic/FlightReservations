using FlightReservations.DTO;
using FlightReservations.Models;
using FlightReservations.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FlightReservations.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FlightController : ControllerBase
    {
        private readonly IFlightService _flightService;

        public FlightController(IFlightService flightService)
        {
            _flightService = flightService;
        }
        [HttpPost]
        [Authorize(Roles = "Agent")]
        public IActionResult CreateFlight([FromBody] FlightDTO flight)
        {
            var created = _flightService.CreateFlight(flight);
            return Ok(created);
        }
        [HttpGet]
        [Authorize(Roles = "Agent, Administrator")]
        public IActionResult GetAllFlights()
        {
            var flights = _flightService.GetAllFlights();
            var flightsWithFlag = flights.Select(f => new
            {
                f.Id,
                f.DepartureCity,
                f.ArrivalCity,
                f.FlightDate,
                f.Layovers,
                f.TotalSeats,
                f.AvailableSeats,
                f.IsCanceled,
                LowSeats = f.AvailableSeats < 5
            });

            return Ok(flightsWithFlag);
        }
        [HttpDelete("{flightId}")]
        [Authorize(Roles = "Administrator")]
        public IActionResult DeleteFlight(int flightId)
        {
            _flightService.DeleteFlight(flightId);

            return Ok();
        }
        [HttpPost("search")]
        [Authorize(Roles = "Visitor")]
        public IActionResult SearchFlights([FromBody] FlightSearchDTO search)
        {
            var flights = _flightService.SearchFlights(search);
            return Ok(flights);
        }
     


    }
}
