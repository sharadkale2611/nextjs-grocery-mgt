// product.types.ts

export interface Product {
  productId: number;
  firmId: number;
  firmName: string;

  categoryId: number;
  categoryName: string;

  productName: string;
  barcode?: string;

  unit: string;
  isLooseItem: boolean;

  mrp: number;
  salePrice: number;

  gstPercent: number;

  lowStockAlert?: number;

  isActive: boolean;

  createdAt: string;
  updatedAt?: string;
    primaryImageUrl?: string | null;

}


export interface ProductCreateDto {

  categoryId: number;

  productName: string;

  barcode?: string;

  unit: string;

  isLooseItem: boolean;

  mrp: number;

  salePrice: number;

  gstPercent: number;

  lowStockAlert?: number;

  isActive: boolean;

}


export interface ProductUpdateDto extends ProductCreateDto {

  productId: number;

}



export interface PaginatedProducts {

  totalCount: number;

  pageSize: number;

  currentPage: number;

  totalPages: number;

  items: Product[];

}


export interface ApiResponse<T> {

  success: boolean;

  message: string;

  data: T;

  error?: string | null;

  errors?: any;

}