"use client";

import { useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Pagination from "@/components/tables/Pagination";
import Link from "next/link";
import Button from "@/components/atoms/Button";
import RolesTable from "./table";

export default function RolesPage() {
  const [currentPage, setCurrentPage] = useState(1);

  // Static roles data
  const roles = [
    {
      id: 1,
      roleName: "Owner",
      description: "Full access to all modules",
      status: "Active",
    },
    {
      id: 2,
      roleName: "Manager",
      description: "Manage daily operations",
      status: "Active",
    },
    {
      id: 3,
      roleName: "Cashier",
      description: "Billing and payment access",
      status: "Inactive",
    },
    {
      id: 4,
      roleName: "Inventory",
      description: "Stock & inventory management",
      status: "Active",
    },
  ];

  return (
    <>
      <PageBreadcrumb pageTitle="Manage Roles" />

      <div className="space-y-6">
        <ComponentCard
          title="Roles List"
          desc={`Total ${roles.length} roles found`}
        >
          <RolesTable data={roles} />

          <Pagination
            currentPage={currentPage}
            totalPages={1}
            onPageChange={setCurrentPage}
          />
        </ComponentCard>
      </div>
    </>
  );
}
