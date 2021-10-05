import React, { useState } from 'react';
import { Line, Bar } from "react-chartjs-2";
import chartOptions3 from "../variables/chartOptions3";

//Function creates final graph, takes data input from props
function CreatChart(props){
  return(<Bar
    data={ (canvas) => {
      let ctx = canvas.getContext("2d");

      let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

      gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
      gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
      gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

      return {
        labels: props.labels,

        datasets: [
          {
            label: "Sales Average",
            fill: true,
            backgroundColor: gradientStroke,
            hoverBackgroundColor: gradientStroke,
            borderColor: "#d048b6",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            data: props.data,
          },
        ],
      };
    }
  }
  options={chartOptions3}
/>)
};
//Function to fetch api data, process the data and sort into arrays for 2019,2020, and 2021
//Then exports the array containing three arrays into state titled hidden
function Chart3(){

  const apiURL = 'https://sisrestapi.herokuapp.com/sales';
  const [hidden, setHidden] = useState([1,2,3,5,6,7]);
  const [labels, setLabels] = useState("Loading");

  // getData()
  // async function getData(){
  //   var x = document.getElementById("chartData1");
  //   let salesData
  //   let processedData = [1,2,3]
  //   const today = new Date();
  //   var dd = today.getDate();
  //
  //   var mm = (today.getMonth() + 1)
  //   if(mm<10){
  //     mm = "0"+mm.toString()
  //   }else{
  //     mm = mm.toString()
  //   }
  //   var yyyy = today.getFullYear();
  //   function daysInMonth (month, year) {
  //   return new Date(year, month, 0).getDate();
  //   }
  //   var daysInLastMonth
  //   if(mm>1){
  //     daysInLastMonth = daysInMonth(mm-1,yyyy);
  //   }else{
  //     daysInLastMonth = daysInMonth(12,yyyy-1);
  //   }
  //
  //   let stringToday = yyyy+"-"+mm+"-0";
  //   let day = today.getDay();
  //   day+=1
  //
  //
  //
  //   try{
  //     await fetch(apiURL,{
  //       method: 'GET',
  //       headers: {'Content-Type': 'application/json'},
  //       credentials: 'include',
  //       mode: 'cors'
  //     })
  //     .then(response => response.json())
  //     .then(data => (salesData = data));
  //
  //
  //
  //
  //     let days = [];
  //     for(let i = 1; i<=7; i++){
  //       if(day+i<=7){
  //         days.push(day + i)
  //       }
  //       else {
  //         days.push(i-6)
  //       }
  //     }
  //
  //     days = convertDays(days);
  //     setLabels(days);
  //     setHidden(salesData);
  //
  //
  //   } catch(err){
  //     console.log(err)
  //   }
  // }
  //
  // const today = new Date();
  // var dd = today.getDate();
  //
  // var mm = (today.getMonth() + 1)
  // if(mm<10){
  //   mm = "0"+mm.toString()
  // }else{
  //   mm = mm.toString()
  // }
  // var yyyy = today.getFullYear();
  // function daysInMonth (month, year) {
  // return new Date(year, month, 0).getDate();
  // }
  // var daysInLastMonth
  // if(mm>1){
  //   daysInLastMonth = daysInMonth(mm-1,yyyy);
  // }else{
  //   daysInLastMonth = daysInMonth(12,yyyy-1);
  // }
  //
  // let stringToday = yyyy+"-"+mm+"-0";
  // let day = today.getDay();
  // day+=1
  //
  // var thisWeekData = [];
  //
  // function convertDays(num) {
  //   return Array.from(num, v => ({ 1: 'Sun', 2: 'Mon', 3: 'Tues', 4: "Wed", 5: 'Thurs', 6: 'Fri', 7: 'Sat' }[v] || v));
  // }
  //
  // for (var i = 0; i < 6; i++) {
  //   let temp=0;
  //   if(dd-6+i>10){
  //     salesData.forEach((data) => {
  //       if (data.date_time.includes("2021-"+mm+(dd-i).toString())){              console.log("I am here now")
  //         temp+=(data.product_price*data.quantity_sold);
  //       }})
  //   }else if (dd-6+i>7) {
  //
  //     salesData.forEach((data) => {
  //       if (data.date_time.includes("2021-"+mm+(dd-i).toString())){
  //         temp+=(data.product_price*data.quantity_sold);
  //       }})
  //   }
  //   else{
  //     if((dd-6+i-i)<10){
  //
  //       salesData.forEach((data) => {
  //         if (data.date_time.includes("2021-"+mm+(dd-i).toString())){
  //           temp+=(data.product_price*data.quantity_sold);
  //         }})
  //     }else if ((dd-6+i-i)<1) {
  //
  //       salesData.forEach((data) => {
  //         if (data.date_time.includes("2021-"+mm+"-"+daysInLastMonth.toString())){
  //           temp+=(data.product_price*data.quantity_sold);
  //         }})
  //     }
  //   }
  //
  //
  //   thisWeekData.push(Math.floor(temp))
  // }


  return(<h1>chart3</h1>
    // <div className="chart-area">
    //
    // // <CreatChart data={hidden} labels={labels}/>
    // <div id="chartAlpha"></div>
    // </div>
  )
}


export default Chart3;
