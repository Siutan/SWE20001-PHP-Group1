import React, { useMemo, useState, useEffect } from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import DataTable, { createTheme } from 'react-data-table-component'

// reactstrap components
import { Card, CardBody, Row, Col } from 'reactstrap'

// TODO:
//  REMOVE EXPORT CSV IN INVENTORY
//  ADD TABBED LAYOUT WITH INVENTORY ACTIONS

//INVENTORY
function addInventory () {
  var productId = document.getElementById('pID_inventory').value
  var maxStock = document.getElementById('maxStock_inventory').value
  var currentStock = document.getElementById('currentStock_inventory').value
  var date = document.getElementById('date_inventory').value

  const payload = {
    product_id: parseInt(productId),
    max_stock_capacity: parseInt(maxStock),
    current_stock: parseInt(currentStock),
    date_time: date
  }
  if (productId === '') {
    alert('Enter Product ID')
  } else {
    var r = window.confirm(`do you want to ADD the following entry to Inventory: \n
    Product ID: ${productId} \n
    Max Stock Capacity: ${maxStock} \n
    Current Stock: ${currentStock} \n
    Date: ${date} \n`)
    if (r ===true) {
      fetch('https://sisrestapi.herokuapp.com/inventory', {
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
}

function editInventory () {
  var updateIndex = document.getElementById('updateIndex').value
  var productId = document.getElementById('pID_inventory').value
  var maxStock = document.getElementById('maxStock_inventory').value
  var currentStock = document.getElementById('currentStock_inventory').value
  var date = document.getElementById('date_inventory').value

  const payload = {
    product_id: parseInt(productId),
    max_stock_capacity: parseInt(maxStock),
    current_stock: parseInt(currentStock),
    date_time: date
  }
  if (updateIndex ==='') {
    alert('Enter Update Index')
  } else {
    var r = window.confirm(
      'do you want to Edit the following entry in Inventory'
    )
    if (r ===true) {
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

  if (updateIndex === '') {
    alert('Enter Update Index')
  } else {
    var r = window.confirm(
      'do you want to DELETE the following entry in Inventory'
    )
    if (r === true) {
      fetch('https://sisrestapi.herokuapp.com/inventory/' + updateIndex, {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
      })
      alert('entry has been Deleted')
    } else {
      alert('Entry not Deleted')
    }
  }
}

const requestUrl = 'https://sisrestapi.herokuapp.com/inventory'

function Inventory () {
  // SETS A STATE THAT TELLS THE APP DATA IS BEING LOADED
  const [loadingData, setLoadingData] = useState(true)

  // COLUMN FOR INVENTORY TABLE
  const columns = useMemo(() => [
    {
      name: 'Product ID',
      selector: row => row.product_id,
      sortable: true,
      reorder: true
    },
    {
      name: 'Product Name',
      selector: row => row.product_name,
      reorder: true
    },
    {
      name: 'Product Group',
      selector: row => row.product_group,
      reorder: true
    },
    {
      name: 'Product Description',
      selector: row => row.product_description,
      reorder: true
    },
    {
      name: 'Product Price',
      selector: row => row.product_price,
      reorder: true
    },
    {
      name: 'Update Index',
      selector: row => row.update_index,
      reorder: true
    },
    {
      name: 'Current Stock',
      selector: row => row.current_stock,
      reorder: true
    },
    {
      name: 'Max Stock Capacity',
      selector: row => row.max_stock_capacity,
      sortable: true,
      reorder: true
    },
    {
      name: 'Date/Time',
      selector: row => row.date_time,
      sortable: true,
      reorder: true
    }
  ])
  const [data, setData] = useState([])

  useEffect(() => {
    const ls = require('localstorage-ttl')

    async function checkls () {
      if (ls.get('inventoryData') === null) {
        getData()
      } else {
        const inventoryData = ls.get('inventoryData')
        setData(inventoryData)
        setLoadingData(false)
      }
    }
    async function getData () {
      await fetch(requestUrl, {
        method: 'GET',
        credentials: 'include',
        mode: 'cors'
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          setData(data)
          ls.set('inventoryData', data, 60000)
          setLoadingData(false) // SWITCHES THE loadingData TO false SO THE APP KNOWS CONTENT IS LOADED
        })
    }
    if (loadingData) {
      // IF loadingData IS true FETCH DATA FROM API
      checkls()
    }
  }, [])

  // CREATE A THEME FOR USE
  createTheme('solarized', {
    text: {
      primary: '#fff',
      secondary: '#fff'
    },
    background: {
      default: 'transparent'
    },
    context: {
      background: '#000',
      text: '#FFFFFF'
    },
    divider: {
      default: '#FFF'
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rrgba(0, 203, 255, 0.8)',
      disabled: 'rgba(0,0,0,.12)'
    }
  })

  const customStyles = {
    headRow: {
      style: {
        border: 'none'
      }
    },
    headCells: {
      style: {
        color: '#fff',
        fontSize: '14px'
      }
    },
    rows: {
      highlightOnHoverStyle: {
        backgroundColor: 'rgba(0, 203, 255, 1)',
        borderBottomColor: '#FFFFFF',
        borderRadius: '10px',
        outline: '1px transparent'
      }
    },
    pagination: {
      style: {
        border: 'none'
      }
    }
  }

  return (
    <>
      <div className='content'>
        <Tabs variant='pills' defaultActiveKey='Records' className='mb-3'>
          <Tab
            eventKey='Records'
            title='Inventory Records'
            style={{ color: 'white' }}
          >
            <Row>
              <Col md='12'>
                <Card>
                  <CardBody>
                    {loadingData ? ( // CHECK IF loadingData IS true
                      <p>Loading Please wait...</p> // IF loadingData IS true DISPLAY LOADING...
                    ) : (
                      // IF loadingData IS flase DISPLAY TABLE
                      <DataTable
                        title='Inventory Table'
                        columns={columns}
                        data={data}
                        pagination
                        highlightOnHover
                        customStyles={customStyles}
                        theme='solarized'
                      />
                    )}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Tab>
          ;
          <Tab
            eventKey='Inventory'
            title='Inventory'
            style={{ color: 'white' }}
          >
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
                <input
                  type='text'
                  id='maxStock_inventory'
                  class='form-control'
                />
              </div>

              <div class='form-group'>
                <label for='currentStock_inventory'>Current Stock</label>
                <input
                  type='text'
                  id='currentStock_inventory'
                  class='form-control'
                />
              </div>

              <div class='form-group'>
                <label for='date_inventory'>Date</label>
                <input type='text' id='date_inventory' class='form-control' />
              </div>
            </div>
            <div class='modal-footer'>
              <button type='button' class='btn btn-info' onClick={addInventory}>
                Add
              </button>
              <button
                type='button'
                class='btn btn-info'
                onClick={editInventory}
              >
                Update
              </button>
              <button
                type='button'
                class='btn btn-danger'
                onClick={deleteInventory}
              >
                Delete
              </button>
            </div>
          </Tab>
        </Tabs>
      </div>
    </>
  )
}

export default Inventory
