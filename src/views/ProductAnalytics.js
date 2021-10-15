import React, { useMemo, useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import DataTable, { createTheme } from "react-data-table-component";
import { ChakraProvider } from "@chakra-ui/react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";

// reactstrap components
import { Button, Card, CardBody, Row, Col } from "reactstrap";

//TODO:
//  Replace JavaScript alert with alerts from "react-notification-alert" package
//  as seen in Notifications.js
//  Instead of calling data from the API after CRUD methods, delete relevant
//  local storage item instead so its redownloaded on UI refresh
function convertToPercentage (num) {
  let percentage = num * 100
  return percentage.toFixed(0) + ' %'
}

function convertToCurrency (num) {
  return num.toFixed(2) + ' AUD'
}

function convertToInt (num) {
  return Math.abs(num.toFixed(0));
}

const ExpandedComponent = ({ data }) => <pre>
      {JSON.stringify(data, null, 2)
        .replaceAll('{', '')
        .replaceAll('}', '')
        .replaceAll(',', '')
        .replaceAll('"', '')
        .replaceAll('_', ' ')}
    </pre>;

function Sales() {
  // SET URL TO GET SALES ENDPOINT
  const requestUrl = "https://sisrestapi.herokuapp.com/report/product";

  // SETS A STATE THAT TELLS THE APP DATA IS BEING LOADED
  const [loadingData, setLoadingData] = useState(true);

  // COLUMN FOR SALES TABLE
  const weeklyColumn = useMemo(() => [
    {
      name: 'Product ID',
      selector: row => row.product_id,
      sortable: true,
      reorder: true
    },
    {
      name: 'Product Name',
      selector: row => row.product_name,
      sortable: true,
      reorder: true
    },
    {
      name: 'Product group',
      selector: row => row.product_group,
      sortable: true,
      reorder: true
    },
    {
      name: 'Week sales',
      selector: row => convertToCurrency(row.current_week_revenue),
      sortable: true,
      reorder: true
    },
    {
      name: 'Week volume',
      selector: row => convertToCurrency(row.current_week_volume),
      sortable: true,
      reorder: true
    },
    {
      name: 'Forecast revenue',
      selector: row => convertToPercentage(row.forecasted_revenue['1w']),
      sortable: true,
      reorder: true
    },
    {
      name: 'Forecast volume',
      selector: row => convertToPercentage(row.forecasted_volume['1w']),
      sortable: true,
      reorder: true
    },
    {
      name: 'Current Stock',
      selector: row => row.inventory_comparison['current_stock'],
    },
    {
      name: 'Stock Deficit',
      selector: row => convertToInt(row.inventory_comparison['1w_deficit']),
      sortable: true,
      reorder: true
    }
  ])

  const monthlyColumn = useMemo(() => [
    {
      name: 'Product ID',
      selector: row => row.product_id,
      sortable: true,
      reorder: true
    },
    {
      name: 'Product Name',
      selector: row => row.product_name,
      sortable: true,
      reorder: true
    },
    {
      name: 'Product group',
      selector: row => row.product_group,
      sortable: true,
      reorder: true
    },
    {
      name: 'Cur: Month revenue',
      selector: row => convertToCurrency(row.current_month_revenue),
      reorder: true
    },
    {
      name: 'Cur: Month volume',
      selector: row => convertToCurrency(row.current_month_volume),
      reorder: true
    },
    {
      name: 'Forecast revenue',
      selector: row => convertToPercentage(row.forecasted_revenue['1m']),
      reorder: true
    },
    {
      name: 'Forecast volume',
      selector: row => convertToPercentage(row.forecasted_volume['1m']),
      reorder: true
    },
    {
      name: 'Current Stock',
      selector: row => row.inventory_comparison['current_stock'],
    },
    {
      name: 'Stock Deficit',
      selector: row => convertToInt(row.inventory_comparison['1m_deficit']),
      sortable: true,
      reorder: true
    }
  ])
  // SETS A STATE FOR DATA
  const [data, setData] = useState([]);

  useEffect(() => {
    const ls = require("localstorage-ttl");

    async function checkls() {
      if (ls.get("salesData") == null) {
        getData();
      } else {
        const salesData = ls.get("salesData");
        setData(salesData);
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
          ls.set("salesData", data, 60000);
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
        border: '10px solid',
        borderRadius: "10px",
        borderColor: '#1e1e26'
      }
    },
    headCells: {
      style: {
        color: '#fff',
        fontSize: '14px',
        backgroundColor: '#1e1e26'
      }
    },
    rows: {
      highlightOnHoverStyle: {
        backgroundImage: 'linear-gradient(to top left, #2381d3 0%, #18a2b9 100%)',
        borderRadius: "10px",
        outline: "1px transparent"
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
                  <Tabs
                    variant="soft-rounded"
                    size="md"
                    isFitted
                    defaultIndex={0}
                  >
                    <div
                      style={{
                        backgroundColor: "#1e1e26",
                        borderRadius: "100px",
                      }}
                    >
                    </div>
                    <TabPanels>
                      <TabPanel>
                        {loadingData ? ( // CHECK IF loadingData IS true
                          <div className="d-flex justify-content-center">
                            <h1>
                              <Spinner animation="border" /> Loading (If data
                              isnt Loading, Please log in again)...
                            </h1>
                          </div>
                        ) : (
                          // IF loadingData IS flase DISPLAY TABLE
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
                        )}
                        {loadingData ? ( // CHECK IF loadingData IS true
                          <div className="d-flex justify-content-center">
                            <h1>
                              <Spinner animation="border" /> Loading (If data
                              isnt Loading, Please log in again)...
                            </h1>
                          </div>
                        ) : (
                          // IF loadingData IS flase DISPLAY TABLE
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
                        )}  
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
        </ChakraProvider>
      </div>
    </>
  );
}

export default Sales;
