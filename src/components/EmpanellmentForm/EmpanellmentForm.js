import React, { useEffect, useState } from "react"
import { Col, Form, Row, Upload, Button, notification, Input, DatePicker, Select, Checkbox, InputNumber, Alert, Space, Modal } from "antd"
import { connect } from "react-redux"
import { UploadOutlined } from '@ant-design/icons'
import moment from 'moment';
import _ from "lodash"

// components
import { Container, Heading } from './EmpanellmentFormStyle'
import { FormItem, BlankSpace, BlueButton, DocumentUpload, ValidationDiv, FileTitle } from '../Xcomponents'

// actions
import { getRegistrationCategory, getRegistrationCategoryResetState } from "../../actions/getRegistrationCategoryAction"
import { getSalutationList } from '../../actions/getSalutationListActions'
import { getStateList, getStateListResetState } from '../../actions/getStateListAction'
import { getDistrictList, getDistrictListResetState } from '../../actions/getDistrictListAction'
import { getEntrepreneurDetailByPan } from "../../actions/getEntrepreneurDetailByPanAction"
import { saveProfessionalService, saveProfessionalServiceResetState } from "../../actions/saveProfessionalServiceAction"
import { getDocumentList, getDocumentListResetState } from '../../actions/getDocumentListAction'
import { getAppointmentDate, getAppointmentDateResetState } from '../../actions/getAppointmentDateAction'

import conf from "../../config"

