import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  //DropdownToggle,
  //DropdownMenu,
  //DropdownItem,
  //UncontrolledDropdown,
  //`Label,
  //FormGroup,
  //Input,
  //Table,
  Row,
  Col,
  //UncontrolledTooltip,
} from "reactstrap";

// core components
import MainChart from 'variables/MainChart.js'
import chartOptions1 from "../variables/chartOptions1";
// import chartOptions3 from "../variables/chartOptions3";
// import chartOptions4 from "../variables/chartOptions4";
// import chart1Data from 'variables/chart1Data.js';
// import Chart2 from 'variables/chart2Data.js';
// // import Chart3 from 'variables/chart3Data.js';
// import chart4Data from 'variables/chart4Data.js';


function Dashboard(props) {

  const ls = require('localstorage-ttl')

  async function fetchSales () {
  await fetch('https://sisrestapi.herokuapp.com/sales', {
    method: 'GET',
    credentials: 'include',
    mode: 'cors'
  })
    .then(response => response.json())
    .then(data => {
      ls.set("salesData",data, 60000)
    })
}

  if (ls.get("salesData") == null) {
    fetchSales()
    console.log("fetched data = " + ls.get("salesData"))
  } else{
    console.log(("cached data = " + ls.get("salesData")))
  }

  return (
    <>
      <div className="content">
        <Row>
          <Col xs="12">
            <MainChart/>
          </Col>
        </Row>

      </div>
    </>
  );
}

export default Dashboard;


// <Row>
//   <Col lg="4">
//     <Card className="card-chart">
//       <CardHeader>
//         <h5 className="card-category">Predicted Sales of </h5>
//         <CardTitle tag="h3">
//           <i className="tim-icons icon-bell-55 text-info" />
//           <select>
//             ;<option value='' disabled selected>
//                     Select Product
//                   </option>
//                   ;<option value=''>
//                     Product 1
//                   </option>
//                   ;<option value='' >
//                     Product 2
//                   </option>
//                   ;<option value='' >
//                     Product 3
//                   </option>
//
//           </select>
//         </CardTitle>
//       </CardHeader>
//       <CardBody>
//         <Chart2/>
//       </CardBody>
//     </Card>
//   </Col>
//   <Col lg="4">
//     <Card className="card-chart">
//       <CardHeader>
//         <h5 className="card-category">Daily Sales</h5>
//         <CardTitle tag="h3">
//           <i className="tim-icons icon-delivery-fast text-primary" />{" "}
//           3,500€
//         </CardTitle>
//       </CardHeader>
//       <CardBody>
//         <h1>placeholder</h1>
//       </CardBody>
//     </Card>
//   </Col>
//   <Col lg="4">
//     <Card className="card-chart">
//       <CardHeader>
//         <h5 className="card-category">Completed Tasks</h5>
//         <CardTitle tag="h3">
//           <i className="tim-icons icon-send text-success" /> 12,100K
//         </CardTitle>
//       </CardHeader>
//       <CardBody>
//         <div className="chart-area">
//           <Line
//             data={chart4Data.data}
//             options={chartOptions4}
//           />
//         </div>
//       </CardBody>
//     </Card>
//   </Col>
// </Row>
// <Row>
// </Row>
