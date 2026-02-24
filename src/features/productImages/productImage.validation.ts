import { z } from "zod";



export const ProductImageSchema = z.object({

  productImageId: z.number(),

  productId: z.number(),

  imageUrl: z.string(),

  isPrimary: z.boolean(),

  sortOrder: z.number(),

  createdAt: z.string(),

});



export const ProductImageListSchema =
  z.array(ProductImageSchema);




export const ProductImageCreateSchema =
  z.object({

    productId: z.number(),

    image: z.instanceof(File),

    isPrimary: z.boolean().optional(),

    sortOrder: z.number().optional(),

  });