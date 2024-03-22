import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody } from './../../components/panel/panel.jsx';
import { Line, Bar, Radar, Polar, Pie, Doughnut, StackArea, StackAreaBar} from 'react-chartjs-2';


const ChartBiz = () => {
    const [invoices, setinvoices] = useState([100, 200, 300, 400, 500, 600, 600, 500, 400, 300, 200, 100])
    const [expenses, setexpenses] = useState([150, -150, 300, 450, 250, 550, 550, 250, 450, 300, -150, 150])
    const [profitloss, setprofitloss] = useState([])
    const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"]


    const profitlossdifference = (invoices, expenses) => {
        const exampleprofitloss = []
        invoices.map((value, index) => {
            exampleprofitloss[index] = value - expenses[index]
        })
        setprofitloss(exampleprofitloss)
    }
    useEffect(() => {
        profitlossdifference(invoices, expenses);
    }, [])

    const lineChart = {
        data: {
            labels: months,
            datasets: [
                {
                    label: "Profit/Loss",
                    data: profitloss,
                    fill: false,
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgba(255, 99, 132, 0.2)',
                },
            ],
        },
        options: {
            tooltips: {
                callbacks: {
                    title: function (tooltipItem, data) {
                        if (parseInt(tooltipItem[0].value) < 0) {
                            return data['labels'][tooltipItem[0]['index']] + "- Loss ";
                        } else {
                            return data['labels'][tooltipItem[0]['index']] + "- Profit ";
                        }
                    },
                    label: function (tooltipItem, data) {
                        return " " + data['datasets'][0]['data'][tooltipItem['index']];
                    }
                },
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                    }
                }]
            },
        }
    };

    const barChart = {
        data: {
            labels: months,
            datasets: [{
                label:"Profit/Loss",
                borderWidth: 2,
                backgroundColor: function (context) {
                    var index = context.dataIndex;
                    var value = context.dataset.data[index];
                    return value < 0 ? 'rgba(255, 99, 132, 0.2)' : 'rgba(54, 162, 235, 0.2)';
                },
                borderColor: function (context) {
                    var index = context.dataIndex;
                    var value = context.dataset.data[index];
                    return value < 0 ? 'rgba(255, 99, 132, 0.2)' : 'rgba(54, 162, 235, 0.2)';
                },
                data: profitloss,
            }]
        },
        options: {
            legend: false,
            tooltips: {
                callbacks: {
                    title: function (tooltipItem, data) {
                        if (parseInt(tooltipItem[0].value) < 0) {
                            return data['labels'][tooltipItem[0]['index']] + "- Loss ";
                        } else {
                            return data['labels'][tooltipItem[0]['index']] + "- Profit ";
                        }
                    },
                    label: function (tooltipItem, data) {
                        return " " + data['datasets'][0]['data'][tooltipItem['index']];
                    }
                },
            },
            responsive: true,
            maintainAspectRatio: false
        }
    };

    const radarChart = {
        data: {
            labels: months,
            datasets: [{
                label: "Profit/Loss",
                borderWidth: 2,
                borderColor: '#ff5b57',
                pointBackgroundColor: '#ff5b57',
                pointRadius: 2,
                backgroundColor: 'rgba(255, 91, 87, 0.2)',
                data: profitloss
            }]
        },
        options: {
            tooltips: {
                callbacks: {
                    title: function (tooltipItem, data) {
                        if (parseInt(tooltipItem[0].value) < 0) {
                            return data['labels'][tooltipItem[0]['index']] + "- Loss ";
                        } else {
                            return data['labels'][tooltipItem[0]['index']] + "- Profit ";
                        }
                    },
                    label: function (tooltipItem, data) {
                        return " " + data['datasets'][0]['data'][tooltipItem['index']];
                    }
                },
            },
            responsive: true,
            maintainAspectRatio: false
        }
    };

    const polarAreaChart = {
        data: {
            labels: months,
            datasets: [{
                label: "Profit/Loss",
                data: profitloss,
                backgroundColor: ['rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 255,0, 0.2)',
                    'rgba(0, 191, 255,0.2)',
                    'rgba(0, 0, 51,0.2)',
                    'rgb(0, 64, 255,0.2)',
                    'rgb(0, 255, 0,0.2)',
                    'rgb(0, 255, 191,0.2)'],
                borderColor: ['rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 255,0, 0.2)',
                    'rgba(0, 191, 255,0.2)',
                    'rgba(0, 0, 51,0.2)',
                    'rgb(0, 64, 255,0.2)',
                    'rgb(0, 255, 0,0.2)',
                    'rgb(0, 255, 191,0.2)'],
                hoverBackgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 255,0, 1)',
                    'rgba(0, 191, 255,1)',
                    'rgba(0, 0, 51,1)',
                    'rgb(0, 64, 255,1)',
                    'rgb(0, 255, 0,1)',
                    'rgb(0, 255, 191,1)'
                ],
                borderWidth: 2,
            }]
        },
        options: {
            tooltips: {
                callbacks: {
                    title: function (tooltipItem, data) {
                        if (parseInt(tooltipItem[0].value) < 0) {
                            return data['labels'][tooltipItem[0]['index']] + "- Loss ";
                        } else {
                            return data['labels'][tooltipItem[0]['index']] + "- Profit ";
                        }
                    },
                },
            },
            responsive: true,
            maintainAspectRatio: false
        }
    };

    const pieChart = {
        data: {
            labels: months,
            datasets: [{
                data: profitloss,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 255,0, 0.2)',
                    'rgba(0, 191, 255,0.2)',
                    'rgba(0, 0, 51,0.2)',
                    'rgb(0, 64, 255,0.2)',
                    'rgb(0, 255, 0,0.2)',
                    'rgb(0, 255, 191,0.2)'
                ],
                hoverBackgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 255,0, 1)',
                    'rgba(0, 191, 255,1)',
                    'rgba(0, 0, 51,1)',
                    'rgb(0, 64, 255,1)',
                    'rgb(0, 255, 0,1)',
                    'rgb(0, 255, 191,1)'
                ],
                borderColor: ['rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 255,0, 0.2)',
                    'rgba(0, 191, 255,0.2)',
                    'rgba(0, 0, 51,0.2)',
                    'rgb(0, 64, 255,0.2)',
                    'rgb(0, 255, 0,0.2)',
                    'rgb(0, 255, 191,0.2)'],
                borderWidth: 2,
                label: 'profit/loss'
            }]
        },
        options: {
            tooltips: {
                callbacks: {
                    title: function (tooltipItem, data) {
                        if (data['datasets'][0]['data'][tooltipItem[0]['index']] < 0) {
                            return data['labels'][tooltipItem[0]['index']] + "- Loss ";
                        } else {
                            return data['labels'][tooltipItem[0]['index']] + "- Profit ";
                        }
                    },
                },
            },
            responsive: true,
            maintainAspectRatio: false,
        }
    };

    const doughnutChart = {
        data: {
            labels: months,
            datasets: [{
                data: profitloss,
                backgroundColor: ['rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 255,0, 0.2)',
                    'rgba(0, 191, 255,0.2)',
                    'rgba(255, 0, 255,0.2)',
                    'rgb(0, 64, 255,0.2)',
                    'rgb(0, 255, 0,0.2)',
                    'rgb(0, 255, 191,0.2)'],
                borderColor: ['rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 255,0, 0.2)',
                    'rgba(0, 191, 255,0.2)',
                    'rgba(0, 0, 51,0.2)',
                    'rgb(0, 64, 255,0.2)',
                    'rgb(0, 255, 0,0.2)',
                    'rgb(0, 255, 191,0.2)'],
                hoverBackgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 255,0, 1)',
                    'rgba(0, 191, 255,1)',
                    'rgba(0, 0, 51,1)',
                    'rgb(0, 64, 255,1)',
                    'rgb(0, 255, 0,1)',
                    'rgb(0, 255, 191,1)'
                ],
                borderWidth: 2,
                label: 'Profit/Loss'
            }]
        },
        options: {
            tooltips: {
                callbacks: {
                    title: function (tooltipItem, data) {
                        if (data['datasets'][0]['data'][tooltipItem[0]['index']] < 0) {
                            return data['labels'][tooltipItem[0]['index']] + "- Loss ";
                        } else {
                            return data['labels'][tooltipItem[0]['index']] + "- Profit ";
                        }
                    },
                },
            },
            responsive: true,
            maintainAspectRatio: false
        }
    };


    return (
        <div>
            <ol className="breadcrumb float-xl-right">
                <li className="breadcrumb-item"><Link to="/chart/js">Home</Link></li>
                <li className="breadcrumb-item"><Link to="/chart/js">Chart</Link></li>
                <li className="breadcrumb-item active">Chart JS</li>
            </ol>
            <h1 className="page-header">Profit Loss Chart of </h1>
            <div className="row">
                <div className="col-xl-6">
                    <Panel>
                        <PanelHeader>Line Chart</PanelHeader>
                        <PanelBody>
                            <p>
                                Porfit-Loss-chart
                            </p>
                            <div style={{ height: '300px' }}>
                                <Line data={lineChart.data} options={lineChart.options} />
                            </div>
                        </PanelBody>
                    </Panel>
                </div>
                <div className="col-xl-6">
                    <Panel>
                        <PanelHeader>Bar Chart</PanelHeader>
                        <PanelBody>
                            <p>
                                Porfit-Loss-chart
                            </p>
                            <div style={{ height: '300px' }}>
                                <Bar data={barChart.data} options={barChart.options} />
                            </div>
                        </PanelBody>
                    </Panel>
                </div>
            </div>
            <div className="row">
                <div className="col-xl-6">
                    <Panel>
                        <PanelHeader>Radar Chart</PanelHeader>
                        <PanelBody>
                            <p>
                                Porfit-Loss-chart
                            </p>
                            <div style={{ height: '300px' }}>
                                <Radar data={radarChart.data} options={radarChart.options} />
                            </div>
                        </PanelBody>
                    </Panel>
                </div>
                <div className="col-xl-6">
                    <Panel>
                        <PanelHeader>Polar Area Chart</PanelHeader>
                        <PanelBody>
                            <p>
                                Porfit-Loss-chart
                            </p>
                            <div style={{ height: '300px' }}>
                                <Polar data={polarAreaChart.data} options={polarAreaChart.options} />
                            </div>
                        </PanelBody>
                    </Panel>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <Panel>
                        <PanelHeader>Pie Chart</PanelHeader>
                        <PanelBody>
                            <p>
                                Porfit-Loss-chart
                            </p>
                            <div style={{ height: '300px' }}>
                                <Pie data={pieChart.data} options={pieChart.options} />
                            </div>
                        </PanelBody>
                    </Panel>
                </div>
                <div className="col-md-6">
                    <Panel>
                        <PanelHeader>Doughnut Chart</PanelHeader>
                        <PanelBody>
                            <p>
                                Porfit-Loss-chart
                            </p>
                            <div style={{ height: '300px' }}>
                                <Doughnut data={doughnutChart.data} options={doughnutChart.options} />
                            </div>
                        </PanelBody>
                    </Panel>
                </div>
            </div>
        </div >
    )
}


export default ChartBiz;