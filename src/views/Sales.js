import React from 'react'

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

function Sales () {
  return (
    <>
      <div className='content'>
        <Row>
          <Col md='12'>
            <Card>
              <CardHeader>
                <CardTitle tag='h4'>Simple Table</CardTitle>
                <p className='category'>Sales Records</p>
              </CardHeader>
              <CardBody>
                <Table className='tablesorter' responsive>
                  <thead className='text-primary'>
                    <tr>
                      <th>Product ID</th>
                      <th>Product Name</th>
                      <th>Product Group</th>
                      <th>Amount Sold (Quantity)</th>
                      <th className='text-center'>Amount Sold ($)</th>
                      <th className='text-center'>Edit Entry</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>A-0001</td>
                      <td>product 1</td>
                      <td>Vitamins</td>
                      <td>1000</td>
                      <td className='text-center'>$36,738</td>
                      <td className='text-center'>
                        <Button className="btn-fill" color="info"> Edit </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>A-0001</td>
                      <td>Product 2</td>
                      <td>Sanitary</td>
                      <td>1739</td>
                      <td className='text-center'>$23,789</td>
                      <td className='text-center'>
                        <Button className="btn-fill" color="info"> Edit </Button>
                      </td>
                    </tr>
                    <tr>
         p             <td>A-0001</td>
                      <td>product 3</td>
                      <td>Utensils</td>
                      <td>332</td>
                      <td className='text-center'>$56,142</td>
                      <td className='text-center'>
                        <Button className="btn-fill" color="info"> Edit </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>A-0001</td>
                      <td>Product 4</td>
                      <td>Vitamins</td>
                      <td>3564</td>
                      <td className='text-center'>$38,735</td>
                      <td className='text-center'>
                        <Button className="btn-fill" color="info"> Edit </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>A-0001</td>
                      <td>Product 5</td>
                      <td>Analgesics</td>
                      <td>239</td>
                      <td className='text-center'>$63,542</td>
                      <td className='text-center'>
                        <Button className="btn-fill" color="info"> Edit </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>A-0001</td>
                      <td>Product 6</td>
                      <td>Antacids</td>
                      <td>485</td>
                      <td className='text-center'>$78,615</td>
                      <td className='text-center'>
                        <Button className="btn-fill" color="info"> Edit </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>A-0001</td>
                      <td>Product 7</td>
                      <td>Antibacterials</td>
                      <td>504</td>
                      <td className='text-center'>$98,615</td>
                      <td className='text-center'>
                        <Button className="btn-fill" color="info"> Edit </Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

function fire(){

}

export default Sales;