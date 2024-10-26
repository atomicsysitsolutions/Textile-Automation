using System.ComponentModel.DataAnnotations;
namespace Back_end.DTOs
{
    public class VendorDtoCreate
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]

        public string PhoneNumber { get; set; }

        public IFormFile PdfDocument { get; set; }


    }

    public class VendorDetaillDto
    {
        public int VendorId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Role { get; set; }
        public bool IsApproved { get; set; }
    }

    public class VendordetailDtoCreate
    {
        public int VendorId { get; set; }
  
    }
}
