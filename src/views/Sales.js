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
  Input,
  InputGroup,
  Stack,
} from "@chakra-ui/react";

// reactstrap components
import { Button, Card, CardBody, Row, Col } from "reactstrap";

//TODO:
//  Replace JavaScript alert with alerts from "react-notification-alert" package
//  as seen in Notifications.js
//  Instead of calling data from the API after CRUD methods, delete relevant
//  local storage item instead so its redownloaded on UI refresh

async function updateTable() {
  const ls = require("localstorage-ttl");
  await fetch("https://sisrestapi.herokuapp.com/sales", {
    method: "GET",
    credentials: "include",
    mode: "cors",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      ls.set("salesData", data, 60000);
    });
}

//SALES
function addSales() {
  var productId = document.getElementById("pID_sales").value;
  var quantity = document.getElementById("quantity_sales").value;
  var date = document.getElementById("date_sales").value;
  var dispatch = document.getElementById("dispatch").value;

  const payload = {
    product_id: productId,
    quantity_sold: parseInt(quantity),
    date_time: date,
    dispatched: parseInt(dispatch),
  };

  var r = window.confirm("do you want to add the following entry in Inventory");
  if (r === true) {
    fetch("https://sisrestapi.herokuapp.com/sales", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    alert("entry has been added");
    updateTable();
  } else {
    alert("Entry not added");
  }
}

function editSales() {
  var salesId = document.getElementById("salesID").value;
  var productId = document.getElementById("pID_sales").value;
  var quantity = document.getElementById("quantity_sales").value;
  var date = document.getElementById("date_sales").value;
  var dispatch = document.getElementById("dispatch").value;

  const payload = {
    product_id: productId,
    quantity_sold: parseInt(quantity),
    date_time: date,
    dispatched: parseInt(dispatch),
  };
  if (salesId === "") {
    alert("please enter a sales ID");
  } else {
    var r = window.confirm("do you want to Edit the following entry in Sales");
    if (r === true) {
      fetch("https://sisrestapi.herokuapp.com/sales/" + salesId, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      alert("entry has been updated");
      updateTable();
    } else {
      alert("Entry not Updated");
    }
  }
}

function deleteSales() {
  var salesId = document.getElementById("salesID").value;

  var r = window.confirm(
    "do you want to DELETE the following entry in Inventory"
  );
  if (r === true) {
    fetch("https://sisrestapi.herokuapp.com/sales/" + salesId, {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    alert("entry has been Deleted");
    updateTable();
  } else {
    alert("Entry not Deleted");
  }
}

function Sales() {
  // SET URL TO GET SALES ENDPOINT
  const requestUrl = "https://sisrestapi.herokuapp.com/sales";

  // SETS A STATE THAT TELLS THE APP DATA IS BEING LOADED
  const [loadingData, setLoadingData] = useState(true);

  // COLUMN FOR SALES TABLE
  const columns = useMemo(() => [
    {
      name: "Sales ID",
      selector: (row) => row.sales_id,
      sortable: true,
      reorder: true,
    },
    {
      name: "Product ID",
      selector: (row) => row.product_id,
      sortable: true,
      reorder: true,
    },
    {
      name: "Product Name",
      selector: (row) => row.product_name,
      reorder: true,
    },
    {
      name: "Product Group",
      selector: (row) => row.product_group,
      reorder: true,
    },
    {
      name: "Product Description",
      selector: (row) => row.product_description,
      reorder: true,
    },
    {
      name: "Product Price",
      selector: (row) => row.product_price,
      reorder: true,
    },
    {
      name: "Quantity Sold",
      selector: (row) => row.quantity_sold,
      sortable: true,
      reorder: true,
    },
    {
      name: "Date/Time",
      selector: (row) => row.date_time,
      sortable: true,
      reorder: true,
    },
    {
      name: "Dispatched",
      selector: (row) => row.dispatched,
      reorder: true,
    },
    {
      name: "Total Revenue",
      selector: (row) => row.total_revenue,
      sortable: true,
      reorder: true,
    },
  ]);
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

  // EXPORT CSV
  function convertArrayOfObjectsToCSV(array) {
    // COONVERT THE TABLE INTO A SUITABLE FORMAT
    let result;

    const columnDelimiter = ",";
    const lineDelimiter = "\n";
    const keys = Object.keys(data[0]);

    result = "";
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach((item) => {
      let ctr = 0;
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];

        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  }

  // inspiration from https://codepen.io/Jacqueline34/pen/pyVoWr
  function downloadCSV(array) {
    const link = document.createElement("a");
    let csv = convertArrayOfObjectsToCSV(array);
    if (csv == null) return;

    let today = new Date().toISOString().slice(0, 10); // TODAYS DATE IN THE YYYY-MM-DD FORMAT

    const filename = `Sales_Data_${today}.csv`; // SET CSV FILENAME

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", filename);
    link.click();
  }

  const Export = (
    { onExport } // BIND BUTTON TO EXPORT
  ) => <Button onClick={(e) => onExport(e.target.value)}>Export CSV</Button>;

  const actionsMemo = React.useMemo(
    // ADD EXPORT AS AN ACTION WHEN CALLED BY TABLE
    () => <Export onExport={() => downloadCSV(data)} />,
    []
  );

  return (
    <>
      <div className="content">
        <ChakraProvider>
          <Row>
            <Col md="12">
              <Card>
                <CardBody>
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
                      <TabList>
                        <Tab
                          _selected={{
                            bg: "linear-gradient(to top left, #2381d3 0%, #18a2b9 100%)"
                          }}
                          style={{
                            color: "white",
                            outline: "none",
                            border: "none",
                            boxShadow: "none",
                          }}
                        >
                          Sales Records
                        </Tab>
                        <Tab
                          _selected={{
                            bg: "linear-gradient(to top left, #2381d3 0%, #18a2b9 100%)",
                          }}
                          style={{
                            color: "white",
                            outline: "none",
                            border: "none",
                            boxShadow: "none",
                          }}
                        >
                          Sales Management
                        </Tab>
                      </TabList>
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
                            title="Sales Table"
                            columns={columns}
                            data={data}
                            pagination
                            highlightOnHover
                            customStyles={customStyles}
                            theme="solarized"
                            actions={actionsMemo}
                          />
                        )}
                      </TabPanel>
                      <TabPanel>
                        <div>
                          <div class="form-group">
                            <Stack spacing={10} style={{ color: "white" }}>
                              <InputGroup style={{ marginTop: "20px" }}>
                                <Input
                                  variant="filled"
                                  style={{ backgroundColor: "#1e1e26" }}
                                  placeholder="Sales ID"
                                  type="Number"
                                  id="salesID"
                                />
                              </InputGroup>
                              <InputGroup>
                                <Input
                                  variant="filled"
                                  style={{ backgroundColor: "#1e1e26" }}
                                  placeholder="Product ID"
                                  type="text"
                                  id="pID_sales"
                                />
                              </InputGroup>
                              <InputGroup>
                                <Input
                                  variant="filled"
                                  style={{ backgroundColor: "#1e1e26" }}
                                  placeholder="Quantity Sold"
                                  type="Text"
                                  id="quantity_sales"
                                />
                              </InputGroup>
                              <InputGroup>
                                <Input
                                  variant="filled"
                                  style={{ backgroundColor: "#1e1e26" }}
                                  placeholder="Date"
                                  type="Date"
                                  id="date_sales"
                                />
                              </InputGroup>
                              <InputGroup>
                                <Input
                                  variant="filled"
                                  style={{ backgroundColor: "#1e1e26" }}
                                  placeholder="Dispatch"
                                  type="Text"
                                  id="dispatch"
                                />
                              </InputGroup>
                            </Stack>
                          </div>
                        </div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-info"
                            onClick={addSales}
                          >
                            Add
                          </button>
                          <button
                            type="button"
                            class="btn btn-info"
                            onClick={editSales}
                          >
                            Update
                          </button>
                          <button
                            type="button"
                            class="btn btn-danger"
                            onClick={deleteSales}
                          >
                            Delete
                          </button>
                        </div>
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </ChakraProvider>
      </div>
    </>
  );
}

export default Sales;
