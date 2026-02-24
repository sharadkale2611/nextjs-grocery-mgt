"use client";

import Button from "@/components/atoms/Button";
import Icon from "@/components/atoms/Icon";
import Link from "next/link";

import { productApi, Product } from "@/features/products";

import { useState } from "react";

import { enqueueSnackbar, closeSnackbar } from "notistack";



type Props = {

  data: Product[];

};



const ProductsTable = ({ data }: Props) => {



  const [deleteProduct] =
    productApi.useDeleteProductMutation();


  const [deletingId, setDeletingId] =
    useState<number | null>(null);




  const handleDelete = (productId: number) => {


    enqueueSnackbar(

      "Are you sure you want to delete this product?",

      {

        variant: "warning",

        persist: true,

        action: (snackbarId) => (

          <div className="flex gap-2">

            <Button

              size="xs"

              variant="danger"

              isLoading={deletingId === productId}

              onClick={async () => {

                try {

                  setDeletingId(productId);


                  await deleteProduct(productId).unwrap();


                  enqueueSnackbar(

                    "Product deleted successfully",

                    { variant: "success" }

                  );

                }

                catch (err: any) {

                  enqueueSnackbar(

                    err?.data?.message ||

                    "Failed to delete product",

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

              onClick={() => closeSnackbar(snackbarId)}

            >

              Cancel

            </Button>


          </div>

        ),

      }

    );

  };



  return (


    <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">

      <table className="min-w-full text-sm text-left">

        <thead className="bg-gray-100 text-xs uppercase">

          <tr>

            <th className="px-6 py-3">Name</th>

            <th className="px-6 py-3">Category</th>

            <th className="px-6 py-3">MRP</th>

            <th className="px-6 py-3">Sale Price</th>

            <th className="px-6 py-3">GST</th>

            <th className="px-6 py-3">Status</th>

            <th className="px-6 py-3 text-center">

              Action

            </th>

          </tr>

        </thead>



        <tbody>

          {data.map((product, index) => (

            <tr
              key={product.productId}
              className={`border-t ${index % 2 === 0
                ? "bg-white"
                : "bg-gray-50"}`}
            >



              <td className="px-6 py-4">

                <Link
                  href={`/grocery/products/${product.productId}`}
                >

                  {product.productName}

                </Link>

              </td>



              <td className="px-6 py-4">

                {product.categoryName}

              </td>



              <td className="px-6 py-4">

                ₹{product.mrp}

              </td>



              <td className="px-6 py-4">

                ₹{product.salePrice}

              </td>



              <td className="px-6 py-4">

                {product.gstPercent}%

              </td>



              <td className="px-6 py-4">

                <span

                  className={`px-2 py-1 text-xs rounded

                    ${product.isActive

                      ? "bg-green-100 text-green-700"

                      : "bg-red-100 text-red-700"

                    }`}

                >

                  {product.isActive

                    ? "Active"

                    : "Inactive"}

                </span>

              </td>



              <td className="px-6 py-4 flex gap-2 justify-center">


                <Link
                  href={`/grocery/products/edit/${product.productId}`}
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
                  disabled={
                    deletingId === product.productId
                  }
                  onClick={() =>
                    handleDelete(product.productId)
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


export default ProductsTable;