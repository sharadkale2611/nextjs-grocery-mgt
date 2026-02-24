"use client";

import Button from "@/components/atoms/Button";
import CustomInput from "@/components/atoms/CustomInput";

import React, { useState } from "react";

import { useRouter } from "next/navigation";

import {
  useCreateCategoryMutation,
} from "@/features/categories/categories.api";

import {
  enqueueSnackbar,
} from "notistack";

import {
  CategoryCreateSchema,
} from "@/features/categories/categories.validation";


export default function CreateCategoryPage() {

  const router = useRouter();

  const [createCategory, { isLoading }]
    = useCreateCategoryMutation();



  // Form state
  const [form, setForm]
    = useState({

      categoryName: "",

      parentCategoryId: "",

      isActive: true,

    });



  // Handle change
  const handleChange =
    (e: React.ChangeEvent<HTMLInputElement>) => {

      const { name, value, type, checked }
        = e.target;


      setForm(prev => ({

        ...prev,

        [name]:
          type === "checkbox"
            ? checked
            : value,

      }));

    };



  // Submit
  const handleSubmit =
    async () => {

      try {

        // validation
        CategoryCreateSchema.parse({

          categoryName:
            form.categoryName,

          parentCategoryId:
            form.parentCategoryId
              ? Number(form.parentCategoryId)
              : null,

          isActive:
            form.isActive,

        });



        await createCategory({

          categoryName:
            form.categoryName,

          parentCategoryId:
            form.parentCategoryId
              ? Number(form.parentCategoryId)
              : null,

          isActive:
            form.isActive,

        }).unwrap();



        enqueueSnackbar(
          "Category created successfully",
          { variant: "success" }
        );



        router.push(
          "/grocery/categories"
        );

      }

      catch (err: any) {

        enqueueSnackbar(

          err?.data?.message
          || err?.message
          || "Failed to create category",

          { variant: "error" }  

        );

      }

    };



  return (

    <div className="mx-auto max-w-4xl px-6 py-8">


      {/* Header */}

      <div className="mb-6 flex items-center gap-2">

        <span className="text-xl text-primary">
          +
        </span>


        <h1 className="text-2xl font-semibold">

          Add Category

        </h1>

      </div>



      {/* Card */}

      <div className="rounded-xl border bg-white shadow-sm">

        <div className="space-y-8 p-6">



          {/* Category Name */}

          <CustomInput

            label="Category Name *"

            name="categoryName"

            placeholder="Enter category name"

            value={form.categoryName}

            onChange={handleChange}

          />



          {/* Parent CategoryId nullable */}
{/* 
          <CustomInput

            label="Parent Category Id (Optional)"

            name="parentCategoryId"

            placeholder="Enter parent category id"

            value={form.parentCategoryId}

            onChange={handleChange}

          /> */}



          {/* Status */}

          <label className="flex items-center gap-2">

            <input

              type="checkbox"

              name="isActive"

              checked={form.isActive}

              onChange={handleChange}

            />

            Active

          </label>



          {/* Actions */}

          <div className="flex gap-4 border-t pt-6">


            <Button

              variant="primary"

              onClick={handleSubmit}

              isLoading={isLoading}

            >

              Save Category

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