// Simple in-memory store for transactions
// This will be replaced with MongoDB in production

let transactions = [
  {
    id: '1',
    amount: -85.50,
    description: 'Grocery shopping',
    date: '2025-01-15',
    category: 'Food & Dining'
  },
  {
    id: '2',
    amount: -1200.00,
    description: 'Rent payment',
    date: '2025-01-01',
    category: 'Housing'
  },
  {
    id: '3',
    amount: 3000.00,
    description: 'Salary',
    date: '2025-01-01',
    category: 'Income'
  },
  {
    id: '4',
    amount: -45.20,
    description: 'Gas station',
    date: '2025-01-10',
    category: 'Transportation'
  }
];

export const transactionStore = {
  getAll: () => transactions,
  
  getById: (id) => transactions.find(t => t.id === id),
  
  create: (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
      date: transaction.date || new Date().toISOString().split('T')[0]
    };
    transactions.push(newTransaction);
    return newTransaction;
  },
  
  update: (id, updates) => {
    const index = transactions.findIndex(t => t.id === id);
    if (index !== -1) {
      transactions[index] = { ...transactions[index], ...updates };
      return transactions[index];
    }
    return null;
  },
  
  delete: (id) => {
    const index = transactions.findIndex(t => t.id === id);
    if (index !== -1) {
      const deleted = transactions[index];
      transactions.splice(index, 1);
      return deleted;
    }
    return null;
  },
  
  getMonthlyExpenses: () => {
    const monthlyData = {};
    
    transactions.forEach(transaction => {
      if (transaction.amount < 0) { // Only expenses
        const date = new Date(transaction.date);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        
        if (!monthlyData[monthKey]) {
          monthlyData[monthKey] = 0;
        }
        monthlyData[monthKey] += Math.abs(transaction.amount);
      }
    });
    
    return Object.entries(monthlyData)
      .map(([month, amount]) => ({
        month,
        amount: Math.round(amount * 100) / 100
      }))
      .sort((a, b) => a.month.localeCompare(b.month));
  }
};
