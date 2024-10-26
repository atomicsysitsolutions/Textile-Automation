using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Security.Cryptography;
using Back_end.Controllers;
namespace Back_end.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Users> Users { get; set; }
        public DbSet<AdminLogin>adminLogins { get; set; }
        public DbSet<vendor> Vendor{ get; set; }
        public DbSet<CompanyProfile> CompanyProfiles { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<ReplyReview> ReplyReviews { get; set; }
        public DbSet<Inquiry> Inquiries { get; set; } // DbSet for inquiries


        public string HashPassword(string password)
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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Use the HashPassword method to hash "admin123"
            string hashedPassword = HashPassword("admin123");

            // Seed the default AdminLogin data with the hashed password
            modelBuilder.Entity<AdminLogin>().HasData(new AdminLogin
            {
                AdminId = 1,
                Name = "Admin",
                Email = "admin@gmail.com",
                Password = hashedPassword, // The hashed password
                Role = "Admin"
            });
        }




    }
}
