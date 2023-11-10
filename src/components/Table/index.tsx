import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import styled from "styled-components";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import CarvanaLogo from "/carvana-logo.png";

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

  img {
    margin-right: 10px;
  }
`;

const Times = styled.div`
  text-align: center;
`;

type Person = {
  order: number;
  combinedPlayers: string;
  cluster: string;
  time: string;
};

const defaultData: Person[] = [
  {
    order: 1,
    combinedPlayers: "Tanner & Linsley",
    cluster: "STC",
    time: "50:00:00",
  },
  {
    order: 2,
    combinedPlayers: "Tandy & Miller",
    cluster: "STC",
    time: "45:30:00",
  },
  {
    order: 3,
    combinedPlayers: "Joe & Bob",
    cluster: "STC",
    time: "21:00:00",
  },
];

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
    cell: (info) => <i>{info.getValue()}</i>,
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

const Table = () => {
  const [data, setData] = useState(() => [...defaultData]);

  const { data: leaderboardData } = useQuery({
    queryKey: ["GET-LEADERBOARD"],
    queryFn: () =>
      axios.get(
        "https://apik.zagforward.com/stc/pricingcache/api/v1/leaderboard/get"
      ),
    ...{
      enabled: true,
      cacheTime: 1000 * 60 * 60,
      refetchOnMount: false,
      select: (res) => res.data?.content,
      staleTime: 1000 * 60 * 30,
      retry: false,
      refetchOnWindowFocus: false,
      retryOnMount: false,
    },
  });

  console.log(leaderboardData);

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
