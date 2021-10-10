import React, { useMemo, useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import DataTable, { createTheme } from "react-data-table-component";
import { ChakraProvider } from "@chakra-ui/react";
import LoginModal from "views/LoginModal";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Input,
  InputGroup,
  Stack,
} from "@chakra-ui/react";

// reactstrap components
import { Card, CardBody, Row, Col } from "reactstrap";

// TODO:
//  REMOVE EXPORT CSV IN INVENTORY
//  ADD TABBED LAYOUT WITH INVENTORY ACTIONS

//INVENTORY
// function addInventory() {
//   var productId = document.getElementById("pID_inventory").value;
//   var maxStock = document.getElementById("maxStock_inventory").value;
//   var currentStock = document.getElementById("currentStock_inventory").value;
//   var date = document.getElementById("date_inventory").value;

//   const payload = {
//     product_id: parseInt(productId),
//     max_stock_capacity: parseInt(maxStock),
//     current_stock: parseInt(currentStock),
//     date_time: date,
//   };
//   if (productId === "") {
//     alert("Enter Product ID");
//   } else {
//     var r =
//       window.confirm(`do you want to ADD the following entry to Inventory: \n
//     Product ID: ${productId} \n
//     Max Stock Capacity: ${maxStock} \n
//     Current Stock: ${currentStock} \n
//     Date: ${date} \n`);
//     if (r === true) {
//       fetch("https://sisrestapi.herokuapp.com/inventory", {
//         method: "POST",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });
//       alert("entry has been added");
//     } else {
//       alert("Entry not added");
//     }
//   }
// }

// function editInventory() {
//   var updateIndex = document.getElementById("updateIndex").value;
//   var productId = document.getElementById("pID_inventory").value;
//   var maxStock = document.getElementById("maxStock_inventory").value;
//   var currentStock = document.getElementById("currentStock_inventory").value;
//   var date = document.getElementById("date_inventory").value;

//   const payload = {
//     product_id: parseInt(productId),
//     max_stock_capacity: parseInt(maxStock),
//     current_stock: parseInt(currentStock),
//     date_time: date,
//   };
//   if (updateIndex === "") {
//     alert("Enter Update Index");
//   } else {
//     var r = window.confirm(
//       "do you want to Edit the following entry in Inventory"
//     );
//     if (r === true) {
//       fetch("https://sisrestapi.herokuapp.com/inventory/" + updateIndex, {
//         method: "PATCH",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });
//       alert("entry has been updated");
//     } else {
//       alert("Entry not Updated");
//     }
//   }
// }

// function deleteInventory() {
//   var updateIndex = document.getElementById("updateIndex").value;

//   if (updateIndex === "") {
//     alert("Enter Update Index");
//   } else {
//     var r = window.confirm(
//       "do you want to DELETE the following entry in Inventory"
//     );
//     if (r === true) {
//       fetch("https://sisrestapi.herokuapp.com/inventory/" + updateIndex, {
//         method: "DELETE",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//       });
//       alert("entry has been Deleted");
//     } else {
//       alert("Entry not Deleted");
//     }
//   }
// }

function convertToPercentage(num1, num2){
  let ratio = num2/ num1;
  let percentage = ratio*100;
  return percentage.toFixed(2)+' %';
}

function convertToCurrency(num){
  return num.toFixed(0)+' AUD';
}

const requestUrl = "https://sisrestapi.herokuapp.com/report/productcategory";

