using Microsoft.EntityFrameworkCore;
using SalesOrder.Domain.Entities;
using SalesOrder.Domain.Interfaces;
using SalesOrder.Infrastructure.Data;

namespace SalesOrder.Infrastructure.Repositories
{
    public class ItemRepository : IItemRepository
    {
        private readonly ApplicationDbContext _context;

        public ItemRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Item>> GetAllAsync()
        {
            return await _context.Items.ToListAsync();
        }

        public async Task<Item?> GetByIdAsync(int id)
        {
            return await _context.Items.FindAsync(id);
        }
    }
}