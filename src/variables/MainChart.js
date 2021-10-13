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

///Functions to proccess the complete data and sort into monthly arrays////
//NOTE: First element of each array will be the dataset title e.g: 'yearlySales' for position [0]////

//Returns a single array with the monthly totals of all products
function ProcessYearlySales(allData) {
  console.log("running Process Yearly Sales")
  if (allData.length > 10) {
    var date = new Date();

    //thisYearSalesData//
    let yearlySales = ["yearly_sales"];
    for (let m = 1; m <= 12; m++) {
      let temp = 0;
      if (m < 10) {
        Array.prototype.forEach.call(allData, (data) => {
          if (
            data.date_time.includes("-0" + m.toString() + "-" + YEARX  )
          ) {
            temp += data.product_price * data.quantity_sold;
          }
        });
      }
      if (m >= 10) {
        Array.prototype.forEach.call(allData, (data) => {
          if (
            data.date_time.includes("-" + m.toString() + "-" + YEARX  )
          ) {
            temp += data.product_price * data.quantity_sold;
          }
        });
      }
      if (Math.floor(temp) > 0) {
        yearlySales.push(Math.floor(temp));
      }
    }
    console.log(yearlySales)

    return GraphDataSingle(yearlySales);
  } else {
    return DefaultData();
  }
}

//**MyMarker2**
//Returns an array or arrays, each with the monthly totals of a single product
function ProcessProductSales(allData) {
  if (allData.length > 10) {
    var date = new Date();

    var products = {};
    //ProductSalesData//
    for (let m = 1; m <= 12; m++) {
      if (m < 10) {
        Array.prototype.forEach.call(allData, (data) => {
          var productName = data.product_name.toString();
          var otherName = data.product_name;
          if (!(productName in products)) {
            products[productName] = [
              productName,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
            ];
            products[productName][m] = 0;
          }
          if (
            data.date_time.includes("-0" + m.toString() + "-" + YEARX  )
          ) {
            var dataSold = data.product_price * data.quantity_sold;
            products[productName][m] += Math.floor(dataSold);
          }
        });
      }
      if (m >= 10) {
        Array.prototype.forEach.call(allData, (data) => {
          var productName = data.product_name.toString();
          if (!(productName in products)) {
            products[productName.key] = [
              productName,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
            ];
            products[productName][m] = 0;
          }

          if (
            data.date_time.includes("-" + m.toString() + "-" + YEARX  )
          ) {
            var dataSold = data.product_price * data.quantity_sold;
            products[productName][m] += Math.floor(dataSold);
          }
        });
      }
    }

    return GraphDataMultiple(Object.values(products));
  } else {
    return DefaultData();
  }
}

//Returns an array or arrays, each with the monthly totals of a single "product_group"
function ProcessGroupSales(allData) {
  if (allData.length > 10) {
    var date = new Date();

    var groups = {};
    //ProductGroupsData//
    for (let m = 1; m <= 12; m++) {
      if (m < 10) {
        Array.prototype.forEach.call(allData, (data) => {
          var groupName = data.product_group.toString();
          var otherName = data.product_group;
          if (!(groupName in groups)) {
            groups[groupName] = [groupName, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            groups[groupName][m] = 0;
          }
          if (
            data.date_time.includes("-0" + m.toString() + "-" + YEARX  )
          ) {
            var dataSold = data.product_price * data.quantity_sold;
            groups[groupName][m] += Math.floor(dataSold);
          }
        });
      }
      if (m >= 10) {
        Array.prototype.forEach.call(allData, (data) => {
          var groupName = data.product_group.toString();
          if (!(groupName in groups)) {
            groups[groupName.key] = [
              groupName,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
            ];
            groups[groupName][m] = 0;
          }

          if (
            data.date_time.includes("-" + m.toString() + "-" + YEARX  )
          ) {
            var dataSold = data.product_price * data.quantity_sold;
            groups[groupName][m] += Math.floor(dataSold);
          }
        });
      }
    }
    return GraphDataMultiple(Object.values(groups));
  } else {
    return DefaultData();
  }
}
//function to return graph "line" data for one array input
function GraphDataSingle(allSales) {
  var newArray = [];
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
    data: allSales.map((sale) => {
      if (sale != 0) {
        return sale;
      }
    }),
    // [sales[1],sales[2],sales[3],sales[4],sales[5],sales[6],sales[7],sales[8],sales[9],sales[10],sales[11],sales[12]],
  });

  return newArray;
}

