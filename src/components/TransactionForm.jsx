'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit2 } from 'lucide-react';

const transactionSchema = z.object({
  amount: z.string().min(1, 'Amount is required').refine(
    (val) => !isNaN(parseFloat(val)) && parseFloat(val) !== 0,
    'Amount must be a valid number and not zero'
  ),
  description: z.string().min(1, 'Description is required').max(100, 'Description must be less than 100 characters'),
  date: z.string().min(1, 'Date is required'),
  category: z.string().min(1, 'Category is required'),
});

const categories = [
  'Food & Dining',
  'Shopping',
  'Transportation',
  'Entertainment',
  'Bills & Utilities',
  'Healthcare',
  'Housing',
  'Income',
  'Other'
];

export default function TransactionForm({ transaction, onSubmit, onClose }) {
  const [open, setOpen] = useState(false);
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      amount: transaction?.amount?.toString() || '',
      description: transaction?.description || '',
      date: transaction?.date || new Date().toISOString().split('T')[0],
      category: transaction?.category || '',
    }
  });

  const watchedCategory = watch('category');

  const onFormSubmit = async (data) => {
    try {
      const formattedData = {
        ...data,
        amount: parseFloat(data.amount)
      };
      await onSubmit(formattedData);
      if (!transaction) {
        reset();
      }
      setOpen(false);
      if (onClose) onClose();
    } catch (error) {
      console.error('Error submitting transaction:', error);
    }
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
    if (!newOpen && onClose) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {transaction ? (
          <Button variant="ghost" size="sm">
            <Edit2 className="h-4 w-4" />
          </Button>
        ) : (
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 font-medium">
            <Plus className="h-4 w-4" />
            Add Transaction
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {transaction ? 'Edit Transaction' : 'Add New Transaction'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-sm font-medium">Amount</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                className="text-right"
                {...register('amount')}
              />
              {errors.amount && (
                <p className="text-xs text-red-500">{errors.amount.message}</p>
              )}
              <p className="text-xs text-gray-500">Use negative values for expenses</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm font-medium">Date</Label>
              <Input
                id="date"
                type="date"
                {...register('date')}
              />
              {errors.date && (
                <p className="text-xs text-red-500">{errors.date.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">Description</Label>
            <Input
              id="description"
              placeholder="Enter transaction description"
              {...register('description')}
            />
            {errors.description && (
              <p className="text-xs text-red-500">{errors.description.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-sm font-medium">Category</Label>
            <Select
              value={watchedCategory}
              onValueChange={(value) => setValue('category', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-xs text-red-500">{errors.category.message}</p>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              className="min-w-[80px]"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="min-w-[120px]"
            >
              {isSubmitting ? 'Saving...' : transaction ? 'Update Transaction' : 'Add Transaction'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
