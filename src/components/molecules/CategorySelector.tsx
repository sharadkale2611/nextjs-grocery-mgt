"use client";

import React from "react";

import {
  useGetCategoriesQuery,
} from "@/features/categories";



type Props = {

  value: number;

  onChange: (categoryId: number) => void;

};



export default function CategorySelector({

  value,

  onChange,

}: Props) {

  const {

    data: categories,

    isLoading,

    isError,

  } = useGetCategoriesQuery();



  return (

    <div>

      <label className="mb-2 block text-sm font-medium text-gray-700">

        Category *

      </label>



      <select

        value={value}

        onChange={(e) =>

          onChange(Number(e.target.value))

        }

        className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"

        disabled={isLoading || isError}

      >

        <option value="">

          {isLoading

            ? "Loading..."

            : "Select Category"}

        </option>



        {categories?.map(category => (

          <option

            key={category.categoryId}

            value={category.categoryId}

          >

            {category.categoryName}

          </option>

        ))}

      </select>



      {isError && (

        <p className="text-red-500 text-sm mt-1">

          Failed to load categories

        </p>

      )}

    </div>

  );

}