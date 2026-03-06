// ================================
// CREATE SALE ITEM
// ================================
export interface CreateSaleItemDto {
  productId: number;
  quantity: number;
  price: number;
}

// ================================
// CREATE SALE REQUEST
// ================================
export interface CreateSaleDto {
  subtotal: number;
  gst: number;
  total: number;
  paymentMethod: string;

  items: CreateSaleItemDto[];
}

// ================================
// CREATE SALE RESPONSE DATA
// ================================
export interface CreateSaleResponse {
  saleId: number;
  invoiceNumber: string;
}

// ================================
// GENERIC API RESPONSE
// ================================
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  error?: string | null;
  errors?: string[] | null;
}