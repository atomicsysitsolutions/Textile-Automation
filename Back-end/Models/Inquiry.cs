using System.ComponentModel.DataAnnotations.Schema;

namespace Back_end.Models
{
    public class Inquiry
    {
        public int InquiryId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string InquiryText { get; set; }

        public DateTime CreatedAt { get; set; }

        [ForeignKey("Product")]
        public int ProductId { get; set; } // Reference to the product

        public Product Product { get; set; }


        [ForeignKey("Users")]
        public int UserId { get; set; }
        public Users Users { get; set; }
    }


}
