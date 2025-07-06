'use client';

import { formatCurrency, formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TransactionForm from '@/components/TransactionForm';
import { Trash2, TrendingUp, TrendingDown } from 'lucide-react';

export default function TransactionList({ transactions, onUpdate, onDelete }) {
  const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));

  if (transactions.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <div className="text-muted-foreground text-center">
            <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">No transactions yet</h3>
            <p className="text-sm">Add your first transaction to get started!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {sortedTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-full ${
                transaction.amount >= 0 
                  ? 'bg-green-100 text-green-600' 
                  : 'bg-red-100 text-red-600'
              }`}>
                {transaction.amount >= 0 ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
              </div>
              <div>
                <p className="font-medium">{transaction.description}</p>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span>{formatDate(transaction.date)}</span>
                  <span>•</span>
                  <span>{transaction.category}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className={`font-semibold ${
                transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {transaction.amount >= 0 ? '+' : ''}{formatCurrency(transaction.amount)}
              </span>
              
              <div className="flex items-center space-x-1">
                <TransactionForm
                  transaction={transaction}
                  onSubmit={(data) => onUpdate(transaction.id, data)}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(transaction.id)}
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
