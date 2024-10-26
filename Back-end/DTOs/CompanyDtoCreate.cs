namespace Back_end.DTOs
{
    public class CompanyDtoCreate
    {
        public int VendorId { get; set; }
        public string CompanyName { get; set; }
        public string Description { get; set; }
        public string ExportMarket { get; set; }
        public string Country { get; set; }


    }

    public class VendorIdRequest
    {
        public int VendorId { get; set; }
    }

 
}
