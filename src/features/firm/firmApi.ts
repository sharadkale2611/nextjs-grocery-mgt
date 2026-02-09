import { api } from "@/store/api";
import { API_ROUTES } from "@/lib/apiRoutes";
import { ApiResponse, Firm } from "./firm.types";

export const firmApi = api.injectEndpoints({
  endpoints: (builder) => ({

    getFirms: builder.query<Firm[], void>({
      query: () => API_ROUTES.FIRMS,
      transformResponse: (res: ApiResponse<Firm[]>) => res.data,
      providesTags: ["Firms"],
    }),

    getFirmById: builder.query<Firm, number>({
      query: (id) => `${API_ROUTES.FIRMS}/${id}`,
      transformResponse: (res: ApiResponse<Firm>) => res.data,
      providesTags: (result, error, id) => [{ type: "Firms", id }],
    }),

    createFirm: builder.mutation<Firm, FormData>({
      query: (formData) => ({
        url: API_ROUTES.FIRMS,
        method: "POST",
        body: formData,
        headers: { "Content-Type": "application/json" },
      }),
      transformResponse: (res: ApiResponse<Firm>) => res.data,
      invalidatesTags: ["Firms"],
    }),

    updateFirm: builder.mutation<
      Firm, { firmId: number; formData: FormData }
    >({
      query: ({ firmId, formData }) => ({
        url: `${API_ROUTES.FIRMS}/${firmId}`,
        method: "PUT",
        body: formData,
        headers: { "Content-Type": "application/json" },
      }),
      transformResponse: (res: ApiResponse<Firm>) => res.data,
      invalidatesTags: ["Firms"],
    }),

    //     // DELETE
    deleteFirm: builder.mutation<boolean, number>({
      query: (firmId) => ({
        url: `${API_ROUTES.FIRMS}/${firmId}`,
        method: "DELETE",
      }),
      transformResponse: (res: ApiResponse<any>) => res.success,
      invalidatesTags: ["Firms"],
    }),

  }),
});
export const {
  useGetFirmsQuery,
  useGetFirmByIdQuery,
  useCreateFirmMutation,
  useUpdateFirmMutation,
  useDeleteFirmMutation,
} = firmApi;