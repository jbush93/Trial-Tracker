import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function TrialsChart({ trials })
{
  const phases = trials.map(function (trial)
  {
    return trial.phase
  }
  )

  const counts = phases.reduce((acc, curr) =>
  {
    if (typeof acc[curr] === 'undefined') {
      acc[curr] = 1;
    } else {
      acc[curr]++;
    }

    return acc;
  }, {});

  const data = Object.keys(counts).map(phase => ({ name: phase, count: counts[phase] }));

  const COLORS = ['#e56b6f', '#b56576', '#6d597a', '#355070', "#eaac8b"];

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) =>
  {
    const RADIAN = Math.PI / 180;
    const radius = 25 + innerRadius + (outerRadius - innerRadius);
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#8884d8"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div style={{ height: 250, display: 'flex' }}>
      <ResponsiveContainer width="100%" height="70%">
        <PieChart>
          <Pie
            data={data}
            cx='50%'
            cy='50%'
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="count"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend verticalAlign="middle" align="right" layout="vertical" />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );


}

export default TrialsChart;

