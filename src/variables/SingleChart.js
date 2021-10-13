import React, { useState, useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// Chakra Library
import { ChakraProvider, Button, ButtonGroup } from '@chakra-ui/react'
import chartOptions1 from "../variables/chartOptions1";

import moment from 'moment';

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col
} from "reactstrap";

const DATEX = new Date();
const MONTHX = DATEX.getMonth()+1;
const YEARX = DATEX.getFullYear().toString().substr(2,2);
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];


//code sample taken from https://stackoverflow.com/questions/1484506/random-color-generator
function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

//Default data returned to all charts if api hasn't loaded
function DefaultData() {
  return [
    {
      label: "sales",
      fill: true,
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
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  ];
}


///All Weekly Sales Functions HERE>///
//Some functions have been duplicated and altered for weekly
//Returns a single array with the monthly totals of all products
function ProcessWeeklySales(allData) {
  if (allData.length > 10) {
    var date = new Date();
    var year = date.getFullYear();
    //thisYearWeeklySalesData//

    let allWeeklySales = ['Weekly_Sales'];
    let weeklySales = {};
    if (allData.length > 10){
      const groups = allData.reduce((weeklySales, date) => {

      // create a composed key: 'year-week'
      const yearWeek = `${moment(date.start_of_week).year()}-${moment(date.start_of_week).week()}`;

      // add this key as a property to the result object
      if (!weeklySales[yearWeek]) {
        weeklySales[yearWeek] = [];
      }

      // push the current date that belongs to the year-week calculated befor
      weeklySales[yearWeek].push(date.start_of_week);

      return weeklySales;

      }, {});
      const weekKeys = Object.keys(groups);


      for (var i=1; i<=52; i++){
        weeklySales[year.toString()+"-"+i.toString()] = 0;
      }
      Array.prototype.forEach.call(weekKeys, (key) => {
        if (!(key in weeklySales)) {
          weeklySales[key] = 0;
        }
      });

      //code sample taken from https://www.codegrepper.com/code-examples/javascript/js+return+value+through+object+and+find+match+by+key
      function getKeyByValue(object, value) {
        for (var key in object){
          if (object[key].includes(value)) {

            return(key)
          }
        // return Object.keys(object).find(key => object[key].value === value);
        }
      }
      Array.prototype.forEach.call(allData, (data) => {
        let currentKey = getKeyByValue(groups, data.start_of_week.toString())

        weeklySales[currentKey] += Math.floor(data.sales_revenue);
      });


      for (var k in weeklySales){
        if (!(k.includes(year.toString()))){
          delete weeklySales[k.toString()]
        }
      }
      allWeeklySales.concat(Object.values(weeklySales))
      return GraphDataWeeklySingle(allWeeklySales.concat(Object.values(weeklySales)));
    }
  }
}

function GraphDataWeeklySingle(allSales) {
  var newArray = [];
  //code taken from https://www.delftstack.com/howto/javascript/javascript-get-week-number/
  var currentdate = new Date();
  var oneJan = new Date(currentdate.getFullYear(),0,1);
  var numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000));
  var weekNumber = Math.ceil(( currentdate.getDay() + 1 + numberOfDays) / 7);


  var labelName = allSales[0];
  allSales.shift();
  newArray.push({
    label: labelName.toString(),
    fill: true,
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
    data: allSales.map((sale, index) => {
      if (index <= weekNumber){
        return sale;
      }
      // if (sale != 0) {
      //
      // }
    }),
    // [sales[1],sales[2],sales[3],sales[4],sales[5],sales[6],sales[7],sales[8],sales[9],sales[10],sales[11],sales[12]],
  });

  return newArray;
}



//Creates a line chart
function CreatWeeklyChart(props) {
  var currentdate = new Date();
  var oneJan = new Date(currentdate.getFullYear(),0,1);
  var numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000));
  var weekNumber = Math.ceil(( currentdate.getDay() + 1 + numberOfDays) / 7);
  const labelNames = [];
  for (var i = 1; i <=weekNumber+1; i++) {
    labelNames.push(i.toString())
  }
  return (
    <Line
      data={(canvas) => {
        let ctx = canvas.getContext("2d");

        let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

        gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
        gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
        gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

        return {
          labels: labelNames,
          datasets: props.dataEntry,
        };
      }}
      options={chartOptions1}
    />
  );
}


///END WEEKLY SALES FUNCTIONS///




//Syncs data from api, stores data in local storage,
//then copies into state variable, only retrieves api data if nothing
//is in localstorage
function SyncData() {


  const ls = require("localstorage-ttl");

  const apiURL = "https://sisrestapi.herokuapp.com/sales";
  const [hidden, setHidden] = useState([[0], [0]]);
  const [value, setValue] = useState('');

  const apiWeeklyURL = "https://sisrestapi.herokuapp.com/sales/product/weekly";
  const [weeklyHidden, setWeeklyHidden] = useState([[0], [0]]);

  if (ls.get("salesWeeklyData") == null) {
    getData();
    console.log("null confirmed, getting Data")
    //console.log("fetched data = " + ls.get("salesData"))
  } else {
    //console.log(("cached data = " + ls.get("salesData")))
  }
  async function getData() {
    var x = document.getElementById("chartData1");
    let salesData;
    let salesWeeklyData;

    try {
      await fetch(apiWeeklyURL, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        mode: "cors",
      })
        .then((response) => response.json())
        .then((data) => (salesWeeklyData = data))
        .then((data) => {
          ls.set("salesWeeklyData", data, 60000);
        });

      setWeeklyHidden(ls.get("salesWeeklyData"));
    } catch (err) {
      console.log(err);
    }

  }

  //for the Refresh button, sets local storage to null,
  //which will run the async function getData again
  function resetLocal() {
    ls.set("salesWeeklyData", null, 60000);
    console.log("reset local storage")
    setHidden(true);
    setWeeklyHidden(true);
  }

  //reloads local data after refresh
  function LoadScreen(){
    useEffect(() => {
      resetLocal();
    }, [])
  }
  LoadScreen()



  return (
    <div className="chart-area-main">
        <CreatWeeklyChart dataEntry={ProcessWeeklySales(weeklyHidden)} />
    </div>
  );
}

export default SyncData;
