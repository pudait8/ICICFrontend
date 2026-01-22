import React from "react";
import { Col, Form, Row, Input, Space, Alert, Checkbox, Button } from "antd";
import { connect } from "react-redux";

// components
import { Container, Heading } from "./NdcFormReadOnlyStyle";
import {
  FormItem,
  Xcheckbox,
  CheckboxContainer,
  CheckboxLabel,
} from "../Xcomponents";
import { Link } from "react-router-dom";

const NdcFormReadOnly = (props) => {
  // variables
  const { getServiceDetailState } = props;
  const serviceId = props.serviceId;
  return (
    <Container>
      <Form layout="vertical">
        {serviceId === "21" ||
          serviceId === "1048" ||
          serviceId === "20" ||
          serviceId === "1509" ||
          serviceId === "1508" ||
          serviceId === "26" ||
          serviceId === "25" ||
          serviceId === "32" ? (
          <>
            <Heading>Property Details</Heading>
            <Row gutter="24">
              <Col span="8">
                <FormItem label="UPN">
                  <Input size="large" readOnly />
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="Area">
                  <Input size="large" readOnly />
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="Authority Name">
                  <Input size="large" readOnly />
                </FormItem>
              </Col>
            </Row>
            <Row gutter="24">
              <Col span="8">
                <FormItem label="Plot Number">
                  <Input size="large" readOnly />
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="Property Type">
                  <Input size="large" readOnly />
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="Scheme Name">
                  <Input size="large" readOnly />
                </FormItem>
              </Col>
            </Row>
            <Row gutter="24">
              <Col span="8">
                <FormItem label="Reserved Price">
                  <Input size="large" readOnly />
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="Sale Type">
                  <Input size="large" readOnly />
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="Usage Type">
                  <Input size="large" readOnly />
                </FormItem>
              </Col>
            </Row>
            <Heading>Applicant Details</Heading>
            <Row gutter="24">
              <Col span="8">
                <FormItem label="Full Name">
                  <Input size="large" readOnly />
                </FormItem>
              </Col>
              {serviceId === "1509" ||
                serviceId === "1508" ||
                serviceId === "26" ||
                serviceId === "25" ||
                serviceId === "32" ? null : (
                <>
                  <Col span="8">
                    <FormItem label="Permission Type">
                      <Input size="large" readOnly />
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="Relation">
                      <Input size="large" readOnly />
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="Share to be transferred">
                      <Input size="large" readOnly defaultValue="%" />
                    </FormItem>
                  </Col>
                </>
              )}
            </Row>
            <Heading>
              {props.changeOfOwnerShip
                ? serviceId !== "25"
                  ? "All Transferees Details"
                  : "All Transferees Details as per NOC"
                : "All Purchasers Detail"}
            </Heading>
            <Row gutter={24}>
              <Col span="8">
                <FormItem
                  label={
                    props.changeOfOwnerShip
                      ? "Transferee's Name"
                      : "Purchaser Name"
                  }
                >
                  <Input readOnly size="large" />
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="Father Name">
                  <Input readOnly size="large" />
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="Address">
                  <Input readOnly size="large" />
                </FormItem>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span="8">
                <FormItem label="Mobile">
                  <Input readOnly size="large" />
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="Email">
                  <Input readOnly size="large" />
                </FormItem>
              </Col>
            </Row>
            {serviceId !== "25" && serviceId !== "32" && (
              <div style={{ marginBottom: 36 }}>
                <CheckboxContainer>
                  <Xcheckbox disabled />{" "}
                  <CheckboxLabel>
                    Identity Proof of{" "}
                    {props.changeOfOwnerShip ? "Transferee" : "Purchaser"}{" "}
                    (Aadhaar Card, PAN Card, Driving License or Passport)
                  </CheckboxLabel>
                </CheckboxContainer>
                <CheckboxContainer>
                  <Xcheckbox disabled />{" "}
                  <CheckboxLabel>
                    Latest Passport size photo of{" "}
                    {props.changeOfOwnerShip ? "Transferee" : "Purchaser"}
                  </CheckboxLabel>
                </CheckboxContainer>
                <CheckboxContainer>
                  <Xcheckbox disabled />{" "}
                  <CheckboxLabel>
                    Specimen Signature of{" "}
                    {props.changeOfOwnerShip ? "Transferee" : "Purchaser"}
                  </CheckboxLabel>
                </CheckboxContainer>
              </div>
            )}
            {serviceId !== "25" && serviceId !== "32" && (
              <>
                <Heading>Legal Heir Details</Heading>
                <Row gutter={24}>
                  <Col span="8">
                    <FormItem label="Legal Heir Of">
                      <Input readOnly size="large" />
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="Legal Heir Name">
                      <Input readOnly size="large" />
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem
                      label={
                        props.changeOfOwnerShip
                          ? "Relationship with Transferor"
                          : "Relationship with Purchaser"
                      }
                    >
                      <Input readOnly size="large" />
                    </FormItem>
                  </Col>
                </Row>
              </>
            )}
            {serviceId !== "25" && serviceId !== "32" && (
              <div style={{ marginBottom: 36 }}>
                {/* <CheckboxContainer>
                                <Xcheckbox disabled /> <CheckboxLabel>Identity Proof of Legal Heir (Aadhaar Card, PAN Card, Driving License or Passport)</CheckboxLabel>
                            </CheckboxContainer> */}
                <CheckboxContainer>
                  <Xcheckbox disabled />{" "}
                  <CheckboxLabel>
                    Passport size photo of Legal Heir
                  </CheckboxLabel>
                </CheckboxContainer>
                {/* <CheckboxContainer>
                                <Xcheckbox disabled /> <CheckboxLabel>Specimen Signature of Legal Heir</CheckboxLabel>
                            </CheckboxContainer> */}
              </div>
            )}
          </>
        ) : (
          <>
            <Heading>Applicant Details</Heading>
            <Row gutter="24">
              <Col span="10">
                <FormItem label="Full Name">
                  <Input size="large" readOnly />
                </FormItem>
              </Col>
              <Col span="14">
                <FormItem label="Remark">
                  <Input size="large" readOnly />
                </FormItem>
              </Col>
            </Row>

            <Heading>Property Details</Heading>
            <Row gutter="24">
              <Col span="8">
                <FormItem label="UPN">
                  <Input size="large" readOnly />
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="Area">
                  <Input size="large" readOnly />
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="Authority Name">
                  <Input size="large" readOnly />
                </FormItem>
              </Col>
            </Row>
            <Row gutter="24">
              <Col span="8">
                <FormItem label="Plot Number">
                  <Input size="large" readOnly />
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="Property Type">
                  <Input size="large" readOnly />
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="Scheme Name">
                  <Input size="large" readOnly />
                </FormItem>
              </Col>
              </Row>
                {/* <Heading>Details of Built Up Area</Heading>
              <Row>
               {serviceId === "1791" && (<>
                           <Col span="8">
                              <FormItem label="Covered Area (In Sq.Mtrs.)" name="CoveredArea">
                              <Input size="large" readOnly />
                            </FormItem>
                          </Col>
                         
                            
                           
                           </>)}
            </Row>
             <Heading>Details of Boundary Wall</Heading>
                            <Row>   
                                <Col span="8">
                              <FormItem label="Boundary Wall" name="BoundaryWall">
                              <Input size="large" readOnly />
                            </FormItem>
                          </Col> 
                              </Row>
            
                               <Heading>Details of F.A.R</Heading>
                            <Row>    
                               <Col span="8">
                              <FormItem label="F.A.R (in Sq.mtrs.)" name="F.A.R">
                             <Input size="large" readOnly />
                            </FormItem>
                          </Col>
                              </Row> */}
            
            {serviceId === "33" && (
              <>
                <Heading>
                  Property Details where applicant will run professional
                  consultancy services{" "}
                </Heading>
                <Row gutter="24">
                  <Col span="8">
                    <FormItem label="Select Authority">
                      <Input size="large" readOnly />
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="Enter PAN of Consultant">
                      <Input size="large" readOnly />
                    </FormItem>
                  </Col>
                </Row>
                <Heading>Applicant's Personal Details</Heading>
                <Row gutter="24">
                  <Col span="8">
                    <FormItem label="Salutation">
                      <Input size="large" readOnly />
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="Full Name">
                      <Input size="large" readOnly />
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="Father's Name">
                      <Input size="large" readOnly />
                    </FormItem>
                  </Col>
                </Row>
                <Row gutter="24">
                  <Col span="8">
                    <FormItem label="Gender">
                      <Input size="large" readOnly />
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="Marital Status">
                      <Input size="large" readOnly />
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="Date of Birth">
                      <Input size="large" readOnly />
                    </FormItem>
                  </Col>
                </Row>
                <Row gutter="24">
                  <Col span="8">
                    <FormItem label="UID/Aadhar Number">
                      <Input size="large" readOnly />
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="Email Address">
                      <Input size="large" readOnly />
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="Mobile Number">
                      <Input size="large" readOnly />
                    </FormItem>
                  </Col>
                </Row>
                <Heading>Applicant's Permanent Address</Heading>
                <Row gutter="24">
                  <Col span="24">
                    <FormItem label="Full Address">
                      <Input size="large" readOnly />
                    </FormItem>
                  </Col>
                </Row>
                <Row gutter="24">
                  <Col span="8">
                    <FormItem label="State">
                      <Input size="large" readOnly />
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="District">
                      <Input size="large" readOnly />
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="Pincode">
                      <Input size="large" readOnly />
                    </FormItem>
                  </Col>
                </Row>
                <Row gutter="24">
                  <Col span="24">
                    <FormItem>
                      <Checkbox>
                        Applicant's Correspondence Address Same as Applicant's
                        Permanent Address
                      </Checkbox>
                    </FormItem>
                  </Col>
                </Row>
                <Heading>Applicant's Correspondence Address</Heading>
                <Row gutter="24">
                  <Col span="24">
                    <FormItem label="Full Address">
                      <Input size="large" readOnly />
                    </FormItem>
                  </Col>
                </Row>
                <Row gutter="24">
                  <Col span="8">
                    <FormItem label="State">
                      <Input size="large" readOnly />
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="District">
                      <Input size="large" readOnly />
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="Pincode">
                      <Input size="large" readOnly />
                    </FormItem>
                  </Col>
                </Row>
                <Heading>Professional Consultancy Services Details</Heading>
                <Row gutter="24">
                  <Col span="8">
                    <FormItem label="Service Category">
                      <Input size="large" readOnly />
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="Details of Profession">
                      <Input size="large" readOnly />
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="Details of Anticipated Visitors">
                      <Input size="large" readOnly />
                    </FormItem>
                  </Col>
                </Row>
                <Row gutter="24">
                  <Col span="8">
                    <FormItem label="Working hours of Consultancy">
                      <Input size="large" readOnly />
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="Floor on which Services will be given">
                      <Input size="large" readOnly />
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="Total Area to be used in SQM">
                      <Input size="large" readOnly />
                    </FormItem>
                  </Col>
                </Row>
              </>
            )}
            {serviceId === "1475" && (
              <>
                <Heading>Required Details</Heading>
                <Row gutter="24">
                  <Col span="8">
                    <FormItem label="Date of Sanction of Building Plan">
                      <Input size="large" readOnly />
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="Number of Floors Constructed">
                      <Input size="large" readOnly />
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="Is Basement Constructed">
                      <Input size="large" readOnly />
                    </FormItem>
                  </Col>
                </Row>
                <Row gutter="24">
                  <Col span="8">
                    <FormItem label="Proposed Covered Area  for Ground Floor (in Sq foot)">
                      <Input size="large" readOnly />
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="Proposed Covered Area  for First Floor (in Sq foot)">
                      <Input size="large" readOnly />
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="Proposed Covered Area  for Second Floor (in Sq foot)">
                      <Input size="large" readOnly />
                    </FormItem>
                  </Col>
                </Row>
                <Row gutter="24">
                  <Col span="8">
                    <FormItem label="Service Pipe Length (in feet)">
                      <Input size="large" readOnly />
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="Service Pipe Size">
                      <Input size="large" readOnly />
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="Number of Tapes">
                      <Input size="large" readOnly />
                    </FormItem>
                  </Col>
                </Row>
                <Row gutter="24">
                  <Col span="8">
                    <FormItem label="Size of Tap">
                      <Input size="large" readOnly />
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="Size of Ferrule Cock">
                      <Input size="large" readOnly />
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="Purpose of Water Connection">
                      <Input size="large" readOnly />
                    </FormItem>
                  </Col>
                </Row>
                <Row gutter="24">
                  <Col span="8">
                    <FormItem label="Proposed Covered Area for Basement (in Sq foot)">
                      <Input size="large" readOnly />
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="Is Mumty Constructed">
                      <Checkbox>Yes</Checkbox>
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="Proposed Covered Area  for Mumty (in Sq foot)">
                      <Input size="large" readOnly />
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="Total estimated cost of Construction (as per Architect)">
                      <Input size="large" readOnly />
                    </FormItem>
                  </Col>
                </Row>
              </>
            )}
            {serviceId === "30" && (
              <>
                <Heading>Required Details</Heading>
                <Row gutter="24">
                  <Col span="8">
                    <FormItem label="Whether Building Is">
                      <Input size="large" readOnly />
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="Number of Floors Constructed">
                      <Input size="large" readOnly />
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="Is Basement Constructed">
                      <Input size="large" readOnly />
                    </FormItem>
                  </Col>
                </Row>
                <Row gutter="24">
                  <Col span="8">
                    <FormItem label="Date of Sanction of Building Plan">
                      <Input size="large" readOnly />
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="Number of Seats">
                      <Input size="large" readOnly />
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="Hot Water Fitting Material Details">
                      <Input size="large" readOnly />
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="Hot Water Fitting Installation Bill Number">
                      <Input size="large" readOnly />
                    </FormItem>
                  </Col>
                </Row>
                <Heading>
                  Plumber Certificate Details (Who issued certificate)
                </Heading>
                <Row gutter="24">
                  <Col span="8">
                    <FormItem label="Name of the Plumber">
                      <Input size="large" readOnly />
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="License Number">
                      <Input size="large" readOnly />
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="Address of the Plumber">
                      <Input size="large" readOnly />
                    </FormItem>
                  </Col>
                </Row>
                <Row gutter="24">
                  <Col span="8">
                    <FormItem label="Date of Issue of Certificate">
                      <Input size="large" readOnly />
                    </FormItem>
                  </Col>
                </Row>
              </>
            )}
            {(serviceId === "1059" ||
              serviceId === "1712" ||
              serviceId === "1716") && (
                <>
                  <Heading>Required Details</Heading>
                  <Row gutter="24">
                    <Col span="8">
                      <FormItem label="Water Meter No.">
                        <Input size="large" readOnly />
                      </FormItem>
                    </Col>
                    <Col span="8">
                      <FormItem label="Make and Model">
                        <Input size="large" readOnly />
                      </FormItem>
                    </Col>
                    <Col span="8">
                      <FormItem label="Installation Date">
                        <Input size="large" readOnly />
                      </FormItem>
                    </Col>
                  </Row>
                  <Row gutter="24">
                    <Col span="8">
                      <FormItem label="Water Meter Bill Number">
                        <Input size="large" readOnly />
                      </FormItem>
                    </Col>
                    <Col span="8">
                      <FormItem label="Warranty In Years">
                        <Input size="large" readOnly />
                      </FormItem>
                    </Col>
                    <Col span="8">
                      <FormItem label="Whether Building Is">
                        <Input size="large" readOnly />
                      </FormItem>
                    </Col>
                  </Row>
                  <Row gutter="24">
                    <Col span="8">
                      <FormItem label="Number of Floors Constructed">
                        <Input size="large" readOnly />
                      </FormItem>
                    </Col>
                    <Col span="8">
                      <FormItem label="Is Basement Constructed">
                        <Input size="large" readOnly />
                      </FormItem>
                    </Col>
                    <Col span="8">
                      <FormItem label="Number of Seats For Ground Floor">
                        <Input size="large" readOnly />
                      </FormItem>
                    </Col>
                  </Row>
                  <Row gutter="24">
                    <Col span="8">
                      <FormItem label="Number of Seats For First Floor">
                        <Input size="large" readOnly />
                      </FormItem>
                    </Col>
                    <Col span="8">
                      <FormItem label="Number of Seats For Second Floor">
                        <Input size="large" readOnly />
                      </FormItem>
                    </Col>
                  </Row>
                </>
              )}
            {serviceId === "27" && (
              <>
                <Heading>Building Plan Details</Heading>
                <Row gutter="24">
                  <Col span="8">
                    <FormItem label="Wall Construction Length (In meters)">
                      <Input size="large" readOnly />
                    </FormItem>
                  </Col>
                  {/* <Col span="8" >
                                        <FormItem
                                            label="Building Constructed/Covered Area (In Sq. meters)"
                                        >
                                            <Input size="large" readOnly />
                                        </FormItem>
                                    </Col> */}
                  <Col span="8">
                    <FormItem label="Total Building Construction Cost (In rupees)">
                      <Input size="large" readOnly />
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="Are You Applying For Revised Plan">
                      <Input size="large" readOnly />
                    </FormItem>
                  </Col>
                </Row>
              </>
            )}
          </>
        )}
        {getServiceDetailState.data.ApplicationDocumentList && (
          <>
            <Heading>Documents Required</Heading>
            {getServiceDetailState.data.ApplicationDocumentList.map(
              (document, idx) => (
                <CheckboxContainer style={{ display: "flex " }}>
                  <span>{idx + 1}.</span>
                  <CheckboxLabel>
                    {document.DocumentName}{" "}
                    {(document.IsPVerificationRequired ||
                      document.SampleFileURL) && <br />}
                    <Space>
                      {document.SampleFileURL ? (
                        <Link
                          to={{ pathname: document.SampleFileURL }}
                          target="_blank"
                          style={{
                            textDecoration: "underline",
                            color: "#006fc3",
                          }}
                        >
                          Download Sample Document.
                        </Link>
                      ) : null}
                      {document.IsPVerificationRequired && props.serviceId !== 1791 || props.serviceId !== 1560 && (
                        <Alert
                          message="Physical verification required."
                          type="warning"
                          style={{ padding: "0px 8px" }}
                        />
                      )}
                    </Space>
                  </CheckboxLabel>
                </CheckboxContainer>
              )
            )}
          </>
        )}
      </Form>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  getServiceDetailState: state.getServiceDetail,
});

export default connect(mapStateToProps, null)(NdcFormReadOnly);
