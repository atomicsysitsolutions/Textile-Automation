using AutoMapper;
using Back_end.DTOs;
using Back_end.Models;
using Back_end.DTOs;
using Back_end.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace Back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class get_item_for_vendorController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public get_item_for_vendorController(AppDbContext context, IMapper mapper)

        {
            _context = context;
            _mapper = mapper;


        }

        [HttpPost("GetInquiriesByProductId")]
        public async Task<IActionResult> GetInquiriesByProductId([FromBody] ProductInquiryRequestDto request)
        {
            if (request == null || request.ProductId <= 0)
            {
                return BadRequest("Invalid or missing Product ID.");
            }

            // First, let's ensure the product exists and get its name
            var product = await _context.Products
                                        .Where(p => p.ProductId == request.ProductId)
                                        .Select(p => new { p.ProductId, p.ProductName })
                                        .FirstOrDefaultAsync();

            if (product == null)
            {
                return NotFound($"Product with ID {request.ProductId} not found.");
            }

            // Retrieve all inquiries linked to the given ProductId, including the product name
            var inquiryDetails = await _context.Inquiries
                                               .Where(i => i.ProductId == request.ProductId)
                                               .Select(i => new InquiryDetailDto
                                               {
                                                   Name = i.Name,
                                                   Email = i.Email,
                                                   PhoneNumber = i.PhoneNumber,
                                                   Address = i.Address,
                                                   InquiryText = i.InquiryText,
                                                   CreatedAt = i.CreatedAt,
                                                   ProductName = product.ProductName // Include the product name in the DTO
                                               })
                                               .ToListAsync();

            return Ok(inquiryDetails);
        }

        [HttpPost("GetVendorProfile")]
        public async Task<IActionResult> GetCustomerProfileByVendorId([FromBody] VendordetailDtoCreate request)
        {
            if (request == null || request.VendorId <= 0)
            {
                return BadRequest("Invalid or missing Vendor ID.");
            }

            // Retrieve the company or companies matching the VendorId
            var vendorIds = await _context.Vendor
                                           .Where(v => v.VendorId == request.VendorId)
                                           .Select(v => new
                                           {
                                               Name = v.Name,
                                               Email = v.Email,
                                               PhoneNumber = v.PhoneNumber,


                                           })
                                           .ToListAsync();

            // Now retrieve all products linked to those CompanyIds


            if (vendorIds == null || !vendorIds.Any())
            {
                return NotFound($"No company found for Vendor ID {request.VendorId}.");
            }

            return Ok(vendorIds);
        }


        [HttpPost("GetVendorApprove")]
        public async Task<IActionResult> GetVendorApprove([FromBody] VendordetailDtoCreate request)
        {
            if (request == null || request.VendorId <= 0)
            {
                return BadRequest("Invalid or missing Vendor ID.");
            }

            // Retrieve the company or companies matching the VendorId
            var vendorIds = await _context.Vendor
                                           .Where(v => v.VendorId == request.VendorId)
                                           .Select(v => new
                                           {
                                           
                                               Approve=v.IsApproved
                                               


                                           })
                                           .ToListAsync();

            // Now retrieve all products linked to those CompanyIds


            if (vendorIds == null || !vendorIds.Any())
            {
                return NotFound($"No company found for Vendor ID {request.VendorId}.");
            }

            return Ok(vendorIds);
        }


    }
}
