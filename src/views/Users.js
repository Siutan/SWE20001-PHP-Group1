import React from "react";
import {Tabs, Tab, Form} from "react-bootstrap"
import $ from 'jquery'

//SHOW ACCOUNTS
let userList;

const userUrl= 'https://sisrestapi.herokuapp.com/users'

async function fetchSales () {
  await fetch(userUrl, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors'
  })
    .then(response => response.json())
    .then(data => {
      userList = data
    })
}

async function buildHtmlTable() {
  await fetchSales()
     var columns = addAllColumnHeaders(userList);
 
     for (var i = 0 ; i < userList.length; i++) {
         var row$ = $('<tr/>');
         for (var colIndex = 0 ; colIndex < columns.length ; colIndex++) {
             var cellValue = userList[i][columns[colIndex]];
 
             if (cellValue == null) { cellValue = ""; }
 
             row$.append($('<td/>').html(cellValue));
         }
         $("#excelDataTable").append(row$);
     }
 }
 
 // Adds a header row to the table and returns the set of columns.
 // Need to do union of keys from all records as some records may not contain
 // all records
function addAllColumnHeaders(myList)
 {
     var columnSet = [];
     var headerTr$ = $('<tr/>');
 
     for (var i = 0 ; i < myList.length ; i++) {
         var rowHash = myList[i];
         for (var key in rowHash) {
             if ($.inArray(key, columnSet) === -1){
                 columnSet.push(key);
                 headerTr$.append($('<th/>').html(key));
             }
         }
     }
     $("#excelDataTable").append(headerTr$);
 
     return columnSet;
 }


//ADD ACCOUNT
function register() {
  var firstname = document.getElementById('firstName').value;
  var lastname = document.getElementById('lastName').value;
  var password = document.getElementById('password_register').value;

  if (document.getElementById('admin_User').checked){
    var admin = true;
  } else if (document.getElementById('regular_User').checked) {
    var admin = false;
  }

  const payload = {
    "first_name": firstname,
    "last_name": lastname,
    "admin": admin,
    "password": password
  }
  var r = window.confirm(
    `do you want to Register the following User \n
    First Name: ${firstname} \n
    Last Name: ${lastname} \n
    Admin: ${admin} \n
    Password: ${password}`)

    if (r === true) {
        fetch('https://sisrestapi.herokuapp.com/auth/register', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
        alert("Added new User successfully")
    } else {
      alert("Did not add New User")
    }
}

//EDIT ACCOUNT
function editAccount () {
  var userId = document.getElementById('userId').value
  var firstname = document.getElementById('firstName_edit').value
  var lastname = document.getElementById('lastName_edit').value
  var password = document.getElementById('password_edit').value

  if (document.getElementById('admin_User_edit').checked) {
    var admin = true
  } else if (document.getElementById('regular_User_edit').checked) {
    var admin = false
  }
  const payload = {
    first_name: firstname,
    last_name: lastname,
    admin: admin,
    password: password
  }
  if(userId === '') {
    alert('enter user Id of the account you want to update')
  } else {
    var r = window.confirm('do you want to Update the User records')

    if (r === true) {
      fetch('https://sisrestapi.herokuapp.com/users/' + userId, {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      alert('Updated User successfully')
    } else {
      alert('Did not Update User')
    }
  }
}

//DELETE ACCOUNT
function deleteAccount () {
  var userId = document.getElementById('userId').value
  if (userId === '') {
    alert('enter user Id of the account you want to delete')
  } else {
    var r = window.confirm(`do you want to Update the User records`)

    if (r === true) {
      fetch('https://sisrestapi.herokuapp.com/users/' + userId, {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      })
      alert('Deleted User successfully')
    } else {
      alert('Did not Delete User')
    }
  }
}



function Accounts() {
  buildHtmlTable()
  return (
    <>
      <div className="content">
        <Tabs defaultActiveKey="profile" className="mb-3">
          
          <Tab eventKey="Accounts" title="Accounts">
            <div>
              <table id="excelDataTable" border="1">

              </table>
            </div>
          </Tab>

          <Tab eventKey="Register Accounts" title="Register Accounts">
             <div>
              <div class='form-group'>
                <label for='firstName'>Firstname</label>
                <input type='text' id='firstName' class='form-control' />
              </div>

              <div class='form-group'>
                <label for='lastName'>Lastname</label>
                <input type='text' id='lastName' class='form-control' />
              </div>

              <div class='form-group col-10'>
                <Form.Check
                  type="radio"
                  label="Admin User"
                  name="formHorizontalRadios"
                  id="admin_User"
                />
                <Form.Check
                  type="radio"
                  label="Regular User"
                  name="formHorizontalRadios"
                  id="regular_User"
                />
              </div>
              <div class='form-group'>
                <label for='password_register'>Password</label>
                <input type='text' id='password_register' class='form-control' />
              </div>
            </div>
            <div class='modal-footer'>
              <button
                type='button'
                class='btn btn-info'
                onClick={register}
              >
                Register
              </button>
            </div>
          </Tab>

          <Tab eventKey="Edit/Delete Accounts" title="Edit/Delete Accounts">
            <div>
              <div class='form-group'>
                <label for='userId'>User ID</label>
                <input type='text' id='userId' class='form-control' />
              </div>
              <div class='form-group'>
                <label for='firstName_edit'>Firstname</label>
                <input type='text' id='firstName_edit' class='form-control' />
              </div>

              <div class='form-group'>
                <label for='lastName_edit'>Lastname</label>
                <input type='text' id='lastName_edit' class='form-control' />
              </div>

              <div class='form-group col-10'>
                <Form.Check
                  type="radio"
                  label="Admin User"
                  name="formHorizontalRadios"
                  id="admin_User_edit"
                />
                <Form.Check
                  type="radio"
                  label="Regular User"
                  name="formHorizontalRadios"
                  id="regular_User_edit"
                />
              </div>
              <div class='form-group'>
                <label for='password_edit'>Password</label>
                <input type='text' id='password_edit' class='form-control' />
              </div>
            </div>
            <div class='modal-footer'>
              <button
                type='button'
                class='btn btn-info'
                onClick= {editAccount}
              >
                Update
              </button>
              <button
                type='button'
                class='btn btn-danger'
                onClick= {deleteAccount}
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

export default Accounts;
