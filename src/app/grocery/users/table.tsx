import Button from "@/components/atoms/Button";
import Icon from "@/components/atoms/Icon";
import Link from "next/link";

type Props = {
  data: {
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
  }[];
};

const UsersTable = ({ data }: Props) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
      <table className="min-w-full text-sm text-left text-gray-600">
        <thead className="bg-gray-100 text-xs uppercase text-gray-700">
          <tr>
            <th className="px-6 py-3">ID</th>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Role</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((user, index) => (
            <tr
              key={user.id}
              className={`border-t hover:bg-red-150 transition ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
              }`}
            >
              <td className="px-6 py-4 font-medium text-gray-800">
                {user.id}
              </td>

              <td className="px-6 py-4">
                <Link href={`/users/${user.id}`} className="hover:underline">
                  {user.name}
                </Link>
              </td>

              <td className="px-6 py-4">{user.email}</td>

              <td className="px-6 py-4">{user.role}</td>

              <td className="px-6 py-4">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    user.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {user.status}
                </span>
              </td>

              <td className="px-6 py-4 text-center space-x-2">
                <Link href={`/grocery/users/edit/${user.id}`}>
                  <Button
                    size="xs"
                    variant="primary"
                    outline
                    startIcon={<Icon name="PencilIcon" className="w-5 h-5" />}
                  >
                    Edit
                  </Button>
                </Link>

                {/* Delete intentionally skipped (static design only) */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
