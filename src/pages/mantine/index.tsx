import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";

import MainLayout from "../layout";
import { api } from "@/utils/api";

import { Button, TextInput } from "@mantine/core";

import {
  type ColumnDef,
  type SortingState,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpIcon,
  MagnifyingGlassIcon,
  Pencil1Icon,
  PlusIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "@/components/ui/data-table";
import { DataTablePagination } from "@/components/ui/pagination";
import { notifications } from "@mantine/notifications";

type TableType = {
  id: string;
  name: string;
  email: string;
  website: string | null;
  location: string;
  experience: string;
  topProductsServicesCategories: string;
};

const MantineIndex = () => {
  const router = useRouter();

  const [rowSelection, setRowSelection] = useState<Record<number, boolean>>({});
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sorting, setSorting] = useState<SortingState>([]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const { data: allStepperForm, refetch } =
    api.stepper.getAllStepperForm.useQuery();

  const { mutate: deleteMultipleStepperForm } =
    api.stepper.deleteMultipleStepperForm.useMutation({
      onSuccess: () => {
        void refetch();
        notifications.show({
          title: "Deleted Successfully",
          message: "Form has been deleted successfully!",
          color: "green",
        });
      },
      onError: (error) => {
        console.log("Error deleting stepper form", error);
        notifications.show({
          title: "Deletion Unsuccessful",
          message: "Form has been failed to delete!",
          color: "red",
        });
      },
    });

  const data = useMemo(
    () =>
      allStepperForm?.map((data) => {
        const { id, companyOverview, brandDetails, socialMedia } = data;

        return {
          id,
          name: companyOverview.companyName,
          email: companyOverview.companyEmail,
          website: companyOverview.companyWebsite,
          location: brandDetails.location,
          experience: brandDetails.age,
          topProductsServicesCategories:
            socialMedia.topProductsServicesCategories,
        };
      }) ?? [],
    [allStepperForm]
  );

  const columns: ColumnDef<TableType>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          className="border-custom-blue"
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value);
            const allIds = data.map((row) => row.id);
            setSelectedRowIds(table.getIsAllPageRowsSelected() ? [] : allIds);
          }}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          className="border-custom-blue"
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
            const rowOriginal = row.original;
            const rowId = rowOriginal.id;
            if (value) {
              setSelectedRowIds(
                (prevSelectedRowIds) =>
                  [...prevSelectedRowIds, rowId] as string[]
              );
            } else {
              setSelectedRowIds((prevSelectedRowIds) =>
                prevSelectedRowIds.filter((id) => id !== rowId)
              );
            }
          }}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="mx-3 pl-0 uppercase text-black-1 md:mx-0"
          >
            Organization Name
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      accessorKey: "name",
    },
    {
      header: () => {
        return (
          <Button variant="ghost" className="pl-0 uppercase text-black-1">
            Email
          </Button>
        );
      },
      accessorKey: "email",
    },
    {
      header: () => {
        return (
          <Button variant="ghost" className="pl-0 uppercase text-black-1">
            Website
          </Button>
        );
      },
      accessorKey: "website",
    },
    {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="pl-0 uppercase text-black-1"
          >
            Experience
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      accessorKey: "experience",
    },
    {
      header: () => {
        return (
          <Button variant="ghost" className="pl-0 uppercase text-black-1">
            Location
          </Button>
        );
      },
      accessorKey: "location",
    },
    {
      header: () => {
        return (
          <Button variant="ghost" className="pl-0 uppercase text-black-1">
            Top Products, Services & Categories
          </Button>
        );
      },
      accessorKey: "topProductsServicesCategories",
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const stepper = row.original;

        return (
          <Pencil1Icon
            className="h-4 w-4 cursor-pointer"
            onClick={() => {
              void router.push(`/mantine/update/${stepper.id}`);
            }}
          />
        );
      },
    },
  ];

  const filterData = (data: TableType[], query: string) => {
    if (!query) return data;

    query = query.toLowerCase();

    return data.filter((stepper) => {
      return (
        (typeof stepper.name === "string" &&
          stepper.name.toLowerCase().includes(query)) ||
        (typeof stepper.email === "string" &&
          stepper.email.toLowerCase().includes(query)) ||
        (typeof stepper.location === "string" &&
          stepper.location.toLowerCase().includes(query)) ||
        (typeof stepper.website === "string" &&
          stepper.website.toLowerCase().includes(query)) ||
        (typeof stepper.topProductsServicesCategories === "string" &&
          stepper.topProductsServicesCategories.toLowerCase().includes(query))
      );
    });
  };

  const handleDeleteStepperFormData = (ids: string[]) => {
    deleteMultipleStepperForm({
      ids: ids,
    });
    setSelectedRowIds([]);
  };

  const filteredData = useMemo(() => {
    return filterData(data, searchQuery);
  }, [data, searchQuery]);

  const table = useReactTable({
    data: filteredData,
    columns: columns,
    enableRowSelection: true,
    state: {
      rowSelection,
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <MainLayout>
      <div className="flex justify-between pt-7 basis-9">
        <div className="flex gap-2 justify-between">
          <button onClick={() => handleDeleteStepperFormData(selectedRowIds)}>
            <TrashIcon color="black" className="w-6 h-6" />
          </button>
          <TextInput
            value={searchQuery}
            onChange={handleSearchChange}
            rightSection={<MagnifyingGlassIcon color="black" />}
          />
        </div>
        <Button
          className="w-fit text-end hover:bg-black bg-black"
          onClick={() => router.push("/mantine/new")}
        >
          <div className="flex items-center gap-2">
            <PlusIcon />
            <p>Create New</p>
          </div>
        </Button>
      </div>
      <div className="flex flex-1 flex-col overflow-y-scroll text-black ">
        <DataTable table={table} columns={columns} />
      </div>
      <DataTablePagination table={table} />
    </MainLayout>
  );
};

export default MantineIndex;
