import React from "react";
// nodejs library that concatenates classes

// reactstrap components
import {
  Row,
  Col,
  Card, 
  CardBody,
  CardHeader,
} from "reactstrap";
// Chakra UI components
import {
  ChakraProvider,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react'

import ProductAnalytics from "./ProductAnalytics";
import SalesAnalytics from "./SalesAnalytics";


// core components
import MainChart from 'variables/MainChart.js'
import chartOptions1 from "../variables/chartOptions1";
// import chartOptions3 from "../variables/chartOptions3";
// import chartOptions4 from "../variables/chartOptions4";
// import chart1Data from 'variables/chart1Data.js';
// import Chart2 from 'variables/chart2Data.js';
// // import Chart3 from 'variables/chart3Data.js';
// import chart4Data from 'variables/chart4Data.js';


function Analytics(props) {

  const ls = require('localstorage-ttl')

  async function fetchSales () {
  await fetch('https://sisrestapi.herokuapp.com/sales', {
    method: 'GET',
    credentials: 'include',
    mode: 'cors'
  })
    .then(response => response.json())
    .then(data => {
      ls.set("salesData",data, 60000)
    })
}

  if (ls.get("salesData") == null) {
    fetchSales()
    console.log("fetched data = " + ls.get("salesData"))
  } else{
    console.log(("cached data = " + ls.get("salesData")))
  }

  return (
    <>
      <div className="content">
        <ChakraProvider>
        <Row>
          <Col xs="12">
            <Card>
              <CardBody>
                <Tabs
                    variant="soft-rounded"
                    size="md"
                    isFitted
                    defaultIndex={0}
                  >
                    <div
                      style={{
                        backgroundColor: "#1e1e26",
                        borderRadius: "100px",
                      }}
                    >
                      <TabList>
                        <Tab
                          _selected={{
                            bg: "linear-gradient(to top left, #2381d3 0%, #18a2b9 100%)"
                          }}
                          style={{
                            color: "white",
                            outline: "none",
                            border: "none",
                            boxShadow: "none",
                          }}
                        >
                          Graphed Reports
                        </Tab>
                        <Tab
                          _selected={{
                            bg: "linear-gradient(to top left, #2381d3 0%, #18a2b9 100%)",
                          }}
                          style={{
                            color: "white",
                            outline: "none",
                            border: "none",
                            boxShadow: "none",
                          }}
                        >
                          Product Analytics
                        </Tab>
                        <Tab
                          _selected={{
                            bg: "linear-gradient(to top left, #2381d3 0%, #18a2b9 100%)",
                          }}
                          style={{
                            color: "white",
                            outline: "none",
                            border: "none",
                            boxShadow: "none",
                          }}
                        >
                          Sales Analytics
                        </Tab>
                      </TabList>
                    </div>
                    <TabPanels>
                      <TabPanel>
                        <MainChart/>
                      </TabPanel>
                      <TabPanel>
                        <ProductAnalytics/>
                      </TabPanel>
                      <TabPanel>
                        <SalesAnalytics/>
                      </TabPanel>
                    </TabPanels>
                    </Tabs>
              </CardBody>
            </Card>
          </Col>
        </Row>
        </ChakraProvider>
      </div>
    </>
  );
}

export default Analytics;