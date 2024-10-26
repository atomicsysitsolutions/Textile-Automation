using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Back_end.Models
{
    public class Review
    {
        public int ReviewId { get; set; }
      
        public string ReviewText { get; set; }
        public string ReviewSentiment { get; set; }
        public DateTime CreatedAt { get; set; }
        
        [ForeignKey("Users")]
        public int UserId { get; set; }
        public Users Users { get; set; }

        [ForeignKey("Product")]
        public int ProductId { get; set; }
        public Product Product { get; set; }

        public List<ReplyReview> ReplyReviews { get; set; }
    }
}
