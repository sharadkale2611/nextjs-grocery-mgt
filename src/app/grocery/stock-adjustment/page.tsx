"use client";

import { useState } from "react";

import Button from "@/components/atoms/Button";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";

import { useGetProductsQuery } from "@/features/products";
import { useGetProductBatchesQuery } from "@/features/productbatches";
import { useCreateStockAdjustmentMutation } from "@/features/stockadjustments";

export default function StockAdjustmentPage() {

  // ===============================
  // STATE
  // ===============================
  const [productId, setProductId] =
    useState<number | undefined>();

  const [batchId, setBatchId] =
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

  const { data: batches = [] } =
    useGetProductBatchesQuery(productId!, {
      skip: !productId,
    });

  const [
    createAdjustment,
    { isLoading }
  ] = useCreateStockAdjustmentMutation();

  // ===============================
  // SUBMIT HANDLER
  // ===============================
  const handleSubmit = async () => {

    if (!productId || !batchId) {
      alert("Please select Product & Batch");
      return;
    }

    try {

      await createAdjustment({
        productId,
        batchId,
        adjustmentType,
        quantity,
        reason,
      }).unwrap();

      alert("Stock adjusted successfully");

      // reset form
      setBatchId(undefined);
      setQuantity(1);
      setReason("");

    } catch (err) {
      console.error(err);
      alert("Failed to adjust stock");
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
                  setBatchId(undefined);
                }}
              >
                <option value="">Select Product</option>

                {products.map((p) => (
                  <option
                    key={p.productId}
                    value={p.productId}
                  >
                    {p.productName}
                  </option>
                ))}
              </select>
            </div>

            {/* ================= BATCH DROPDOWN ⭐ ================= */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Batch
              </label>

              <select
                className="w-full rounded-lg border px-3 py-2 text-sm"
                value={batchId ?? ""}
                onChange={(e) =>
                  setBatchId(Number(e.target.value))
                }
              >
                <option value="">Select Batch</option>

                {batches.map((b) => (
                  <option
                    key={b.batchId}
                    value={b.batchId}
                  >
                    {b.batchNumber} (Stock: {b.remainingQty})
                  </option>
                ))}
              </select>
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