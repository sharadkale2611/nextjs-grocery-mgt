"use client";

import { useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Pagination from "@/components/tables/Pagination";
import Link from "next/link";
import Button from "@/components/atoms/Button";
import CategoriesTable from "./table";

export default function CategoriesPage() {
  const [currentPage, setCurrentPage] = useState(1);

  // Static categories data
  const categories = [
    {
      id: 1,
      categoryName: "Grocery",
      parentCategory: "-",
      status: "Active",
    },
    {
      id: 2,
      categoryName: "Rice & Grains",
      parentCategory: "Grocery",
      status: "Active",
    },
    {
      id: 3,
      categoryName: "Snacks",
      parentCategory: "Grocery",
      status: "Active",
    },
    {
      id: 4,
      categoryName: "Dairy",
      parentCategory: "Grocery",
      status: "Active",
    },
    {
      id: 5,
      categoryName: "Beverages",
      parentCategory: "Grocery",
      status: "Active",
    },
  ];

  return (
    <>
      <PageBreadcrumb pageTitle="Categories" />

      <div className="space-y-6">
        <ComponentCard
          title="Categories"
          desc={`Showing 1–${categories.length} of 18 categories`}
          action={
            <div className="flex items-center gap-3">

                {/* Static search box */}
              <input
                type="text"
                placeholder="Search Category"
                className="rounded-lg border px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                readOnly
              />

              <Link href="/grocery/categories/create">
                <Button variant="primary" size="sm">
                  + Add Category
                </Button>
              </Link>

            
            </div>
          }
        >
          <CategoriesTable data={categories} />

          <Pagination
            currentPage={currentPage}
            totalPages={2}
            onPageChange={setCurrentPage}
          />
        </ComponentCard>
      </div>
    </>
  );
}
