namespace SalesOrder.Application.DTOs
{
    public class CustomerDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? AddressLine1 { get; set; }
        public string? AddressLine2 { get; set; }
        public string? AddressLine3 { get; set; }
        public string? Suburb { get; set; }
        public string? State { get; set; }
        public string? PostCode { get; set; }
    }
}