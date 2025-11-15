using AutoMapper;
using SalesOrder.Application.DTOs;
using SalesOrder.Domain.Entities;

namespace SalesOrder.Application.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Customer mappings
            CreateMap<Customer, CustomerDto>().ReverseMap();

            // Item mappings
            CreateMap<Item, ItemDto>().ReverseMap();

            // Order mappings
            CreateMap<Order, OrderDto>()
                .ForMember(dest => dest.CustomerName, opt => opt.MapFrom(src => src.Customer.Name))
                .ReverseMap();

            CreateMap<CreateOrderDto, Order>();

            // OrderItem mappings
            CreateMap<OrderItem, OrderItemDto>()
                .ForMember(dest => dest.ItemCode, opt => opt.MapFrom(src => src.Item.ItemCode))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Item.Description))
                .ReverseMap();

            CreateMap<CreateOrderItemDto, OrderItem>();
        }
    }
}