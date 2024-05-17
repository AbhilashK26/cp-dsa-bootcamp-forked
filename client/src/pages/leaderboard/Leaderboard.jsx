import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'Rank', width: 90 },
  {
    field: 'username',
    headerName: 'Username',
    width: 150
  },
  {
    field: 'Year',
    headerName: 'Year',
    width: 110
  },
  {
    field: 'Contests',
    headerName: 'Contests given',
    width: 150
  },
  {
    field: 'CFRating',
    headerName: 'CF Rating',
    width: 150
  },
  {
    field: 'CF-best-Rating',
    headerName: 'CF best Rating',
    width: 150
  },
  {
    field: 'LCRating',
    headerName: 'LC Rating',
    width: 150
  },
  {
    field: 'LC-best-Rating',
    headerName: 'LC best Rating',
    width: 150
  },
  {
    field: 'LC-best-Rating',
    headerName: 'LC best Rating',
    width: 150
  },
  
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

function DataGridDemo() {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}


const Leaderboard = () => {
  return (
    <DataGridDemo />
  )
}

export default Leaderboard