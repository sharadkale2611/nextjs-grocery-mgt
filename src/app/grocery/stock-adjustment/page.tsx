"use client";

import Button from "@/components/atoms/Button";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";

export default function StockAdjustmentPage() {
  return (
    <>
      <PageBreadcrumb pageTitle="Stock Adjustment" />

      <div className="mx-auto max-w-3xl">
        <ComponentCard title="Stock Adjustment">
          <div className="space-y-6">

            {/* Product */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Product
              </label>
              <select className="w-full rounded-lg border px-3 py-2 text-sm">
                <option>Amul Milk</option>
                <option>Tata Rice</option>
                <option>Kurkure</option>
              </select>
            </div>

            {/* Adjustment Type */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Adjustment Type
              </label>

              <div className="flex gap-6 text-sm text-gray-700">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="adjustmentType"
                    className="accent-primary"
                  />
                  Increase
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="adjustmentType"
                    defaultChecked
                    className="accent-primary"
                  />
                  Decrease
                </label>
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Quantity
              </label>

              <div className="flex items-center gap-3">
                <input
                  type="number"
                  className="w-24 rounded-lg border px-3 py-2 text-sm"
                  defaultValue={2}
                />
                <span className="text-sm text-gray-500">(Pcs)</span>
              </div>
            </div>

            {/* Reason */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Reason
              </label>
              <textarea
                className="w-full rounded-lg border px-3 py-2 text-sm"
                rows={3}
                defaultValue="Damaged packet"
              />
            </div>

            {/* Action */}
            <div className="border-t pt-6 gap-4 flex">
              <Button variant="primary">
                Save Adjustment
              </Button>
              <Button variant="default" onClick={() => history.back()}>
              Cancel
            </Button>
            </div>

          </div>
        </ComponentCard>
      </div>
    </>
  );
}
