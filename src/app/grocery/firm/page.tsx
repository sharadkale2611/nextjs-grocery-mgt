// // //list


// "use client";

// import { useState } from "react";
// import Link from "next/link";

// import ComponentCard from "@/components/common/ComponentCard";
// import PageBreadcrumb from "@/components/common/PageBreadCrumb";
// import Pagination from "@/components/tables/Pagination";
// import Button from "@/components/atoms/Button";

// //import FirmTable from "./table";
// import { firmDummyData } from "@/data/firmDummyData";
// //import FirmTable from "./FirmTable";
// //import { firmDummyData } from "@/data/firmDummyData";
// //import FirmTable from "./FirmTable";
// import { FirmWithDetails } from "@/features/firm";
// import { useGetFirmsQuery } from "@/features/firm/firmApi";
// import FirmTable from "./FirmTable";
// //import { firmDummyData } from "@/data/firmDummyData";


// export default function Firms() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   // ✅ Fetch ALL firms (Firm + FirmDetails from backend)
//   //const { data, isLoading, isError } = useGetFirmsQuery();

//   //if (isLoading) return <div>Loading...</div>;
//   //if (isError) return <div>Error loading firms.</div>;

//   // ✅ Safe fallback
//  // const allFirms: FirmWithDetails[] = data ?? [];
//    //const allFirms: FirmWithDetails[] = firmDummyData;
//    const allFirms = firmDummyData;

//   // 🔹 Frontend pagination
//   const totalCount = allFirms.length;
//   const totalPages = Math.ceil(totalCount / itemsPerPage);
 


//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedFirms = allFirms.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );

//   return (
//     <>
//       <PageBreadcrumb pageTitle="Manage Firms" />

//       <div className="space-y-6">
//         <ComponentCard
//           title="Firm List"
//           desc={`Total ${totalCount} records found.`}
//           action={
//             <Link href="/firms/create">
//               <Button variant="primary" size="sm">
//                 + Add Firm
//               </Button>
//             </Link>
//           }
//         >
//           {/* ✅ Firm Table */}
//           <FirmTable data={paginatedFirms} />

//           {/* ✅ Pagination */}
//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             onPageChange={setCurrentPage}
//           />
//         </ComponentCard>
//       </div>
//     </>
//   );
// }


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";   // ✅ ADDED
import Link from "next/link";

import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Pagination from "@/components/tables/Pagination";
import Button from "@/components/atoms/Button";

import { firmDummyData } from "./FirmTable";
import { FirmWithDetails } from "@/features/firm";
import { useGetFirmsQuery } from "@/features/firm/firmApi";
import FirmTable from "./FirmTable";

export default function Firms() {
  const router = useRouter();   // ✅ ADDED

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // const { data, isLoading, isError } = useGetFirmsQuery();

  // if (isLoading) return <div>Loading...</div>;
  // if (isError) return <div>Error loading firms.</div>;

  // const allFirms: FirmWithDetails[] = data ?? [];
  const allFirms = firmDummyData;

  const totalCount = allFirms.length;
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFirms = allFirms.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <>
      <PageBreadcrumb pageTitle="Manage Firms" />

      <div className="space-y-6">
        <ComponentCard
          title="Firm List"
          desc={`Total ${totalCount} records found.`}
          action={
            <Button
              variant="primary"
              size="sm"
              onClick={() => router.push("/grocery/firm/create")}  // ✅ YOUR PATH ADDED
            >
              + Add Firm
            </Button>
          }
        >
          {/* Firm Table */}
          <FirmTable data={paginatedFirms} />

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </ComponentCard>
      </div>
    </>
  );
}
