import React, { useMemo, useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import DataTable, { createTheme } from "react-data-table-component";
import { ChakraProvider } from "@chakra-ui/react";

// reactstrap components
import { Card, CardBody, Row, Col } from "reactstrap";

function convertToPercentage(num) {
  let percentage = num * 100;
  return percentage.toFixed(2) + " %";
}

function convertToCurrency(num) {
  return num.toFixed(0) + " AUD";
}

const requestUrl = "https://sisrestapi.herokuapp.com/report/productcategory";

function SalesReports() {
  // SETS A STATE THAT TELLS THE APP DATA IS BEING LOADED
  const [loadingData, setLoadingData] = useState(true);

  // COLUMN FOR WEEKLY TABLE
  const weeklyColumn = useMemo(() => [
    {
      name: "Product group",
      selector: (row) => row.product_group,
      sortable: true,
      reorder: true,
    },
    {
      name: "Revenue change (weekly)",
      selector: (row) => convertToPercentage(row.revenue_change["1w"]),
      sortable: true,
      reorder: true,
    },
    {
      name: "Volume change (Weekly)",
      selector: (row) => convertToPercentage(row.volume_change["1w"]),
      sortable: true,
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
      name: "Forecasted revenue (Weekly)",
      selector: (row) => convertToPercentage(row.forecasted_revenue["1w"]),
      reorder: true,
    },
    {
      name: "Forecasted revenue change (Weekly)",
      selector: (row) =>
        convertToPercentage(row.forecasted_revenue_change["1w"]),
      reorder: true,
    },
    {
      name: "Forecasted volume (Weekly)",
      selector: (row) => convertToPercentage(row.forecasted_volume["1w"]),
      reorder: true,
    },
    {
      name: "Forecasted volume change (Weekly)",
      selector: (row) =>
        convertToPercentage(row.forecasted_volume_change["1w"]),
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
    },
  ]);

  // COLUMN FOR MONTHLY TABLE
  const monthlyColumn = useMemo(() => [
    {
      name: "Product group",
      selector: (row) => row.product_group,
      sortable: true,
      reorder: true,
    },
    {
      name: "Revenue change (Monthly)",
      selector: (row) => convertToPercentage(row.revenue_change["1m"]),
      sortable: true,
      reorder: true,
    },
    {
      name: "Volume change (Monthly)",
      selector: (row) => convertToPercentage(row.volume_change["1m"]),
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
      name: "Forecasted revenue (Monthly)",
      selector: (row) => convertToPercentage(row.forecasted_revenue["1m"]),
      reorder: true,
    },
    {
      name: "Forecasted revenue change (Monthly)",
      selector: (row) =>
        convertToPercentage(row.forecasted_revenue_change["1m"]),
      reorder: true,
    },
    {
      name: "Forecasted volume (Monthly)",
      selector: (row) => convertToPercentage(row.forecasted_volume["1m"]),
      reorder: true,
    },
    {
      name: "Forecasted volume change (Monthly)",
      selector: (row) =>
        convertToPercentage(row.forecasted_volume_change["1m"]),
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
        .then((response) => response.json())
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
                        <Spinner animation="border" /> Loading (If data isnt
                        Loading, Please log in again)...
                      </h1>
                    </div>
                  ) : (
                    // IF loadingData IS flase DISPLAY TABLE
                    <div>
                      <DataTable
                        title="Sales Reports"
                        columns={weeklyColumn}
                        data={data}
                        pagination
                        highlightOnHover
                        customStyles={customStyles}
                        theme="solarized"
                      />
                      <DataTable
                        title="Sales Reports"
                        columns={monthlyColumn}
                        data={data}
                        pagination
                        highlightOnHover
                        customStyles={customStyles}
                        theme="solarized"
                      />
                    </div>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </ChakraProvider>
      </div>
    </>
  );
}

export default SalesReports;
