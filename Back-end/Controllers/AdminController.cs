using AutoMapper;
using Back_end.DTOs;
using Back_end.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net.Mime;

namespace Back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;
        public AdminController(AppDbContext context, IConfiguration configuration, IMapper mapper)
        {
            _context = context;
            _configuration = configuration;
            _mapper = mapper;
        }



        [HttpGet("GetVendorDocument/{vendorId}")]
        public async Task<IActionResult> GetVendorDocument(int vendorId)
        {
            var vendor = await _context.Vendor.FindAsync(vendorId);
            if (vendor == null)
            {
                return NotFound("Vendor not found.");
            }

            if (vendor.PdfDocument == null || vendor.PdfDocument.Length == 0)
            {
                return NotFound("Document not found.");
            }

            // Set the file name in the content disposition header
            ContentDisposition contentDisposition = new ContentDisposition
            {
                FileName = $"{vendor.Name}.pdf",
                Inline = false,  // false = prompt the user for downloading;  true = try to open in browser
            };
            Response.Headers["Content-Disposition"] = contentDisposition.ToString();

            // Return the file
            return File(vendor.PdfDocument, "application/pdf");
        }

        [HttpPost("ApproveVendor/{vendorId}")]
        public async Task<IActionResult> ApproveVendor(int vendorId)
        {
            var vendor = await _context.Vendor.FindAsync(vendorId);
            if (vendor == null)
            {
                return NotFound("Vendor not found.");
            }

            // Set the vendor as approved
            vendor.IsApproved = true;
            _context.Vendor.Update(vendor);
            await _context.SaveChangesAsync();

            return Ok($"Vendor {vendorId} has been approved.");
        }


        [HttpGet("GetVendorList")]
        public async Task<ActionResult<IEnumerable<VendorDetaillDto>>> GetVendors()
        {
            return await _context.Vendor
                .Select(v => new VendorDetaillDto
                {
                    VendorId = v.VendorId,
                    Name = v.Name,
                    Email = v.Email,
                    PhoneNumber = v.PhoneNumber,
                    Role = v.Role,
                    IsApproved = v.IsApproved
                })
                .ToListAsync();
        }


        [HttpGet("GetCustomerList")]
        public async Task<ActionResult<IEnumerable<UserDetailDto>>> GetCustomer()
        {
            return await _context.Users
                .Select(u => new UserDetailDto
                {
                    UserId = u.UserId,
                    Name = u.Name,
                    Email = u.Email,
                    PhoneNumber = u.PhoneNumber,
                    Role = u.Role,
                  
                })
                .ToListAsync();
        }

        [HttpGet("Cutomercount")]
        public ActionResult<int> GetCustomerCount()
        {
            var count = _context.Users.Count();
            return Ok(count);
        }
        [HttpGet("Productcount")]
        public ActionResult<int> GetProductCount()
        {
            var count = _context.Products.Count();
            return Ok(count);
        }
    }
}

