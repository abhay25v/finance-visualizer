# 💰 Personal Finance Visualizer

A beautiful, modern web application for tracking personal finances with interactive visualizations and MongoDB persistence.

![Finance Tracker](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![MongoDB](https://img.shields.io/badge/MongoDB-Ready-green?logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-blue?logo=tailwindcss)

## ✨ Features

### 📊 **Core Functionality**
- ✅ **Add/Edit/Delete Transactions** - Complete CRUD operations with validation
- ✅ **Transaction Categories** - Organized expense tracking
- ✅ **Monthly Expense Charts** - Interactive visualizations with Recharts
- ✅ **Real-time Statistics** - Balance, income, expenses overview
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile

### 🎨 **Modern UI/UX**
- **shadcn/ui Components** - Beautiful, accessible interface
- **Loading States** - Smooth user experience
- **Error Handling** - Graceful error management
- **Form Validation** - Robust input validation with Zod

### 🔧 **Technical Stack**
- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: Next.js API Routes, MongoDB
- **UI Library**: shadcn/ui, Radix UI
- **Charts**: Recharts
- **Validation**: React Hook Form + Zod
- **Icons**: Lucide React

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- MongoDB (optional - runs in demo mode without it)

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   Edit `.env.local`:
   ```env
   # For local MongoDB
   MONGODB_URI=mongodb://localhost:27017/finance-tracker
   
   # For MongoDB Atlas
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/finance-tracker
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Demo Mode

The application includes a **demo mode** that works without MongoDB:
- Uses in-memory storage for development
- All features work exactly the same
- Data resets on server restart
- Perfect for testing and development

## 🗄️ MongoDB Setup

### Option 1: Local MongoDB
1. Download and install [MongoDB Community Edition](https://www.mongodb.com/try/download/community)
2. Start MongoDB service
3. Update `MONGODB_URI` in `.env.local`

### Option 2: MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env.local`

## 🎯 API Endpoints

### Transactions
- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Create new transaction
- `PUT /api/transactions/[id]` - Update transaction
- `DELETE /api/transactions/[id]` - Delete transaction

### Analytics
- `GET /api/analytics/stats` - Get financial statistics
- `GET /api/analytics/monthly-expenses` - Get monthly expense data

## 🔧 Development

### Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

<div align="center">
  <p>Built with ❤️ for better financial management</p>
</div>
