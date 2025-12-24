import React, { useEffect, useState } from "react"
import { Col, Form, Row, Upload, Button, notification, Input, DatePicker, Select, Checkbox, InputNumber, Space, Alert, Modal, Popconfirm } from "antd"
import { connect } from "react-redux"
import { CloseCircleOutlined, UploadOutlined } from '@ant-design/icons'
import { Link, Redirect } from "react-router-dom"
import _ from "lodash"

// components
import { Container, Heading } from './ApplicationFormStyle'
import { FormItem, BlankSpace, BlueButton, DocumentUpload, ValidationDiv, FileTitle, TextButton, FlexDiv } from '../Xcomponents'
import SelectSearchNotFound from "../SelectSearchNotFound";
import { PurchaserContainer, Purchaser, Name, Details } from "../PurchaserDetails/PurchaserDetailsStyle"
// actions
import { getDocumentList, getDocumentListResetState } from '../../actions/getDocumentListAction'
import { saveTransferApplication, saveTransferApplicationResetState } from '../../actions/transferApplicationSaveActions'
import { fetchTransferApplication, fetchTransferApplicationSuccess, resetStateFetchTransferApplication } from '../../actions/transferApplicationfetchActions'
import { deleteTransferApplication } from '../../actions/transferApplicationDeleteActions'
import { getAppointmentDate, getAppointmentDateResetState } from '../../actions/getAppointmentDateAction'
import { saveChangeOfOwnershipApplication, resetStateSaveChangeOfOwnershipApplication } from '../../actions/saveChangeOfOwnershipApplicationAction'
import { saveGpa, saveGpaResetState } from '../../actions/saveGpaAction'
import { deleteGpa, deleteGpaResetState } from '../../actions/deleteGpaActions'

// others
import { getOrgId } from '../../utils'
import conf from "../../config"
import PurchaserDetails from "../PurchaserDetails/PurchaserDetails";
import LegalHeirForm from "../LegalHeirForm/LegalHeirForm";
import { verifyUpnAndMobile } from "../../actions/verifyUpnAndMobileAction"
const { Option } = Select

