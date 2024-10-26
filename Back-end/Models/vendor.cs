namespace Back_end.Models
{
    public class vendor
    {
        public int VendorId { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }

        public string PhoneNumber { get; set; }
        public byte[] PdfDocument { get; set; }
        public string Role { get; set; } = "Vendor";

        public bool IsApproved { get; set; } = false;

        public List<CompanyProfile> CompanyProfiles { get; set; }
    }
}
