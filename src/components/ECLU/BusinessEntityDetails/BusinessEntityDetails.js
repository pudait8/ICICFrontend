import React, { useEffect, useState } from "react"
import { Col, Form, Row, Upload, Button, notification, Input, DatePicker, Select, Checkbox, InputNumber, Alert, Space, Modal, Radio } from "antd"
import { connect } from "react-redux"
import { UploadOutlined } from '@ant-design/icons'
import moment from 'moment';
import _ from "lodash"
import { Link, Redirect } from "react-router-dom"

// Action
import { getStateList, getStateListResetState } from '../../../actions/getStateListAction'
import { getDistrictList, getDistrictListResetState } from '../../../actions/getDistrictListAction'
import { saveEcluBussinessDetails, saveEcluBussinessDetailsResetState } from '../../../actions/saveEcluBussinessDetailsAction'
//Others
import { getOrgId } from '../../../utils'
import conf from "../../../config"
import { BlankSpace, BlueButton, FormItem, Xtable } from "../../Xcomponents";
import { Heading } from "../../../pages/ECLU/ECLUStyle";
const { Option } = Select


const BusinessEntityDetails = props => {

    //Variables
    const OrgId = getOrgId()
    const [dataSource, setDataSource] = useState([])
    const [refresh, setRefresh] = useState(0)
    const [checkSameAs, setCheckSameAs] = useState(false)
    const [formData, setFormData] = useState({
        "ApplicantId": "",
        "BusinessId": 0,
        "BussinessName": "",
        "BussinessType": "",
        "Address1": "",
        "Address2": "",
        "Pin": "",
        "Country": "",
        "StateId": "",
        "DistrictId": "",
        "Tehsil": "",
        "DirectorDetails": [],
        "Name": "",
        "Designation": "",
        "Address": " ",
        "Mobile": "",
        "Email": "",
        "Gender": ""
    })
    const [form] = Form.useForm()
    const {
        getStateList, getStateListState, getStateListResetState,
        getDistrictList, getDistrictListState, getDistrictListResetState,
        saveEcluBussinessDetails, saveEcluBussinessDetailsState, saveEcluBussinessDetailsResetState,
        getEcluDetailState,
        verifyUpnAndMobileSubmitOtpState
    } = props

    //Callback
    useEffect(() => {
        getStateList({
            OrgId: OrgId,
        })
        return (() => {
            getDistrictListResetState()
            getStateListResetState()
            saveEcluBussinessDetailsResetState()
        })
    }, [])

    useEffect(() => {
        if (saveEcluBussinessDetailsState.apiState === "alert") {
            notification["error"]({
                message: saveEcluBussinessDetailsState.apiMessage,
                placement: "bottomRight"
            })
        }

        if (saveEcluBussinessDetailsState.apiState === "success") {
            notification["success"]({
                message: saveEcluBussinessDetailsState.apiMessage,
                placement: "bottomRight"
            })
        }
    }, [saveEcluBussinessDetailsState])

    useEffect(() => {
        if (getEcluDetailState.apiState === "success") {
            // setApplicantId(getEcluDetailState.data.ApplicantId)
            if (getEcluDetailState.data.BussinessEntityDetails) {

                getDistrictList({
                    OrgId: OrgId,
                    StateId: getEcluDetailState.data.BussinessEntityDetails.StateId
                })
                let data = []
                let dataForFromData = []
                getEcluDetailState.data.BussinessEntityDetails.DirectorDetails.map((item, index) => {
                    data.push({
                        Key: ++index,
                        Id: ++index,
                        Name: item.Name,
                        Address: item.Address,
                        Designation: item.Designation,
                        ContactDetail: { Mobile: item.Mobile, Email: item.Email, Gender: item.Gender },
                    })
                    dataForFromData.push({
                        Name: item.Name,
                        Address: item.Address,
                        Designation: item.Designation,
                        Mobile: item.Mobile,
                        Email: item.Email,
                        Gender: item.Gender
                    })
                })
                setDataSource(data)
                setFormData({
                    ...formData,
                    ApplicantId: getEcluDetailState.data.ApplicantId,
                    BusinessId: getEcluDetailState.data.BussinessEntityDetails.BusinessId,
                    BussinessName: getEcluDetailState.data.BussinessEntityDetails.BussinessName,
                    BussinessType: getEcluDetailState.data.BussinessEntityDetails.BussinessType,
                    Address1: getEcluDetailState.data.BussinessEntityDetails.Address1,
                    Address2: getEcluDetailState.data.BussinessEntityDetails.Address2,
                    Pin: getEcluDetailState.data.BussinessEntityDetails.Pin,
                    Country: getEcluDetailState.data.BussinessEntityDetails.Country,
                    StateId: getEcluDetailState.data.BussinessEntityDetails.StateId,
                    DistrictId: getEcluDetailState.data.BussinessEntityDetails.DistrictId,
                    Tehsil: getEcluDetailState.data.BussinessEntityDetails.Tehsil,
                    DirectorDetails: dataForFromData,
                })
                form.setFieldsValue({
                    Title: getEcluDetailState.data.BussinessEntityDetails.Title,
                    BussinessName: getEcluDetailState.data.BussinessEntityDetails.BussinessName,
                    BussinessType: getEcluDetailState.data.BussinessEntityDetails.BussinessType,
                    Address1: getEcluDetailState.data.BussinessEntityDetails.Address1,
                    Address2: getEcluDetailState.data.BussinessEntityDetails.Address2,
                    Pin: getEcluDetailState.data.BussinessEntityDetails.Pin,
                    Country: getEcluDetailState.data.BussinessEntityDetails.Country,
                    StateId: getEcluDetailState.data.BussinessEntityDetails.StateId,
                    DistrictId: getEcluDetailState.data.BussinessEntityDetails.DistrictId,
                    Tehsil: getEcluDetailState.data.BussinessEntityDetails.Tehsil,
                })
            }

        }
    }, [getEcluDetailState])

    //Functions
    const handleOnChangeSelect = (value, name) => {
        setFormData({ ...formData, [name]: value })
    }

    const handleOnChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleOnChangeSelectState = (value, name, status) => {
        setFormData({ ...formData, [name]: value, ["DistrictId"]: "" })
        form.setFieldsValue({
            DistrictId: ""
        })
        getDistrictList({
            OrgId: OrgId,
            StateId: value
        })
    }

    let columns = [
        {
            title: "Sr.No",
            dataIndex: "Key",
        },
        {
            title: "Name",
            dataIndex: "Name",
        },
        {
            title: "Designation",
            dataIndex: "Designation",
        },
        {
            title: "Address",
            dataIndex: "Address",
        },
        {
            title: "Contact Detail",
            dataIndex: "ContactDetail",
            render: (item) => {
                return (
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        <div>{item?.Mobile}</div>
                        <div>{item?.Email}</div>
                    </div>
                )
            }
        },
        {
            title: "Action",
            dataIndex: "Id",
            render: (id) => (
                <div style={{ display: 'flex', flexWrap: 'wrap', cursor: "pointer" }}>
                    <span onClick={() => handleDelete(id)} >Delete</span>
                </div>
            )
        },
    ]


    useEffect(() => {
        if (refresh > 0) {
            let data = []
            formData.DirectorDetails.map((item, index) => {
                data.push({
                    Key: ++index,
                    Id: ++index,
                    Name: item.Name,
                    Address: item.Address,
                    Designation: item.Designation,
                    ContactDetail: { Mobile: item.Mobile, Email: item.Email, Gender: item.Gender },
                })
            })
            setDataSource(data)
        }

    }, [refresh])

    useEffect(() => {
        // setDetailsOfDitectors(data)
    }, [formData])

    const addDetails = () => {
        if (formData.Name && formData.Designation && formData.Address && formData.Email && formData.Mobile && formData.Gender) {
            const newElement = {
                "Name": formData.Name,
                "Designation": formData.Designation,
                "Address": formData.Address,
                "Mobile": formData.Mobile,
                "Email": formData.Email,
                "Gender": formData.Gender,
            };
            setFormData({ ...formData, DirectorDetails: [...formData.DirectorDetails, newElement], ['Name']: "", ['Designation']: "", ['Address']: "", ['Mobile']: "", ['Email']: "", ['Gender']: "" });
            form.setFieldsValue({
                Name: "",
                Designation: "",
                Address: " ",
                Mobile: "",
                Email: "",
                Gender: null
            })
            setRefresh(refresh + 1)

        }
    }

    const handleSubmit = () => {
        if (formData.DirectorDetails.length > 0) {
            saveEcluBussinessDetails({
                OrgId: OrgId,
                AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
                AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey,
                ...formData
            })
        }
    }
    const handleDelete = (id) => {
        const newData = dataSource.filter((data) => data.Id !== id);
        let data = []
        let dataForFromData = []
        newData.map((item, index) => {
            data.push({
                Key: ++index,
                Id: ++index,
                Name: item.Name,
                Address: item.Address,
                Designation: item.Designation,
                ContactDetail: { Mobile: item.ContactDetail.Mobile, Email: item.ContactDetail.Email, Gender: item.ContactDetail.Gender },
            })
            dataForFromData.push({
                Name: item.Name,
                Address: item.Address,
                Designation: item.Designation,
                Mobile: item.ContactDetail.Mobile,
                Email: item.ContactDetail.Email,
                Gender: item.ContactDetail.Gender
            })
        })
        setDataSource(data)
        setFormData({ ...formData, ['DirectorDetails']: dataForFromData })
    }
    const onSameAsChange = (e) => {
        setCheckSameAs(e.target.checked)
        if (e.target.checked) {
            if (getEcluDetailState.data) {
                getDistrictList({
                    OrgId: OrgId,
                    StateId: getEcluDetailState.data.StateId
                })

                setFormData({
                    ...formData,
                    Address1: getEcluDetailState.data.Address1,
                    Address2: getEcluDetailState.data.Address2,
                    Pin: getEcluDetailState.data.Pin,
                    Country: getEcluDetailState.data.Country,
                    StateId: getEcluDetailState.data.StateId,
                    DistrictId: getEcluDetailState.data.DistrictId,
                    Tehsil: getEcluDetailState.data.Tehsil,
                })
                form.setFieldsValue({
                    Address1: getEcluDetailState.data.Address1,
                    Address2: getEcluDetailState.data.Address2,
                    Pin: getEcluDetailState.data.Pin,
                    Country: getEcluDetailState.data.Country,
                    StateId: getEcluDetailState.data.StateId,
                    DistrictId: getEcluDetailState.data.DistrictId,
                    Tehsil: getEcluDetailState.data.Tehsil,
                })
            }

        }
        else {
            setFormData({
                ...formData,
                Address1: "",
                Address2: "",
                Pin: "",
                Country: "",
                StateId: "",
                DistrictId: "",
                Tehsil: "",
            })
            form.setFieldsValue({
                Address1: "",
                Address2: "",
                Pin: "",
                Country: "",
                StateId: null,
                DistrictId: null,
                Tehsil: "",
            })
        }

    }

    return (
        <>
            <Form
                layout="vertical"
                onFinish={handleSubmit}
                form={form}
            >
                <Row gutter="24" >
                    <Col span="16" >
                        <FormItem
                            label="Business Entity Name"
                            name="BussinessName"
                            rules={[{
                                required: true,
                                message: 'Required'
                            }]}
                        >
                            <Input name="BussinessName" size="large" onChange={handleOnChange} />
                        </FormItem>
                    </Col>
                    <Col span="8" >
                        <FormItem
                            label="Business Entity Type"
                            name="BussinessType"
                            rules={[{
                                required: true,
                                message: 'Required'
                            }]}
                        >
                            <Input name="BussinessType" size="large" onChange={handleOnChange} />
                        </FormItem>
                    </Col>
                </Row>
                <BlankSpace />
                <Heading>Details of Directors/Partners/Owner</Heading>
                <Row gutter="24" >
                    <Col span="8" >
                        <FormItem
                            label="Name"
                            name="Name"
                            rules={[{
                                required: formData.DirectorDetails.length > 0 ? false : true,
                                message: 'Required'
                            }]}
                        >
                            <Input name="Name" size="large" onChange={handleOnChange} />
                        </FormItem>
                    </Col>
                    <Col span="8" >
                        <FormItem
                            name="Designation"
                            label={"Designation"}
                            rules={[{ required: formData.DirectorDetails.length > 0 ? false : true, message: 'Required' }]}
                        >
                            <Input name="Designation" size="large" onChange={handleOnChange} />
                        </FormItem>
                    </Col>
                    <Col span="8" >
                        <FormItem
                            label="Full Address"
                            name="Address"
                            rules={[
                                { required: formData.DirectorDetails.length > 0 ? false : true, message: 'Required' },
                            ]}
                        >
                            <Input name="Address" size="large" onChange={handleOnChange} />
                        </FormItem>
                    </Col>
                    <Col span="8" >
                        <FormItem
                            label="Mobile Number"
                            name="Mobile"
                            rules={[
                                { required: formData.DirectorDetails.length > 0 ? false : true, message: 'Required' },
                                {
                                    pattern: new RegExp('^[6-9]\\d{9}$'),
                                    message: 'Mobile number is not valid',
                                }
                            ]}
                        >
                            <Input name="Mobile" size="large" onChange={handleOnChange} />
                        </FormItem>
                    </Col>
                    <Col span="8" >
                        <FormItem
                            label="Email Address"
                            name="Email"
                            rules={[
                                { required: formData.DirectorDetails.length > 0 ? false : true, message: 'Required' },
                                { type: 'email', message: 'Email is not valid' },
                            ]}
                        >
                            <Input name="Email" size="large" onChange={handleOnChange} />
                        </FormItem>
                    </Col>
                    <Col span="8" >
                        <FormItem
                            label="Gender"
                            name="Gender"
                            rules={[{
                                required: formData.DirectorDetails.length > 0 ? false : true,
                                message: 'Required'
                            }]}
                        >
                            <Select
                                name="Gender"
                                onSelect={(v) => handleOnChangeSelect(v, "Gender")}
                                size="large"
                            >
                                <Option key={"Male"} value={"Male"}>Male</Option>
                                <Option key={"Female"} value={"Female"}>Female</Option>
                                <Option key={"Other"} value={"Other"}>Other</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <BlueButton onClick={addDetails} >ADD ANOTHER</BlueButton>
                <Xtable dataSource={dataSource} columns={columns} pagination={false} scroll={{ x: 300 }} />
                <BlankSpace />

                <Row gutter="24" >
                    <Col span="24" >
                        <FormItem>
                            <Checkbox checked={checkSameAs} onChange={onSameAsChange}>Business Address same as Applicant Address</Checkbox>
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter="24" >
                    <Col span="8" >
                        <FormItem
                            label="Address Line 1"
                            name="Address1"
                            rules={[{
                                required: true,
                                message: 'Required'
                            }]}
                        >
                            <Input name="Address1" size="large" onChange={handleOnChange} />
                        </FormItem>
                    </Col>
                    <Col span="8" >
                        <FormItem
                            label="Address Line 2"
                            name="Address2"
                            rules={[{ required: true, message: 'Required' }]}
                        >
                            <Input name="Address2" size="large" onChange={handleOnChange} />
                        </FormItem>
                    </Col>
                    <Col span="8" >
                        <FormItem
                            label="Pincode"
                            name="Pin"
                            rules={[
                                { required: true, message: 'Required' },
                            ]}
                        >
                            <Input name="Pin" size="large" onChange={handleOnChange} />
                        </FormItem>
                    </Col>
                    <Col span="8" >
                        <FormItem
                            label="Country"
                            name="Country"
                            rules={[
                                { required: true, message: 'Required' }
                            ]}
                        >
                            <Input name="Country" size="large" onChange={handleOnChange} />
                        </FormItem>
                    </Col>
                    <Col span="8" >
                        <FormItem
                            label="State/UT"
                            name="StateId"
                            rules={[
                                { required: true, message: 'Required' }
                            ]}
                        >
                            <Select
                                showSearch
                                notFoundContent={null}
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                autoComplete="dontshow"
                                name="StateId"
                                size="large" style={{ width: '100%' }}
                                onSelect={(v) => handleOnChangeSelectState(v, 'StateId', true)}
                            >
                                {getStateListState.list.map(item => (<Option key={item.Id} value={item.Id}>{item.Name}</Option>))}
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="8" >
                        <FormItem
                            label="District"
                            name="DistrictId"
                            rules={[
                                { required: true, message: 'Required' },
                            ]}
                        >
                            <Select
                                showSearch
                                notFoundContent={null}
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                autoComplete="dontshow"
                                name="DistrictId"
                                size="large" style={{ width: '100%' }}
                                onSelect={(v) => handleOnChangeSelect(v, 'DistrictId')}
                            >
                                {getDistrictListState.list.map(item => (<Option key={item.Id} value={item.Id}>{item.Name}</Option>))}
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="8" >
                        <FormItem
                            label="Tehsil"
                            name="Tehsil"
                            rules={[
                                { required: true, message: 'Required' }
                            ]}
                        >
                            <Input name="Tehsil" size="large" onChange={handleOnChange} />
                        </FormItem>
                    </Col>
                </Row>


                <BlueButton htmlType="submit" loading={saveEcluBussinessDetailsState.apiState === "loading"} >SAVE AND GO TO PROJECT DETAILS SECTION</BlueButton>
            </Form>
        </>
    )


}


const mapStateToProps = (state) => ({
    getStateListState: state.getStateList,
    getDistrictListState: state.getDistrictList,
    saveEcluBussinessDetailsState: state.saveEcluBussinessDetails,
    getEcluDetailState: state.getEcluDetail,
    verifyUpnAndMobileSubmitOtpState: state.verifyUpnAndMobileSubmitOtp,
})

const mapDispatchToProps = (dispatch) => ({
    getStateList: (params) => dispatch(getStateList(params)),
    getStateListResetState: () => dispatch(getStateListResetState()),
    getDistrictList: (params) => dispatch(getDistrictList(params)),
    getDistrictListResetState: () => dispatch(getDistrictListResetState()),
    saveEcluBussinessDetails: (params) => dispatch(saveEcluBussinessDetails(params)),
    saveEcluBussinessDetailsResetState: () => dispatch(saveEcluBussinessDetailsResetState()),
})

export default connect(mapStateToProps, mapDispatchToProps)(BusinessEntityDetails)