using Microsoft.EntityFrameworkCore;
using SalesOrder.Domain.Entities;

namespace SalesOrder.Infrastructure.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure relationships
            modelBuilder.Entity<Order>()
                .HasOne(o => o.Customer)
                .WithMany(c => c.Orders)
                .HasForeignKey(o => o.CustomerId);

            modelBuilder.Entity<OrderItem>()
                .HasOne(oi => oi.Order)
                .WithMany(o => o.OrderItems)
                .HasForeignKey(oi => oi.OrderId);

            modelBuilder.Entity<OrderItem>()
                .HasOne(oi => oi.Item)
                .WithMany(i => i.OrderItems)
                .HasForeignKey(oi => oi.ItemId);

            // Seed data - Customers with Sri Lankan names
            modelBuilder.Entity<Customer>().HasData(
                // Original customers



                // Sri Lankan customers
                new Customer
                {
                    Id = 3,
                    Name = "Kamal Perera",
                    AddressLine1 = "123 Galle Road",
                    AddressLine2 = "",
                    Suburb = "Colombo 03",
                    State = "Western",
                    PostCode = "00300"
                },
                new Customer
                {
                    Id = 4,
                    Name = "Nimal Fernando",
                    AddressLine1 = "45 Kandy Street",
                    AddressLine2 = "",
                    Suburb = "Kandy",
                    State = "Central",
                    PostCode = "20000"
                },
                new Customer
                {
                    Id = 5,
                    Name = "Sunil Rathnayake",
                    AddressLine1 = "78 Temple Road",
                    AddressLine2 = "",
                    Suburb = "Anuradhapura",
                    State = "North Central",
                    PostCode = "50000"
                },
                new Customer
                {
                    Id = 6,
                    Name = "Priya Silva",
                    AddressLine1 = "234 Beach Road",
                    AddressLine2 = "",
                    Suburb = "Galle",
                    State = "Southern",
                    PostCode = "80000"
                },
                new Customer
                {
                    Id = 7,
                    Name = "Dinesh Bandara",
                    AddressLine1 = "56 Hill Street",
                    AddressLine2 = "",
                    Suburb = "Nuwara Eliya",
                    State = "Central",
                    PostCode = "22200"
                },
                new Customer
                {
                    Id = 8,
                    Name = "Chaminda Jayawardena",
                    AddressLine1 = "89 Lake Drive",
                    AddressLine2 = "",
                    Suburb = "Kandy",
                    State = "Central",
                    PostCode = "20000"
                },
                new Customer
                {
                    Id = 9,
                    Name = "Samantha Rajapaksa",
                    AddressLine1 = "12 Fort Road",
                    AddressLine2 = "",
                    Suburb = "Colombo 01",
                    State = "Western",
                    PostCode = "00100"
                },
                new Customer
                {
                    Id = 10,
                    Name = "Lakmal Weerasinghe",
                    AddressLine1 = "34 River View",
                    AddressLine2 = "",
                    Suburb = "Kurunegala",
                    State = "North Western",
                    PostCode = "60000"
                },
                new Customer
                {
                    Id = 11,
                    Name = "Anusha Wickramasinghe",
                    AddressLine1 = "67 Park Avenue",
                    AddressLine2 = "",
                    Suburb = "Colombo 05",
                    State = "Western",
                    PostCode = "00500"
                },
                new Customer
                {
                    Id = 12,
                    Name = "Roshan Mendis",
                    AddressLine1 = "90 Mountain Road",
                    AddressLine2 = "",
                    Suburb = "Badulla",
                    State = "Uva",
                    PostCode = "90000"
                },
                new Customer
                {
                    Id = 13,
                    Name = "Dilani Herath",
                    AddressLine1 = "123 Flower Lane",
                    AddressLine2 = "",
                    Suburb = "Matara",
                    State = "Southern",
                    PostCode = "81000"
                },
                new Customer
                {
                    Id = 14,
                    Name = "Asanka Gunawardena",
                    AddressLine1 = "45 Market Street",
                    AddressLine2 = "",
                    Suburb = "Negombo",
                    State = "Western",
                    PostCode = "11500"
                },
                new Customer
                {
                    Id = 15,
                    Name = "Shirani Abeysekara",
                    AddressLine1 = "78 Temple Street",
                    AddressLine2 = "",
                    Suburb = "Kegalle",
                    State = "Sabaragamuwa",
                    PostCode = "71200"
                }
            );

            modelBuilder.Entity<Item>().HasData(
                new Item { Id = 1, ItemCode = "A001", Description = "Laptop Computer", Price = 1200.00m },
                new Item { Id = 2, ItemCode = "A002", Description = "Wireless Mouse", Price = 25.50m },
                new Item { Id = 3, ItemCode = "A003", Description = "Mechanical Keyboard", Price = 89.99m },
                new Item { Id = 4, ItemCode = "A004", Description = "27-inch Monitor", Price = 299.99m },
                new Item { Id = 5, ItemCode = "A005", Description = "Webcam HD", Price = 45.00m },
                new Item { Id = 6, ItemCode = "B001", Description = "Office Chair", Price = 150.00m },
                new Item { Id = 7, ItemCode = "B002", Description = "Desk Lamp", Price = 35.75m },
                new Item { Id = 8, ItemCode = "B003", Description = "File Cabinet", Price = 89.99m }
            );
        }
    }
}