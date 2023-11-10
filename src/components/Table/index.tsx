import styled from "styled-components";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import CarvanaLogo from "/carvana-logo.png";
import type { Person } from "../Leaderboard";

const TableWrapper = styled.div`
  min-height: 480px;
  max-height: 500px;
  overflow-y: scroll;
  background-color: black;
  opacity: 0.8;
  color: white;
  font-family: "formula1";
  border: 1px solid white;
  padding: 10px;

  table {
    width: 100%;

    th,
    td {
      font-size: 30px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }
`;

const RaceResults = styled.div`
  font-family: "formula1-bold";
  text-align: left;
  font-size: 30px;
`;

const Order = styled.div`
  background-color: white;
  color: black;
  text-align: center;
  margin: 0 5px;
`;

const Cluster = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  max-width: 370px;
  white-space: nowrap;
  overflow: hidden !important;
  text-overflow: ellipsis;

  img {
    margin-right: 10px;
  }
`;

const Names = styled.div`
  display: inline-block;
  max-width: 650px;
  white-space: nowrap;
  overflow: hidden !important;
  text-overflow: ellipsis;
`;

const Times = styled.div`
  text-align: center;
`;

const columnHelper = createColumnHelper<Person>();

const columns = [
  columnHelper.accessor((row) => row.order, {
    header: () => null,
    id: "order",
    cell: (info) => <Order>{info.getValue()}</Order>,
  }),
  columnHelper.accessor((row) => row.combinedPlayers, {
    header: () => <RaceResults>RACE RESULTS</RaceResults>,
    id: "players",
    cell: (info) => <Names>{info.getValue()}</Names>,
  }),

  columnHelper.accessor("cluster", {
    id: "cluster",
    header: "Cluster",
    cell: (info) => (
      <Cluster>
        <img src={CarvanaLogo} /> {info.renderValue()}
      </Cluster>
    ),
  }),

  columnHelper.accessor("time", {
    id: "time",
    header: "Time",
    cell: (info) => <Times>{info.renderValue()}</Times>,
  }),
];

const Table = ({ data }: { data: Person[] }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <TableWrapper>
      {data?.length > 0 && (
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
      )}
    </TableWrapper>
  );
};
export default Table;
