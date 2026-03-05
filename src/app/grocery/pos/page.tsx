"use client";

import React, { useState } from "react";
import Image from "next/image";

import { productApi } from "@/features/products";
import { useGetCategoriesQuery } from "@/features/categories";

export default function POSPage() {

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [cart, setCart] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");

  const { data: products = [], isLoading } =
    productApi.useGetProductsQuery();

  const { data: categories = [] } =
    useGetCategoriesQuery();

  // ✅ FILTER BY CATEGORY + PRODUCTNAME + BARCODE
  const filteredProducts = products.filter((p: any) => {

    const matchCategory =
      selectedCategory === "All" ||
      p.categoryName === selectedCategory;

    const matchSearch =
      !searchText ||
      p.productName
        ?.toLowerCase()
        .includes(searchText.toLowerCase()) ||
      p.barcode?.toString().includes(searchText);

    return matchCategory && matchSearch;
  });

  // ================= CART FUNCTIONS =================

  const addToCart = (product: any) => {
    setCart((prev) => {
      const exist = prev.find(
        (p) => p.productId === product.productId
      );

      if (exist) {
        return prev.map((p) =>
          p.productId === product.productId
            ? { ...p, qty: p.qty + 1 }
            : p
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  const increaseQty = (id: number) => {
    setCart((prev) =>
      prev.map((p) =>
        p.productId === id
          ? { ...p, qty: p.qty + 1 }
          : p
      )
    );
  };

  const decreaseQty = (id: number) => {
    setCart((prev) =>
      prev
        .map((p) =>
          p.productId === id
            ? { ...p, qty: p.qty - 1 }
            : p
        )
        .filter((p) => p.qty > 0)
    );
  };

  // ✅ REMOVE ITEM (TRASH ICON)
  const removeItem = (id: number) => {
    setCart((prev) =>
      prev.filter((p) => p.productId !== id)
    );
  };

  const getCartItem = (id: number) =>
    cart.find((p) => p.productId === id);

  // ================= BILLING =================

  const subtotal = cart.reduce(
    (sum, item) => sum + item.salePrice * item.qty,
    0
  );

  const gst = subtotal * 0.05;
  const total = subtotal + gst;

  if (isLoading) return <div>Loading POS...</div>;

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">

      {/* ================= CENTER ================= */}
      <div className="flex-1 p-6 overflow-auto">

        {/* SEARCH */}
        <input
          placeholder="Search product / Scan barcode..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full bg-white rounded-xl px-4 py-3 mb-4 outline-none"
        />

        {/* CATEGORY */}
        <div className="flex gap-3 mb-6 flex-wrap">

          <div
            onClick={() => setSelectedCategory("All")}
            className={`px-4 py-2 rounded-xl text-sm cursor-pointer ${
              selectedCategory === "All"
                ? "bg-green-500 text-white"
                : "bg-white"
            }`}
          >
            All
          </div>

          {categories
            ?.filter((c: any) => c.isActive)
            .map((cat: any) => (
              <div
                key={cat.categoryId}
                onClick={() =>
                  setSelectedCategory(cat.categoryName)
                }
                className={`px-4 py-2 rounded-xl text-sm cursor-pointer ${
                  selectedCategory === cat.categoryName
                    ? "bg-green-500 text-white"
                    : "bg-white"
                }`}
              >
                {cat.categoryName}
              </div>
            ))}
        </div>

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-4 gap-6">

          {filteredProducts.map((product: any) => {

            const cartItem =
              getCartItem(product.productId);

            const isActive = !!cartItem;

            return (
              <div
                key={product.productId}
                className={`rounded-2xl shadow-sm p-4 transition ${
                  isActive
                    ? "border-2 border-green-500 bg-green-50"
                    : "bg-white"
                }`}
              >
                <div className="relative w-full h-36">
                  <Image
                    src={
                      product.primaryImageUrl ||
                      "/images/product/product-01.jpg"
                    }
                    alt={product.productName}
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>

                <h3 className="mt-2 font-semibold text-sm">
                  {product.productName}
                </h3>

                <p className="text-xs text-gray-400">
                  {product.categoryName}
                </p>

                <p className="text-green-600 font-bold">
                  ₹{product.salePrice}
                </p>

                <div className="mt-2">

                  {!cartItem ? (
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full bg-green-500 text-white py-2 rounded-xl hover:bg-green-600"
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <div className="flex items-center justify-center gap-4 bg-green-50 border-2 border-green-500 rounded-xl py-2">
                      <button
                        onClick={() =>
                          decreaseQty(product.productId)
                        }
                        className="w-7 h-7 rounded-full bg-green-600 text-white"
                      >
                        −
                      </button>

                      <span className="font-semibold text-green-700">
                        {cartItem.qty}
                      </span>

                      <button
                        onClick={() =>
                          increaseQty(product.productId)
                        }
                        className="w-7 h-7 rounded-full bg-green-600 text-white"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= BILLING PANEL ================= */}
      <div className="w-[360px] bg-gray-100 border-l p-4 flex flex-col h-screen">

        {/* CART LIST */}
        <div className="flex-1 overflow-y-auto space-y-3">

          {cart.map((item:any) => (
            <div
              key={item.productId}
              className="flex items-center gap-3 bg-white rounded-2xl p-3 shadow-sm"
            >
              <div className="relative w-14 h-14 rounded-xl overflow-hidden">
                <Image
                  src={item.primaryImageUrl || "/images/product/placeholder.jpg"}
                  alt={item.productName}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <p className="text-sm font-semibold leading-tight">
                  {item.productName}
                </p>

                <p className="text-xs text-gray-400">
                  ₹{item.salePrice} x{item.qty}
                </p>
              </div>

              {/* PRICE + TRASH */}
              <div className="flex flex-col items-end gap-1">

                <p className="text-green-600 font-bold text-sm">
                  ₹{item.salePrice * item.qty}
                </p>

                <button
                  onClick={() => removeItem(item.productId)}
                  className="text-red-500 hover:text-red-600 text-xs"
                >
                  🗑️
                </button>

              </div>
            </div>
          ))}

          {cart.length === 0 && (
            <p className="text-center text-gray-400 mt-20">
              Cart Empty
            </p>
          )}

        </div>

        {/* TOTAL */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mt-4 space-y-3">

          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Sub Total</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Tax 5%</span>
            <span>₹{gst.toFixed(2)}</span>
          </div>

          <div className="border-t pt-3 flex justify-between font-bold text-lg">
            <span>Total Amount</span>
            <span className="text-green-600">
              ₹{total.toFixed(2)}
            </span>
          </div>

        </div>

        {/* PAYMENT */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          <button className="bg-white rounded-xl py-3 shadow-sm">💵 Cash</button>
          <button className="bg-white rounded-xl py-3 shadow-sm">💳 Card</button>
          <button className="bg-green-100 text-green-700 rounded-xl py-3 shadow-sm">🔳 QR</button>
        </div>

        <button className="mt-4 bg-green-600 text-white py-3 rounded-2xl font-semibold hover:bg-green-700">
          Place Order
        </button>

      </div>
    </div>
  );
}