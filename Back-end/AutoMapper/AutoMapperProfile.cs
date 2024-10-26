using AutoMapper;

using Back_end.DTOs;
using Back_end.Models;


namespace Back_end.AutoMapper
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile() 
        {
            CreateMap<UserDtoCreate, Users>();
            CreateMap<ProductDtoCreate, Product>();


            CreateMap<ProductDtoCreate, Product>()
             .ForMember(dest => dest.ProductImage, opt => opt.Ignore());

            // Reverse mapping, also ignoring ProductImage
            CreateMap<Product, ProductDtoCreate>()
                .ForMember(dest => dest.ProductImage, opt => opt.Ignore());
            CreateMap<ReviewDtoCreate, Review>();
            CreateMap<CompanyDtoCreate, CompanyProfile>();
            CreateMap<ReplyReviewDtoCreate, ReplyReview>();
            CreateMap<InquiryDtoCreate, Inquiry>();
            CreateMap<Inquiry, InquiryDetailDto>();
            CreateMap<VendorDtoCreate, vendor>()
              .ForMember(dest => dest.PdfDocument, opt => opt.Ignore());
          

        }
       
    }
    }

