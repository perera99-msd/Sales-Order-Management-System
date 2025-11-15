using AutoMapper;
using SalesOrder.Application.DTOs;
using SalesOrder.Application.Interfaces;
using SalesOrder.Domain.Interfaces;

namespace SalesOrder.Application.Services
{
    public class ItemService : IItemService
    {
        private readonly IItemRepository _itemRepository;
        private readonly IMapper _mapper;

        public ItemService(IItemRepository itemRepository, IMapper mapper)
        {
            _itemRepository = itemRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ItemDto>> GetAllAsync()
        {
            var items = await _itemRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<ItemDto>>(items);
        }

        public async Task<ItemDto?> GetByIdAsync(int id)
        {
            var item = await _itemRepository.GetByIdAsync(id);
            return _mapper.Map<ItemDto?>(item);
        }
    }
}