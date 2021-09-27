import React from "react";
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
  Col,
} from "reactstrap";

const requestUrl = 'https://sisrestapi.herokuapp.com/products'

let inventoryData

async function fetchinventory () {
  await fetch(requestUrl, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors'
  })
    .then(response => response.json())
    .then(data => {
      inventoryData = data
    })
}

async function generateTables () {
  await fetchinventory()
  var columns = addAllColumnHeaders(inventoryData)
  for (var i = 0; i < inventoryData.length; i++) {
    var row$ = $(`<tr id=${i} />`)

    for (var colIndex = 0; colIndex < columns.length; colIndex++) {
      var cellValue = inventoryData[i][columns[colIndex]]

      if (cellValue == null) {
        cellValue = ''
      }
      row$.append($(`<td/>`).html(cellValue))
    }
    $('#inventoryTable').append(row$)
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


function Products() {
  generateTables()
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Simple Table</CardTitle>
                <p className='category'>Inventory Level</p>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Product ID</th>
                      <th>Product Name</th>
                      <th>Product Group</th>
                      <th>Product Description</th>
                      <th className="text-center">Price ($)</th>
                      <th className="text-center"></th>
                      <th className="text-center"></th>
                    </tr>
                  </thead>
                  <tbody id='inventoryTable'>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Products;
