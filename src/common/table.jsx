import React from "react";
import { Table as RTable } from "reactstrap";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
const Table = (props) => {
  const { data, columns, onSort, sortColumn } = props;
  return (
    <RTable striped responsive bordered>
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody columns={columns} data={data} />
      </RTable>
  );
};
export default Table;
