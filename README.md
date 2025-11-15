# 🎯 Sales Order Management System

<div align="center">

![.NET Core](https://img.shields.io/badge/.NET%20Core-8.0-512BD4?logo=dotnet&style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react&style=for-the-badge)
![SQL Server](https://img.shields.io/badge/SQL%20Server-2022-CC2927?logo=microsoft-sql-server&style=for-the-badge)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white&style=for-the-badge)

**✨ A professional full-stack sales order management system built for SPIL Labs Technical Assessment**

</div>

## 🚀 Quick Overview

| 🎯 Feature                | ⚡ Technology        | 📊 Description                     |
| ------------------------- | -------------------- | ---------------------------------- |
| 📋 Order Management       | .NET Core + React    | Complete CRUD operations           |
| 💰 Real-time Calculations | JavaScript + C#      | Automatic tax & total calculations |
| 🎨 Responsive UI          | Tailwind CSS         | Mobile-first design                |
| 🌙 Dark Mode              | React Context        | Theme switching                    |
| 🗄️ Data Persistence       | SQL Server + EF Core | Relational database                |

## ✨ Key Features

### 🛒 Sales Order Processing

- 📝 **Order Creation** - Dynamic form with customer auto-fill
- 🧮 **Real-time Calculations** - Automatic tax and total computation
- 📦 **Item Management** - Add/remove order items dynamically
- 💾 **Data Persistence** - Save and retrieve orders from database

### 🎨 User Experience

- 📱 **Responsive Design** - Works on all device sizes
- 🌙 **Dark/Light Mode** - Toggle between themes
- ⚡ **Fast Performance** - Optimized React components
- 🎯 **Intuitive Interface** - User-friendly navigation

### 🏗️ Architecture & Code Quality

- 🏛️ **Clean Architecture** - Proper separation of concerns
- 🔧 **SOLID Principles** - Maintainable and scalable code
- 🧪 **Error Handling** - Comprehensive validation and error messages
- 📚 **Documentation** - Clear code structure and comments

## 🏗️ System Architecture

🎯 SALES ORDER MANAGEMENT SYSTEM
├── 🖥️ Frontend (React + Redux)
│ ├── ⚛️ React Components
│ ├── 🎨 Tailwind CSS Styling
│ ├── 🔄 Redux State Management
│ └── 🛣️ React Router Navigation
│
├── ⚡ Backend (.NET Core API)
│ ├── 🎯 RESTful Controllers
│ ├── 🏗️ Business Logic Layer
│ ├── 🗄️ Data Access Layer
│ └── 📊 Entity Framework Core
│
└── 🗄️ Database (SQL Server)
├── 👥 Customers Table
├── 📦 Items Table
├── 📋 Orders Table
└── 🛒 OrderItems Table

text

## 🚀 Getting Started

### 📋 Prerequisites

- ⚡ .NET 8.0 SDK
- 🟢 Node.js 16+
- 🗄️ SQL Server

### 🛠️ Installation

#### 🔧 Backend Setup

````bash
cd Backend/SalesOrder.API
dotnet ef database update
dotnet run
# 🚀 API running on https://localhost:5250
⚛️ Frontend Setup
bash
cd sales-order-app
npm install
npm start
# 🌐 App running on http://localhost:3000
📊 Application Screens
🖥️ Screen 1: Sales Order Form
text
📋 ORDER CREATION
├── 👥 Customer Selection (Dropdown)
├── 🏠 Auto-filled Address
├── 🛒 Dynamic Order Items
│   ├── 📦 Item Selection
│   ├── 🔢 Quantity Input
│   ├── 💰 Price Display
│   ├── 📊 Tax Calculation
│   └── 🧮 Real-time Totals
└── 💾 Save/Update Operations
📈 Screen 2: Order Listing
text
📊 ORDER MANAGEMENT
├── 📋 Orders Grid
├── ➕ Add New Order
├── ✏️ Edit Existing Orders
├── 👀 View Order Details
└── 🎯 Status Tracking
🛠️ Technology Stack
⚡ Backend Technologies
Technology	Purpose	Version
🎯 .NET Core	Web API Framework	8.0
🗄️ Entity Framework	ORM & Data Access	8.0
🗃️ SQL Server	Database	2022
🗺️ AutoMapper	Object Mapping	12.0
📚 Swagger	API Documentation	6.4
⚛️ Frontend Technologies
Technology	Purpose	Version
⚛️ React	UI Framework	18.2
🔄 Redux Toolkit	State Management	1.9
🛣️ React Router	Navigation	6.8
🎨 Tailwind CSS	Styling	3.2
📡 Axios	HTTP Client	1.4
🎯 API Endpoints
Method	Endpoint	Description	Emoji
GET	/api/customers	Get all customers	👥
GET	/api/items	Get all products	📦
GET	/api/orders	Get all orders	📋
POST	/api/orders	Create new order	➕
PUT	/api/orders/{id}	Update order	✏️
GET	/api/orders/{id}	Get specific order	👀
🌟 Why This Project Stands Out
✅ Complete Implementation - All requirements fulfilled

🎯 Professional Architecture - Industry best practices

📱 Modern UI/UX - Responsive and intuitive design

🔧 Clean Code - Maintainable and scalable

🚀 Production Ready - Ready for deployment

📚 Comprehensive Documentation - Easy to understand and extend

🤝 Development
Developer: Sanchana Dimalsha
Purpose: SPIL Labs Technical Assessment
Timeline: 2-day completion
Status: ✅ Complete & Fully Functional

<div align="center">
🎉 Thank you for reviewing my technical assessment!
Built with ❤️ for SPIL Labs

</div> ```
````
