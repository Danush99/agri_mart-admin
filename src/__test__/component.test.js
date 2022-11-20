import React from "react";
import { ReactDOM } from "react";
import '@testing-library/jest-dom'
import {render,screen} from '@testing-library/react'
import {Vbarchart} from '../views/charts/verticalBarChart';
import {Linechart} from '../views/charts/linechart';
import {Doughnutt} from '../views/charts/doughnutChart';
import {Statchart} from '../views/charts/statsChart';

it("The stat chart renders without crashing",async ()=>{
    render(<Statchart/>);
    const chart1 = screen.getByRole("chart");
    expect(chart1).toBeInTheDocument();
})

it("The vertical bar chart renders without crashing",async ()=>{
    render(<Vbarchart title="chart"/>);
    const chart2 = document.querySelector('#chart')
    expect(chart2).toBeInTheDocument();
})

it("The line chart renders without crashing",async ()=>{
    render(<Linechart title="chart"/>);
    const chart3 = document.querySelector('#chart')
    expect(chart3).toBeInTheDocument();
})

it("The doughnut chart renders without crashing",async ()=>{
    render(<Doughnutt title="chart"/>);
    const chart4 = document.querySelector('#chart')
    expect(chart4).toBeInTheDocument();
})
