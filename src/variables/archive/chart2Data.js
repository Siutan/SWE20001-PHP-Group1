import React, { useState } from 'react';
import { Line, Bar } from "react-chartjs-2";
import chartOptions1 from "../variables/chartOptions1";


//Function creates final graph, takes data input from props
function CreatChart(props){
  return(<Line
    data={ (canvas) => {
    let ctx = canvas.getContext("2d");

    let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
    gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
    gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

    return {
      labels: ["July", "Aug", "Sep", "Oct", "Nov", "Dec"],

      datasets: [
        {
          label: "Data",
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: "#1f8ef1",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#1f8ef1",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#1f8ef1",
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: props.data,
        },
      ],
    };
  }}
  options={chartOptions1}
/>)
};
//Function to fetch api data, process the data and sort into arrays for 2019,2020, and 2021
//Then exports the array containing three arrays into state titled hidden
function Chart2(){

  const apiURL = 'https://sisrestapi.herokuapp.com/sales';
  const [hidden, setHidden] = useState(true);

  getData()
  async function getData(){
    var x = document.getElementById("chartData1");
    let salesData
    let processedData = [1,2,3]


    try{
      await fetch(apiURL,{
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        mode: 'cors'
      })
      .then(response => response.json())
      .then(data => (salesData = data));
      const allData = [];
      let yr2019Data = [];
      const yr2020Data = [];
      const yr2021Data = [];

      for (let y = 2019; y <= 2021; y++) {
        for (let m = 7; m <= 12; m++) {
          let temp = 0;
          if (m < 10) {
            salesData.forEach((data) => {
              if (data.date_time.includes((y).toString()+"-0"+(m).toString()+'-')){
                temp+=(data.product_price*data.quantity_sold);
              }});
          }
          if (m >= 10) {
            salesData.forEach((data) => {
              if (data.date_time.includes((y).toString()+"-"+(m).toString()+'-')){
                if (data.product_price*data.quantity_sold !=(0)){
                  temp+=(data.product_price*data.quantity_sold);
                }
              }});
          }
            eval("yr"+(y).toString()+"Data").push(Math.floor(temp))
        }
      };

      allData.push(yr2019Data, yr2020Data, yr2021Data)
      setHidden(allData);

    } catch(err){
      console.log(err)
    }
  }

  return(
    <div className="chart-area">
    <CreatChart data={hidden[2]}/>
    <div id="chartAlpha"></div>
    </div>
  )
}


export default Chart2;
