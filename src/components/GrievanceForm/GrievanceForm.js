import React, { useEffect, useState } from "react"
import { Col, Form, Row, Upload, Button, notification, Input, Select, Checkbox, InputNumber, Alert, Space, Modal, message } from "antd"
import { connect } from "react-redux"
import { UploadOutlined } from '@ant-design/icons'

import moment from 'moment';
import _ from "lodash"

// components
import { Container, Heading, GrievanceTextarea } from './GrievanceFormStyle'
import { FormItem, BlankSpace, BlueButton, DocumentUpload, ValidationDiv, FileTitle } from '../Xcomponents'

// actions
import { getDocumentList, getDocumentListResetState } from '../../actions/getDocumentListAction'
import { getStateList, getStateListResetState } from '../../actions/getStateListAction'
import { getGrievancePertainsToList, getGrievancePertainsToListResetState } from '../../actions/getGrievancePertainsToListAction'
import { getActiveServicesList, getActiveServicesListResetState } from '../../actions/getActiveServicesListAction'
import { getApplListByMobileNo, getApplListByMobileNoResetState } from '../../actions/getApplListByMobileNoAction'
import { saveGrievance, saveGrievanceResetState } from "../../actions/saveGrievanceAction"
import { getDistrictList, getDistrictListResetState } from '../../actions/getDistrictListAction'
import { getGrievanceDeptList, getGrievanceDeptListResetState } from '../../actions/getGrievanceDeptListAction'
import { getGrievanceDesgList, getGrievanceDesgListResetState } from '../../actions/getGrievanceDesgListAction'

// others
import { Link, Redirect } from "react-router-dom"
import conf from "../../config"

const { Option } = Select

