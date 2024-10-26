using Newtonsoft.Json;
using System.Diagnostics.Metrics;

namespace Back_end.Models
{
    public class FabricRequest
    {
       
        public string MaterialComposition { get; set; }

        [JsonProperty("Fabrictype")]
        public string Fabrictype { get; set; }

        [JsonProperty("Weavetype")]
        public string Weavetype { get; set; }

        [JsonProperty("MinOrder")]
        public string MinOrder { get; set; }

        [JsonProperty("ExportMarket")]
        public string ExportMarket { get; set; }

        [JsonProperty("DeliveryTime")]
        public string DeliveryTime { get; set; }

        [JsonProperty("Price")]
        public string Price { get; set; }

   
    }
    public class Recommendation
    {
        public string Fabrictype { get; set; }
        [JsonProperty("GSM(Gram/Sqmeter)")]
        public string GSM { get; set; } // Renamed from "GSM(Gram/Sqmeter)" for C# naming conventions
      
        
        public string MaterialComposition { get; set; } // Renamed from "Material/Composition"
        public string Title { get; set; }
        public string Weavetype { get; set; }
    }
    

}
