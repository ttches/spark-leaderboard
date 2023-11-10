import { useState } from "react";
import styled from "styled-components";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const TableWrapper = styled.div`
  height: 520px;
  overflow-y: scroll;
  background-color: black;
  opacity: 0.8;
  color: white;
  font-family: "formula1";
  border: 1px solid white;
  padding: 10px;
`;

type Person = {
  order: number;
  combinedPlayers: string;
  cluster: string;
  time: number;
};

const defaultData: Person[] = [
  {
    order: 1,
    combinedPlayers: "tanner & linsley",
    cluster: "STC",
    time: 50,
  },
  {
    order: 2,
    combinedPlayers: "tandy & miller",
    cluster: "STC",
    time: 80,
  },
  {
    order: 3,
    combinedPlayers: "joe & bob",
    cluster: "STC",
    time: 10,
  },
];

const columnHelper = createColumnHelper<Person>();

const columns = [
  columnHelper.accessor((row) => row.order, {
    header: () => null,
    id: "order",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor((row) => row.combinedPlayers, {
    header: "RACE RESULTS",
    id: "players",
    cell: (info) => <i>{info.getValue()}</i>,
  }),

  columnHelper.accessor("cluster", {
    id: "cluster",
    header: "Cluster",
    cell: (info) => info.renderValue(),
  }),

  columnHelper.accessor("time", {
    id: "time",
    header: "Time",
    cell: (info) => info.renderValue(),
  }),
];

const Table = () => {
  const [data, setData] = useState(() => [...defaultData]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <TableWrapper>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </TableWrapper>
  );
};
export default Table;
