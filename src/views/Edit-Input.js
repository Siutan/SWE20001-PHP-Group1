import React from "react";
import {Tabs, Tab, OverlayTrigger, Tooltip} from "react-bootstrap"

//TOOLTIP FOR PRODUCT ID
const renderTooltip = props => (
  <Tooltip id='button-tooltip' {...props}>
    Only Enter product ID if you are UPDATING or DELETING a product.
  </Tooltip>
)

//PRODUCTS
function addProduct() {
  var productName = document.getElementById('pName_product').value;
  var productGroup = document.getElementById('pGroup_product').value;
  var productDescription = document.getElementById('pDescription_product').value;
  var price = document.getElementById('price_product').value;

  const payload = {
    "product_name": productName,
    "product_group": productGroup,
    "product_description": productDescription,
    "product_price": parseInt(price)
  }
  var r = window.confirm(
    `do you want to ADD the follwoing entry: \n
    Product Name: ${productName} \n
    Product Group: ${productGroup} \n
    Product Description: ${productDescription} \n
    Product Price: ${price}`)

    if (r == true) {
        fetch('https://sisrestapi.herokuapp.com/products', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
        alert("Added Product to the database")
    } else {
      alert("Did not add Product to database")
    }
}

function editProduct() {
  var productId = document.getElementById('pID_product').value
  var productName = document.getElementById('pName_product').value
  var productGroup = document.getElementById('pGroup_product').value
  var productDescription = document.getElementById('pDescription_product').value
  var price = document.getElementById('price_product').value

  const payload = {
    product_name: productName,
    product_group: productGroup,
    product_description: productDescription,
    product_price: price
  }
  if (productId == "") {
    alert("please enter the product ID of the product you're trying to edit")
  } else {
  fetch('https://sisrestapi.herokuapp.com/products/'+ productId, {
    method: 'PATCH',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  }
}

function deleteProduct() {
  var productId = document.getElementById('pID_product').value
  var r = window.confirm(
    `Do you want to DELETE the follwoing entry: \n
    Product ID: ${productId}`)
  if (r == true) {
    fetch('https://sisrestapi.herokuapp.com/products/' + productId, {
      method: 'DELETE',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    })
    alert('Deleted Product from the database')
  } else {
    alert('Did not delete Product from the database')
  }
}


//INVENTORY
function addInventory () {
  var productId = document.getElementById('pID_inventory').value
  var maxStock = document.getElementById('maxStock_inventory').value
  var currentStock = document.getElementById('currentStock_inventory').value
  var date = document.getElementById('date_inventory').value

  const payload = {
    "product_id": parseInt(productId),
    "max_stock_capacity": parseInt(maxStock),
    "current_stock": parseInt(currentStock),
    "date_time": date
  }
  if(productId == "") {
    alert("Enter Product ID")
  }else {
    var r = window.confirm(`do you want to ADD the following entry to Inventory: \n
    Product ID: ${productId} \n
    Max Stock Capacity: ${maxStock} \n
    Current Stock: ${currentStock} \n
    Date: ${date} \n`)
    if (r == true){
      fetch('https://sisrestapi.herokuapp.com/inventory', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    alert("entry has been added")
    } else {
      alert("Entry not added")
    }
  }
}

function editInventory () {
  var updateIndex = document.getElementById('updateIndex').value
  var productId = document.getElementById('pID_inventory').value
  var maxStock = document.getElementById('maxStock_inventory').value
  var currentStock = document.getElementById('currentStock_inventory').value
  var date = document.getElementById('date_inventory').value

  const payload = {
    "product_id": parseInt(productId),
    "max_stock_capacity": parseInt(maxStock),
    "current_stock": parseInt(currentStock),
    "date_time": date
  }
  if (updateIndex == '') {
    alert('Enter Update Index')
  } else {
    var r = window.confirm('do you want to Edit the following entry in Inventory')
    if (r == true) {
      fetch('https://sisrestapi.herokuapp.com/inventory/' + updateIndex, {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      alert('entry has been updated')
    } else {
      alert('Entry not Updated')
    }
  }
}

function deleteInventory () {
  var updateIndex = document.getElementById('updateIndex').value

  if (updateIndex == '') {
    alert('Enter Update Index')
  } else {
    var r = window.confirm('do you want to DELETE the following entry in Inventory')
    if (r == true) {
      fetch('https://sisrestapi.herokuapp.com/inventory/' + updateIndex, {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      })
      alert('entry has been Deleted')
    } else {
      alert('Entry not Deleted')
    }
  }
}

//SALES
function addSales () {
  var productId = document.getElementById('pID_sales').value
  var quantity = document.getElementById('quantity_sales').value
  var date = document.getElementById('date_sales').value
  var dispatch = document.getElementById('dispatch').value

  const payload = {
    "product_id": productId,
    "quantity_sold": parseInt(quantity),
    "date_time": date,
    "dispatched": parseInt(dispatch)
  }

    var r = window.confirm('do you want to add the following entry in Inventory')
    if (r == true) {
    fetch('https://sisrestapi.herokuapp.com/sales', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    alert('entry has been added')
  } else {
    alert('Entry not added')
  }
}

function editSales () {
  var salesId = document.getElementById('salesID').value
  var productId = document.getElementById('pID_sales').value
  var quantity = document.getElementById('quantity_sales').value
  var date = document.getElementById('date_sales').value
  var dispatch = document.getElementById('dispatch').value

  const payload = {
    product_id: productId,
    quantity_sold: parseInt(quantity),
    date_time: date,
    dispatched: parseInt(dispatch)
  }
  if(salesId == '') {
    alert('please enter a sales ID')
  } else{
    var r = window.confirm('do you want to Edit the following entry in Sales')
  if (r == true) {
    fetch('https://sisrestapi.herokuapp.com/sales/' + salesId, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    alert('entry has been updated')
  } else {
    alert('Entry not Updated')
  }
  }
}

function deleteSales () {
  var salesId = document.getElementById('salesID').value

  var r = window.confirm('do you want to DELETE the following entry in Inventory')
  if (r == true) {
    fetch('https://sisrestapi.herokuapp.com/sales/' + salesId, {
      method: 'DELETE',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    })
    alert('entry has been Deleted')
  } else {
    alert('Entry not Deleted')
  }
}


function EditInput() {
  return (
    <>
      <div className="content">
        <Tabs defaultActiveKey="profile" className="mb-3">
          
          <Tab eventKey="Product" title="Product">
            <div>
              <div class='form-group'>
                <label for='pID_product'>Product ID</label>
                <OverlayTrigger
                  placement="right"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip}
                >
                  <i class="tim-icons icon-alert-circle-exc"></i>
                </OverlayTrigger>
                <input type='text' id='pID_product' class='form-control'/>
              </div>

              <div class='form-group'>
                <label for='pName_product'>Product Name</label>
                <input type='text' id='pName_product' class='form-control' />
              </div>

              <div class='form-group'>
                <label for='pGroup_product'>Product Group</label>
                <input type='text' id='pGroup_product' class='form-control' />
              </div>

              <div class='form-group'>
                <label for='pDescription_product'>Product Description</label>
                <input type='text' id='pDescription_product' class='form-control' />
              </div>

              <div class='form-group'>
                <label for='price_product'>Price</label>
                <input type='text' id='price_product' class='form-control' />
              </div>
            </div>
            <div class='modal-footer'>
              <button
                type='button'
                class='btn btn-info'
                onClick={addProduct}
              >
                Add
              </button>
              <button
                type='button'
                class='btn btn-info'
                onClick= {editProduct}
              >
                Update
              </button>
              <button
                type='button'
                class='btn btn-danger'
                onClick= {deleteProduct}
              >
                Delete
              </button>
            </div>
          </Tab>

          <Tab eventKey="Inventory" title="Inventory">
             <div>
               <div class='form-group'>
                <label for='updateIndex'>Update Index</label>
                <input type='text' id='updateIndex' class='form-control' />
              </div>
              <div class='form-group'>
                <label for='pID_inventory'>Product ID</label>
                <input type='text' id='pID_inventory' class='form-control' />
              </div>

              <div class='form-group'>
                <label for='maxStock_inventory'>Max Stock Capacity</label>
                <input type='text' id='maxStock_inventory' class='form-control' />
              </div>

              <div class='form-group'>
                <label for='currentStock_inventory'>Current Stock</label>
                <input type='text' id='currentStock_inventory' class='form-control' />
              </div>

              <div class='form-group'>
                <label for='date_inventory'>Date</label>
                <input type='text' id='date_inventory' class='form-control' />
              </div>
            </div>
            <div class='modal-footer'>
              <button
                type='button'
                class='btn btn-info'
                onClick={addInventory}
              >
                Add
              </button>
              <button
                type='button'
                class='btn btn-info'
                onClick= {editInventory}
              >
                Update
              </button>
              <button
                type='button'
                class='btn btn-danger'
                onClick= {deleteInventory}
              >
                Delete
              </button>
            </div>
          </Tab>

          <Tab eventKey="Sales" title="Sales">
            <div>
              <div class='form-group'>
                <label for='salesID'>Sales ID</label>
                <input type='text' id='salesID' class='form-control' />
              </div>

              <div class='form-group'>
                <label for='pID_sales'>Product ID</label>
                <input type='text' id='pID_sales' class='form-control' />
              </div>

              <div class='form-group'>
                <label for='quantity_sales'>Quantity Sold</label>
                <input type='text' id='quantity_sales' class='form-control' />
              </div>

              <div class='form-group'>
                <label for='date_sales'>Date</label>
                <input type='text' id='date_sales' class='form-control' />
              </div>

              <div class='form-group'>
                <label for='dispatch'>Dispatch</label>
                <input type='text' id='dispatch' class='form-control' />
              </div>
            </div>
            <div class='modal-footer'>
              <button
                type='button'
                class='btn btn-info'
                onClick= {addSales}
              >
                Add
              </button>
              <button
                type='button'
                class='btn btn-info'
                onClick= {editSales}
              >
                Update
              </button>
              <button
                type='button'
                class='btn btn-danger'
                onClick= {deleteSales}
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

export default EditInput;
