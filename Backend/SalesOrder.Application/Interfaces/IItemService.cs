using SalesOrder.Application.DTOs;

namespace SalesOrder.Application.Interfaces
{
    public interface IItemService
    {
        Task<IEnumerable<ItemDto>> GetAllAsync();
        Task<ItemDto?> GetByIdAsync(int id);
    }
}