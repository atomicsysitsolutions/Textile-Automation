using AutoMapper;
using Back_end.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net.Mime;

namespace Back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DisplayImageController : ControllerBase
    {

        private readonly AppDbContext _context;
        private readonly IMapper _mapper;




        public DisplayImageController(AppDbContext context, IMapper mapper)

        {
            _context = context;
            _mapper = mapper;


        }
        [HttpGet("DisplayProductImage")]
        public IActionResult DisplayProductImage(int productId)
        {
            // Fetch the product to get the image binary data
            var product = _context.Products.FirstOrDefault(p => p.ProductId == productId);

            if (product == null || product.ProductImage == null || !product.ProductImage.Any())
            {
                return NotFound("Product or product image not found.");
            }

            // product.ProductImage is assumed to be the binary data of the image
            byte[] imageBytes = product.ProductImage;

            // Sanitize the product name to be a valid file name
            var fileName = $"{SanitizeFileName(product.ProductName)}.jpg";
            Response.Headers.Add("Content-Disposition", new ContentDisposition
            {
                FileName = fileName,
                Inline = true, // true = try to open in browser
            }.ToString());

            // Assuming the image is of type JPEG, adjust the content type as necessary
            return File(imageBytes, "image/jpeg");
        }

        private string SanitizeFileName(string fileName)
        {
            foreach (char c in Path.GetInvalidFileNameChars())
            {
                fileName = fileName.Replace(c, '_');
            }
            return fileName;
        }
    }
}
