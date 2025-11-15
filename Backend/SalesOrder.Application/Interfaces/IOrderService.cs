using SalesOrder.Application.DTOs;

namespace SalesOrder.Application.Interfaces
{
    public interface IOrderService
    {
        Task<IEnumerable<OrderDto>> GetAllAsync();
        Task<OrderDto?> GetByIdAsync(int id);
        Task<OrderDto> CreateAsync(CreateOrderDto createOrderDto);
        Task<OrderDto> UpdateAsync(int id, CreateOrderDto updateOrderDto);
        Task DeleteAsync(int id);
    }
}