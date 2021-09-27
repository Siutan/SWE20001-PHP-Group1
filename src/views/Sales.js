import React from 'react'
import $ from 'jquery'

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col
} from 'reactstrap'

//GENERATING THE TABLE
const requestUrl = 'https://sisrestapi.herokuapp.com/sales'

let salesData

async function fetchSales () {
  await fetch(requestUrl, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors'
  })
    .then(response => response.json())
    .then(data => {
      salesData = data
    })
}

async function generateTables () {
  await fetchSales()
  var columns = addAllColumnHeaders(salesData)
  for (var i = 0; i < salesData.length; i++) {
    var row$ = $(`<tr id=${i} />`)

    for (var colIndex = 0; colIndex < columns.length; colIndex++) {
      var cellValue = salesData[i][columns[colIndex]]

      if (cellValue == null) {
        cellValue = ''
      }
        row$.append($(`<td/>`).html(cellValue))
  }
    $('#salesTable').append(row$)
  }
}

function addAllColumnHeaders (myList) {
  var columnSet = []
  var headerTr$ = $('<tr/>')

  for (var i = 0; i < myList.length; i++) {
    var rowHash = myList[i]
    for (var key in rowHash) {
      if ($.inArray(key, columnSet) == -1) {
        columnSet.push(key)
        headerTr$.append($('<th/>').html(key))
      }
    }
  }
  //$("#salesTable").append(headerTr$);  // THIS MAKES THE HEADERS CHANGE TOO
  return columnSet
}

function Sales () {
  
  generateTables() // CALLING THE TABLE GENERATION BEFORE RENDER
  return (
    <>
      <div className='content'>
        <Row>
          <Col md='12'>
            <Card>
              <CardHeader>
                <CardTitle tag='h4'>Sales Records</CardTitle>
                <p className='category'>Sales Record for the Current Month</p>
              </CardHeader>
              <CardBody>
                <Table className='tablesorter' responsive>
                  <thead className='text-primary'>
                    <tr>
                      <th>Sales ID</th>
                      <th>Product ID</th>
                      <th>Product Name</th>
                      <th>Product Group</th>
                      <th>Product Description</th>
                      <th>Amount Sold ($)</th>
                      <th>Amount Sold (Quantity)</th>
                      <th>Date</th>
                      <th>Sales ID</th>
                      <th>Revenue</th>
                    </tr>
                  </thead>
                  <tbody id='salesTable'></tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
      <div class='modal' tabindex='-1' role='dialog' id='exampleModal'>
        <div class='modal-dialog' role='document'>
          <div class='modal-content'>
            <div class='modal-header'>
              <h5 class='modal-title'>Edit Record</h5>
              <button
                type='button'
                class='close'
                data-dismiss='modal'
                aria-label='Close'
                onclick='closeModal()'
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div class='modal-body'>
              <div class='form-group'>
                <label for='date'>Date</label>
                <input type='text' id='date' class='form-control' />
              </div>

              <div class='form-group'>
                <label for='productId'>Product ID</label>
                <input type='text' id='productId' class='form-control' />
              </div>

              <div class='form-group'>
                <label for='name'>Name</label>
                <input type='text' id='name' class='form-control' />
              </div>

              <div class='form-group'>
                <label for='group'>Group</label>
                <input type='text' id='group' class='form-control' />
              </div>

              <div class='form-group'>
                <label for='quantity'>quantity</label>
                <input type='text' id='quantity' class='form-control' />
              </div>

              <div class='form-group'>
                <label for='money'>Dollor</label>
                <input type='text' id='money' class='form-control' />
              </div>
            </div>
            <div class='modal-footer'>
              <button
                type='button'
                class='btn btn-primary'
                onclick='saveInfo()'
              >
                Save changes
              </button>
              <button
                type='button'
                class='btn btn-secondary'
                onclick='closeModal()'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class='modal-backdrop fade show'
        id='backdrop'
        style={{display: 'none'}}
      ></div>
    </>
  )
}

export default Sales
