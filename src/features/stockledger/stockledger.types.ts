export interface StockLedger {
  transactionId: number;

  firmId?: number | null;
  firmName?: string | null;

  productId: number;
  productName?: string | null;

  batchId?: number | null;
  batchNumber?: string | null;

  transactionType: string;

  quantity: number;

  isIncrease: boolean;

  referenceId?: number | null;
  referenceType?: string | null;

  notes?: string | null;

  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  error?: string | null;
  errors?: any;
}