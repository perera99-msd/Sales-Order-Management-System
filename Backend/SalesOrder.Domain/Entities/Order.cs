using System.ComponentModel.DataAnnotations;

namespace SalesOrder.Domain.Entities
{
    public class Order
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        public int CustomerId { get; set; }
        public Customer Customer { get; set; } = null!;
        
        [StringLength(50)]
        public string InvoiceNo { get; set; } = string.Empty;
        
        public DateTime InvoiceDate { get; set; }
        
        [StringLength(50)]
        public string? ReferenceNo { get; set; }
        
        public string? Note { get; set; }
        
        public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
        
        // Calculated totals
        public decimal TotalExcl { get; set; }
        public decimal TotalTax { get; set; }
        public decimal TotalIncl { get; set; }
        
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        public DateTime? ModifiedDate { get; set; }
    }
}