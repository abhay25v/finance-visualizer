import { NextResponse } from 'next/server';

let TransactionService;
let isUsingFallback = false;

// Try to use MongoDB, fallback to in-memory store
try {
  if (process.env.MONGODB_URI) {
    const { TransactionService: MongoService } = await import('@/lib/transactionService');
    TransactionService = MongoService;
    console.log('Using MongoDB service');
  } else {
    throw new Error('No MongoDB URI provided');
  }
} catch (error) {
  console.warn('MongoDB not available, using fallback service:', error.message);
  const { FallbackTransactionService } = await import('@/lib/fallbackService');
  TransactionService = FallbackTransactionService;
  isUsingFallback = true;
}

export async function GET() {
  try {
    const transactions = await TransactionService.getAllTransactions();
    const response = NextResponse.json(transactions);
    
    // Add header to indicate if using fallback
    if (isUsingFallback) {
      response.headers.set('X-Using-Fallback', 'true');
    }
    
    return response;
  } catch (error) {
    console.error('GET /api/transactions error:', error);
    
    // If MongoDB fails, try fallback
    if (!isUsingFallback) {
      console.log('MongoDB failed, switching to fallback...');
      try {
        const { FallbackTransactionService } = await import('@/lib/fallbackService');
        const transactions = await FallbackTransactionService.getAllTransactions();
        const response = NextResponse.json(transactions);
        response.headers.set('X-Using-Fallback', 'true');
        return response;
      } catch (fallbackError) {
        console.error('Fallback also failed:', fallbackError);
      }
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch transactions' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.amount || !body.description || !body.category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const transaction = await TransactionService.createTransaction(body);
    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    console.error('POST /api/transactions error:', error);
    
    // If MongoDB fails, try fallback
    if (!isUsingFallback) {
      console.log('MongoDB failed for POST, switching to fallback...');
      try {
        const body = await request.json();
        const { FallbackTransactionService } = await import('@/lib/fallbackService');
        const transaction = await FallbackTransactionService.createTransaction(body);
        const response = NextResponse.json(transaction, { status: 201 });
        response.headers.set('X-Using-Fallback', 'true');
        return response;
      } catch (fallbackError) {
        console.error('Fallback also failed:', fallbackError);
      }
    }
    
    return NextResponse.json(
      { error: 'Failed to create transaction' },
      { status: 500 }
    );
  }
}
