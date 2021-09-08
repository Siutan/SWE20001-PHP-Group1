import React from 'react'
import Popup from 'reactjs-popup'
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

const contentStyle= {
  width:'1000px'
}
const overlayStyle = { background: 'rgba(0,0,0,0.5)' }

function Sales () {
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
                          {' '}
                          Add Record{' '}
                        </Button>
              </CardHeader>
              <CardBody>
                <Table className='tablesorter' responsive>
                  <thead className='text-primary'>
                    <tr>
                      <th>Product ID</th>
                      <th>Product Name</th>
                      <th>Product Group</th>
                      <th>Amount Sold (Quantity)</th>
                      <th>Amount Sold ($)</th>
                      <th className='text-center'>Edit Entry</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td contentEditable='fasle'>A-0001</td>
                      <td contentEditable='false'>product 1</td>
                      <td contentEditable='false'>Vitamins</td>
                      <td contentEditable='false'>1000</td>
                      <td contentEditable='false'>$36,738</td>
                      <td className='text-center'>
                        <Button  className='btn-fill' color='info' onClick={editTd}>
                          {' '}
                          Edit{' '}
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>A-0001</td>
                      <td>Product 2</td>
                      <td>Sanitary</td>
                      <td>1739</td>
                      <td>$23,789</td>
                      <td className='text-center'>
                        <Button className='btn-fill' color='info'>
                          {' '}
                          Edit{' '}
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>A-0001</td>
                      <td>product 3</td>
                      <td>Utensils</td>
                      <td>332</td>
                      <td>$56,142</td>
                      <td className='text-center'>
                        <Button className='btn-fill' color='info'>
                          {' '}
                          Edit{' '}
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>A-0001</td>
                      <td>Product 4</td>
                      <td>Vitamins</td>
                      <td>3564</td>
                      <td>$38,735</td>
                      <td className='text-center'>
                        <Button className='btn-fill' color='info'>
                          {' '}
                          Edit{' '}
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>A-0001</td>
                      <td>Product 5</td>
                      <td>Analgesics</td>
                      <td>239</td>
                      <td>$63,542</td>
                      <td className='text-center'>
                        <Button className='btn-fill' color='info'>
                          {' '}
                          Edit{' '}
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>A-0001</td>
                      <td>Product 6</td>
                      <td>Antacids</td>
                      <td>485</td>
                      <td>$78,615</td>
                      <td className='text-center'>
                        <Button className='btn-fill' color='info'>
                          {' '}
                          Edit{' '}
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>A-0001</td>
                      <td>Product 7</td>
                      <td>Antibacterials</td>
                      <td>504</td>
                      <td>$98,615</td>
                      <td className='text-center'>
                        {/* <Popup trigger={<Button className="btn-fill" color="info"> Edit </Button>} position="right center">
                          <div>Popup content is here</div>
                        </Popup> */}
                        <Popup
                          trigger={
                            <button className='btn-fill' color='info'>
                              Edit
                            </button>
                          }
                          {...{contentStyle, overlayStyle}}
                          position="left"
                        >
                          <div>
                            <Row>
                              <Col md='8'>
                                <Card>
                                  <CardHeader>
                                    <h5 className='title'>Edit Product</h5>
                                  </CardHeader>
                                  <CardBody>
                                    <Form>
                                      <Row>
                                        <Col className='pr-md-1' md='5'>
                                          <FormGroup>
                                            <label>Product ID</label>
                                            <Input
                                              defaultValue='*existing product ID*'
                                              placeholder='Product ID'
                                              type='text'
                                            />
                                          </FormGroup>
                                        </Col>
                                        <Col className='px-md-1' md='3'>
                                          <FormGroup>
                                            <label>Product Number</label>
                                            <Input
                                              defaultValue='*Existing Product Name*'
                                              placeholder='Product Name'
                                              type='text'
                                            />
                                          </FormGroup>
                                        </Col>
                                        <Col className='pl-md-1' md='4'>
                                          <FormGroup>
                                            <label>Product Group</label>
                                            <Input
                                              defaultValue='*Existing Product Group*'
                                              placeholder='Product Group'
                                              type='text'
                                            />
                                          </FormGroup>
                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col className='pr-md-1' md='6'>
                                          <FormGroup>
                                            <label>Amount Sold (quantity)</label>
                                            <Input
                                              defaultValue='*Total units sold (quantity)*'
                                              placeholder='Total units sold (quantity)'
                                              type='text'
                                            />
                                          </FormGroup>
                                        </Col>
                                        <Col className='pl-md-1' md='6'>
                                          <FormGroup>
                                            <label>Amount Sold ($)</label>
                                            <Input
                                              defaultValue='*Total units sold ($)*'
                                              placeholder='Total units sold ($)'
                                              type='text'
                                            />
                                          </FormGroup>
                                        </Col>
                                      </Row>
                                    </Form>
                                  </CardBody>
                                  <CardFooter>
                                    <Button
                                      className='btn-fill'
                                      color='info'
                                      type='submit'
                                    >
                                      Save
                                    </Button>
                                    <Button
                                      className='btn-fill'
                                      color='warning'
                                      type='submit'
                                    >
                                      Delete
                                    </Button>
                                  </CardFooter>
                                </Card>
                              </Col>
                            </Row>
                          </div>
                        </Popup>
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

function editTd() {
  console.log($(this).closest('td').attr('contentEditable'));
  //$(this).closest('td').attr('contentEditable') ? $(this).removeAttr('contentEditable') : $(this).attr('contentEditable', 'true');
}
export default Sales
