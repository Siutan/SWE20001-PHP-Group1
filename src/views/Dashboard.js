import React, { useMemo, useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { ChakraProvider } from "@chakra-ui/react";
import { PieChart } from "react-minimal-pie-chart";
import {
  Text,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  SimpleGrid,
  CircularProgress,
  CircularProgressLabel,
  Center,
} from "@chakra-ui/react";

// reactstrap components
import { Card, CardTitle, CardHeader, CardBody, Row, Col } from "reactstrap";

function EditInput() {
  // SET URL TO GET SALES ENDPOINT
  const requestUrl = "https://sisrestapi.herokuapp.com/report/summary";

  // SETS A STATE THAT TELLS THE APP DATA IS BEING LOADED
  const [loadingData, setLoadingData] = useState(true);

  // SETS A STATE FOR DATA
  const [data, setData] = useState([]);

  useEffect(() => {
    const ls = require("localstorage-ttl");
    const apiWeeklyURL =
      "https://sisrestapi.herokuapp.com/sales/product/weekly";

    async function getWeeklySales() {
      await fetch(apiWeeklyURL, {
        method: "GET",
        credentials: "include",
        mode: "cors",
      })
        .then((response) => response.json())
        .then((data) => {
          document.getElementById("weeklySales").innerHTML = data.length;
          document.getElementById("weeklyRevenue").innerHTML =
            "$" + data.length * 19;
          document.getElementById("weeklyGrowth").innerHTML =
            "+" + data.length / 12 + "%";
          document.getElementById("weeklyOrders").innerHTML = Math.floor(
            data.length / 1.8
          );
        });
    }

    async function getData() {
      await fetch(requestUrl, {
        method: "GET",
        credentials: "include",
        mode: "cors",
      })
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setLoadingData(false); // SWITCHES THE loadingData TO false SO THE APP KNOWS CONTENT IS LOADED
          document.getElementById("summaryText").innerHTML = data.summary;
        });
    }
    if (loadingData) {
      // IF loadingData IS true FETCH DATA FROM API
      getWeeklySales();
      getData();
    }
  }, []);

  const defaultLabelStyle = {
  fontSize: '5px',
  fontFamily: 'sans-serif',
  };

  return (
    <>
      <div className="content">
        <ChakraProvider>
          <Text
            bgGradient="linear(to-tl, #2381d3 0%, #18a2b9 100%)"
            bgClip="text"
            fontSize="6xl"
          >
            DASHBOARD
          </Text>
          <Row>
            <Col md="2">
              <Card>
                <CardBody>
                  <Stat color="white" px="5">
                    <StatLabel>Weekly Sales</StatLabel>
                    <StatNumber id="weeklySales" />
                    <StatHelpText>
                      <StatArrow type="decrease" />
                      47.36%
                    </StatHelpText>
                    <StatLabel>since last week</StatLabel>
                  </Stat>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <Stat color="white" px="5">
                    <StatLabel>Weekly Revenue</StatLabel>
                    <StatNumber id="weeklyRevenue" />
                    <StatHelpText>
                      <StatArrow type="decrease" />
                      63%
                    </StatHelpText>
                    <StatLabel>since last week</StatLabel>
                  </Stat>
                </CardBody>
              </Card>
            </Col>
            <Col md="2">
              <Card>
                <CardBody>
                  <Stat color="white" px="5">
                    <StatLabel>Weekly Orders</StatLabel>
                    <StatNumber id="weeklyOrders" />
                    <StatHelpText>
                      <StatArrow type="increase" />
                      8.27%
                    </StatHelpText>
                    <StatLabel>since last week</StatLabel>
                  </Stat>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <Stat color="white" px="5">
                    <StatLabel>Weekly Growth</StatLabel>
                    <StatNumber id="weeklyGrowth" />
                    <StatHelpText>
                      <StatArrow type="increase" />
                      2.28%
                    </StatHelpText>
                    <StatLabel>since last week</StatLabel>
                  </Stat>
                </CardBody>
              </Card>
            </Col>
            <Col md="8">
              <Card>
                <CardBody>
                  <SimpleGrid minChildWidth="120px" spacing="40px">
                    <div className="font-icon-detail" borderColor="blue">
                      <Text>Put sales graph here :)</Text>
                    </div>
                  </SimpleGrid>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="12"></Col>
            <Col md="8">
              <Text
            bgGradient="linear(to-tl, #2381d3 0%, #18a2b9 100%)"
            bgClip="text"
            fontSize="6xl"
          >
            SALES SUMMARY
          </Text>
              {loadingData ? ( // CHECK IF loadingData IS true
                <div className="d-flex justify-content-center">
                  <h1>
                    <Spinner animation="border" /> Loading (If data isnt
                    Loading, Please log in again)...
                  </h1>
                </div>
              ) : (
                // IF loadingData IS flase DISPLAY TABLE
                <div>
                  <Card>
                    <CardBody>
                      <Text
                        id="summaryText"
                        bgGradient="linear(to-tl, #2381d3 0%, #18a2b9 100%)"
                        bgClip="text"
                        fontSize="3xl"
                      />
                    </CardBody>
                  </Card>
                </div>
              )}
            </Col>
            <Col md="4">
              <Text
            bgGradient="linear(to-tl, #2381d3 0%, #18a2b9 100%)"
            bgClip="text"
            fontSize="6xl"
          >
            WEEKLY TARGET
          </Text>
              <Card>
                <CardBody>
                  <Center>
                    <CircularProgress value={40} size="225" color="#267cd8">
                    <CircularProgressLabel color="white">40%</CircularProgressLabel>
                  </CircularProgress>
                  </Center>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </ChakraProvider>
      </div>
    </>
  );
}

export default EditInput;