//function to return graph line data for multiple arrays input
function GraphDataMultiple(allSales) {
  var newArray = [];
  var x = 2000;
  Array.prototype.forEach.call(allSales, (sales) => {
    var labelName = sales[0];
    sales.shift();
    var currentColor = getRandomColor();
    newArray.push({
      label: labelName.toString(),
      fill: true,
      borderColor: currentColor,
      borderWidth: 2,
      borderDash: [],
      borderDashOffset: 0.0,
      pointBackgroundColor: currentColor,
      pointBorderColor: "rgba(255,255,255,0)",
      pointHoverBackgroundColor: "#1f8ef1",
      pointBorderWidth: 20,
      pointHoverRadius: 4,
      pointHoverBorderWidth: 15,
      pointRadius: 4,
      data: sales.map((sale) => {
        if (sale != 0) {
          return sale;
        }
      }),
      // [sales[1],sales[2],sales[3],sales[4],sales[5],sales[6],sales[7],sales[8],sales[9],sales[10],sales[11],sales[12]],
    });
  });

  return newArray;
}

//Creates a line chart
function CreatChart(props) {
  return (
    <Line
      data={(canvas) => {
        let ctx = canvas.getContext("2d");

        let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

        gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
        gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
        gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

        return {
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "June",
            "July",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          datasets: props.dataEntry,
        };
      }}
      options={chartOptions1}
    />
  );
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

      console.log(allData)

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
function ProcessWeeklyProductSales(allData) {

  function CheckIfInArray(productName, productList){
    for (var i = 0; i< productList.length; i++){
      if (productList[i].toString() == productName.toString()){
        return true
      }
    }
  }

  var listOfProducts = [];
  var products = {};

  if (allData.length > 10){
    Array.prototype.forEach.call(allData, (data) => {
      var productName = data.product_name.toString();
      if (!(CheckIfInArray(productName, listOfProducts))) {
      listOfProducts.push(productName);
    }
  })
  var weekKeys = [];
  for(var i = 1; i<=52; i++){
      weekKeys.push("20"+YEARX+"-"+i.toString())
  }
  Array.prototype.forEach.call(listOfProducts, (product) => {
    products[product] = {"productName": product}
    Array.prototype.forEach.call(weekKeys, (week) => {
      products[product][week] = 0;
    })

  })
  Array.prototype.forEach.call(allData, (data) => {
    var productName = data.product_name
    var week = "20"+YEARX.toString()+"-"+data.week.toString()
    if(data.start_of_week.includes("20"+YEARX.toString())){
      products[productName][week] += Math.floor(data.sales_revenue)
    }
  })

}
  var tempArr = Object.values(products)
  var finalGroups = []
  Array.prototype.forEach.call(tempArr, (arr) => {
    finalGroups.push(Object.values(arr))
  })

  console.log(finalGroups)
  console.log(products)
  return GraphDataWeeklyMultiple(finalGroups);
}


function ProcessWeeklyGroupSales(allData) {

  function CheckIfInProducts(productName, productList){
    for (var i = 0; i< productList.length; i++){
      if (productList[i].toString() == productName.toString()){
        return true
      }
    }
  }
  function CheckIfInArray(groupName, groupsList){
    for (var i = 0; i< groupsList.length; i++){
      if (groupsList[i].toString() == groupName.toString()){
        return true
      }
    }
  }

  var listOfProducts = [];
  var listOfGroups = [];
  var groups = {};

  if (allData.length > 10){
    Array.prototype.forEach.call(allData, (data) => {
      var productName = data.product_name.toString();
      if (!(CheckIfInArray(productName, listOfProducts))) {
      listOfProducts.push(productName);
      }
    })
    Array.prototype.forEach.call(allData, (data) => {
      var groupName = data.product_group.toString();
      if (!(CheckIfInArray(groupName, listOfGroups))) {
      listOfGroups.push(groupName);
      }
    })
  var weekKeys = [];
  for(var i = 1; i<=52; i++){
      weekKeys.push("20"+YEARX+"-"+i.toString())
  }
  Array.prototype.forEach.call(listOfGroups, (group) => {
    groups[group] = {"groupName": group}
    Array.prototype.forEach.call(weekKeys, (week) => {
      groups[group][week] = 0;
    })

  })
  Array.prototype.forEach.call(allData, (data) => {
    var groupName = data.product_group
    var week = "20"+YEARX.toString()+"-"+data.week.toString()
    if(data.start_of_week.includes("20"+YEARX.toString())){
      groups[groupName][week] += Math.floor(data.sales_revenue)
    }
  })

}
  var tempArr = Object.values(groups)
  var finalGroups = []
  Array.prototype.forEach.call(tempArr, (arr) => {
    finalGroups.push(Object.values(arr))
  })

  return GraphDataWeeklyMultiple(finalGroups);
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

//function to return graph line data for multiple arrays input
function GraphDataWeeklyMultiple(allSales) {
  var newArray = [];
  var currentdate = new Date();
  var oneJan = new Date(currentdate.getFullYear(),0,1);
  var numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000));
  var weekNumber = Math.ceil(( currentdate.getDay() + 1 + numberOfDays) / 7);



  Array.prototype.forEach.call(allSales, (sales) => {
    var currentLabelName = sales[0];
    sales.shift();

    var labelName = currentLabelName;
    var currentColor = getRandomColor();
    newArray.push({
      label: labelName.toString(),
      fill: true,
      borderColor: currentColor,
      borderWidth: 2,
      borderDash: [],
      borderDashOffset: 0.0,
      pointBackgroundColor: currentColor,
      pointBorderColor: "rgba(255,255,255,0)",
      pointHoverBackgroundColor: "#1f8ef1",
      pointBorderWidth: 20,
      pointHoverRadius: 4,
      pointHoverBorderWidth: 15,
      pointRadius: 4,
      data: sales.map((sale, index) => {
        if (index <= weekNumber){
          return sale;
        }
        // if (sale != 0) {
        //
        // }
      }),
      // [sales[1],sales[2],sales[3],sales[4],sales[5],sales[6],sales[7],sales[8],sales[9],sales[10],sales[11],sales[12]],
    });
  });

  return newArray;
}





