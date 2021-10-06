import React from "react";
import {Tabs, Tab } from "react-bootstrap"

function EditInput() {
  return (
    <>
      <div className="content">

        <Tabs variant="pills" defaultActiveKey="Product" className="mb-3">
          
          <Tab eventKey="Product" title="Product" style={{color: "white"}}>
            <div>
              
            </div>
          </Tab>

          <Tab eventKey="Inventory" title="Inventory" style={{color: "white"}}>
             <div>

            </div>
          </Tab>

          <Tab eventKey="Sales" title="Sales" style={{color: "white"}}>
            
            <div>

            </div>
          </Tab>
      </Tabs>
      </div>
    </>
  );
}

export default EditInput;