function SalesReports() {
  // SETS A STATE THAT TELLS THE APP DATA IS BEING LOADED
  const [loadingData, setLoadingData] = useState(true);

  const [showLogin,setShowLogin] = useState(false);

  // COLUMN FOR INVENTORY TABLE
  const columns = useMemo(() => [
    {
      name: "Product group",
      selector: (row) => row.product_group,
      sortable: true,
      reorder: true,
    },
    {
      name: "Revenue change",
      selector: (row) => convertToPercentage(row.revenue_change['1w'], row.revenue_change['1m']) ,
      sortable: true,
      reorder: true,
    },
    {
      name: "Volume change",
      selector: (row) => convertToPercentage(row.volume_change['1w'], row.volume_change['1m']),
      sortable: true,
      reorder: true,
    },
    {
      name: "Cur: Month revenue",
      selector: (row) => convertToCurrency(row.current_month_revenue),
      reorder: true,
    },
    {
      name: "Cur: Month volume",
      selector: (row) => convertToCurrency(row.current_month_volume),
      reorder: true,
    },
    {
      name: "Cur: week revenue",
      selector: (row) => convertToCurrency(row.current_week_revenue),
      reorder: true,
    },
    {
      name: "Cur: week volume",
      selector: (row) => convertToCurrency(row.current_week_volume),
      reorder: true,
    },
    {
      name: "Forecasted revenue",
      selector: (row) => convertToPercentage(row.forecasted_revenue['1w'], row.forecasted_revenue['1m']),
      reorder: true,
    },
    {
      name: "Forecasted revenue change",
      selector: (row) => convertToPercentage(row.forecasted_revenue_change['1w'], row.forecasted_revenue_change['1m']),
      reorder: true,
    },
    {
      name: "Forecasted volume",
      selector: (row) => convertToPercentage(row.forecasted_volume['1w'], row.forecasted_volume['1m']),
      reorder: true,
    },
    {
      name: "Forecasted volume change",
      selector: (row) => convertToPercentage(row.forecasted_volume_change['1w'], row.forecasted_volume_change['1m']),
      reorder: true,
    },
    {
      name: "Prev: month revenue",
      selector: (row) => convertToCurrency(row.previous_month_revenue),
      reorder: true,
    },
    {
      name: "Prev: month revenue",
      selector: (row) => convertToCurrency(row.previous_month_revenue),
      reorder: true,
    },
    {
      name: "Prev: month volume",
      selector: (row) => convertToCurrency(row.previous_month_volume),
      reorder: true,
    },
    {
      name: "Prev: week revenue",
      selector: (row) => convertToCurrency(row.previous_week_revenue),
      reorder: true,
    },
    {
      name: "Prev: week volume",
      selector: (row) => convertToCurrency(row.previous_week_volume),
      reorder: true,
    }
  ]);

  const [data, setData] = useState([]);

  useEffect(() => {
    const ls = require("localstorage-ttl");

    async function checkls() {
      if (ls.get("salesReports") === null) {
        getData();
      } else {
        const salesReports = ls.get("salesReports");
        setData(salesReports);
        setLoadingData(false);
      }
    }

    async function getData() {
      await fetch(requestUrl, {
        method: "GET",
        credentials: "include",
        mode: "cors",
      })
        .then((response) =>     
            response.json()
        )
        .then((data) => {
          console.log(data);
          setData(data);
          ls.set("salesReports", data, 60000);
          setLoadingData(false); // SWITCHES THE loadingData TO false SO THE APP KNOWS CONTENT IS LOADED
        });
    }
    if (loadingData) {
      // IF loadingData IS true FETCH DATA FROM API
      checkls();
    }
  }, []);

  // CREATE A THEME FOR USE
  createTheme("solarized", {
    text: {
      primary: "#fff",
      secondary: "#fff",
    },
    background: {
      default: "transparent",
    },
    context: {
      background: "#000",
      text: "#FFFFFF",
    },
    divider: {
      default: "transparent",
    },
    action: {
      button: "rgba(0,0,0,.54)",
      hover: "rrgba(0, 203, 255, 0.8)",
      disabled: "rgba(0,0,0,.12)",
    },
  });

  const customStyles = {
    headRow: {
      style: {
        border: "10px solid",
        borderRadius: "10px",
        borderColor: "#1e1e26",
      },
    },
    headCells: {
      style: {
        color: "#fff",
        fontSize: "14px",
        backgroundColor: "#1e1e26",
      },
    },
    rows: {
      highlightOnHoverStyle: {
        backgroundImage:
          "linear-gradient(to top left, #2381d3 0%, #18a2b9 100%)",
        borderRadius: "10px",
        outline: "1px transparent",
      },
    },
    pagination: {
      style: {
        border: "none",
      },
    },
  };

  return (
    <>
      <div className="content">
        <ChakraProvider>
          <Row>
            <Col md="12">
              <Card>
                <CardBody>

                        {loadingData ? ( // CHECK IF loadingData IS true
                          <div class="d-flex justify-content-center">
                            <h1>
                              <Spinner animation="border" /> Loading (If data
                              isnt Loading, Please log in again)...
                            </h1>
                          </div>
                        ) : (
                          // IF loadingData IS flase DISPLAY TABLE
                          <DataTable
                            title="Sales Reports"
                            columns={columns}
                            data={data}
                            pagination
                            highlightOnHover
                            customStyles={customStyles}
                            theme="solarized"
                          />
                        )}
              
                </CardBody>
              </Card>
            </Col>
          </Row>
        </ChakraProvider>
        <LoginModal showLogin={showLogin}/>
      </div>
    </>
  );
}

export default SalesReports;
