using AutoMapper;
using Back_end.DTOs;
using Back_end.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IO; // For Path and File.Exists
using System.Net.Mime; // For ContentDisposition

namespace Back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class get_itemController : ControllerBase

    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;




        public get_itemController(AppDbContext context, IMapper mapper)

        {
            _context = context;
            _mapper = mapper;


        }
     



        [HttpGet("GetProductsByCriteria")]
        public IActionResult GetProductsByCriteria(string productName)
        {
            // Calculate review counts for each product
            var reviewCounts = _context.Reviews
                .GroupBy(r => r.ProductId)
                .Select(g => new
                {
                    ProductId = g.Key,
                    PositiveReviewCount = g.Count(r => r.ReviewSentiment == "Positive"),
                    NegativeReviewCount = g.Count(r => r.ReviewSentiment == "Negative")
                })
                .ToList();

        
            // Query to fetch products, including the ImageData, and include review information
            var products = _context.Products
                .Where(p => p.ProductName == productName)
                .Join(_context.CompanyProfiles, product => product.CompanyId, company => company.CompanyId, (product, company) => new { product, company })
                .ToList()
                .Select(p => new
                {
                    p.product.ProductId,
                    p.product.ProductName,
                    p.product.Cost,
                    p.product.DeliveryTime,
                    p.product.MinimumOrder,
                    p.company.CompanyName,
                    p.company.ExportMarket,
                    p.company.Country,

                  
                    Reviews = _context.Reviews
                        .Where(r => r.ProductId == p.product.ProductId)
                        .Select(r => new
                        {
                            ReviewText = r.ReviewText,
                            ReviewSentiment = r.ReviewSentiment,
                            DateTime = r.CreatedAt,
                            Replies = _context.ReplyReviews
                                .Where(rr => rr.ReviewId == r.ReviewId)
                                .Select(rr => new
                                {
                                    ReplyText = rr.ReplyText,
                                    CreatedAt = rr.CreatedAt
                                }).ToList()
                        }).ToList(),
                    ReviewCounts = reviewCounts.FirstOrDefault(rc => rc.ProductId == p.product.ProductId)
                })
                .Select(p => new
                {
                    p.ProductId,
                    p.ProductName,
                    p.Cost,
                    p.DeliveryTime,
                    p.MinimumOrder,
                    p.CompanyName,
                    p.ExportMarket,
                    p.Country,
        
                    PositiveReviewCount = p.ReviewCounts?.PositiveReviewCount ?? 0,
                    NegativeReviewCount = p.ReviewCounts?.NegativeReviewCount ?? 0,
                    p.Reviews
                })
                .OrderByDescending(p => p.PositiveReviewCount)
                .ThenBy(p => p.NegativeReviewCount)
                .ToList();


            ContentDisposition contentDisposition = new ContentDisposition
            {
                FileName = $"{products}.jpeg",
                Inline = false,  // false = prompt the user for downloading;  true = try to open in browser
            };
            Response.Headers["Content-Disposition"] = contentDisposition.ToString();


            return Ok(products);
        }

        [HttpGet("GetProductById/{productId}")]
        public IActionResult GetProductById(int productId)
        {
            // Define and populate reviewCounts here or fetch it from the context

            // Query to fetch product details by product ID, including the ImageData, and include review information
            var productDetails = _context.Products
                .Where(p => p.ProductId == productId)
                .Join(_context.CompanyProfiles, product => product.CompanyId, company => company.CompanyId, (product, company) => new { product, company })
                .ToList()
                .Select(p => new
                {
                    p.product.ProductId,
                    p.product.ProductName,
                    p.product.Cost,
                    p.product.MaterialComposition,
                    p.product.FabricType,
                    p.product.WeaveType,
                    p.product.DeliveryTime,
                    p.product.MinimumOrder,
                    p.company.CompanyName,
                   p.company.Description,
                    p.company.ExportMarket,
                    p.company.Country,

                    Reviews = _context.Reviews
                        .Where(r => r.ProductId == p.product.ProductId)
                        .Select(r => new
                        {
                            ReviewText = r.ReviewText,
                            ReviewSentiment = r.ReviewSentiment,
                            DateTime = r.CreatedAt,
                            Replies = _context.ReplyReviews
                                .Where(rr => rr.ReviewId == r.ReviewId)
                                .Select(rr => new
                                {
                                    ReplyText = rr.ReplyText,
                                    CreatedAt = rr.CreatedAt
                                }).ToList()
                        }).ToList(),
                 
                })
                .Select(p => new
                {
                    p.ProductId,
                    p.ProductName,
                    p.Cost,
                    p.FabricType,
                    p.WeaveType,
                    p.MaterialComposition,
                    p.DeliveryTime,
                    p.MinimumOrder,
                    p.CompanyName,
                    p.Description,
                    p.ExportMarket,
                    p.Country,
                })
                .FirstOrDefault(); // Get the first or default product matching the ID

            if (productDetails == null)
            {
                return NotFound(); // Return 404 if product with given ID is not found
            }

            return Ok(productDetails);
        }



        [HttpPost("GetProduct")]
        public async Task<IActionResult> GetProductsByVendorId([FromBody] VendorIdRequest request)
        {
            if (request == null || request.VendorId <= 0)
            {
                return BadRequest("Invalid or missing Vendor ID.");
            }

            // Retrieve the company or companies matching the VendorId
            var companyIds = await _context.CompanyProfiles
                                           .Where(c => c.VendorId == request.VendorId)
                                           .Select(c => c.CompanyId)
                                           .ToListAsync();

            // Now retrieve all products linked to those CompanyIds
            var products = await _context.Products
                                         .Where(p => companyIds.Contains(p.CompanyId))
                                         .ToListAsync();

            if (products == null || !products.Any())
            {
                return NotFound($"No products found for Vendor ID {request.VendorId}.");
            }

            return Ok(products);
        }


        [HttpPost("GetProductCount")]
        public async Task<IActionResult> GetProductCountByVendorId([FromBody] VendorIdRequest request)
        {
            if (request == null || request.VendorId <= 0)
            {
                return BadRequest("Invalid or missing Vendor ID.");
            }

            // Retrieve the company or companies matching the VendorId
            var companyIds = await _context.CompanyProfiles
                                           .Where(c => c.VendorId == request.VendorId)
                                           .Select(c => c.CompanyId)
                                           .ToListAsync();

            if (!companyIds.Any())
            {
                return NotFound($"No companies found for Vendor ID {request.VendorId}.");
            }

            // Now retrieve the count of all products linked to those CompanyIds
            var productCount = await _context.Products
                                             .Where(p => companyIds.Contains(p.CompanyId))
                                             .CountAsync();

            // Return the count of products
            return Ok( productCount );
        }



        [HttpPost("GetCompanyProfile")]
        public async Task<IActionResult> GetCompanyProfileByVendorId([FromBody] VendorIdRequest request)
        {
            if (request == null || request.VendorId <= 0)
            {
                return BadRequest("Invalid or missing Vendor ID.");
            }

            // Retrieve the company or companies matching the VendorId
            var companyIds = await _context.CompanyProfiles
                                           .Where(c => c.VendorId == request.VendorId)
                                           .Select(c=>new
                                           {
                                               CompanyName = c.CompanyName,
                                               Companydescription=c.Description,
                                               exportmarket=c.ExportMarket,
                                               country=c.Country

                                           })
                                           .ToListAsync();

            // Now retrieve all products linked to those CompanyIds
          

            if (companyIds == null || !companyIds.Any())
            {
                return NotFound($"No company found for Vendor ID {request.VendorId}.");
            }

            return Ok(companyIds);
        }



        [HttpPost("GetCustomerProfile")]
        public async Task<IActionResult> GetCustomerProfileByVendorId([FromBody] UserIdDto request)
        {
            if (request == null || request.UserId <= 0)
            {
                return BadRequest("Invalid or missing Vendor ID.");
            }

            // Retrieve the company or companies matching the VendorId
            var userIds = await _context.Users
                                           .Where(u => u.UserId == request.UserId)
                                           .Select(u => new
                                           {
                                               userName = u.Name,
                                               Email = u.Email,
                                               PhoneNumber = u.PhoneNumber,
                                              

                                           })
                                           .ToListAsync();

            // Now retrieve all products linked to those CompanyIds


            if (userIds == null || !userIds.Any())
            {
                return NotFound($"No company found for Vendor ID {request.UserId}.");
            }

            return Ok(userIds);
        }
        [HttpPost("GetInquiriesCountByVendor")]
        public async Task<IActionResult> GetInquiriesCountByVendorId([FromBody] VendorIdRequest request)
        {
            if (request == null || request.VendorId <= 0)
            {
                return BadRequest("Invalid or missing Vendor ID.");
            }

            // Step 1: Find Company IDs associated with the given Vendor ID
            var companyIds = await _context.CompanyProfiles
                                           .Where(c => c.VendorId == request.VendorId)
                                           .Select(c => c.CompanyId) // Assuming 'Id' is the primary key for Company
                                           .ToListAsync();

            if (!companyIds.Any())
            {
                return NotFound($"No companies found for Vendor ID {request.VendorId}.");
            }

            // Step 2: Find Product IDs associated with the found Company IDs
            var productIds = await _context.Products
                                           .Where(p => companyIds.Contains(p.CompanyId))
                                           .Select(p => p.ProductId) // Assuming 'Id' is the primary key for Product
                                           .ToListAsync();

            if (!productIds.Any())
            {
                return NotFound($"No products found for companies associated with Vendor ID {request.VendorId}.");
            }

            // Step 3: Count Inquiries associated with the found Product IDs
            var inquiryCount = await _context.Inquiries
                                             .Where(i => productIds.Contains(i.ProductId))
                                             .CountAsync();

            return Ok(inquiryCount);
        }



        [HttpPost("GetReviewByProduct")]
        public async Task<ActionResult<IEnumerable<ReviewDetailsDto>>> GetReviewsByProduct(ProductIdRequest request)
        {
            var reviews = await _context.Reviews
                .Where(r => r.ProductId == request.ProductId)
                .Join(_context.Users,
                    review => review.UserId,
                    user => user.UserId,
                    (review, user) => new { Review = review, User = user })
                .OrderByDescending(ru => ru.Review.ReviewSentiment == "Positive") // Positive sentiment first
                .ThenByDescending(ru => ru.Review.ReviewSentiment == "Negative") // Neutral sentiment second
                .ThenByDescending(ru => ru.Review.CreatedAt) // Additional sorting if necessary
                .Select(ru => new ReviewDetailsDto
                {
                    ReviewId = ru.Review.ReviewId,
                    Name = ru.User.Name,
                    ReviewText = ru.Review.ReviewText,
                    CreatedAt = ru.Review.CreatedAt,
                    
                })
                .ToListAsync();

            return reviews;
        }



        [HttpPost("GetInquiriesByProduct")]
        public IActionResult GetInquiriesByProduct([FromBody] ProductInquiryRequestDto requestDto)
        {
            try
            {
                var product = _context.Products.FirstOrDefault(p => p.ProductId == requestDto.ProductId);
                if (product == null)
                {
                    return NotFound("Product not found");
                }

                var inquiries = _context.Inquiries
                                        .Where(i => i.ProductId == requestDto.ProductId)
                                        .ToList();

                // Map the inquiries to InquiryDetailDto using AutoMapper
                var inquiryDtos = _mapper.Map<List<InquiryDetailDto>>(inquiries);

                return Ok(inquiryDtos); // Now returning only the specified fields for each inquiry
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }


        [HttpGet("vendorcount")]
        public ActionResult<int> GetCompanyProfileCount()
        {
            var count = _context.CompanyProfiles.Count();
            return Ok(count);
        }


        [HttpPost("UserReviewsCount")]
        public async Task<ActionResult<int>> GetUserReviewsCount([FromBody] UserIdDto userIdDto)
        {
            // Query the database for the count of reviews by the specified user using the UserId property from the DTO
            var reviewsCount = await _context.Reviews
                .CountAsync(review => review.UserId == userIdDto.UserId);

            return Ok(reviewsCount);
        }


        [HttpPost("UserInquiryCount")]
        public async Task<ActionResult<int>> GetUserInquiryCount([FromBody] UserIdDto userIdDto)
        {
            // Query the database for the count of reviews by the specified user using the UserId property from the DTO
            var InquiryCount = await _context.Inquiries
                .CountAsync(Inquiry => Inquiry.UserId == userIdDto.UserId);

            return Ok(InquiryCount);
        }

        [HttpPost("getVendorreplies")]
        public async Task<ActionResult<List<ReplyReviewWithProductDto>>> GetReplyTextsForUserReviews([FromBody] UserIdDto userIdDto)
        {
            if (userIdDto == null || userIdDto.UserId <= 0)
            {
                return BadRequest("Invalid User ID.");
            }

            var replies = await _context.ReplyReviews
                                .Where(rr => _context.Reviews
                                    .Any(r => r.UserId == userIdDto.UserId && r.ReviewId == rr.ReviewId))
                                .Join(_context.Reviews, rr => rr.ReviewId, r => r.ReviewId, (rr, r) => new { rr, r })
                                .Join(_context.Products, rr_r => rr_r.r.ProductId, p => p.ProductId, (rr_r, p) => new ReplyReviewWithProductDto
                                {
                                    ReplyText = rr_r.rr.ReplyText,
                                    CreatedAt = rr_r.rr.CreatedAt,
                                    ReviewId = rr_r.r.ReviewId,
                                    ProductName = p.ProductName // Setting the product name
                                })
                                .ToListAsync();

            if (replies == null || !replies.Any())
            {
                return NotFound("No replies found for the user's reviews.");
            }

            return Ok(replies);
        }




    }
}
