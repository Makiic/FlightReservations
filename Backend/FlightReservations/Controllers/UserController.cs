using FlightReservations.Data;
using FlightReservations.DTO;
using FlightReservations.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly PasswordHasher<User> _passwordHasher;

    public UserController(AppDbContext context)
    {
        _context = context;
        _passwordHasher = new PasswordHasher<User>();
    }

    [HttpPost("register")]
    [Authorize(Roles = "Administrator")]
    public IActionResult Register([FromBody] RegisterRequestDTO request)
    {
        if (_context.Users.Any(u => u.Username == request.Username))
            return BadRequest("Username already exists");

        var newUser = new User
        {
            Name = request.Name,
            Username = request.Username,
            Email = request.Email,
            PhoneNumber = request.PhoneNumber,
            Role = request.Role,
            Password= request.Password,
        };

        

        _context.Users.Add(newUser);
        _context.SaveChanges();

        return Ok("Succsesfull");
    }
}
