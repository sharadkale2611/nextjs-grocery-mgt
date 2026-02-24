"use client";

import Button from "@/components/atoms/Button";
import CustomInput from "@/components/atoms/CustomInput";
import CategorySelector from "@/components/molecules/CategorySelector";

import React, { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { enqueueSnackbar } from "notistack";

import { productApi } from "@/features/products";

import { ProductCreateSchema } from "@/features/products/product.validation";



export default function EditProductPage() {

  const params = useParams();

  const router = useRouter();

  const productId = Number(params.id);



  // API hooks

  const { data, isLoading } =
    productApi.useGetProductByIdQuery(productId);




  const [updateProduct, { isLoading: isUpdating }] =
    productApi.useUpdateProductMutation();




  const [form, setForm] = useState({

    productName: "",

    categoryId: 0,

    barcode: "",

    unit: "Pcs",

    isLooseItem: false,

    mrp: "",

    salePrice: "",

    gstPercent: "0",

    lowStockAlert: "",

    isActive: true,

  });



  // =========================
  // Prefill form
  // =========================

  useEffect(() => {

    if (data) {

      setForm({

        productName: data.productName,

        categoryId: data.categoryId,

        barcode: data.barcode || "",

        unit: data.unit,

        isLooseItem: data.isLooseItem,

        mrp: String(data.mrp),

        salePrice: String(data.salePrice),

        gstPercent: String(data.gstPercent),

        lowStockAlert:
          data.lowStockAlert
            ? String(data.lowStockAlert)
            : "",

        isActive: data.isActive,

      });

    }

  }, [data]);




  const handleChange =
    (name: string, value: any) => {

      setForm(prev => ({
        ...prev,
        [name]: value,
      }));

    };




  // =========================
  // UPDATE
  // =========================

  const handleSubmit = async () => {


    try {

      const validated =
        ProductCreateSchema.parse({

          categoryId: form.categoryId,

          productName: form.productName,

          barcode: form.barcode,

          unit: form.unit,

          isLooseItem: form.isLooseItem,

          mrp: Number(form.mrp),

          salePrice: Number(form.salePrice),

          gstPercent: Number(form.gstPercent),

          lowStockAlert:
            form.lowStockAlert
              ? Number(form.lowStockAlert)
              : undefined,

          isActive: form.isActive,

        });




      await updateProduct({

        productId,

        body: {

          productId,

          ...validated,

        },

      }).unwrap();




      enqueueSnackbar(
        "Product updated successfully",
        { variant: "success" }
      );



      router.push("/grocery/products");

    }


    catch (err: any) {

      enqueueSnackbar(
        err?.data?.message ||
        err?.message ||
        "Update failed",
        { variant: "error" }
      );

    }

  };




  if (isLoading)
    return <div>Loading...</div>;




  return (

    <div className="mx-auto max-w-4xl px-6 py-8">

      <h1 className="text-2xl font-semibold mb-6">

        Edit Product

      </h1>




      <div className="rounded-xl border bg-white shadow-sm">

        <div className="space-y-6 p-6">




          <CustomInput

            label="Product Name"

            name="productName"

            value={form.productName}

            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(
                "productName",
                e.target.value
              )
            }

          />




          <CategorySelector

            value={form.categoryId}

            onChange={(id) =>
              handleChange("categoryId", id)
            }

          />




          <CustomInput

            label="Barcode"

            name="barcode"

            value={form.barcode}

            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(
                "barcode",
                e.target.value
              )
            }

          />




          <CustomInput

            label="MRP"

            name="mrp"

            value={form.mrp}

            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(
                "mrp",
                e.target.value
              )
            }

          />




          <CustomInput

            label="Sale Price"

            name="salePrice"

            value={form.salePrice}

            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(
                "salePrice",
                e.target.value
              )
            }

          />




          <CustomInput

            label="GST"

            name="gstPercent"

            value={form.gstPercent}

            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(
                "gstPercent",
                e.target.value
              )
            }

          />




          <CustomInput

            label="Low Stock Alert"

            name="lowStockAlert"

            value={form.lowStockAlert}

            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(
                "lowStockAlert",
                e.target.value
              )
            }

          />




          <label>

            <input

              type="checkbox"

              checked={form.isActive}

              onChange={(e) =>
                handleChange(
                  "isActive",
                  e.target.checked
                )
              }

            />

            Active

          </label>




          <div className="flex gap-4 pt-6 border-t">


            <Button

              variant="primary"

              isLoading={isUpdating}

              onClick={handleSubmit}

            >

              Update

            </Button>



            <Button

              variant="default"

              onClick={() => router.back()}

            >

              Cancel

            </Button>


          </div>



        </div>

      </div>

    </div>

  );

}