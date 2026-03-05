import { z } from "zod";

export const StockAdjustmentCreateSchema = z.object({

  productId: z.number(),

  batchId: z.number().nullable().optional(),

  adjustmentType: z.string().min(1),

  quantity: z.number().positive(),

  reason: z.string().nullable().optional(),
});