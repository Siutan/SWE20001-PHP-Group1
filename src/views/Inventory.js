import React from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

function Inventory() {
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
                      <th>Product Number</th>
                      <th>Product Name</th>
                      <th>Product Group</th>
                      <th>Total Stock</th>
                      <th>Current Stock</th>
                      <th>Product Description</th>
                      <th className="text-center">Price (EA)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>A-0001</td>
                      <td>product 1</td>
                      <td>Group 1</td>
                      <td>1200</td>
                      <td>1000</td>
                      <td>**A description of the product**</td>
                      <td className="text-center">$36,738</td>
                    </tr>
                    <tr>
                      <td>A-0001</td>
                      <td>Product 2</td>
                      <td>Group 1</td>
                      <td>3000</td>
                      <td>1739</td>
                      <td>**A description of the product**</td>
                      <td className="text-center">$23,789</td>
                    </tr>
                    <tr>
                      <td>A-0001</td>
                      <td>product 3</td>
                      <td>Group 1</td>
                      <td>1000</td>
                      <td>332</td>
                      <td>**A description of the product**</td>
                      <td className="text-center">$56,142</td>
                    </tr>
                    <tr>
                      <td>A-0001</td>
                      <td>Product 4</td>
                      <td>Group 2</td>
                      <td>10,000</td>
                      <td>3564</td>
                      <td>**A description of the product**</td>
                      <td className="text-center">$38,735</td>
                    </tr>
                    <tr>
                      <td>A-0001</td>
                      <td>Product 5</td>
                      <td>Group 3</td>
                      <td>2800</td>
                      <td>239</td>
                      <td>**A description of the product**</td>
                      <td className="text-center">$63,542</td>
                    </tr>
                    <tr>
                      <td>A-0001</td>
                      <td>Product 6</td>
                      <td>Group 6</td>
                      <td>2800</td>
                      <td>485</td>
                      <td>**A description of the product**</td>
                      <td className="text-center">$78,615</td>
                    </tr>
                    <tr>
                      <td>A-0001</td>
                      <td>Product 7</td>
                      <td>Group 4</td>
                      <td>2800</td>
                      <td>504</td>
                      <td>**A description of the product**</td>
                      <td className="text-center">$98,615</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col md="12">
            <Card className="card-plain">
              <CardHeader>
                <CardTitle tag="h4">Table but different style</CardTitle>
                <p className="category">Inventory Level</p>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                  <tr>
                    <th>Product Number</th>
                    <th>Product Name</th>
                    <th>Product Group</th>
                    <th>Total Stock</th>
                    <th>Current Stock</th>
                    <th>Product Description</th>
                    <th className="text-center">Price (EA)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>A-0001</td>
                    <td>product 1</td>
                    <td>Group 1</td>
                    <td>1200</td>
                    <td>1000</td>
                    <td>**A description of the product**</td>
                    <td className="text-center">$36,738</td>
                  </tr>
                  <tr>
                    <td>A-0001</td>
                    <td>Product 2</td>
                    <td>Group 1</td>
                    <td>3000</td>
                    <td>1739</td>
                    <td>**A description of the product**</td>
                    <td className="text-center">$23,789</td>
                  </tr>
                  <tr>
                    <td>A-0001</td>
                    <td>product 3</td>
                    <td>Group 1</td>
                    <td>1000</td>
                    <td>332</td>
                    <td>**A description of the product**</td>
                    <td className="text-center">$56,142</td>
                  </tr>
                  <tr>
                    <td>A-0001</td>
                    <td>Product 4</td>
                    <td>Group 2</td>
                    <td>10,000</td>
                    <td>3564</td>
                    <td>**A description of the product**</td>
                    <td className="text-center">$38,735</td>
                  </tr>
                  <tr>
                    <td>A-0001</td>
                    <td>Product 5</td>
                    <td>Group 3</td>
                    <td>2800</td>
                    <td>239</td>
                    <td>**A description of the product**</td>
                    <td className="text-center">$63,542</td>
                  </tr>
                  <tr>
                    <td>A-0001</td>
                    <td>Product 6</td>
                    <td>Group 6</td>
                    <td>2800</td>
                    <td>485</td>
                    <td>**A description of the product**</td>
                    <td className="text-center">$78,615</td>
                  </tr>
                  <tr>
                    <td>A-0001</td>
                    <td>Product 7</td>
                    <td>Group 4</td>
                    <td>2800</td>
                    <td>504</td>
                    <td>**A description of the product**</td>
                    <td className="text-center">$98,615</td>
                  </tr>
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

export default Inventory;
