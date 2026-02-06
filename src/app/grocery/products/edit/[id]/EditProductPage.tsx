"use client";

import Button from "@/components/atoms/Button";
import CustomInput from "@/components/atoms/CustomInput";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import CategorySelector from "@/components/molecules/CategorySelector";

export default function EditProductPage() {
  const params = useParams();

  // Static prefilled data (Edit mode)
  const [form] = useState({
    productName: "Tata Rice 25kg",
    category: "Rice & Grains",
    barcode: "8901234567890",
    unit: "Kg",
    isLoose: true,
    mrp: "60.00",
    salePrice: "58.00",
    gst: "5",
    lowStockAlert: "20",
    isActive: true,
  });

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      {/* Header */}
      <div className="mb-6 flex items-center gap-2">
        <span className="text-lg">✏️</span>
        <h1 className="text-2xl font-semibold text-gray-900">
          Edit Product
        </h1>
      </div>

      {/* Card */}
      <div className="rounded-xl border bg-white shadow-sm">
        <div className="space-y-8 p-6">

          {/* Product Name */}
          <CustomInput
            label="Product Name"
            name="productName"
            value={form.productName}
            readOnly
          />

          {/* Category (Nested) */}
          <section>
            <CategorySelector />
          </section>

          {/* Barcode / SKU */}
          <CustomInput
            label="Barcode / SKU (Read-only)"
            name="barcode"
            value={form.barcode}
            readOnly
          />

          {/* Unit */}
          <section>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Unit
            </label>

            <div className="flex gap-6 text-sm text-gray-700">
              {["Kg", "Ltr", "Pcs"].map((unit) => (
                <label key={unit} className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={form.unit === unit}
                    readOnly
                    className="accent-primary"
                  />
                  {unit}
                </label>
              ))}
            </div>
          </section>

          {/* Is Loose Item */}
          <section>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Is Loose Item
            </label>

            <div className="flex gap-6 text-sm text-gray-700">
              {["Yes", "No"].map((val) => (
                <label key={val} className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={val === "Yes" && form.isLoose}
                    readOnly
                    className="accent-primary"
                  />
                  {val}
                </label>
              ))}
            </div>
          </section>

          {/* MRP & Sale Price */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <CustomInput
              label="MRP"
              name="mrp"
              value={form.mrp}
              readOnly
            />

            <CustomInput
              label="Sale Price"
              name="salePrice"
              value={form.salePrice}
              readOnly
            />
          </div>

          {/* GST */}
          <section>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              GST %
            </label>

            <div className="flex gap-6 text-sm text-gray-700">
              {["0", "5", "12", "18"].map((gst) => (
                <label key={gst} className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={form.gst === gst}
                    readOnly
                    className="accent-primary"
                  />
                  {gst}%
                </label>
              ))}
            </div>
          </section>

          {/* Low Stock Alert */}
          <CustomInput
            label="Low Stock Alert"
            name="lowStockAlert"
            value={form.lowStockAlert}
            readOnly
          />

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
