import { api } from "@/store/api";

import { API_ROUTES } from "@/lib/apiRoutes";

import {
  Product,
  ApiResponse,
  ProductCreateDto,
  ProductUpdateDto,
  PaginatedProducts,
} from "./product.types";



export const productApi = api.injectEndpoints({

  endpoints: (builder) => ({




    // =============================
    // GET ALL
    // =============================

    getProducts: builder.query<Product[], void>({

      query: () => API_ROUTES.PRODUCTS,

      transformResponse: (res: ApiResponse<Product[]>) => res.data,

      providesTags: ["Products"],

    }),



    // =============================
    // GET PAGINATED
    // =============================

    getProductsPaginated: builder.query<
      PaginatedProducts,
      { pageNumber?: number; pageSize?: number; search?: string }
    >({

      query: ({
        pageNumber = 1,
        pageSize = 10,
        search = "",
      }) =>
        `${API_ROUTES.PRODUCTS}/paginated?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${search}`,


      transformResponse: (res: ApiResponse<PaginatedProducts>) => res.data,


      providesTags: ["Products"],

    }),




    // =============================
    // GET BY ID
    // =============================

    getProductById: builder.query<Product, number>({

      query: (id) => `${API_ROUTES.PRODUCTS}/${id}`,

      transformResponse: (res: ApiResponse<Product>) => res.data,

      providesTags: (result, error, id) => [

        { type: "Products", id },

      ],

    }),




    // =============================
    // CREATE
    // =============================

    createProduct: builder.mutation<Product, ProductCreateDto>({

      query: (body) => ({

        url: API_ROUTES.PRODUCTS,

        method: "POST",

        body,

      }),

      transformResponse: (res: ApiResponse<Product>) => res.data,

      invalidatesTags: ["Products"],

    }),




    // =============================
    // UPDATE
    // =============================

    updateProduct: builder.mutation<
      boolean,
      { productId: number; body: ProductUpdateDto }
    >({

      query: ({ productId, body }) => ({

        url: `${API_ROUTES.PRODUCTS}/${productId}`,

        method: "PUT",

        body,

      }),

      transformResponse: (res: ApiResponse<any>) => res.success,

      invalidatesTags: ["Products"],

    }),




    // =============================
    // DELETE
    // =============================

    deleteProduct: builder.mutation<boolean, number>({

      query: (productId) => ({

        url: `${API_ROUTES.PRODUCTS}/${productId}`,

        method: "DELETE",

      }),

      transformResponse: (res: ApiResponse<any>) => res.success,

      invalidatesTags: ["Products"],

    }),

  }),

});




export const {

  useGetProductsQuery,

  useGetProductsPaginatedQuery,

  useGetProductByIdQuery,

  useCreateProductMutation,

  useUpdateProductMutation,

  useDeleteProductMutation,

} = productApi;