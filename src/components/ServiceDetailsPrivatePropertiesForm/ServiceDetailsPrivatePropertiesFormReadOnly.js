import React, { useEffect } from 'react'
import { Col, Form, Row, Upload, Button, notification, Input, DatePicker, Select, Checkbox, InputNumber, Alert, Space, Modal } from "antd"
import { connect } from "react-redux"

// components
import { Container, Heading } from './ServiceDetailsPrivatePropertiesFormStyle'
import { FormItem, Xcheckbox, CheckboxContainer, CheckboxLabel } from '../Xcomponents'
import { Link } from "react-router-dom"
import { saveNdcApplication, saveNdcApplicationResetState } from '../../actions/saveNdcApplicationAction'
import { saveOwnerPrivatePropertiesResetState } from '../../actions/saveOwnerPrivatePropertiesAction'


import Item from 'antd/lib/list/Item'
export const ServiceDetailsPrivatePropertiesFormReadOnly = (props) => {
    const { listofDocuments, saveOwnerPrivatePropertiesResetState, saveOwnerPrivatePropertiesState, saveNdcApplicationResetState, saveNdcApplicationState } = props;
    useEffect(() => {
        saveNdcApplicationResetState();
        saveOwnerPrivatePropertiesResetState();
    }, [])
    // console.log(saveOwnerPrivatePropertiesState);
    // console.log(saveNdcApplicationState);
    // saveOwnerPrivatePropertiesState
    return (
        <Container>
            <Form
                layout="vertical">
                <Heading>Applicant Details</Heading>
                <Row gutter="24" >
                    <Col span="8" >
                        <FormItem
                            label="Applicant Name"
                        >
                            <Input size="large" readOnly />
                        </FormItem>
                    </Col>
                    <Col span="14" >
                        <FormItem
                            label="Remark"
                        >
                            <Input size="large" readOnly />
                        </FormItem>
                    </Col>
                </Row>

                <Heading>Property Details</Heading>
                <Row gutter="24" >
                    <Col span="8" >
                        <FormItem
                            label="Select Scheme"
                        >
                            <Select
                                size="large"
                                disabled={true}
                            />
                        </FormItem>
                    </Col>
                    <Col span="14" >
                        <FormItem
                            label="Select Property Number"
                        >
                            <Select
                                disabled={true}
                                size="large"
                            />

                        </FormItem>
                    </Col>
                </Row>
                <Heading>Owner Details</Heading>
                <Row gutter="24" >
                    <Col span="8" >
                        <FormItem
                            label="Name"
                        >
                            <Input size="large" readOnly />
                        </FormItem>
                    </Col>
                    <Col span="14" >
                        <FormItem
                            label="Address"
                        >
                            <Input size="large" readOnly />
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter="24" >
                    <Col span="8" >
                        <FormItem
                            label="Email"
                        >
                            <Input size="large" readOnly />
                        </FormItem>
                    </Col>
                    <Col span="14" >
                        <FormItem
                            label="Mobile No"
                        >
                            <Input size="large" readOnly />
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter="24" >
                    <Col span="8" >
                        <FormItem
                            label="Father's Name"
                        >
                            <Input size="large" readOnly />
                        </FormItem>
                    </Col>
                </Row>
                <Heading>Required Documents</Heading>
                {listofDocuments && listofDocuments.length > 0 && listofDocuments.map((document, idx) => (
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
                    // <h3> - {item.AllowedDocumentTypes}</h3>
                ))}
            </Form>
        </Container>
    )
}

const mapStateToProps = (state) => ({
    verifyUpnAndMobileSubmitOtpState: state.verifyUpnAndMobileSubmitOtp,
    saveOwnerPrivatePropertiesState: state.saveOwnerPrivateProperties,
    getSalutationListState: state.getSalutationList,
    saveNdcApplicationState: state.saveNdcApplication,

})

const mapDispatchToProps = (dispatch) => ({
    saveNdcApplicationResetState: () => dispatch(saveNdcApplicationResetState()),
    saveOwnerPrivatePropertiesResetState: () => dispatch(saveOwnerPrivatePropertiesResetState()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ServiceDetailsPrivatePropertiesFormReadOnly)
