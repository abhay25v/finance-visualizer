import clientPromise from './mongodb.js';
import { ObjectId } from 'mongodb';

const DB_NAME = 'finance-tracker';
const COLLECTION_NAME = 'transactions';

export class TransactionService {
  static async getCollection() {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    return db.collection(COLLECTION_NAME);
  }

  static async getAllTransactions() {
    try {
      const collection = await this.getCollection();
      const transactions = await collection
        .find({})
        .sort({ date: -1, createdAt: -1 })
        .toArray();
      
      return transactions.map(transaction => ({
        ...transaction,
        id: transaction._id.toString(),
        _id: undefined
      }));
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw new Error('Failed to fetch transactions');
    }
  }

  static async createTransaction(transactionData) {
    try {
      const collection = await this.getCollection();
      const transaction = {
        ...transactionData,
        amount: parseFloat(transactionData.amount),
        date: transactionData.date || new Date().toISOString().split('T')[0],
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const result = await collection.insertOne(transaction);
      
      return {
        ...transaction,
        id: result.insertedId.toString(),
        _id: undefined
      };
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw new Error('Failed to create transaction');
    }
  }

  static async updateTransaction(id, updates) {
    try {
      const collection = await this.getCollection();
      const updateData = {
        ...updates,
        amount: parseFloat(updates.amount),
        updatedAt: new Date()
      };

      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
      );

      if (result.matchedCount === 0) {
        throw new Error('Transaction not found');
      }

      const updatedTransaction = await collection.findOne({ _id: new ObjectId(id) });
      return {
        ...updatedTransaction,
        id: updatedTransaction._id.toString(),
        _id: undefined
      };
    } catch (error) {
      console.error('Error updating transaction:', error);
      throw new Error('Failed to update transaction');
    }
  }

  static async deleteTransaction(id) {
    try {
      const collection = await this.getCollection();
      const result = await collection.deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 0) {
        throw new Error('Transaction not found');
      }

      return { success: true };
    } catch (error) {
      console.error('Error deleting transaction:', error);
      throw new Error('Failed to delete transaction');
    }
  }

  static async getMonthlyExpenses() {
    try {
      const collection = await this.getCollection();
      
      const pipeline = [
        {
          $match: {
            amount: { $lt: 0 } // Only expenses
          }
        },
        {
          $addFields: {
            monthYear: {
              $dateToString: {
                format: "%Y-%m",
                date: {
                  $dateFromString: {
                    dateString: "$date"
                  }
                }
              }
            }
          }
        },
        {
          $group: {
            _id: "$monthYear",
            totalAmount: {
              $sum: { $abs: "$amount" }
            }
          }
        },
        {
          $sort: { _id: 1 }
        },
        {
          $project: {
            month: "$_id",
            amount: { $round: ["$totalAmount", 2] },
            _id: 0
          }
        }
      ];

      return await collection.aggregate(pipeline).toArray();
    } catch (error) {
      console.error('Error fetching monthly expenses:', error);
      throw new Error('Failed to fetch monthly expenses');
    }
  }

  static async getTransactionStats() {
    try {
      const collection = await this.getCollection();
      
      const pipeline = [
        {
          $group: {
            _id: null,
            totalIncome: {
              $sum: {
                $cond: [{ $gt: ["$amount", 0] }, "$amount", 0]
              }
            },
            totalExpenses: {
              $sum: {
                $cond: [{ $lt: ["$amount", 0] }, { $abs: "$amount" }, 0]
              }
            },
            transactionCount: { $sum: 1 }
          }
        },
        {
          $project: {
            totalIncome: { $round: ["$totalIncome", 2] },
            totalExpenses: { $round: ["$totalExpenses", 2] },
            balance: { 
              $round: [
                { $subtract: ["$totalIncome", "$totalExpenses"] },
                2
              ]
            },
            transactionCount: 1,
            _id: 0
          }
        }
      ];

      const result = await collection.aggregate(pipeline).toArray();
      return result[0] || {
        totalIncome: 0,
        totalExpenses: 0,
        balance: 0,
        transactionCount: 0
      };
    } catch (error) {
      console.error('Error fetching transaction stats:', error);
      throw new Error('Failed to fetch transaction statistics');
    }
  }
}
