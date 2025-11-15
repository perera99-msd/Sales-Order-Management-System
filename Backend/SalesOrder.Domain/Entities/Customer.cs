using System.ComponentModel.DataAnnotations;

namespace SalesOrder.Domain.Entities
{
    public class Customer
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;
        
        [StringLength(100)]
        public string? AddressLine1 { get; set; }
        
        [StringLength(100)]
        public string? AddressLine2 { get; set; }
        
        [StringLength(100)]
        public string? AddressLine3 { get; set; }
        
        [StringLength(50)]
        public string? Suburb { get; set; }
        
        [StringLength(50)]
        public string? State { get; set; }
        
        [StringLength(20)]
        public string? PostCode { get; set; }
        
        public ICollection<Order> Orders { get; set; } = new List<Order>();
    }
}