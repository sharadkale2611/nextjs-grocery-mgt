import Button from "@/components/atoms/Button";
import Icon from "@/components/atoms/Icon";
import Link from "next/link";
import { firmApi } from "@/features/firm/index";
import { useState } from "react";
import { closeSnackbar, enqueueSnackbar } from "notistack";


type Props = {
  data: {
    firmId: number;
    firmName: string;
    firmCode?: string;
    address?: string;
    isActive: boolean;
    contactNumber?: string;
    contactPerson?: string;
    logoImagePath?: File | null;
    gstNumber?: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
  }[];
};

const FirmsTable = ({ data }: Props) => {
  const [deleteFirm] = firmApi.useDeleteFirmMutation();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = (firmId: number) => {
    enqueueSnackbar("Are you sure you want to delete this firm?", {
      variant: "warning",
      persist: true,
      action: (snackbarId) => (
        <div className="flex gap-2">
          <Button
            size="xs"
            variant="danger"
            isLoading={deletingId === firmId}
            onClick={async () => {
              try {
                setDeletingId(firmId);
                await deleteFirm(firmId).unwrap();

                enqueueSnackbar("Firm deleted successfully", {
                  variant: "success",
                });
              } catch (err: any) {
                enqueueSnackbar(
                  err?.data?.message || "Failed to delete firm",
                  { variant: "error" }
                );
              } finally {
                setDeletingId(null);
                closeSnackbar(snackbarId);
              }
            }}
          >
            Delete
          </Button>

          <Button
            size="xs"
            variant="default"
            onClick={() => closeSnackbar(snackbarId)}
          >
            Cancel
          </Button>
        </div>
      ),
    });
  };


  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
      <table className="min-w-full text-sm text-left text-gray-600">
        <thead className="bg-gray-100 text-xs uppercase text-gray-700">
          <tr>
            <th className="px-6 py-3">Firm Name</th>
            <th className="px-6 py-3">Firm Code</th>
            <th className="px-6 py-3">Address</th>
            <th className="px-6 py-3">Contact</th>
            <th className="px-6 py-3">GST Number</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((firm, index) => (
            <tr
              key={firm.firmId}
              className={`border-t hover:bg-red-150 transition ${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                }`}
            >
              <td className="px-6 py-4 font-medium text-gray-800">
                <Link
                  href={`/grocery/firms/${firm.firmId}`}
                  className="hover:underline"
                >
                  {firm.firmName}
                </Link>
              </td>

              <td className="px-6 py-4">{firm.firmCode}</td>

              <td className="px-6 py-4">{firm.address}</td>

              <td className="px-6 py-4">{firm.contactNumber}</td>

              <td className="px-6 py-4">{firm.gstNumber}</td>

              <td className="px-6 py-4">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${firm.isActive
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                    }`}
                >
                  {firm.isActive ? "Active" : "Inactive"}
                </span>
              </td>

              <td className="px-6 py-4 text-center gap-2 flex justify-center">
                <Link href={`/grocery/firms/edit/${firm.firmId}`}>
                  <Button
                    size="xs"
                    variant="primary"
                    outline
                    startIcon={
                      <Icon
                        name="PencilIcon"
                        className="w-5 h-5"
                      />
                    }
                  >
                    Edit
                  </Button>
                </Link>


                <Button
                  size="xs"
                  variant="danger"
                  outline
                  onClick={() => handleDelete(firm.firmId)}
                  disabled={deletingId === firm.firmId}
                  startIcon={
                    <Icon
                      name="TrashBinIcon"
                      className="w-5 h-5"
                    />
                  }
                >
                  Delete
                </Button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FirmsTable;
