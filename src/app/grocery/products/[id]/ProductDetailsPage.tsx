"use client";

import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";

type PreviewImage = {
  preview: string;
};


function ImageCard({ img }: { img: string }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200">
      {/* Image */}
      <Image
        src={img}
        alt="product"
        width={300}
        height={200}
        className="h-40 w-full object-cover"
      />

      {/* Action button */}
      <div className="absolute right-2 top-2" ref={menuRef}>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/50 text-black hover:bg-black/20"
          aria-label="Image actions"
        >
          ⋮
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 z-20 mt-2 min-w-[160px] rounded-lg border bg-white shadow-lg">
            <button
              className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              ⭐ Set as Primary
            </button>

            <button
              className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              🗑️ Remove Image
            </button>
          </div>
        )}
      </div>

      {/* Optional primary badge */}
      {/* 
      <div className="absolute left-2 top-2 rounded bg-yellow-400 px-2 py-0.5 text-xs font-semibold text-black">
        Primary
      </div>
      */}
    </div>
  );
}

export default function ProductDetailsPage() {
  const router = useRouter();
  const params = useParams();

  // Static product data
  const product = {
    id: params.id,
    name: "Tata Rice 25kg",
    category: "Rice & Grains",
    grade: "Premium",
    stock: "120 kg",
    status: "Active",
    price: 58,
  };

  // Static images
  const [images] = useState<string[]>([
    "/placeholder-product.png",
    "/placeholder-product.png",
  ]);

  const [selectedImages, setSelectedImages] = useState<PreviewImage[]>([]);
  const MAX_IMAGES = 4;
  const canUploadMore = images.length < MAX_IMAGES;

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Product Details</h1>

        <div className="flex gap-3">
          <button
            onClick={() => router.push("/grocery/products")}
            className="rounded border px-4 py-2 text-sm hover:bg-gray-100"
          >
            ← Product List
          </button>

          <button
            onClick={() => router.push(`/grocery/products/edit/${product.id}`)}
            className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
          >
            ✏️ Edit Product
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* LEFT: INFO */}
        <div className="rounded-lg border bg-white p-6">
          <InfoRow label="Product Name" value={product.name} />
          <InfoRow label="Category" value={product.category} />
          <InfoRow label="Grade" value={product.grade} />
          <InfoRow label="Stock" value={product.stock} />
          <InfoRow label="Price" value={`₹ ${product.price}`} />
          <InfoRow label="Status" value={product.status} badge />
        </div>

        {/* RIGHT: IMAGES */}
        <div className="rounded-lg border bg-white p-6">
          <h3 className="mb-3 text-sm font-semibold text-gray-700">
            Product Images
          </h3>

          {/* Existing Images */}
{images.length > 0 ? (
  <div className="grid grid-cols-2 gap-4 mb-4">
    {images.map((img, index) => (
      <ImageCard
        key={index}
        img={img}
      />
    ))}
  </div>
) : (
  <p className="text-sm text-gray-500 mb-4">
    No images uploaded.
  </p>
)}


          {/* Upload Section */}
          {canUploadMore ? (
            <div className="border-t pt-4">
              <label
                className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 text-center hover:border-blue-500 hover:bg-blue-50 transition"
              >
                <svg
                  className="mb-2 h-8 w-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16V4a1 1 0 011-1h8a1 1 0 011 1v12M7 16l-4 4m4-4l4 4m4-4l4 4"
                  />
                </svg>

                <p className="text-sm font-medium text-gray-700">
                  Click to upload or drag & drop
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG, JPEG (Max 1 image at a time)
                </p>

                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    if (!e.target.files?.[0]) return;
                    setSelectedImages([
                      {
                        preview: URL.createObjectURL(e.target.files[0]),
                      },
                    ]);
                  }}
                />
              </label>

              {/* Preview */}
              {selectedImages.length > 0 && (
                <>
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    {selectedImages.map((img, index) => (
                      <div
                        key={index}
                        className="relative h-24 overflow-hidden rounded border"
                      >
                        <Image
                          src={img.preview}
                          alt="preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>

                  <button
                    className="mt-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                  >
                    Upload Image
                  </button>
                </>
              )}
            </div>
          ) : (
            <p className="mt-3 text-sm text-red-500">
              Maximum of {MAX_IMAGES} images allowed.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ======================
   INFO ROW
====================== */
function InfoRow({
  label,
  value,
  badge,
}: {
  label: string;
  value: string | number;
  badge?: boolean;
}) {
  return (
    <div className="flex justify-between border-b py-4">
      <span className="text-gray-500">{label}</span>

      {badge ? (
        <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-700">
          {value}
        </span>
      ) : (
        <span className="font-medium">{value}</span>
      )}
    </div>
  );
}
