using Azure.Core;
using FlightReservations.DTO;
using FlightReservations.Enums;
using FlightReservations.Hubs;
using FlightReservations.Models;
using FlightReservations.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace FlightReservations.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReservationController : ControllerBase
    {
        private readonly IReservationService _reservationService;
        private readonly IHubContext<ReservationHub> _hubContext;
        public ReservationController(IReservationService reservationService, IHubContext<ReservationHub> hubContext)
        {
            _reservationService = reservationService;
            _hubContext = hubContext;
        }
        [HttpPost("create")]
        [Authorize(Roles = "Visitor")]
        public async Task<IActionResult> CreateReservation([FromBody] ReservationRequestDTO request)
        {
            try
            {
                // Uzmi UserId iz tokena
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userIdClaim))
                    return Unauthorized("User not found");

                request.UserId = int.Parse(userIdClaim);

                await _hubContext.Clients.All.SendAsync("ReceiveReservationUpdate", request.FlightId);
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
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim))
                return Unauthorized("User not found");

            userId = int.Parse(userIdClaim);
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
        [HttpGet("reservations")]
        [Authorize(Roles = "Agent")]
        public async Task<IActionResult> GetReservations()
        {
            var result = await _reservationService.GetReservations();
            return Ok(result);
        }
    }
}
