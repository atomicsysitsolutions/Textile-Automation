using System.ComponentModel.DataAnnotations;

namespace Back_end.Models
{
    public class AdminLogin
    {
        [Key]
  
        public int AdminId { get; set; }

        public string Name { get; set; } = "Admin";
        public string Email { get; set; } = "admin@gmail.com";
        public string Password { get; set; } = "admin123";
        public string Role { get; set; } = "Admin";

        
    }
}
