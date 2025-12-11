using FlightReservations.Data;
using FlightReservations.DTO;
using FlightReservations.Models;
using FlightReservations.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost("register")]
    [Authorize(Roles = "Administrator")]
    public IActionResult Register([FromBody] RegisterRequestDTO request)
    {
        try
        {
            var user = _userService.Register(request);
            return Ok("Successfully registered user " + user.Username);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}