import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

const Chart = ({a}) => {
    const temp = a.length === 6 ? a.map(item =>  item.temperature) : [0,0,0,0,0,0]
    const hum = a.length === 6 ? a.map(item => item.humidity) : [0,0,0,0,0,0] 
    const light = a.length === 6  ? a.map(item =>item.light) : [0,0,0,0,0,0]
    const time = a.length === 6  ? a.map(item =>item.time) : [0,0,0,0,0,0]
    
    return (
        <LineChart
            // width={800}
            // height={270}
            margin={{ top: 60, right: 55, bottom: 50, left: 60 }}
            series={[
                { data: temp, label: 'Temperature' },
                { data: hum, label: 'Humidity' },
                { data: light, label: 'Light' },
            ]}
            xAxis={[{ scaleType: 'point', data: time }]}
        />
    )

}
export default Chart;