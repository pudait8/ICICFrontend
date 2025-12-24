import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Col, Form, Row, Upload, Button, notification, Input, DatePicker, Select, Checkbox, InputNumber, Alert, Space, Popconfirm } from "antd"
import PropsTypes from "prop-types"

// components
import { getAuthData, getOrgId } from '../../utils'
import { FormItem, BlueButton, FlexDiv } from '../../components/Xcomponents'
import { PurchaserContainer, Purchaser, Name, Details, Mobile, Image } from "../../pages/ServiceDetailsPrivateProperties/OwnerFormStyle"
import { Container, Heading } from '../../components/ServiceDetailsPrivatePropertiesForm/ServiceDetailsPrivatePropertiesFormStyle'
import { getSalutationList } from '../../actions/getSalutationListActions'
import { saveOwnerPrivateProperties, saveOwnerPrivatePropertiesResetState } from '../../actions/saveOwnerPrivatePropertiesAction'
import { getOwnerList, getOwnerListResetState } from '../../actions/getOwnerListAction'
import { deletePurchaserTransferApplication } from '../../actions/transferApplicationDeletePurchaserActions'

const { Option } = Select

export const EditOwnerForm = (props) => {
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
        saveNdcApplicationState,
        deletePurchaserTransferApplication,
        deletePurchaserState
    } = props;

    const OrgId = getOrgId()
    const [form] = Form.useForm();
    const [openForm, setOpenForm] = useState(false)
    const initialFormData = {};
    const [formData, setFormData] = useState(initialFormData);


    useEffect(() => {
        if (deletePurchaserState.apiState === "alert") {
            deletePurchaserState.apiState = ""
            notification.error({
                message: deletePurchaserState.alertMessage,
                placement: "bottomRight"
            })
        }

        if (deletePurchaserState.apiState === "error") {
            deletePurchaserState.apiState = ""
            notification.error({
                message: "Something went wrong, please try again.",
                placement: "bottomRight"
            })
        }

        if (deletePurchaserState.apiState === "success") {
            deletePurchaserState.apiState = ""
            setOpenForm(false)
            setFormData(initialFormData)
            form.resetFields()
            notification.success({
                message: "Owner has been deleted",
                placement: "bottomRight"
            })
            callOwner()
        }
    }, [deletePurchaserState.apiState])

    useEffect(() => {
        saveOwnerPrivatePropertiesResetState();

        getOwnerListResetState();
        callOwner();
        getSalutationList({
            OrgId: OrgId,
            AuthToken: props.AuthToken,
            AuthTokenKey: props.AuthTokenKey
        })

    }, []);

    useEffect(() => {
        if (saveOwnerPrivatePropertiesState.apiState === 'success') {
            setOpenForm(false)
            notification.success({
                message: "Owner Private Properties Saved Successfully",
                placement: "bottomRight"
            })
            callOwner()
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
            PropertyRefId: formData.PropertyRefId,
            AuthToken: props.AuthToken,
            AuthTokenKey: props.AuthTokenKey,
        })
    };

    const handleOnChangeSelect = (field, value) => {
        setFormData({ ...formData, [field]: value })
    };

    const handleOnChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    };

    const editOwner = (owner) => {
        form.resetFields()
        let editFormDataValue = {
            Salutation: owner.Salutation,
            Name: owner.Name,
            FatherName: owner.FatherName,
            Address: owner.Address,
            MobileNumber: owner.MobileNumber,
            EmailAddress: owner.EmailAddress,
        }
        let editFormData = {
            Salutation: owner.SalutationId,
            Name: owner.Name,
            FatherName: owner.FatherName,
            Address: owner.Address,
            MobileNumber: owner.MobileNumber,
            EmailAddress: owner.EmailAddress,
            PropertyRefId: owner.PropertyRefId,
            PurchaserId: owner.PurchaserId
        }

        setFormData(editFormData)
        form.setFieldsValue(editFormDataValue)
        setOpenForm(true);
    }
    // console.log(getOwnerListState);
    return (
        <>
            {
                getOwnerListState.data.map((owner, key) => {
                    return (
                        <div style={{ flexDirection: 'row', marginTop: 5, marginBottom: 10 }}>
                            <b>{key + 1}  : {owner.Name}</b>
                            <div style={{ marginLeft: 22 }}> <b>Father's Name</b> : {owner.FatherName}</div>
                            <div style={{ marginLeft: 22 }}> <b>Email</b> : {owner.EmailAddress}</div>
                            <div style={{ marginLeft: 22 }}> <b>Mobile</b> : {owner.MobileNumber}</div>
                            <div style={{ marginLeft: 22 }}> <b>Address</b> : {owner.Address}</div>
                            <FlexDiv align="left">
                                <Space>
                                    <Button onClick={() => editOwner(owner)}>Edit</Button>
                                    <Popconfirm
                                        title="Confirm delete?"
                                        onConfirm={() => deletePurchaserTransferApplication({
                                            OrgId: OrgId,
                                            PurchaserId: owner.PurchaserId,
                                            AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
                                            AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey
                                        })}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        {getOwnerListState.data.length > 1 &&
                                            <Button disabled={deletePurchaserState.apiState === 'loading'} danger>Remove</Button>}
                                    </Popconfirm>

                                </Space>
                            </FlexDiv>
                        </div>
                    )
                })
            }


            <div>
                {getOwnerListState.data.length > 0 &&
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
                                    placeholder="Salutation" onSelect={(value) => handleOnChangeSelect("Salutation", value)} >
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
                                label="Father's Name"
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
                                rules={[{
                                    required: true,
                                    message: 'Required'
                                }]}
                            >
                                <Input name="EmailAddress" maxLength={50} size="large" onChange={handleOnChange} />
                            </FormItem>
                        </Col>
                        <Col span="8" >
                            <FormItem
                                label="MobileNumber"
                                name="MobileNumber"
                                rules={[{
                                    required: true,
                                    message: 'Required'
                                }]}
                            >
                                <Input name="MobileNumber" maxLength={50} size="large" onChange={handleOnChange} />
                            </FormItem>
                        </Col>
                    </Row>

                    <Row gutter="24" >
                        <Col span="8" >
                            <BlueButton disabled={false} htmlType="submit">Save Owner</BlueButton>
                            <Button style={{ height: 38, marginLeft: 20 }} onClick={() => setOpenForm(false)}>Cancel</Button>
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
    deletePurchaserState: state.transferApplicationDeletePurchaser,

})

const mapDispatchToProps = (dispatch) => ({
    saveOwnerPrivateProperties: (params) => dispatch(saveOwnerPrivateProperties(params)),
    getSalutationList: (params) => dispatch(getSalutationList(params)),
    getOwnerList: (params) => dispatch(getOwnerList(params)),
    getOwnerListResetState: () => dispatch(getOwnerListResetState()),
    saveOwnerPrivatePropertiesResetState: () => dispatch(saveOwnerPrivatePropertiesResetState()),
    deletePurchaserTransferApplication: (params) => dispatch(deletePurchaserTransferApplication(params)),

})

export default connect(mapStateToProps, mapDispatchToProps)(EditOwnerForm)