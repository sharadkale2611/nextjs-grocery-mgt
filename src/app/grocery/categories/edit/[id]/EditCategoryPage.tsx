"use client";

import Button from "@/components/atoms/Button";
import CustomInput from "@/components/atoms/CustomInput";

import React, {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import {

  useGetCategoryByIdQuery,

  useUpdateCategoryMutation,

} from "@/features/categories";

import {
  enqueueSnackbar,
} from "notistack";

import {
  CategoryUpdateSchema,
} from "@/features/categories/categories.validation";


export default function EditCategoryPage() {

  const params = useParams();

  const router = useRouter();


  const categoryId =
    Number(params.id);



  // GET category
  const {

    data,

    isLoading,

    isError,

  }
    = useGetCategoryByIdQuery(categoryId);



  // UPDATE mutation
  const [

    updateCategory,

    { isLoading: isUpdating }

  ]
    = useUpdateCategoryMutation();



  // Form state
  const [form, setForm]
    = useState({

      categoryName: "",

      parentCategoryId: "" as string | null,

      isActive: true,

      productCount: 0

    });



  // Prefill form
  useEffect(() => {

    if (data) {

      setForm({

        categoryName:
          data.categoryName,

        parentCategoryId:
          data.parentCategoryId
            ?.toString()
          || "",

        isActive:
          data.isActive,

        productCount: data.productCount

      });

    }

  }, [data]);



  // change handler
  const handleChange =
    (e: React.ChangeEvent<HTMLInputElement>) => {

      const {

        name,

        value,

        type,

        checked

      } = e.target;


      setForm(prev => ({

        ...prev,

        [name]:
          type === "checkbox"
            ? checked
            : value,

      }));

    };



  // submit
  const handleUpdate =
    async () => {

      try {

        CategoryUpdateSchema.parse({

          categoryName:
            form.categoryName,

          parentCategoryId:
            form.parentCategoryId
              ? Number(form.parentCategoryId)
              : null,

          isActive:
            form.isActive,

        });



        await updateCategory({

          categoryId,

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

          "Category updated successfully",

          { variant: "success" }

        );



        router.push(
          "/grocery/categories"
        );

      }

      catch (err: any) {

        enqueueSnackbar(

          err?.data?.message
          || "Update failed",

          { variant: "error" }

        );

      }

    };



  if (isLoading)
    return <div>Loading...</div>;


  if (isError)
    return <div>Error loading category</div>;



  return (

    <div className="mx-auto max-w-4xl px-6 py-8">


      {/* Header */}

      <div className="mb-6 flex gap-2">

        <span>✏️</span>

        <h1 className="text-2xl font-semibold">

          Edit Category

        </h1>

      </div>



      {/* Card */}

      <div className="rounded-xl border bg-white shadow-sm">

        <div className="space-y-8 p-6">



          {/* Name */}

          <CustomInput

            label="Category Name"

            name="categoryName"

            value={form.categoryName}

            onChange={handleChange}

          />



          {/* Parent Id */}
          {/* 
          <CustomInput

            label="Parent Category Id"

            name="parentCategoryId"

            value={form.parentCategoryId}

            onChange={handleChange}

          /> */}



          {/* Status */}

          <label className="flex gap-2">

            <input

              type="checkbox"

              name="isActive"

              checked={form.isActive}

              onChange={handleChange}

            />

            Active

          </label>
          {form.productCount > 0 && (

            <section className="flex items-start gap-3 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">

              <span>⚠️</span>

              <span>

                Products under this category:

                <strong>
                  {form.productCount}
                </strong>

              </span>

            </section>

          )}



          {/* Actions */}

          <div className="flex gap-4 border-t pt-6">


            <Button

              variant="primary"

              onClick={handleUpdate}

              isLoading={isUpdating}

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