//Creates a line chart
function CreatWeeklyChart(props) {
  const labelNames = [];
  for (var i = 1; i <=52; i++) {
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

  if (ls.get("salesData") == null) {
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
    let processedData = [1, 2, 3];

    try {
      await fetch(apiURL, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        mode: "cors",
      })
        .then((response) => response.json())
        .then((data) => (salesData = data))
        .then((data) => {
          ls.set("salesData", data, 60000);
        });

      console.log("setting hidden")
      setHidden(ls.get("salesData"));
    } catch (err) {
      console.log(err);
    }



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
    ls.set("salesData", null, 60000);
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
    <div>
      <ChakraProvider>
        <Row>
        <Col>
          <Card
            style={{
              backgroundImage:
                "linear-gradient(to top left, #2381d3 0%, #18a2b9 100%)",
            }}
          >
                  <ButtonGroup
                    style={{padding: "15px"}}
                  >
                    <Button
                      variant="solid"
                      style={{
                        backgroundColor:"#1e1e26",
                        color: "white",
                        outline: "none",
                        border: "none",
                        boxShadow: "none"
                      }}
                      size="lg"
                      id="1"
                      tag="label"
                      className={classNames("btn-simple")}
                      onClick={resetLocal}
                    >
                      Refresh
                    </Button>
                  </ButtonGroup>
            <Card
              className="card-chart"
              style={{
                backgroundColor: "transparent",
                padding: "10px",
                boxShadow: "none",
              }}
            >
              <CardHeader style={{ backgroundColor: "#1e1e26", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>
                <Row>
                  <Col className="text-left" sm="6">
                    <h2 className="card-category">Monthly Total Sales</h2>
                    <CardTitle tag="h2">Sales</CardTitle>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody style={{ backgroundColor: "#1e1e26", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px" }}>
                <div className="chart-area-main">
                  <div className="chart-area-body">
                    <CreatChart dataEntry={ProcessYearlySales(hidden)} />

                    <div id="chartAlpha"></div>
                  </div>
                </div>
              </CardBody>
            </Card>
            <Card
              className="card-chart"
              style={{
                backgroundColor: "transparent",
                padding: "10px",
                boxShadow: "none",
              }}
            >
              <CardHeader style={{ backgroundColor: "#1e1e26", borderTopLeftRadius: "10px", borderTopRightRadius: "10px"  }}>
                <Row>
                  <Col className="text-left" sm="6">
                    <h5 className="card-category">Monthly Product Sales Comparison</h5>
                    <CardTitle tag="h2">Sales</CardTitle>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody style={{ backgroundColor: "#1e1e26", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px" }}>
                <div className="chart-area-main">
                  <div className="chart-area-body">
                    <CreatChart dataEntry={ProcessProductSales(hidden)} />

                    <div id="chartAlpha"></div>
                  </div>
                </div>
              </CardBody>
            </Card>
            <Card
              className="card-chart"
              style={{
                backgroundColor: "transparent",
                padding: "10px",
                boxShadow: "none",
              }}
            >
              <CardHeader style={{ backgroundColor: "#1e1e26", borderTopLeftRadius: "10px", borderTopRightRadius: "10px"  }}>
                <Row>
                  <Col className="text-left" sm="6">
                    <h5 className="card-category">
                      Monthly Product Group Sales Comparison
                    </h5>
                    <CardTitle tag="h2">Sales</CardTitle>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody style={{ backgroundColor: "#1e1e26", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px"  }}>
                <div className="chart-area-main">
                  <div className="chart-area-body">
                    <CreatChart dataEntry={ProcessGroupSales(hidden)} />

                    <div id="chartAlpha"></div>
                  </div>
                </div>
              </CardBody>
            </Card>
            <Card
              className="card-chart"
              style={{
                backgroundColor: "transparent",
                padding: "10px",
                boxShadow: "none",
              }}
            >

              <CardHeader style={{ backgroundColor: "#1e1e26", borderTopLeftRadius: "10px", borderTopRightRadius: "10px"  }}>
                <Row>
                  <Col className="text-left" sm="6">
                    <h5 className="card-category">
                    Weekly Total Sales for {DATEX.getFullYear()}
                    </h5>
                    <CardTitle tag="h2">Sales</CardTitle>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody style={{ backgroundColor: "#1e1e26", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px"  }}>
                <div className="chart-area-main">
                  <div className="chart-area-body">
                  <CreatWeeklyChart dataEntry={ProcessWeeklySales(weeklyHidden)} />

                    <div id="chartAlpha"></div>
                  </div>
                </div>
              </CardBody>
            </Card>
            <Card
              className="card-chart"
              style={{
                backgroundColor: "transparent",
                padding: "10px",
                boxShadow: "none",
              }}
            >

              <CardHeader style={{ backgroundColor: "#1e1e26", borderTopLeftRadius: "10px", borderTopRightRadius: "10px"  }}>
                <Row>
                  <Col className="text-left" sm="6">
                    <h5 className="card-category">
                    Weekly Product Sales for {DATEX.getFullYear()}
                    </h5>
                    <CardTitle tag="h2">Sales</CardTitle>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody style={{ backgroundColor: "#1e1e26", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px"  }}>
                <div className="chart-area-main">
                  <div className="chart-area-body">
                  <CreatWeeklyChart dataEntry={ProcessWeeklyProductSales(weeklyHidden)} />

                    <div id="chartAlpha"></div>
                  </div>
                </div>
              </CardBody>
            </Card>
            <Card
              className="card-chart"
              style={{
                backgroundColor: "transparent",
                padding: "10px",
                boxShadow: "none",
              }}
            >

              <CardHeader style={{ backgroundColor: "#1e1e26", borderTopLeftRadius: "10px", borderTopRightRadius: "10px"  }}>
                <Row>
                  <Col className="text-left" sm="6">
                    <h5 className="card-category">
                    Weekly Group Sales for {DATEX.getFullYear()}
                    </h5>
                    <CardTitle tag="h2">Sales</CardTitle>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody style={{ backgroundColor: "#1e1e26", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px"  }}>
                <div className="chart-area-main">
                  <div className="chart-area-body">
                  <CreatWeeklyChart dataEntry={ProcessWeeklyGroupSales(weeklyHidden)} />

                    <div id="chartAlpha"></div>
                  </div>
                </div>
              </CardBody>
            </Card>
                </Card>
        </Col>
      </Row>


      </ChakraProvider>


    </div>
  );
}

export default SyncData;
