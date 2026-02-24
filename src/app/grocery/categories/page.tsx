"use client";

import { useState } from "react";

import ComponentCard
  from "@/components/common/ComponentCard";

import PageBreadcrumb
  from "@/components/common/PageBreadCrumb";

import Pagination
  from "@/components/tables/Pagination";

import Link from "next/link";

import Button
  from "@/components/atoms/Button";

import CategoriesTable
  from "./table";


import {

  useGetCategoriesQuery,

} from "@/features/categories";


export default function CategoriesPage() {

  const [currentPage, setCurrentPage]
    = useState(1);


  const {

    data,

    isLoading,

    isError,

  }
    = useGetCategoriesQuery();



  if (isLoading)
    return <div>Loading...</div>;


  if (isError)
    return <div>Error loading categories</div>;



  const categories =
    (data ?? []).map(cat => ({

      categoryId:
        cat.categoryId,

      categoryName:
        cat.categoryName,


      parentCategoryName:
        "-",


      isActive:
        cat.isActive,

    }));



  return (

    <>

      <PageBreadcrumb
        pageTitle="Categories"
      />


      <div className="space-y-6">


        <ComponentCard

          title="Categories"

          desc={`Total ${categories.length} categories found`}


          action={

            <Link
              href="/grocery/categories/create"
            >

              <Button
                variant="primary"
                size="sm"
              >

                + Add Category

              </Button>

            </Link>

          }

        >


          <CategoriesTable
            data={categories}
          />



          <Pagination

            currentPage={currentPage}

            totalPages={
              Math.ceil(categories.length / 10)
            }

            onPageChange={setCurrentPage}

          />


        </ComponentCard>


      </div>

    </>

  );

}