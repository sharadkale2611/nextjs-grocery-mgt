// src/features/products/index.ts


// ==========================
// API
// ==========================

export {

  productApi,

  useGetProductsQuery,

  useGetProductsPaginatedQuery,

  useGetProductByIdQuery,

  useCreateProductMutation,

  useUpdateProductMutation,

  useDeleteProductMutation,

} from "./product.api";



// ==========================
// Types
// ==========================

export type {

  Product,

  ProductCreateDto,

  ProductUpdateDto,

  PaginatedProducts,

  ApiResponse,

} from "./product.types";



// ==========================
// Validation
// ==========================

export {

  ProductSchema,

  ProductListSchema,

  ProductCreateSchema,

} from "./product.validation";