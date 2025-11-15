```markdown
# 🎯 Sales Order Management System

A professional full‑stack Sales Order Management System (React frontend + .NET 8 backend + SQL Server) with dynamic order items, real‑time tax/total calculations, responsive UI and dark mode. Built for SPIL Labs Technical Assessment. 🚀

## ✨ Quick summary
- ⚛️ Frontend: React 18 + Tailwind CSS + Redux
- ⚡ Backend: ASP.NET Core Web API (.NET 8) + EF Core
- 🗄️ Database: SQL Server (2022)
- ✅ Main features: Create / Edit / List orders, dynamic order items, automatic tax & totals, responsive UI, dark mode

## 🧾 Prerequisites
- .NET 8.0 SDK 🧰
- Node.js 16+ 🔋
- SQL Server (local or Docker) 🗃️
- (Optional) dotnet-ef tool:
```bash
dotnet tool install --global dotnet-ef
```

## 🛠️ Install & Run (highlighted)

### Backend (API) 🖥️
1. Open a terminal and go to the backend folder:
```bash
cd Backend/SalesOrder.API
```
2. Configure your SQL Server connection string in appsettings.json or via environment variables (e.g., ConnectionStrings:DefaultConnection). 🔐
3. Apply EF Core migrations:
```bash
dotnet ef database update
```
4. Run the API:
```bash
dotnet run
```
- Typical API URL: https://localhost:5250 🌐

### Frontend (React) ⚛️
1. Open a terminal and go to the frontend folder:
```bash
cd sales-order-app
```
2. Install dependencies and start dev server:
```bash
npm install
npm start
```
- Typical app URL: http://localhost:3000 🧭

## 🔌 Useful API Endpoints
- GET  /api/customers   — Get all customers 👥
- GET  /api/items       — Get all products 📦
- GET  /api/orders      — Get all orders 📋
- GET  /api/orders/{id} — Get specific order 👀
- POST /api/orders      — Create new order ➕
- PUT  /api/orders/{id} — Update order ✏️

## ⚙️ Quick Tips & Notes
- Ensure the backend connection string is correct before running migrations. ✅
- If ports differ on your machine, check Backend launchSettings.json and frontend package.json proxy/devServer settings. 🔎
- Use Postman or your browser to test API endpoints while developing. 🧪

## 🧭 Project Structure (short)
- Frontend: React components, Redux state, Tailwind styling
- Backend: Controllers, Business layer, EF Core models & migrations
- Database: Customers, Items, Orders, OrderItems tables

## 📊 Repo Composition
- JavaScript ~51% (frontend) 🟦
- C# ~46% (backend) 🟩
- HTML/CSS small portions 🟨

## 👩‍💻 Author
Developer: Sanchana Dimalsha  
Purpose: SPIL Labs Technical Assessment — Completed ✅

---
Thank you for reviewing — built with ❤️ for SPIL Labs.
```
