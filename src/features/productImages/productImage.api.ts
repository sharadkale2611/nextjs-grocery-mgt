import { api } from "@/store/api";

import { API_ROUTES } from "@/lib/apiRoutes";

import {

  ProductImage,

  ProductImageCreateDto,

  ApiResponse,

} from "./productImage.types";



export const productImageApi =
  api.injectEndpoints({

    endpoints: (builder) => ({



      // ==========================
      // GET BY PRODUCT
      // ==========================

      getProductImages:

        builder.query<ProductImage[], number>({

          query: (productId) =>
            `${API_ROUTES.PRODUCT_IMAGES}/${productId}`,

          transformResponse:

            (res: ApiResponse<ProductImage[]>) =>
              res.data,

          providesTags: ["ProductImages"],

        }),




      // ==========================
      // UPLOAD IMAGE
      // ==========================

      uploadProductImage:

        builder.mutation<
          ProductImage,
          ProductImageCreateDto
        >({

          query: (dto) => {

            const formData =
              new FormData();

            formData.append(
              "productId",
              dto.productId.toString()
            );

            formData.append(
              "image",
              dto.image
            );

            formData.append(
              "isPrimary",
              String(dto.isPrimary ?? false)
            );

            formData.append(
              "sortOrder",
              String(dto.sortOrder ?? 0)
            );

            return {

              url: API_ROUTES.PRODUCT_IMAGES,

              method: "POST",

              body: formData,

            };

          },

          transformResponse:
            (res: ApiResponse<ProductImage>) =>
              res.data,

          invalidatesTags: [
            "ProductImages",
          ],

        }),




      // ==========================
      // DELETE
      // ==========================

      deleteProductImage:

        builder.mutation<boolean, number>({

          query: (imageId) => ({

            url:
              `${API_ROUTES.PRODUCT_IMAGES}/${imageId}`,

            method: "DELETE",

          }),

          transformResponse:
            (res: ApiResponse<any>) =>
              res.success,

          invalidatesTags: [
            "ProductImages",
          ],

        }),

    }),

  });



export const {

  useGetProductImagesQuery,

  useUploadProductImageMutation,

  useDeleteProductImageMutation,

} = productImageApi;