using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Back_end.Models
{
    public class CompanyProfile
    {
        [Key]
        public int CompanyId { get; set; }
        public string CompanyName { get; set; }
        public string Description { get; set; }
        public string ExportMarket { get; set; }
        public string Country { get; set; }
        public List<Product> Products { get; set; }

        [ForeignKey("vendor")]
        public int VendorId { get; set; }
        public vendor vendor { get; set; }




    }
}
