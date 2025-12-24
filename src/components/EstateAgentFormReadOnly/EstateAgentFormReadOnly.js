import React from "react"
import { Col, Form, Row, Input, Space, Alert, Checkbox } from "antd"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

// components
import { Container, Heading, QualificationRadio } from './EstateAgentFormReadOnlyStyle'
import { FormItem, CheckboxContainer, CheckboxLabel } from '../Xcomponents'

const EstateAgentFormReadOnly = props => {
    // variables
    const { getServiceDetailState } = props
    const serviceId = props.serviceId
    const serviceName = props.serviceId === '28' ? 'Estate Agent' : props.serviceId === '29' ? 'Promoter' : "Plumber's"
    return (
        <Container>
            <Form layout="vertical" >
                {(props.serviceId === '1721' || props.serviceId === '1726') ?
                    <>
                    </>
                    :
                    <>
                        <Heading>Applicant Details</Heading>
                        <Row gutter="24" >
                            <Col span="8" >
                                <FormItem
                                    label="Select Status of The Applicant"
                                >
                                    <Input size="large" readOnly />
                                </FormItem>
                            </Col>
                        </Row>
                    </>
                }


                <Heading>{serviceName} Personal Details</Heading>
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
                {(props.serviceId === '1721' || props.serviceId === '1726') &&
                    <>
                        <Heading>Qualification and Experience Details:</Heading>
                        <Col span="24" >
                            <FormItem
                                label="Please select any one of the below mentioned qualification"
                            >
                                <QualificationRadio.Group name="Qualification" size="large">
                                    <QualificationRadio value="I am a person having one year certificate in plumbing from any Industrial Training Institute (ITI) recognized by the State Government.">I am a person having one year certificate in plumbing from any Industrial Training Institute (ITI) recognized by the State Government.</QualificationRadio>
                                    <QualificationRadio value="I am a person registered as Plumber with any local authority statutory body of the Government of Punjab.">I am a person registered as Plumber with any local authority statutory body of the Government of Punjab.</QualificationRadio>
                                    <QualificationRadio value="I have ten years practical experience in sanitary installation with a firm with repute or under a registered plumber.">I have ten years practical experience in sanitary installation with a firm with repute or under a registered plumber.</QualificationRadio>
                                </QualificationRadio.Group>
                            </FormItem>
                        </Col>
                    </>
                }
                <Heading>{serviceName} Permanent Address</Heading>
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
                            <Checkbox>{serviceName} Correspondence Address Same as {serviceName} Permanent Address</Checkbox>
                        </FormItem>
                    </Col>
                </Row>
                <Heading>{serviceName} Correspondence Address</Heading>
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

export default connect(mapStateToProps, null)(EstateAgentFormReadOnly)