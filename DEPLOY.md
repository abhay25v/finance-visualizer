# Personal Finance Visualizer

A modern, responsive personal finance tracking application built with Next.js, React, and MongoDB.

## 🚀 Features

- **Transaction Management**: Add, edit, and delete financial transactions
- **Interactive Charts**: Monthly expense visualization with Recharts
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **MongoDB Integration**: Persistent data storage with automatic fallback to in-memory storage
- **Modern UI**: Built with Tailwind CSS and shadcn/ui components
- **Form Validation**: Client-side validation with Zod schema
- **Error Handling**: Comprehensive error states and loading indicators

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **UI Components**: shadcn/ui, Lucide Icons
- **Charts**: Recharts
- **Database**: MongoDB (with in-memory fallback)
- **Form Handling**: React Hook Form with Zod validation
- **Deployment**: Vercel-ready

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   cd finance-visualizer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` and add your MongoDB connection string:
   ```
   MONGODB_URI=your_mongodb_connection_string
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub** (if not already done)
   ```bash
   git add .
   git commit -m "feat: add finance visualizer"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Connect your GitHub account
   - Import your repository
   - Set environment variables in Vercel dashboard
   - Deploy!

### Environment Variables for Production

Set these in your deployment platform:

```
MONGODB_URI=your_production_mongodb_uri
NEXT_PUBLIC_APP_URL=https://your-app-domain.vercel.app
```

## 🔧 Configuration

### MongoDB Setup

1. **Create a MongoDB Atlas account** at [mongodb.com](https://www.mongodb.com/cloud/atlas)
2. **Create a new cluster**
3. **Get your connection string** and add it to `.env.local`
4. **Whitelist your IP address** or use `0.0.0.0/0` for development

### Fallback Mode

If MongoDB is unavailable, the app automatically falls back to in-memory storage. This ensures the app continues to work even without a database connection.

## 🎯 Usage

1. **Add Transactions**: Click "Add Transaction" to record income or expenses
2. **View Analytics**: Check your balance, total income, and expenses in the summary cards
3. **Monthly Chart**: View your monthly spending patterns in the interactive chart
4. **Transaction List**: Browse, edit, or delete your transactions

## 📱 Screenshots

- **Dashboard**: Overview of your finances with summary cards
- **Add Transaction**: Clean, intuitive form for adding new transactions
- **Monthly Chart**: Visual representation of your spending patterns
- **Transaction List**: Easy-to-browse list of all your transactions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Recharts](https://recharts.org/) for interactive charts
- [MongoDB](https://www.mongodb.com/) for database services
- [Vercel](https://vercel.com/) for seamless deployment
