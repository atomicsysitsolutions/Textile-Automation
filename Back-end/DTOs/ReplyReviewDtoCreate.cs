namespace Back_end.DTOs
{
    public class ReplyReviewDtoCreate
    {
        
        public string ReplyText { get; set; }
        public DateTime CreatedAt { get; set; }
        public int ReviewId { get; set; }


    }
    public class ReplyReviewWithProductDto
    {
        public string ReplyText { get; set; }
        public DateTime CreatedAt { get; set; }
        public int ReviewId { get; set; }
        public string ProductName { get; set; } // Product name from the product ID
    }



}
