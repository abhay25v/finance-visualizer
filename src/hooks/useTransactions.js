'use client';

import { useState, useEffect } from 'react';

const API_BASE = '/api';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [monthlyExpenses, setMonthlyExpenses] = useState([]);
  const [stats, setStats] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
    transactionCount: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTransactions = async () => {
    try {
      const response = await fetch(`${API_BASE}/transactions`);
      if (!response.ok) throw new Error('Failed to fetch transactions');
      const data = await response.json();
      setTransactions(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching transactions:', err);
    }
  };

  const fetchMonthlyExpenses = async () => {
    try {
      const response = await fetch(`${API_BASE}/analytics/monthly-expenses`);
      if (!response.ok) throw new Error('Failed to fetch monthly expenses');
      const data = await response.json();
      setMonthlyExpenses(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching monthly expenses:', err);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_BASE}/analytics/stats`);
      if (!response.ok) throw new Error('Failed to fetch stats');
      const data = await response.json();
      setStats(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching stats:', err);
    }
  };

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    try {
      await Promise.all([
        fetchTransactions(),
        fetchMonthlyExpenses(),
        fetchStats()
      ]);
    } catch (err) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const addTransaction = async (transactionData) => {
    try {
      const response = await fetch(`${API_BASE}/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create transaction');
      }

      const newTransaction = await response.json();
      await fetchAllData(); // Refresh all data
      return newTransaction;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateTransaction = async (id, updates) => {
    try {
      const response = await fetch(`${API_BASE}/transactions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update transaction');
      }

      const updatedTransaction = await response.json();
      await fetchAllData(); // Refresh all data
      return updatedTransaction;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteTransaction = async (id) => {
    try {
      const response = await fetch(`${API_BASE}/transactions/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete transaction');
      }

      await fetchAllData(); // Refresh all data
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return {
    transactions,
    monthlyExpenses,
    stats,
    loading,
    error,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    refetch: fetchAllData
  };
};
