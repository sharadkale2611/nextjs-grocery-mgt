export interface StockLedger {
 productStockId: number;

  firmId?: number | null;
  firmName?: string | null;

  productId: number;
  productName?: string | null;

  quantity: number;

  remark: string;

  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  error?: string | null;
  errors?: any;
}