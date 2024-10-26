using Microsoft.AspNetCore.Mvc;
using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Back_end.Models;
using Microsoft.EntityFrameworkCore;


namespace Back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FabricController : ControllerBase
    {
        private readonly AppDbContext _context;
        public FabricController(AppDbContext context)

        {
            _context = context;
      


        }
        [HttpPost("GetRecommendationProduct")]
        public async Task<ActionResult> GetRecommendations([FromBody] FabricRequest userInput)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            string pythonServiceUrl = "http://localhost:5000/recommend";

            try
            {
                string jsonInput = JsonConvert.SerializeObject(userInput);
                var data = new StringContent(jsonInput, Encoding.UTF8, "application/json");

                using (var client = new HttpClient())
                {
                    HttpResponseMessage response = await client.PostAsync(pythonServiceUrl, data);

                    if (!response.IsSuccessStatusCode)
                    {
                        return StatusCode((int)response.StatusCode, "Error contacting recommendation service");
                    }

                    string result = await response.Content.ReadAsStringAsync();
                    var recommendations = JsonConvert.DeserializeObject<List<Recommendation>>(result);

                    var enrichedRecommendations = new List<dynamic>(); // Using dynamic for simplicity

                    foreach (var recommendation in recommendations)
                    {
                        // Extract the main title keyword to match with your product titles, assuming the main keyword is the first word
                        var titleKeyword = recommendation.Title.Split(' ')[0];
                        var export = userInput.ExportMarket;

                        // Join Products with CompanyProfiles based on CompanyId and filter by title keyword
                        var matchedProducts = from product in _context.Products
                                              join company in _context.CompanyProfiles
                                              on product.CompanyId equals company.CompanyId
                                              where product.ProductName.StartsWith(titleKeyword)
                                              where company.ExportMarket == export
                                              select new
                                              {
                                                  recommendation.Fabrictype,
                                                  recommendation.GSM,
                                                  recommendation.MaterialComposition,
                                                  productname=product.ProductName,
                                                  recommendation.Weavetype,
                                                  CompanyName = company.CompanyName,
                                                  ExportMarket = company.ExportMarket,
                                                  Country = company.Country
                                              };

                        enrichedRecommendations.AddRange(matchedProducts); // Add range to the list
                    }

                    return Ok(enrichedRecommendations);
                }
            }
            catch (HttpRequestException ex)
            {
                return StatusCode(500, $"Error contacting recommendation service: {ex.Message}");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }




    }
}
