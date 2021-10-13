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
import { Card, CardBody, Row, Col } from "reactstrap";

// TODO:
//  REMOVE EXPORT CSV IN INVENTORY
//  ADD TABBED LAYOUT WITH INVENTORY ACTIONS
//  CHANGE INVENTORY MANAGEMENT FOR NEW QUERY. (SEND POST REQUEST TO INVENTORY
//  ENDPOINT AND CHANGE FORM)

//INVENTORY
function addInventory() {
  var productId = document.getElementById("pID_inventory").value;
  var maxStock = document.getElementById("maxStock_inventory").value;
  var currentStock = document.getElementById("currentStock_inventory").value;
  var date = document.getElementById("date_inventory").value;

  const payload = {
    product_id: parseInt(productId),
    max_stock_capacity: parseInt(maxStock),
    current_stock: parseInt(currentStock),
    date_time: date,
  };
  if (productId === "") {
    alert("Enter Product ID");
  } else {
    var r =
      window.confirm(`do you want to ADD the following entry to Inventory: \n
    Product ID: ${productId} \n
    Max Stock Capacity: ${maxStock} \n
    Current Stock: ${currentStock} \n
    Date: ${date} \n`);
    if (r === true) {
      fetch("https://sisrestapi.herokuapp.com/inventory", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      alert("entry has been added");
    } else {
      alert("Entry not added");
    }
  }
}

function editInventory() {
  var updateIndex = document.getElementById("updateIndex").value;
  var productId = document.getElementById("pID_inventory").value;
  var maxStock = document.getElementById("maxStock_inventory").value;
  var currentStock = document.getElementById("currentStock_inventory").value;
  var date = document.getElementById("date_inventory").value;

  const payload = {
    product_id: parseInt(productId),
    max_stock_capacity: parseInt(maxStock),
    current_stock: parseInt(currentStock),
    date_time: date,
  };
  if (updateIndex === "") {
    alert("Enter Update Index");
  } else {
    var r = window.confirm(
      "do you want to Edit the following entry in Inventory"
    );
    if (r === true) {
      fetch("https://sisrestapi.herokuapp.com/inventory/" + updateIndex, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      alert("entry has been updated");
    } else {
      alert("Entry not Updated");
    }
  }
}

function deleteInventory() {
  var updateIndex = document.getElementById("updateIndex").value;

  if (updateIndex === "") {
    alert("Enter Update Index");
  } else {
    var r = window.confirm(
      "do you want to DELETE the following entry in Inventory"
    );
    if (r === true) {
      fetch("https://sisrestapi.herokuapp.com/inventory/" + updateIndex, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      alert("entry has been Deleted");
    } else {
      alert("Entry not Deleted");
    }
  }
}

const requestUrl = "https://sisrestapi.herokuapp.com/inventory";

function Inventory() {
  // SETS A STATE THAT TELLS THE APP DATA IS BEING LOADED
  const [loadingData, setLoadingData] = useState(true);

  // COLUMN FOR INVENTORY TABLE
  const columns = useMemo(() => [
    {
      name: "Product ID",
      selector: (row) => row.product_id,
      sortable: true,
      reorder: true,
    },
    {
      name: "Current Stock",
      selector: (row) => row.current_stock,
      reorder: true,
    },
    {
      name: "Date/Time",
      selector: (row) => row.date_time,
      sortable: true,
      reorder: true,
    },
  ]);

  const [data, setData] = useState([]);

  useEffect(() => {
    const ls = require("localstorage-ttl");

    async function checkls() {
      if (ls.get("inventoryData") === null) {
        getData();
      } else {
        const inventoryData = ls.get("inventoryData");
        setData(inventoryData);
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
          ls.set("inventoryData", data, 60000);
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
                          bg: "linear-gradient(to top left, #2381d3 0%, #18a2b9 100%)",
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
                          <div class="d-flex justify-content-center">
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
                          />
                        )}
                      </TabPanel>
                      <TabPanel>
                        <div>
                          <Stack spacing={10} style={{ color: "white" }}>
                            <InputGroup style={{ marginTop: "20px" }}>
                              <Input
                                variant="filled"
                                style={{ backgroundColor: "#1e1e26" }}
                                placeholder="Update Index"
                                type="Number"
                                id="updateIndex"
                              />
                            </InputGroup>
                            <InputGroup>
                              <Input
                                variant="filled"
                                style={{ backgroundColor: "#1e1e26" }}
                                placeholder="Product ID"
                                type="text"
                                id="pID_inventory"
                              />
                            </InputGroup>
                            <InputGroup>
                              <Input
                                variant="filled"
                                style={{ backgroundColor: "#1e1e26" }}
                                placeholder="Max Stock"
                                type="Text"
                                id="maxStock_inventory"
                              />
                            </InputGroup>
                            <InputGroup>
                              <Input
                                variant="filled"
                                style={{ backgroundColor: "#1e1e26" }}
                                placeholder="Current Stock"
                                type="Text"
                                id="currentStock_inventory"
                              />
                            </InputGroup>
                            <InputGroup>
                              <Input
                                variant="filled"
                                style={{
                                  borderBottom: "none",
                                  backgroundColor: "#1e1e26",
                                }}
                                placeholder="Date"
                                type="Date"
                                id="date_inventory"
                              />
                            </InputGroup>
                          </Stack>
                        </div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-info"
                            onClick={addInventory}
                          >
                            Add
                          </button>
                          <button
                            type="button"
                            class="btn btn-info"
                            onClick={editInventory}
                          >
                            Update
                          </button>
                          <button
                            type="button"
                            class="btn btn-danger"
                            onClick={deleteInventory}
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

export default Inventory;
