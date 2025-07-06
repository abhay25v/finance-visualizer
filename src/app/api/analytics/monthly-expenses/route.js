import { NextResponse } from 'next/server';

let TransactionService;
let isUsingFallback = false;

// Try to use MongoDB, fallback to in-memory store
try {
  if (process.env.MONGODB_URI) {
    const { TransactionService: MongoService } = await import('@/lib/transactionService');
    TransactionService = MongoService;
  } else {
    throw new Error('No MongoDB URI provided');
  }
} catch (error) {
  console.warn('MongoDB not available for monthly expenses, using fallback service:', error.message);
  const { FallbackTransactionService } = await import('@/lib/fallbackService');
  TransactionService = FallbackTransactionService;
  isUsingFallback = true;
}

export async function GET() {
  try {
    const monthlyExpenses = await TransactionService.getMonthlyExpenses();
    const response = NextResponse.json(monthlyExpenses);
    
    if (isUsingFallback) {
      response.headers.set('X-Using-Fallback', 'true');
    }
    
    return response;
  } catch (error) {
    console.error('GET /api/analytics/monthly-expenses error:', error);
    
    // If MongoDB fails, try fallback
    if (!isUsingFallback) {
      try {
        const { FallbackTransactionService } = await import('@/lib/fallbackService');
        const monthlyExpenses = await FallbackTransactionService.getMonthlyExpenses();
        const response = NextResponse.json(monthlyExpenses);
        response.headers.set('X-Using-Fallback', 'true');
        return response;
      } catch (fallbackError) {
        console.error('Fallback also failed:', fallbackError);
      }
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch monthly expenses' },
      { status: 500 }
    );
  }
}
