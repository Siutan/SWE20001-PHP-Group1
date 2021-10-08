import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

// reactstrap components
import { Card, CardBody, Row, Col } from "reactstrap";

function EditInput() {
    return (
        <>
            <div className="content">
                <ChakraProvider>
                    <Tabs
                        variant="soft-rounded"
                        size="md"
                        isFitted
                        defaultIndex={0}
                    >
                        <TabList>
                            <Tab _selected={{ bg: "linear-gradient(to top left, #3358f4 0%, #18a2b9 100%)", color: "white" }}>
                                Management Records
                            </Tab>
                            <Tab _selected={{ bg: "linear-gradient(to top left, #3358f4 0%, #18a2b9 100%)", color: "white" }}>
                                Management Table
                            </Tab>
                            <Tab _selected={{ bg: "linear-gradient(to top left, #3358f4 0%, #18a2b9 100%)", color: "white" }}>
                                Management other
                            </Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <Row>
                                    <Col md="12">
                                        <Card>
                                            <CardBody>
                                                <p>Tab One Content</p>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            </TabPanel>
                            <TabPanel>
                                <Row>
                                    <Col md="12">
                                        <Card>
                                            <CardBody>
                                                <p>Tab Two Content</p>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            </TabPanel>
                            <TabPanel>
                                <Row>
                                    <Col md="12">
                                        <Card>
                                            <CardBody>
                                                <p>Tab Three Content</p>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                    
                    <div>
                        <Tabs
                            variant="enclosed"
                            size="md"
                            isFitted
                            defaultIndex={0}
                        >
                            <TabList>
                                <Tab
                                    _selected={{ bg: "linear-gradient(to top left, #3358f4 0%, #18a2b9 100%)" }}
                                    style={{ color: "white" }}
                                >
                                    Management Records
                                </Tab>
                                <Tab
                                    _selected={{ bg: "linear-gradient(to top left, #3358f4 0%, #18a2b9 100%)" }}
                                    style={{ color: "white" }}
                                >
                                    Management Table
                                </Tab>
                                <Tab
                                    _selected={{ bg: "linear-gradient(to top left, #3358f4 0%, #18a2b9 100%)" }}
                                    style={{ color: "white" }}
                                >
                                    Management other
                                </Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    <Row>
                                        <Col md="12">
                                            <Card>
                                                <CardBody>
                                                    <p>Tab One Content</p>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </Row>
                                </TabPanel>
                                <TabPanel>
                                    <Row>
                                        <Col md="12">
                                            <Card>
                                                <CardBody>
                                                    <p>Tab Two Content</p>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </Row>
                                </TabPanel>
                                <TabPanel>
                                    <Row>
                                        <Col md="12">
                                            <Card>
                                                <CardBody>
                                                    <p>Tab Three Content</p>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </Row>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </div>
                    <div>
                        <Tabs
                            variant="line"
                            colorScheme="whiteBlack"
                            size="md"
                            isFitted
                            defaultIndex={0}
                        >
                            <TabList>
                                <Tab style={{  color: "#32b7e8"} }>
                                    Management Records
                                </Tab>
                                <Tab style={{ color: "#32b7e8" }}>
                                    Management Table
                                </Tab>
                                <Tab style={{ color: "#32b7e8" }}>
                                    Management other
                                </Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    <Row>
                                        <Col md="12">
                                            <Card>
                                                <CardBody>
                                                    <p>Tab One Content</p>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </Row>
                                </TabPanel>
                                <TabPanel>
                                    <Row>
                                        <Col md="12">
                                            <Card>
                                                <CardBody>
                                                    <p>Tab Two Content</p>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </Row>
                                </TabPanel>
                                <TabPanel>
                                    <Row>
                                        <Col md="12">
                                            <Card>
                                                <CardBody>
                                                    <p>Tab Three Content</p>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </Row>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </div>
                </ChakraProvider>
            </div>
        </>
    );
}

export default EditInput;
