import React, { useState, useEffect } from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import LightModeIcon from '@mui/icons-material/LightMode';
import FlashlightOnIcon from '@mui/icons-material/FlashlightOn';
import FlashlightOffIcon from '@mui/icons-material/FlashlightOff';
import WindPowerIcon from '@mui/icons-material/WindPower';
import ModeFanOffIcon from '@mui/icons-material/ModeFanOff';
import Header from "../../components/Header";
import LineChart from "../../components/Chart"
import StatBox from "../../components/StatBox";

import mqtt from "mqtt/dist/mqtt";
// CONNECT MQTT
const mqttClient = mqtt.connect('ws://broker.emqx.io:8083/mqtt');
mqttClient.on('connect', () => {
    console.log('CONNECT MQTT')
  }); 
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState()
  const [test, setTest] = useState([])
  console.log(test.map(item => item[0]));
  const a = test ? (test.slice(-6).map(item => item ? item[0] : {createdAt: '', humidity: 0, light: 0, temperature: 0, time: ''})) : []
  // FAN CONTROL
  const defaultIsFanOn = localStorage.getItem('isFanOn') === 'true';
  const [isFanOn, setIsFanOn] = useState(defaultIsFanOn);
  const toggleFan = () => {
    if (mqttClient) {
        const message = isFanOn ? 'off-fan' : 'on-fan';
        mqttClient.publish('controlFan', message);
        console.log(message)
        setIsFanOn(!isFanOn);
        localStorage.setItem('isFanOn', !isFanOn);
    }
  };
  
  // LED CONTROL
  const defaultIsLedOn = localStorage.getItem('isLedOn') === 'true';
  const [isLedOn, setIsLedOn] = useState(defaultIsLedOn);
  const toggleLed = () => {
    if (mqttClient) {
        const message = isLedOn ? 'off-led' : 'on-led';
        mqttClient.publish('controlLed', message);
        console.log(message)
        setIsLedOn(!isLedOn);
        localStorage.setItem('isLedOn', !isLedOn);
    }
    
  };
// COUNT ON LED-FAN
//   const [totalLedOn, setTotalLedOn] = useState(0)
//   const [totalFanOn, setTotalFanOn] = useState(0)
  
//   const getTotalOnLed = async () => {
//     const res = await fetch('http://localhost:4000/abc')
//         .then((res) => res.json()
//         )
//         .then((data) => {
//           const countLed = data.filter(i => i.state === "on-led")
//           const countFan = data.filter(i => i.state === "on-fan")
//           console.log(data,'abc')
//           // console.log(countLed,'XYX')
//           setTotalLedOn(countLed.length);
//           setTotalFanOn(countFan.length);

//         });
// };
  useEffect(() => {
    // getTotalOnLed()
    const intervalId = setInterval(() => {
      fetchData()
    }, 5000); 
    return () => {
      clearInterval(intervalId);
    };
  }, [data])
  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:4000')
      const data = await res.json()
      setData(data)
      setTest(state => [...state, data])
    } catch (error) {
      console.log(error);
    }
  }
  const temp = data?.map(item => item.temperature)
  const hum = data?.map(item => item.humidity)
  const light = data?.map(item => item.light)
  
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 4"
          // backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          backgroundColor={
              temp < 30 
              ? colors.greenAccent[900] 
              : temp > 50
              ? colors.redAccent[600]
              : colors.redAccent[700]
            }
        >
          <StatBox
            title={data?.map(item => item.temperature + " ºC") ?? ''}
            subtitle="Temperature"
            progress="0.75"
            
            icon={
              <DeviceThermostatIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 4"
          // backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          backgroundColor={
            hum < 33 
            ? colors.blueAccent[900] 
            : hum > 77
            ? colors.blueAccent[300]
            : colors.blueAccent[600]
          }
        >
          <StatBox
            title={data?.map(item => item.humidity) + " %" ?? ''}
            subtitle="Humidity"
            progress="0.50"
            icon={
              <CloudQueueIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 4"
          // backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          backgroundColor={
            light < 33 
            ? colors.yellow[900] 
            : light > 77
            ? colors.yellow[300]
            : colors.yellow[600]
          }
        >
          <StatBox
            title={data?.map(item => item.light) + " lux" ?? ''}
            subtitle="Light"
            progress="0.30"
            icon={
              <LightModeIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.grey[100]}
              >
                AIR CHART
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            {/* <LineChart isDashboard={true} /> */}
            <LineChart a={a} />
            
          </Box>
        </Box>
        {/* CONTROL */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box sx={{ width: '100%' }}>
            {/* Số lần bật Led: {totalLedOn} */}
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              marginBottom="70px"
              marginTop="60px"
              boxShadow=""   
            >
              
              <Typography variant="h1" color="#d32f2f" marginRight="20px" fontWeight="1000" fontSize="50px">LED</Typography> 
              <Button
                  variant="contained"
                  color={isLedOn ? 'error' : 'secondary'}
                  onClick={toggleLed}
              >
                { isLedOn }
                  {isLedOn ? <FlashlightOnIcon sx={{ fontSize: "40px", color: "#333" }}/> : <FlashlightOffIcon sx={{ fontSize: "40px" }}/>}
              </Button>
            </Box>
            {/* Số lần bật Fan: {totalFanOn} */}
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              marginBottom="70px"
              marginTop="70px"   
            >
              
              <Typography variant="h1" color="#d32f2f" marginRight="20px" fontWeight="1000" fontSize="50px">FAN</Typography> 
              <Button
                  variant="contained"
                  color={isFanOn ? 'error' : 'secondary'}
                  onClick={toggleFan}
              >
                {isFanOn ? <WindPowerIcon sx={{ fontSize: "40px", color: "#333" }}/> : <ModeFanOffIcon sx={{ fontSize: "40px" }}/>}
              </Button>
            </Box>
            {/* LED 2 */}

            {/* <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              marginBottom="70px"
              marginTop="60px"
              boxShadow=""   
            >
              <Typography variant="h1" color="#d32f2f" marginRight="20px" fontWeight="1000" fontSize="50px">LED 2</Typography> 
              <Button
                  variant="contained"
                  color={(data?.map(item => item.light)) < 50 ? 'error' : 'secondary'}
                  // onChange={toggleLed2}
              >
                { (data?.map(item => item.light)) < 50 }
                  {(data?.map(item => item.light)) < 50 ? <FlashlightOnIcon sx={{ fontSize: "40px", color: "#333" }}/> : <FlashlightOffIcon sx={{ fontSize: "40px" }}/>}
              </Button>
            </Box> */}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
