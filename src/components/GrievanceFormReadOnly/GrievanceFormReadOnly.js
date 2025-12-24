import React from "react"
import { Col, Form, Row, Input, Space, Alert, Checkbox } from "antd"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

// components
import { CheckboxData, Container, GrievanceTextarea, Heading, QualificationRadio } from './GrievanceFormReadOnlyStyle'
import { FormItem, CheckboxContainer, CheckboxLabel } from '../Xcomponents'

const GrievanceFormReadOnly = props => {
    // variables
    const { getServiceDetailState } = props
    const serviceId = props.serviceId
    const serviceName = props.serviceId === '28' ? 'Estate Agent' : props.serviceId === '29' ? 'Promoter' : "Plumber's"
    return (
        <Container>
            <Form layout="vertical" >

                <Heading> Complainant's Details</Heading>
                <Row gutter="24" >
                    <Col span="8" >
                        <FormItem
                            label="Full Name"
                        >
                            <Input size="large" readOnly />
                        </FormItem>
                    </Col>
                    <Col span="8" >
                        <FormItem
                            label="Gender"
                        >
                            <Input size="large" readOnly />
                        </FormItem>
                    </Col>
                    <Col span="8" >
                        <FormItem
                            label="Email ID"
                        >
                            <Input size="large" readOnly />
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter="24" >
                    <Col span="24" >
                        <FormItem
                            label="Address Line 1"
                        >
                            <Input size="large" readOnly />
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter="24" >
                    <Col span="24" >
                        <FormItem
                            label="Address Line 2"
                        >
                            <Input size="large" readOnly />
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter="24" >
                    <Col span="8" >
                        <FormItem
                            label="City"
                        >
                            <Input size="large" readOnly />
                        </FormItem>
                    </Col>
                    <Col span="8" >
                        <FormItem
                            label="State"
                        >
                            <Input size="large" readOnly />
                        </FormItem>
                    </Col>
                    <Col span="8" >
                        <FormItem
                            label="Pincode"
                        >
                            <Input size="large" readOnly />
                        </FormItem>
                    </Col>
                </Row>

                <Heading>Grievance Details</Heading>
                <Row gutter="24" >
                    <Col span="8" >
                        <FormItem
                            label="Grievance Pertaining to"
                        >
                            <Input size="large" readOnly />
                        </FormItem>
                    </Col>
                    <Col span="8" >
                        <FormItem
                            label="Select Service"
                        >
                            <Input size="large" readOnly />
                        </FormItem>
                    </Col>
                    <Col span="8" >
                        <FormItem
                            label="Application Number"
                        >
                            <Input size="large" readOnly />
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter="24" >
                    <Col span="24" >
                        <FormItem
                            label="Please Enter Grievance Description upto 1500 characters"
                        >
                            <GrievanceTextarea size="large" readOnly />
                        </FormItem>
                    </Col>
                </Row>

                {getServiceDetailState.data.ApplicationDocumentList &&
                    <>
                        <Heading>Documents Required</Heading>
                        {getServiceDetailState.data.ApplicationDocumentList.map((document, idx) => (
                            <CheckboxContainer style={{ display: 'flex ' }}>
                                <span>{idx + 1}.</span>
                                <CheckboxLabel>{document.DocumentName} {(document.IsPVerificationRequired || document.SampleFileURL) && <br />}
                                    <Space>
                                        {document.SampleFileURL ? <Link to={{ pathname: document.SampleFileURL }} target="_blank" style={{ textDecoration: 'underline', color: '#006fc3' }}>Download Sample Document.</Link> : null}
                                        {document.IsPVerificationRequired &&
                                            <Alert
                                                message="Physical verification required."
                                                type="warning"
                                                style={{ padding: "0px 8px" }}
                                            />
                                        }
                                    </Space>
                                </CheckboxLabel>
                            </CheckboxContainer>
                        ))}
                    </>
                }
                <Row gutter="24" >
                    <Col span="24" >
                        <FormItem>
                            <Checkbox.Group>
                                <CheckboxData> I would like to get tele-phonic assistance on my mobile number verified above.</CheckboxData>
                                <CheckboxData> I here by state that the facts mentioned above are true to the best of my knowldege and belief. </CheckboxData>
                            </Checkbox.Group>
                        </FormItem>
                    </Col>
                </Row>

                <>
                    <Heading>Documents Required</Heading>

                    <CheckboxContainer style={{ display: 'flex ' }}>
                        <span>1.</span>
                        <CheckboxLabel> Upload relevant document <span style={{ color: "red" }}>(File must be in ".jpeg/.jpg/.png/.pdf format and less than 2048KB in size")</span>
                        </CheckboxLabel>
                    </CheckboxContainer>
                </>
            </Form>
        </Container>
    )
}

const mapStateToProps = (state) => ({
    getServiceDetailState: state.getServiceDetail,
})

export default connect(mapStateToProps, null)(GrievanceFormReadOnly)