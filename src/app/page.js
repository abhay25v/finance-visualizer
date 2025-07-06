'use client';

import { useTransactions } from '@/hooks/useTransactions';
import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';
import ExpensesChart from '@/components/ExpensesChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingStats, LoadingChartAndList } from '@/components/ui/loading';
import { ErrorCard } from '@/components/ui/error';
import { formatCurrency } from '@/lib/utils';
import { DollarSign, TrendingUp, TrendingDown, CreditCard } from 'lucide-react';

export default function Home() {
  const {
    transactions,
    monthlyExpenses,
    stats,
    loading,
    error,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    refetch
  } = useTransactions();

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50/50">
        <header className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Personal Finance Tracker</h1>
                <p className="text-gray-600 mt-2">Track your income and expenses with beautiful visualizations</p>
              </div>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ErrorCard 
            title="Failed to load data"
            message={error}
            onRetry={refetch}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Personal Finance Tracker</h1>
              <p className="text-gray-600 mt-2">Track your income and expenses with beautiful visualizations</p>
            </div>
            <TransactionForm onSubmit={addTransaction} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        {loading ? (
          <LoadingStats />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Balance</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${stats.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(stats.balance)}
                </div>
                <p className="text-xs text-muted-foreground">
                  {stats.balance >= 0 ? 'Positive balance' : 'Negative balance'}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Income</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(stats.totalIncome)}
                </div>
                <p className="text-xs text-muted-foreground">
                  All time income
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                <TrendingDown className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {formatCurrency(stats.totalExpenses)}
                </div>
                <p className="text-xs text-muted-foreground">
                  All time expenses
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Transactions</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.transactionCount}
                </div>
                <p className="text-xs text-muted-foreground">
                  Total recorded
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Chart and Transactions */}
        {loading ? (
          <LoadingChartAndList />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Monthly Expenses Chart */}
            <ExpensesChart data={monthlyExpenses} />
            
            {/* Transaction List */}
            <TransactionList 
              transactions={transactions}
              onUpdate={updateTransaction}
              onDelete={deleteTransaction}
            />
          </div>
        )}
      </main>
    </div>
  );
}
