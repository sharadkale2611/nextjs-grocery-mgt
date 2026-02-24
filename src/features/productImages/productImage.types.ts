// productImage.types.ts


export interface ProductImage {

  productImageId: number;

  productId: number;

  imageUrl: string;

  isPrimary: boolean;

  sortOrder: number;

  createdAt: string;

}



export interface ProductImageCreateDto {

  productId: number;

  image: File;

  isPrimary?: boolean;

  sortOrder?: number;

}



export interface ApiResponse<T> {

  success: boolean;

  message: string;

  data: T;

  error?: string | null;

  errors?: any;

}