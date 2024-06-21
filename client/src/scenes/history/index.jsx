import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";

import { useState, useEffect } from "react";
const History = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);

  useEffect(() => {
      fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:4000/history')
      let data1 = await res.json()
      console.log(data1)
      data1 = data1.map(item => {
        return {
          id: [item._id],
          name: [item.name],
          state: [item.state],
          time: [item.time]
        }
      })
      console.log(data1)
      setData(data1)
    } catch (error) {
      console.log(error);
    }
  }

  const columns = [
    { field: 'id', headerName: "ID" },
    {
      field: "time",
      headerName: "Time",
      flex: 1,
      cellClassName: "name-column--cell",
  
    },
    {
      field: "name",
      headerName: "Name Device",
      flex: 1,
    },
    {
      field: "state",
      headerName: "State",
      flex: 1,
      cellClassName: "name-column--cell",
  
    },
  ];

  return (
    <Box m="20px">
      <Header title="HISTORY" subtitle="Manage Fan and Led history" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid   
          checkboxSelection 
          rows={data} 
          columns={columns} 
          components={{ Toolbar: GridToolbar }}
          />
      </Box>
    </Box>
  );
};

export default History;
