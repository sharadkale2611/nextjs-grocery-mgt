import Button from "@/components/atoms/Button";
import Icon from "@/components/atoms/Icon";
import Link from "next/link";

type Props = {
  data: {
    id: number;
    roleName: string;
    description: string;
    status: string;
  }[];
};

const RolesTable = ({ data }: Props) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
      <table className="min-w-full text-sm text-left text-gray-600">
        <thead className="bg-gray-100 text-xs uppercase text-gray-700">
          <tr>
            <th className="px-6 py-3">ID</th>
            <th className="px-6 py-3">Role Name</th>
            <th className="px-6 py-3">Description</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((role, index) => (
            <tr
              key={role.id}
              className={`border-t hover:bg-red-150 transition ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
              }`}
            >
              <td className="px-6 py-4 font-medium text-gray-800">
                {role.id}
              </td>

              <td className="px-6 py-4">
                <Link
                  href={`/roles/${role.id}`}
                  className="hover:underline"
                >
                  {role.roleName}
                </Link>
              </td>

              <td className="px-6 py-4">
                {role.description}
              </td>

              <td className="px-6 py-4">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    role.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {role.status}
                </span>
              </td>

              <td className="px-6 py-4 text-center space-x-2">
                <Link href={`/roles/edit/${role.id}`}>
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

                {/* Static design – delete intentionally omitted */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RolesTable;
