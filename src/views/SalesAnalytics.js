import React, { useMemo, useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import DataTable, { createTheme } from "react-data-table-component";
import { ChakraProvider } from "@chakra-ui/react";
import { Button } from "reactstrap";
import { CSVLink, CSVDownload } from "react-csv";

function convertToPercentage(num) {
 let percentage = num * 100;
 return percentage.toFixed(2) + " %";
}

function convertToCurrency(num) {
 return "AUD " + num.toFixed(2);
}

const requestUrl = "https://sisrestapi.herokuapp.com/report/productcategory";

function SalesReports() {
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

 // SETS A STATE THAT TELLS THE APP DATA IS BEING LOADED
 const [loadingData, setLoadingData] = useState(true);

 const [showLogin, setShowLogin] = useState(false);

 // COLUMN FOR INVENTORY TABLE
 const columnsWeeks = useMemo(() => [
  {
   name: "Product group",
   selector: (row) => row.product_group,
   sortable: true,
   reorder: true,
  },
  {
   name: "Revenue change",
   selector: (row) => convertToPercentage(row.revenue_change["1w"]),
   sortable: true,
   reorder: true,
  },
  {
   name: "Volume change",
   selector: (row) => convertToPercentage(row.volume_change["1w"]),
   sortable: true,
   reorder: true,
  },
  {
   name: "Forecasted revenue ",
   selector: (row) => convertToCurrency(row.forecasted_revenue["1w"]),
   reorder: true,
  },
  {
   name: "Forecasted volume",
   selector: (row) => row.forecasted_volume["1w"].toFixed(0),
   reorder: true,
  },
  {
   name: "Forecasted volume change",
   selector: (row) => convertToPercentage(row.forecasted_volume_change["1w"]),
   reorder: true,
  },
 ]);

 const columnsMonths = useMemo(() => [
  {
   name: "Product group",
   selector: (row) => row.product_group,
   sortable: true,
   reorder: true,
  },
  {
   name: "Revenue change",
   selector: (row) => convertToPercentage(row.revenue_change["1m"]),
   sortable: true,
   reorder: true,
  },
  {
   name: "Volume change",
   selector: (row) => convertToPercentage(row.volume_change["1m"]),
   sortable: true,
   reorder: true,
  },
  {
   name: "Forecasted revenue",
   selector: (row) => convertToCurrency(row.forecasted_revenue["1m"]),
   reorder: true,
  },

  {
   name: "Forecasted volume",
   selector: (row) => row.forecasted_volume["1m"].toFixed(0),
   reorder: true,
  },
  {
   name: "Forecasted volume change",
   selector: (row) => convertToPercentage(row.forecasted_volume_change["1m"]),
   reorder: true,
  },
 ]);

 const [data, setData] = useState([]);

 const ls = require("localstorage-ttl");

 useEffect(() => {
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
    .then((response) => response.json())
    .then((data) => {
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
 // Download data as excel CSV
 const jsonHeaders = [
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
 ];
 const jsonData = ls.get("salesReports");

 return (
  <>
   <div className="content">
    <ChakraProvider>
     {loadingData ? ( // CHECK IF loadingData IS true
      <div class="d-flex justify-content-center">
       <h1>
        <Spinner animation="border" /> Loading (If data isnt Loading, Please log
        in again)...
       </h1>
      </div>
     ) : (
      // IF loadingData IS flase DISPLAY TABLE
      <div>
       <CSVLink
        as={Button}
        filename={"Sales_Analytics.csv"}
        data={jsonData}
        headers={jsonHeaders}
       >
        <Button>Downlad CSV</Button>
       </CSVLink>
       <DataTable
        title="Weekly Reports"
        columns={columnsWeeks}
        data={data}
        pagination
        highlightOnHover
        customStyles={customStyles}
        theme="solarized"
        expandableRows
        expandableRowsComponent={ExpandedComponent}
       />

       <DataTable
        title="Monthly Reports"
        columns={columnsMonths}
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

export default SalesReports;
