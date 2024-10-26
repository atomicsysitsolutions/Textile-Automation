using Microsoft.AspNetCore.OpenApi;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
namespace Back_end.Models
{
    public class UserLogin
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class TokenUserDto
    {
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
    }
}
