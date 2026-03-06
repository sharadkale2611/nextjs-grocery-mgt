import { api } from "@/store/api";
import { API_ROUTES } from "@/lib/apiRoutes";

import {
  CreateSaleDto,
  CreateSaleResponse,
  ApiResponse
} from "./sales.types";

export const salesApi = api.injectEndpoints({
  endpoints: (builder) => ({

    createSale: builder.mutation<
      ApiResponse<CreateSaleResponse>,
      CreateSaleDto
    >({
      query: (data) => ({
        url: API_ROUTES.SALES,
        method: "POST",
        body: data
      }),

      invalidatesTags: ["StockLedger", "Products"]
    })

  })
});

export const {
  useCreateSaleMutation
} = salesApi;