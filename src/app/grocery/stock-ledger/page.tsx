"use client";

import { useState } from "react";

import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Button from "@/components/atoms/Button";

import {
  useGetStockLedgerQuery,
} from "@/features/stockledger";

import { useGetProductsQuery } from "@/features/products";

export default function StockLedgerPage() {

  const [selectedProductId, setSelectedProductId] =
    useState<number | undefined>();

  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const { data: products = [] } =
    useGetProductsQuery();

  const { data: allLedger = [], isLoading } =
    useGetStockLedgerQuery();

  // ===============================
  // FRONTEND FILTERING
  // ===============================
  const ledgerData = allLedger.filter((row) => {

    if (selectedProductId && row.productId !== selectedProductId)
      return false;

    if (dateFrom) {
      const from = new Date(dateFrom);
      if (new Date(row.createdAt) < from) return false;
    }

    if (dateTo) {
      const to = new Date(dateTo);
      to.setHours(23,59,59,999);
      if (new Date(row.createdAt) > to) return false;
    }

    return true;
  });

  const currentStock = ledgerData.reduce(
    (acc, x) =>
      acc + (x.isIncrease ? x.quantity : -x.quantity),
    0
  );

  return (
    <>
      <PageBreadcrumb pageTitle="Stock Ledger" />

      <div className="space-y-6">
        <ComponentCard title="Stock Ledger">

          {/* FILTER */}
          <div className="mb-4 flex flex-wrap items-end gap-6">

            <div className="w-64">
              <label className="mb-1 block text-xs font-medium text-gray-600">
                Product
              </label>

              <select
                className="w-full rounded-lg border px-3 py-2 text-sm"
                onChange={(e)=>
                  setSelectedProductId(
                    e.target.value ? Number(e.target.value) : undefined
                  )
                }
              >
                <option value="">All Products</option>

                {products.map(p=>(
                  <option key={p.productId} value={p.productId}>
                    {p.productName}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-44">
              <label className="mb-1 block text-xs font-medium text-gray-600">
                Date From
              </label>

              <input
                type="date"
                value={dateFrom}
                onChange={(e)=>setDateFrom(e.target.value)}
                className="w-full rounded-lg border px-3 py-2 text-sm"
              />
            </div>

            <div className="w-44">
              <label className="mb-1 block text-xs font-medium text-gray-600">
                Date To
              </label>

              <input
                type="date"
                value={dateTo}
                onChange={(e)=>setDateTo(e.target.value)}
                className="w-full rounded-lg border px-3 py-2 text-sm"
              />
            </div>

          </div>

          {/* TABLE */}
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
                {isLoading && (
                  <tr>
                    <td colSpan={4} className="px-6 py-6">
                      Loading...
                    </td>
                  </tr>
                )}

                {!isLoading && ledgerData.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-6 text-center">
                      No ledger records found
                    </td>
                  </tr>
                )}

                {ledgerData.map((row)=>(
                  <tr key={row.transactionId} className="border-t even:bg-gray-50/50">
                    <td className="px-6 py-4">
                      {new Date(row.createdAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">{row.productName}</td>
                    <td className={`px-6 py-4 font-medium ${row.isIncrease ? "text-green-600":"text-red-600"}`}>
                      {row.isIncrease ? "+" : "-"}{row.quantity}
                    </td>
                    <td className="px-6 py-4">{row.transactionType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* FOOTER */}
          <div className="mt-4 rounded-lg bg-gray-50 px-6 py-4 text-sm text-gray-700">
            <span className="font-medium">Current Stock:</span>{" "}
            <span className="text-gray-900">{currentStock} Kg</span>
          </div>

        </ComponentCard>
      </div>
    </>
  );
}