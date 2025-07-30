"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Grid, IconButton, TextField } from "@mui/material";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export type ProcessItem = {
  id: number;
  name: string;
  coding: string;
};

type Props = {
  processes: ProcessItem[];
  onAdd: (p: Omit<ProcessItem, "id">) => void;
  onRemove: (id: number) => void;
  onEdit: (p: ProcessItem) => void;
};

const schema = yup.object({
  name: yup.string().required(),
  coding: yup.string().required(),
});

const ProcessesForm = ({ processes, onAdd, onRemove, onEdit }: Props) => {
  const methods = useForm<{ name: string; coding: string }>({
    resolver: yupResolver(schema),
  });

  const { handleSubmit, reset } = methods;

  const submit = (data: { name: string; coding: string }) => {
    onAdd(data);
    reset();
  };

  return (
    <FormProvider {...methods}>
      <Box component="form" onSubmit={handleSubmit(submit)} sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="Name" fullWidth {...methods.register("name")}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Coding" fullWidth {...methods.register("coding")}/>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained">
              Add
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ p: 2 }}>
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2">Name</th>
              <th className="px-2">Coding</th>
              <th className="px-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {processes.map((p) => (
              <tr key={p.id} className="odd:bg-gray-100">
                <td className="px-2">{p.name}</td>
                <td className="px-2">{p.coding}</td>
                <td className="px-2">
                  <IconButton onClick={() => onEdit(p)} size="small">
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton onClick={() => onRemove(p.id)} size="small">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </FormProvider>
  );
};

export default ProcessesForm;
