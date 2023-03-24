import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

function GenderChart({ trial })
{
    console.log(trial)

    const { patients } = trial

    const malePatients = patients.filter(patient => patient.gender === 'Male');
    const femalePatients = patients.filter(patient => patient.gender === 'Female');

    const data = [
        { name: 'Male', value: malePatients.length },
        { name: 'Female', value: femalePatients.length },
    ];

    const COLORS = ['#0088FE', '#82ca9d', '#CCCCCC'];


    return (
        <div style={{ minHeight: 250, paddingTop: 10, display: 'flex' }}>
            <ResponsiveContainer>
                <PieChart width={500} height={500}>
                    <Pie
                        data={data}
                        cx={200}
                        cy={200}
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {
                            data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))
                        }
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div >
    );
}

export default GenderChart;