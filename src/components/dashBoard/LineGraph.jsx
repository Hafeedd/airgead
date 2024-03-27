import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const LineChart = (props) => {
    const chartRef = useRef(null);
    const {dataObject} = props;

    useEffect(() => {
        
        const ctx = chartRef.current.getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ["Sun", "Mon", "Tur", "Wed", "Thu", "Fri", "Sat"],
                datasets: [
                    {
                        label: 'Revenue',
                        data: dataObject?.graph_profit,
                        borderColor: 'rgba(221, 16, 167, 1)',
                        backgroundColor: 'rgba(221, 16, 167, 1)',
                        borderWidth: 1,
                        fill: false
                    },
                    {
                        label: 'Sales',
                        data: dataObject?.graph_sales,
                        borderColor: 'rgba(54, 126, 211, 1)',
                        backgroundColor: 'rgba(54, 126, 211, 1)',
                        borderWidth: 1,
                        fill: false
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: 'white' // Change day text color here
                        },
                        grid: {
                            color: 'gray' // Change border line color for columns (vertical grid lines)
                        }
                    },
                    x: {
                        ticks: {
                            color: 'white' // Change day text color here
                        },
                        grid: {
                            color: null // Change border line color for rows (horizontal grid lines)
                        }

                    }
                },

                plugins: {
                    legend: {
                        labels: {
                            color: 'white' // Change text color here
                        }
                    },
                    tooltip: {
                        titleColor: 'white', // Change tooltip title text color here
                        bodyColor: 'white' // Change tooltip body text color here
                    }
                }
            }
        });

        return () => {
            myChart.destroy();
        };
    }, [dataObject,]);

    return (
        <canvas className={'line-graph-canvas'} ref={chartRef}></canvas>
    );
};

export default LineChart;
