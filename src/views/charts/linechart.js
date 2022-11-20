import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import {faker} from '@faker-js/faker';
import { growtharea } from "./Data/worldBank_historical";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function Linechart() {

  let labels2=[]
  let values=[]
  for(let i=0;i<growtharea.length;i++){
    const year = growtharea[i].date
    labels2.push(year.substring(0,7));
    values.push(Number((growtharea[i].value).toFixed(1)));
    
  }

  const options = {
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
    scales:{x: {title: {text: 'Month',display:true}}, y: {title: {text:'Harvest (t)',display:true}, min:0,max: 1000,stepSize:100}},
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July','Augest','September','Octorber','November','December'];

const data = {
  labels,
  datasets: [
    {
      label: '2022',
      data: labels.map(() => faker.datatype.number({ min:0, max: 1000 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: '2021',
      data: labels.map(() => faker.datatype.number({ min:0, max: 1000 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

  return <div id='chart'><Line options={options} data={data} /></div>
}
