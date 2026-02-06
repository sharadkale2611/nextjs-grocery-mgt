"use client";

import { useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Button from "@/components/atoms/Button";

export default function StockLedgerPage() {
  const [product] = useState("Tata Rice");
  const [dateFrom] = useState("");
  const [dateTo] = useState("");

  // Static ledger data
  const ledgerData = [
    {
      dateTime: "02 Feb 10:30 AM",
      product: "Tata Rice",
      qty: "+50",
      type: "Opening Stock",
    },
    {
      dateTime: "02 Feb 12:10 PM",
      product: "Tata Rice",
      qty: "-2",
      type: "Sale",
    },
    {
      dateTime: "02 Feb 06:40 PM",
      product: "Tata Rice",
      qty: "-1",
      type: "Sale",
    },
    {
      dateTime: "03 Feb 09:00 AM",
      product: "Tata Rice",
      qty: "+10",
      type: "Adjustment",
    },
  ];

  return (
    <>
      <PageBreadcrumb pageTitle="Stock Ledger" />

      <div className="space-y-6">
        <ComponentCard title="Stock Ledger">

          {/* Filters */}
          <div className="mb-4 flex flex-wrap items-end gap-6">
  {/* Product */}
  <div className="w-64">
    <label className="mb-1 block text-xs font-medium text-gray-600">
      Product
    </label>
    <select className="w-full rounded-lg border px-3 py-2 text-sm">
      <option>{product}</option>
      <option>Amul Milk</option>
      <option>Kurkure</option>
    </select>
  </div>

  {/* Date From */}
  <div className="w-44">
    <label className="mb-1 block text-xs font-medium text-gray-600">
      Date From
    </label>
    <input
      type="date"
      className="w-full rounded-lg border px-3 py-2 text-sm"
      value={dateFrom}
    />
  </div>

  {/* Date To */}
  <div className="w-44">
    <label className="mb-1 block text-xs font-medium text-gray-600">
      Date To
    </label>
    <input
      type="date"
      className="w-full rounded-lg border px-3 py-2 text-sm"
      value={dateTo}
    />
  </div>

  {/* Filter Button */}
  <div>
    <Button variant="primary" size="sm" className="px-8">
      Filter
    </Button>
  </div>
</div>

          {/* Table */}
          <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
            <table className="min-w-full text-sm text-left text-gray-600">
              <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                <tr>
                  <th className="px-6 py-3">Date & Time</th>
                  <th className="px-6 py-3">Product</th>
                  <th className="px-6 py-3">Qty</th>
                  <th className="px-6 py-3">Type</th>
                </tr>
              </thead>

              <tbody>
                {ledgerData.map((row, index) => (
                  <tr
                    key={index}
                    className={`border-t ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                    }`}
                  >
                    <td className="px-6 py-4">{row.dateTime}</td>
                    <td className="px-6 py-4">{row.product}</td>
                    <td
                      className={`px-6 py-4 font-medium ${
                        row.qty.startsWith("+")
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {row.qty}
                    </td>
                    <td className="px-6 py-4">{row.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="mt-4 rounded-lg bg-gray-50 px-6 py-4 text-sm text-gray-700">
            <span className="font-medium">Current Stock:</span>{" "}
            <span className="text-gray-900">57 Kg</span>
          </div>
        </ComponentCard>
      </div>
    </>
  );
}
