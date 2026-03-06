"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

import { productApi } from "@/features/products";
import { useGetCategoriesQuery } from "@/features/categories";

export default function POSPage() {

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [cart, setCart] = useState<any[]>(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("pos-cart");
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  const [searchText, setSearchText] = useState("");

  // Save cart whenever it changes
  useEffect(() => {
    localStorage.setItem("pos-cart", JSON.stringify(cart));
  }, [cart]);

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("pos-cart");
  };

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
            className={`px-4 py-2 rounded-xl text-sm cursor-pointer ${selectedCategory === "All"
              ? "bg-blue-500 text-white"
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
                className={`px-4 py-2 rounded-xl text-sm cursor-pointer ${selectedCategory === cat.categoryName
                  ? "bg-blue-500 text-white"
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
                className={`group rounded-2xl p-3 transition shadow-sm hover:shadow-md cursor-pointer ${isActive
                    ? "border-2 border-blue-500 bg-blue-50"
                    : "bg-white border border-gray-200"
                  }`}
              >
                {/* IMAGE */}
                <div className="relative w-full h-36 overflow-hidden rounded-xl">
                  <Image
                    src={
                      product.primaryImageUrl ||
                      "/images/product/product-01.jpg"
                    }
                    alt={product.productName}
                    fill
                    className="object-cover group-hover:scale-105 transition"
                  />

                  {/* CATEGORY BADGE */}
                  <div className="absolute top-2 left-2 bg-white/90 text-xs px-2 py-1 rounded-lg shadow">
                    {product.categoryName}
                  </div>
                </div>

                {/* PRODUCT INFO */}
                <div className="mt-3 space-y-1">

                  <h3 className="font-semibold text-sm line-clamp-1">
                    {product.productName}
                  </h3>

                  {/* BARCODE */}
                  {product.barcode && (
                    <p className="text-[11px] text-gray-400">
                      #{product.barcode}
                    </p>
                  )}

                  {/* PRICE */}
                  <p className="text-blue-600 font-bold text-lg">
                    ₹{product.salePrice}
                  </p>
                </div>

                {/* ACTION */}
                <div className="mt-3">

                  {!cartItem ? (
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full bg-green-500 text-white text-sm py-2 rounded-xl hover:bg-green-600 transition"
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <div className="flex items-center justify-between bg-green-50 border border-green-500 rounded-xl px-3 py-2">

                      <button
                        onClick={() =>
                          decreaseQty(product.productId)
                        }
                        className="w-7 h-7 rounded-full bg-green-600 text-white flex items-center justify-center"
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
                        className="w-7 h-7 rounded-full bg-green-600 text-white flex items-center justify-center"
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
          <div className="flex items-center justify-between mb-3">

            <h3 className="font-semibold text-gray-700">
              Cart ({cart.length})
            </h3>

            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600 border border-red-300 px-2 py-1 rounded-lg hover:bg-red-50 transition"
              >
                🗑 Clear
              </button>
            )}

          </div>
          {cart.map((item: any) => (

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