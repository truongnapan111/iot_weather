import {useEffect, useState} from 'react'
import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";

const Analysis = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([])

  useEffect(() => {
    let intervalId;
    async function fetch(data) {
      let newData = await fetchData();
      newData = {
            id: newData ? newData.map(item => item._id) : '',
            time: newData ? newData.map(item => item.time) : '',      
            temp: newData ? newData.map(item => item.temperature) : '',
            hum: newData ? newData.map(item => item.humidity) : '',
            light: newData ? newData.map(item => item.light) : '',
          };
      
      intervalId = setTimeout(() => {
        const isExisted = data?.find((it) => it?.id?.[0] === newData?.id?.[0]);
        if (!isExisted) setData([newData, ...data]);
        else setData([...data]);
        console.log(data)
      }, 5000)
    }
    fetch(data); 
    return () => {
      clearTimeout(intervalId);
    };
  }, [data])

const fetchData = async () => {
  try {
    const res = await fetch('http://localhost:4000/analysis')
    let data1 = await res.json()
    console.log(data1)
    data1 = data1.map(item => {
      return {
        id: [item._id],
        time: [item.time],
        temp: [item.temperature],
        hum: [item.humidity],
        light: [item.light]
      }
    })
    console.log(data1)
    setData(data1)
  } catch (error) {
    console.log(error);
  }
}

  const columns = [
    { field:'id' , headerName: "ID" },
    {
      field:'time',
      headerName: "Time",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field:'temp',
      headerName: "Temperature( C )",
      flex: 1,
    },
    {
      field:'hum',
      headerName: "Humidity( % )",
      flex: 1,
    },
    {
      field:'light',
      headerName: "Light( A )",
      flex: 1,
    },
  ] ;

  return (
    <Box m="20px">
      <Header title="ANALYSIS" subtitle="List Data" />
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
          rows={data} 
          checkboxSelection 
          columns={columns} 
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Analysis;