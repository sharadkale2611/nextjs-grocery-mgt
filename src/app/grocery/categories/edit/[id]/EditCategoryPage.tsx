"use client";

import Button from "@/components/atoms/Button";
import CustomInput from "@/components/atoms/CustomInput";
import React, { useState } from "react";
import { useParams } from "next/navigation";

export default function EditCategoryPage() {
  const params = useParams();

  // Static prefilled data (Edit mode)
  const [form] = useState({
    categoryName: "Rice & Grains",
    parentCategory: "Grocery",
    isActive: true,
    productCount: 24,
  });

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      {/* Page Header */}
      <div className="mb-6 flex items-center gap-2">
        <span className="text-lg">✏️</span>
        <h1 className="text-2xl font-semibold text-gray-900">
          Edit Category
        </h1>
      </div>

      {/* Card */}
      <div className="rounded-xl border bg-white shadow-sm">
        <div className="space-y-8 p-6">

          {/* Category Name */}
          <section>
            <CustomInput
              label="Category Name"
              name="categoryName"
              value={form.categoryName}
              readOnly
            />
          </section>

          {/* Parent Category */}
          <section>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Parent Category
            </label>

            <select
              className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              value={form.parentCategory}
              disabled
            >
              <option>None</option>
              <option>Grocery</option>
              <option>Rice & Grains</option>
              <option>Snacks</option>
            </select>
          </section>

          {/* Status */}
          <section>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Status
            </label>

            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={form.isActive}
                readOnly
                className="accent-primary"
              />
              Active
            </label>
          </section>

          {/* Warning / Info */}
          <section className="flex items-start gap-3 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
            <span className="mt-0.5">⚠️</span>
            <span>
              Products under this category:{" "}
              <strong>{form.productCount}</strong>
            </span>
          </section>

          {/* Actions */}
          <div className="flex gap-4 border-t pt-6">
            <Button variant="primary">
              Update
            </Button>

            <Button variant="default" onClick={() => history.back()}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
