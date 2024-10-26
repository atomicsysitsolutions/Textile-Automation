namespace Back_end.DTOs
{
    public class InquiryDetailDto
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string InquiryText { get; set; }
        public DateTime CreatedAt { get; set; }
        public string ProductName { get; set; }
    }
}
