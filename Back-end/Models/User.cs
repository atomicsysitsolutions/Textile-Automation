using System.ComponentModel.DataAnnotations;

namespace Back_end.Models
{
    public class Users
    {

        [Key]
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }

        public string PhoneNumber { get; set; }

        public string Role { get; set; } = "Customer";

        public List<Review> Reviews { get; set; }

        public List<Inquiry> Inquiry { get; set; }



    }
}
