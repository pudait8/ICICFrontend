import React, { useEffect, useState } from "react"
import { Col, Form, Row, Upload, Button, notification, Input, DatePicker, Select, Checkbox, InputNumber, Alert, Space, Modal } from "antd"
import { connect } from "react-redux"
import { UploadOutlined } from '@ant-design/icons'

import moment from 'moment';
import _ from "lodash"

// components
import { Container, Heading, QualificationRadio } from './EstateAgentFormStyle'
import { FormItem, BlankSpace, BlueButton, DocumentUpload, ValidationDiv, FileTitle } from '../Xcomponents'

// actions
import { getNdcDetails, getNdcDetailsResetState } from '../../actions/getNdcDetailsAction'
import { getDocumentList, getDocumentListResetState } from '../../actions/getDocumentListAction'
import { getSalutationList } from '../../actions/getSalutationListActions'
import { getStateList, getStateListResetState } from '../../actions/getStateListAction'
import { getDistrictList, getDistrictListResetState } from '../../actions/getDistrictListAction'
import { savePermittingProfessionalService, savePermittingProfessionalServiceResetState } from "../../actions/savePermittingProfessionalServiceAction"
import { getConstitutionTypeList, getConstitutionTypeListResetState } from "../../actions/getConstitutionTypeListAction"
import { getAppointmentDate, getAppointmentDateResetState } from '../../actions/getAppointmentDateAction'

// others
import { getOrgId } from '../../utils'
import { Link, Redirect } from "react-router-dom"
import conf from "../../config"

const { Option } = Select

