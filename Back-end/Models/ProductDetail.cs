using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Back_end.Models
{
   

    public class Product
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string FabricType { get; set; }
        public string GSM { get; set; }
        public string WeaveType { get; set; }
        public string MaterialComposition { get; set; }
 
        public string Cost { get; set; }
        public string DeliveryTime { get; set; }
        public string MinimumOrder { get; set; }

        [ForeignKey("CompanyProfile")]
        public int CompanyId { get; set; }

        public CompanyProfile CompanyProfile { get; set; }

        // Reference to the vendor's company profile

        public byte[] ProductImage { get; set; }



        public List<Review> Reviews { get; set; }

        public List<Inquiry>inquiries { get; set; }



    }

 


}
