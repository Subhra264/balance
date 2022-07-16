import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export interface BasicTableColumn {
  id: string
  label: string
  align: 'left' | 'right' | 'center' | 'inherit' | 'justify'
}

interface BasicTableProps {
  columns: Array<BasicTableColumn>
  rows: Array<Record<string, any>>
}

export default function BasicTable(props: BasicTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {
              props.columns.map(column => (
                <TableCell
                  align={column.align}
                  key={column.id}
                  style={{ minWidth: 150 }}
                >
                  {column.label}
                </TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {props.columns.map((column) => {
                //@ts-ignore
                const value = row[column.id];
                return (
                  <TableCell key={column.id} align={column.align}>
                    {value}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
