"use client";

import { useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Pagination from "@/components/tables/Pagination";
import Link from "next/link";
import Button from "@/components/atoms/Button";
import ProductsTable from "./table";

import { productApi } from "@/features/products";


export default function ProductsPage() {

  const [currentPage, setCurrentPage] = useState(1);


  const { data, isLoading, isError } =
    productApi.useGetProductsQuery();



  if (isLoading) return <div>Loading products...</div>;

  if (isError) return <div>Error loading products.</div>;



  const products = data ?? [];


  return (
    <>
      <PageBreadcrumb pageTitle="Products" />

      <div className="space-y-6">

        <ComponentCard
          title="Products"
          desc={`Total ${products.length} products found`}
          action={

            <div className="flex items-center gap-3">

              <input
                type="text"
                placeholder="Search (Name / Barcode)"
                className="rounded-lg border px-3 py-1.5 text-sm"
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
            totalPages={Math.ceil(products.length / 10)}
            onPageChange={setCurrentPage}
          />


        </ComponentCard>

      </div>

    </>
  );
}