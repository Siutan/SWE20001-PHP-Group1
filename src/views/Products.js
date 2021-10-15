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

//TODO: Add updateTable function to product functions.

//PRODUCTS
function addProduct() {
 var productName = document.getElementById("pName_product").value;
 var productGroup = document.getElementById("pGroup_product").value;
 var productDescription = document.getElementById("pDescription_product").value;
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
  localStorage.removeItem("productData");
  alert("Added Product to the database");
 } else {
  alert("Did not add Product to database");
 }
}

function editProduct() {
 var productId = document.getElementById("pID_product").value;
 var productName = document.getElementById("pName_product").value;
 var productGroup = document.getElementById("pGroup_product").value;
 var productDescription = document.getElementById("pDescription_product").value;
 var price = document.getElementById("price_product").value;

 const payload = {
  product_name: productName,
  product_group: productGroup,
  product_description: productDescription,
  product_price: price,
 };
 if (productId === "") {
  alert("please enter the product ID of the product you're trying to edit");
 } else {
  fetch("https://sisrestapi.herokuapp.com/products/" + productId, {
   method: "PATCH",
   credentials: "include",
   headers: { "Content-Type": "application/json" },
   body: JSON.stringify(payload),
  });
  localStorage.removeItem("productData");
  alert("Successfully edited Product");
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
  localStorage.removeItem("productData");
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

  const filename = `Product_Data_${today}.csv`; // SET CSV FILENAME

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
         <Tabs variant="soft-rounded" size="md" isFitted defaultIndex={0}>
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
             Product Records
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
             Product Management
            </Tab>
           </TabList>
          </div>
          <TabPanels>
           <TabPanel>
            {loadingData ? ( // CHECK IF loadingData IS true
             <div class="d-flex justify-content-center">
              <h1>
               <Spinner animation="border" /> Loading (If data isnt Loading,
               Please log in again)...
              </h1>
             </div>
            ) : (
             // IF loadingData IS flase DISPLAY TABLE
             <DataTable
              title="Product Table"
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
            <div class="form-group">
             <Stack spacing={10} style={{ color: "white" }}>
              <InputGroup style={{ marginTop: "20px" }}>
               <Input
                variant="filled"
                style={{ backgroundColor: "#1e1e26" }}
                placeholder="Product ID"
                type="Number"
                id="pID_product"
               />
              </InputGroup>
              <InputGroup>
               <Input
                variant="filled"
                style={{ backgroundColor: "#1e1e26" }}
                placeholder="Product Name"
                type="text"
                id="pName_Product"
               />
              </InputGroup>
              <InputGroup>
               <Input
                variant="filled"
                style={{ backgroundColor: "#1e1e26" }}
                placeholder="Product Group"
                type="Text"
                id="pGroup_Product"
               />
              </InputGroup>
              <InputGroup>
               <Input
                variant="filled"
                style={{ backgroundColor: "#1e1e26" }}
                placeholder="Product Description"
                type="Text"
                id="pDescription_product"
               />
              </InputGroup>
              <InputGroup>
               <Input
                variant="filled"
                style={{ backgroundColor: "#1e1e26" }}
                placeholder="Price"
                type="Text"
                id="price_product"
               />
              </InputGroup>
             </Stack>
            </div>
            <div>
             <button type="button" class="btn btn-info" onClick={addProduct}>
              Add
             </button>
             <button type="button" class="btn btn-info" onClick={editProduct}>
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

export default Products;
