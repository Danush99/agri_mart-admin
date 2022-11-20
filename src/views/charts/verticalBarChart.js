import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {faker} from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  legend: {display: false},
  responsive: true,
  plugins:{
      legend:{
          display:false
      },
      title: {
          display: true,
      },
  },
  scales:{x: {title: {text: 'Year',display:true}}, y: {title: {text:'Land%',display:true}, min:0,max: 100,stepSize:1}},

};

const labels = ['2010', '2011', '2012', '2013', '2014', '2015', '2016','2017','2018','2019','2020','2021','2022'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Agricultural land Area',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
      backgroundColor: '#C24256',
    }
  ],
};



export function Vbarchart() {
  return <div id='chart'><Bar options={options} data={data} /></div>;
}
