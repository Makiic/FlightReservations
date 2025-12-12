using Microsoft.IdentityModel.Tokens;
using System.Security.Cryptography;
using System.Text;

namespace FlightReservations.Services
{
    public class JwtKeyProvider
    {
        public SymmetricSecurityKey SigningKey { get; }

        public JwtKeyProvider()
        {
            var keyBytes = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(keyBytes);
            }
            var jwtKey = Convert.ToBase64String(keyBytes);

            SigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
        }
    }
}
