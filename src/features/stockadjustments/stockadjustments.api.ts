import { api } from "@/store/api";
import { API_ROUTES } from "@/lib/apiRoutes";

import {
  StockAdjustment,
  CreateStockAdjustmentDto,
  ApiResponse,
} from "./stockadjustments.types";

export const stockAdjustmentsApi =
  api.injectEndpoints({

    endpoints: (builder) => ({

      // =========================
      // GET ALL ADJUSTMENTS
      // =========================
      getStockAdjustments:
        builder.query<StockAdjustment[], void>({

          query: () => API_ROUTES.STOCK_ADJUSTMENTS,

          transformResponse:
            (res: ApiResponse<StockAdjustment[]>) =>
              res.data ?? [],

          providesTags: ["StockAdjustments"],
        }),

      // =========================
      // CREATE ADJUSTMENT
      // =========================
      createStockAdjustment:
        builder.mutation<
          StockAdjustment,
          CreateStockAdjustmentDto
        >({

          query: (body) => ({
            url: API_ROUTES.STOCK_ADJUSTMENTS,
            method: "POST",
            body,
          }),

          transformResponse:
            (res: ApiResponse<StockAdjustment>) =>
              res.data,

          invalidatesTags: [
            "StockAdjustments",
            "StockLedger",
          ],
        }),
    }),
  });

export const {
  useGetStockAdjustmentsQuery,
  useCreateStockAdjustmentMutation,
} = stockAdjustmentsApi;