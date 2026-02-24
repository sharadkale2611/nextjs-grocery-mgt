"use client";

import React from "react";
import Image from "next/image";

export default function POSPage() {

  // 🟢 Grocery Categories
  const categories = [
    "All",
    "Dairy",
    "Snacks",
    "Oil",
    "Flour",
    "Beverages",
  ];

  // 🟢 Hardcoded Grocery Products
  const products = [
    {
      id: 1,
      name: "Amul Milk 500ml",
      price: 30,
      category: "Dairy",
      image: "/images/product/milk.jpg",
      stock: 45,
    },
    {
      id: 2,
      name: "Tata Salt 1kg",
      price: 28,
      category: "Flour",
      image: "/images/product/salt.jpg",
      stock: 20,
    },
    {
      id: 3,
      name: "Fortune Oil 1L",
      price: 160,
      category: "Oil",
      image: "/images/product/oil.jpg",
      stock: 12,
    },
    {
      id: 4,
      name: "Maggi Noodles",
      price: 14,
      category: "Snacks",
      image: "/images/product/maggi.jpg",
      stock: 80,
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100">

      {/* 🟢 LEFT SIDEBAR (Temporary POS Menu) */}
      <div className="w-60 bg-white border-r p-4">
        <h1 className="font-bold text-lg">Grocery POS</h1>

        <ul className="mt-6 space-y-4 text-sm">
          <li className="text-green-600 font-semibold">Products</li>
          <li>Orders</li>
          <li>Reports</li>
          <li>Settings</li>
        </ul>
      </div>

      {/* 🟢 CENTER SECTION */}
      <div className="flex-1 p-6 overflow-auto">

        {/* 🔍 Search */}
        <input
          placeholder="Search product / Scan barcode..."
          className="w-full bg-white rounded-xl px-4 py-3 mb-4 outline-none"
        />

        {/* 🟢 Categories */}
        <div className="flex gap-3 mb-6">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="bg-white px-4 py-3 rounded-xl text-sm shadow-sm cursor-pointer"
            >
              {cat}
            </div>
          ))}
        </div>

        {/* 🟢 Product Grid */}
        <div className="grid grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-sm p-4 hover:shadow-md transition"
            >
              <div className="relative w-full h-36">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover rounded-xl"
                />
              </div>

              <h3 className="mt-2 font-semibold text-sm">
                {product.name}
              </h3>

              <p className="text-xs text-gray-400">
                {product.category} • Stock: {product.stock}
              </p>

              <p className="text-green-600 font-bold">
                ₹{product.price}
              </p>

              <button className="mt-2 w-full bg-green-500 text-white py-2 rounded-xl hover:bg-green-600">
                Add to Cart
              </button>
            </div>
          ))}
        </div>

      </div>

      {/* 🟢 RIGHT BILLING PANEL */}
      <div className="w-[360px] bg-white border-l p-6 flex flex-col">

        {/* Header */}
        <div>
          <h2 className="text-xl font-bold">Retail Billing</h2>
          <p className="text-sm text-gray-500">Bill No: 1023</p>
          <p className="text-sm text-gray-500">Customer: Walk-in</p>
        </div>

        {/* Cart Items */}
        <div className="mt-6 space-y-3 flex-1">
          <div className="flex justify-between text-sm">
            <p>Amul Milk 500ml x2</p>
            <p>₹60</p>
          </div>

          <div className="flex justify-between text-sm">
            <p>Maggi Noodles x3</p>
            <p>₹42</p>
          </div>
        </div>

        {/* Billing Summary */}
        <div className="border-t pt-4 text-sm space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹102</span>
          </div>

          <div className="flex justify-between">
            <span>GST</span>
            <span>₹5</span>
          </div>

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹107</span>
          </div>
        </div>

        {/* Payment Buttons */}
        <div className="grid grid-cols-4 gap-2 mt-4">
          <button className="border rounded-xl py-2">Cash</button>
          <button className="border rounded-xl py-2">UPI</button>
          <button className="border rounded-xl py-2">Card</button>
          <button className="border rounded-xl py-2">QR</button>
        </div>

        {/* Generate Bill */}
        <button className="mt-4 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700">
          Generate Bill
        </button>

      </div>

    </div>
  );
}