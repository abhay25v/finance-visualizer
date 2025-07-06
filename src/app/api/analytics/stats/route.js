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
  console.warn('MongoDB not available for stats, using fallback service:', error.message);
  const { FallbackTransactionService } = await import('@/lib/fallbackService');
  TransactionService = FallbackTransactionService;
  isUsingFallback = true;
}

export async function GET() {
  try {
    const stats = await TransactionService.getTransactionStats();
    const response = NextResponse.json(stats);
    
    if (isUsingFallback) {
      response.headers.set('X-Using-Fallback', 'true');
    }
    
    return response;
  } catch (error) {
    console.error('GET /api/analytics/stats error:', error);
    
    // If MongoDB fails, try fallback
    if (!isUsingFallback) {
      try {
        const { FallbackTransactionService } = await import('@/lib/fallbackService');
        const stats = await FallbackTransactionService.getTransactionStats();
        const response = NextResponse.json(stats);
        response.headers.set('X-Using-Fallback', 'true');
        return response;
      } catch (fallbackError) {
        console.error('Fallback also failed:', fallbackError);
      }
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch transaction statistics' },
      { status: 500 }
    );
  }
}
