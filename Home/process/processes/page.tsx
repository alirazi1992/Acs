"use client";
import MyCustomComponent from "@/Shared/CustomTheme_Mui";
import React, { useState } from "react";
import ProcessesForm, { ProcessItem } from "./ProcessesForm";
import BpmnViewer from "@/components/BpmnViewer";

const ProcessesPage = () => {
  const [list, setList] = useState<ProcessItem[]>([]);
  const [editItem, setEditItem] = useState<ProcessItem | null>(null);

  const addItem = (data: Omit<ProcessItem, "id">) => {
    setList((prev) => [
      ...prev,
      { id: Date.now(), name: data.name, coding: data.coding },
    ]);
  };

  const removeItem = (id: number) => {
    setList((prev) => prev.filter((p) => p.id !== id));
  };

  const editProcess = (p: ProcessItem) => {
    setEditItem(p);
  };

  return (
    <div dir="rtl">
      <MyCustomComponent>
        <ProcessesForm
          processes={list}
          onAdd={addItem}
          onRemove={removeItem}
          onEdit={editProcess}
        />
        <div className="my-4">
          <BpmnViewer url="/sample.bpmn" />
        </div>
      </MyCustomComponent>
    </div>
  );
};

export default ProcessesPage;
