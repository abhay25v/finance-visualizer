import { NextResponse } from 'next/server';

let TransactionService;

// Try to use MongoDB, fallback to in-memory store
try {
  const { TransactionService: MongoService } = await import('@/lib/transactionService');
  TransactionService = MongoService;
} catch (error) {
  console.warn('MongoDB not available, using fallback service:', error.message);
  const { FallbackTransactionService } = await import('@/lib/fallbackService');
  TransactionService = FallbackTransactionService;
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    
    const transaction = await TransactionService.updateTransaction(id, body);
    return NextResponse.json(transaction);
  } catch (error) {
    console.error(`PUT /api/transactions/${params.id} error:`, error);
    
    if (error.message === 'Transaction not found') {
      return NextResponse.json(
        { error: 'Transaction not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to update transaction' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    await TransactionService.deleteTransaction(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`DELETE /api/transactions/${params.id} error:`, error);
    
    if (error.message === 'Transaction not found') {
      return NextResponse.json(
        { error: 'Transaction not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to delete transaction' },
      { status: 500 }
    );
  }
}
