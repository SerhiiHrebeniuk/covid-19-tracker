import React, { useState, useEffect } from 'react';
import {Line} from 'react-chartjs-2';
import numeral from 'numeral';



const options = {
    legend: {
        display: false,
    },
    elements: {
        point: {
            radius: 0,
        },
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            lable: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0.0");
            },
        },
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: "ll"
                },
            },
        ],
        yAxes: [
            {
                gridLines: {
                    display: false,
                },
                tricks: {
                    callback: function (value, index, values) {
                        return numeral(value).format("0a");
                    },
                },
            },
        ],
    },
};

const buildChartData = (data, casesType='cases') => {
    let chartData = [];
    let lastDataPoint;

    for (let date in data.cases) {
        if (lastDataPoint) {
            let newDataPoint = {
                x: date,
                // eslint-disable-next-line
                y: data [casesType] [date] - lastDataPoint
            }
            chartData.push(newDataPoint);
        }
        // eslint-disable-next-line
        lastDataPoint = data [casesType] [date];
    }
    return chartData;
};


function LineGraph({casesType = "cases", ...props}) {

    const [data, setData] = useState({});


    useEffect(() => {
        const fetchData = async () => {
           await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
           .then((response) => {
               return response.json();
           })
           .then((data) => {
               let chartData = buildChartData(data, casesType)
               setData(chartData);
           }); 
        };

        fetchData();
    }, [casesType]);

    return (
        <div className={props.className}>
            {data && data.length > 0 && (
                <Line 
                options = {options}
                data={{
                    datasets: [
                        {
                        backgroundColor: "rgba(204, 16, 52, 0.5)",
                        borderColor: "#CC1034",
                        data: data,
                    }
                    ]
                }} />
            )}
        </div>
    )
}

export default LineGraph;


// https://disease.sh/v3/covid-19/historical/all?lastdays=120