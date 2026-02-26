import { api } from "@/store/api";
import { API_ROUTES } from "@/lib/apiRoutes";
import { ProductBatch, ApiResponse } from "./productbatches.types";

export const productBatchesApi = api.injectEndpoints({

  endpoints: (builder) => ({

    getProductBatches:
      builder.query<ProductBatch[], number>({

        query: (productId) =>
          `${API_ROUTES.PRODUCT_BATCHES}?productId=${productId}`,

        transformResponse:
          (res: ApiResponse<ProductBatch[]>) =>
            res.data ?? [],

        providesTags: ["ProductBatches"],
      }),

  }),
});

export const {
  useGetProductBatchesQuery,
} = productBatchesApi;