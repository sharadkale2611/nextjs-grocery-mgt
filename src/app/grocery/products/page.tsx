"use client";

import { useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Pagination from "@/components/tables/Pagination";
import Link from "next/link";
import Button from "@/components/atoms/Button";
import ProductsTable from "./table";

export default function ProductsPage() {
  const [currentPage, setCurrentPage] = useState(1);

  // Static products data
  const products: {
    id: number;
    name: string;
    category: string;
    mrp: number;
    price: number;
    stock: string;
    status: string;
    stockLevel: "ok" | "low";
  }[] = [
    {
      id: 1,
      name: "Tata Rice",
      category: "Rice",
      mrp: 60,
      price: 58,
      stock: "120kg",
      status: "Active",
      stockLevel: "ok",
    },
    {
      id: 2,
      name: "Amul Milk",
      category: "Dairy",
      mrp: 30,
      price: 30,
      stock: "20pcs",
      status: "Active",
      stockLevel: "ok",
    },
    {
      id: 3,
      name: "Kurkure",
      category: "Snacks",
      mrp: 20,
      price: 18,
      stock: "5pcs",
      status: "Low",
      stockLevel: "low",
    },
  ];

  return (
    <>
      <PageBreadcrumb pageTitle="Products" />

      <div className="space-y-6">
        <ComponentCard
          title="Products"
          desc="Showing 1–10 of 320 products"
          action={
            <div className="flex items-center gap-3">

                {/* Static search box */}
              <input
                type="text"
                placeholder="Search (Name / Barcode)"
                className="rounded-lg border px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                readOnly
              />
              <Link href="/grocery/products/create">
                <Button variant="primary" size="sm">
                  + Add Product
                </Button>
              </Link>

            
            </div>
          }
        >
          <ProductsTable data={products} />

          <Pagination
            currentPage={currentPage}
            totalPages={32}
            onPageChange={setCurrentPage}
          />
        </ComponentCard>
      </div>
    </>
  );
}
