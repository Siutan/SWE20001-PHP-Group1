import React, { useMemo, useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import DataTable, { createTheme } from "react-data-table-component";
import { ChakraProvider } from "@chakra-ui/react";
import { Button } from "reactstrap";
import { CSVLink, CSVDownload } from "react-csv";

//TODO:
//  Replace JavaScript alert with alerts from "react-notification-alert" package
//  as seen in Notifications.js
//  Instead of calling data from the API after CRUD methods, delete relevant
//  local storage item instead so its redownloaded on UI refresh

function convertToCurrency(num) {
 return "AUD " + num.toFixed(2);
}

function convertToInt(num) {
 return Math.abs(num.toFixed(0));
}

const ExpandedComponent = ({ data }) => (
 <pre>
  {JSON.stringify(data, null, 2)
   .replaceAll("{", "")
   .replaceAll("}", "")
   .replaceAll(",", "")
   .replaceAll('"', "")
   .replaceAll("_", " ")}
 </pre>
);

function Sales() {
 // initilise Localstorage
 const ls = require("localstorage-ttl");

 // SET URL TO GET SALES ENDPOINT
 const requestUrl = "https://sisrestapi.herokuapp.com/report/product";

 // SETS A STATE THAT TELLS THE APP DATA IS BEING LOADED
 const [loadingData, setLoadingData] = useState(true);

 // COLUMN FOR SALES TABLE
 const weeklyColumn = useMemo(() => [
  {
   name: "Product ID",
   selector: (row) => row.product_id,
   sortable: true,
   reorder: true,
  },
  {
   name: "Product Name",
   selector: (row) => row.product_name,
   sortable: true,
   reorder: true,
  },
  {
   name: "Product group",
   selector: (row) => row.product_group,
   sortable: true,
   reorder: true,
  },
  {
   name: "Week sales",
   selector: (row) => convertToCurrency(row.current_week_revenue),
   sortable: true,
   reorder: true,
  },
  {
   name: "Week volume",
   selector: (row) => row.current_week_volume,
   sortable: true,
   reorder: true,
  },
  {
   name: "Forecast revenue",
   selector: (row) => convertToCurrency(row.forecasted_revenue["1w"]),
   sortable: true,
   reorder: true,
  },
  {
   name: "Forecast volume",
   selector: (row) => Math.round(row.forecasted_volume["1w"]),
   sortable: true,
   reorder: true,
  },
  {
   name: "Current Stock",
   selector: (row) => row.inventory_comparison["current_stock"],
  },
  {
   name: "Stock Deficit",
   selector: (row) => convertToInt(row.inventory_comparison["1w_deficit"]),
   sortable: true,
   reorder: true,
  },
 ]);

 const monthlyColumn = useMemo(() => [
  {
   name: "Product ID",
   selector: (row) => row.product_id,
   sortable: true,
   reorder: true,
  },
  {
   name: "Product Name",
   selector: (row) => row.product_name,
   sortable: true,
   reorder: true,
  },
  {
   name: "Product group",
   selector: (row) => row.product_group,
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
   selector: (row) => row.current_month_volume,
   reorder: true,
  },
  {
   name: "Forecast revenue",
   selector: (row) => convertToCurrency(row.forecasted_revenue["1m"]),
   reorder: true,
  },
  {
   name: "Forecast volume",
   selector: (row) => Math.round(row.forecasted_volume["1m"]),
   reorder: true,
  },
  {
   name: "Current Stock",
   selector: (row) => row.inventory_comparison["current_stock"],
  },
  {
   name: "Stock Deficit",
   selector: (row) => convertToInt(row.inventory_comparison["1m_deficit"]),
   sortable: true,
   reorder: true,
  },
 ]);
 // SETS A STATE FOR DATA
 const [data, setData] = useState([]);

 useEffect(() => {
  async function checkls() {
   if (ls.get("productAnalytics") == null) {
    getData();
   } else {
    const productAnalytics = ls.get("productAnalytics");
    setData(productAnalytics);
    setLoadingData(false);
   }
  }
  async function getData() {
   await fetch(requestUrl, {
    method: "GET",
    credentials: "include",
    mode: "cors",
   })
    .then((response) => response.json())
    .then((data) => {
     setData(data);
     ls.set("productAnalytics", data, 60000);
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
    backgroundImage: "linear-gradient(to top left, #2381d3 0%, #18a2b9 100%)",
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

 const jsonHeaders = [
  { label: "product id", key: "product_id" },
  { label: "product name", key: "product_name" },
  { label: "product group", key: "product_group" },
  { label: "previous month revenue", key: "previous_month_revenue" },
  { label: "Previuos month volume", key: "previous_month_volume" },
  { label: "current month revenue", key: "current_month_revenue" },
  { label: "current month volume", key: "current_month_volume" },
  { label: "previous week revenue", key: "previous_week_revenue" },
  { label: "previous week volume", key: "previous_week_volume" },
  { label: "current week revenue", key: "current_week_revenue" },
  { label: "current week volume", key: "current_week_volume" },
  { label: "weekly revenue change", key: "revenue_change.1w" },
  { label: "monthly revenue change", key: "revenue_change.1m" },
  { label: "Weekly Volume change", key: "volume_change.1w" },
  { label: "monthly Volume change", key: "volume_change.1m" },
  {
   label: "weekly forecasted revenue change",
   key: "forecasted_revenue_change.1w",
  },
  {
   label: "monthly forecasted revenue change",
   key: "forecasted_revenue_change.1m",
  },
  { label: "weekly forecasted revenue", key: "forecasted_revenue.1w" },
  { label: "monthly forecasted revenue", key: "forecasted_revenue.1m" },
  {
   label: "weekly forecasted volume change",
   key: "forecasted_volume_change.1w",
  },
  {
   label: "monthly forecasted volume change",
   key: "forecasted_volume_change.1m",
  },
  { label: "weekly forecasted volume", key: "forecasted_volume.1w" },
  { label: "monthly forecasted volume", key: "forecasted_volume.1m" },
  { label: "last update", key: "inventory_comparison.last_update" },
  { label: "current stock", key: "inventory_comparison.current_stock" },
  { label: "1 week deficit", key: "inventory_comparison.1w_deficit" },
  { label: "1 month deficit", key: "inventory_comparison.1m_deficit" },
 ];

 const jsonData = ls.get("productAnalytics");

 return (
  <>
   <div className="content">
    <ChakraProvider>
     {loadingData ? ( // CHECK IF loadingData IS true
      <div className="d-flex justify-content-center">
       <h1>
        <Spinner animation="border" /> Loading (If data isnt Loading, Please log
        in again)...
       </h1>
      </div>
     ) : (
      // IF loadingData IS flase DISPLAY TABLE
      <div>
       <CSVLink
        filename={"Product_Analytics.csv"}
        data={jsonData}
        headers={jsonHeaders}
       >
        <Button>Downlad CSV</Button>
       </CSVLink>
       ;
       <DataTable
        title="Weekly Product Information Table "
        columns={weeklyColumn}
        data={data}
        pagination
        highlightOnHover
        customStyles={customStyles}
        theme="solarized"
        expandableRows
        expandableRowsComponent={ExpandedComponent}
       />
       <DataTable
        title="Monthly Product Information Table "
        columns={monthlyColumn}
        data={data}
        pagination
        highlightOnHover
        customStyles={customStyles}
        theme="solarized"
        expandableRows
        expandableRowsComponent={ExpandedComponent}
       />
      </div>
     )}
    </ChakraProvider>
   </div>
  </>
 );
}

export default Sales;
