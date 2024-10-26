using System.ComponentModel.DataAnnotations;

namespace Back_end.DTOs
{
    public class ProductDtoCreate
    {
        [Required]
        public string ProductName { get; set; }
        [Required]
        public string FabricType { get; set; }
        [Required]
        public string GSM { get; set; }
        [Required]
        public string WeaveType { get; set; }
        [Required]
        public string MaterialComposition { get; set; }
     
      
        [Required]
        public string Cost { get; set; }
        [Required]
        public string DeliveryTime { get; set; }
        [Required]
        public string MinimumOrder { get; set; }
        [Required]
        public int CompanyId { get; set; }

        public IFormFile ProductImage { get; set; }
    }



}
