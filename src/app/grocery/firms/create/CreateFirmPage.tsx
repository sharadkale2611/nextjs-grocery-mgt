"use client";

import Button from "@/components/atoms/Button";
import CustomInput from "@/components/atoms/CustomInput";
import { firmApi } from "@/features/firm/index";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";


export default function CreateFirmPage() {

  const router = useRouter();
  const [createFirm, { isLoading }] = firmApi.useCreateFirmMutation();

  const [form, setForm] = useState({
    firmName: "",
    firmCode: "",
    address: "",
    contactPerson: "",
    contactNumber: "",
    gstNumber: "",
    isActive: true
  });

  // logo file 
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);


  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLogoFile(file);
  };

  const handleSave = async () => {
    setFormError(null);

    if (!form.firmName || !form.firmCode) {
      setFormError("Firm Name and Firm Code are required");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("firmName", form.firmName);
      formData.append("firmCode", form.firmCode);
      formData.append("address", form.address);
      formData.append("contactPerson", form.contactPerson);
      formData.append("contactNumber", form.contactNumber);
      formData.append("gstNumber", form.gstNumber);
      formData.append("isActive", String(form.isActive));

      if (logoFile) {
        formData.append("logo", logoFile);
      }

      await createFirm(formData).unwrap();

      enqueueSnackbar("Firm created successfully", { variant: "success" });
      router.push("/grocery/firms");

    } catch {
      setFormError("Something went wrong while saving the firm.");
    }
  };


  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Add New Firm
        </h1>
        <p className="text-sm text-gray-500">
          Enter firm, contact, and branding details
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
                placeholder="Enter firm name"
                onChange={(e) => setForm({ ...form, firmName: e.target.value })}
              />

              <CustomInput
                label="Firm Code"
                name="firmCode"
                value={form.firmCode}
                placeholder="Enter firm code"
                onChange={(e) => setForm({ ...form, firmCode: e.target.value })}
              />


              <CustomInput
                label="Address"
                name="address"
                value={form.address}
                placeholder="Enter address"
                onChange={(e) => setForm({ ...form, address: e.target.value })}
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
                placeholder="Enter contact person"
                onChange={(e) => setForm({ ...form, contactPerson: e.target.value })}
              />

              <CustomInput
                label="Contact Number"
                name="contactNumber"
                value={form.contactNumber}
                placeholder="Enter contact number"
                onChange={(e) => setForm({ ...form, contactNumber: e.target.value })}
              />

              <CustomInput
                label="GST Number"
                name="gstNumber"
                value={form.gstNumber}
                placeholder="Enter GST number"
                onChange={(e) => setForm({ ...form, gstNumber: e.target.value })}
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
                  className="text-sm text-gray-600
                  file:mr-3 file:rounded-md file:border-0
                  file:bg-blue-50 file:px-4 file:py-2
                  file:text-sm file:font-medium file:text-blue-600
                  hover:file:bg-blue-100"
                  onChange={handleLogoChange}


                />
                {logoFile && (
                  <img
                    src={URL.createObjectURL(logoFile)}
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
              isLoading={isLoading}>
              Save Firm
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}
