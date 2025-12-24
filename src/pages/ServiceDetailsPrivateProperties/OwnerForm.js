import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Col, Form, Row, Upload, Button, notification, Input, DatePicker, Select, Checkbox, InputNumber, Alert, Space, Modal } from "antd"
import PropsTypes from "prop-types"

// components
import { getSalutationList } from '../../actions/getSalutationListActions'
import { saveOwnerPrivateProperties, saveOwnerPrivatePropertiesResetState } from '../../actions/saveOwnerPrivatePropertiesAction'
import { Container, Heading } from '../../components/ServiceDetailsPrivatePropertiesForm/ServiceDetailsPrivatePropertiesFormStyle'
import { FormItem, BlueButton } from '../../components/Xcomponents'
import { getAuthData, getOrgId } from '../../utils'
import { PurchaserContainer, Purchaser, Name, Details, Mobile, Image } from "./OwnerFormStyle"
import { getOwnerList, getOwnerListResetState } from '../../actions/getOwnerListAction'

const { Option } = Select

export const OwnerForm = (props) => {
    const {
        verifyUpnAndMobileSubmitOtpState,
        saveOwnerPrivateProperties,
        saveOwnerPrivatePropertiesState,
        saveOwnerPrivatePropertiesResetState,
        getSalutationList,
        getSalutationListState,
        getOwnerList,
        getOwnerListState,
        getOwnerListResetState,
        getDocumentListState,
        saveNdcApplicationState
    } = props;

    const OrgId = getOrgId()
    const [form] = Form.useForm();
    const [openForm, setOpenForm] = useState(true)
    const initialFormData = {};
    const [formData, setFormData] = useState(initialFormData);
    const [prevData, setPrevData] = useState({
    })

    useEffect(() => {
        saveOwnerPrivatePropertiesResetState();
        setPrevData({});
        getOwnerListResetState();
        // callOwner();
        getSalutationList({
            OrgId: OrgId,
            AuthToken: props.AuthToken,
            AuthTokenKey: props.AuthTokenKey
        })
    }, []);

    // useEffect(()=>{

    // },[saveOwnerPrivatePropertiesState])

    useEffect(() => {
        if (saveOwnerPrivatePropertiesState.apiState === 'success') {
            setOpenForm(false)

            notification.success({
                message: "Owner Private Properties Saved Successfully",
                placement: "bottomRight"
            })
            const newData = saveOwnerPrivatePropertiesState.data.PurchaserId
            setPrevData({
                ...prevData, [newData]: saveOwnerPrivatePropertiesState.data
            })
        }
        if (!Object.keys(saveOwnerPrivatePropertiesState.data).length) {
            setPrevData({});
            setOpenForm(true)
        }
    }, [saveOwnerPrivatePropertiesState]);

    const callOwner = () => {
        getOwnerList({
            OrgId: OrgId,
            ApplicationId: props.EntityId,
            AuthToken: props.AuthToken,
            AuthTokenKey: props.AuthTokenKey
        });
    }

    const handleSubmit = () => {
        saveOwnerPrivateProperties({
            ...formData,
            OrgId: OrgId,
            ApplicationId: props.EntityId,
            PropertyRefId: verifyUpnAndMobileSubmitOtpState.data.PropertyRefId,
            AuthToken: props.AuthToken,
            AuthTokenKey: props.AuthTokenKey,
        })
    };

    // useEffect(() => {
    //     if (saveNdcApplicationState.apiState === "success") {
    //         // setPrevData({});
    //         // form.resetFields();
    //         // setOpenForm(true);
    //     }
    // }, [saveNdcApplicationState])

    const handleOnChangeSelect = (field, value) => {
        setFormData({ ...formData, [field]: value })
    };

    const handleOnChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    };

    return (
        <>

            {saveOwnerPrivatePropertiesState.data && Object.keys(prevData).length > 0 && Object.values(prevData).map((item, key) => {
                return (
                    <div style={{ flexDirection: 'row', marginTop: 5, marginBottom: 10 }}>
                        <b>{key + 1}  : {item.Name}</b>
                        <div style={{ marginLeft: 22 }}> <b>{item.Salutation == 88 ? "Husband Name" : "Father's Name"}</b> : {item.FatherName}</div>
                        <div style={{ marginLeft: 22 }}> <b>Email</b> : {item.EmailAddress}</div>
                        <div style={{ marginLeft: 22 }}> <b>Mobile</b> : {item.MobileNumber}</div>
                        <div style={{ marginLeft: 22 }}> <b>Address</b> : {item.Address}</div>
                    </div>
                )
            })}
            <div>
                {prevData && Object.keys(prevData).length > 0 &&
                    <div style={{ marginBottom: 20, marginTop: 30 }}>
                        <BlueButton
                            onClick={() => {
                                setOpenForm(true)
                                setFormData(initialFormData)
                                form.resetFields()
                            }}
                            style={{ marginTop: 16, marginBottom: 16 }}
                        >

                            Add More Owners

                        </BlueButton>
                    </div>
                }
            </div>

            {openForm &&
                <Form layout="vertical"
                    form={form}
                    onFinish={handleSubmit}>
                    <Row gutter="24" >
                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                            <FormItem
                                name="Salutation"
                                label={"Salutation"}
                                rules={[{ required: true, message: 'Required' }]}
                            >
                                <Select
                                    showSearch
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    name="Salutation"
                                    size="large"
                                    style={{ width: '100%' }}
                                    placeholder="Salutation"
                                    onSelect={(value) => handleOnChangeSelect("Salutation", value)} >
                                    {getSalutationListState.list.map(item => (<Option key={item.Id} value={item.Id}>{item.Name}</Option>))}
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="8" >
                            <FormItem
                                label="Name"
                                name="Name"
                                rules={[{
                                    required: true,
                                    message: 'Required'
                                }]}
                            >
                                <Input name="Name" maxLength={50} size="large" onChange={handleOnChange} />
                            </FormItem>
                        </Col>
                        <Col span="8" >
                            <FormItem
                                label="Address"
                                name="Address"
                                rules={[{
                                    required: true,
                                    message: 'Required'
                                }]}
                            >
                                <Input name="Address" maxLength={50} size="large" onChange={handleOnChange} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter="24" >
                        <Col span="8" >
                            <FormItem
                                label={formData.Salutation === 88 ? "Husband Name" : "Father's Name"}
                                name="FatherName"
                                rules={[{
                                    required: true,
                                    message: 'Required'
                                }]}
                            >
                                <Input name="FatherName" maxLength={50} size="large" onChange={handleOnChange} />
                            </FormItem>
                        </Col>
                        <Col span="8" >
                            <FormItem
                                label="Email"
                                name="EmailAddress"
                                rules={[
                                    { required: true, message: 'Required' },
                                    { type: 'email', message: 'Email is not valid' },
                                ]}
                            >
                                <Input name="EmailAddress" maxLength={50} size="large" onChange={handleOnChange} />
                            </FormItem>
                        </Col>
                        <Col span="8" >
                            <FormItem
                                label="MobileNumber"
                                name="MobileNo"
                                rules={[
                                    { required: true, message: 'Required' },
                                    {
                                        pattern: new RegExp('^[6-9]\\d{9}$'),
                                        message: 'Mobile number is not valid',
                                    }
                                ]}
                            >
                                <Input name="MobileNumber" maxLength={50} size="large" onChange={handleOnChange} />
                            </FormItem>
                        </Col>
                    </Row>

                    <Row gutter="24" >
                        <Col span="8" >
                            <BlueButton disabled={false} htmlType="submit">Save Owner</BlueButton>
                        </Col>
                    </Row>
                </Form>}
        </>
    )
}



const mapStateToProps = (state) => ({
    verifyUpnAndMobileSubmitOtpState: state.verifyUpnAndMobileSubmitOtp,
    saveOwnerPrivatePropertiesState: state.saveOwnerPrivateProperties,
    getSalutationListState: state.getSalutationList,
    getOwnerListState: state.getOwnerList,
    saveNdcApplicationState: state.saveNdcApplication,

})

const mapDispatchToProps = (dispatch) => ({
    saveOwnerPrivateProperties: (params) => dispatch(saveOwnerPrivateProperties(params)),
    getSalutationList: (params) => dispatch(getSalutationList(params)),
    getOwnerList: (params) => dispatch(getOwnerList(params)),
    getOwnerListResetState: () => dispatch(getOwnerListResetState()),
    saveOwnerPrivatePropertiesResetState: () => dispatch(saveOwnerPrivatePropertiesResetState()),
})

export default connect(mapStateToProps, mapDispatchToProps)(OwnerForm)