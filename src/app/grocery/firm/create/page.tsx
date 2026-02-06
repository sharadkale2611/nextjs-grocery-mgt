// // "use client";

// // import { useState } from "react";
// // import { useRouter } from "next/navigation";
// // import { enqueueSnackbar } from "notistack";

// // import Button from "@/components/atoms/Button";
// // import CustomInput from "@/components/atoms/CustomInput";
// // import ComponentCard from "@/components/common/ComponentCard";
// // import PageBreadcrumb from "@/components/common/PageBreadCrumb";
// // import { useCreateFirmMutation } from "@/features/firm/firmApi";

// // export default function CreateFirmPage() {
// //   const router = useRouter();
// //   const [createFirm, { isLoading }] = useCreateFirmMutation();

// //   const [form, setForm] = useState({
// //     firmName: "",
// //     firmCode: "",
// //     isActive: true,
// //     address: "",
// //     contactNumber: "",
// //     contactPerson: "",
// //     gstNumber: "",
// //   });

// //   const [logoFile, setLogoFile] = useState<File | null>(null);
// //   const [formError, setFormError] = useState<string | null>(null);

// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const { name, value, type, checked } = e.target;

// //     setForm(prev => ({
// //       ...prev,
// //       [name]: type === "checkbox" ? checked : value,
// //     }));
// //   };

// //   const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files?.[0];
// //     if (file) setLogoFile(file);
// //   };

// //   const handleSave = async () => {
// //     setFormError(null);

// //     if (!form.firmName || !form.firmCode) {
// //       setFormError("Firm Name and Firm Code are required");
// //       return;
// //     }

// //     try {
// //       const formData = new FormData();

// //       formData.append("FirmName", form.firmName);
// //       formData.append("FirmCode", form.firmCode);
// //       formData.append("IsActive", String(form.isActive));

// //       if (form.address) formData.append("Address", form.address);
// //       if (form.contactNumber) formData.append("ContactNumber", form.contactNumber);
// //       if (form.contactPerson) formData.append("ContactPerson", form.contactPerson);
// //       if (form.gstNumber) formData.append("GstNumber", form.gstNumber);
// //       if (logoFile) formData.append("Logo", logoFile);

// //       await createFirm(formData).unwrap();
// //       enqueueSnackbar("Firm created successfully", { variant: "success" });
// //       router.push("/grocery/firm");
// //     } catch (error) {
// //       console.error(error);
// //       setFormError("Something went wrong while creating firm");
// //     }
// //   };

// //   return (
// //     <>
// //       <PageBreadcrumb pageTitle="Add New Firm" />

// //       {/* ✅ Simple wrapper so page stays inside layout and card */}
// //       <div className="mt-4">
// //         <ComponentCard title="Firm Information">
// //           {formError && (
// //             <div className="mb-4 rounded bg-red-50 p-3 text-sm text-red-600">
// //               {formError}
// //             </div>
// //           )}

// //           {/* Top Row */}
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //             <CustomInput
// //               label="Firm Name"
// //               name="firmName"
// //               value={form.firmName}
// //               onChange={handleChange}
// //             />

// //             <CustomInput
// //               label="Firm Code"
// //               name="firmCode"
// //               value={form.firmCode}
// //               onChange={handleChange}
// //             />
// //           </div>

// //           <div className="mt-6 mb-2 font-semibold">Firm Details</div>

// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //             <CustomInput
// //               label="Address"
// //               name="address"
// //               value={form.address}
// //               onChange={handleChange}
// //             />

// //             <CustomInput
// //               label="Contact Number"
// //               name="contactNumber"
// //               value={form.contactNumber}
// //               onChange={handleChange}
// //             />

// //             <CustomInput
// //               label="Contact Person"
// //               name="contactPerson"
// //               value={form.contactPerson}
// //               onChange={handleChange}
// //             />

// //             <CustomInput
// //               label="GST Number"
// //               name="gstNumber"
// //               value={form.gstNumber}
// //               onChange={handleChange}
// //             />

// //             {/* Logo Upload (Full Width) */}
// //             <div className="md:col-span-2">
// //               <label className="block text-sm font-medium mb-1">
// //                 Firm Logo
// //               </label>

