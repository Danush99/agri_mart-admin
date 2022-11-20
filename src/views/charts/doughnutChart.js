import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export function Doughnutt() {
    const state = {
        labels: ["Rice", "Beets", "Radish", "Tomatoes", "Carrots"],
        datasets: [{
            data: [8000, 3000, 1000, 5000, 1500],
            backgroundColor: [
                "#94A94B",
                "#23894A",
                "#452389",
                "#851970",
                "#A63344"
            ],
            hoverBorderColor: [
                "#94A94B",
                "#23894A",
                "#452389",
                "#851970",
                "#A63344"
            ],
            hoverBackgroundColor: [
                "#94A94B",
                "#23894A",
                "#452389",
                "#851970",
                "#A63344"
            ],
            hoverBorderWidth: 4,
            offset: 20,
            borderRadius: 2
        }]
    };
    const options = {
        cutoutPercentage: 20,
        responsive: true,
        plugins: {
            legend: {
                display: false
            }
        },
        //custom tooltip
        tooltips: {
            callbacks: {
                title: (items, data) => {
                    let x = Math.ceil(
                        data.datasets[items[0].datasetIndex].data[items[0].index]
                    );
                    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                },
                label: (items, data) => data.labels[items.index]
            },
    
            backgroundColor: "#FFF",
            borderColor: "rgb(0,0,0)",
            titleFontSize: 14,
            titleFontColor: "#000",
            bodyFontColor: "#000",
            bodyFontSize: 10,
            displayColors: true
        }
    };
    return <div id='chart'><Doughnut data = { state }
    options = { options }
    /></div>
}