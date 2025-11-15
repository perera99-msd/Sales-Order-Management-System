using SalesOrder.Domain.Entities;

namespace SalesOrder.Infrastructure.Data
{
    public static class SeedData
    {
        public static void Initialize(ApplicationDbContext context)
        {
            if (!context.Customers.Any())
            {
                context.Customers.AddRange(
                    // Original customers
                    new Customer
                    {
                        Name = "John Doe",
                        AddressLine1 = "123 Main St",
                        AddressLine2 = "Apt 4B",
                        Suburb = "Central City",
                        State = "CA",
                        PostCode = "90210"
                    },
                    new Customer
                    {
                        Name = "Jane Smith",
                        AddressLine1 = "456 Oak Avenue",
                        Suburb = "Springfield",
                        State = "IL",
                        PostCode = "62701"
                    },

                    // Sri Lankan customers
                    new Customer
                    {
                        Name = "Kamal Perera",
                        AddressLine1 = "123 Galle Road",
                        AddressLine2 = "",
                        Suburb = "Colombo 03",
                        State = "Western",
                        PostCode = "00300"
                    },
                    new Customer
                    {
                        Name = "Nimal Fernando",
                        AddressLine1 = "45 Kandy Street",
                        AddressLine2 = "",
                        Suburb = "Kandy",
                        State = "Central",
                        PostCode = "20000"
                    },
                    new Customer
                    {
                        Name = "Sunil Rathnayake",
                        AddressLine1 = "78 Temple Road",
                        AddressLine2 = "",
                        Suburb = "Anuradhapura",
                        State = "North Central",
                        PostCode = "50000"
                    },
                    new Customer
                    {
                        Name = "Priya Silva",
                        AddressLine1 = "234 Beach Road",
                        AddressLine2 = "",
                        Suburb = "Galle",
                        State = "Southern",
                        PostCode = "80000"
                    },
                    new Customer
                    {
                        Name = "Dinesh Bandara",
                        AddressLine1 = "56 Hill Street",
                        AddressLine2 = "",
                        Suburb = "Nuwara Eliya",
                        State = "Central",
                        PostCode = "22200"
                    },
                    new Customer
                    {
                        Name = "Chaminda Jayawardena",
                        AddressLine1 = "89 Lake Drive",
                        AddressLine2 = "",
                        Suburb = "Kandy",
                        State = "Central",
                        PostCode = "20000"
                    },
                    new Customer
                    {
                        Name = "Samantha Rajapaksa",
                        AddressLine1 = "12 Fort Road",
                        AddressLine2 = "",
                        Suburb = "Colombo 01",
                        State = "Western",
                        PostCode = "00100"
                    },
                    new Customer
                    {
                        Name = "Lakmal Weerasinghe",
                        AddressLine1 = "34 River View",
                        AddressLine2 = "",
                        Suburb = "Kurunegala",
                        State = "North Western",
                        PostCode = "60000"
                    },
                    new Customer
                    {
                        Name = "Anusha Wickramasinghe",
                        AddressLine1 = "67 Park Avenue",
                        AddressLine2 = "",
                        Suburb = "Colombo 05",
                        State = "Western",
                        PostCode = "00500"
                    },
                    new Customer
                    {
                        Name = "Roshan Mendis",
                        AddressLine1 = "90 Mountain Road",
                        AddressLine2 = "",
                        Suburb = "Badulla",
                        State = "Uva",
                        PostCode = "90000"
                    },
                    new Customer
                    {
                        Name = "Dilani Herath",
                        AddressLine1 = "123 Flower Lane",
                        AddressLine2 = "",
                        Suburb = "Matara",
                        State = "Southern",
                        PostCode = "81000"
                    },
                    new Customer
                    {
                        Name = "Asanka Gunawardena",
                        AddressLine1 = "45 Market Street",
                        AddressLine2 = "",
                        Suburb = "Negombo",
                        State = "Western",
                        PostCode = "11500"
                    },
                    new Customer
                    {
                        Name = "Shirani Abeysekara",
                        AddressLine1 = "78 Temple Street",
                        AddressLine2 = "",
                        Suburb = "Kegalle",
                        State = "Sabaragamuwa",
                        PostCode = "71200"
                    }
                );
            }

            if (!context.Items.Any())
            {
                context.Items.AddRange(
                    new Item { ItemCode = "A001", Description = "Laptop Computer", Price = 1200.00m },
                    new Item { ItemCode = "A002", Description = "Wireless Mouse", Price = 25.50m },
                    new Item { ItemCode = "A003", Description = "Mechanical Keyboard", Price = 89.99m },
                    new Item { ItemCode = "A004", Description = "27-inch Monitor", Price = 299.99m },
                    new Item { ItemCode = "A005", Description = "Webcam HD", Price = 45.00m },
                    new Item { ItemCode = "B001", Description = "Office Chair", Price = 150.00m },
                    new Item { ItemCode = "B002", Description = "Desk Lamp", Price = 35.75m },
                    new Item { ItemCode = "B003", Description = "File Cabinet", Price = 89.99m }
                );
            }

            context.SaveChanges();
        }
    }
}