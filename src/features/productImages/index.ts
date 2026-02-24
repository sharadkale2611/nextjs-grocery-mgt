// ==========================
// API
// ==========================

export {

  productImageApi,

  useGetProductImagesQuery,

  useUploadProductImageMutation,

  useDeleteProductImageMutation,

}
from "./productImage.api";




// ==========================
// TYPES
// ==========================

export type {

  ProductImage,

  ProductImageCreateDto,

  ApiResponse,

}
from "./productImage.types";




// ==========================
// VALIDATION
// ==========================

export {

  ProductImageSchema,

  ProductImageListSchema,

  ProductImageCreateSchema,

}
from "./productImage.validation";