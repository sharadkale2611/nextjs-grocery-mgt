import { z } from "zod";


export const ProductSchema = z.object({

  productId: z.number(),

  firmId: z.number(),

  firmName: z.string(),

  categoryId: z.number(),

  categoryName: z.string(),

  productName: z.string().min(1, "Product Name required"),

  barcode: z.string().optional(),

  unit: z.string().min(1),

  isLooseItem: z.boolean(),

  mrp: z.number().min(0),

  salePrice: z.number().min(0),

  gstPercent: z.number().min(0),

  lowStockAlert: z.number().optional(),

  isActive: z.boolean(),

});


export const ProductListSchema = z.array(ProductSchema);




export const ProductCreateSchema = z.object({

  categoryId: z.number(),

  productName: z.string().min(1),

  barcode: z.string().optional(),

  unit: z.string(),

  isLooseItem: z.boolean(),

  mrp: z.number(),

  salePrice: z.number(),

  gstPercent: z.number(),

  lowStockAlert: z.number().optional(),

  isActive: z.boolean(),

});