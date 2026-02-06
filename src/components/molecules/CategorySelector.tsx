"use client";

import React from "react";

export default function CategorySelector() {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        Category *
      </label>

      <select
        className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        disabled
      >
        {/* Parent */}
        <option>Grocery</option>

        {/* Children */}
        <option className="pl-4">↳ Rice & Grains</option>
        <option className="pl-4">↳ Snacks</option>
        <option className="pl-4">↳ Dairy</option>
        <option className="pl-4">↳ Beverages</option>

        {/* Another Parent (example) */}
        <option>Electronics</option>
        <option className="pl-4">↳ Mobile Accessories</option>
        <option className="pl-4">↳ Home Appliances</option>
      </select>
    </div>
  );
}