const GrievanceForm = props => {
    // variables
    const {
        getServiceDetailState,
        verifyUpnAndMobileSubmitOtpState,
        getStateList, getStateListState, getStateListResetState,
        saveGrievance, saveGrievanceState, saveGrievanceResetState,
        getDocumentList, getDocumentListResetState, getDocumentListState,
        getGrievancePertainsToList, getGrievancePertainsToListResetState, getGrievancePertainsToListState,
        getActiveServicesList, getActiveServicesListResetState, getActiveServicesListState,
        getApplListByMobileNo, getApplListByMobileNoResetState, getApplListByMobileNoState,
        verifyUpnAndMobileState,
        getDistrictList, getDistrictListState, getDistrictListResetState,
        getGrievanceDeptList, getGrievanceDeptListState, getGrievanceDeptListResetState,
        getGrievanceDesgList, getGrievanceDesgListState, getGrievanceDesgListResetState,
    } = props
    const OrgId = props.OrgId
    let initialFormData = {
        FullName: "",
        EmailAddress: "",
        Gender: "",
        AddressLine1: "",
        AddressLine2: "",
        TemporaryApplicationId: 0,
        State: "",
        City: "",
        PIN: "",
        ApplicationTypeId: "",
        GrievanceDescription: "",
        GrievanceTypeId: "",
        GrievanceSource: "CP",
        OrgId: OrgId,
        AssistanceRequired: "N",
        OtpTransactionNumber: verifyUpnAndMobileState.data.TransactionNumber,
        MobileNumber: verifyUpnAndMobileState.data.MobileNumber,
        RefApplicationId: "",
        AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
        AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey
    }
    const [form] = Form.useForm()
    const [formData, setFormData] = useState(initialFormData)
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
        saveGrievanceResetState()
        return (() => {
            getStateListResetState()
            getDocumentListResetState()
            getGrievancePertainsToListResetState()
            getActiveServicesListResetState()
            getApplListByMobileNoResetState()
            saveGrievanceResetState()
            getDistrictListResetState()

        })
    }, [])
    useEffect(() => {
        getStateList({
            OrgId: OrgId,
        })
        getGrievancePertainsToList({
            OrgId: OrgId,
            AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
            AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey
        })
        getActiveServicesList({
            OrgId: OrgId,
            AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
            AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey
        })

        getDocumentList({
            PropertyId: verifyUpnAndMobileSubmitOtpState.data.PropertyRefId,
            OrgId: OrgId,
            ApplicationTypeId: 0,
            AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
            AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey
        })
        setFormData({ ...formData, ["OrgId"]: OrgId })
    }, [props.OrgId])



    // useEffect(() => {
    //     if (getDocumentListState.apiState === "success") {
    //         setFormData({ ...formData, ["TemporaryApplicationId"]: getDocumentListState.EntityId, })
    //     }
    // }, [getDocumentListState])


    useEffect(() => {
        if (saveGrievanceState.apiState === "alert") {
            notification["error"]({
                message: saveGrievanceState.apiMessage,
                placement: "bottomRight"
            })
            saveGrievanceResetState()
        }

        if (saveGrievanceState.apiState === "success") {
            notification["success"]({
                message: saveGrievanceState.apiMessage,
                placement: "bottomRight"
            })
            setRedirect([true, "/grievance-details/" + OrgId + "/" + saveGrievanceState.data.GrievanceNo])
        }
    }, [saveGrievanceState])

    useEffect(() => {
        if (getDistrictListState.apiState === "success") {
            setFormData({
                ...formData,
                ["City"]: ""
            })
            form.setFieldsValue({
                City: "",
            })
        }

    }, [getDistrictListState])

    // functions
    const handleOnChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = () => {

        saveGrievance(formData)

    }

    const handleOnChangeDeptDesgSelect = (value, name) => {
        setFormData({ ...formData, [name]: value })
    }
    const handleOnChangeSelect = (value, name) => {
        if (name === "GrievanceTypeId") {
            if (value === 19) {
                getGrievanceDeptList({
                    OrgId: OrgId,
                    AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
                    AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey
                })
                getGrievanceDesgList({
                    OrgId: OrgId,
                    AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
                    AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey
                })
            }
            form.setFieldsValue({
                RefApplicationId: null,
                ApplicationTypeId: null,
            })
            setFormData({ ...formData, [name]: value, ["RefApplicationId"]: 0, ["ApplicationTypeId"]: 0 })
        }
        else {
            if (name === "ApplicationTypeId") {
                getApplListByMobileNoResetState()
                getApplListByMobileNo({
                    OrgId: OrgId,
                    MobileNumber: formData.MobileNumber,
                    ApplicationTypeId: value,
                    AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
                    AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey
                })
                setFormData({ ...formData, [name]: value, ["RefApplicationId"]: "" })
                form.setFieldsValue({
                    RefApplicationId: null
                })
            }
            else {
                setFormData({ ...formData, [name]: value })
            }
        }
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

    const handleOnChangeCheck = (e, name) => {
        if (e.target.checked) {
            setFormData({ ...formData, [name]: "Y" })
        }
        else {
            setFormData({ ...formData, [name]: "N" })
        }
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

                    <Heading>Complainant's Details</Heading>
                    <Row gutter="24" >
                        <>
                            <Col span="8" >
                                <FormItem
                                    label="Full Name"
                                    name="FullName"
                                    rules={[{
                                        required: true,
                                        message: 'Required'
                                    }]}
                                >
                                    <Input name="FullName" maxLength={45} size="large" onChange={handleOnChange} />
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

                                    >
                                        <Option key={"Male"} value={"Male"}>Male</Option>
                                        <Option key={"Female"} value={"Female"}>Female</Option>
                                        <Option key={"UnSpecified"} value={"UnSpecified"}>UnSpecified</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span="8" >
                                <FormItem
                                    label="Email ID"
                                    name="EmailAddress"
                                    rules={[
                                        { required: true, message: 'Required' },
                                        { type: 'email', message: 'Email is not valid' },
                                    ]}
                                >
                                    <Input name="EmailAddress" maxLength={45} size="large" onChange={handleOnChange} />
                                </FormItem>
                            </Col>

                        </>
                    </Row>

                    <Row gutter="24" >
                        <Col span="24" >
                            <FormItem
                                label="Address Line 1"
                                name="AddressLine1"
                                rules={[
                                    { required: true, message: 'Required' },
                                ]}
                            >
                                <Input name="AddressLine1" maxLength={50} size="large" onChange={handleOnChange} />
                            </FormItem>
                        </Col>
                        <Col span="24" >
                            <FormItem
                                label="Address Line 2"
                                name="AddressLine2"
                                rules={[
                                    { required: true, message: 'Required' },
                                ]}
                            >
                                <Input name="AddressLine2" size="large" maxLength={50} onChange={handleOnChange} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter="24" >
                        <Col span="8" >
                            <FormItem
                                label="State"
                                name="State"
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
                                    name="State"
                                    size="large" style={{ width: '100%' }}
                                    onSelect={(v, a) => [getDistrictList({
                                        OrgId: OrgId,
                                        StateId: +a.key
                                    }),
                                    handleOnChangeSelect(v, 'State')]}
                                >
                                    {getStateListState.list.map(item => (<Option key={item.Id} value={item.Name}>{item.Name}</Option>))}
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="8" >
                            <FormItem
                                label="City"
                                name="City"
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
                                    name="City"
                                    size="large" style={{ width: '100%' }}
                                    onSelect={(v) => handleOnChangeSelect(v, 'City')}
                                >
                                    {getDistrictListState.list.map(item => (<Option key={item.Id} value={item.Name}>{item.Name}</Option>))}
                                </Select>
                            </FormItem>
                        </Col>

                        <Col span="8" >
                            <FormItem
                                label="Pincode"
                                name="PIN"
                                rules={[
                                    { required: true, message: 'Required' },
                                    {
                                        pattern: new RegExp("^[0-9]{6}$"),
                                        message: 'Enter valid PIN.',
                                    }
                                ]}
                            >
                                <Input name="PIN" size="large" onChange={handleOnChange} />
                            </FormItem>
                        </Col>
                    </Row>

                    <Heading>Grievance Details</Heading>
                    <Row gutter="24" >
                        <Col span="8" >
                            <FormItem
                                label="Grievance Pertaining to"
                                name="GrievanceTypeId"
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
                                    name="GrievanceTypeId"
                                    size="large" style={{ width: '100%' }}
                                    onSelect={(v) => handleOnChangeSelect(v, 'GrievanceTypeId')}
                                >
                                    {getGrievancePertainsToListState.list.map(item => (<Option key={item.Id} value={item.Id}>{item.Name}</Option>))}
                                </Select>
                            </FormItem>
                        </Col>
                        {formData.GrievanceTypeId === 19 ?
                            <>
                                <Col span="8" >
                                    <FormItem
                                        label="Select Department"
                                        name="ApplicationTypeId"
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
                                            name="ApplicationTypeId"
                                            size="large" style={{ width: '100%' }}
                                            onSelect={(v) => handleOnChangeDeptDesgSelect(v, 'ApplicationTypeId')}
                                        >
                                            {getGrievanceDeptListState.list.map(item => (<Option key={item.Id} value={item.Id}>{item.Name}</Option>))}
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span="8" >
                                    <FormItem
                                        label="Select Designation"
                                        name="RefApplicationId"
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
                                            name="RefApplicationId"
                                            size="large" style={{ width: '100%' }}
                                            onSelect={(v) => handleOnChangeDeptDesgSelect(v, 'RefApplicationId')}
                                        >
                                            {getGrievanceDesgListState.list.map(item => (<Option key={item.Id} value={item.Id}>{item.Name}</Option>))}
                                        </Select>
                                    </FormItem>
                                </Col>
                            </>
                            :
                            <>
                                <Col span="8" >
                                    <FormItem
                                        label="Select Service"
                                        name="ApplicationTypeId"
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
                                            name="ApplicationTypeId"
                                            size="large" style={{ width: '100%' }}
                                            onSelect={(v) => handleOnChangeSelect(v, 'ApplicationTypeId')}
                                        >
                                            {getActiveServicesListState.list.map(item => (<Option key={item.Id} value={item.Id}>{item.Name}</Option>))}
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span="8" >
                                    <FormItem
                                        label="Application Number"
                                        name="RefApplicationId"
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
                                            name="RefApplicationId"
                                            size="large" style={{ width: '100%' }}
                                            onSelect={(v) => handleOnChangeSelect(v, 'RefApplicationId')}
                                        >
                                            {getApplListByMobileNoState.list.map(item => (<Option key={item.ApplicationNo} value={item.ApplicationNo}>{item.ApplicationNo}</Option>))}
                                        </Select>
                                    </FormItem>
                                </Col>
                            </>
                        }

                    </Row>
                    <Row gutter="24" >
                        <Col span="24" >
                            <FormItem
                                label="Please Enter Grievance Description upto 1500 characters"
                                name="GrievanceDescription"
                                rules={[
                                    { required: true, message: 'Required' },
                                ]}
                            >
                                <GrievanceTextarea showCount={true} maxLength={1500} name="GrievanceDescription" size="large" onChange={handleOnChange} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Heading>Documents Required</Heading>
                    {getDocumentListState.apiState === "success" &&
                        <>
                            <Row gutter="24" >
                                <Col span="24" >
                                    <FileTitle>
                                        <span>1.</span>
                                        <div>
                                            <ValidationDiv className={''}>
                                                Upload relevant document <span style={{ color: "red" }}>(File must be in ".jpeg/.jpg/.png/.pdf format and less than 2048KB in size")</span>
                                            </ValidationDiv>
                                        </div>
                                    </FileTitle>
                                </Col>
                                <Col span="24" >
                                    <Form.Item
                                        name="Upload relevant document"
                                        getValueFromEvent={normFile}
                                        rules={[
                                            { required: false, message: 'Required' },
                                        ]}
                                        style={{ paddingLeft: 22 }}
                                    >

                                        <DocumentUpload
                                            name="Upload relevant document"
                                            listType="picture-card"
                                            onPreview={() => onPreview(_.find(defaultFileList, { 'documentTypeId': 1500 }))}
                                            action={encodeURI(`${conf.api.base_url}DMS_DocumentService/UploadDocument?ApiKey=UploadDocument&OrgId=${OrgId}&ApplicationTypeId=0&DocumentTypeId=1500&Documentname=Upload relevant document&EntityTypeID=150&ApplicationId=${getDocumentListState.EntityId}&PhysicalVerificationRequired=0`)}
                                            headers={{
                                                'AuthToken': verifyUpnAndMobileSubmitOtpState.AuthToken,
                                                'AuthTokenKey': verifyUpnAndMobileSubmitOtpState.AuthTokenKey
                                            }}
                                            beforeUpload={file => {

                                                const validFileSize = file.size / 1024 < 2048;
                                                if (!validFileSize) {
                                                    message.error('Allowed filed size is ' + 2048 + 'KB', 5);
                                                }
                                                if ((file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'application/pdf') && validFileSize) {
                                                    setUploadLoading({
                                                        ...uploadLoading,
                                                        [0]: true
                                                    })
                                                    setFiles({
                                                        ...files,
                                                        [0]: file
                                                    })
                                                    setFileList(state => ({
                                                        ...fileList,
                                                        [0]: []
                                                    }))
                                                    setSubmitDocumentStatus(true)
                                                }
                                                else {
                                                    message.error(`Select png, jpg or pdf file only.`);
                                                }
                                                let file_status = ((file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'application/pdf') && validFileSize) ? true : false
                                                if (file_status) {
                                                    return file_status
                                                }
                                                else {
                                                    const defaultFileLists = defaultFileList;
                                                    let DocumentTypeId = 1500
                                                    let fileArr = []
                                                    defaultFileLists.forEach((defaultItem) => {
                                                        if (defaultItem.documentTypeId !== DocumentTypeId) {
                                                            fileArr.push(defaultItem)
                                                        }
                                                    })
                                                    setDefaultFileList(fileArr)
                                                    setFileList(state => ({
                                                        ...fileList,
                                                        [0]: []
                                                    }))
                                                    return file_status
                                                }

                                            }}
                                            onRemove={file => {
                                                const defaultFileLists = defaultFileList;
                                                let DocumentTypeId = 1500
                                                fetch(`${conf.api.base_url}DMS_DocumentService/DeleteUploadedDocument?ApiKey=DeleteUploadedDocument&OrgId=${OrgId}&DocumentId=${documentFileId[0]}`, {
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
                                                            [0]: []
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
                                                        [0]: response.CustomObject.FileId
                                                    }))

                                                    let fileArr = []
                                                    const defaultFileLists = defaultFileList;
                                                    defaultFileLists.forEach((defaultItem) => {
                                                        fileArr.push(defaultItem)
                                                    })
                                                    let extension = files[0].name.substr(files[0].name.lastIndexOf(".") + 1)
                                                    let filePrependString = ""
                                                    if (extension === 'jpg' || extension === 'jpeg' || extension === 'png') {
                                                        filePrependString = `data:image/${extension};base64,${response.CustomObject.FileData}`
                                                    }
                                                    else {
                                                        filePrependString = `data:application/${extension};base64,${response.CustomObject.FileData}`
                                                    }
                                                    fileArr.push({
                                                        documentTypeId: 1500,
                                                        uid: response.CustomObject.FileId,
                                                        name: files[0].name,
                                                        status: 'done',
                                                        url: filePrependString,
                                                        thumbUrl: filePrependString,
                                                        preview: filePrependString,
                                                    })
                                                    setDefaultFileList(fileArr)
                                                    setFileList(state => ({
                                                        ...fileList,
                                                        [0]: [{
                                                            documentTypeId: 1500,
                                                            uid: response.CustomObject.FileId,
                                                            name: files[0].name,
                                                            status: 'done',
                                                            url: filePrependString,
                                                            thumbUrl: filePrependString,
                                                            preview: filePrependString,
                                                        }]
                                                    }))
                                                    setFormData({ ...formData, ["TemporaryApplicationId"]: getDocumentListState.EntityId, })

                                                }
                                                if (response.Status === 1) {
                                                    notification["error"]({
                                                        message: response.Message,
                                                        placement: "bottomRight"
                                                    })
                                                }
                                                setUploadLoading({
                                                    ...uploadLoading,
                                                    [0]: false
                                                })
                                                setSubmitDocumentStatus(false)
                                            }}
                                            defaultFileList={_.find(defaultFileList, { 'documentTypeId': 1500 }) ? [_.find(defaultFileList, { 'documentTypeId': 1500 })] : []}
                                            fileList={fileList[0]}
                                            allowedFileTypes={["image/jpg", "image/jpeg", "image/png", "application/pdf"]}
                                            allowedFileSizeInKb={2048}
                                            fileTypeValidationMessage={"Only PNG, JPG, JPEG and PDF file types allowed!"}
                                        >
                                            {_.find(defaultFileList, { 'documentTypeId': 1500 }) ? null : <Button icon={<UploadOutlined />}
                                                loading={uploadLoading[0]}
                                            >Click to Upload</Button>
                                            }
                                        </DocumentUpload>
                                    </Form.Item>
                                </Col>
                            </Row>
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
                    <Row gutter="24" >
                        <Col span="24" >
                            <FormItem
                                name="Assistance Required"
                            >
                                <Checkbox name="AssistanceRequired" onChange={(e) => handleOnChangeCheck(e, "AssistanceRequired")}>I would like to get tele-phonic assistance on my mobile number verified above.</Checkbox>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter="24" >
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
                                    <div style={{ marginLeft: 8 }}>I here by state that the facts mentioned above are true to the best of my knowldege and belief.</div>
                                </label>
                            </FormItem>
                        </Col>
                    </Row>

                    <BlankSpace />
                    {getDocumentListState.apiState === "success" &&
                        <BlueButton disabled={submitDocumentStatus} loading={(saveGrievanceState.apiState === "loading") ? true : false} htmlType="submit" >SUBMIT GRIEVANCE</BlueButton>
                    }
                </Form>
            </Container>
        </>
    )
}