// //               <input
// //                 type="file"
// //                 accept="image/*"
// //                 onChange={handleLogoChange}
// //                 className="block w-full text-sm text-gray-700
// //                   file:mr-4 file:rounded file:border-0
// //                   file:bg-blue-50 file:px-4 file:py-2
// //                   file:text-sm file:font-medium
// //                   file:text-blue-700 hover:file:bg-blue-100"
// //               />

// //               {logoFile && (
// //                 <p className="mt-1 text-xs text-gray-500">
// //                   Selected: {logoFile.name}
// //                 </p>
// //               )}
// //             </div>
// //           </div>

// //           {/* Buttons */}
// //           <div className="flex justify-end gap-3 mt-6">
// //             <Button variant="default" onClick={() => router.back()}>
// //               Cancel
// //             </Button>

// //             <Button
// //               variant="primary"
// //               onClick={handleSave}
// //               isLoading={isLoading}
// //             >
// //               Save Firm
// //             </Button>
// //           </div>
// //         </ComponentCard>
// //       </div>
// //     </>
// //   );
// // }

// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { enqueueSnackbar } from "notistack";

// import Button from "@/components/atoms/Button";
// import CustomInput from "@/components/atoms/CustomInput";
// import ComponentCard from "@/components/common/ComponentCard";
// import PageBreadcrumb from "@/components/common/PageBreadCrumb";
// import { useCreateFirmMutation } from "@/features/firm/firmApi";

// export default function CreateFirmPage() {
//   const router = useRouter();
//   const [createFirm, { isLoading }] = useCreateFirmMutation();

//   const [form, setForm] = useState({
//     firmName: "",
//     firmCode: "",
//     isActive: true,
//     address: "",
//     contactNumber: "",
//     contactPerson: "",
//     gstNumber: "",
//   });

//   const [logoFile, setLogoFile] = useState<File | null>(null);
//   const [formError, setFormError] = useState<string | null>(null);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, type, checked } = e.target;

//     setForm(prev => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) setLogoFile(file);
//   };

//   const handleSave = async () => {
//     setFormError(null);

//     if (!form.firmName || !form.firmCode) {
//       setFormError("Firm Name and Firm Code are required");
//       return;
//     }

//     try {
//       const formData = new FormData();

//       formData.append("FirmName", form.firmName);
//       formData.append("FirmCode", form.firmCode);
//       formData.append("IsActive", String(form.isActive));

//       if (form.address) formData.append("Address", form.address);
//       if (form.contactNumber) formData.append("ContactNumber", form.contactNumber);
//       if (form.contactPerson) formData.append("ContactPerson", form.contactPerson);
//       if (form.gstNumber) formData.append("GstNumber", form.gstNumber);
//       if (logoFile) formData.append("Logo", logoFile);

//       await createFirm(formData).unwrap();
//       enqueueSnackbar("Firm created successfully", { variant: "success" });
//       router.push("/grocery/firm");
//     } catch (error) {
//       console.error(error);
//       setFormError("Something went wrong while creating firm");
//     }
//   };

//   return (
//     <>
//       <PageBreadcrumb pageTitle="Add New Firm" />

//       {/* ✅ FIX: removed side space */}
//       <div className="-mx-4 md:-mx-6 mt-4">
//         <ComponentCard title="Firm Information">
//           {formError && (
//             <div className="mb-4 rounded bg-red-50 p-3 text-sm text-red-600">
//               {formError}
//             </div>
//           )}

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <CustomInput
//               label="Firm Name"
//               name="firmName"
//               value={form.firmName}
//               onChange={handleChange}
//             />

//             <CustomInput
//               label="Firm Code"
//               name="firmCode"
//               value={form.firmCode}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="mt-6 mb-2 font-semibold">Firm Details</div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <CustomInput
//               label="Address"
//               name="address"
//               value={form.address}
//               onChange={handleChange}
//             />

//             <CustomInput
//               label="Contact Number"
//               name="contactNumber"
//               value={form.contactNumber}
//               onChange={handleChange}
//             />

//             <CustomInput
//               label="Contact Person"
//               name="contactPerson"
//               value={form.contactPerson}
//               onChange={handleChange}
//             />

//             <CustomInput
//               label="GST Number"
//               name="gstNumber"
//               value={form.gstNumber}
//               onChange={handleChange}
//             />

//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium mb-1">
//                 Firm Logo
//               </label>

//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleLogoChange}
//                 className="block w-full text-sm text-gray-700
//                   file:mr-4 file:rounded file:border-0
//                   file:bg-blue-50 file:px-4 file:py-2
//                   file:text-sm file:font-medium
//                   file:text-blue-700 hover:file:bg-blue-100"
//               />

