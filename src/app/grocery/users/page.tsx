"use client";

import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Pagination from "@/components/tables/Pagination";
import Link from "next/link";
import Button from "@/components/atoms/Button";
import UsersTable from "./table";
import { useState } from "react";

export default function Users() {
  const [currentPage, setCurrentPage] = useState(1);

  // Static data
  const users = [
    {
      id: 1,
      name: "Amit Sharma",
      email: "amit.sharma@example.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Neha Verma",
      email: "neha.verma@example.com",
      role: "Manager",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Rahul Singh",
      email: "rahul.singh@example.com",
      role: "User",
      status: "Active",
    },
    {
      id: 4,
      name: "Priya Patel",
      email: "priya.patel@example.com",
      role: "User",
      status: "Active",
    },
    {
      id: 5,
      name: "Karan Mehta",
      email: "karan.mehta@example.com",
      role: "Admin",
      status: "Inactive",
    },
  ];

  return (
    <>
      <PageBreadcrumb pageTitle="Manage Users" />

      <div className="space-y-6">
        <ComponentCard
          title="Users List"
          desc={`Total ${users.length} users found`}
          action={
            <Link href="/grocery/users/create">
              <Button variant="primary" size="sm">
                + Add User
              </Button>
            </Link>
          }
        >
          <UsersTable data={users} />

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
