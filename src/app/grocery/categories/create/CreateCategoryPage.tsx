"use client";

import Button from "@/components/atoms/Button";
import CustomInput from "@/components/atoms/CustomInput";
import React, { useState } from "react";

export default function CreateCategoryPage() {
  // Static form state (UI only)
  const [form] = useState({
    categoryName: "",
    parentCategory: "None",
    isActive: true,
  });

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      {/* Page Header */}
      <div className="mb-6 flex items-center gap-2">
        <span className="text-xl text-primary">+</span>
        <h1 className="text-2xl font-semibold text-gray-900">
          Add Category
        </h1>
      </div>

      {/* Card */}
      <div className="rounded-xl border bg-white shadow-sm">
        <div className="space-y-8 p-6">

          {/* Category Name */}
          <section>
            <CustomInput
              label="Category Name *"
              name="categoryName"
              placeholder="Enter category name"
              value={form.categoryName}
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

          {/* Actions */}
          <div className="flex gap-4 border-t pt-6">
            <Button variant="primary">
              Save Category
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
