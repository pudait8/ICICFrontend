import React, { useEffect, useState } from "react"
import { Col, Form, Row, Upload, Button, notification, Input, Select, message, Modal } from "antd"
import { connect } from "react-redux"
import { UploadOutlined } from '@ant-design/icons'
import _ from "lodash"
import { Link, Redirect } from "react-router-dom"

// Action
import { getSalutationList } from '../../../actions/getSalutationListActions'
import { getStateList, getStateListResetState } from '../../../actions/getStateListAction'
import { getDistrictList, getDistrictListResetState } from '../../../actions/getDistrictListAction'
import { saveEcluApplicant, saveEcluApplicantResetState } from '../../../actions/saveEcluApplicantAction'
import { getDocumentList, getDocumentListResetState } from '../../../actions/getDocumentListAction'

//Others
import { getOrgId } from '../../../utils'
import conf from "../../../config"
import { BlankSpace, BlueButton, DocumentUpload, FileTitle, FormItem, ValidationDiv } from "../../Xcomponents";
const { Option } = Select


const ApplicantDetails = props => {

    //Variables
    const OrgId = getOrgId()
    const [formData, setFormData] = useState({
        ApplicantId: 0,
        Title: "",
        Name: "",
        MiddleName: "",
        LastName: "",
        DesignationName: "",
        Aadhaar: "",
        Pan: "",
        MobileNo: "",
        Email: "",
        Address1: "",
        Address2: "",
        Pin: "",
        Country: "",
        StateId: "",
        DistrictId: "",
        Tehsil: "",
        UploadApplicationPhoto: false,
        TempPhotoId: "",
        UploadPanCard: false,
        TempPanCardId: "",
        UploadAadhar: false,
        TempAadhaarId: "",
        UploadAadhaarCard: "",
    })
    const [form] = Form.useForm()
    const [previewVisible, setPreviewVisible] = useState(false)
    const [previewImage, setPreviewImage] = useState('')
    const [applicationId, setApplicationId] = useState(0)
    const [currentFileType, setCurrentFileType] = useState('') // Current file format
    const [submitDocumentStatus, setSubmitDocumentStatus] = useState(false) // Current file format
    const [fileList, setFileList] = useState([])
    const [defaultFileList, setDefaultFileList] = useState([])
    const [files, setFiles] = useState([])

    const {
        getSalutationList, getSalutationListState,
        getStateList, getStateListState, getStateListResetState,
        getDistrictList, getDistrictListState, getDistrictListResetState,
        verifyUpnAndMobileSubmitOtpState,
        saveEcluApplicant, saveEcluApplicantResetState, saveEcluApplicantState,
        getDocumentList, getDocumentListResetState, getDocumentListState,
        getEcluDetailState
    } = props

    //Callback
    useEffect(() => {
        getSalutationList({
            OrgId: OrgId,
            AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
            AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey
        })
        getStateList({
            OrgId: OrgId,
        })

        return (() => {
            getDistrictListResetState()
            getStateListResetState()
            getDocumentListResetState()
            saveEcluApplicantResetState()

        })
    }, [])

    useEffect(() => {
        if (getEcluDetailState.apiState === "success") {
            // setApplicantId(getEcluDetailState.data.ApplicantId)
            getDistrictList({
                OrgId: OrgId,
                StateId: getEcluDetailState.data.StateId
            })
            setFormData({
                ...formData,
                ApplicantId: getEcluDetailState.data.ApplicantId,
                Title: getEcluDetailState.data.Title,
                Name: getEcluDetailState.data.Name,
                MiddleName: getEcluDetailState.data.MiddleName,
                LastName: getEcluDetailState.data.LastName,
                DesignationName: getEcluDetailState.data.DesignationName,
                Aadhaar: getEcluDetailState.data.Aadhaar,
                Pan: getEcluDetailState.data.Pan,
                MobileNo: getEcluDetailState.data.MobileNo,
                Email: getEcluDetailState.data.Email,
                Address1: getEcluDetailState.data.Address1,
                Address2: getEcluDetailState.data.Address2,
                Pin: getEcluDetailState.data.Pin,
                Country: getEcluDetailState.data.Country,
                StateId: getEcluDetailState.data.StateId,
                DistrictId: getEcluDetailState.data.DistrictId,
                Tehsil: getEcluDetailState.data.Tehsil,
            })
            form.setFieldsValue({
                Title: getEcluDetailState.data.Title,
                Name: getEcluDetailState.data.Name,
                MiddleName: getEcluDetailState.data.MiddleName,
                LastName: getEcluDetailState.data.LastName,
                DesignationName: getEcluDetailState.data.DesignationName,
                Aadhaar: getEcluDetailState.data.Aadhaar,
                Pan: getEcluDetailState.data.Pan,
                MobileNo: getEcluDetailState.data.MobileNo,
                Email: getEcluDetailState.data.Email,
                Address1: getEcluDetailState.data.Address1,
                Address2: getEcluDetailState.data.Address2,
                Pin: getEcluDetailState.data.Pin,
                Country: getEcluDetailState.data.Country,
                StateId: getEcluDetailState.data.StateId,
                DistrictId: getEcluDetailState.data.DistrictId,
                Tehsil: getEcluDetailState.data.Tehsil,
            })

            //Document
            let fileArr = []
            getEcluDetailState.data.ApplicantDocuments.map((item) => {
                let extension = item.FileName.substr(item.FileName.lastIndexOf(".") + 1)
                let filePrependString = ""
                if (extension === 'jpg' || extension === 'jpeg' || extension === 'png') {
                    filePrependString = `data:image/${extension};base64,${item.FileData}`
                }
                else {
                    filePrependString = `data:application/${extension};base64,${item.FileData}`
                }
                fileArr.push({
                    documentTypeId: item.DocumentTypeId,
                    uid: item.DocumentId,
                    name: item.FileName,
                    status: 'done',
                    url: filePrependString,
                    thumbUrl: filePrependString,
                    preview: filePrependString,
                })
            })
            setDefaultFileList(fileArr)

        }
    }, [getEcluDetailState])

    useEffect(() => {
        if (getEcluDetailState.apiState === "success" || getEcluDetailState.apiState === "alert") {
            getDocumentList({
                PropertyId: verifyUpnAndMobileSubmitOtpState.data.PropertyRefId,
                OrgId: OrgId,
                ApplicationTypeId: 0,
                AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
                AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey
            })
        }
    }, [getEcluDetailState])

    useEffect(() => {
        if (getDocumentListState.apiState === "success") {
            if (getEcluDetailState.apiState === "success") {
                if (getEcluDetailState.data.ApplicantId > 0) {
                    setApplicationId(getEcluDetailState.data.ApplicantId)
                }
            }
            else {
                setApplicationId(getDocumentListState.EntityId)
            }
        }
    }, [getDocumentListState])


    useEffect(() => {
        if (saveEcluApplicantState.apiState === "alert") {
            notification["error"]({
                message: saveEcluApplicantState.apiMessage,
                placement: "bottomRight"
            })
        }

        if (saveEcluApplicantState.apiState === "success") {
            notification["success"]({
                message: saveEcluApplicantState.apiMessage,
                placement: "bottomRight"
            })
            // setRedirect([true, "/grievance-details/" + OrgId + "/" + saveEcluApplicantState.data.GrievanceNo])
        }
    }, [saveEcluApplicantState])

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

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e
        }
        return e && e.fileList
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
            // const image = new Image();
            // image.src = src;
            // const imgWindow = window.open(src);
            // imgWindow.document.write(image.outerHTML);
            setCurrentFileType('image');
            setPreviewImage(src);
            setPreviewVisible(true);
        }
        else {
            setCurrentFileType('pdf');
            setPreviewImage(src);
            setPreviewVisible(true);
            // let pdfWindow = window.open("")
            // pdfWindow.document.write(
            //     "<iframe width='100%' height='100%' src='" +
            //     src + "'></iframe>"
            // )
        }

    }

    const handleCancel = () => {
        setPreviewVisible(false);
    }

    const handleSubmit = () => {
        saveEcluApplicant({
            OrgId: OrgId,
            AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
            AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey,
            ...formData
        })
    }

    const beforeUpload = (file) => {
        const validFileType = ["image/jpg", "image/jpeg", "image/png"].includes(file.type)
        if (!validFileType) {
            message.error("Only JPG, JPEG & PNG file types allowed!", 5);
        }
        const validFileSize = file.size / 1024 < 100;
        if (!validFileSize) {
            message.error('Allowed filed size is ' + 100 + 'KB', 5);
        }
        return validFileType && validFileSize
    }

    return (
        <>
            <Form
                layout="vertical"
                onFinish={handleSubmit}
                form={form}
            >
                <Row gutter="24" >

                    <Col span="8" >
                        <FormItem
                            name="Title"
                            label={"Title/Salutation"}
                            rules={[{ required: true, message: 'Required' }]}
                        >
                            <Select name="Title" size="large" style={{ width: '100%' }} onSelect={(v) => handleOnChangeSelect(v, 'Title', false)} >
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
                            label="First Name"
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
                            label="Middle Name"
                            name="MiddleName"
                            rules={[{
                                required: true,
                                message: 'Required'
                            }]}
                        >
                            <Input name="MiddleName" size="large" onChange={handleOnChange} />
                        </FormItem>
                    </Col>
                    <Col span="8" >
                        <FormItem
                            label="Last Name"
                            name="LastName"
                            rules={[{
                                required: true,
                                message: 'Required'
                            }]}
                        >
                            <Input name="LastName" size="large" onChange={handleOnChange} />
                        </FormItem>
                    </Col>
                    <Col span="8" >
                        <FormItem
                            name="DesignationName"
                            label={"Select Designation"}
                            rules={[{ required: true, message: 'Required' }]}
                        >
                            <Select name="DesignationName" size="large" style={{ width: '100%' }} onSelect={(v) => handleOnChangeSelect(v, 'DesignationName', false)} >
                                <Option key="1" value="HR">HR</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="8" >
                        <FormItem
                            label="Aadhaar Number"
                            name="Aadhaar"
                            rules={[
                                { required: true, message: 'Required' },
                                { pattern: '^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$', message: 'Aadhaar number is not valid' }
                            ]}
                        >
                            <Input name="Aadhaar" size="large" onChange={handleOnChange} />
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem
                            label="PAN Card Number"
                            name="Pan"
                            rules={[
                                { required: true, message: 'Required' },
                                {
                                    pattern: '^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$',
                                    message: 'PAN is not valid'
                                }
                            ]}
                        >
                            <Input size="large" name="Pan" onChange={handleOnChange} />
                        </FormItem>
                    </Col>
                    <Col span="8" >
                        <FormItem
                            label="Mobile Number"
                            name="MobileNo"
                            rules={[
                                { required: true, message: 'Required' },
                                {
                                    pattern: new RegExp('^[6-9]\\d{9}$'),
                                    message: 'Mobile number is not valid',
                                }
                            ]}
                        >
                            <Input name="MobileNo" size="large" onChange={handleOnChange} />
                        </FormItem>
                    </Col>
                    <Col span="8" >
                        <FormItem
                            label="Email Address"
                            name="Email"
                            rules={[
                                { required: true, message: 'Required' },
                                { type: 'email', message: 'Email is not valid' },
                            ]}
                        >
                            <Input name="Email" size="large" onChange={handleOnChange} />
                        </FormItem>
                    </Col>
                    <Col span="8" >
                        <FormItem
                            label="Address Line 1"
                            name="Address1"
                            rules={[
                                { required: true, message: 'Required' },
                            ]}
                        >
                            <Input name="Address1" size="large" onChange={handleOnChange} />
                        </FormItem>
                    </Col>
                    <Col span="8" >
                        <FormItem
                            label="Address Line 2"
                            name="Address2"
                            rules={[
                                { required: true, message: 'Required' },
                            ]}
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
                                {
                                    pattern: new RegExp("^[0-9]{6}$"),
                                    message: 'Enter valid Pincode.',
                                }
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
                {getDocumentListState.apiState === "success" &&
                    <>
                        <Row gutter={24}>
                            <Col span="24" >
                                <FileTitle>
                                    <span>1. </span>
                                    <ValidationDiv className="validate">
                                        Upload Application Photo
                                    </ValidationDiv>
                                    <div>
                                        <span style={{ color: "red" }}>
                                            (File must be in ".jpeg/.jpg/.png" format and less than 100KB in size.")
                                        </span>
                                    </div>
                                </FileTitle>
                            </Col>
                            <Col span="24" >
                                <Form.Item
                                    name="Upload Application Photo"
                                    getValueFromEvent={normFile}
                                    rules={[
                                        { required: _.find(defaultFileList, { 'documentTypeId': 1501 }) ? false : true, message: 'Required' },
                                    ]}
                                    style={{ paddingLeft: 22 }}
                                >
                                    <DocumentUpload
                                        name="Upload Application Photo"
                                        listType="picture-card"
                                        onPreview={() => onPreview(_.find(defaultFileList, { 'documentTypeId': 1501 }))}
                                        action={`${conf.api.base_url}DMS_DocumentService/UploadDocument?ApiKey=UploadDocument&OrgId=${OrgId}&ApplicationTypeId=23&EntityTypeID=700&DocumentTypeId=1501&DocumentName=Photo&ApplicationId=${applicationId}&PhysicalVerificationRequired=0`}
                                        headers={{
                                            'AuthToken': verifyUpnAndMobileSubmitOtpState.AuthToken,
                                            'AuthTokenKey': verifyUpnAndMobileSubmitOtpState.AuthTokenKey
                                        }}
                                        beforeUpload={(file) => {
                                            let checkValicdation = beforeUpload(file)
                                            if (checkValicdation) {
                                                setFormData({
                                                    ...formData,
                                                    ["UploadApplicationPhoto"]: true
                                                })
                                                setFiles({
                                                    ...files,
                                                    ["UploadApplicationPhoto"]: file
                                                })
                                                setFileList(state => ({
                                                    ...fileList,
                                                    ["UploadApplicationPhoto"]: []
                                                }))
                                                setSubmitDocumentStatus(true)
                                                return true
                                            }
                                            else {
                                                setFileList(state => ({
                                                    ...fileList,
                                                    ["UploadApplicationPhoto"]: []
                                                }))
                                                return false
                                            }
                                        }}
                                        onError={(info) => {
                                            setSubmitDocumentStatus(false)
                                            setFormData({ ...formData, ["UploadApplicationPhoto"]: false })
                                        }}
                                        onRemove={file => {
                                            setFileList(state => ({
                                                ...fileList,
                                                ["UploadApplicationPhoto"]: []
                                            }))
                                            const defaultFileLists = defaultFileList;
                                            let fileArr = []
                                            defaultFileLists.forEach(item => {
                                                if (item.documentTypeId !== 1501) {
                                                    fileArr.push(item)
                                                }
                                            })
                                            setDefaultFileList(fileArr)
                                        }}
                                        onSuccess={(response) => {
                                            if (response.Status === 2) {
                                                let fileArr = []
                                                const defaultFileLists = defaultFileList;
                                                defaultFileLists.forEach((defaultItem) => {
                                                    fileArr.push(defaultItem)
                                                })
                                                let extension = files["UploadApplicationPhoto"].name.substr(files["UploadApplicationPhoto"].name.lastIndexOf(".") + 1)
                                                let filePrependString = ""
                                                if (extension === 'jpg' || extension === 'jpeg' || extension === 'png') {
                                                    filePrependString = `data:image/${extension};base64,${response.CustomObject.FileData}`
                                                }
                                                else {
                                                    filePrependString = `data:application/${extension};base64,${response.CustomObject.FileData}`
                                                }
                                                fileArr.push({
                                                    documentTypeId: 1501,
                                                    uid: response.CustomObject.FileId,
                                                    name: files["UploadApplicationPhoto"].name,
                                                    status: 'done',
                                                    url: filePrependString,
                                                    thumbUrl: filePrependString,
                                                    preview: filePrependString,
                                                })
                                                setDefaultFileList(fileArr)
                                                setFileList(state => ({
                                                    ...fileList,
                                                    ["UploadApplicationPhoto"]: [{
                                                        documentTypeId: 1501,
                                                        uid: response.CustomObject.FileId,
                                                        name: files["UploadApplicationPhoto"].name,
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
                                            if (response.CustomObject && response.CustomObject.EntityId) {
                                                setFormData({ ...formData, ["UploadApplicationPhoto"]: false, ["TempPhotoId"]: response.CustomObject.EntityId })
                                            }
                                            else {
                                                setFormData({ ...formData, ["UploadApplicationPhoto"]: false })
                                            }
                                            setSubmitDocumentStatus(false)
                                        }}
                                        defaultFileList={_.find(defaultFileList, { 'documentTypeId': 1501 }) ? [_.find(defaultFileList, { 'documentTypeId': 1501 })] : []}
                                        fileList={fileList["UploadApplicationPhoto"]}
                                        allowedFileTypes={["image/jpg", "image/jpeg", "image/png"]}
                                        allowedFileSizeInKb={100}
                                        fileTypeValidationMessage={"Only JPG, JPEG & PNG file types allowed!"}
                                    >
                                        {_.find(defaultFileList, { 'documentTypeId': 1501 }) ? null : <Button icon={<UploadOutlined />}
                                            loading={formData.UploadApplicationPhoto}
                                        >Click to Upload</Button>
                                        }
                                    </DocumentUpload>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span="24" >
                                <FileTitle>
                                    <span>2. </span>
                                    <ValidationDiv className="validate">
                                        Upload PAN Card
                                    </ValidationDiv>
                                    <div>
                                        <span style={{ color: "red" }}>
                                            (File must be in ".jpeg/.jpg/.png" format and less than 100KB in size.")
                                        </span>
                                    </div>
                                </FileTitle>
                            </Col>
                            <Col span="24" >
                                <Form.Item
                                    name="Upload PAN Card"
                                    getValueFromEvent={normFile}
                                    rules={[
                                        { required: _.find(defaultFileList, { 'documentTypeId': 1502 }) ? false : true, message: 'Required' },
                                    ]}
                                    style={{ paddingLeft: 22 }}
                                >
                                    <DocumentUpload
                                        name="Upload PAN Card"
                                        listType="picture-card"
                                        onPreview={() => onPreview(_.find(defaultFileList, { 'documentTypeId': 1502 }))}
                                        action={`${conf.api.base_url}DMS_DocumentService/UploadDocument?ApiKey=UploadDocument&OrgId=${OrgId}&ApplicationTypeId=23&EntityTypeID=700&DocumentTypeId=1502&DocumentName=PAN&ApplicationId=${applicationId}&PhysicalVerificationRequired=0`}
                                        headers={{
                                            'AuthToken': verifyUpnAndMobileSubmitOtpState.AuthToken,
                                            'AuthTokenKey': verifyUpnAndMobileSubmitOtpState.AuthTokenKey
                                        }}
                                        beforeUpload={file => {
                                            let checkValicdation = beforeUpload(file)
                                            if (checkValicdation) {
                                                setFormData({
                                                    ...formData,
                                                    ["UploadPanCard"]: true
                                                })
                                                setFiles({
                                                    ...files,
                                                    ["UploadPanCard"]: file
                                                })
                                                setFileList(state => ({
                                                    ...fileList,
                                                    ["UploadPanCard"]: []
                                                }))
                                                setSubmitDocumentStatus(true)
                                                return true
                                            }
                                            else {
                                                setFileList(state => ({
                                                    ...fileList,
                                                    ["UploadPanCard"]: []
                                                }))
                                                return false
                                            }
                                        }}
                                        onError={(info) => {
                                            setSubmitDocumentStatus(false)
                                            setFormData({ ...formData, ["UploadPanCard"]: false })
                                        }}
                                        onRemove={file => {
                                            setFileList(state => ({
                                                ...fileList,
                                                ["UploadPanCard"]: []
                                            }))
                                            const defaultFileLists = defaultFileList;
                                            let fileArr = []
                                            defaultFileLists.forEach(item => {
                                                if (item.documentTypeId !== 1502) {
                                                    fileArr.push(item)
                                                }
                                            })
                                            setDefaultFileList(fileArr)
                                        }}
                                        onSuccess={(response) => {
                                            if (response.Status === 2) {
                                                let fileArr = []
                                                const defaultFileLists = defaultFileList;
                                                defaultFileLists.forEach((defaultItem) => {
                                                    fileArr.push(defaultItem)
                                                })
                                                let extension = files["UploadPanCard"].name.substr(files["UploadPanCard"].name.lastIndexOf(".") + 1)
                                                let filePrependString = ""
                                                if (extension === 'jpg' || extension === 'jpeg' || extension === 'png') {
                                                    filePrependString = `data:image/${extension};base64,${response.CustomObject.FileData}`
                                                }
                                                else {
                                                    filePrependString = `data:application/${extension};base64,${response.CustomObject.FileData}`
                                                }
                                                fileArr.push({
                                                    documentTypeId: 1502,
                                                    uid: response.CustomObject.FileId,
                                                    name: files["UploadPanCard"].name,
                                                    status: 'done',
                                                    url: filePrependString,
                                                    thumbUrl: filePrependString,
                                                    preview: filePrependString,
                                                })
                                                setDefaultFileList(fileArr)
                                                setFileList(state => ({
                                                    ...fileList,
                                                    ["UploadPanCard"]: [{
                                                        documentTypeId: 1502,
                                                        uid: response.CustomObject.FileId,
                                                        name: files["UploadPanCard"].name,
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
                                            if (response.CustomObject && response.CustomObject.EntityId) {
                                                setFormData({ ...formData, ["UploadPanCard"]: false, ["TempPanCardId"]: response.CustomObject.EntityId })
                                            }
                                            else {
                                                setFormData({ ...formData, ["UploadPanCard"]: false })
                                            }
                                            setSubmitDocumentStatus(false)
                                        }}
                                        defaultFileList={_.find(defaultFileList, { 'documentTypeId': 1502 }) ? [_.find(defaultFileList, { 'documentTypeId': 1502 })] : []}
                                        fileList={fileList["UploadPanCard"]}
                                        allowedFileTypes={["image/jpg", "image/jpeg"]}
                                        allowedFileSizeInKb={100}
                                        fileTypeValidationMessage={"Only JPG & JPEG file types allowed!"}
                                    >
                                        {_.find(defaultFileList, { 'documentTypeId': 1502 }) ? null : <Button icon={<UploadOutlined />}
                                            loading={formData.UploadPanCard}
                                        >Click to Upload</Button>
                                        }
                                    </DocumentUpload>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span="24" >
                                <FileTitle>
                                    <span>2. </span>
                                    <ValidationDiv className="validate">
                                        Upload Aadhaar Card
                                    </ValidationDiv>
                                    <div>
                                        <span style={{ color: "red" }}>
                                            (File must be in ".jpeg/.jpg/.png" format and less than 100KB in size.")
                                        </span>
                                    </div>
                                </FileTitle>
                            </Col>
                            <Col span="24" >
                                <Form.Item
                                    name="UploadAadhaarCard"
                                    getValueFromEvent={normFile}
                                    rules={[
                                        { required: _.find(defaultFileList, { 'documentTypeId': 1503 }) ? false : true, message: 'Required' },
                                    ]}
                                    style={{ paddingLeft: 22 }}
                                >
                                    <DocumentUpload
                                        name="UploadAadhaarCard"
                                        listType="picture-card"
                                        onPreview={() => onPreview(_.find(defaultFileList, { 'documentTypeId': 1503 }))}
                                        action={`${conf.api.base_url}DMS_DocumentService/UploadDocument?ApiKey=UploadDocument&OrgId=${OrgId}&ApplicationTypeId=23&EntityTypeID=700&DocumentTypeId=1503&DocumentName=Aadhar&ApplicationId=${applicationId}&PhysicalVerificationRequired=0`}
                                        headers={{
                                            'AuthToken': verifyUpnAndMobileSubmitOtpState.AuthToken,
                                            'AuthTokenKey': verifyUpnAndMobileSubmitOtpState.AuthTokenKey
                                        }}
                                        beforeUpload={file => {
                                            let checkValicdation = beforeUpload(file)
                                            if (checkValicdation) {
                                                setFormData({
                                                    ...formData,
                                                    ["UploadAadhar"]: true
                                                })
                                                setFiles({
                                                    ...files,
                                                    ["UploadAadhar"]: file
                                                })
                                                setFileList(state => ({
                                                    ...fileList,
                                                    ["UploadAadhar"]: []
                                                }))
                                                setSubmitDocumentStatus(true)
                                                return true
                                            }
                                            else {
                                                setFileList(state => ({
                                                    ...fileList,
                                                    ["UploadAadhar"]: []
                                                }))
                                                setFormData({
                                                    ...formData,
                                                    ["UploadAadhaarCard"]: ""
                                                })
                                                // const defaultFileLists = defaultFileList;
                                                // let fileArr = []
                                                // defaultFileLists.forEach(item => {
                                                //     if (item.documentTypeId !== 1503) {
                                                //         fileArr.push(item)
                                                //     }
                                                // })
                                                // setDefaultFileList(fileArr)
                                                return false
                                            }
                                        }}
                                        onError={(info) => {
                                            setSubmitDocumentStatus(false)
                                            setFormData({ ...formData, ["UploadAadhar"]: false })
                                        }}
                                        onRemove={file => {
                                            setFileList(state => ({
                                                ...fileList,
                                                ["UploadAadhar"]: []
                                            }))
                                            const defaultFileLists = defaultFileList;
                                            let fileArr = []
                                            defaultFileLists.forEach(item => {
                                                if (item.documentTypeId !== 1503) {
                                                    fileArr.push(item)
                                                }
                                            })
                                            setDefaultFileList(fileArr)
                                        }}
                                        onSuccess={(response) => {
                                            if (response.Status === 2) {
                                                let fileArr = []
                                                const defaultFileLists = defaultFileList;
                                                defaultFileLists.forEach((defaultItem) => {
                                                    fileArr.push(defaultItem)
                                                })
                                                let extension = files["UploadAadhar"].name.substr(files["UploadAadhar"].name.lastIndexOf(".") + 1)
                                                let filePrependString = ""
                                                if (extension === 'jpg' || extension === 'jpeg' || extension === 'png') {
                                                    filePrependString = `data:image/${extension};base64,${response.CustomObject.FileData}`
                                                }
                                                else {
                                                    filePrependString = `data:application/${extension};base64,${response.CustomObject.FileData}`
                                                }
                                                fileArr.push({
                                                    documentTypeId: 1503,
                                                    uid: response.CustomObject.FileId,
                                                    name: files["UploadAadhar"].name,
                                                    status: 'done',
                                                    url: filePrependString,
                                                    thumbUrl: filePrependString,
                                                    preview: filePrependString,
                                                })
                                                setDefaultFileList(fileArr)
                                                setFileList(state => ({
                                                    ...fileList,
                                                    ["UploadAadhar"]: [{
                                                        documentTypeId: 1503,
                                                        uid: response.CustomObject.FileId,
                                                        name: files["UploadAadhar"].name,
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
                                            if (response.CustomObject && response.CustomObject.EntityId) {
                                                setFormData({ ...formData, ["UploadAadhar"]: false, ["TempAadhaarId"]: response.CustomObject.EntityId })
                                            }
                                            else {
                                                setFormData({ ...formData, ["UploadAadhar"]: false })
                                            }
                                            setSubmitDocumentStatus(false)
                                        }}
                                        defaultFileList={_.find(defaultFileList, { 'documentTypeId': 1503 }) ? [_.find(defaultFileList, { 'documentTypeId': 1503 })] : []}
                                        fileList={fileList["UploadAadhar"]}
                                        allowedFileTypes={["image/jpg", "image/jpeg"]}
                                        allowedFileSizeInKb={100}
                                        fileTypeValidationMessage={"Only JPG & JPEG file types allowed!"}
                                    >
                                        {_.find(defaultFileList, { 'documentTypeId': 1503 }) ? null : <Button icon={<UploadOutlined />}
                                            loading={formData.UploadAadhar}
                                        >Click to Upload</Button>
                                        }
                                    </DocumentUpload>
                                </Form.Item>
                            </Col>
                        </Row>
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
                        <BlankSpace />
                        <BlueButton htmlType="submit" disabled={submitDocumentStatus} loading={saveEcluApplicantState.apiState === "loading"}>SAVE AND GO TO BUSINESS ENITY DETAILS SECTION</BlueButton>
                    </>
                }
            </Form>
        </>
    )


}


const mapStateToProps = (state) => ({
    getSalutationListState: state.getSalutationList,
    getStateListState: state.getStateList,
    getDistrictListState: state.getDistrictList,
    verifyUpnAndMobileSubmitOtpState: state.verifyUpnAndMobileSubmitOtp,
    saveEcluApplicantState: state.saveEcluApplicant,
    getDocumentListState: state.getDocumentList,
    getEcluDetailState: state.getEcluDetail,
})

const mapDispatchToProps = (dispatch) => ({
    getSalutationList: (params) => dispatch(getSalutationList(params)),
    getStateList: (params) => dispatch(getStateList(params)),
    getStateListResetState: () => dispatch(getStateListResetState()),
    getDistrictList: (params) => dispatch(getDistrictList(params)),
    getDistrictListResetState: () => dispatch(getDistrictListResetState()),
    saveEcluApplicant: (params) => dispatch(saveEcluApplicant(params)),
    saveEcluApplicantResetState: () => dispatch(saveEcluApplicantResetState()),
    getDocumentList: (params) => dispatch(getDocumentList(params)),
    getDocumentListResetState: () => dispatch(getDocumentListResetState()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ApplicantDetails)