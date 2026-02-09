"use client";

import Button from "@/components/atoms/Button";
import CustomInput from "@/components/atoms/CustomInput";
import { useParams, useRouter } from "next/navigation";
import { firmApi } from "@/features/firm/index";
import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";


export default function EditFirmPage() {

    const router = useRouter();
    const params = useParams();
    const firmId = Number(
        Array.isArray(params.id) ? params.id[0] : params.id
    );

    const { data, isLoading } = firmApi.useGetFirmByIdQuery(firmId);
    const [updateFirm, { isLoading: saving }] =
        firmApi.useUpdateFirmMutation();

    const [form, setForm] = useState({
        firmName: "",
        firmCode: "",
        isActive: true,

        address: "",
        contactNumber: "",
        contactPerson: "",
        gstNumber: "",
        logoImagePath: "",
    });

    const [logoFile, setLogoFile] = useState<File | null>(null);

    useEffect(() => {
        if (data) {
            setForm({
                firmName: data.firmName ?? "",
                firmCode: data.firmCode ?? "",
                isActive: data.isActive,

                address: data.address ?? "",
                contactNumber: data.contactNumber ?? "",
                contactPerson: data.contactPerson ?? "",
                gstNumber: data.gstNumber ?? "",
                logoImagePath: data.logoImagePath ?? "",
            });
        }
    }, [data]);


    const handleLogoChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setLogoFile(file);
    };

    const handleSave = async () => {
        if (!form.firmName || !form.firmCode) {
            enqueueSnackbar("Firm Name & Firm Code are required", {
                variant: "error",
            });
            return;
        }

        try {
            const formData = new FormData();

            formData.append("firmName", form.firmName);
            formData.append("firmCode", form.firmCode);
            formData.append("isActive", String(form.isActive));
            formData.append("address", form.address);
            formData.append("contactNumber", form.contactNumber);
            formData.append("contactPerson", form.contactPerson);
            formData.append("gstNumber", form.gstNumber);

            // IMPORTANT: only append if new file selected
            if (logoFile) {
                formData.append("logo", logoFile);
            }

            await updateFirm({ firmId, formData }).unwrap();

            enqueueSnackbar("Firm updated successfully", { variant: "success" });
            router.push("/grocery/firms");
        } catch (err) {
            enqueueSnackbar("Failed to update firm", { variant: "error" });
        }
    };


    if (isLoading) {
        return <div className="p-6">Loading...</div>;
    }

    return (
        <div className="mx-auto max-w-6xl px-6 py-8">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-semibold text-gray-900">
                    Edit Firm
                </h1>
                <p className="text-sm text-gray-500">
                    Update firm, contact, and branding details
                </p>
            </div>

            {/* Card */}
            <div className="rounded-xl bg-white shadow-sm ring-1 ring-gray-200">
                <div className="space-y-10 p-8">

                    {/* ───────── Firm Information ───────── */}
                    <section>
                        {/* <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-700">
                Firm Information
                </h3> */}

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <CustomInput
                                label="Firm Name"
                                name="firmName"
                                value={form.firmName}
                                onChange={(e) =>
                                    setForm({ ...form, firmName: e.target.value })
                                }
                                placeholder="Enter firm name"
                            />

                            <CustomInput
                                label="Firm Code"
                                name="firmCode"
                                value={form.firmCode}
                                onChange={(e) =>
                                    setForm({ ...form, firmCode: e.target.value })
                                }
                                placeholder="Enter firm code"
                                readOnly
                            />

                            <CustomInput
                                label="Address"
                                name="address"
                                value={form.address}
                                onChange={(e) =>
                                    setForm({ ...form, address: e.target.value })
                                }
                                placeholder="Enter address"
                            />
                        </div>
                    </section>

                    {/* ───────── Contact Details ───────── */}
                    <section>
                        {/* <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-700">
              Contact Details
            </h3> */}

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <CustomInput
                                label="Contact Person"
                                name="contactPerson"
                                value={form.contactPerson}
                                onChange={(e) => setForm({ ...form, contactPerson: e.target.value })}
                                placeholder="Enter contact person"
                            />

                            <CustomInput
                                label="Contact Number"
                                name="contactNumber"
                                value={form.contactNumber}
                                onChange={(e) => setForm({ ...form, contactNumber: e.target.value })}
                                placeholder="Enter contact number"
                            />

                            <CustomInput
                                label="GST Number"
                                name="gstNumber"
                                value={form.gstNumber}
                                onChange={(e) => setForm({ ...form, gstNumber: e.target.value })}
                                placeholder="Enter GST number"
                            />
                        </div>
                    </section>



                    {/* ───────── Branding ───────── */}
                    <section>
                        {/* <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-700">
              Branding
            </h3> */}

                        <div className="max-w-sm">
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Firm Logo
                            </label>

                            <div className="flex items-center gap-4 rounded-lg border border-dashed border-gray-300 p-4 hover:border-blue-500 transition">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleLogoChange}
                                    className="text-sm text-gray-600
                    file:mr-3 file:rounded-md file:border-0
                    file:bg-blue-50 file:px-4 file:py-2
                    file:text-sm file:font-medium file:text-blue-600
                    hover:file:bg-blue-100"
                                />


                                {(form.logoImagePath || logoFile) && (
                                    <img
                                        src={logoFile ? URL.createObjectURL(logoFile) : form.logoImagePath}
                                        alt="Firm Logo Preview"
                                        className="h-20 w-20 rounded-md border object-cover"
                                    />
                                )}





                            </div>

                        </div>
                    </section>

                    {/* ───────── Actions ───────── */}
                    <div className="flex justify-end gap-3 border-t pt-6">
                        <Button
                            variant="default"
                            onClick={() => history.back()}
                        >
                            Cancel
                        </Button>

                        <Button variant="primary" onClick={handleSave}
                            isLoading={saving}>
                            Update Firm
                        </Button>
                    </div>

                </div>
            </div>
        </div>
    );
}
