import React, { useMemo, useState, useEffect } from "react";
import { Tabs, Tab, OverlayTrigger, Tooltip } from "react-bootstrap";
import DataTable, { createTheme } from "react-data-table-component";

// reactstrap components
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";

//TOOLTIP FOR PRODUCT ID
const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
        Only Enter product ID if you are UPDATING or DELETING a product.
    </Tooltip>
);

//PRODUCTS
function addProduct() {
    var productName = document.getElementById("pName_product").value;
    var productGroup = document.getElementById("pGroup_product").value;
    var productDescription = document.getElementById(
        "pDescription_product"
    ).value;
    var price = document.getElementById("price_product").value;

    const payload = {
        product_name: productName,
        product_group: productGroup,
        product_description: productDescription,
        product_price: parseInt(price),
    };
    var r = window.confirm(
        `do you want to ADD the follwoing entry: \n
    Product Name: ${productName} \n
    Product Group: ${productGroup} \n
    Product Description: ${productDescription} \n
    Product Price: ${price}`
    );

    if (r === true) {
        fetch("https://sisrestapi.herokuapp.com/products", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        alert("Added Product to the database");
    } else {
        alert("Did not add Product to database");
    }
}

function editProduct() {
    var productId = document.getElementById("pID_product").value;
    var productName = document.getElementById("pName_product").value;
    var productGroup = document.getElementById("pGroup_product").value;
    var productDescription = document.getElementById(
        "pDescription_product"
    ).value;
    var price = document.getElementById("price_product").value;

    const payload = {
        product_name: productName,
        product_group: productGroup,
        product_description: productDescription,
        product_price: price,
    };
    if (productId === "") {
        alert(
            "please enter the product ID of the product you're trying to edit"
        );
    } else {
        fetch("https://sisrestapi.herokuapp.com/products/" + productId, {
            method: "PATCH",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
    }
}

function deleteProduct() {
    var productId = document.getElementById("pID_product").value;
    var r = window.confirm(
        `Do you want to DELETE the follwoing entry: \n
    Product ID: ${productId}`
    );
    if (r === true) {
        fetch("https://sisrestapi.herokuapp.com/products/" + productId, {
            method: "DELETE",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        });
        alert("Deleted Product from the database");
    } else {
        alert("Did not delete Product from the database");
    }
}

function Products() {
    // SET URL TO GET PRODUCT ENDPOINT
    const requestUrl = "https://sisrestapi.herokuapp.com/products";

    // SETS A STATE THAT TELLS THE APP DATA IS BEING LOADED
    const [loadingData, setLoadingData] = useState(true);

    // COLUMN FOR PRODUCT TABLE
    const columns = useMemo(() => [
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
    ]);
    // SETS A STATE FOR DATA
    const [data, setData] = useState([]);

    useEffect(() => {
        const ls = require("localstorage-ttl");

        async function checkls() {
            if (ls.get("productData") == null) {
                getData();
            } else {
                const productData = ls.get("productData");
                setData(productData);
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
                    ls.set("productData", data, 60000);
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
                        title="Product Records"
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
                                                    title="Products Table"
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
                        </div>
                    </Tab>

                    <Tab
                        eventKey="Management"
                        title="Manage Records"
                        style={{ color: "white" }}
                    >
                        <div>
                            <div class="form-group">
                                <label for="pID_product">Product ID</label>
                                <OverlayTrigger
                                    placement="right"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltip}
                                >
                                    <i class="tim-icons icon-alert-circle-exc"></i>
                                </OverlayTrigger>
                                <input
                                    type="text"
                                    id="pID_product"
                                    class="form-control"
                                />
                            </div>

                            <div class="form-group">
                                <label for="pName_product">Product Name</label>
                                <input
                                    type="text"
                                    id="pName_product"
                                    class="form-control"
                                />
                            </div>

                            <div class="form-group">
                                <label for="pGroup_product">
                                    Product Group
                                </label>
                                <input
                                    type="text"
                                    id="pGroup_product"
                                    class="form-control"
                                />
                            </div>

                            <div class="form-group">
                                <label for="pDescription_product">
                                    Product Description
                                </label>
                                <input
                                    type="text"
                                    id="pDescription_product"
                                    class="form-control"
                                />
                            </div>

                            <div class="form-group">
                                <label for="price_product">Price</label>
                                <input
                                    type="text"
                                    id="price_product"
                                    class="form-control"
                                />
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button
                                type="button"
                                class="btn btn-info"
                                onClick={addProduct}
                            >
                                Add
                            </button>
                            <button
                                type="button"
                                class="btn btn-info"
                                onClick={editProduct}
                            >
                                Update
                            </button>
                            <button
                                type="button"
                                class="btn btn-danger"
                                onClick={deleteProduct}
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

export default Products;
