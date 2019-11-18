import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';

export const CustomTableHead = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Word</TableCell>
        <TableCell>Transcription</TableCell>
        <TableCell>Translation</TableCell>
        <TableCell>Actions</TableCell>
      </TableRow>
    </TableHead>
  );
}
