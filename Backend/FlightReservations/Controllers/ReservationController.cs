using FlightReservations.DTO;
using FlightReservations.Models;
using FlightReservations.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FlightReservations.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReservationController : ControllerBase
    {
        private readonly IReservationService _reservationService;

        public ReservationController(IReservationService reservationService)
        {
            _reservationService = reservationService;
        }

        [HttpPost("create")]
        [Authorize(Roles = "Visitor")]
        public async Task<IActionResult> CreateReservation([FromBody] ReservationRequestDTO request)
        {
            try
            {
                var reservation = await _reservationService.CreateReservation(request);
                return Ok(reservation);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("my-reservations/{userId}")]
        [Authorize(Roles = "Visitor")]
        public async Task<IActionResult> GetUserReservations(int userId)
        {
            var reservations = await _reservationService.GetUserReservations(userId);
            return Ok(reservations);
        }
        [HttpPut("approve/{reservationId}")]
        [Authorize(Roles = "Agent")]
        public async Task<IActionResult> ApproveReservation(int reservationId)
        {
            var result = await _reservationService.ApproveReservation(reservationId);
            if (!result)
                return BadRequest("Unable to approve reservation");

            return Ok(new { message = "Reservation approved successfully" });
        }
    }
}
