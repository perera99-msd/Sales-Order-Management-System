using AutoMapper;
using SalesOrder.Application.DTOs;
using SalesOrder.Application.Interfaces;
using SalesOrder.Domain.Entities;
using SalesOrder.Domain.Interfaces;

namespace SalesOrder.Application.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly ICustomerRepository _customerRepository;
        private readonly IItemRepository _itemRepository;
        private readonly IMapper _mapper;

        public OrderService(
            IOrderRepository orderRepository,
            ICustomerRepository customerRepository,
            IItemRepository itemRepository,
            IMapper mapper)
        {
            _orderRepository = orderRepository;
            _customerRepository = customerRepository;
            _itemRepository = itemRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<OrderDto>> GetAllAsync()
        {
            var orders = await _orderRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<OrderDto>>(orders);
        }

        public async Task<OrderDto?> GetByIdAsync(int id)
        {
            var order = await _orderRepository.GetByIdAsync(id);
            return _mapper.Map<OrderDto?>(order);
        }

        public async Task<OrderDto> CreateAsync(CreateOrderDto createOrderDto)
        {
            // Validate customer exists
            var customer = await _customerRepository.GetByIdAsync(createOrderDto.CustomerId);
            if (customer == null)
                throw new ArgumentException("Customer not found");

            var order = _mapper.Map<Order>(createOrderDto);

            // Calculate totals
            CalculateOrderTotals(order);

            var createdOrder = await _orderRepository.CreateAsync(order);
            return _mapper.Map<OrderDto>(createdOrder);
        }

        public async Task<OrderDto> UpdateAsync(int id, CreateOrderDto updateOrderDto)
        {
            var existingOrder = await _orderRepository.GetByIdAsync(id);
            if (existingOrder == null)
                throw new ArgumentException("Order not found");

            // Validate customer exists
            var customer = await _customerRepository.GetByIdAsync(updateOrderDto.CustomerId);
            if (customer == null)
                throw new ArgumentException("Customer not found");

            _mapper.Map(updateOrderDto, existingOrder);
            existingOrder.ModifiedDate = DateTime.UtcNow;

            // Calculate totals
            CalculateOrderTotals(existingOrder);

            var updatedOrder = await _orderRepository.UpdateAsync(existingOrder);
            return _mapper.Map<OrderDto>(updatedOrder);
        }

        public async Task DeleteAsync(int id)
        {
            await _orderRepository.DeleteAsync(id);
        }

        private void CalculateOrderTotals(Order order)
        {
            order.TotalExcl = order.OrderItems.Sum(oi => oi.ExclAmount);
            order.TotalTax = order.OrderItems.Sum(oi => oi.TaxAmount);
            order.TotalIncl = order.OrderItems.Sum(oi => oi.InclAmount);
        }
    }
}