const mapStateToProps = (state) => ({
    getServiceDetailState: state.getServiceDetail,
    verifyUpnAndMobileSubmitOtpState: state.verifyUpnAndMobileSubmitOtp,
    getStateListState: state.getStateList,
    saveGrievanceState: state.saveGrievance,
    getDocumentListState: state.getDocumentList,
    getGrievancePertainsToListState: state.getGrievancePertainsToList,
    getActiveServicesListState: state.getActiveServicesList,
    getApplListByMobileNoState: state.getApplListByMobileNo,
    verifyUpnAndMobileState: state.verifyUpnAndMobile,
    getDistrictListState: state.getDistrictList,
    getGrievanceDeptListState: state.getGrievanceDeptList,
    getGrievanceDesgListState: state.getGrievanceDesgList,

})

const mapDispatchToProps = (dispatch) => ({
    getStateList: (params) => dispatch(getStateList(params)),
    getStateListResetState: () => dispatch(getStateListResetState()),
    saveGrievance: (params) => dispatch(saveGrievance(params)),
    saveGrievanceResetState: () => dispatch(saveGrievanceResetState()),
    getDocumentList: (params) => dispatch(getDocumentList(params)),
    getDocumentListResetState: () => dispatch(getDocumentListResetState()),
    getGrievancePertainsToList: (params) => dispatch(getGrievancePertainsToList(params)),
    getGrievancePertainsToListResetState: () => dispatch(getGrievancePertainsToListResetState()),
    getActiveServicesList: (params) => dispatch(getActiveServicesList(params)),
    getActiveServicesListResetState: () => dispatch(getActiveServicesListResetState()),
    getApplListByMobileNo: (params) => dispatch(getApplListByMobileNo(params)),
    getApplListByMobileNoResetState: () => dispatch(getApplListByMobileNoResetState()),
    getDistrictList: (params) => dispatch(getDistrictList(params)),
    getDistrictListResetState: () => dispatch(getDistrictListResetState()),
    getGrievanceDeptList: (params) => dispatch(getGrievanceDeptList(params)),
    getGrievanceDeptListResetState: () => dispatch(getGrievanceDeptListResetState()),
    getGrievanceDesgList: (params) => dispatch(getGrievanceDesgList(params)),
    getGrievanceDesgListResetState: () => dispatch(getGrievanceDesgListResetState()),
})

export default connect(mapStateToProps, mapDispatchToProps)(GrievanceForm)