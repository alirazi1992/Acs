"use client";

import { Dialog } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Process } from "../_types/processes.types";
import { v4 as uuidv4 } from "uuid";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (p: Process) => void;
}

export default function ProcessModal({ isOpen, onClose, onAdd }: Props) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Simulate API call (replace with real API endpoint)
      const response = await fetch("/api/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (response.status === 200) {
        const newProcess: Process = {
          id: uuidv4(),
          name,
          description: "",
          modules: [],
        };

        onAdd(newProcess);
        setName("");
        onClose();
      } else {
        setError("در ثبت فرآیند مشکلی پیش آمده است.");
      }
    } catch (err) {
      setError("خطا در اتصال به سرور.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} as={Fragment}>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
        <Dialog.Panel className="bg-white w-full max-w-md p-6 rounded shadow-lg" dir="rtl">
          <Dialog.Title className="text-lg font-bold mb-4 text-right">ثبت فرآیند جدید</Dialog.Title>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-right mb-1">نام فرآیند:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border rounded p-2 text-right"
              />
            </div>

            {error && <p className="text-red-600 text-sm text-right">{error}</p>}

            <div className="flex justify-end gap-2">
              <button type="button" onClick={onClose} className="px-4 py-2 rounded border">
                انصراف
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {loading ? "در حال ثبت..." : "ثبت فرآیند"}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
