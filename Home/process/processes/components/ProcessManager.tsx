'use client';
import React, { useState } from 'react';
import MyCustomComponent from '@/Shared/CustomTheme_Mui';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, CardBody, Input } from '@material-tailwind/react';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Th, Td, ActionButton, Icon } from '@/Shared/TableComponent';
import { ProcessForm } from '../_types/processes.types';

const schema = yup.object({
  name: yup.string().required('Required'),
  coding: yup.string().required('Required'),
}).required();

const ProcessManager = () => {
  const [items, setItems] = useState<ProcessForm[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<ProcessForm>({
    defaultValues: { name: '', coding: '', id: 0 },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: ProcessForm) => {
    if (editIndex === null) {
      setItems(prev => [...prev, { ...data, id: Date.now() }]);
    } else {
      setItems(prev => prev.map((it, idx) => idx === editIndex ? { ...it, ...data } : it));
      setEditIndex(null);
    }
    reset({ name: '', coding: '', id: 0 });
  };

  const handleEdit = (index: number) => {
    const item = items[index];
    setValue('name', item.name);
    setValue('coding', item.coding);
    setEditIndex(index);
  };

  const handleDelete = (index: number) => {
    setItems(prev => prev.filter((_, idx) => idx !== index));
    if (editIndex === index) {
      reset({ name: '', coding: '', id: 0 });
      setEditIndex(null);
    }
  };

  return (
    <div dir="rtl" className="w-full">
      <MyCustomComponent>
        <CardBody className="w-[98%] mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-2 items-start">
            <div className="flex flex-col w-full md:w-1/3">
              <Input {...register('name')} label="name" crossOrigin="" />
              {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
            </div>
            <div className="flex flex-col w-full md:w-1/3">
              <Input {...register('coding')} label="coding" crossOrigin="" />
              {errors.coding && <span className="text-red-500 text-xs">{errors.coding.message}</span>}
            </div>
            <Button type="submit" size="sm" className="p-1">
              <AddIcon className="p-1" />
            </Button>
          </form>
        </CardBody>
        {items.length > 0 && (
          <CardBody className="w-[98%] mx-auto overflow-auto p-0">
            <table className="table-auto w-full text-center">
              <thead>
                <tr>
                  <Th value="#" />
                  <Th value="name" />
                  <Th value="coding" />
                  <Th value="actions" />
                </tr>
              </thead>
              <tbody>
                {items.map((it, idx) => (
                  <tr key={it.id} className="divide-y">
                    <Td value={idx + 1} />
                    <Td value={it.name} />
                    <Td value={it.coding} />
                    <Td
                      value={
                        <div className="flex justify-center">
                          <ActionButton onClick={() => handleEdit(idx)}>
                            <Icon Name={EditIcon} />
                          </ActionButton>
                          <ActionButton onClick={() => handleDelete(idx)}>
                            <Icon Name={DeleteIcon} />
                          </ActionButton>
                        </div>
                      }
                    />
                  </tr>
                ))}
              </tbody>
            </table>
          </CardBody>
        )}
      </MyCustomComponent>
    </div>
  );
};

export default ProcessManager;
