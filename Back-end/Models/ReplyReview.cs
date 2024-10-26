using System.ComponentModel.DataAnnotations.Schema;

namespace Back_end.Models
{
    public class ReplyReview
    {
        public int ReplyreviewId { get; set; }
        public string ReplyText { get; set; }
        public DateTime CreatedAt { get; set; }

       

        [ForeignKey("Review")]
        public int ReviewId { get; set; }

        public Review Review { get; set; }




    }
}
