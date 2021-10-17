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
 InputRightElement,
 Button,
 Stack,
 InputGroup,
 Radio,
 RadioGroup,
} from "@chakra-ui/react";

// reactstrap components
import { Card, CardBody, Row, Col } from "reactstrap";

//TODO: add search filter to search users in table by first name

//ADD ACCOUNT
function register() {
 var userId = document.getElementById("userId").value;
 var firstname = document.getElementById("firstName").value;
 var lastname = document.getElementById("lastName").value;
 var password = document.getElementById("password").value;

 if (userId != null) {
  alert(
   "Do not specify a User ID if adding a new user, it will be automatically generated"
  );
 } else {
  if (document.getElementById("admin_User").checked) {
   var admin = true;
  } else if (document.getElementById("regular_User").checked) {
   var admin = false;
  }

  const payload = {
   first_name: firstname,
   last_name: lastname,
   admin: admin,
   password: password,
  };
  var r = window.confirm(
   `do you want to Register the following User \n
    First Name: ${firstname} \n
    Last Name: ${lastname} \n
    Admin: ${admin} \n
    Password: ${password}`
  );

  if (r === true) {
   fetch("https://sisrestapi.herokuapp.com/auth/register", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
   });
   localStorage.removeItem("userData");
   alert("Added new User successfully");
  } else {
   alert("Did not add New User");
  }
 }
}

//EDIT ACCOUNT
function editAccount() {
 var userId = document.getElementById("userId").value;
 var firstname = document.getElementById("firstName").value;
 var lastname = document.getElementById("lastName").value;
 var password = document.getElementById("password").value;

 if (document.getElementById("admin_User").checked) {
  var admin = true;
 } else if (document.getElementById("regular_User").checked) {
  var admin = false;
 }
 const payload = {
  first_name: firstname,
  last_name: lastname,
  admin: admin,
  password: password,
 };
 if (userId === "") {
  alert("enter user Id of the account you want to update");
 } else {
  var r = window.confirm("do you want to update this User");

  if (r === true) {
   fetch("https://sisrestapi.herokuapp.com/users/" + userId, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
   });
   localStorage.removeItem("userData");
   alert("updated User successfully");
  } else {
   alert("Did not update User");
  }
 }
}

//DELETE ACCOUNT
function deleteAccount() {
 var userId = document.getElementById("userId").value;
 if (userId === "") {
  alert("enter user Id of the account you want to delete");
 } else {
  var r = window.confirm(`do you want to Delete this user`);

  if (r === true) {
   fetch("https://sisrestapi.herokuapp.com/users/" + userId, {
    method: "DELETE",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
   });
   localStorage.removeItem("userData");
   alert("Deleted User successfully");
  } else {
   alert("Did not Delete User");
  }
 }
}

function Accounts() {
 //User Url
 const requestUrl = "https://sisrestapi.herokuapp.com/users";

 // SETS A STATE THAT TELLS THE APP DATA IS BEING LOADED
 const [loadingData, setLoadingData] = useState(true);

 // COLUMN FOR PRODUCT TABLE
 const columns = useMemo(() => [
  {
   name: "User ID",
   selector: (row) => row.user_id,
   sortable: true,
   reorder: true,
  },
  {
   name: "First Name",
   selector: (row) => row.first_name,
   reorder: true,
  },
  {
   name: "Last Name",
   selector: (row) => row.last_name,
   reorder: true,
  },
  {
   name: "Account Type",
   selector: (row) => {
    if (row.admin === 1) {
     return "Admin";
    } else {
     return "User";
    }
   },
   reorder: true,
   sortable: true,
  },
 ]);
 // SETS A STATE FOR DATA
 const [data, setData] = useState([]);

 useEffect(() => {
  const ls = require("localstorage-ttl");

  async function checkls() {
   if (ls.get("userData") == null) {
    getData();
   } else {
    const userData = ls.get("userData");
    setData(userData);
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
     ls.set("userData", data, 60000);
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

 const [value, setValue] = React.useState("1");

 const [show, setShow] = React.useState(false);
 const handleClick = () => setShow(!show);

 return (
  <>
   <div className="content">
    <ChakraProvider>
     <Row>
      <Col md="12">
       <Card>
        <CardBody>
         <Tabs variant="soft-rounded" size="md" isFitted defaultIndex={0}>
          <div style={{ backgroundColor: "#1e1e26", borderRadius: "100px" }}>
           <TabList>
            <Tab
             _selected={{
              bg: "linear-gradient(to top left, #2381d3 0%, #18a2b9 100%)",
             }}
             style={{
              color: "white",
              outline: "none",
              boxShadow: "none",
             }}
            >
             Admin/User Records
            </Tab>
            <Tab
             _selected={{
              bg: "linear-gradient(to top left, #2381d3 0%, #18a2b9 100%)",
             }}
             style={{
              color: "white",
              outline: "none",
              boxShadow: "none",
             }}
            >
             Account Management
            </Tab>
           </TabList>
          </div>

          <TabPanels>
           <TabPanel>
            {loadingData ? ( // CHECK IF loadingData IS true
             <div class="d-flex justify-content-center">
              <h1>
               {" "}
               <Spinner animation="border" /> Loading (If data isnt Loading,
               Please log in again)...
              </h1>
             </div>
            ) : (
             // IF loadingData IS flase DISPLAY TABLE
             <DataTable
              title="Users Table"
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
            <div class="form-group">
             <Stack spacing={10} style={{ color: "white" }}>
              <InputGroup style={{ marginTop: "20px" }}>
               <Input
                variant="filled"
                style={{ backgroundColor: "#1e1e26" }}
                placeholder="User ID"
                type="Number"
                id="userId"
               />
              </InputGroup>
              <InputGroup>
               <Input
                variant="filled"
                style={{ backgroundColor: "#1e1e26" }}
                placeholder="First Name"
                type="text"
                id="firstName"
               />
              </InputGroup>
              <InputGroup>
               <Input
                variant="filled"
                style={{ backgroundColor: "#1e1e26" }}
                placeholder="Last Name"
                type="Text"
                id="lastName"
               />
              </InputGroup>

              <InputGroup size="md">
               <Input
                variant="filled"
                style={{ backgroundColor: "#1e1e26" }}
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Password"
                id="password"
               />
               <InputRightElement width="4.5rem">
                <Button
                 h="1.75rem"
                 size="sm"
                 onClick={handleClick}
                 style={{ backgroundColor: "transparent" }}
                >
                 {show ? "Hide" : "Show"}
                </Button>
               </InputRightElement>
              </InputGroup>
              <RadioGroup onChange={setValue} value={value}>
               <Stack spacing={2}>
                <Radio id="admin_User" value="0">
                 Admin
                </Radio>
                <Radio id="regular_User" value="1">
                 User
                </Radio>
               </Stack>
              </RadioGroup>
             </Stack>
            </div>
            <div class="modal-footer">
             <button type="button" class="btn btn-info" onClick={register}>
              Add
             </button>
             <button type="button" class="btn btn-info" onClick={editAccount}>
              Update
             </button>
             <button
              type="button"
              class="btn btn-danger"
              onClick={deleteAccount}
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

export default Accounts;