const ApplicationForm = props => {
    // variables
    const {
        getServiceDetailState,
        getDocumentList, getDocumentListResetState, getDocumentListState,
        verifyUpnAndMobileSubmitOtpState,
        verifyUpnAndMobileState,
        saveTransferApplication, transferApplicationSaveState, saveTransferApplicationResetState,
        fetchTransferApplication, transferApplicationFetchState, resetStateFetchTransferApplication,
        getAppointmentDate, getAppointmentDateState, getAppointmentDateResetState,
        saveChangeOfOwnershipApplication, resetStateSaveChangeOfOwnershipApplication, saveChangeOfOwnershipApplicationState,
        saveGpa, saveGpaState, saveGpaResetState,
        deleteGpa, deleteGpaState, deleteGpaResetState,
        getLegalHeirListState,
        getPurchaserListState
    } = props
    const serviceId = props.serviceId
    const OrgId = getOrgId()
    let initialFormData = {
        PropertyId: verifyUpnAndMobileSubmitOtpState.data.PropertyRefId ? verifyUpnAndMobileSubmitOtpState.data.PropertyRefId : 0,
        OrgId: OrgId ? OrgId : 0,
        ApplicationTypeId: serviceId,
        OwnerId: 0,
        OwnerName: "",
        Remark: "",
        PermissionType: "",
        Relation: "",
        Share: 100,
        documentEntityId: 0,
        AppointmentDate: "",
        PermissionNo: verifyUpnAndMobileSubmitOtpState.nocNumber,
    }
    const [formData, setFormData] = useState(initialFormData)
    const [form] = Form.useForm()

    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [currentFileType, setCurrentFileType] = useState(''); // Current file format
    const [submitDocumentStatus, setSubmitDocumentStatus] = useState(false); // Current file format

    const [fileList, setFileList] = useState([])
    const [documentFileId, setDocumentFileId] = useState([])
    const [uploadLoading, setUploadLoading] = useState([])
    const [files, setFiles] = useState([])
    const [redirect, setRedirect] = useState([false, ""])
    const [applicationId, setApplicationId] = useState(verifyUpnAndMobileSubmitOtpState.data.ApplicationId)
    const [submitApplication, setSubmitApplication] = useState(false)
    const [isPVerificationRequired, setIsPVerificationRequired] = useState(false)
    const [defaultFileList, setDefaultFileList] = useState([])
    const [triggerPurchaserSubmit, setTriggerPurchaserSubmit] = useState(false)
    const [triggerPurchaserSubmitStatus, setTriggerPurchaserSubmitStatus] = useState(false)

    const initialGpaFormData = {
        Id: 0,
        ApplicationId: 0,
        PropertyRefId: 0,
        Name: "",
        FName: "",
        Address: "",
        EntityType: "",
        EntityId: 0,
        UploadGPA: false
    }

    const [gpaFormData, setGpaFormData] = useState(initialGpaFormData)
    const [gpaForm] = Form.useForm()
    const [filesGpa, setFilesGpa] = useState([])
    const [fileListGpa, setFileListGpa] = useState([])
    const [defaultFileListGpa, setDefaultFileListGpa] = useState([])
    const [visibleGpa, setVisibleGpa] = useState(false)
    const [submitBtnLoading, setSubmitBtnLoading] = useState(false)
    const [currentGpa, setCurrentGpa] = useState(false)

    // callbacks
    useEffect(() => {
        return (() => {
            saveTransferApplicationResetState()
            resetStateFetchTransferApplication()
            getAppointmentDateResetState()
            getDocumentListResetState()
            resetStateSaveChangeOfOwnershipApplication()
            saveGpaResetState()
            deleteGpaResetState()
        })
    }, [])

    useEffect(() => {
        if (currentGpa) {
            if (saveGpaState.apiState === "alert") {
                saveGpaState.apiState = ""
                notification.error({
                    message: saveGpaState.apiMessage,
                    placement: "bottomRight"
                })
                setCurrentGpa(false)
            }

            if (saveGpaState.apiState === "error") {
                saveGpaState.apiState = ""
                notification.error({
                    message: "Something went wrong, please try again.",
                    placement: "bottomRight"
                })
                setCurrentGpa(false)
            }

            if (saveGpaState.apiState === "success") {
                saveGpaState.apiState = ""
                setVisibleGpa(false)
                setGpaFormData(initialGpaFormData)
                setDefaultFileListGpa([])
                setFileListGpa([])
                setFilesGpa([])
                gpaForm.resetFields()
                notification.success({
                    message: "GPA added successfully",
                    placement: "bottomRight"
                })
                fetchApplication()
                setCurrentGpa(false)
            }
        }
    }, [saveGpaState])

    useEffect(() => {
        if (currentGpa) {
            if (deleteGpaState.apiState === "alert") {
                deleteGpaState.apiState = ""
                notification.error({
                    message: deleteGpaState.apiMessage,
                    placement: "bottomRight"
                })
                setCurrentGpa(false)
            }

            if (deleteGpaState.apiState === "error") {
                deleteGpaState.apiState = ""
                notification.error({
                    message: "Something went wrong, please try again.",
                    placement: "bottomRight"
                })
                setCurrentGpa(false)
            }

            if (deleteGpaState.apiState === "success") {
                deleteGpaState.apiState = ""
                setVisibleGpa(false)
                setGpaFormData(initialGpaFormData)
                setDefaultFileListGpa([])
                setFileListGpa([])
                setFilesGpa([])
                gpaForm.resetFields()
                notification.success({
                    message: "GPA removed successfully",
                    placement: "bottomRight"
                })
                fetchApplication()
                setCurrentGpa(false)
            }
        }
    }, [deleteGpaState])



    useEffect(() => {
        if (serviceId === '21' || serviceId === '1048') {
            setFormData({ ...formData, ['PermissionType']: 'Transfer' })
        }
        getDocumentList({
            PropertyId: verifyUpnAndMobileSubmitOtpState.data.PropertyRefId,
            OrgId: OrgId,
            ApplicationTypeId: serviceId,
            AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
            AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey
        })
        fetchApplication()
    }, [])

    useEffect(() => {
        if (getDocumentListState.apiState === "success") {
            let data = _.find(getDocumentListState.list, { 'IsPVerificationRequired': true }) ? true : false
            if (data) {
                setIsPVerificationRequired(true)
                getAppointmentDate({
                    OrgId: OrgId,
                    ApplicationTypeId: serviceId,
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
        if (transferApplicationFetchState.apiState === "success") {
            form.resetFields()
            let AppointmentDate = ""
            if (transferApplicationFetchState.data.AppointmentDetail !== null) {
                AppointmentDate = transferApplicationFetchState.data.AppointmentDetail.AppointmentDateWithSlot
            }
            setFormData({
                ...formData,
                ["OwnerId"]: transferApplicationFetchState.data.OwnerId,
                ["PermissionType"]: transferApplicationFetchState.data.TransferType,
                ["Relation"]: transferApplicationFetchState.data.TransferSubType,
                ["Share"]: transferApplicationFetchState.data.TransferPercentage,
                ["AppointmentDate"]: AppointmentDate,
                ["Remark"]: transferApplicationFetchState.data.Remarks,
            })
            form.setFieldsValue({
                OwnerName: transferApplicationFetchState.data.ApplicantDetails.Name,
                PermissionType: transferApplicationFetchState.data.TransferType,
                Relation: transferApplicationFetchState.data.TransferSubType,
                Share: transferApplicationFetchState.data.TransferPercentage,
                AppointmentDate: AppointmentDate,
                Remark: transferApplicationFetchState.data.Remarks,
            })
            let fileArr = []
            transferApplicationFetchState.data.Documents.map((item) => {
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

            if (transferApplicationFetchState.data.AppliedOwner.length > 0 && transferApplicationFetchState.data.AppliedOwner[0].GPADetails.Id > 0) {

            }
            else {

                addGpa(transferApplicationFetchState.data.OwnerId)
            }
        }
    }, [transferApplicationFetchState])

    useEffect(() => {
        if (transferApplicationSaveState.apiState === "alert") {
            notification["error"]({
                message: transferApplicationSaveState.apiMessage,
                placement: "bottomRight"
            })
            saveTransferApplicationResetState()
            setSubmitApplication(false)
        }

        if (transferApplicationSaveState.apiState === "success") {
            notification["success"]({
                message: transferApplicationSaveState.apiMessage,
                placement: "bottomRight"
            })
            setApplicationId(transferApplicationSaveState.data.ApplicationId)
            fetchTransferApplication({
                OrgId: formData.OrgId,
                ApplicationId: transferApplicationSaveState.data.ApplicationId,
                AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
                AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey
            })
            if (triggerPurchaserSubmitStatus) {
                setTriggerPurchaserSubmit(true)
            }
            if (submitApplication) {
                verifyUpnAndMobileSubmitOtpState.submitApplication = true
                setRedirect([true, "/ndc-details/" + transferApplicationSaveState.data.ApplicationId])
            }
        }
    }, [transferApplicationSaveState])


    useEffect(() => {
        if (saveChangeOfOwnershipApplicationState.apiState === "alert") {
            notification["error"]({
                message: saveChangeOfOwnershipApplicationState.apiMessage,
                placement: "bottomRight"
            })
            resetStateSaveChangeOfOwnershipApplication()
            setSubmitApplication(false)
        }

        if (saveChangeOfOwnershipApplicationState.apiState === "success") {
            notification["success"]({
                message: saveChangeOfOwnershipApplicationState.apiMessage,
                placement: "bottomRight"
            })
            setApplicationId(saveChangeOfOwnershipApplicationState.data.ApplicationId)
            fetchTransferApplication({
                OrgId: formData.OrgId,
                ApplicationId: saveChangeOfOwnershipApplicationState.data.ApplicationId,
                AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
                AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey
            })
            if (triggerPurchaserSubmitStatus) {
                setTriggerPurchaserSubmit(true)
            }
            if (submitApplication) {
                verifyUpnAndMobileSubmitOtpState.submitApplication = true
                setRedirect([true, "/ndc-details/" + saveChangeOfOwnershipApplicationState.data.ApplicationId])
            }
        }
    }, [saveChangeOfOwnershipApplicationState])


    // useEffect(() => {
    //     if (triggerPurchaserSubmit) {
    //         setTriggerPurchaserSubmit(false)
    //     }
    // }, [triggerPurchaserSubmit])
    // functions

    const handleOnChangeGpa = (e) => {
        setGpaFormData({ ...gpaFormData, [e.target.name]: e.target.value })
    }
    const onFinishGpa = () => {
        setSubmitBtnLoading(false)
        setCurrentGpa(true)
        saveGpa({
            OrgId: OrgId,
            Id: gpaFormData.Id,
            EntityId: gpaFormData.EntityId,
            EntityType: gpaFormData.EntityType,
            ApplicationId: applicationId,
            PropertyRefId: verifyUpnAndMobileSubmitOtpState.data.PropertyRefId,
            Name: gpaFormData.Name,
            FName: gpaFormData.FName,
            Address: gpaFormData.Address,
            AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
            AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey,
        })

    }

    const addGpa = (OwnerId) => {
        setVisibleGpa(true)
        gpaForm.resetFields()
        setGpaFormData({ ...gpaFormData, ['Id']: 0, ['EntityId']: OwnerId, ['ApplicationId']: applicationId, ['EntityType']: 'S', ['PropertyRefId']: verifyUpnAndMobileSubmitOtpState.data.PropertyRefId, ['Name']: "", ['FName']: "", ['Address']: "" })
    }

    const editGpa = (gpaDetails) => {

        setGpaFormData({ ...gpaFormData, ['Id']: gpaDetails.Id, ['EntityId']: gpaDetails.EntityId, ['ApplicationId']: gpaDetails.ApplicationId, ['EntityType']: gpaDetails.EntityType, ['PropertyRefId']: gpaDetails.PropertyRefId, ['Name']: gpaDetails.Name, ['FName']: gpaDetails.FName, ['Address']: gpaDetails.Address })
        gpaForm.setFieldsValue({
            Name: gpaDetails.Name,
            FName: gpaDetails.FName,
            Address: gpaDetails.Address
        })

        let fileArr = []
        if (gpaDetails.Document) {
            let extension = gpaDetails.Document.FileName.substr(gpaDetails.Document.FileName.lastIndexOf(".") + 1)
            let filePrependString = ""
            if (extension === 'jpg' || extension === 'jpeg' || extension === 'png') {
                filePrependString = `data:image/${extension};base64,${gpaDetails.Document.FileData}`
            }
            else {
                filePrependString = `data:application/${extension};base64,${gpaDetails.Document.FileData}`
            }
            if (gpaDetails.Document.DocumentTypeId === 812) {
                fileArr.push({
                    documentTypeId: gpaDetails.Document.DocumentTypeId,
                    uid: gpaDetails.Document.DocumentId,
                    name: gpaDetails.Document.FileName,
                    status: 'done',
                    url: filePrependString,
                    thumbUrl: filePrependString,
                    preview: filePrependString,
                })
                setDefaultFileListGpa(fileArr)
            }

        }
        setVisibleGpa(true)
    }

    const removeGpa = (gpaDetails) => {
        setCurrentGpa(true)
        deleteGpa({
            OrgId: formData.OrgId,
            EntityId: gpaDetails.EntityId,
            EntityType: gpaDetails.EntityType,
            AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
            AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey
        })
    }


    const fetchApplication = () => {
        if (applicationId) {
            fetchTransferApplication({
                OrgId: formData.OrgId,
                ApplicationId: applicationId,
                AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
                AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey
            })
        }
    }

    const handleOnChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = () => {
        if (getPurchaserListState.data && getPurchaserListState.data.length > 0) {
            if (getLegalHeirListState.data.length > 0) {
                if (getPurchaserListState.data.length <= getLegalHeirListState.data.length) {
                    if (serviceId === '25' || serviceId === '32') {
                        saveChangeOfOwnershipApplication({
                            ApplicationId: applicationId,
                            OrgId: formData.OrgId,
                            PermissionNo: verifyUpnAndMobileSubmitOtpState.nocNumber,
                            ApplicationTypeId: formData.ApplicationTypeId,
                            Remark: formData.Remark,
                            TemporaryApplicationId: getDocumentListState.EntityId,
                            AppointmentDate: formData.AppointmentDate,
                            AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
                            AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey,
                            SubmitType: 1,
                        })
                    }
                    else {
                        saveTransferApplication({
                            ApplicationId: applicationId,
                            ApplicationTypeId: formData.ApplicationTypeId,
                            PropertyRefId: formData.PropertyId,
                            Name: verifyUpnAndMobileState.data.OwnerName,
                            Remark: formData.Remark,
                            TemporaryApplicationId: getDocumentListState.EntityId,
                            GPASPA: "N",
                            OwnerId: verifyUpnAndMobileState.data.OwnerId,
                            OrgId: OrgId,
                            AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
                            AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey,
                            TransferType: formData.PermissionType,
                            TransferSubType: formData.Relation,
                            TransferPercentage: formData.Share,
                            AppointmentDate: formData.AppointmentDate,
                            SubmitType: 1,
                        })
                    }
                    setSubmitApplication(true)
                }
                else {
                    notification["error"]({
                        message: `Please add Legal Heir of every ${props.changeOfOwnerShip ? "Transferor's" : "Purchaser's"}`,
                        placement: "bottomRight"
                    })
                }
            }
            else {
                notification["error"]({
                    message: `Please add Legal Heir of every ${props.changeOfOwnerShip ? "Transferor's" : "Purchaser's"}`,
                    placement: "bottomRight"
                })
            }
        }
        else {
            notification["error"]({
                message: `Please add at least one ${props.changeOfOwnerShip ? "Transferor's" : "Purchaser's"} and Legal Heir`,
                placement: "bottomRight"
            })
        }
    }

    const onSave = () => {
        if (serviceId === '25' || serviceId === '32') {
            saveChangeOfOwnershipApplication({
                ApplicationId: applicationId,
                OrgId: formData.OrgId,
                PermissionNo: verifyUpnAndMobileSubmitOtpState.nocNumber,
                ApplicationTypeId: formData.ApplicationTypeId,
                Remark: formData.Remark,
                TemporaryApplicationId: getDocumentListState.EntityId,
                AppointmentDate: formData.AppointmentDate,
                AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
                AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey,
                SubmitType: 0,
            })
        }
        else {
            saveTransferApplication({
                ApplicationId: applicationId,
                ApplicationTypeId: formData.ApplicationTypeId,
                OrgId: formData.OrgId,
                PropertyRefId: formData.PropertyId,
                OwnerId: verifyUpnAndMobileState.data.OwnerId,
                OwnerName: formData.OwnerName,
                TransferType: formData.PermissionType,
                TransferSubType: formData.Relation,
                TransferPercentage: formData.Share,
                Remark: formData.Remark,
                TemporaryApplicationId: getDocumentListState.EntityId,
                AppointmentDate: formData.AppointmentDate,
                SubmitType: 0,
                AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
                AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey
            })
        }

    }

    const handleOnChangeSelect = (value, name) => {
        setFormData({ ...formData, [name]: value })
    }

    const normFile = e => {
        if (Array.isArray(e)) {
            return e;
        }

        return e && e.fileList;
    };

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

    const onSaveWithPurchaser = () => {
        onSave()
        setTriggerPurchaserSubmitStatus(true)
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
                    onFinish={handleSubmit}
                    form={form}
                >

                    <Heading>Property Details</Heading>
                    <Row gutter="24" >
                        <Col span="8" >
                            <FormItem
                                label="UPN"
                            >
                                <Input size="large" readOnly defaultValue={verifyUpnAndMobileSubmitOtpState.data.ProertyDetails.UPN} />
                            </FormItem>
                        </Col>
                        <Col span="8" >
                            <FormItem
                                label="Area"
                            >
                                <Input size="large" readOnly defaultValue={verifyUpnAndMobileSubmitOtpState.data.ProertyDetails.Area} />
                            </FormItem>
                        </Col>
                        <Col span="8" >
                            <FormItem
                                label="Authority Name"
                            >
                                <Input size="large" readOnly defaultValue={verifyUpnAndMobileSubmitOtpState.data.ProertyDetails.AuthorityName} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter="24" >
                        <Col span="8" >
                            <FormItem
                                label="Plot Number"
                            >
                                <Input size="large" readOnly defaultValue={verifyUpnAndMobileSubmitOtpState.data.ProertyDetails.PlotNumber} />
                            </FormItem>
                        </Col>
                        <Col span="8" >
                            <FormItem
                                label="Property Type"
                            >
                                <Input size="large" readOnly defaultValue={verifyUpnAndMobileSubmitOtpState.data.ProertyDetails.PropertyType} />
                            </FormItem>
                        </Col>
                        <Col span="8" >
                            <FormItem
                                label="Scheme Name"
                            >
                                <Input size="large" readOnly defaultValue={verifyUpnAndMobileSubmitOtpState.data.ProertyDetails.SchemeName} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter="24" >
                        <Col span="8" >
                            <FormItem
                                label="Reserved Price"
                            >
                                <Input size="large" readOnly defaultValue={verifyUpnAndMobileSubmitOtpState.data.ProertyDetails.ReservedPrice} />
                            </FormItem>
                        </Col>
                        <Col span="8" >
                            <FormItem
                                label="Sale Type"
                            >
                                <Input size="large" readOnly defaultValue={verifyUpnAndMobileSubmitOtpState.data.ProertyDetails.SaleType} />
                            </FormItem>
                        </Col>
                        <Col span="8" >
                            <FormItem
                                label="Usage Type"
                            >
                                <Input size="large" readOnly defaultValue={verifyUpnAndMobileSubmitOtpState.data.ProertyDetails.UsageType} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Heading style={{ marginTop: 16 }}>Applicant Details</Heading>
                    <Row gutter="24" >
                        <Col span="8" >
                            <FormItem
                                name="Owner"
                                label="Applying on behalf of"
                            >
                                <Input size="large" readOnly defaultValue={verifyUpnAndMobileState.data.OwnerName} />
                            </FormItem>
                        </Col>

                        {serviceId === '1509' || serviceId === '1508' || serviceId === '26' || serviceId === '25' || serviceId === '32' ?
                            null :
                            verifyUpnAndMobileSubmitOtpState.data.IsConveyanceDeedTaken === "Yes" &&
                            <Col span="8" >
                                <FormItem
                                    name="PermissionType"
                                    label="Select permission for"
                                    rules={[{ required: true, message: 'Required' }]}
                                >
                                    <Select
                                        name="PermissionType"
                                        placeholder="Select Permission against"
                                        size="large"
                                        showSearch
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        notFoundContent={<SelectSearchNotFound />}
                                        onSelect={(v) => handleOnChangeSelect(v, 'PermissionType')}
                                    >
                                        <Option key={"Sale"} value={"Sale"} >Sale</Option>
                                        <Option key={"Gift"} value={"Gift"} >Gift</Option>
                                        <Option key={"Transfer"} value={"Transfer"} >Transfer</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                        }
                        {formData.PermissionType === "Transfer" &&
                            <>
                                <Col span="8" >
                                    <FormItem
                                        name="Relation"
                                        label="Select relation with purchaser"
                                        rules={[{ required: true, message: 'Required' }]}
                                    >
                                        <Select
                                            name="Relation"
                                            size="large"
                                            onSelect={(v) => handleOnChangeSelect(v, 'Relation')}
                                            placeholder="Select Relation with Purchasers"
                                            showSearch
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                            notFoundContent={<SelectSearchNotFound />}
                                        >
                                            <Option key={"WithinFamily"} value={"WithinFamily"} >Within Family</Option>
                                            <Option key={"OutsideFamily"} value={"OutsideFamily"} >Outside Family</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span="8" >
                                    <FormItem
                                        name="Share"
                                        label="Share to be transferred"
                                        rules={[
                                            { required: true, message: 'Required' },
                                        ]}
                                    >
                                        <InputNumber
                                            size="large"
                                            style={{ width: '100%' }}
                                            name="Share"
                                            defaultValue={100}
                                            min={1}
                                            max={100}
                                            placeholder="Enter shares"
                                            formatter={value => `${value}%`}
                                            parser={value => value.replace('%', '')}
                                            onChange={(v) => handleOnChangeSelect(v, 'Share')}
                                        />
                                    </FormItem>
                                </Col>
                            </>
                        }

                        <Col span="16" >
                            <FormItem
                                label="Remark"
                                name="Remark"
                            >
                                <Input size="large" name="Remark" onChange={handleOnChange} showCount maxLength={200} />
                            </FormItem>
                        </Col>
                    </Row>
                    {applicationId > 0 &&
                        <>
                            <Heading style={{ marginTop: 16 }}>GPA Details of Applicant</Heading>
                            {!visibleGpa &&
                                <>
                                    {(transferApplicationFetchState.apiState === 'success' && transferApplicationFetchState.data.AppliedOwner.length > 0 && transferApplicationFetchState.data.AppliedOwner[0].GPADetails.Id > 0) &&
                                        <>
                                            <Row gutter="24" >
                                                <Col span="8" >
                                                    <FormItem
                                                        label="Name"
                                                    >
                                                        <Input size="large" readOnly defaultValue={transferApplicationFetchState.data.AppliedOwner[0].GPADetails.Name} />
                                                    </FormItem>
                                                </Col>
                                                <Col span="8" >
                                                    <FormItem
                                                        label="Father Name / Husband Name"
                                                    >
                                                        <Input size="large" readOnly defaultValue={transferApplicationFetchState.data.AppliedOwner[0].GPADetails.FName} />
                                                    </FormItem>
                                                </Col>

                                            </Row>
                                            <Row gutter="24" >
                                                <Col span="16" >
                                                    <FormItem
                                                        label="Address"
                                                    >
                                                        <Input size="large" readOnly defaultValue={transferApplicationFetchState.data.AppliedOwner[0].GPADetails.Address} />
                                                    </FormItem>
                                                </Col>
                                            </Row>

                                        </>

                                    }
                                    <Row>
                                        <Col span="16" >
                                            <FormItem
                                            >
                                                {(transferApplicationFetchState.apiState === 'success' && transferApplicationFetchState.data.AppliedOwner.length > 0 && transferApplicationFetchState.data.AppliedOwner[0].GPADetails.Id > 0) &&
                                                    <Space>
                                                        <Button onClick={() => editGpa(transferApplicationFetchState.data.AppliedOwner[0].GPADetails)}>Edit GPA</Button>
                                                        <Popconfirm
                                                            title="Confirm delete?"
                                                            onConfirm={() => removeGpa(transferApplicationFetchState.data.AppliedOwner[0].GPADetails)}
                                                            okText="Yes"
                                                            cancelText="No"
                                                        >
                                                            <Button danger>Remove GPA</Button>
                                                        </Popconfirm>
                                                    </Space>

                                                }
                                            </FormItem>
                                        </Col>
                                    </Row>
                                </>
                            }
                        </>
                    }

                    {/* GPA Form */}

                    {visibleGpa &&
                        <>
                            <Row>
                                <Col span="24" >
                                    <p>If applying as GPA, please provide GPA details below and click on Save GPA Details.</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="24" >
                                    <Form form={gpaForm} layout="vertical" onFinish={onFinishGpa} >
                                        <Row gutter={24}>
                                            <Col xs={24} sm={24} md={16} lg={16} xl={8}>
                                                <FormItem
                                                    name="Name"
                                                    label="Name"
                                                    rules={[{ required: true, message: 'Required' }]}
                                                >
                                                    <Input name="Name" placeholder="Name" size="large" onChange={handleOnChangeGpa} />
                                                </FormItem>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <FormItem
                                                    name="FName"
                                                    label="Father Name / Husband Name"
                                                    rules={[{ required: true, message: 'Required' }]}
                                                >
                                                    <Input name="FName" placeholder="Enter Father Name / Husband Name" size="large" onChange={handleOnChangeGpa} />
                                                </FormItem>
                                            </Col>
                                        </Row>

                                        <Row gutter={24}>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                <FormItem
                                                    name="Address"
                                                    label="Address"
                                                    rules={[{ required: true, message: 'Required' }]}
                                                >
                                                    <Input name="Address" placeholder="Enter Address" size="large" onChange={handleOnChangeGpa} />
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row gutter={24}>
                                            <Col span="24" >
                                                <FileTitle>
                                                    <span>1. </span>
                                                    <ValidationDiv>
                                                        Upload GPA
                                                    </ValidationDiv>
                                                </FileTitle>
                                            </Col>
                                            <Col span="24" >
                                                <Form.Item
                                                    name="UploadGPA"
                                                    getValueFromEvent={normFile}
                                                    style={{ paddingLeft: 22 }}
                                                >
                                                    <DocumentUpload
                                                        name="UploadGPA"
                                                        listType="picture-card"
                                                        onPreview={() => onPreview(_.find(defaultFileListGpa, { 'documentTypeId': 812 }))}
                                                        action={`${conf.api.base_url}DMS_DocumentService/UploadGPADocument?ApiKey=UploadGPADocument&OrgId=${OrgId}&EntityType=${gpaFormData.EntityType}&EntityId=${gpaFormData.EntityId}&DocumentTypeId=812&DocumentName=GPA Document`}
                                                        headers={{
                                                            'AuthToken': verifyUpnAndMobileSubmitOtpState.AuthToken,
                                                            'AuthTokenKey': verifyUpnAndMobileSubmitOtpState.AuthTokenKey
                                                        }}
                                                        beforeUpload={file => {
                                                            setGpaFormData({
                                                                ...gpaFormData,
                                                                ["UploadGPA"]: true
                                                            })
                                                            setFilesGpa({
                                                                ...filesGpa,
                                                                ["UploadGPA"]: file
                                                            })
                                                            setFileListGpa(state => ({
                                                                ...fileListGpa,
                                                                ["UploadGPA"]: []
                                                            }))
                                                            setSubmitDocumentStatus(true)
                                                            return true
                                                        }}
                                                        onError={(info) => {
                                                            setSubmitDocumentStatus(false)
                                                            setGpaFormData({ ...gpaFormData, ["UploadGPA"]: false })
                                                        }}
                                                        onRemove={file => {
                                                            setFileListGpa(state => ({
                                                                ...fileListGpa,
                                                                ["UploadGPA"]: []
                                                            }))
                                                            const defaultFileLists = defaultFileListGpa;
                                                            let fileArr = []
                                                            defaultFileLists.forEach(item => {
                                                                if (item.documentTypeId !== 812) {
                                                                    fileArr.push(item)
                                                                }
                                                            })
                                                            setDefaultFileListGpa(fileArr)
                                                        }}
                                                        onSuccess={(response) => {
                                                            if (response.Status === 2) {
                                                                let fileArr = []
                                                                const defaultFileLists = defaultFileListGpa;
                                                                defaultFileLists.forEach((defaultItem) => {
                                                                    fileArr.push(defaultItem)
                                                                })
                                                                let extension = filesGpa["UploadGPA"].name.substr(filesGpa["UploadGPA"].name.lastIndexOf(".") + 1)
                                                                let filePrependString = ""
                                                                if (extension === 'jpg' || extension === 'jpeg' || extension === 'png') {
                                                                    filePrependString = `data:image/${extension};base64,${response.CustomObject.FileData}`
                                                                }
                                                                else {
                                                                    filePrependString = `data:application/${extension};base64,${response.CustomObject.FileData}`
                                                                }
                                                                fileArr.push({
                                                                    documentTypeId: 812,
                                                                    uid: response.CustomObject.DocumentId,
                                                                    name: filesGpa["UploadGPA"].name,
                                                                    status: 'done',
                                                                    url: filePrependString,
                                                                    thumbUrl: filePrependString,
                                                                    preview: filePrependString,
                                                                })
                                                                setDefaultFileListGpa(fileArr)
                                                                setFileListGpa(state => ({
                                                                    ...fileListGpa,
                                                                    ["UploadGPA"]: [{
                                                                        documentTypeId: 812,
                                                                        uid: response.CustomObject.DocumentId,
                                                                        name: filesGpa["UploadGPA"].name,
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
                                                                setGpaFormData({ ...gpaFormData, ["UploadGPA"]: false })
                                                            }
                                                            else {
                                                                setGpaFormData({ ...gpaFormData, ["UploadGPA"]: false })
                                                            }
                                                            setSubmitDocumentStatus(false)
                                                        }}
                                                        defaultFileList={_.find(defaultFileListGpa, { 'documentTypeId': 812 }) ? [_.find(defaultFileListGpa, { 'documentTypeId': 812 })] : []}
                                                        fileList={fileListGpa["UploadGPA"]}
                                                    >
                                                        {_.find(defaultFileListGpa, { 'documentTypeId': 812 }) ? null : <Button icon={<UploadOutlined />}
                                                            loading={gpaFormData.UploadGPA}
                                                        >Click to Upload</Button>
                                                        }
                                                    </DocumentUpload>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={24}>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                <Form.Item>
                                                    <Space size="middle" >

                                                        <BlueButton disabled={submitDocumentStatus} htmlType="submit" loading={saveGpaState.apiState === "loading" || submitBtnLoading ? true : false} >Save GPA Details</BlueButton>
                                                        {(getPurchaserListState.data
                                                            && getPurchaserListState.data.length > 0) &&
                                                            <TextButton icon={<CloseCircleOutlined />} onClick={() => {
                                                                setVisibleGpa(false)
                                                                setGpaFormData(initialGpaFormData)
                                                                setDefaultFileListGpa([])
                                                                setFileListGpa([])
                                                                setFilesGpa([])
                                                                gpaForm.resetFields()
                                                            }
                                                            } > Cancel</TextButton>
                                                        }
                                                    </Space>
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
                                    </Form>
                                </Col>
                            </Row>
                        </>
                    }


                    <Heading style={{ marginTop: 16 }}>{props.changeOfOwnerShip ? "Transferee's" : "Purchaser's"} Details</Heading>
                    <PurchaserDetails
                        triggerDraftSave={onSaveWithPurchaser}
                        triggerFetchApplication={fetchApplication}
                        applicationId={applicationId}
                        changeOfOwnerShip={props.changeOfOwnerShip}
                        serviceId={props.serviceId}
                        triggerPurchaserSubmit={triggerPurchaserSubmit}
                    />
                    <Heading style={{ marginTop: 16 }}>Legal Heir Details</Heading>
                    <LegalHeirForm
                        OrgId={OrgId}
                        applicationId={applicationId}
                        PurchaserOrTransferee={props.changeOfOwnerShip ? "Transferee" : "Purchaser"}
                        changeOfOwnerShip={props.changeOfOwnerShip}
                        triggerFetchApplication={fetchApplication}
                        serviceId={props.serviceId}
                    />

                    {getDocumentListState.apiState === "success" &&
                        <>
                            <Heading style={{ marginTop: 36 }}>Documents Required</Heading>
                            {getDocumentListState.list.map((item, idx) => (
                                <>
                                    <Row gutter="24" >
                                        <Col span="24" >
                                            <FileTitle >
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
                                                    { required: _.find(defaultFileList, { 'documentTypeId': item.DocumentTypeId }) ? false : item.IsMandatory, message: 'Required' },
                                                ]}
                                                style={{ paddingLeft: 22 }}
                                            >

                                                <DocumentUpload
                                                    name={item.Name}
                                                    listType="picture-card"
                                                    onPreview={() => onPreview(_.find(defaultFileList, { 'documentTypeId': item.DocumentTypeId }))}
                                                    action={encodeURI(`${conf.api.base_url}DMS_DocumentService/UploadDocument?ApiKey=UploadDocument&OrgId=${OrgId}&ApplicationTypeId=${serviceId}&DocumentTypeId=${item.DocumentTypeId}&Documentname=${item.Name}&EntityTypeID=111&ApplicationId=${getDocumentListState.EntityId}&PhysicalVerificationRequired=${item.IsPVerificationRequired ? 1 : 0}`)}
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
                                                    onError={(info) => {
                                                        setSubmitDocumentStatus(false)
                                                    }}
                                                    onRemove={file => {
                                                        const defaultFileLists = defaultFileList;
                                                        let DocumentTypeId = item.DocumentTypeId
                                                        fetch(`${conf.api.base_url}DMS_DocumentService/DeleteUploadedDocument?ApiKey=DeleteUploadedDocument&OrgId=${OrgId}&DocumentId=${_.find(defaultFileList, { 'documentTypeId': item.DocumentTypeId }) ? _.find(defaultFileList, { 'documentTypeId': DocumentTypeId }).uid : documentFileId[idx]}`, {
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
                                                                return true
                                                            } else {
                                                                return null
                                                            }
                                                        }).catch(console.log)
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
                        <Space size="middle" >
                            <BlueButton disabled={submitDocumentStatus} onClick={onSave} loading={(saveChangeOfOwnershipApplicationState.apiState === "loading" || transferApplicationSaveState.apiState === "loading") ? true : false} >Save Application As Draft</BlueButton>

                            <BlueButton disabled={submitDocumentStatus} loading={(saveChangeOfOwnershipApplicationState.apiState === "loading" || transferApplicationSaveState.apiState === "loading") ? true : false} htmlType="submit" >Submit Application For Processing</BlueButton>

                        </Space>
                    }
                </Form>
            </Container>
        </>
    )
}

const mapStateToProps = (state) => ({
    getServiceDetailState: state.getServiceDetail,
    getDocumentListState: state.getDocumentList,
    verifyUpnAndMobileSubmitOtpState: state.verifyUpnAndMobileSubmitOtp,
    verifyUpnAndMobileState: state.verifyUpnAndMobile,
    transferApplicationSaveState: state.transferApplicationSave,
    transferApplicationFetchState: state.transferApplicationFetch,
    transferApplicationDeleteState: state.transferApplicationDelete,
    getAppointmentDateState: state.getAppointmentDate,
    saveChangeOfOwnershipApplicationState: state.saveChangeOfOwnershipApplication,
    saveGpaState: state.saveGpa,
    deleteGpaState: state.deleteGpa,
    getLegalHeirListState: state.getLegalHeirList,
    getPurchaserListState: state.getPurchaserList,
})

const mapDispatchToProps = (dispatch) => ({
    getDocumentList: (params) => dispatch(getDocumentList(params)),
    saveTransferApplication: (params) => dispatch(saveTransferApplication(params)),
    fetchTransferApplication: (params) => dispatch(fetchTransferApplication(params)),
    getAppintmentDate: (params) => dispatch(deleteTransferApplication(params)),
    resetStateFetchTransferApplication: () => dispatch(resetStateFetchTransferApplication()),
    saveTransferApplicationResetState: () => dispatch(saveTransferApplicationResetState()),
    getAppointmentDate: (params) => dispatch(getAppointmentDate(params)),
    getAppointmentDateResetState: () => dispatch(getAppointmentDateResetState()),
    getDocumentListResetState: () => dispatch(getDocumentListResetState()),
    saveChangeOfOwnershipApplication: (params) => dispatch(saveChangeOfOwnershipApplication(params)),
    resetStateSaveChangeOfOwnershipApplication: () => dispatch(resetStateSaveChangeOfOwnershipApplication()),
    saveGpa: (params) => dispatch(saveGpa(params)),
    saveGpaResetState: () => dispatch(saveGpaResetState()),
    deleteGpa: (params) => dispatch(deleteGpa(params)),
    deleteGpaResetState: () => dispatch(deleteGpaResetState()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationForm)