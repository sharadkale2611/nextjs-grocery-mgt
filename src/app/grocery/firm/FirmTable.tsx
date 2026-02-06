"use client";

// import { Firm } from "@/data/firmDummyData";

export type Firm = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
};

export const firmDummyData: Firm[] = [
  { id: 1, name: "ABC Pvt Ltd", email: "abc@gmail.com", phone: "9876543210", address: "Pune" },
  { id: 2, name: "XYZ Industries", email: "xyz@gmail.com", phone: "8765432109", address: "Mumbai" },
  { id: 3, name: "Tech Solutions", email: "tech@gmail.com", phone: "7654321098", address: "Nagpur" },
  { id: 4, name: "Global Traders", email: "global@gmail.com", phone: "6543210987", address: "Nashik" },
  { id: 5, name: "Smart Corp", email: "smart@gmail.com", phone: "5432109876", address: "Pune" },
];


type Props = {
  data: Firm[];
};

export default function FirmTable({ data }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left border">ID</th>
            <th className="px-4 py-2 text-left border">Name</th>
            <th className="px-4 py-2 text-left border">Email</th>
            <th className="px-4 py-2 text-left border">Phone</th>
            <th className="px-4 py-2 text-left border">Address</th>
          </tr>
        </thead>
        <tbody>
          {data.map((firm) => (
            <tr key={firm.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border">{firm.id}</td>
              <td className="px-4 py-2 border">{firm.name}</td>
              <td className="px-4 py-2 border">{firm.email}</td>
              <td className="px-4 py-2 border">{firm.phone}</td>
              <td className="px-4 py-2 border">{firm.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
