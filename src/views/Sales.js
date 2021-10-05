import React, { useMemo, useState, useEffect } from "react";
import { Tabs, Tab } from "react-bootstrap";
import DataTable, { createTheme } from "react-data-table-component";

// reactstrap components
import { Button, Card, CardHeader, CardBody, Row, Col } from "reactstrap";

//TODO:
//  Replace JavaScript alert with alerts from "react-notification-alert" package
//  as seen in Notifications.js

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

    var r = window.confirm(
        "do you want to add the following entry in Inventory"
    );
    if (r === true) {
        fetch("https://sisrestapi.herokuapp.com/sales", {
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
        var r = window.confirm(
            "do you want to Edit the following entry in Sales"
        );
        if (r === true) {
            fetch("https://sisrestapi.herokuapp.com/sales/" + salesId, {
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
            default: "#FFF",
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
                border: "none",
            },
        },
        headCells: {
            style: {
                color: "#fff",
                fontSize: "14px",
            },
        },
        rows: {
            highlightOnHoverStyle: {
                backgroundColor: "rgba(0, 203, 255, 1)",
                borderBottomColor: "#FFFFFF",
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
    ) => <Button onClick={(e) => onExport(e.target.value)}>Export</Button>;

    const actionsMemo = React.useMemo(
        // ADD EXPORT AS AN ACTION WHEN CALLED BY TABLE
        () => <Export onExport={() => downloadCSV(data)} />,
        []
    );

    return (
        <>
            <div className="content">
                <Tabs
                    variant="pills"
                    defaultActiveKey="Records"
                    className="mb-3"
                >
                    <Tab
                        eventKey="Records"
                        title="Sales Records"
                        style={{ color: "white" }}
                    >
                        <div>
                            <Row>
                                <Col md="12">
                                    <Card>
                                        <CardHeader></CardHeader>
                                        <CardBody>
                                            {loadingData ? ( // CHECK IF loadingData IS true
                                                <p>Loading Please wait...</p> // IF loadingData IS true DISPLAY LOADING...
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
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    </Tab>

                    <Tab
                        eventKey="Management"
                        title="Manage Records"
                        style={{ color: "white" }}
                    >
                        <div>
                            <div class="form-group">
                                <label for="salesID">Sales ID</label>
                                <input
                                    type="text"
                                    id="salesID"
                                    class="form-control"
                                />
                            </div>

                            <div class="form-group">
                                <label for="pID_sales">Product ID</label>
                                <input
                                    type="text"
                                    id="pID_sales"
                                    class="form-control"
                                />
                            </div>

                            <div class="form-group">
                                <label for="quantity_sales">
                                    Quantity Sold
                                </label>
                                <input
                                    type="text"
                                    id="quantity_sales"
                                    class="form-control"
                                />
                            </div>

                            <div class="form-group">
                                <label for="date_sales">Date</label>
                                <input
                                    type="date"
                                    id="date_sales"
                                    class="form-control"
                                />
                            </div>

                            <div class="form-group">
                                <label for="dispatch">Dispatch</label>
                                <input
                                    type="text"
                                    id="dispatch"
                                    class="form-control"
                                />
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
                    </Tab>
                </Tabs>
            </div>
        </>
    );
}

export default Sales;
