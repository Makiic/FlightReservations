using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using FlightReservations.Data;
using FlightReservations.Models;
using FlightReservations.Services;
using Microsoft.AspNetCore.Identity.Data;
using FlightReservations.DTO;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly AuthService _authService;

    public AuthController(AppDbContext context, AuthService authService)
    {
        _context = context;
        _authService = authService;
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequestDTO request)
    {
        var user = _context.Users.SingleOrDefault(u => u.Username == request.Username);
        if (user == null)
            return Unauthorized("Wrong username");

        if (user.Password != request.Password)
            return Unauthorized("Wrong password");

        var token = _authService.GenerateJwtToken(user);
        return Ok(new LoginResponseDTO
        {
            Token = token,
            Username = user.Username,
            Role = user.Role.ToString()
        });
    }
}
