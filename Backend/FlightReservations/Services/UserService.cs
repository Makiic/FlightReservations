using FlightReservations.Data;
using FlightReservations.DTO;
using FlightReservations.Models;
using FlightReservations.Services.Interfaces;
using Microsoft.AspNetCore.Identity;

public class UserService : IUserService
{
    private readonly AppDbContext _context;
    private readonly PasswordHasher<User> _passwordHasher;

    public UserService(AppDbContext context)
    {
        _context = context;
    }

    public User Register(RegisterRequestDTO request)
    {
        if (_context.Users.Any(u => u.Username == request.Username))
            throw new Exception("Username already exists");

        var newUser = new User
        {
            Name = request.Name,
            Username = request.Username,
            Email = request.Email,
            PhoneNumber = request.PhoneNumber,
            Role = request.Role
        };

        newUser.Password = request.Password;

        _context.Users.Add(newUser);
        _context.SaveChanges();

        return newUser;
    }
}