// others
import { getOrgId } from '../../utils'
import { Link, Redirect } from "react-router-dom"
const { Option } = Select
const EmpanellmentForm = props => {
    // variables
    const {
        verifyUpnAndMobileSubmitOtpState,
        getRegistrationCategory, getRegistrationCategoryState, getRegistrationCategoryResetState,
        getSalutationList, getSalutationListState,
        getEntrepreneurDetailByPan, getEntrepreneurDetailByPanState,
        getStateList, getStateListState, getStateListResetState,
        getDistrictList, getDistrictListState, getDistrictListResetState,
        saveProfessionalService, saveProfessionalServiceState, saveProfessionalServiceResetState,
        getDocumentList, getDocumentListResetState, getDocumentListState,
        getAppointmentDate, getAppointmentDateState, getAppointmentDateResetState,
    } = props
    const serviceId = props.serviceId
    const OrgId = getOrgId()
    let initialFormData = {
        ApplicationType: serviceId,
        PreRegNo: "",
        Authority: OrgId,
        RegistrationCategory: "",
        PAN: "",
        Salutation: "Mr.",
        Name: "",
        MobileNumber: "",
        EmailAddress: "",
        DateOfBirth: "",
        Gender: "",
        MaritalStatus: "",
        DateOfBirth: "",
        FatherHusbandName: "",
        AadhaarNumber: "",
        PermanentAddress: "",
        PermanentAddressDistrict: "",
        PermanentAddressState: "",
        PermanentAddressPin: "",
        CorrespondenceAddress: "",
        CorrespondenceAddressDistrict: "",
        CorrespondenceAddressState: "",
        CorrespondenceAddressPin: "",
        IsCorrespondenceAddressSame: false,
        ValidFrom: null,
        ValidTill: null,
        CertificateNumber: "",
        AppointmentDate: "",
    }
    const [form] = Form.useForm()
    const [formData, setFormData] = useState(initialFormData)
    const [checkSameAs, setCheckSameAs] = useState(false)
    const [selectState, setSelectState] = useState(true)
    const [validDate, setValidDate] = useState({
        ValidFrom: null,
        ValidTill: null
    })
    const [districtList, setDistrictList] = useState({
        permanentDistrict: [],
        correspondenceDistrict: [],
    })
    const [isPVerificationRequired, setIsPVerificationRequired] = useState(false)
    const [fileList, setFileList] = useState([])
    const [uploadLoading, setUploadLoading] = useState([])
    const [files, setFiles] = useState([])
    const [documentFileId, setDocumentFileId] = useState([])

    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [currentFileType, setCurrentFileType] = useState(''); // Current file format
    const [submitDocumentStatus, setSubmitDocumentStatus] = useState(false); // Current file format
    const [defaultFileList, setDefaultFileList] = useState([])

    const [redirect, setRedirect] = useState([false, ""])


    // callbacks
    useEffect(() => {
        getSalutationList({
            OrgId: OrgId,
            AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
            AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey
        })
        getRegistrationCategory({
            OrgId: OrgId,
            AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
            AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey
        })
        getStateList({
            OrgId: OrgId,
        })
        getDocumentList({
            PropertyId: verifyUpnAndMobileSubmitOtpState.data.PropertyRefId,
            OrgId: OrgId,
            ApplicationTypeId: props.serviceId,
            AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
            AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey
        })
        return (() => {
            getRegistrationCategoryResetState()
            getDistrictListResetState()
            getStateListResetState()
            saveProfessionalServiceResetState()
            getDocumentListResetState()
            getAppointmentDateResetState()

        })
    }, [])

    useEffect(() => {
        if (getDocumentListState.apiState === "success") {
            let data = _.find(getDocumentListState.list, { 'IsPVerificationRequired': true }) ? true : false
            if (data) {
                setIsPVerificationRequired(true)
                getAppointmentDate({
                    OrgId: OrgId,
                    ApplicationTypeId: props.serviceId,
                    AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
                    AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey
                })
            }
            else {
                setIsPVerificationRequired(false)
            }
        }
    }, [getDocumentListState])

    useEffect(() => {
        if (getRegistrationCategoryState.apiState === "success") {
            let registrationCategoryName = ""
            if (serviceId === "1679" || serviceId === "1710" || serviceId === "1727") {
                registrationCategoryName = "Empanelment of Architect"
            }
            let regCat = _.find(getRegistrationCategoryState.list, { 'Name': registrationCategoryName })
            setFormData({ ...formData, ["RegistrationCategory"]: regCat.Id, ["Salutation"]: "Mr." })
            form.setFieldsValue({
                RegistrationCategory: regCat.Name,
                Salutation: "Mr.",
            })
        }
    }, [getRegistrationCategoryState])

    useEffect(() => {
        if (getDistrictListState.apiState === "success") {
            if (selectState) {
                setDistrictList({ ...districtList, ['permanentDistrict']: getDistrictListState.list })
                setFormData({ ...formData, ['PermanentAddressDistrict']: "" })
                form.setFieldsValue({
                    PermanentAddressDistrict: null,
                })
            }
            else {
                setDistrictList({ ...districtList, ['correspondenceDistrict']: getDistrictListState.list })
                setFormData({ ...formData, ['CorrespondenceAddressDistrict']: "" })
                form.setFieldsValue({
                    CorrespondenceAddressDistrict: null,
                })
            }
        }
        else {
            if (selectState) {
                setDistrictList({ ...districtList, ['permanentDistrict']: [] })
                setFormData({ ...formData, ['PermanentAddressDistrict']: "" })
                form.setFieldsValue({
                    PermanentAddressDistrict: null,
                })
            }
            else {
                setDistrictList({ ...districtList, ['correspondenceDistrict']: [] })
                setFormData({ ...formData, ['CorrespondenceAddressDistrict']: "" })
                form.setFieldsValue({
                    CorrespondenceAddressDistrict: null,
                })
            }
        }
    }, [getDistrictListState])

    useEffect(() => {
        if (checkSameAs) {
            form.validateFields(['CorrespondenceAddress', 'CorrespondenceAddressState', 'CorrespondenceAddressDistrict', 'CorrespondenceAddressPin'])
        }
    }, [checkSameAs])

    useEffect(() => {
        if (getEntrepreneurDetailByPanState.apiState === "success") {
            setFormData({
                ...formData,
                ['Salutation']: getEntrepreneurDetailByPanState.data.Title,
                ['Name']: getEntrepreneurDetailByPanState.data.FullName,
                ['MobileNumber']: getEntrepreneurDetailByPanState.data.MobileNumber,
                ['EmailAddress']: getEntrepreneurDetailByPanState.data.EmailAddress,
                ['DateOfBirth']: getEntrepreneurDetailByPanState.data.Dob,
                ['Gender']: getEntrepreneurDetailByPanState.data.Gender,
                ['MaritalStatus']: getEntrepreneurDetailByPanState.data.MaritalStatusId,
                ['FatherHusbandName']: getEntrepreneurDetailByPanState.data.FatherName,
                ['AadhaarNumber']: getEntrepreneurDetailByPanState.data.Aadhar,
                ['PermanentAddress']: getEntrepreneurDetailByPanState.data.PeAddressLine1,
                ['PermanentAddressState']: getEntrepreneurDetailByPanState.data.PeStateId,
                ['PermanentAddressDistrict']: getEntrepreneurDetailByPanState.data.PeDistrictId,
                ['PermanentAddressPin']: getEntrepreneurDetailByPanState.data.PePin,
                ['CorrespondenceAddress']: getEntrepreneurDetailByPanState.data.CoAddressLine1,
                ['CorrespondenceAddressState']: getEntrepreneurDetailByPanState.data.CoStateId,
                ['CorrespondenceAddressDistrict']: getEntrepreneurDetailByPanState.data.CoDistrictId,
                ['CorrespondenceAddressPin']: getEntrepreneurDetailByPanState.data.CoPin,
            })
            form.setFieldsValue({
                Salutation: getEntrepreneurDetailByPanState.data.Title,
                Name: getEntrepreneurDetailByPanState.data.FullName,
                MobileNumber: getEntrepreneurDetailByPanState.data.MobileNumber,
                EmailAddress: getEntrepreneurDetailByPanState.data.EmailAddress,
                DateOfBirth: getEntrepreneurDetailByPanState.data.Dob ? moment(getEntrepreneurDetailByPanState.data.Dob) : "",
                Gender: getEntrepreneurDetailByPanState.data.Gender,
                MaritalStatus: getEntrepreneurDetailByPanState.data.MaritalStatus,
                FatherHusbandName: getEntrepreneurDetailByPanState.data.FatherName,
                AadhaarNumber: getEntrepreneurDetailByPanState.data.Aadhar,
                PermanentAddress: getEntrepreneurDetailByPanState.data.PeAddressLine1,
                PermanentAddressState: getEntrepreneurDetailByPanState.data.PeState,
                PermanentAddressDistrict: getEntrepreneurDetailByPanState.data.PeDistrict,
                PermanentAddressPin: getEntrepreneurDetailByPanState.data.PePin,
                CorrespondenceAddress: getEntrepreneurDetailByPanState.data.CoAddressLine1,
                CorrespondenceAddressState: getEntrepreneurDetailByPanState.data.CoState,
                CorrespondenceAddressDistrict: getEntrepreneurDetailByPanState.data.CoDistrict,
                CorrespondenceAddressPin: getEntrepreneurDetailByPanState.data.CoPin,
            })
        }
        else if (getEntrepreneurDetailByPanState.apiState === "alert") {
            notification["error"]({
                message: getEntrepreneurDetailByPanState.alertMessage,
                placement: "bottomRight"
            })
        }
    }, [getEntrepreneurDetailByPanState])

    useEffect(() => {
        if (saveProfessionalServiceState.apiState === "alert") {
            notification["error"]({
                message: saveProfessionalServiceState.apiMessage,
                placement: "bottomRight"
            })
            saveProfessionalServiceResetState()
        }

        if (saveProfessionalServiceState.apiState === "success") {
            notification["success"]({
                message: saveProfessionalServiceState.apiMessage,
                placement: "bottomRight"
            })
            verifyUpnAndMobileSubmitOtpState.submitApplication = true
            setRedirect([true, "/ndc-details/" + saveProfessionalServiceState.data.ApplicationId])
        }
    }, [saveProfessionalServiceState])



    // functions
    const handleOnChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = () => {

        saveProfessionalService({
            ApplicationType: props.serviceId,
            PropertyRefId: verifyUpnAndMobileSubmitOtpState.data.PropertyRefId,
            Remark: formData.Remark,
            RegistrationCategory: formData.RegistrationCategory,
            TemporaryApplicationId: getDocumentListState.EntityId,
            AppointmentDate: formData.AppointmentDate,
            OrgId: OrgId,
            PAN: formData.PAN,
            PreRegNo: formData.PreRegNo,
            Salutation: formData.Salutation,
            Name: formData.Name,
            FatherHusbandName: formData.FatherHusbandName,
            Gender: formData.Gender,
            MaritalStatus: formData.MaritalStatus,
            DateOfBirth: formData.DateOfBirth,
            AadhaarNumber: formData.AadhaarNumber,
            PhoneNumber: formData.MobileNumber,
            EmailAddress: formData.EmailAddress,
            CertificateNumber: formData.CertificateNumber,
            ValidFrom: formData.ValidFrom,
            ValidTill: formData.ValidTill,
            PermanentAddress: formData.PermanentAddress,
            PermanentAddressState: formData.PermanentAddressState,
            PermanentAddressDistrict: formData.PermanentAddressDistrict,
            PermanentAddressPin: formData.PermanentAddressPin,
            CorrespondenceAddress: checkSameAs ? formData.PermanentAddress : formData.CorrespondenceAddress,
            CorrespondenceAddressState: checkSameAs ? formData.PermanentAddressState : formData.CorrespondenceAddressState,
            CorrespondenceAddressDistrict: checkSameAs ? formData.PermanentAddressDistrict : formData.CorrespondenceAddressDistrict,
            CorrespondenceAddressPin: checkSameAs ? formData.PermanentAddressPin : formData.CorrespondenceAddressPin,
            AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
            AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey
        })
    }

    const disabledDate = (current) => {
        var tillDate = moment().subtract(13, 'years')
        return !(tillDate.isAfter(current));
    }

    const disabledValidFromDate = (current) => {
        if (validDate.ValidTill !== null) {
            return current && current > validDate.ValidTill
        }
        else {
            return current && current < validDate.ValidTill
        }
    }

    const disabledValidTillDate = (current) => {
        return current && current < validDate.ValidFrom
    }

    const handleOnChangeDateValid = (date, dateString, name) => {

        setValidDate({ ...validDate, [name]: date })
        setFormData({ ...formData, [name]: dateString })
    }



    const handleOnChangeDate = (date, dateString, name) => {
        setFormData({ ...formData, [name]: dateString })
    }

    const handleOnChangeSelect = (value, name) => {
        setFormData({ ...formData, [name]: value })
    }


    const normFile = e => {
        if (Array.isArray(e)) {
            return e;
        }

        return e && e.fileList;
    }

    const onPreview = async file => {
        let extension = file.name.substr(file.name.lastIndexOf(".") + 1)
        let src = file.url;
        if (extension === 'jpg' || extension === 'jpeg' || extension === 'png') {
            if (!src) {
                src = await new Promise(resolve => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file.originFileObj);
                    reader.onload = () => resolve(reader.result);
                });
            }
            setCurrentFileType('image');
            setPreviewImage(src);
            setPreviewVisible(true);
        }
        else {
            setCurrentFileType('pdf');
            setPreviewImage(src);
            setPreviewVisible(true);
        }

    }

    const handleCancel = () => {
        setPreviewVisible(false);
    }

    const renderExtensions = (extension) => {
        let extensionData = []
        extension.map((data) => {
            let a = "." + _.split(data, "/")[1]
            extensionData.push(a)
        })
        return extensionData.join(", ")
    }
    const handleOnChangeSelectState = (value, name, status) => {
        setFormData({ ...formData, [name]: value })
        setSelectState(status)
        getDistrictList({
            OrgId: OrgId,
            StateId: value
        })
    }


    const onSameAsChange = (e) => {
        setCheckSameAs(e.target.checked)
    }

    const callEntrepreneurDetailByPan = () => {
        getEntrepreneurDetailByPan({
            OrgId: formData.Authority,
            PAN: formData.PAN,
            AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
            AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey
        })
    }

    return (
        <>
            {redirect[0] &&
                <Redirect to={redirect[1]} />
            }

            <Container>
                <Form
                    layout="vertical"
                    form={form}
                    onFinish={handleSubmit}
                >
                    <Heading>Application Details</Heading>
                    <Row gutter="24" >

                        {/* <Col span="8" >
                            <FormItem
                                label="Empanelment Category"
                                name="RegistrationCategory"
                            >
                                <Input name="RegistrationCategory" size="large" onChange={handleOnChange} readOnly />
                            </FormItem>
                        </Col> */}
                        <Col span="8" >
                            <FormItem
                                label="Enter PAN of Architect"
                                name="PAN"
                                rules={[
                                    { required: true, message: 'Required' },
                                    { pattern: '^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$', message: 'PAN is not valid' }
                                ]}
                            >
                                <Input name="PAN" size="large" onChange={handleOnChange} />
                            </FormItem>
                        </Col>
                        <Col span="8" >
                            <FormItem
                                label=" "
                            >
                                <BlueButton onClick={callEntrepreneurDetailByPan}>Fetch Details</BlueButton>
                            </FormItem>
                        </Col>
                    </Row>

                    <Heading>Architect's Personal Details</Heading>
                    <Row gutter="24" >
                        <Col span="8" >
                            <FormItem
                                name="Salutation"
                                label={"Salutation"}
                                rules={[{ required: true, message: 'Required' }]}
                            >
                                <Select name="Salutation" size="large" style={{ width: '100%' }} onSelect={(v) => handleOnChangeSelect(v, 'Salutation')} >
                                    {getSalutationListState.list.map(item => (
                                        <>
                                            {item.NameRegional === "I" &&
                                                <Option key={item.Id} value={item.Name}>{item.Name}</Option>
                                            }
                                        </>
                                    ))}
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="8" >
                            <FormItem
                                label="Full Name"
                                name="Name"
                                rules={[{
                                    required: true,
                                    message: 'Required'
                                }]}
                            >
                                <Input name="Name" size="large" onChange={handleOnChange} />
                            </FormItem>
                        </Col>
                        <Col span="8" >
                            <FormItem
                                label="Father's Name"
                                name="FatherHusbandName"
                                rules={[{
                                    required: true,
                                    message: 'Required'
                                }]}
                            >
                                <Input name="FatherHusbandName" size="large" onChange={handleOnChange} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter="24" >
                        <Col span="8" >
                            <FormItem
                                label="Gender"
                                name="Gender"
                                rules={[{
                                    required: true,
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
                                    <Option key={"UnSpecified"} value={"UnSpecified"}>UnSpecified</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="8" >
                            <FormItem
                                label="Marital Status"
                                name="MaritalStatus"
                                rules={[{
                                    required: true,
                                    message: 'Required'
                                }]}
                            >
                                <Select
                                    name="MaritalStatus"
                                    onSelect={(v) => handleOnChangeSelect(v, "MaritalStatus")}
                                    size="large"
                                >
                                    <Option key={218} value={218}>Single</Option>
                                    <Option key={219} value={219}>Married</Option>
                                    <Option key={220} value={220}>Divorcee</Option>
                                    <Option key={221} value={221}>Widow</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="8" >
                            <FormItem
                                label="Date of Birth"
                                name="DateOfBirth"
                                rules={[{
                                    required: true,
                                    message: 'Required'
                                }]}
                            >
                                <DatePicker
                                    name="DateOfBirth"
                                    size="large"
                                    onChange={(date, dateString) => handleOnChangeDate(date, dateString, "DateOfBirth")}
                                    format="DD-MMM-YYYY"
                                    disabledDate={disabledDate}
                                    placeholder=""
                                    style={{ width: '100%' }}
                                />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter="24" >
                        <Col span="8" >
                            <FormItem
                                label="UID/Aadhaar Number"
                                name="AadhaarNumber"
                                rules={[
                                    { required: true, message: 'Required' },
                                    { pattern: '^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$', message: 'Aadhaar number is not valid' }
                                ]}
                            >
                                <Input name="AadhaarNumber" size="large" onChange={handleOnChange} />
                            </FormItem>
                        </Col>
                        <Col span="8" >
                            <FormItem
                                label="Email Address"
                                name="EmailAddress"
                                rules={[
                                    { required: true, message: 'Required' },
                                    { type: 'email', message: 'Email is not valid' },
                                ]}
                            >
                                <Input name="EmailAddress" size="large" onChange={handleOnChange} />
                            </FormItem>
                        </Col>
                        <Col span="8" >
                            <FormItem
                                label="Mobile Number"
                                name="MobileNumber"
                                rules={[
                                    { required: true, message: 'Required' },
                                    {
                                        pattern: new RegExp('^[6-9]\\d{9}$'),
                                        message: 'Mobile number is not valid',
                                    }
                                ]}
                            >
                                <Input name="MobileNumber" size="large" onChange={handleOnChange} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Heading>Certificate of Registration Details at Council of Architecture</Heading>
                    <Row gutter="24" >
                        <Col span="8" >
                            <FormItem
                                label="Certificate Number"
                                name="CertificateNumber"
                                rules={[
                                    { required: true, message: 'Required' },
                                ]}
                            >
                                <Input name="CertificateNumber" maxLength={25} size="large" onChange={handleOnChange} />
                            </FormItem>
                        </Col>
                        <Col span="8" >
                            <FormItem
                                label="Valid From"
                                name="ValidFrom"
                                rules={[
                                    { required: true, message: 'Required' },
                                ]}
                            >
                                <DatePicker
                                    name="ValidFrom"
                                    size="large"
                                    onChange={(date, dateString) => handleOnChangeDateValid(date, dateString, "ValidFrom")}
                                    format="DD-MMM-YYYY"
                                    disabledDate={disabledValidFromDate}
                                    placeholder=""
                                    style={{ width: '100%' }}
                                />
                            </FormItem>
                        </Col>
                        <Col span="8" >
                            <FormItem
                                label="Valid Till"
                                name="ValidTill"
                                rules={[
                                    { required: true, message: 'Required' },
                                ]}
                            >
                                <DatePicker
                                    name="ValidTill"
                                    size="large"
                                    onChange={(date, dateString) => handleOnChangeDateValid(date, dateString, "ValidTill")}
                                    format="DD-MMM-YYYY"
                                    disabledDate={disabledValidTillDate}
                                    placeholder=""
                                    style={{ width: '100%' }}
                                />
                            </FormItem>
                        </Col>
                    </Row>
                    <Heading>Architect's Permanent Address</Heading>
                    <Row gutter="24" >
                        <Col span="24" >
                            <FormItem
                                label="Full Address"
                                name="PermanentAddress"
                                rules={[
                                    { required: true, message: 'Required' },
                                ]}
                            >
                                <Input name="PermanentAddress" maxLength={195} size="large" onChange={handleOnChange} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter="24" >
                        <Col span="8" >
                            <FormItem
                                label="State"
                                name="PermanentAddressState"
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
                                    name="PermanentAddressState"
                                    size="large" style={{ width: '100%' }}
                                    onSelect={(v) => handleOnChangeSelectState(v, 'PermanentAddressState', true)}
                                >
                                    {getStateListState.list.map(item => (<Option key={item.Id} value={item.Id}>{item.Name}</Option>))}
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="8" >
                            <FormItem
                                label="District"
                                name="PermanentAddressDistrict"
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
                                    name="PermanentAddressDistrict"
                                    size="large" style={{ width: '100%' }}
                                    onSelect={(v) => handleOnChangeSelect(v, 'PermanentAddressDistrict')}
                                >
                                    {districtList.permanentDistrict.map(item => (<Option key={item.Id} value={item.Id}>{item.Name}</Option>))}
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="8" >
                            <FormItem
                                label="Pincode"
                                name="PermanentAddressPin"
                                rules={[
                                    { required: true, message: 'Required' },
                                    {
                                        pattern: new RegExp("^[0-9]{6}$"),
                                        message: 'Enter valid Pincode.',
                                    }
                                ]}
                            >
                                <Input name="PermanentAddressPin" size="large" onChange={handleOnChange} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter="24" >
                        <Col span="24" >
                            <FormItem>
                                <Checkbox checked={checkSameAs} onChange={onSameAsChange}>Architect's official Address Same as Architect's Permanent Address</Checkbox>
                            </FormItem>
                        </Col>
                    </Row>
                    <div style={{ display: checkSameAs ? 'none' : 'block' }}>
                        <Heading>Architect's official Address</Heading>
                        <Row gutter="24" >
                            <Col span="24" >
                                <FormItem
                                    label="Full Address"
                                    name="CorrespondenceAddress"
                                    rules={[
                                        { required: !checkSameAs, message: 'Required' },
                                    ]}
                                >
                                    <Input name="CorrespondenceAddress" maxLength={195} size="large" onChange={handleOnChange} />
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter="24" >
                            <Col span="8" >
                                <FormItem
                                    label="State"
                                    name="CorrespondenceAddressState"
                                    rules={[
                                        { required: !checkSameAs, message: 'Required' },
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
                                        name="CorrespondenceAddressState"
                                        size="large"
                                        style={{ width: '100%' }}
                                        onSelect={(v) => handleOnChangeSelectState(v, 'CorrespondenceAddressState', false)}
                                    >
                                        {getStateListState.list.map(item => (<Option key={item.Id} value={item.Id}>{item.Name}</Option>))}
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span="8" >
                                <FormItem
                                    label="District"
                                    name="CorrespondenceAddressDistrict"
                                    rules={[
                                        { required: !checkSameAs, message: 'Required' },
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
                                        name="CorrespondenceAddressDistrict"
                                        size="large" style={{ width: '100%' }}
                                        onSelect={(v) => handleOnChangeSelect(v, 'CorrespondenceAddressDistrict')}
                                    >
                                        {districtList.correspondenceDistrict.map(item => (<Option key={item.Id} value={item.Id}>{item.Name}</Option>))}
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span="8" >
                                <FormItem
                                    label="Pincode"
                                    name="CorrespondenceAddressPin"
                                    rules={[
                                        { required: !checkSameAs, message: 'Required' },
                                        {
                                            pattern: new RegExp("^[0-9]{6}$"),
                                            message: 'Enter valid Pincode.',
                                        }
                                    ]}
                                >
                                    <Input name="CorrespondenceAddressPin" size="large" onChange={handleOnChange} />
                                </FormItem>
                            </Col>
                        </Row>


                    </div>

                    {getDocumentListState.apiState === "success" &&
                        <>
                            <Heading>Documents Required</Heading>
                            {getDocumentListState.list.map((item, idx) => (
                                <>
                                    <Row gutter="24" >
                                        <Col span="24" >
                                            <FileTitle>
                                                <span>{idx + 1}.</span>
                                                <div>
                                                    <ValidationDiv className={item.IsMandatory ? 'validate' : ''}>
                                                        {item.Name}
                                                    </ValidationDiv>
                                                    <div>
                                                        <span style={{ color: "red" }}>
                                                            (File must be in "{renderExtensions(item.Extensions)} format and less than {item.MaxSizeInKb}KB in size.")
                                                        </span>
                                                    </div>
                                                    {(item.IsPVerificationRequired || item.SampleFileURL) &&
                                                        <Space>
                                                            {item.SampleFileURL ? <Link to={{ pathname: item.SampleFileURL }} target="_blank" style={{ textDecoration: 'underline', color: '#006fc3' }}>Download Sample Document.</Link> : null}
                                                            {item.IsPVerificationRequired &&
                                                                <Alert
                                                                    message="Physical verification required."
                                                                    type="warning"
                                                                    style={{ padding: "0px 8px" }}
                                                                />
                                                            }
                                                        </Space>
                                                    }
                                                </div>
                                            </FileTitle>
                                        </Col>
                                        <Col span="24" >
                                            <Form.Item
                                                name={item.Name}
                                                getValueFromEvent={normFile}
                                                rules={[
                                                    { required: item.IsMandatory, message: 'Required' },
                                                ]}
                                                style={{ paddingLeft: 22 }}
                                            >

                                                <DocumentUpload
                                                    name={item.Name}
                                                    listType="picture-card"
                                                    onPreview={() => onPreview(_.find(defaultFileList, { 'documentTypeId': item.DocumentTypeId }))}
                                                    action={encodeURI(`${conf.api.base_url}DMS_DocumentService/UploadDocument?ApiKey=UploadDocument&OrgId=${OrgId}&ApplicationTypeId=${props.serviceId}&DocumentTypeId=${item.DocumentTypeId}&Documentname=${item.Name}&EntityTypeID=111&ApplicationId=${getDocumentListState.EntityId}&PhysicalVerificationRequired=${item.IsPVerificationRequired ? 1 : 0}`)}
                                                    headers={{
                                                        'AuthToken': verifyUpnAndMobileSubmitOtpState.AuthToken,
                                                        'AuthTokenKey': verifyUpnAndMobileSubmitOtpState.AuthTokenKey
                                                    }}
                                                    beforeUpload={file => {
                                                        setUploadLoading({
                                                            ...uploadLoading,
                                                            [idx]: true
                                                        })
                                                        setFiles({
                                                            ...files,
                                                            [idx]: file
                                                        })
                                                        setFileList(state => ({
                                                            ...fileList,
                                                            [idx]: []
                                                        }))
                                                        setSubmitDocumentStatus(true)
                                                        return true
                                                    }}
                                                    onRemove={file => {
                                                        const defaultFileLists = defaultFileList;
                                                        let DocumentTypeId = item.DocumentTypeId
                                                        fetch(`${conf.api.base_url}DMS_DocumentService/DeleteUploadedDocument?ApiKey=DeleteUploadedDocument&OrgId=${OrgId}&DocumentId=${documentFileId[idx]}`, {
                                                            method: 'post',
                                                            headers: {
                                                                'AuthToken': verifyUpnAndMobileSubmitOtpState.AuthToken,
                                                                'AuthTokenKey': verifyUpnAndMobileSubmitOtpState.AuthTokenKey
                                                            }
                                                        }).then(res => {
                                                            if (res.status === 200) {
                                                                let fileArr = []
                                                                defaultFileLists.forEach((defaultItem) => {
                                                                    if (defaultItem.documentTypeId !== DocumentTypeId) {
                                                                        fileArr.push(defaultItem)
                                                                    }
                                                                })
                                                                setDefaultFileList(fileArr)
                                                                setFileList(state => ({
                                                                    ...fileList,
                                                                    [idx]: []
                                                                }))
                                                            } else {
                                                                return null
                                                            }
                                                        }).catch(console.log)
                                                    }}
                                                    onError={(info) => {
                                                        setSubmitDocumentStatus(false)
                                                    }}
                                                    onSuccess={(response) => {
                                                        if (response.Status === 2) {

                                                            setDocumentFileId(state => ({
                                                                ...documentFileId,
                                                                [idx]: response.CustomObject.FileId
                                                            }))

                                                            let fileArr = []
                                                            const defaultFileLists = defaultFileList;
                                                            defaultFileLists.forEach((defaultItem) => {
                                                                fileArr.push(defaultItem)
                                                            })
                                                            let extension = files[idx].name.substr(files[idx].name.lastIndexOf(".") + 1)
                                                            let filePrependString = ""
                                                            if (extension === 'jpg' || extension === 'jpeg' || extension === 'png') {
                                                                filePrependString = `data:image/${extension};base64,${response.CustomObject.FileData}`
                                                            }
                                                            else {
                                                                filePrependString = `data:application/${extension};base64,${response.CustomObject.FileData}`
                                                            }
                                                            fileArr.push({
                                                                documentTypeId: item.DocumentTypeId,
                                                                uid: response.CustomObject.FileId,
                                                                name: files[idx].name,
                                                                status: 'done',
                                                                url: filePrependString,
                                                                thumbUrl: filePrependString,
                                                                preview: filePrependString,
                                                            })
                                                            setDefaultFileList(fileArr)
                                                            setFileList(state => ({
                                                                ...fileList,
                                                                [idx]: [{
                                                                    documentTypeId: item.DocumentTypeId,
                                                                    uid: response.CustomObject.FileId,
                                                                    name: files[idx].name,
                                                                    status: 'done',
                                                                    url: filePrependString,
                                                                    thumbUrl: filePrependString,
                                                                    preview: filePrependString,
                                                                }]
                                                            }))


                                                        }
                                                        if (response.Status === 1) {
                                                            notification["error"]({
                                                                message: response.Message,
                                                                placement: "bottomRight"
                                                            })
                                                        }
                                                        setUploadLoading({
                                                            ...uploadLoading,
                                                            [idx]: false
                                                        })
                                                        setSubmitDocumentStatus(false)
                                                    }}
                                                    defaultFileList={_.find(defaultFileList, { 'documentTypeId': item.DocumentTypeId }) ? [_.find(defaultFileList, { 'documentTypeId': item.DocumentTypeId })] : []}
                                                    fileList={fileList[idx]}
                                                    allowedFileTypes={item.Extensions}
                                                >
                                                    {_.find(defaultFileList, { 'documentTypeId': item.DocumentTypeId }) ? null : <Button icon={<UploadOutlined />}
                                                        loading={uploadLoading[idx]}
                                                    >Click to Upload</Button>
                                                    }
                                                </DocumentUpload>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </>
                            ))}

                        </>
                    }
                    <Modal
                        visible={previewVisible}
                        footer={null}
                        onCancel={handleCancel}
                    >
                        {currentFileType === 'pdf' ? (
                            <iframe
                                title="PDF"
                                className="scrolling"
                                scrolling="no"
                                frameBorder="0"
                                id="press"
                                src={previewImage}
                                width="100%"
                                height={630}
                            />
                        ) : (
                            <img alt="example" style={{ width: '100%' }} src={previewImage} />
                        )}
                    </Modal>
                    {(getAppointmentDateState.apiState === "success" && isPVerificationRequired) &&
                        <>
                            <Heading style={{ marginTop: 36 }}>Appointment Detail For Physical Verification of Documents</Heading>
                            <Row>
                                <Col span="10" >
                                    <FormItem
                                        name="AppointmentDate"
                                        label="Select Appointment Date"
                                        rules={[{ required: true, message: 'Required' }]}
                                    >
                                        <Select
                                            name="AppointmentDate"
                                            size="large"
                                            onSelect={(v) => handleOnChangeSelect(v, 'AppointmentDate')}
                                        >
                                            {getAppointmentDateState.data.map((item) => {
                                                return (
                                                    <Option key={item.AppointmentDate} value={item.AppointmentDate} >{item.AppointmentDate}</Option>
                                                )
                                            })}
                                        </Select>
                                    </FormItem>
                                </Col>
                            </Row>
                        </>
                    }


                    <BlankSpace />
                    <BlueButton htmlType="submit" >SUBMIT</BlueButton>
                    {/* {getDocumentListState.apiState === "success" &&
                        <BlueButton disabled={submitDocumentStatus} loading={(saveChangeOfOwnershipApplicationState.apiState === "loading" || saveNdcApplicationState.apiState === "loading") ? true : false} htmlType="submit" >SUBMIT</BlueButton>
                    } */}
                </Form>
            </Container>
        </>
    )
}

const mapStateToProps = (state) => ({
    getRegistrationCategoryState: state.getRegistrationCategory,
    getSalutationListState: state.getSalutationList,
    verifyUpnAndMobileSubmitOtpState: state.verifyUpnAndMobileSubmitOtp,
    getEntrepreneurDetailByPanState: state.getEntrepreneurDetailByPan,
    getStateListState: state.getStateList,
    getDistrictListState: state.getDistrictList,
    saveProfessionalServiceState: state.saveProfessionalService,
    getDocumentListState: state.getDocumentList,
    getAppointmentDateState: state.getAppointmentDate,
})

const mapDispatchToProps = (dispatch) => ({
    getRegistrationCategory: (params) => dispatch(getRegistrationCategory(params)),
    getRegistrationCategoryResetState: () => dispatch(getRegistrationCategoryResetState()),
    getSalutationList: (params) => dispatch(getSalutationList(params)),
    getEntrepreneurDetailByPan: (params) => dispatch(getEntrepreneurDetailByPan(params)),
    getStateList: (params) => dispatch(getStateList(params)),
    getStateListResetState: () => dispatch(getStateListResetState()),
    getDistrictList: (params) => dispatch(getDistrictList(params)),
    getDistrictListResetState: () => dispatch(getDistrictListResetState()),
    saveProfessionalService: (params) => dispatch(saveProfessionalService(params)),
    saveProfessionalServiceResetState: () => dispatch(saveProfessionalServiceResetState()),
    getDocumentList: (params) => dispatch(getDocumentList(params)),
    getDocumentListResetState: () => dispatch(getDocumentListResetState()),
    getAppointmentDate: (params) => dispatch(getAppointmentDate(params)),
    getAppointmentDateResetState: () => dispatch(getAppointmentDateResetState()),
})

export default connect(mapStateToProps, mapDispatchToProps)(EmpanellmentForm)