using AutoMapper;
using Back_end.DTOs;
using Back_end.Models;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class vendorController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;
        public vendorController(AppDbContext context, IConfiguration configuration, IMapper mapper)
        {
            _context = context;
            _configuration = configuration;
            _mapper = mapper;
        }

     

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<vendor>>> GetUsers()
        {
            return await _context.Vendor.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<vendor>> GetUser(int id)
        {
            var vendor = await _context.Vendor.FindAsync(id);

            if (vendor== null)
            {
                return NotFound();
            }

            return vendor;
        }



        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("vendorregister")]
        public async Task<ActionResult<vendor>> PostUser(VendorDtoCreate vendorDtoCreate)
        {
            if (string.IsNullOrEmpty(vendorDtoCreate.Name) || string.IsNullOrEmpty(vendorDtoCreate.Password) ||
             string.IsNullOrEmpty(vendorDtoCreate.Email) || string.IsNullOrEmpty(vendorDtoCreate.PhoneNumber))
            {
                return BadRequest("All fields are required.");
            }

            // Validate email format
            if (!IsValidEmail(vendorDtoCreate.Email))
            {
                return BadRequest("Invalid email format.");
            }

            // Check if the email is already registered
            if (_context.Vendor.Any(u => u.Email == vendorDtoCreate.Email))
            {
                return BadRequest("Email is already registered.");
            }
            if (vendorDtoCreate.PdfDocument == null || vendorDtoCreate.PdfDocument.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            // Limit PDF document size to 2 MB
            if (vendorDtoCreate.PdfDocument.Length > 2 * 1024 * 1024) // 2 MB in bytes
            {
                return BadRequest("File size exceeds 2 MB limit.");
            }

            // Check if the uploaded file is a PDF
            if (vendorDtoCreate.PdfDocument.ContentType.ToLower() != "application/pdf")
            {
                return BadRequest("Only PDF documents are allowed.");
            }

            // Hash the password before storing it
            vendorDtoCreate.Password = HashPassword(vendorDtoCreate.Password);

            // Add the user to the database
            var vendor = _mapper.Map<vendor>(vendorDtoCreate);

            using (var memoryStream = new MemoryStream())
            {
                await vendorDtoCreate.PdfDocument.CopyToAsync(memoryStream);
                vendor.PdfDocument = memoryStream.ToArray(); // Manual handling for the file
            }
            _context.Vendor.Add(vendor);
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

        [HttpDelete("DeleteVendor")]
        public async Task<IActionResult> DeleteUser([FromBody] VendordetailDtoCreate vendorDeleteDto)
        {
            var vendor = await _context.Vendor.FindAsync(vendorDeleteDto.VendorId);
            if (vendor == null)
            {
                return NotFound();
            }

            _context.Vendor.Remove(vendor);
            await _context.SaveChangesAsync();

            return NoContent();
        }













    }
}
