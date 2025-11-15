namespace SalesOrder.Application.DTOs
{
    public class OrderDto
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public string CustomerName { get; set; } = string.Empty;
        public string InvoiceNo { get; set; } = string.Empty;
        public DateTime InvoiceDate { get; set; }
        public string? ReferenceNo { get; set; }
        public string? Note { get; set; }
        public List<OrderItemDto> OrderItems { get; set; } = new();
        public decimal TotalExcl { get; set; }
        public decimal TotalTax { get; set; }
        public decimal TotalIncl { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}

public class CreateOrderDto
{
    public int CustomerId { get; set; }
    public string InvoiceNo { get; set; } = string.Empty;
    public DateTime InvoiceDate { get; set; }
    public string? ReferenceNo { get; set; }
    public string? Note { get; set; }
    public List<CreateOrderItemDto> OrderItems { get; set; } = new();
}

public class CreateOrderItemDto
{
    public int ItemId { get; set; }
    public string? Note { get; set; }
    public int Quantity { get; set; }
    public decimal Price { get; set; }
    public decimal TaxRate { get; set; }
}