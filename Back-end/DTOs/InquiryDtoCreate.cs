namespace Back_end.DTOs
{
    public class InquiryDtoCreate
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string InquiryText { get; set; }

     
        public DateTime CreatedAt { get; set; }

        public int ProductId { get; set; }

        public int UserId { get; set; }
    }
    public class ProductInquiryRequestDto
    {
        public int ProductId { get; set; }
    }
}
