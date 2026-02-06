"use client";

import Button from "@/components/atoms/Button";
import CustomInput from "@/components/atoms/CustomInput";
import CategorySelector from "@/components/molecules/CategorySelector";
import React, { useState } from "react";

export default function CreateProductPage() {
  // Static UI state only
  const [form] = useState({
    productName: "",
    category: "",
    barcode: "",
    unit: "Pcs",
    isLoose: true,
    mrp: "",
    salePrice: "",
    gst: "5",
    lowStockAlert: "",
    isActive: true,
  });

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      {/* Header */}
      <div className="mb-6 flex items-center gap-2">
        <span className="text-xl text-primary">+</span>
        <h1 className="text-2xl font-semibold text-gray-900">
          Add Product
        </h1>
      </div>

      {/* Card */}
      <div className="rounded-xl border bg-white shadow-sm">
        <div className="space-y-8 p-6">

          {/* Product Name */}
          <CustomInput
            label="Product Name *"
            name="productName"
            placeholder="Enter product name"
            value={form.productName}
          />

          {/* Category Selector */}
          <section>
           <CategorySelector />
          </section>

          {/* Barcode / SKU */}     
          <section>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Barcode / SKU *
            </label>

            <div className="flex gap-3">
              <input
                type="text"
                className="flex-1 rounded-lg border px-3 py-2 text-sm"
                placeholder="Enter barcode"
                readOnly
              />

              <Button variant="default">
                Scan
              </Button>
            </div>
          </section>

          {/* Unit */}
          <section>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Unit *
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

          {/* Loose Item */}
          <section>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Is Loose Item *
            </label>

            <div className="flex gap-6 text-sm text-gray-700">
              {["Yes", "No"].map((val) => (
                <label key={val} className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={val === "Yes"}
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
              label="MRP *"
              name="mrp"
              placeholder="0.00"
              value={form.mrp}
            />

            <CustomInput
              label="Sale Price *"
              name="salePrice"
              placeholder="0.00"
              value={form.salePrice}
            />
          </div>

          {/* GST */}
          <section>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              GST % *
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
            label="Low Stock Alert *"
            name="lowStockAlert"
            placeholder="Enter quantity"
            value={form.lowStockAlert}
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
              Save Product
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
