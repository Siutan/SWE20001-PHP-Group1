import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

function EditInput() {
  return (
    <>
      <div className="content">
        <Row>
          <Col md="8">
            <Card>
              <CardHeader>
                <h5 className="title">Edit Product</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-md-1" md="5">
                      <FormGroup>
                        <label>Product Name</label>
                        <Input
                          defaultValue="*existing product name*"
                          placeholder="Product Name"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="3">
                      <FormGroup>
                        <label>Product Number</label>
                        <Input
                          defaultValue="*Existing Product ID*"
                          placeholder="Product Number"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="4">
                      <FormGroup>
                        <label>Product Group</label>
                        <Input
                          defaultValue="*Existing Product Group*"
                          placeholder="Product Group"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>Total Stock</label>
                        <Input
                          defaultValue="*Total Stock at Start of Month*"
                          placeholder="Total Stock of Product"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="6">
                      <FormGroup>
                        <label>Current Stock</label>
                        <Input
                          defaultValue="*Current Stock*"
                          placeholder="Current stock of Product"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="8">
                      <FormGroup>
                        <label>Product Description</label>
                        <Input
                          cols="80"
                          defaultValue="*existing product description*"
                          placeholder="Here can be your description"
                          rows="4"
                          type="textarea"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
              <CardFooter>
                <Button className="btn-fill" color="primary" type="submit">
                  Save
                </Button>
              </CardFooter>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <CardBody>
                <CardText />
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="Product"
                      src={require("assets/img/product-image-placeholder.jpg").default} // THIS IS A PLACEHOLDER, replace with image of product being edited.
                    />
                    <h5 className="title">*Prodct ID*</h5>
                  </a>
                  <p className="description">*Product Name*</p>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default EditInput;
