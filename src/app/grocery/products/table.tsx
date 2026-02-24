import Button from "@/components/atoms/Button";
import Icon from "@/components/atoms/Icon";
import Link from "next/link";

type Props = {
  data: {
    id: number;
    name: string;
    category: string;
    mrp: number;
    price: number;
    stock: string;
    status: string;
    stockLevel: "ok" | "low";
  }[];
};

const ProductsTable = ({ data }: Props) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
      <table className="min-w-full text-sm text-left text-gray-600">
        <thead className="bg-gray-100 text-xs uppercase text-gray-700">
          <tr>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Category</th>
            <th className="px-6 py-3">MRP</th>
            <th className="px-6 py-3">Price</th>
            <th className="px-6 py-3">Stock</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((product, index) => (
            <tr
              key={product.id}
              className={`border-t hover:bg-red-150 transition ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
              }`}
            >
              <td className="px-6 py-4 font-medium text-gray-800">
                <Link href={`/grocery/products/${product.id}`} className="hover:underline">
                  {product.name}
                </Link>
              </td>

              <td className="px-6 py-4">
                {product.category}
              </td>

              <td className="px-6 py-4">
                {product.mrp}
              </td>

              <td className="px-6 py-4">
                {product.price}
              </td>

              <td className="px-6 py-4">
                {product.stock}
              </td>

              <td className="px-6 py-4">
                {product.stockLevel === "low" ? (
                  <span className="inline-flex items-center gap-1 rounded bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                    Low <span>⚠️</span>
                  </span>
                ) : (
                  <span className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                    Active
                  </span>
                )}
              </td>

              <td className="px-6 py-4 text-center">
                <Link href={`/grocery/products/edit/${product.id}`}>
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
