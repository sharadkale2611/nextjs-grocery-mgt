import { z } from "zod";

export const CategorySchema = z.object({
  categoryId: z.number(),

  categoryName: z.string().min(1, "Category Name required"),

  firmId: z.number(),

  firmName: z.string(),

  parentCategoryId: z.number().nullable().optional(),

  isActive: z.boolean(),
});

export const CategoryListSchema =
  z.array(CategorySchema);

export const CategoryCreateSchema =
  z.object({
    categoryName: z.string().min(1),
    parentCategoryId:
      z.number().nullable().optional(),
    isActive: z.boolean(),
  });

  export const CategoryUpdateSchema = z.object({

  categoryName: z.string().min(1),

  parentCategoryId:
    z.number().nullable().optional(),

  isActive: z.boolean(),

});