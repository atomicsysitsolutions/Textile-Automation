using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Back_end.Models;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Identity;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Back_end.DTOs;
using AutoMapper;

namespace Back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;
        public UsersController(AppDbContext context, IConfiguration configuration, IMapper mapper)
        {
            _context = context;
            _configuration = configuration;
            _mapper = mapper;
        }

        private object GenerateJwtToken(TokenUserDto user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
            new Claim(JwtRegisteredClaimNames.Sub, user.Name),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim("UserId", user.UserId.ToString()) // Custom claim to store the user's ID
        };

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(3), // Token validity period
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }


        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Users>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Users>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, Users user)
        {
            if (id != user.UserId)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("register")]
        public async Task<ActionResult<Users>> PostUser(UserDtoCreate userDtoCreate)
        {
            if (string.IsNullOrEmpty(userDtoCreate.Name) || string.IsNullOrEmpty(userDtoCreate.Password) ||
             string.IsNullOrEmpty(userDtoCreate.Email) || string.IsNullOrEmpty(userDtoCreate.PhoneNumber))
            {
                return BadRequest("All fields are required.");
            }

            // Validate email format
            if (!IsValidEmail(userDtoCreate.Email))
            {
                return BadRequest("Invalid email format.");
            }

            // Add additional password strength validation as needed

            // Check if the email is already registered
            if (_context.Users.Any(u => u.Email == userDtoCreate.Email))
            {
                return BadRequest("Email is already registered.");
            }

            // Hash the password before storing it
            userDtoCreate.Password = HashPassword(userDtoCreate.Password);

            // Add the user to the database
            var user = _mapper.Map<Users>(userDtoCreate);
            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok("Registration successful");
        }

        private string HashPassword(string password)
        {
            // Generate a unique salt for each user
            byte[] salt = new byte[16];
            using (var rng = System.Security.Cryptography.RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }

            // Hash the password with the salt using PBKDF2
            string hashedPassword = Convert.ToBase64String(
                KeyDerivation.Pbkdf2(
                    password: password,
                    salt: salt,
                    prf: KeyDerivationPrf.HMACSHA256,
                    iterationCount: 10000,
                    numBytesRequested: 256 / 8
                )
            );

            // Combine the salt and hashed password for storage
            return $"{Convert.ToBase64String(salt)}:{hashedPassword}";
        }

        private bool IsValidEmail(string email)
        {
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }


        [HttpPost("login")]
        public async Task<ActionResult> Login(UserLogin loginRequest)
        {
            // Validate input...
            if (string.IsNullOrEmpty(loginRequest.Email) || string.IsNullOrEmpty(loginRequest.Password))
            {
                return BadRequest("Email and password are required.");
            }

            // Initialize a generic user object
            var genericUser = new
            {
                UserId = 0,
                Name = "",
                Password = "",
                Email = "",
                Role = ""
            };

            // Find the user by email in Users table
            var user = await _context.Users
                .SingleOrDefaultAsync(u => u.Email == loginRequest.Email);
            if (user != null)
            {
                genericUser = new
                {
                    UserId = user.UserId,
                    Name = user.Name,
                    Password = user.Password,
                    Email = user.Email,
                    Role = user.Role
                };
            }
            var admin = await _context.adminLogins
             .SingleOrDefaultAsync(a => a.Email == loginRequest.Email);
            if (admin != null)
            {
                genericUser = new
                {
                    UserId = admin.AdminId,
                    Name = admin.Name,
                    Password = admin.Password,
                    Email = admin.Email,
                    Role = admin.Role
                };
            }
            else
            {
                // If not found in Users, try finding the user in the Vendors table
                var vendor = await _context.Vendor
                    .SingleOrDefaultAsync(v => v.Email == loginRequest.Email);
                if (vendor != null)
                {
                    genericUser = new
                    {
                        UserId = vendor.VendorId,
                        Name = vendor.Name,
                        Password = vendor.Password,
                        Email = vendor.Email,
                        Role = vendor.Role
                    };
                }
            }

            // If no user found in either table
            if (genericUser.UserId == 0)
            {
                return BadRequest("Invalid email or password.");
            }

            // Verify the entered password with the stored hashed password
            if (!VerifyPassword(loginRequest.Password, genericUser.Password))
            {
                return BadRequest("Invalid email or password.");
            }

            // Generate JWT token for the authenticated user
            var tokenUserDto = new TokenUserDto
            {
                UserId = genericUser.UserId,
                Name = genericUser.Name,
                Email = genericUser.Email,
                Role = genericUser.Role
            };

            var token = GenerateJwtToken(tokenUserDto);

            // Return the token in the response
            return Ok(new
            {
                Token = token,
                Message = "Login Successful",
                UserId = genericUser.UserId,
                UserName = genericUser.Name,
                UserEmail = genericUser.Email,
                UserRole = genericUser.Role,
            });
        }




        private bool VerifyPassword(string enteredPassword, string storedHashedPassword)
        {
            // Extract the salt and stored hashed password from the stored value
            var parts = storedHashedPassword.Split(':');
            if (parts.Length != 2)
            {
                return false; // Invalid stored password format
            }

            var salt = Convert.FromBase64String(parts[0]);
            var storedHash = Convert.FromBase64String(parts[1]);

            // Hash the entered password with the stored salt
            var enteredPasswordHash = KeyDerivation.Pbkdf2(
                password: enteredPassword,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 10000,
                numBytesRequested: 256 / 8
            );

            // Compare the hashed entered password with the stored hashed password
            return enteredPasswordHash.SequenceEqual(storedHash);
        }



        // DELETE: api/Users/5
        [HttpDelete ("DeleteCustomer")]
        public async Task<IActionResult> DeleteUser([FromBody] UserIdDto userDeleteDto)
        {
            var user = await _context.Users.FindAsync(userDeleteDto.UserId);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.UserId == id);
        }
    }
}
