"use client";

import { Process } from "../_types/processes.types";

interface Props {
  data: Process[];
  onDelete: (id: string) => void;
}

export default function ProcessTable({ data, onDelete }: Props) {
  if (data.length === 0) {
    return <div className="p-4 border rounded bg-gray-50 text-gray-600 text-center">هیچ فرآیندی ثبت نشده است.</div>;
  }

  return (
    <div className="overflow-x-auto border rounded shadow">
      <table className="min-w-full text-right">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border-b font-semibold">نام فرآیند</th>
            <th className="px-4 py-2 border-b font-semibold">توضیحات</th>
            <th className="px-4 py-2 border-b font-semibold">ماژول‌ها</th>
            <th className="px-4 py-2 border-b font-semibold">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {data.map((proc) => (
            <tr key={proc.id} className="bg-white border-t hover:bg-gray-50">
              <td className="px-4 py-2">{proc.name}</td>
              <td className="px-4 py-2">{proc.description}</td>
              <td className="px-4 py-2">
                <ul className="list-disc pr-4">
                  {proc.modules.map((mod, idx) => (
                    <li key={idx}>
                      <span className="font-medium">{mod.title}</span> — {mod.owner}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="px-4 py-2 space-x-2 space-y-1 flex flex-wrap">
                <button
                  className="text-red-600 border border-red-600 px-2 py-1 rounded hover:bg-red-100"
                  onClick={() => onDelete(proc.id)}
                >
                  حذف
                </button>
                <button className="text-blue-600 border border-blue-600 px-2 py-1 rounded hover:bg-blue-100">
                  ویرایش
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
