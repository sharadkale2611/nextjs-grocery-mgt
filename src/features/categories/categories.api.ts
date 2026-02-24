import { api } from "@/store/api";

import { API_ROUTES } from "@/lib/apiRoutes";

import {
  ApiResponse,
  Category,
  CreateCategoryDto,
  UpdateCategoryDto
} from "./categories.types";


export const categoriesApi =
  api.injectEndpoints({

    endpoints: (builder) => ({

      // GET ALL
      getCategories:
        builder.query<Category[], void>({

          query: () =>
            API_ROUTES.CATEGORIES,

          transformResponse:
            (res: ApiResponse<Category[]>) =>
              res.data,

          providesTags: ["Categories"],
        }),

      // GET BY ID
      getCategoryById:
        builder.query<Category, number>({

          query: (id) =>
            `${API_ROUTES.CATEGORIES}/${id}`,

          transformResponse:
            (res: ApiResponse<Category>) =>
              res.data,

          providesTags:
            (result, error, id) => [
              { type: "Categories", id }
            ],
        }),


      // CREATE
      createCategory:
        builder.mutation<Category, CreateCategoryDto>({

          query: (body) => ({
            url: API_ROUTES.CATEGORIES,
            method: "POST",
            body,
          }),

          transformResponse:
            (res: ApiResponse<Category>) =>
              res.data,

          invalidatesTags: ["Categories"],
        }),


      // UPDATE
      updateCategory:
        builder.mutation<Category, UpdateCategoryDto>({

          query: (body) => ({
            url:
              `${API_ROUTES.CATEGORIES}/${body.categoryId}`,
            method: "PUT",
            body,
          }),

          transformResponse:
            (res: ApiResponse<Category>) =>
              res.data,

          invalidatesTags: ["Categories"],
        }),


      // DELETE
      deleteCategory:
        builder.mutation<boolean, number>({

          query: (id) => ({
            url:
              `${API_ROUTES.CATEGORIES}/${id}`,
            method: "DELETE",
          }),

          transformResponse:
            (res: ApiResponse<any>) =>
              res.success,

          invalidatesTags: ["Categories"],
        }),
    }),
  });


export const {

  useGetCategoriesQuery,

  useGetCategoryByIdQuery,

  useCreateCategoryMutation,

  useUpdateCategoryMutation,

  useDeleteCategoryMutation,

} = categoriesApi;