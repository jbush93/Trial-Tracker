import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function PatientsChart()
{
  const data = [
    {
      name: 'October',
      men: 110,
      women: 90,
    },
    {
      name: 'November',
      men: 108,
      women: 95,
    },
    {
      name: 'December',
      men: 105,
      women: 100,
    },
    {
      name: 'January',
      men: 95,
      women: 105,
    },
    {
      name: 'February',
      men: 98,
      women: 110,
    },
    {
      name: 'March',
      men: 100,
      women: 105,
    },
    {
      name: 'April',
      men: 105,
      women: 100,
    },

  ];

  return (
    <ResponsiveContainer width="100%" height="70%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 5,
          left: 30,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="men" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="women" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default PatientsChart;
