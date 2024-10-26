using Back_end.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json;
using Back_end.DTOs;
using AutoMapper;

namespace Back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;




        public ProductsController(AppDbContext context, IMapper mapper)

        {
            _context = context;
            _mapper = mapper;


        }
      

        [HttpPost("AddCompanyProfile")]
        public async Task<IActionResult> AddCompanyProfile(CompanyDtoCreate companyDtoCreate)
        {
            // Check if the company name already exists in the database
            var existingCompany = await _context.CompanyProfiles.FirstOrDefaultAsync(c => c.CompanyName == companyDtoCreate.CompanyName);
            if (existingCompany != null)
            {
                return BadRequest("Company name already exists.");
            }
            var companyProfile = _mapper.Map<CompanyProfile>(companyDtoCreate);
            _context.CompanyProfiles.Add(companyProfile);
            await _context.SaveChangesAsync();
            return Ok(companyProfile);
        }

        [HttpPost("AddProduct")]
        public async Task<IActionResult> AddProduct([FromForm] ProductDtoCreate productDtoCreate)
        {
            var company = await _context.CompanyProfiles.FindAsync(productDtoCreate.CompanyId);
            if (company == null)
            {
                return BadRequest("Company does not exist.");
            }

            var product = _mapper.Map<Product>(productDtoCreate);
            product.CompanyId = company.CompanyId;

            if (productDtoCreate.ProductImage != null)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await productDtoCreate.ProductImage.CopyToAsync(memoryStream);
                    product.ProductImage = memoryStream.ToArray();
                }
            }

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            var createdProductDto = _mapper.Map<ProductDtoCreate>(product);
            return Ok(createdProductDto);
        }




        [HttpGet("review")]
        public async Task<ActionResult<IEnumerable<Review>>> GetReviews()
        {
            // Assuming ReviewSentiment is a string that can be "Positive", "Neutral", or "Negative"
            // This will sort reviews to have "Positive" first, followed by others
            var sortedReviews = await _context.Reviews
                                               .OrderByDescending(r => r.ReviewSentiment == "Positive")
                                               .ThenByDescending(r => r.ReviewSentiment == "Neutral")
                                               .ToListAsync();

            return sortedReviews;
        }


        [HttpPost("SubmitReview")]
        public async Task<ActionResult<Review>> CreateReview(ReviewDtoCreate reviewDtoCreate)
        {
            // Check if the user has already reviewed the product
            var existingReview = await _context.Reviews
                .FirstOrDefaultAsync(r => r.UserId == reviewDtoCreate.UserId && r.ProductId == reviewDtoCreate.ProductId);

            if (existingReview != null)
            {
                return BadRequest("User has already reviewed this product.");
            }

            var review = _mapper.Map<Review>(reviewDtoCreate);

            // Ensure ReviewSentiment is NULL or unset to be picked up by the sentiment analysis service
            review.ReviewSentiment = null;

            _context.Reviews.Add(review);
            await _context.SaveChangesAsync(); // Save the initial review

            string pythonServiceUrl = "http://127.0.0.1:5000/analyze-sentiments";

            using (HttpClient client = new HttpClient())
            {
                try
                {
                    // Notify the sentiment analysis service to process pending reviews
                    HttpResponseMessage response = await client.PostAsync(pythonServiceUrl, null);
                    response.EnsureSuccessStatusCode();

                    // The service updates the sentiments directly in the database
                }
                catch (HttpRequestException e)
                {
                    Console.WriteLine($"Request exception: {e.Message}");
                    // Decide how to handle errors
                }
            }

            // Optionally refetch the updated review to return the latest data
            var updatedReview = await _context.Reviews.FindAsync(review.ReviewId);

            return CreatedAtAction(nameof(GetReviews), new { id = updatedReview.ReviewId }, updatedReview);
        }

      



        [HttpPost("PostReplyToReview")]
        public IActionResult PostReplyToReview([FromBody] ReplyReviewDtoCreate replyDto)
        {
            try
            {
                // Check if the review exists using ReviewId from the DTO
                var review = _context.Reviews.FirstOrDefault(r => r.ReviewId == replyDto.ReviewId);
                if (review == null)
                {
                    return NotFound("Review not found");
                }

                // Use AutoMapper to map ReplyReviewDtoCreate to ReplyReview
                var replyReview = _mapper.Map<ReplyReview>(replyDto);

                // Since the CreatedAt might be set by the client, override it to ensure it's server-generated
                replyReview.CreatedAt = DateTime.Now;

                // Add the reply to the database
                _context.ReplyReviews.Add(replyReview);
                _context.SaveChanges();

                return Ok("Reply posted successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }



        [HttpPost("PostInquiry")]
        public IActionResult PostInquiry([FromBody] InquiryDtoCreate inquiryDto)
        {
            try
            {
                // Check if the product ID is valid
                var product = _context.Products.FirstOrDefault(p => p.ProductId == inquiryDto.ProductId);
                if (product == null)
                {
                    return NotFound("Product not found");
                }

                // Use AutoMapper to map InquiryDtoCreate to Inquiry
                var inquiry = _mapper.Map<Inquiry>(inquiryDto);

                // Save the inquiry to the database
                _context.Inquiries.Add(inquiry);
                _context.SaveChanges();

                return Ok("Inquiry posted successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }


    }

}

