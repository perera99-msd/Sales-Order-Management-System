namespace SalesOrder.Domain.Entities
{
    public class OrderItem
    {
        public int Id { get; set; }

        public int OrderId { get; set; }
        public Order Order { get; set; } = null!;

        public int ItemId { get; set; }
        public Item Item { get; set; } = null!;

        public string? Note { get; set; }

        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public decimal TaxRate { get; set; }

        // Calculated fields
        public decimal ExclAmount => Quantity * Price;
        public decimal TaxAmount => ExclAmount * TaxRate / 100;
        public decimal InclAmount => ExclAmount + TaxAmount;
    }
}