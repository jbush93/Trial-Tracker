import React, { useEffect, useState } from 'react';
import { ScatterChart, Cell, Legend, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { addDays, format } from 'date-fns';

function ChartTwo({ patient_measurements })
{
  console.log(patient_measurements)

  const [currentChartMeasurement, setCurrentChartMeasurement] = useState('')

  const sortedMeasurements = patient_measurements ? patient_measurements.sort((a, b) => new Date(a.date) - new Date(b.date)) : "";


  function formatDate(date)
  {
    const d = new Date(date);
    d.setDate(d.getDate() + 1);
    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
  }

  const filteredPatientMeasurements = sortedMeasurements ? sortedMeasurements.filter((measurement) =>
    measurement.measurement_label === currentChartMeasurement
  ) : "";


  const formattedData = filteredPatientMeasurements ? filteredPatientMeasurements.map((measurement) =>
  {
    const date = new Date(measurement.date).getTime();
    return {
      ...measurement,
      date: formatDate(date),
    };
  }) : "";

  const formattedDataSorted = formattedData ? formattedData.sort((a, b) => a.date - b.date) : "";

  const malePatients = formattedDataSorted ? formattedDataSorted.filter((measurement) => measurement.gender === 'Male') : "";
  const femalePatients = formattedDataSorted ? formattedDataSorted.filter((measurement) => measurement.gender === 'Female') : "";

  const mappedOptions = patient_measurements
    ? [...new Set(patient_measurements.map((measurement) => measurement.measurement_label))]
      .map((measurement_label) => (
        <option value={measurement_label}>{measurement_label}</option>
      ))
    : "";

  function handleMeasurementChange(e)
  {
    setCurrentChartMeasurement(e.target.value)
    console.log(e.target.value)
  }

  return (
    <div className='patient-chart-div'>
      <ScatterChart width={1000} height={400} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <XAxis allowDuplicatedCategory={false} dataKey="date" />
        <YAxis type="number" dataKey="measurement" name={currentChartMeasurement} />
        <CartesianGrid />
        <Tooltip
          cursor={{ strokeDasharray: '3 3' }}
        />
        <Legend payload={[
          { value: 'Male', type: 'circle', id: 'male-scatter', color: 'lightblue' },
          { value: 'Female', type: 'circle', id: 'female-scatter', color: 'pink' },
        ]} />
        <Scatter data={formattedDataSorted} fill="#8884d8" >
          {
            formattedDataSorted ? formattedDataSorted.map((measurement) => (
              <Cell fill={measurement.gender === 'Male' ? 'lightblue' : 'pink'} />
            )) : ""
          }
        </Scatter>
      </ScatterChart>
      <select onChange={handleMeasurementChange}>
        <option>Select Measurement</option>
        {mappedOptions}
      </select>
    </div >
  );
}

export default ChartTwo;