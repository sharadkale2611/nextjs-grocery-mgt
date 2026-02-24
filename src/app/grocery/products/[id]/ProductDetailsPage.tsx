"use client";

import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";

import {
  useGetProductByIdQuery,
} from "@/features/products";

import {
  useGetProductImagesQuery,
  useUploadProductImageMutation,
  useDeleteProductImageMutation,
} from "@/features/productImages";

import { enqueueSnackbar } from "notistack";


type PreviewImage = {
  file: File;
  preview: string;
};




/* ======================
   IMAGE CARD
====================== */

function ImageCard({
  image,
  onDelete,
}: any) {

  const [open, setOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);


  useEffect(() => {

    function handleClickOutside(e: MouseEvent) {

      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }

    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

  }, []);



  return (

    <div className="relative overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200">




      <Image
        src={image.imageUrl}
        alt=""
        width={300}
        height={200}
        className="h-40 w-full object-cover"
      />




      {/* Primary badge */}

      {image.isPrimary && (

        <div className="absolute left-2 top-2 rounded bg-yellow-400 px-2 py-0.5 text-xs font-semibold">

          Primary

        </div>

      )}




      {/* Menu */}

      <div
        className="absolute right-2 top-2"
        ref={menuRef}
      >

        <button
          onClick={() =>
            setOpen((prev) => !prev)
          }
          className="h-8 w-8 rounded-full bg-white/70"
        >

          ⋮

        </button>




        {open && (

          <div className="absolute right-0 mt-2 rounded-lg border bg-white shadow-lg">

            <button
              onClick={() =>
                onDelete(
                  image.productImageId
                )
              }
              className="px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >

              🗑 Remove Image

            </button>

          </div>

        )}

      </div>

    </div>

  );

}




/* ======================
   MAIN PAGE
====================== */

export default function ProductDetailsPage() {


  const router = useRouter();

  const params = useParams();

  const productId =
    Number(params.id);




  // ======================
  // API
  // ======================

  const {
    data: product,
    isLoading,
  } =
    useGetProductByIdQuery(productId);




  const {
    data: images = [],
  } =
    useGetProductImagesQuery(productId);




  const [
    uploadImage,
    { isLoading: uploading },
  ] =
    useUploadProductImageMutation();




  const [
    deleteImage,
  ] =
    useDeleteProductImageMutation();




  // ======================
  // STATE
  // ======================

  const [
    selectedImages,
    setSelectedImages,
  ] =
    useState<PreviewImage[]>([]);




  const MAX_IMAGES = 4;

  const canUploadMore =
    images.length < MAX_IMAGES;




  // ======================
  // UPLOAD
  // ======================

  const handleUpload =
    async () => {


      if (!selectedImages.length)
        return;




      try {

        await uploadImage({

          productId,

          image:
            selectedImages[0].file,

          isPrimary:
            images.length === 0,

        }).unwrap();




        enqueueSnackbar(
          "Image uploaded",
          { variant: "success" }
        );




        setSelectedImages([]);

      }


      catch {

        enqueueSnackbar(
          "Upload failed",
          { variant: "error" }
        );

      }


    };




  // ======================
  // DELETE
  // ======================

  const handleDelete =
    async (id: number) => {


      await deleteImage(id);




      enqueueSnackbar(
        "Image deleted",
        { variant: "success" }
      );

    };




  if (isLoading)
    return <div>Loading...</div>;




  if (!product)
    return <div>No product</div>;




  return (

    <div className="mx-auto max-w-6xl px-6 py-8">




      {/* HEADER */}

      <div className="mb-6 flex justify-between">

        <h1 className="text-2xl font-semibold">

          Product Details

        </h1>




        <div className="flex gap-3">

          <button
            onClick={() =>
              router.push(
                "/grocery/products"
              )
            }
            className="border px-4 py-2"
          >

            ← Product List

          </button>




          <button
            onClick={() =>
              router.push(
                `/grocery/products/edit/${productId}`
              )
            }
            className="bg-blue-600 px-4 py-2 text-white"
          >

            ✏ Edit Product

          </button>

        </div>

      </div>




      {/* GRID */}

      <div className="grid md:grid-cols-2 gap-6">




        {/* INFO */}

        <div className="border p-6 rounded-lg">

          <InfoRow
            label="Product Name"
            value={
              product.productName
            }
          />

          <InfoRow
            label="Category"
            value={
              product.categoryName
            }
          />

          <InfoRow
            label="Price"
            value={`₹ ${product.salePrice}`}
          />

          <InfoRow
            label="Status"
            value={
              product.isActive
                ? "Active"
                : "Inactive"
            }
            badge
          />

        </div>




        {/* IMAGES */}

        <div className="border p-6 rounded-lg">

          <h3 className="mb-3">

            Product Images

          </h3>




          {/* EXISTING */}

          {images.length > 0 ? (

            <div className="grid grid-cols-2 gap-4 mb-4">

              {images.map((img) => (

                <ImageCard
                  key={
                    img.productImageId
                  }
                  image={img}
                  onDelete={
                    handleDelete
                  }
                />

              ))}

            </div>

          ) : (

            <p>No images</p>

          )}





          {/* UPLOAD */}

          {canUploadMore && (

            <div className="border-t pt-4">

              <input
                type="file"
                onChange={(e) => {


                  const file =
                    e.target.files?.[0];


                  if (!file) return;




                  setSelectedImages([
                    {

                      file,

                      preview:
                        URL.createObjectURL(
                          file
                        ),

                    },

                  ]);

                }}
              />




              {selectedImages.length >
                0 && (

                <>

                  <Image
                    src={
                      selectedImages[0]
                        .preview
                    }
                    alt=""
                    width={100}
                    height={100}
                  />




                  <button
                    onClick={
                      handleUpload
                    }
                    disabled={
                      uploading
                    }
                    className="bg-blue-600 px-4 py-2 text-white mt-2"
                  >

                    Upload Image

                  </button>

                </>

              )}

            </div>

          )}

        </div>

      </div>

    </div>

  );

}




function InfoRow({

  label,

  value,

  badge,

}: any) {

  return (

    <div className="flex justify-between border-b py-4">

      <span>

        {label}

      </span>




      {badge ? (

        <span className="bg-green-100 px-2 py-1 text-xs">

          {value}

        </span>

      ) : (

        <span>

          {value}

        </span>

      )}

    </div>

  );

}