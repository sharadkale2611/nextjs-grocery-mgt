export interface ProductBatch {
  batchId: number;
  productId: number;
  productName: string;
  batchNumber: string;
  remainingQty: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}