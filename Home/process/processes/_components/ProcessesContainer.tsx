"use client";

import { useState } from "react";
import { Process } from "../_types/processes.types";
import ProcessForm from "./ProcessForm";
import ProcessTable from "./ProcessTable";

export const ProcessesContainer = () => {
  const [processes, setProcesses] = useState<Process[]>([]);

  const handleAddProcess = (newProcess: Process) => {
    setProcesses((prev) => [...prev, newProcess]);
  };

  return (
    <div className="space-y-6 p-4">
      <h2 className="text-xl font-bold">مدیریت فرآیندها</h2>
      <ProcessForm onAdd={handleAddProcess} />
      <ProcessTable data={processes} />
    </div>
  );
};
