import React, { useState, useEffect } from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router-dom'
import { Form, Col, Row, Input, Select, Tooltip, notification, Space, Button, Alert } from 'antd'
import { CheckCircleFilled, CloseCircleOutlined, InfoCircleOutlined, UndoOutlined } from '@ant-design/icons'

import './GetNoc.css'
import {
    getNocByUpn, getNocByUpnResetState
} from "../../actions/getNocByUpnAction"
import { PrimaryButton, BlankSpace, FormItem, BlueButton, GreenButton, Xlink, FlexDiv, FlexRow, TextButton } from '../../components/Xcomponents'
import { Container, UpnNumberCard, Label } from './GetNocStyle'
import { LeftSection, RightSection, ServiceBar, ServiceName } from '../ServiceDetailPage/ServiceDetailPageStyle'
import { BackIcon } from '../../components/CustomIcons'
// others
import { getOrgId } from '../../utils'

const { Option } = Select;

const GetNoc = props => {

    const {
        getNocByUpn, getNocByUpnState, getNocByUpnResetState
    } = props

    const initialFormData = {
        UPN: null,
        OrgId: getOrgId(),
    }
    const [FormData, setFormData] = useState(initialFormData)
    const [form] = Form.useForm();

    useEffect(() => {
        // requestAuthorityList()
        return (() => getNocByUpnResetState())
    }, [])
    useEffect(() => {
        if (getNocByUpnState.apiState === "success") {
            setFormData({ ...initialFormData })
            form.resetFields()
        }
        if (getNocByUpnState.apiState === "alert" || getNocByUpnState.apiState === "error") {
            notification["error"]({
                message: getNocByUpnState.apiMessage,
                placement: "bottomRight"
            })
            setFormData({ ...initialFormData })
            form.resetFields()
        }
    }, [getNocByUpnState])


    const handleOnChange = (e) => {
        setFormData({ ...FormData, [e.target.name]: e.target.value })
    }

    const onFinish = () => {
        getNocByUpn(FormData)
    }

    const resetForm = () => {
        setFormData({ ...initialFormData })
        form.resetFields()
    }

    return (
        <Container>
            <ServiceBar>
                <LeftSection>
                    <Link to="/" >
                        <BackIcon style={{ marginTop: 5 }} />
                    </Link>
                </LeftSection>
                <RightSection>
                    <ServiceName>Get NOC Number of Your Property</ServiceName>
                </RightSection>
            </ServiceBar>
            {getNocByUpnState.apiState === "success" &&
                <UpnNumberCard className="get-upn-from-container">
                    <Label>The NOC Number of the Property is {getNocByUpnState.data.NocNumber}.</Label><br />
                </UpnNumberCard>
            }
            <div className="get-upn-from-container">
                <Form form={form} layout="vertical" hideRequiredMark={true} onFinish={onFinish} >
                    <Row gutter={20}>
                        <Col span={12} >
                            <FormItem
                                name="UPN"
                                label="UPN Number"
                                rules={[{ required: true, message: 'Required' }]}
                                className="round-input"
                                onChange={handleOnChange}
                                autoComplete="dontshow"
                            >
                                <Input size="large" name="UPN" />
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <div class="ant-col ant-form-item-label"><label class="ant-form-item" title="" style={{ color: "#fff" }}>Submit</label></div>
                            <BlueButton htmlType="submit" icon={<CheckCircleFilled />} loading={getNocByUpnState.apiState === "Success"} >Get NOC Number</BlueButton>
                        </Col>
                    </Row>

                </Form>

            </div>

        </Container>
    )
}

const mapStateToProps = (state) => ({
    getNocByUpnState: state.getNocByUpn,
});

const mapDispatchToProps = (dispatch) => ({
    getNocByUpn: (params) => dispatch(getNocByUpn(params)),
    getNocByUpnResetState: () => dispatch(getNocByUpnResetState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GetNoc);