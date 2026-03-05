import { api } from "@/store/api";
import { API_ROUTES } from "@/lib/apiRoutes";

import {
  ApiResponse,
  StockLedger,
} from "./stockledger.types";


// =============================
// PAGINATED RESPONSE TYPE
// =============================
export interface StockLedgerPaginatedResponse {
  items: StockLedger[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}


export const stockLedgerApi = api.injectEndpoints({
  endpoints: (builder) => ({

    // =============================
    // GET FULL STOCK LEDGER
    // =============================
    getStockLedger:
      builder.query<StockLedger[], void>({
        query: () => API_ROUTES.STOCK_TRANSACTIONS,

        transformResponse:
          (res: ApiResponse<StockLedger[]>) =>
            res.data ?? [],

        providesTags: ["StockLedger"],
      }),


    // =============================
    // GET PAGINATED LEDGER (FILTERS)
    // =============================
    getStockLedgerPaginated:
      builder.query<
        StockLedgerPaginatedResponse,
        { pageNumber?: number; pageSize?: number; productId?: number }
      >({
        query: (params) => ({
          url: `${API_ROUTES.STOCK_TRANSACTIONS}/paginated`,
          params,
        }),

       transformResponse:
  (res: ApiResponse<any>) => ({
    items: res.data?.items ?? [],
    totalCount: res.data?.TotalCount ?? 0,
    currentPage: res.data?.CurrentPage ?? 1,
    totalPages: res.data?.TotalPages ?? 1,
  }),

        providesTags: ["StockLedger"],
      }),


    // =============================
    // GET LEDGER BY ID (DETAIL VIEW ONLY)
    // =============================
    getStockLedgerById:
      builder.query<StockLedger, number>({
        query: (id) =>
          `${API_ROUTES.STOCK_TRANSACTIONS}/${id}`,

        transformResponse:
          (res: ApiResponse<StockLedger>) =>
            res.data,

        providesTags: (result, error, id) => [
          { type: "StockLedger", id },
        ],
      }),
  }),
});


export const {
  useGetStockLedgerQuery,
  useGetStockLedgerPaginatedQuery,
  useGetStockLedgerByIdQuery,   // ⭐ NEW HOOK
} = stockLedgerApi;