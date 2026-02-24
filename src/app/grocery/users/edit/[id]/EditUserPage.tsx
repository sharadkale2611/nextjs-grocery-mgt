"use client";

import Button from "@/components/atoms/Button";
import CustomInput from "@/components/atoms/CustomInput";
import React, { useState } from "react";
import { useParams } from "next/navigation";

export default function EditUserPage() {
  const params = useParams();

  // Static pre-filled data (Edit mode)
  const [form] = useState({
    fullName: "Amit Sharma",
    mobileNumber: "9876543210",
    password: "********",
    role: "Manager",
    isActive: true,
  });

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Edit User</h1>
        <p className="text-sm text-gray-500">
          Update user details, role and status
        </p>
      </div>

      {/* Card */}
      <div className="rounded-xl border bg-white shadow-sm">
        <div className="space-y-10 p-6">

          {/* Basic Info */}
          <section>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-700">
              User Information
            </h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <CustomInput
                label="Full Name"
                name="fullName"
                value={form.fullName}
                readOnly
              />

              <CustomInput
                label="Mobile Number"
                name="mobileNumber"
                value={form.mobileNumber}
                readOnly
              />

              <CustomInput
                label="Password"
                name="password"
                type="password"
                value={form.password}
                readOnly
              />
            </div>
          </section>

          {/* Role */}
          <section>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-700">
              Role
            </h3>

            <div className="flex flex-wrap gap-6">
              {["Owner", "Manager", "Cashier", "Inventory"].map((role) => (
                <label
                  key={role}
                  className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="role"
                    checked={form.role === role}
                    readOnly
                    className="accent-primary"
                  />
                  {role}
                </label>
              ))}
            </div>
          </section>

          {/* Status */}
          <section>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-700">
              Status
            </h3>

            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={form.isActive}
                readOnly
                className="accent-primary"
              />
              Active
            </label>
          </section>

          {/* Actions */}
          <div className="flex justify-end gap-3 border-t pt-6">
            <Button variant="default" onClick={() => history.back()}>
              Cancel
            </Button>

            <Button variant="primary">
              Update User
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
