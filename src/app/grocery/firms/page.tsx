"use client";

import { useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Pagination from "@/components/tables/Pagination";
import Link from "next/link";
import Button from "@/components/atoms/Button";
import FirmsTable from "./table";
import { firmApi, Firm } from "@/features/firm/index";

export default function FirmsPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = firmApi.useGetFirmsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading firms.</div>;

  const firms = (data ?? []).map(firm => ({
    ...firm,
    logoImagePath: null as unknown as File | null | undefined
  }));

  return (
    <>
      <PageBreadcrumb pageTitle="Manage Firms" />

      <div className="space-y-6">
        <ComponentCard
          title="Firms List"
          desc={`Total ${firms.length} firms found`}
          action={
            <Link href="/grocery/firms/create">
              <Button variant="primary" size="sm">
                + Add Firm
              </Button>
            </Link>
          }
        >
          <FirmsTable data={firms} />

          <Pagination
            currentPage={currentPage}
            totalPages={data ? Math.ceil(data.length / 10) : 1}
            onPageChange={setCurrentPage}
          />
        </ComponentCard>
      </div>
    </>
  );
}
