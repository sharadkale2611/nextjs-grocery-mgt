"use client";

import Button from "@/components/atoms/Button";
import Icon from "@/components/atoms/Icon";
import Link from "next/link";

import { useState } from "react";

import {
  useDeleteCategoryMutation,
} from "@/features/categories";

import {
  closeSnackbar,
  enqueueSnackbar,
} from "notistack";


type Props = {

  data: {

    categoryId: number;

    categoryName: string;

    parentCategoryName?: string;

    isActive: boolean;

  }[];

};


const CategoriesTable = ({ data }: Props) => {

  const [deleteCategory] =
    useDeleteCategoryMutation();

  const [deletingId, setDeletingId]
    = useState<number | null>(null);



  const handleDelete =
    (categoryId: number) => {

      enqueueSnackbar(
        "Are you sure you want to delete this category?",
        {

          variant: "warning",

          persist: true,

          action: (snackbarId) => (

            <div className="flex gap-2">

              <Button

                size="xs"

                variant="danger"

                isLoading={deletingId === categoryId}

                onClick={async () => {

                  try {

                    setDeletingId(categoryId);

                    await deleteCategory(categoryId)
                      .unwrap();


                    enqueueSnackbar(
                      "Category deleted successfully",
                      { variant: "success" }
                    );

                  }

                  catch (err: any) {

                    enqueueSnackbar(

                      err?.data?.message
                      || "Delete failed",

                      { variant: "error" }

                    );

                  }

                  finally {

                    setDeletingId(null);

                    closeSnackbar(snackbarId);

                  }

                }}

              >
                Delete
              </Button>



              <Button

                size="xs"

                variant="default"

                onClick={() =>
                  closeSnackbar(snackbarId)
                }

              >
                Cancel
              </Button>


            </div>

          ),

        });

    };



  return (

    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">


      <table className="min-w-full text-sm text-left text-gray-600">


        <thead className="bg-gray-100 text-xs uppercase text-gray-700">

          <tr>

            <th className="px-6 py-3">
              Category Name
            </th>

{/* 
            <th className="px-6 py-3">
              Parent Category
            </th> */}


            <th className="px-6 py-3">
              Status
            </th>


            <th className="px-6 py-3 text-center">
              Action
            </th>


          </tr>

        </thead>



        <tbody>

          {data.map((category, index) => (

            <tr

              key={category.categoryId}

              className={`border-t ${
                index % 2 === 0
                  ? "bg-white"
                  : "bg-gray-50/50"
              }`}

            >

              <td className="px-6 py-4 font-medium">

                {category.categoryName}

              </td>


{/* 
              <td className="px-6 py-4">

                {category.parentCategoryName
                  || "-"}

              </td>
 */}


              <td className="px-6 py-4">

                <span

                  className={`px-2 py-1 rounded text-xs font-medium ${
                    category.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}

                >

                  {category.isActive
                    ? "Active"
                    : "Inactive"}

                </span>

              </td>



              <td className="px-6 py-4 text-center flex gap-2 justify-center">


                <Link

                  href={`/grocery/categories/edit/${category.categoryId}`}

                >

                  <Button

                    size="xs"

                    variant="primary"

                    outline

                    startIcon={
                      <Icon
                        name="PencilIcon"
                        className="w-5 h-5"
                      />
                    }

                  >

                    Edit

                  </Button>

                </Link>



                <Button

                  size="xs"

                  variant="danger"

                  outline

                  onClick={() =>
                    handleDelete(category.categoryId)
                  }

                  disabled={
                    deletingId === category.categoryId
                  }

                  startIcon={
                    <Icon
                      name="TrashBinIcon"
                      className="w-5 h-5"
                    />
                  }

                >

                  Delete

                </Button>


              </td>


            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

};


export default CategoriesTable;