using SalesOrder.Domain.Entities;

namespace SalesOrder.Domain.Interfaces
{
    public interface IItemRepository
    {
        Task<IEnumerable<Item>> GetAllAsync();
        Task<Item?> GetByIdAsync(int id);
    }
}