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

let tableRowElement
function toggleModal (element) {
  // GET VALUES FROM TABLE
  tableRowElement = element.parentElement.parentElement
  const date = tableRowElement.getElementsByClassName('date')[0].innerHTML
  const pid = tableRowElement.getElementsByClassName('productId')[0].innerHTML
  const name = tableRowElement.getElementsByClassName('productName')[0]
    .innerHTML
  const group = tableRowElement.getElementsByClassName('productGroup')[0]
    .innerHTML
  const quantity = tableRowElement.getElementsByClassName('quantity')[0]
    .innerHTML
  const money = tableRowElement.getElementsByClassName('dollars')[0].innerHTML

  //	IMPORT VALUES FROM TABLE INTO FIELDS IN POPUP
  document.getElementById('date').value = date
  document.getElementById('productId').value = pid
  document.getElementById('name').value = name
  document.getElementById('group').value = group
  document.getElementById('quantity').value = quantity
  document.getElementById('money').value = money

  openModal()
}

function saveInfo () {
  const date = document.getElementById('date').value
  const pid = document.getElementById('productId').value
  const name = document.getElementById('name').value
  const group = document.getElementById('group').value
  const quantity = document.getElementById('quantity').value
  const money = document.getElementById('money').value

  tableRowElement.getElementsByClassName('date')[0].innerHTML = date
  tableRowElement.getElementsByClassName('productId')[0].innerHTML = pid
  tableRowElement.getElementsByClassName('productName')[0].innerHTML = name
  tableRowElement.getElementsByClassName('productGroup')[0].innerHTML = group
  tableRowElement.getElementsByClassName('quantity')[0].innerHTML = quantity
  tableRowElement.getElementsByClassName('dollars')[0].innerHTML = money

  closeModal()
}

function openModal () {
  document.getElementById('backdrop').style.display = 'block'
  document.getElementById('exampleModal').style.display = 'block'
  document.getElementById('exampleModal').classList.add('show')
}

function closeModal () {
  document.getElementById('backdrop').style.display = 'none'
  document.getElementById('exampleModal').style.display = 'none'
  document.getElementById('exampleModal').classList.remove('show')
}

function removeRow (current) {
  current.parentElement.parentElement.remove()
}

//GENERATING THE TABLE
const requestUrl = 'https://sisrestapi.herokuapp.com/sales'

let salesData

var classDict = {
  0: "salesId",
  1: "date",
  2: "productId",
  3: "productName",
  4: "productGroup",
  5: "quantity",
  6: "dollars",
};

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

async function lmao () {
  await fetchSales()
  console.log(salesData)
  var columns = addAllColumnHeaders(salesData)
  for (var i = 0; i < salesData.length; i++) {
    var row$ = $(`<tr id=${i} />`)

    for (var colIndex = 0; colIndex < columns.length; colIndex++) {
      var cellValue = salesData[i][columns[colIndex]]

      if (cellValue == null) {
        cellValue = ''
      }
        row$.append($(`<td class=${classDict[colIndex]}></td>`).html(cellValue))
  }

    var editButton =
      '<button \
          class="text-center align-middle" \
          style="background-color:transparent;border:none;margin-left: 30px;" \
          onClick="toggleModal(this)"> \
            <i class="tim-icons icon-pencil"></i> \
       </button>'
    var deleteButton =
      '<button \
          class="text-center align-middle" \
          style="background-color:transparent;border:none;margin-left: 30px;" \
          onClick="removeRow(this)"> \
            <i class="tim-icons icon-trash-simple"></i> \
       </button>'

    row$.append(editButton, deleteButton)
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
  lmao() // CALLING THE TABLE GENERATION BEFORE RENDER
  return (
    <>
      <div className='content'>
        <Row>
          <Col md='12'>
            <Card>
              <CardHeader>
                <CardTitle tag='h4'>Sales Records</CardTitle>
                <p className='category'>Sales Record for the Current Month</p>
                <Button className='btn-fill' color='info'>
                  Test Button
                </Button>
                <Button className='btn-fill' color='info'>
                  edit Records
                </Button>
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
                      <th>Date</th>
                      <th>Amount Sold (Quantity)</th>
                      <th>Amount Sold ($)</th>
                      <th>Edit Entry</th>
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
