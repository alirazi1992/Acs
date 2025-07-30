"use client";

import { useEffect, useState } from "react";
import { Process } from "../_types/processes.types";
import ProcessTable from "./ProcessTable";
import ProcessModal from "./ProcessModal";

export const ProcessesContainer = () => {
  const [allProcesses, setAllProcesses] = useState<Process[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [showModal, setShowModal] = useState(false);

  const handleAddProcess = (newProcess: Process) => {
    setAllProcesses((prev) => [{ ...newProcess }, ...prev]);
    setShowModal(false);
    setCurrentPage(1); // Reset to first page
  };

  const handleDelete = (id: string) => {
    // Simulate API call
    setAllProcesses((prev) => prev.filter((p) => p.id !== id));
  };

  const filteredProcesses = allProcesses.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const paginatedProcesses = filteredProcesses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalPages = Math.ceil(filteredProcesses.length / itemsPerPage);

  return (
    <div className="space-y-6 p-4 bg-white rounded shadow-md">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">مدیریت فرآیندها</h2>
        <button onClick={() => setShowModal(true)} className="bg-blue-600 text-white px-4 py-2 rounded">
          ➕ افزودن فرآیند
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="جستجو..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border px-3 py-2 rounded w-full max-w-sm"
        />
        <button onClick={() => setCurrentPage(1)} className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded">
          جستجو
        </button>
      </div>

      {/* Table */}
      <ProcessTable data={paginatedProcesses} onDelete={handleDelete} />

      {/* Pagination */}
      <div className="flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 rounded border ${page === currentPage ? "bg-blue-600 text-white" : "bg-white"}`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Modal */}
      <ProcessModal isOpen={showModal} onClose={() => setShowModal(false)} onAdd={handleAddProcess} />
    </div>
  );
};
