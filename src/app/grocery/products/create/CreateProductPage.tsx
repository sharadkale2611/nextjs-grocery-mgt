"use client";

import Button from "@/components/atoms/Button";
import CustomInput from "@/components/atoms/CustomInput";
import CategorySelector from "@/components/molecules/CategorySelector";

import React, { useState } from "react";

import { useRouter } from "next/navigation";

import { enqueueSnackbar } from "notistack";

import { productApi } from "@/features/products";

import { ProductCreateSchema } from "@/features/products/product.validation";



export default function CreateProductPage() {


  const router = useRouter();


  const [createProduct, { isLoading }] =
    productApi.useCreateProductMutation();



  const [form, setForm] = useState({

    productName: "",

    categoryId: 0,

    barcode: "",

    unit: "Pcs",

    isLooseItem: true,

    mrp: "",

    salePrice: "",

    gstPercent: "5",

    lowStockAlert: "",

    isActive: true,

  });




  // =========================
  // HANDLE INPUT CHANGE
  // =========================

  const handleChange =

    (name: string, value: any) => {

      setForm(prev => ({

        ...prev,

        [name]: value,

      }));

    };





  // =========================
  // SAVE PRODUCT
  // =========================

  const handleSubmit = async () => {


    try {


      // ZOD VALIDATION


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




      await createProduct(validated).unwrap();




      enqueueSnackbar(

        "Product created successfully",

        { variant: "success" }

      );



      router.push("/grocery/products");



    }


    catch (err: any) {


      enqueueSnackbar(

        err?.data?.message ||

        err?.message ||

        "Failed to create product",

        { variant: "error" }

      );

    }


  };




  return (

    <div className="mx-auto max-w-4xl px-6 py-8">



      <div className="mb-6 flex items-center gap-2">

        <h1 className="text-2xl font-semibold">

          Add Product

        </h1>

      </div>




      <div className="rounded-xl border bg-white shadow-sm">

        <div className="space-y-8 p-6">



          {/* Product Name */}


          <CustomInput

            label="Product Name *"

            name="productName"

            value={form.productName}

            onChange={(e: any) =>

              handleChange(

                "productName",

                e.target.value

              )

            }

          />




          {/* Category */}


          <CategorySelector

            value={form.categoryId}

            onChange={(id: number) =>

              handleChange("categoryId", id)

            }

          />





          {/* Barcode */}


          <CustomInput

            label="Barcode"

            name="barcode"

            value={form.barcode}

            onChange={(e: any) =>

              handleChange(

                "barcode",

                e.target.value

              )

            }

          />





          {/* Unit */}


          <div>

            <label>Unit</label>

            <div className="flex gap-4">


              {["Kg", "Ltr", "Pcs"].map(unit => (

                <label key={unit}>

                  <input

                    type="radio"

                    checked={form.unit === unit}

                    onChange={() =>

                      handleChange(

                        "unit",

                        unit

                      )

                    }

                  />

                  {unit}

                </label>

              ))}


            </div>

          </div>





          {/* Loose */}


          <div>

            <label>Loose Item</label>

            <input

              type="checkbox"

              checked={form.isLooseItem}

              onChange={(e) =>

                handleChange(

                  "isLooseItem",

                  e.target.checked

                )

              }

            />

          </div>




          {/* MRP */}


          <CustomInput

            label="MRP"

            name="mrp"

            value={form.mrp}

            onChange={(e: any) =>

              handleChange(

                "mrp",

                e.target.value

              )

            }

          />




          {/* SalePrice */}


          <CustomInput

            label="Sale Price"

            name="salePrice"

            value={form.salePrice}

            onChange={(e: any) =>

              handleChange(

                "salePrice",

                e.target.value

              )

            }

          />




          {/* GST */}


          <CustomInput

            label="GST"

            name="gstPercent"

            value={form.gstPercent}

            onChange={(e: any) =>

              handleChange(

                "gstPercent",

                e.target.value

              )

            }

          />





          {/* LowStock */}


          <CustomInput

            label="Low Stock Alert"

            name="lowStockAlert"

            value={form.lowStockAlert}

            onChange={(e: any) =>

              handleChange(

                "lowStockAlert",

                e.target.value

              )

            }

          />




          {/* Status */}


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




          {/* Buttons */}


          <div className="flex gap-4 pt-6 border-t">


            <Button

              variant="primary"

              onClick={handleSubmit}

              isLoading={isLoading}

            >

              Save Product

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