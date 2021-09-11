import React from 'react'
import Popup from 'reactjs-popup'
import components from 'react'
import $ from 'jquery'

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  Form,
  Input,
  CardTitle,
  Table,
  Row,
  Col
} from 'reactstrap'

const contentStyle = {
  width: '1000px'
}
const overlayStyle = { background: 'rgba(0,0,0,0.5)' }

const requestUrl =
  'https://corspog.herokuapp.com/https://php-sales-and-inventory-rest-api.kneegrow2.repl.co/sales'

let salesData;

//GENERATING THE TABLE
async function fetchSales () {
  await fetch(requestUrl)
    .then(response => response.json())
    .then(data => {
      salesData = data
    })
}

async function lmao () {
  await fetchSales()
  var columns = addAllColumnHeaders(salesData)
  console.log(salesData.length)
  for (var i = 0; i < salesData.length; i++) {
    var row$ = $('<tr/>')
    for (var colIndex = 0; colIndex < columns.length; colIndex++) {
      var cellValue = salesData[i][columns[colIndex]]
      

      if (cellValue == null) {
        cellValue = ''
      }

      row$.append($('<td/>').html(cellValue))
    }
    var button = '<button>Edit</button>'
    row$.append(button)
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

function editable() {

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
                  List Records
                </Button>
                <Button className='btn-fill' color='info'>
                  edit Records
                </Button>
              </CardHeader>
              <CardBody>
                <Table className='tablesorter' id='salesTable' responsive>
                  <thead className='text-primary'>
                    <tr>
                      <th>Sales ID</th>
                      <th>Date</th>
                      <th>Product ID</th>
                      <th>Product Name</th>
                      <th>Product Group</th>
                      <th>Amount Sold (Quantity)</th>
                      <th>Amount Sold ($)</th>
                      <th className='text-center'>Edit Entry</th>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

function editTd () {
  console.log(
    $(this)
      .closest('td')
      .attr('contentEditable')
  )
  //$(this).closest('td').attr('contentEditable') ? $(this).removeAttr('contentEditable') : $(this).attr('contentEditable', 'true');
}
export default Sales
