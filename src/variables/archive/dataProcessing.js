import React from 'react';
// import NewJSONData from '../services/graph.service.js';
// import NewJSONData from './newJsonDataPretty';
// import SalesData from '../services/graph.service.js'
var SalesData = [];
// var NewJSONData = [];
// console.log("testpointalpha")
// console.log("testpointalpha")
//
// const allData = [];
// let yr2019Data = [];
// const yr2020Data = [];
// const yr2021Data = [];
//
// for (let y = 2019; y <= 2021; y++) {
//   for (let m = 1; m <= 12; m++) {
//     let temp = 0;
//     if (m < 10) {
//       NewJSONData.forEach((data) => {
//         if (data.date_time.includes((y).toString()+"-0"+(m).toString()+'-')){
//           temp+=(data.product_price*data.quantity_sold);
//         }});
//     }
//     if (m >= 10) {
//       NewJSONData.forEach((data) => {
//         if (data.date_time.includes((y).toString()+"-"+(m).toString()+'-')){
//           temp+=(data.product_price*data.quantity_sold);
//         }});
//     }
//       eval("yr"+(y).toString()+"Data").push(Math.floor(temp))
//   }
// };
//
// allData.push(yr2019Data, yr2020Data, yr2021Data)


// export default allData;




// ////
// import React from 'react';
// // import NewJSONData from '../services/graph.service.js';
// import NewJSONData from './newJsonDataPretty';
//
// import { Line, Bar } from "react-chartjs-2";
// // import SalesData from '../services/graph.service.js'
//
// // console.log(SalesData)
// function ProcessData(props){
//   const allData = [];
//   let yr2019Data = [];
//   const yr2020Data = [];
//   const yr2021Data = [];
//
//   for (let y = 2019; y <= 2021; y++) {
//     for (let m = 1; m <= 12; m++) {
//       let temp = 0;
//       if (m < 10) {
//         props.inputJSON.forEach((data) => {
//           if (data.date_time.includes((y).toString()+"-0"+(m).toString()+'-')){
//             temp+=(data.product_price*data.quantity_sold);
//           }});
//       }
//       if (m >= 10) {
//         props.inputJSON.forEach((data) => {
//           if (data.date_time.includes((y).toString()+"-"+(m).toString()+'-')){
//             temp+=(data.product_price*data.quantity_sold);
//           }});
//       }
//         eval("yr"+(y).toString()+"Data").push(Math.floor(temp))
//     }
//   };
//   // document.getElementById("graphPlaceholder").textContent=props.graphDetails
//
//   allData.push(yr2019Data, yr2020Data, yr2021Data)
//   return(
//     <div>
//     <h1>Test Heading</h1>
//     <Line
//     data={allData[0]}
//     options={props.chartOptions}
//     />
//     </div>
//
//   )
// }
//
//
//
// export default ProcessData;

////
