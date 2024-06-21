import { tokens } from "../theme";
import {useEffect, useState} from 'react'


export const mockDataAnalysis = [
  {
    id:1,
    time: "00:01",
    temperature: 4,
    humidity: 10,
    light: 10,
    led: "on-led",
    fan: "off-fan"
  },
  {
    id:2,
    time: "00:02",
    temperature: 3,
    humidity: 18,
    light: 1,
    led: "off-led",
    fan: "on-fan"
  },
  {
    id:3,
    time: "00:03",
    temperature: 9,
    humidity: 20,
    light: 10,
    led: "on-led",
    fan: "on-fan"
  },
  {
    id:4,
    time: "00:04",
    temperature: 44,
    humidity: 58,
    light: 3,
    led: "off-led",
    fan: "off-fan"
  },
  {
    id:5,
    time: "00:05",
    temperature: 54,
    humidity: 60,
    light: 13,
    led: "on-led",
    fan: "on-fan"
  },
  {
    id:6,
    time: "00:06",
    temperature: 40,
    humidity: 90,
    light: 7,
    led: "on-led",
    fan: "off-fan"
  },
  {
    id:7,
    time: "00:07",
    temperature: 44,
    humidity: 64,
    light: 12,
    led: "on-led",
    fan: "on-fan"
  },
  {
    id:8,
    time: "00:08",
    temperature: 41,
    humidity: 16,
    light: 19,
    led: "off-led",
    fan: "on-fan"
  },
  {
    id:9,
    time: "00:09",
    temperature: 34,
    humidity: 21,
    light: 5,
    led: "on-led",
    fan: "on-fan"
  },
  {
    id:10,
    time: "00:10",
    temperature: 23,
    humidity: 17,
    light: 8,
    led: "off-led",
    fan: "off-fan"
  },
];

export const mockLineData = [
  {
    id: "Light",
    color: tokens("dark").greenAccent[500],
    data: [
      {
        x: "1",
        y: RanDomNumBer(1,100),
      },
      {
        x: "2",
        y: RanDomNumBer(1,100),
      },
      {
        x: "3",
        y: RanDomNumBer(1,100),
      },
      {
        x: "4",
        y: RanDomNumBer(1,100),
      },
      {
        x: "5",
        y: RanDomNumBer(1,100),
      },
      {
        x: "6",
        y: RanDomNumBer(1,100),
      },
      {
        x: "7",
        y: RanDomNumBer(1,100),
      },
      {
        x: "8",
        y: RanDomNumBer(1,100),
      },
      {
        x: "9",
        y: RanDomNumBer(1,100),
      },
      {
        x: "10",
        y: RanDomNumBer(1,100),
      },
      {
        x: "11",
        y: RanDomNumBer(1,100),
      },
      {
        x: "12",
        y: RanDomNumBer(1,100),
      },
    ],
  },
  {
    id: "Humidity",
    color: tokens("dark").blueAccent[300],
    data: [
      {
        x: "1",
        y: RanDomNumBer(1,100),
      },
      {
        x: "2",
        y: RanDomNumBer(1,100),
      },
      {
        x: "3",
        y: RanDomNumBer(1,100),
      },
      {
        x: "4",
        y: RanDomNumBer(1,100),
      },
      {
        x: "5",
        y: RanDomNumBer(1,100),
      },
      {
        x: "6",
        y: RanDomNumBer(1,100),
      },
      {
        x: "7",
        y: RanDomNumBer(1,100),
      },
      {
        x: "8",
        y: RanDomNumBer(1,100),
      },
      {
        x: "9",
        y: RanDomNumBer(1,100),
      },
      {
        x: "10",
        y: RanDomNumBer(1,100),
      },
      {
        x: "11",
        y: RanDomNumBer(1,100),
      },
      {
        x: "12",
        y: RanDomNumBer(1,100),
      },
    ],
  },
  {
    id: "Temperature",
    color: tokens("dark").redAccent[200],
    data: [
      {
        x: "1",
        y: RanDomNumBer(1,100),
      },
      {
        x: "2",
        y: RanDomNumBer(1,100),
      },
      {
        x: "3",
        y: RanDomNumBer(1,100),
      },
      {
        x: "4",
        y: RanDomNumBer(1,100),
      },
      {
        x: "5",
        y: RanDomNumBer(1,100),
      },
      {
        x: "6",
        y: RanDomNumBer(1,100),
      },
      {
        x: "7",
        y: RanDomNumBer(1,100),
      },
      {
        x: "8",
        y: RanDomNumBer(1,100),
      },
      {
        x: "9",
        y: RanDomNumBer(1,100),
      },
      {
        x: "10",
        y: RanDomNumBer(1,100),
      },
      {
        x: "11",
        y: RanDomNumBer(1,100),
      },
      {
        x: "12",
        y: RanDomNumBer(1,100),
      },
    ],
  },
];

function RanDomNumBer(min, max){
  return Math.floor(Math.random() * (max - min)) + min;
}

