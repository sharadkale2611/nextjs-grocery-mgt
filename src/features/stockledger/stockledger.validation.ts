import { z } from "zod";

export const StockLedgerSchema = z.object({
  transactionId: z.number(),

  productId: z.number(),
  productName: z.string().nullable().optional(),

  batchId: z.number().nullable().optional(),
  batchNumber: z.string().nullable().optional(),

  transactionType: z.string(),

  quantity: z.number(),

  isIncrease: z.boolean(),

  referenceId: z.number().nullable().optional(),
  referenceType: z.string().nullable().optional(),

  notes: z.string().nullable().optional(),

  createdAt: z.string(),
});

export const StockLedgerListSchema =
  z.array(StockLedgerSchema);