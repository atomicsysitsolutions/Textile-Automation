using System.ComponentModel.DataAnnotations;

namespace Back_end.DTOs
{
    public class ReviewDtoCreate
    {
        [Required]
        public string ReviewText { get; set; }
      
        [Required]
        public DateTime CreatedAt { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public int ProductId { get; set; }
    }


    public class ProductIdRequest
    {
        public int ProductId { get; set; }
    }

    public class ReviewDetailsDto
    {
        public int ReviewId { get; set; }
        public string Name { get; set; }
       
        public string ReviewText { get; set; }
        public int Rating { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
