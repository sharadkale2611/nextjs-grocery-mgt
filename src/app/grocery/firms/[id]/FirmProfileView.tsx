"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import Button from "@/components/atoms/Button";
import { firmApi } from "@/features/firm/index";

export default function FirmDetailsPage() {
    const params = useParams();
    const id = Number(
        Array.isArray(params.id) ? params.id[0] : params.id
    );

    const { data, isLoading, isError } = firmApi.useGetFirmByIdQuery(id, {
        skip: !id || Number.isNaN(id),
    });

    if (isLoading) {
        return <ComponentCard title="Loading">Loading firm details…</ComponentCard>;
    }

    if (isError || !data) return <div>Firm not found.</div>;

    const firm = data;

    return (
        <>
            <PageBreadcrumb pageTitle="Firm Details" />


            <ComponentCard title="Firm Overview">
                <div className="flex items-center gap-6">
                    {/* Logo */}
                    <div className="flex h-20 w-20 items-center justify-center rounded-lg border bg-gray-50">
                        {firm.logoImagePath ? (
                            <img
                                src={firm.logoImagePath}
                                alt={`${firm.firmName} logo`}
                                onClick={() => firm.logoImagePath && window.open(firm.logoImagePath, "_blank")}
                                className="h-full w-full rounded-lg object-contain p-2"
                            />
                        ) : (
                            <span className="text-xs text-gray-400">No Logo</span>
                        )}
                    </div>

                    {/* Firm meta */}
                    <div className="flex-1">
                        <h2 className="text-xl font-semibold text-gray-900">
                            {firm.firmName}
                        </h2>

                        <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-gray-500">
                            <span>Code: {firm.firmCode}</span>

                            <span
                                className={`rounded-full px-2 py-0.5 text-xs font-medium
            ${firm.isActive
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                    }`}
                            >
                                {firm.isActive ? "Active" : "Inactive"}
                            </span>
                        </div>
                    </div>

                    {/* Back button */}
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={() => history.back()}
                    >
                        Back
                    </Button>
                </div>
            </ComponentCard>




            <ComponentCard
                title="Firm Information"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Info label="Firm Name" value={firm.firmName} />
                    <Info label="Firm Code" value={firm.firmCode} />
                    <Info
                        label="Status"
                        value={firm.isActive ? "Active" : "Inactive"}
                    />
                    <Info
                        label="Created At"
                        value={formatDate(firm.createdAt)}
                    />
                    <Info
                        label="Updated At"
                        value={formatDate(firm.updatedAt)}
                    />
                </div>
            </ComponentCard>

            {firm && (
                <ComponentCard title="Contact Details">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Info
                            label="Contact Person"
                            value={firm.contactPerson}
                        />
                        <Info
                            label="Contact Number"
                            value={firm.contactNumber}
                        />
                        <Info
                            label="GST Number"
                            value={firm.gstNumber}
                        />
                        <Info
                            label="Address"
                            value={firm.address}
                        />
                    </div>
                </ComponentCard>
            )}
        </>
    );
}

/* ================= HELPERS ================= */

const Info = ({
    label,
    value,
}: {
    label: string;
    value?: React.ReactNode;
}) => (
    <div>
        <p className="text-xs uppercase tracking-wide text-gray-500">
            {label}
        </p>
        <p className="mt-1 text-sm font-medium text-gray-900">
            {value || "—"}
        </p>
    </div>
);

const formatDate = (date?: string | null) => {
    if (!date) return "—";
    return new Date(date).toLocaleString();
};
