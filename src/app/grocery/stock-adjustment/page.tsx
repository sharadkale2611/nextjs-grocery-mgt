"use client";

import { useState } from "react";

import Button from "@/components/atoms/Button";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";

import { useGetProductsQuery } from "@/features/products";
import { useGetProductBatchesQuery } from "@/features/productbatches";
import { useCreateStockAdjustmentMutation } from "@/features/stockadjustments";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import { useGetStockLedgerByProductIdQuery } from "@/features/stockledger/stockledger.api";
export default function StockAdjustmentPage() {

  const router = useRouter();


  // ===============================
  // STATE
  // ===============================
  const [productId, setProductId] =
    useState<number | undefined>();

  const [adjustmentType, setAdjustmentType] =
    useState("DECREASE");

  const [quantity, setQuantity] =
    useState<number>(1);

  const [reason, setReason] =
    useState("");

  // ===============================
  // API CALLS
  // ===============================
  const { data: products = [] } =
    useGetProductsQuery();

  const [
    createAdjustment,
    { isLoading }
  ] = useCreateStockAdjustmentMutation();


  const { data: productStock, isLoading: stockLoading } =
    useGetStockLedgerByProductIdQuery(productId!, {
      skip: !productId,
    });

  const currentStock = productStock?.quantity ?? 0;

  const newStock =
    adjustmentType === "INCREASE"
      ? currentStock + quantity
      : currentStock - quantity;

  // ===============================
  // SUBMIT HANDLER
  // ===============================
  const handleSubmit = async () => {

    if (!productId) {
      enqueueSnackbar("Please select Product", { variant: "warning" });
      return;
    }

    try {

      await createAdjustment({
        productId,
        adjustmentType,
        quantity,
        reason,
      }).unwrap();

      enqueueSnackbar("Stock adjusted successfully", {
        variant: "success",
      });

      setTimeout(() => {
        router.push("/grocery/stock-ledger");
      }, 800);

      // // reset form
      // setQuantity(1);
      // setReason("");

    } catch (err: any) {

      console.error(err);

      enqueueSnackbar(
        err?.data?.message || "Failed to adjust stock",
        { variant: "error" }
      );

    }
  };


  return (
    <>
      <PageBreadcrumb pageTitle="Stock Adjustment" />

      <div className="mx-auto max-w-3xl">
        <ComponentCard title="Stock Adjustment">

          <div className="space-y-6">

            {/* ================= PRODUCT ================= */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Product
              </label>

              <select
                className="w-full rounded-lg border px-3 py-2 text-sm"
                value={productId ?? ""}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setProductId(value);
                }}
              >
                <option value="">Select Product</option>

                {products.map((p) => (
                  <option key={p.productId} value={p.productId}>
                    {p.productName}
                  </option>
                ))}
              </select>

              {productId && (
                <div className="text-sm text-blue-600 mt-2">
                  {stockLoading ? (
                    <span>Loading stock...</span>
                  ) : (
                    <span>
                      Current Stock:{" "}
                      <strong>{currentStock}</strong>
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* ================= TYPE ================= */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Adjustment Type
              </label>

              <div className="flex gap-6 text-sm">

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={adjustmentType === "INCREASE"}
                    onChange={() =>
                      setAdjustmentType("INCREASE")
                    }
                  />
                  Increase
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={adjustmentType === "DECREASE"}
                    onChange={() =>
                      setAdjustmentType("DECREASE")
                    }
                  />
                  Decrease
                </label>

              </div>
            </div>

            {/* ================= QUANTITY ================= */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Quantity
              </label>

              <input
                type="number"
                className="w-24 rounded-lg border px-3 py-2 text-sm"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Number(e.target.value))
                }
              />

              {productId && (
                <div className="text-sm text-green-600 mt-1">
                  New Stock: <strong>{newStock}</strong>
                </div>
              )}
            </div>

            {/* ================= REASON ================= */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Reason
              </label>

              <textarea
                rows={3}
                className="w-full rounded-lg border px-3 py-2 text-sm"
                value={reason}
                onChange={(e) =>
                  setReason(e.target.value)
                }
              />
            </div>

            {/* ================= ACTION ================= */}
            <div className="border-t pt-6 flex gap-4">

              <Button
                variant="primary"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading
                  ? "Saving..."
                  : "Save Adjustment"}
              </Button>

              <Button
                variant="default"
                onClick={() => history.back()}
              >
                Cancel
              </Button>

            </div>

          </div>
        </ComponentCard>
      </div>
    </>
  );
}