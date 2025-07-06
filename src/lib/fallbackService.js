import { transactionStore } from './store.js';

// Fallback API simulation for when MongoDB is not available
export class FallbackTransactionService {
  static async getAllTransactions() {
    // Simulate async behavior
    await new Promise(resolve => setTimeout(resolve, 100));
    return transactionStore.getAll();
  }

  static async createTransaction(transactionData) {
    await new Promise(resolve => setTimeout(resolve, 100));
    return transactionStore.create(transactionData);
  }

  static async updateTransaction(id, updates) {
    await new Promise(resolve => setTimeout(resolve, 100));
    return transactionStore.update(id, updates);
  }

  static async deleteTransaction(id) {
    await new Promise(resolve => setTimeout(resolve, 100));
    const result = transactionStore.delete(id);
    return result ? { success: true } : null;
  }

  static async getMonthlyExpenses() {
    await new Promise(resolve => setTimeout(resolve, 100));
    return transactionStore.getMonthlyExpenses();
  }

  static async getTransactionStats() {
    await new Promise(resolve => setTimeout(resolve, 100));
    const transactions = transactionStore.getAll();
    
    const totalIncome = transactions
      .filter(t => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpenses = transactions
      .filter(t => t.amount < 0)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    
    return {
      totalIncome: Math.round(totalIncome * 100) / 100,
      totalExpenses: Math.round(totalExpenses * 100) / 100,
      balance: Math.round((totalIncome - totalExpenses) * 100) / 100,
      transactionCount: transactions.length
    };
  }
}
