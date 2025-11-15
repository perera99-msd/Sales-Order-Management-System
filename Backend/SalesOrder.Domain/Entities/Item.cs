using System.ComponentModel.DataAnnotations;

namespace SalesOrder.Domain.Entities
{
    public class Item
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        [StringLength(50)]
        public string ItemCode { get; set; } = string.Empty;
        
        [Required]
        [StringLength(200)]
        public string Description { get; set; } = string.Empty;
        
        public decimal Price { get; set; }
        
        public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
    }
}