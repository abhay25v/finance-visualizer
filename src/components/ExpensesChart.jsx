'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { TrendingDown } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const [year, month] = label.split('-');
    const monthName = new Date(year, month - 1).toLocaleString('default', { month: 'long' });
    
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
        <p className="font-medium">{`${monthName} ${year}`}</p>
        <p className="text-red-600">
          {`Expenses: ${formatCurrency(payload[0].value)}`}
        </p>
      </div>
    );
  }
  return null;
};

export default function ExpensesChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5" />
            Monthly Expenses
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <div className="text-muted-foreground text-center">
            <div className="h-32 w-full bg-muted/20 rounded-lg flex items-center justify-center mb-4">
              <TrendingDown className="h-8 w-8 opacity-50" />
            </div>
            <p className="text-sm">No expense data available</p>
            <p className="text-xs mt-1">Add some transactions to see your monthly expenses</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Format data for chart display
  const chartData = data.map(item => {
    const [year, month] = item.month.split('-');
    const monthName = new Date(year, month - 1).toLocaleString('default', { month: 'short' });
    return {
      ...item,
      displayMonth: `${monthName} ${year.slice(-2)}`
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingDown className="h-5 w-5" />
          Monthly Expenses
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="displayMonth" 
                fontSize={12}
                tick={{ fill: '#6b7280' }}
              />
              <YAxis 
                fontSize={12}
                tick={{ fill: '#6b7280' }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="amount" 
                fill="#ef4444" 
                radius={[4, 4, 0, 0]}
                className="hover:opacity-80 transition-opacity"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Summary stats */}
        <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Total Expenses</p>
            <p className="text-lg font-semibold text-red-600">
              {formatCurrency(data.reduce((sum, item) => sum + item.amount, 0))}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Avg Monthly</p>
            <p className="text-lg font-semibold text-red-600">
              {formatCurrency(data.reduce((sum, item) => sum + item.amount, 0) / data.length)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
