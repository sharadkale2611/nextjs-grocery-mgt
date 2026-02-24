export interface Category {
  categoryId: number;
  categoryName: string;

  firmId: number;
  firmName: string;

  parentCategoryId?: number | null;

  isActive: boolean;

  createdAt: string;
  updatedAt?: string | null;
  productCount: number;
}

export interface CreateCategoryDto {
  categoryName: string;
  parentCategoryId?: number | null;
  isActive: boolean;
}

export interface UpdateCategoryDto {
  categoryId: number;
  categoryName: string;
  parentCategoryId?: number | null;
  isActive: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  error?: string | null;
  errors?: any;
}