//               {logoFile && (
//                 <p className="mt-1 text-xs text-gray-500">
//                   Selected: {logoFile.name}
//                 </p>
//               )}
//             </div>
//           </div>

//           <div className="flex justify-end gap-3 mt-6">
//             <Button variant="default" onClick={() => router.back()}>
//               Cancel
//             </Button>

//             <Button
//               variant="primary"
//               onClick={handleSave}
//               isLoading={isLoading}
//             >
//               Save Firm
//             </Button>
//           </div>
//         </ComponentCard>
//       </div>
//     </>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";

import Button from "@/components/atoms/Button";
import CustomInput from "@/components/atoms/CustomInput";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { useCreateFirmMutation } from "@/features/firm/firmApi";

export default function CreateFirmPage() {
  const router = useRouter();
  const [createFirm, { isLoading }] = useCreateFirmMutation();

  const [form, setForm] = useState({
    firmName: "",
    firmCode: "",
    isActive: true,
    address: "",
    contactNumber: "",
    contactPerson: "",
    gstNumber: "",
  });

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null); // ✅ Preview state
  const [formError, setFormError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file)); // ✅ Create preview
    }
  };

  const handleSave = async () => {
    setFormError(null);

    if (!form.firmName || !form.firmCode) {
      setFormError("Firm Name and Firm Code are required");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("FirmName", form.firmName);
      formData.append("FirmCode", form.firmCode);
      formData.append("IsActive", String(form.isActive));

      if (form.address) formData.append("Address", form.address);
      if (form.contactNumber) formData.append("ContactNumber", form.contactNumber);
      if (form.contactPerson) formData.append("ContactPerson", form.contactPerson);
      if (form.gstNumber) formData.append("GstNumber", form.gstNumber);
      if (logoFile) formData.append("Logo", logoFile);

      await createFirm(formData).unwrap();
      enqueueSnackbar("Firm created successfully", { variant: "success" });
      router.push("/grocery/firm");
    } catch (error) {
      console.error(error);
      setFormError("Something went wrong while creating firm");
    }
  };

  return (
    <>
      <PageBreadcrumb pageTitle="Add New Firm" />

      <div className="-mx-4 md:-mx-6 mt-4">
        <ComponentCard title="Firm Information">
          {formError && (
            <div className="mb-4 rounded bg-red-50 p-3 text-sm text-red-600">
              {formError}
            </div>
          )}

          {/* ✅ 4 columns grid = col-md-3 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <CustomInput
              label="Firm Name"
              name="firmName"
              value={form.firmName}
              onChange={handleChange}
            />

            <CustomInput
              label="Firm Code"
              name="firmCode"
              value={form.firmCode}
              onChange={handleChange}
            />

            <CustomInput
              label="Address"
              name="address"
              value={form.address}
              onChange={handleChange}
            />

            <CustomInput
              label="Contact Number"
              name="contactNumber"
              value={form.contactNumber}
              onChange={handleChange}
            />

            <CustomInput
              label="Contact Person"
              name="contactPerson"
              value={form.contactPerson}
              onChange={handleChange}
            />

            <CustomInput
              label="GST Number"
              name="gstNumber"
              value={form.gstNumber}
              onChange={handleChange}
            />

            {/* Logo Upload + Preview (takes 1 column = col-md-3) */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Firm Logo
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="block w-full text-sm text-gray-700
                  file:mr-4 file:rounded file:border-0
                  file:bg-blue-50 file:px-4 file:py-2
                  file:text-sm file:font-medium
                  file:text-blue-700 hover:file:bg-blue-100"
              />

              {logoFile && (
                <p className="mt-1 text-xs text-gray-500">
                  Selected: {logoFile.name}
                </p>
              )}

              {/* ✅ IMAGE PREVIEW */}
              {logoPreview && (
                <div className="mt-3">
                  <img
                    src={logoPreview}
                    alt="Logo Preview"
                    className="h-24 w-24 object-cover border rounded"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="default" onClick={() => router.back()}>
              Cancel
            </Button>

            <Button
              variant="primary"
              onClick={handleSave}
              isLoading={isLoading}
            >
              Save Firm
            </Button>
          </div>
        </ComponentCard>
      </div>
    </>
  );
}