const EstateAgentForm = props => {
    // variables
    const {
        getServiceDetailState,
        verifyUpnAndMobileSubmitOtpState,
        getSalutationList, getSalutationListState,
        getStateList, getStateListState, getStateListResetState,
        getDistrictList, getDistrictListState, getDistrictListResetState,
        savePermittingProfessionalService, savePermittingProfessionalServiceState, savePermittingProfessionalServiceResetState,
        getConstitutionTypeList, getConstitutionTypeListState, getConstitutionTypeListResetState,
        getDocumentList, getDocumentListResetState, getDocumentListState,
        getAppointmentDate, getAppointmentDateState, getAppointmentDateResetState,
        verifyUpnAndMobileState,
        getNdcDetails, getNdcDetailsState, getNdcDetailsResetState,
    } = props
    const serviceId = props.serviceId
    const OrgId = getOrgId()
    let initialFormData = {
        Remark: "",
        ConstituationTypeId: "",
        ApplicationType: serviceId,
        PAN: "",
        Salutation: "Mr.",
        Name: "",
        MobileNumber: "",
        EmailAddress: "",
        Gender: "",
        MaritalStatusId: "",
        Dob: "",
        Gstno: "",
        AppointmentDate: "",
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
        Qualification: "",
        IsCorrespondenceAddressSame: false,
        hideIndividual: false,
    }
    const [form] = Form.useForm()
    const [formData, setFormData] = useState(initialFormData)
    const [fileList, setFileList] = useState([])
    const [uploadLoading, setUploadLoading] = useState([])
    const [files, setFiles] = useState([])
    const [isPVerificationRequired, setIsPVerificationRequired] = useState(false)
    const [documentFileId, setDocumentFileId] = useState([])

    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [currentFileType, setCurrentFileType] = useState(''); // Current file format
    const [submitDocumentStatus, setSubmitDocumentStatus] = useState(false); // Current file format
    const [defaultFileList, setDefaultFileList] = useState([])
    const [checkSameAs, setCheckSameAs] = useState(false)
    const [selectState, setSelectState] = useState(true)

    const [districtList, setDistrictList] = useState({
        permanentDistrict: [],
        correspondenceDistrict: [],
    })
    const [callDistrictPInitial, setCallDistrictPInitial] = useState(0)
    const [callDistrictCInitial, setCallDistrictCInitial] = useState(0)

    const [redirect, setRedirect] = useState([false, ""])
    const serviceName = props.serviceId === '28' ? 'Estate Agent' : props.serviceId === '29' ? 'Promoter' : "Plumber's"

    // callbacks
    useEffect(() => {
        getSalutationList({
            OrgId: OrgId,
            AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
            AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey
        })
        getStateList({
            OrgId: OrgId,
        })
        getConstitutionTypeList({
            OrgId: OrgId,
            AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
            AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey
        })
        getDocumentList({
            PropertyId: verifyUpnAndMobileSubmitOtpState.data.PropertyRefId,
            OrgId: OrgId,
            ApplicationTypeId: props.serviceId,
            AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
            AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey
        })
        if (props.IsRenewal === "Y") {
            getNdcDetails({
                OrgId: OrgId,
                ApplicationId: parseInt(verifyUpnAndMobileSubmitOtpState.data.ApplicationId),
                AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken ?? "",
                AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey ?? "",
                ArchitectToken: verifyUpnAndMobileSubmitOtpState.ArchitectToken ?? "",
                ArchitectTokenKey: verifyUpnAndMobileSubmitOtpState.ArchitectTokenKey ?? ""
            })
        }
        savePermittingProfessionalServiceResetState()
        return (() => {
            getDistrictListResetState()
            getStateListResetState()
            getConstitutionTypeListResetState()
            getDocumentListResetState()
            getAppointmentDateResetState()
            savePermittingProfessionalServiceResetState()
        })
    }, [])


    useEffect(() => {
        if (getNdcDetailsState.apiState === "success") {
            // getNdcDetailsState.apiState = ""
            let hideIndividual = false
            if (getNdcDetailsState.data.EntrepreneurDetails.ConstituationTypeId === 1638 || getNdcDetailsState.data.EntrepreneurDetails.ConstituationTypeId === 1639) {
                // Individual
                hideIndividual = false
            }
            else {
                hideIndividual = true
            }

            setFormData({
                ...formData,
                ['ConstituationTypeId']: getNdcDetailsState.data.EntrepreneurDetails.ConstituationTypeId,
                ['PAN']: getNdcDetailsState.data.EntrepreneurDetails.Pan,
                ['Salutation']: getNdcDetailsState.data.EntrepreneurDetails.Title,
                ['Name']: getNdcDetailsState.data.EntrepreneurDetails.FullName,
                ['MobileNumber']: getNdcDetailsState.data.EntrepreneurDetails.MobileNumber,
                ['EmailAddress']: getNdcDetailsState.data.EntrepreneurDetails.EmailAddress,
                ['Gender']: getNdcDetailsState.data.EntrepreneurDetails.Gender,
                ['MaritalStatusId']: getNdcDetailsState.data.EntrepreneurDetails.MaritalStatusId,
                ['Dob']: getNdcDetailsState.data.EntrepreneurDetails.Dob,
                ['FatherHusbandName']: getNdcDetailsState.data.EntrepreneurDetails.FatherName,
                ['AadhaarNumber']: getNdcDetailsState.data.EntrepreneurDetails.Aadhar,
                ['PermanentAddress']: getNdcDetailsState.data.EntrepreneurDetails.PeAddressLine1,
                ['PermanentAddressDistrict']: getNdcDetailsState.data.EntrepreneurDetails.PeDistrictId,
                ['PermanentAddressState']: getNdcDetailsState.data.EntrepreneurDetails.PeStateId,
                ['PermanentAddressPin']: getNdcDetailsState.data.EntrepreneurDetails.PePin,
                ['CorrespondenceAddress']: getNdcDetailsState.data.EntrepreneurDetails.CoAddressLine1,
                ['CorrespondenceAddressDistrict']: getNdcDetailsState.data.EntrepreneurDetails.CoDistrictId,
                ['CorrespondenceAddressState']: getNdcDetailsState.data.EntrepreneurDetails.CoStateId,
                ['CorrespondenceAddressPin']: getNdcDetailsState.data.EntrepreneurDetails.CoPin,
                ['hideIndividual']: getNdcDetailsState.data.EntrepreneurDetails.hideIndividual,
                ['Gstno']: getNdcDetailsState.data.EntrepreneurDetails.GstNo,
                ['Qualification']: getNdcDetailsState.data.EntrepreneurDetails.Qualification,

            })
            form.setFieldsValue({
                ConstituationTypeId: getNdcDetailsState.data.EntrepreneurDetails.ConstituationTypeName,
                PAN: getNdcDetailsState.data.EntrepreneurDetails.Pan,
                Salutation: getNdcDetailsState.data.EntrepreneurDetails.Title,
                Name: getNdcDetailsState.data.EntrepreneurDetails.FullName,
                MobileNumber: getNdcDetailsState.data.EntrepreneurDetails.MobileNumber,
                EmailAddress: getNdcDetailsState.data.EntrepreneurDetails.EmailAddress,
                Gender: getNdcDetailsState.data.EntrepreneurDetails.Gender,
                MaritalStatusId: getNdcDetailsState.data.EntrepreneurDetails.MaritalStatus,
                Dob: getNdcDetailsState.data.EntrepreneurDetails.Dob ? moment(getNdcDetailsState.data.EntrepreneurDetails.Dob) : "",
                FatherHusbandName: getNdcDetailsState.data.EntrepreneurDetails.FatherName,
                AadhaarNumber: getNdcDetailsState.data.EntrepreneurDetails.Aadhar,
                PermanentAddress: getNdcDetailsState.data.EntrepreneurDetails.PeAddressLine1,
                PermanentAddressDistrict: getNdcDetailsState.data.EntrepreneurDetails.PeDistrict,
                PermanentAddressState: getNdcDetailsState.data.EntrepreneurDetails.PeState,
                PermanentAddressPin: getNdcDetailsState.data.EntrepreneurDetails.PePin,
                CorrespondenceAddress: getNdcDetailsState.data.EntrepreneurDetails.CoAddressLine1,
                CorrespondenceAddressDistrict: getNdcDetailsState.data.EntrepreneurDetails.CoDistrict,
                CorrespondenceAddressState: getNdcDetailsState.data.EntrepreneurDetails.CoState,
                CorrespondenceAddressPin: getNdcDetailsState.data.EntrepreneurDetails.CoPin,
                Gstno: getNdcDetailsState.data.EntrepreneurDetails.GstNo,
                Qualification: getNdcDetailsState.data.EntrepreneurDetails.Qualification,
            })

        }
    }, [getNdcDetailsState])

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
        if (getNdcDetailsState.apiState === "success") {
            if (callDistrictPInitial === 0) {
                setSelectState(true)
                getDistrictList({
                    OrgId: OrgId,
                    StateId: getNdcDetailsState.data.EntrepreneurDetails.PeStateId
                })
            }
            else if (callDistrictCInitial === 0 && callDistrictPInitial === 1) {
                setSelectState(false)
                getDistrictList({
                    OrgId: OrgId,
                    StateId: getNdcDetailsState.data.EntrepreneurDetails.CoStateId
                })
            }
        }
    }, [callDistrictPInitial, callDistrictCInitial, getNdcDetailsState])

    useEffect(() => {
        if (props.IsRenewal === "Y") {
            if (getDistrictListState.apiState === "success") {
                if (selectState) {
                    setDistrictList({ ...districtList, ['permanentDistrict']: getDistrictListState.list })
                    if (callDistrictPInitial === 1) {
                        setFormData({ ...formData, ['PermanentAddressDistrict']: "" })
                        form.setFieldsValue({
                            PermanentAddressDistrict: null,
                        })
                    }
                    else {
                        form.setFieldsValue({
                            PermanentAddressDistrict: getNdcDetailsState.data.EntrepreneurDetails.PeDistrict,
                        })
                        setCallDistrictPInitial(1)
                    }
                }
                else {
                    setDistrictList({ ...districtList, ['correspondenceDistrict']: getDistrictListState.list })
                    if (callDistrictCInitial === 1) {
                        setFormData({ ...formData, ['CorrespondenceAddressDistrict']: "" })
                        form.setFieldsValue({
                            CorrespondenceAddressDistrict: null,
                        })
                    }
                    else {
                        form.setFieldsValue({
                            CorrespondenceAddressDistrict: getNdcDetailsState.data.EntrepreneurDetails.CoDistrict,
                        })
                        setCallDistrictCInitial(1)
                    }
                }
            }
            else if (getDistrictListState.apiState === "alert" && getDistrictListState.apiState === "error") {
                if (selectState) {
                    setDistrictList({ ...districtList, ['permanentDistrict']: [] })
                    setFormData({ ...formData, ['PermanentAddressDistrict']: "" })
                    form.setFieldsValue({
                        PermanentAddressDistrict: null,
                    })
                    setCallDistrictPInitial(1)
                }
                else {
                    setDistrictList({ ...districtList, ['correspondenceDistrict']: [] })
                    setFormData({ ...formData, ['CorrespondenceAddressDistrict']: "" })
                    form.setFieldsValue({
                        CorrespondenceAddressDistrict: null,
                    })
                    setCallDistrictCInitial(1)
                }
            }
        }
        else {
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
        }
    }, [getDistrictListState])

    useEffect(() => {
        if (checkSameAs) {
            form.validateFields(['CorrespondenceAddress', 'CorrespondenceAddressState', 'CorrespondenceAddressDistrict', 'CorrespondenceAddressPin'])
        }
    }, [checkSameAs])


    useEffect(() => {
        if (savePermittingProfessionalServiceState.apiState === "alert") {
            notification["error"]({
                message: savePermittingProfessionalServiceState.apiMessage,
                placement: "bottomRight"
            })
            savePermittingProfessionalServiceResetState()
        }

        if (savePermittingProfessionalServiceState.apiState === "success") {
            getNdcDetailsState.apiState = ""
            notification["success"]({
                message: savePermittingProfessionalServiceState.apiMessage,
                placement: "bottomRight"
            })
            verifyUpnAndMobileSubmitOtpState.submitApplication = true
            setRedirect([true, "/ndc-details/" + savePermittingProfessionalServiceState.data.ApplicationId])
        }
    }, [savePermittingProfessionalServiceState])



    // functions
    const handleOnChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = () => {

        savePermittingProfessionalService({
            ApplicationType: props.serviceId,
            PropertyRefId: 0,
            Remark: formData.Remark,
            TemporaryApplicationId: getDocumentListState.EntityId,
            ConstituationTypeId: formData.ConstituationTypeId,
            GPASPA: "N",
            OwnerId: 0,
            OrgId: OrgId,
            AppointmentDate: formData.AppointmentDate,
            PAN: verifyUpnAndMobileState.data.UPN,
            PreRegNo: "",
            Salutation: formData.Salutation,
            Name: formData.Name,
            FatherHusbandName: formData.FatherHusbandName,
            Gender: formData.Gender,
            MaritalStatusId: formData.MaritalStatusId,
            Dob: formData.Dob,
            Gstno: formData.Gstno,
            AadhaarNumber: formData.AadhaarNumber,
            MobileNumber: formData.MobileNumber,
            EmailAddress: formData.EmailAddress,
            ServiceCategory: "",
            ProfessionalDetail: "",
            VisitorDetails: "",
            WorkingHours: "",
            Floor: "",
            TotalArea: "",
            Qualification: formData.Qualification,
            PermanentAddress: formData.PermanentAddress,
            PermanentAddressState: formData.PermanentAddressState,
            PermanentAddressDistrict: formData.PermanentAddressDistrict,
            PermanentAddressPin: formData.PermanentAddressPin,
            CorrespondenceAddress: checkSameAs ? formData.PermanentAddress : formData.CorrespondenceAddress,
            CorrespondenceAddressState: checkSameAs ? formData.PermanentAddressState : formData.CorrespondenceAddressState,
            CorrespondenceAddressDistrict: checkSameAs ? formData.PermanentAddressDistrict : formData.CorrespondenceAddressDistrict,
            CorrespondenceAddressPin: checkSameAs ? formData.PermanentAddressPin : formData.CorrespondenceAddressPin,
            IsRenewal: props.IsRenewal,
            AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
            AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey
        })

    }

    const disabledDate = (current) => {
        var tillDate = moment().subtract(13, 'years')
        return !(tillDate.isAfter(current));
    }


    const handleOnChangeDate = (date, dateString, name) => {
        setFormData({ ...formData, [name]: dateString })
    }

    const handleOnChangeSelect = (value, name) => {
        if ("ConstituationTypeId" === name) {
            if (value === 1638 || value === 1639) {
                // Individual
                setFormData({
                    ...formData,
                    [name]: value,
                    ['hideIndividual']: false,
                    ['Gstno']: "",
                    ['Name']: "",
                    ['Salutation']: "",
                })
                form.setFieldsValue({
                    Gstno: "",
                    Name: "",
                    Salutation: null
                })
            }
            else {
                //Company
                setFormData({
                    ...formData,
                    [name]: value,
                    ['hideIndividual']: true,
                    ['Name']: "",
                    ['FatherHusbandName']: "",
                    ['Gender']: "",
                    ['MaritalStatusId']: "",
                    ['Dob']: "",
                    ['AadhaarNumber']: "",
                    ['Salutation']: "",
                })
                form.setFieldsValue({
                    Name: "",
                    FatherHusbandName: "",
                    Gender: null,
                    MaritalStatusId: null,
                    Dob: "",
                    AadhaarNumber: "",
                    Salutation: null
                })
            }
        }
        else {
            setFormData({ ...formData, [name]: value })
        }
    }

    const handleOnChangeSelectState = (value, name, status) => {
        setFormData({ ...formData, [name]: value })
        setSelectState(status)
        getDistrictList({
            OrgId: OrgId,
            StateId: value
        })
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

    const onSameAsChange = (e) => {
        setCheckSameAs(e.target.checked)
    }

    const createMarkup = (processContent) => {
        return { __html: processContent };
    }

    const renderExtensions = (extension) => {
        let extensionData = []
        extension.map((data) => {
            let a = "." + _.split(data, "/")[1]
            extensionData.push(a)
        })
        return extensionData.join(", ")
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
                    {(props.serviceId === "1721" || props.serviceId === "1726") ?
                        <>
                        </>
                        :
                        <>
                            <Heading>Applicant Details</Heading>
                            <Row gutter="24" >

                                <Col span="8" >
                                    <FormItem
                                        label="Status of The Applicant"
                                        name="ConstituationTypeId"
                                        rules={[{
                                            required: true,
                                            message: 'Required'
                                        }]}
                                    >
                                        <Select
                                            name="ConstituationTypeId"
                                            disabled={props.IsRenewal === "Y"}
                                            onSelect={(v) => handleOnChangeSelect(v, "ConstituationTypeId")}
                                            size="large"
                                        >
                                            {getConstitutionTypeListState.list.map(item => (<Option key={item.Id} value={item.Id}>{item.Name}</Option>))}
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span="14" >
                                    <FormItem
                                        label="Remark"
                                        name="Remark"
                                    >
                                        <Input size="large" name="Remark" onChange={handleOnChange} showCount maxLength={200} />
                                    </FormItem>
                                </Col>
                            </Row>
                        </>
                    }
                    <Heading>{serviceName} Personal Details</Heading>
                    <Row gutter="24" >
                        <Col span="8" >
                            <FormItem
                                name="Salutation"
                                label={"Salutation"}
                                rules={[{ required: true, message: 'Required' }]}
                            >
                                <Select name="Salutation" disabled={props.IsRenewal === "Y"} size="large" style={{ width: '100%' }} onSelect={(v) => handleOnChangeSelect(v, 'Salutation')} >
                                    {getSalutationListState.list.map(item => (
                                        <>
                                            {(formData.ConstituationTypeId === 1638 || formData.ConstituationTypeId === 1639 || props.serviceId === "1721" || props.serviceId === "1726") ?
                                                <>
                                                    {item.NameRegional === "I" &&
                                                        <Option key={item.Id} value={item.Name}>{item.Name}</Option>
                                                    }
                                                </>
                                                :
                                                <>
                                                    {item.NameRegional === "NI" &&
                                                        <Option key={item.Id} value={item.Name}>{item.Name}</Option>
                                                    }
                                                </>
                                            }
                                        </>

                                    ))}

                                </Select>
                            </FormItem>
                        </Col>
                        {(formData.ConstituationTypeId === 1638 || formData.ConstituationTypeId === 1639 || props.serviceId === "1721" || props.serviceId === "1726") ?

                            <>
                                <Col span="8" >
                                    <FormItem
                                        label="Full Name"
                                        name="Name"
                                        rules={[{
                                            required: true,
                                            message: 'Required'
                                        }]}
                                    >
                                        <Input name="Name" maxLength={50} disabled={props.IsRenewal === "Y"} size="large" onChange={handleOnChange} />
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
                                        <Input name="FatherHusbandName" maxLength={50} disabled={props.IsRenewal === "Y"} size="large" onChange={handleOnChange} />
                                    </FormItem>
                                </Col>
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
                                            disabled={props.IsRenewal === "Y"}
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
                                        name="MaritalStatusId"
                                        rules={[{
                                            required: true,
                                            message: 'Required'
                                        }]}
                                    >
                                        <Select
                                            name="MaritalStatusId"
                                            onSelect={(v) => handleOnChangeSelect(v, "MaritalStatusId")}
                                            size="large"
                                            disabled={props.IsRenewal === "Y"}
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
                                        name="Dob"
                                        rules={[{
                                            required: true,
                                            message: 'Required'
                                        }]}
                                    >
                                        <DatePicker
                                            disabled={props.IsRenewal === "Y"}
                                            name="Dob"
                                            size="large"
                                            onChange={(date, dateString) => handleOnChangeDate(date, dateString, "Dob")}
                                            format="DD-MMM-YYYY"
                                            disabledDate={disabledDate}
                                            placeholder=""
                                            style={{ width: '100%' }}
                                        />
                                    </FormItem>
                                </Col>

                                <Col span="8" >
                                    <FormItem
                                        label="UID/Aadhaar Number"
                                        name="AadhaarNumber"
                                        rules={[
                                            { required: true, message: 'Required' },
                                            { pattern: '^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$', message: 'Aadhaar number is not valid' }
                                        ]}
                                    >
                                        <Input name="AadhaarNumber" disabled={props.IsRenewal === "Y"} size="large" onChange={handleOnChange} />
                                    </FormItem>
                                </Col>
                            </>
                            :
                            <>
                                <Col span="8" >
                                    <FormItem
                                        label="Firm Name"
                                        name="Name"
                                        rules={[{
                                            required: true,
                                            message: 'Required'
                                        }]}
                                    >
                                        <Input name="Name" maxLength={70} disabled={props.IsRenewal === "Y"} size="large" onChange={handleOnChange} />
                                    </FormItem>
                                </Col>
                                <Col span="8" >
                                    <FormItem
                                        label="GST Number"
                                        name="Gstno"
                                        rules={[
                                            { required: true, message: 'Required' },
                                            {
                                                pattern: new RegExp("^[0-9]{2}[A-Z]{3}[ABCFGHLJPTF]{1}[A-Z]{1}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}"),
                                                message: 'Enter valid GST Number.',
                                            }
                                        ]}
                                    >
                                        <Input name="Gstno" disabled={props.IsRenewal === "Y"} size="large" onChange={handleOnChange} />
                                    </FormItem>
                                </Col>
                            </>
                        }



                        <Col span="8" >
                            <FormItem
                                label="Email Address"
                                name="EmailAddress"
                                rules={[
                                    { required: true, message: 'Required' },
                                    { type: 'email', message: 'Email is not valid' },
                                ]}
                            >
                                <Input name="EmailAddress" disabled={props.IsRenewal === "Y"} size="large" onChange={handleOnChange} />
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
                                <Input name="MobileNumber" disabled={props.IsRenewal === "Y"} size="large" onChange={handleOnChange} />
                            </FormItem>
                        </Col>
                    </Row>
                    {(props.serviceId === "1721" || props.serviceId === "1726") &&
                        <>
                            <Heading>Qualification and Experience Details:</Heading>
                            <Col span="24" >
                                <FormItem
                                    label="Please select any one of the below mentioned qualification"
                                    name="Qualification"
                                    rules={[
                                        { required: true, message: 'Required' }
                                    ]}
                                >
                                    <QualificationRadio.Group name="Qualification" size="large" onChange={handleOnChange}>
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
                                name="PermanentAddress"
                                rules={[
                                    { required: true, message: 'Required' },
                                ]}
                            >
                                <Input maxLength={100} name="PermanentAddress" size="large" onChange={handleOnChange} />
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
                                <Checkbox checked={checkSameAs} onChange={onSameAsChange}>{serviceName} Correspondence Address Same as {serviceName} Permanent Address</Checkbox>
                            </FormItem>
                        </Col>
                    </Row>
                    <div style={{ display: checkSameAs ? 'none' : 'block' }}>
                        <Heading>{serviceName} Correspondence Address</Heading>
                        <Row gutter="24" >
                            <Col span="24" >
                                <FormItem
                                    label="Full Address"
                                    name="CorrespondenceAddress"
                                    rules={[
                                        { required: !checkSameAs, message: 'Required' },
                                    ]}
                                >
                                    <Input maxLength={100} name="CorrespondenceAddress" size="large" onChange={handleOnChange} />
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
                    {getServiceDetailState.data.Declaration !== null &&
                        <Row>
                            <Col span="24" >
                                <FormItem
                                    name="declaration"
                                    valuePropName="checked"
                                    rules={[
                                        {
                                            validator: (_, value) =>
                                                value ? Promise.resolve() : Promise.reject(new Error('Please accept declaration before submitting application.')),
                                        },
                                    ]}

                                >
                                    <label style={{ display: "flex" }} >
                                        <Checkbox />
                                        <div style={{ marginLeft: 8 }} dangerouslySetInnerHTML={createMarkup(getServiceDetailState.data.Declaration)} />
                                    </label>
                                </FormItem>
                            </Col>
                        </Row>
                    }

                    <BlankSpace />
                    {getDocumentListState.apiState === "success" &&
                        <BlueButton disabled={submitDocumentStatus} loading={(savePermittingProfessionalServiceState.apiState === "loading") ? true : false} htmlType="submit" >SUBMIT</BlueButton>
                    }
                </Form>
            </Container>
        </>
    )
}

const mapStateToProps = (state) => ({
    getServiceDetailState: state.getServiceDetail,
    getSalutationListState: state.getSalutationList,
    verifyUpnAndMobileSubmitOtpState: state.verifyUpnAndMobileSubmitOtp,
    getStateListState: state.getStateList,
    getDistrictListState: state.getDistrictList,
    savePermittingProfessionalServiceState: state.savePermittingProfessionalService,
    getConstitutionTypeListState: state.getConstitutionTypeList,
    getDocumentListState: state.getDocumentList,
    getAppointmentDateState: state.getAppointmentDate,
    verifyUpnAndMobileState: state.verifyUpnAndMobile,
    getNdcDetailsState: state.getNdcDetails,
})

const mapDispatchToProps = (dispatch) => ({
    getSalutationList: (params) => dispatch(getSalutationList(params)),
    getStateList: (params) => dispatch(getStateList(params)),
    getStateListResetState: () => dispatch(getStateListResetState()),
    getDistrictList: (params) => dispatch(getDistrictList(params)),
    getDistrictListResetState: () => dispatch(getDistrictListResetState()),
    savePermittingProfessionalService: (params) => dispatch(savePermittingProfessionalService(params)),
    savePermittingProfessionalServiceResetState: () => dispatch(savePermittingProfessionalServiceResetState()),
    getConstitutionTypeList: (params) => dispatch(getConstitutionTypeList(params)),
    getConstitutionTypeListResetState: () => dispatch(getConstitutionTypeListResetState()),
    getDocumentList: (params) => dispatch(getDocumentList(params)),
    getDocumentListResetState: () => dispatch(getDocumentListResetState()),
    getAppointmentDate: (params) => dispatch(getAppointmentDate(params)),
    getAppointmentDateResetState: () => dispatch(getAppointmentDateResetState()),
    getNdcDetails: (params) => dispatch(getNdcDetails(params)),
    getNdcDetailsResetState: () => dispatch(getNdcDetailsResetState()),
})

export default connect(mapStateToProps, mapDispatchToProps)(EstateAgentForm)