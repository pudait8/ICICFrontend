import React from "react"
import { Col, Form, Row, Input, Checkbox, Space, Alert } from "antd"
import { connect } from "react-redux"

// components
import { Container, Heading } from './EmpanellmentFormReadOnlyStyle'
import { FormItem, CheckboxContainer, CheckboxLabel } from '../Xcomponents'
import { Link } from "react-router-dom"

const EmpanellmentFormReadOnly = props => {
    // variables
    const { getServiceDetailState } = props
    const serviceId = props.serviceId
    return (
        <Container>
            <Form layout="vertical" >
                <Heading>Application Details</Heading>
                <Row gutter="24" >
                    <Col span="8" >
                        <FormItem
                            label="Select Authority"
                        >
                            <Input size="large" readOnly />
                        </FormItem>
                    </Col>
                    {/* <Col span="8" >
                        <FormItem
                            label="Empanelment Category"
                        >
                            <Input size="large" readOnly />
                        </FormItem>
                    </Col> */}
                    <Col span="8" >
                        <FormItem
                            label="Enter PAN of Architect"
                        >
                            <Input size="large" readOnly />
                        </FormItem>
                    </Col>
                </Row>

                <Heading>Architect's Personal Details</Heading>
                <Row gutter="24" >
                    <Col span="8" >
                        <FormItem
                            label="Salutation"
                        >
                            <Input size="large" readOnly />
                        </FormItem>
                    </Col>
                    <Col span="8" >
                        <FormItem
                            label="Full Name"
                        >
                            <Input size="large" readOnly />
                        </FormItem>
                    </Col>
                    <Col span="8" >
                        <FormItem
                            label="Father's Name"
                        >
                            <Input size="large" readOnly />
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter="24" >
                    <Col span="8" >
                        <FormItem
                            label="Gender"
                        >
                            <Input size="large" readOnly />
                        </FormItem>
                    </Col>
                    <Col span="8" >
                        <FormItem
                            label="Marital Status"
                        >
                            <Input size="large" readOnly />
                        </FormItem>
                    </Col>
                    <Col span="8" >
                        <FormItem
                            label="Date of Birth"
                        >
                            <Input size="large" readOnly />
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter="24" >
                    <Col span="8" >
                        <FormItem
                            label="UID/Aadhar Number"
                        >
                            <Input size="large" readOnly />
                        </FormItem>
                    </Col>
                    <Col span="8" >
                        <FormItem
                            label="Email Address"
                        >
                            <Input size="large" readOnly />
                        </FormItem>
                    </Col>
                    <Col span="8" >
                        <FormItem
                            label="Mobile Number"
                        >
                            <Input size="large" readOnly />
                        </FormItem>
                    </Col>
                </Row>
                <Heading>Certificate of Registration Details at Council of Architecture</Heading>
                <Row gutter="24" >
                    <Col span="8" >
                        <FormItem
                            label="Certificate Number"
                        >
                            <Input size="large" readOnly />
                        </FormItem>
                    </Col>
                    <Col span="8" >
                        <FormItem
                            label="Valid From"
                        >
                            <Input size="large" readOnly />
                        </FormItem>
                    </Col>
                    <Col span="8" >
                        <FormItem
                            label="Valid Till"
                        >
                            <Input size="large" readOnly />
                        </FormItem>
                    </Col>
                </Row>
                <Heading>Architect's Permanent Address</Heading>
                <Row gutter="24" >
                    <Col span="24" >
                        <FormItem
                            label="Full Address"
                        >
                            <Input size="large" readOnly />
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter="24" >
                    <Col span="8" >
                        <FormItem
                            label="State"
                        >
                            <Input size="large" readOnly />
                        </FormItem>
                    </Col>
                    <Col span="8" >
                        <FormItem
                            label="District"
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
                <Row gutter="24" >
                    <Col span="24" >
                        <FormItem>
                            <Checkbox>Architect's official Address Same as Architect's Permanent Address</Checkbox>
                        </FormItem>
                    </Col>
                </Row>
                <Heading>Architect's official Address</Heading>
                <Row gutter="24" >
                    <Col span="24" >
                        <FormItem
                            label="Full Address"
                        >
                            <Input size="large" readOnly />
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter="24" >
                    <Col span="8" >
                        <FormItem
                            label="State"
                        >
                            <Input size="large" readOnly />
                        </FormItem>
                    </Col>
                    <Col span="8" >
                        <FormItem
                            label="District"
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
            </Form>
        </Container>
    )
}

const mapStateToProps = (state) => ({
    getServiceDetailState: state.getServiceDetail,
})

export default connect(mapStateToProps, null)(EmpanellmentFormReadOnly)