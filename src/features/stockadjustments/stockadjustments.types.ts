export interface StockAdjustment {
  adjustmentId: number;

  firmId?: number | null;
  firmName?: string | null;

  productId: number;
  productName?: string | null;

  adjustmentType?: string | null;

  quantity: number;

  reason?: string | null;

  createdAt: string;
}

export interface CreateStockAdjustmentDto {
  productId: number;
  adjustmentType?: string | null;
  quantity: number;
  reason?: string | null;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  error?: string | null;
  errors?: any;
}