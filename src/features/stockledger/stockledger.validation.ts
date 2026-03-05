import { z } from "zod";

export const StockLedgerSchema = z.object({
  productStockId: z.number(),

  productId: z.number(),
  productName: z.string().nullable().optional(),

  transactionType: z.string(),

  quantity: z.number(),

  remark: z.string().nullable().optional(),

  createdAt: z.string(),
});

export const StockLedgerListSchema =
  z.array(StockLedgerSchema);