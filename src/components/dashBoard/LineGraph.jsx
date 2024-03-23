import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LineChart = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ["Sun", "Mon", "Tur", "Wed", "Thu", "Fri", "Sat"],
                datasets: [
                    {
                        label: 'Revenue',
                        data: [65, 59, 80, 81, 56, 55, 40],
                        borderColor: 'rgba(221, 16, 167, 1)',
                        backgroundColor: 'rgba(221, 16, 167, 1)',
                        borderWidth: 1,
                        fill: false
                    },
                    {
                        label: 'Sales',
                        data: [28, 48, 40, 19, 86, 27, 90],
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
    }, []);

    return (
        <div style={{height:"100%"}} >
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

export default LineChart;
