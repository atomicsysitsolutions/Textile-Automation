using System.ComponentModel.DataAnnotations;

namespace Back_end.DTOs
{
    public class UserDtoCreate
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]

        public string PhoneNumber { get; set; }
    }

    public class UserDetailDto

    {
        public int UserId { get; set; }
    
        public string Name { get; set; }


        public string Email { get; set; }

        public string PhoneNumber { get; set; }

        public string Role { get; set; }
    }


    public class UserIdDto
    {
        public int UserId { get; set; }
    }
}
