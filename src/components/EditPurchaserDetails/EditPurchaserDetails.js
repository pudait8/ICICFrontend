import React, { useEffect, useState } from "react"
import { Form, Row, Col, Input, Select, notification, Button, Popconfirm, Tag, Space, Modal } from "antd"
import { CloseCircleOutlined, UploadOutlined } from '@ant-design/icons'
import { connect } from "react-redux"
import PropsTypes from "prop-types"
import _ from "lodash"
import { useMediaQuery } from 'react-responsive'



// components
import { FlexDiv, DocumentUpload, TextButton, FormItem, ValidationDiv, BlueButton, FileTitle } from '../Xcomponents'
import { PurchaserContainer, Purchaser, Name, Details, Mobile, Image } from "./EditPurchaserDetailsStyle"

// actions
import { savePurchaserTransferApplication, savePurchaserTransferApplicationReset } from '../../actions/transferApplicationSavePurchaserActions'
import { deletePurchaserTransferApplication } from '../../actions/transferApplicationDeletePurchaserActions'
import { getSalutationList } from '../../actions/getSalutationListActions'
import { getPurchaserList, getPurchaserListResetState } from '../../actions/getPurchaserListAction'

// others
import conf from '../../config'
import { getAuthData, getOrgId } from '../../utils'


const Option = Select.Option

const EditPurchaserDetails = props => {

    // variables
    const {
        savePurchaserTransferApplication, transferApplicationSavePurchaserState, savePurchaserTransferApplicationReset,
        transferApplicationSaveState,
        viewEditApplicationState,
        deletePurchaserTransferApplication, transferApplicationDeletePurchaserState,
        getSalutationList, getSalutationListState,
        verifyUpnAndMobileSubmitOtpState,
        getPurchaserList, getPurchaserListState, getPurchaserListResetState,
    } = props
    const [openFrom, setOpenFrom] = useState(true)
    const [legalHeirFormVisible, setLegalHeirFormVisible] = useState(false)
    const initialFormDataNew = {
        Salutation: "",
        Name: "",
        FatherName: "",
        Address: "",
        Gender: "",
        MobileNumber: "",
        EmailAddress: "",
        IdentityProofUploaded: false,
        PhotoUploaded: false,
        SignatureUploaded: false,
        TempPhotoId: "",
        TempSignId: "",
        TempIdentityProofId: "",
        IsPrimary: "N",
        PurchaserId: 0,
        EntityId: 0
    }
    const initialFormData = {
        Salutation: "",
        Name: "",
        FatherName: "",
        Address: "",
        Gender: "",
        MobileNumber: "",
        EmailAddress: "",
        IdentityProofUploaded: false,
        PhotoUploaded: false,
        SignatureUploaded: false,
        TempPhotoId: "",
        TempSignId: "",
        TempIdentityProofId: "",
        IsPrimary: "Y",
        PurchaserId: 0,
        EntityId: 0
    }
    const [formData, setFormData] = useState(initialFormData)
    const [form] = Form.useForm()
    const headers = {
        'AuthKey': getAuthData().AuthKey,
        'AuthId': getAuthData().AuthId,
    }
    const [displayFileValidation, setDisplayFileValidation] = useState(false)
    const [purchaserId, setPurchaserId] = useState(0)
    const isMobileL = useMediaQuery({ query: '(max-width: 425px)' })
    const [submitBtnLoading, setSubmitBtnLoading] = useState(false)
    const [displayPrimaryAddPurchaserBtn, setDisplayPrimaryAddPurchaserBtn] = useState(false)
    const [fileList, setFileList] = useState([])
    const [defaultFileList, setDefaultFileList] = useState([])

    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [currentFileType, setCurrentFileType] = useState(''); // Current file format
    const [submitDocumentStatus, setSubmitDocumentStatus] = useState(false); // Current file format

    const [files, setFiles] = useState([])
    const OrgId = getOrgId()
    const serviceId = props.serviceId
    // callbacks

    useEffect(() => {
        return (() => {
            savePurchaserTransferApplicationReset()
            getPurchaserListResetState()
        })
    }, [])
    /* call salutation list on component mount */
    useEffect(() => {
        getSalutationList({
            OrgId: OrgId,
            AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
            AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey
        })
        callGetPurchaserList()
    }, [])

    const callGetPurchaserList = () => {
        getPurchaserList({
            OrgId: OrgId,
            ApplicationId: props.applicationId,
            AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
            AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey
        })
    }

    useEffect(() => {
        if (transferApplicationSavePurchaserState.apiState === "alert") {
            transferApplicationSavePurchaserState.apiState = ""
            notification.error({
                message: transferApplicationSavePurchaserState.alertMessage,
                placement: "bottomRight"
            })
        }

        if (transferApplicationSavePurchaserState.apiState === "error") {
            transferApplicationSavePurchaserState.apiState = ""
            notification.error({
                message: "Something went wrong, please try again.",
                placement: "bottomRight"
            })
        }

        if (transferApplicationSavePurchaserState.apiState === "success") {
            transferApplicationSavePurchaserState.apiState = ""
            setOpenFrom(false)
            setFormData(initialFormData)
            setDefaultFileList([])
            setFileList([])
            setFiles([])
            form.resetFields()
            notification.success({
                message: props.changeOfOwnerShip ? "Transferee added successfully" : "Purchaser added successfully",
                placement: "bottomRight"
            })
            // props.refreshApplication()
            // props.triggerFetchApplication()
            callGetPurchaserList()
        }
    }, [transferApplicationSavePurchaserState.apiState])



    useEffect(() => {
        if (transferApplicationDeletePurchaserState.apiState === "alert") {
            transferApplicationDeletePurchaserState.apiState = ""
            notification.error({
                message: transferApplicationDeletePurchaserState.alertMessage,
                placement: "bottomRight"
            })
        }

        if (transferApplicationDeletePurchaserState.apiState === "error") {
            transferApplicationDeletePurchaserState.apiState = ""
            notification.error({
                message: "Something went wrong, please try again.",
                placement: "bottomRight"
            })
        }

        if (transferApplicationDeletePurchaserState.apiState === "success") {
            transferApplicationDeletePurchaserState.apiState = ""
            setOpenFrom(false)
            setFormData(initialFormData)
            setDefaultFileList([])
            setFileList([])
            setFiles([])
            form.resetFields()
            notification.success({
                message: props.changeOfOwnerShip ? "Transferee has been deleted" : "Purchaser has been deleted",
                placement: "bottomRight"
            })
            // props.triggerFetchApplication()
            callGetPurchaserList()
        }
    }, [transferApplicationDeletePurchaserState.apiState])


    useEffect(() => {
        if (transferApplicationSaveState.apiState === "success" && props.applicationId) {
            if (formData.Salutation) {
                setSubmitBtnLoading(false)
                setDisplayFileValidation(false)
                transferApplicationSaveState.apiState = ""
                savePurchaserTransferApplication({
                    OrgId: OrgId,
                    PurchaserId: formData.PurchaserId,
                    ApplicationId: props.applicationId,
                    PropertyRefId: viewEditApplicationState.data.PropertyRefId,
                    Salutation: formData.Salutation,
                    Name: formData.Name,
                    FatherName: formData.FatherName,
                    Address: formData.Address,
                    Gender: formData.Gender,
                    MobileNumber: formData.MobileNumber,
                    EmailAddress: formData.EmailAddress,
                    TempPhotoId: formData.TempPhotoId,
                    TempSignId: formData.TempSignId,
                    TempIdentityProofId: formData.TempIdentityProofId,
                    IsPrimary: formData.IsPrimary,
                    AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
                    AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey
                })
            }
        }
    }, [transferApplicationSaveState.apiState, props.applicationId])

    // useEffect(() => {
    //     if (props.triggerPurchaserSubmit) {
    //         onFinish()
    //     }
    // }, [props.triggerPurchaserSubmit])


    useEffect(() => {
        if (getPurchaserListState.apiState === "success") {
            if (getPurchaserListState.data && getPurchaserListState.data.length > 0) {
                setOpenFrom(false)
            }
            else {
                setOpenFrom(true)
                setDefaultFileList([])
                setFileList([])
                setFiles([])
                if (serviceId !== '25') {
                    form.resetFields()
                }
            }
        }
    }, [getPurchaserListState])

    useEffect(() => {
        if (getPurchaserListState.apiState === "success") {
            if (serviceId === '25') {

                if (getPurchaserListState.data && getPurchaserListState.data.length > 0) {

                }
                else {

                    form.resetFields()
                    let editFormData = {
                        Name: getPurchaserListState.data[0].Name,
                        FatherName: getPurchaserListState.data[0].FatherName,
                        Address: getPurchaserListState.data[0].Address,
                        MobileNumber: getPurchaserListState.data[0].MobileNumber,
                        EmailAddress: getPurchaserListState.data[0].EmailAddress,
                        PurchaserId: getPurchaserListState.data[0].PurchaserId,
                        EntityId: getPurchaserListState.data[0].PurchaserId,
                        IsPrimary: 'Y',
                    }
                    let editFormDataValue = {
                        Name: getPurchaserListState.data[0].Name,
                        FatherName: getPurchaserListState.data[0].FatherName,
                        Address: getPurchaserListState.data[0].Address,
                        Gender: getPurchaserListState.data[0].Gender,
                        MobileNumber: getPurchaserListState.data[0].MobileNumber,
                        EmailAddress: getPurchaserListState.data[0].EmailAddress,
                        PurchaserId: getPurchaserListState.data[0].PurchaserId,
                        IsPrimary: 'Y',
                    }
                    setFormData(editFormData)
                    form.setFieldsValue(editFormDataValue)
                }
            }
        }
    }, [getPurchaserListState])
    // functions
    const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSalutationSelect = (Salutation) => {
        setFormData({ ...formData, ["Salutation"]: Salutation })
    }



    const onFinish = () => {
        if (props.applicationId) {
            let temp = {}
            if (formData.TempPhotoId !== "") {
                temp['TempPhotoId'] = formData.TempPhotoId
            }
            if (formData.TempSignId !== "") {
                temp['TempSignId'] = formData.TempSignId
            }
            if (formData.TempIdentityProofId !== "") {
                temp['TempIdentityProofId'] = formData.TempIdentityProofId
            }
            savePurchaserTransferApplication({
                OrgId: OrgId,
                PurchaserId: formData.PurchaserId,
                ApplicationId: props.applicationId,
                PropertyRefId: viewEditApplicationState.data.PropertyRefId,
                Salutation: formData.Salutation,
                Name: formData.Name,
                FatherName: formData.FatherName,
                Address: formData.Address,
                Gender: formData.Gender,
                MobileNumber: formData.MobileNumber,
                EmailAddress: formData.EmailAddress,
                IsPrimary: formData.IsPrimary,
                AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
                AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey,
                ...temp
            })

        } else {
            props.triggerDraftSave()
            setSubmitBtnLoading(true)
        }
    }
    const editPurchaserDetails = (purchaser) => {
        form.resetFields()
        let editFormData = {
            Salutation: purchaser.SalutationId,
            Name: purchaser.Name,
            FatherName: purchaser.FatherName,
            Address: purchaser.Address,
            Gender: purchaser.Gender,
            MobileNumber: purchaser.MobileNumber,
            EmailAddress: purchaser.EmailAddress,
            IsPrimary: purchaser.IsPrimary,
            PurchaserId: purchaser.PurchaserId,
            EntityId: purchaser.PurchaserId
        }
        let editFormDataValue = {
            Salutation: purchaser.Salutation,
            Name: purchaser.Name,
            FatherName: purchaser.FatherName,
            Address: purchaser.Address,
            Gender: purchaser.Gender,
            MobileNumber: purchaser.MobileNumber,
            EmailAddress: purchaser.EmailAddress,
            IsPrimary: purchaser.IsPrimary,
            PurchaserId: purchaser.PurchaserId
        }
        setFormData(editFormData)
        form.setFieldsValue(editFormDataValue)
        let fileArr = []
        purchaser.PurchaserDocument.map((item) => {
            let extension = item.FileName.substr(item.FileName.lastIndexOf(".") + 1)
            let filePrependString = ""
            if (extension === 'jpg' || extension === 'jpeg' || extension === 'png') {
                filePrependString = `data:image/${extension};base64,${item.FileData}`
            }
            else {
                filePrependString = `data:application/${extension};base64,${item.FileData}`
            }
            if (item.DocumentTypeId === 3) {
                fileArr.push({
                    documentTypeId: item.DocumentTypeId,
                    uid: item.DocumentId,
                    name: item.FileName,
                    status: 'done',
                    url: filePrependString,
                    thumbUrl: filePrependString,
                    preview: filePrependString,
                })
            }
            else if (item.DocumentTypeId === 2) {
                fileArr.push({
                    documentTypeId: item.DocumentTypeId,
                    uid: item.DocumentId,
                    name: item.FileName,
                    status: 'done',
                    url: filePrependString,
                    thumbUrl: filePrependString,
                    preview: filePrependString,
                })
            }
            else if (item.DocumentTypeId === 1) {

                fileArr.push({
                    documentTypeId: item.DocumentTypeId,
                    uid: item.DocumentId,
                    name: item.FileName,
                    status: 'done',
                    url: filePrependString,
                    thumbUrl: filePrependString,
                    preview: filePrependString,
                })
            }
        })
        setDefaultFileList(fileArr)
        setOpenFrom(true)
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


    return (
        <>
            {/* START: To display primary purchaer */}
            <PurchaserContainer>
                {getPurchaserListState.data
                    && getPurchaserListState.data.length > 0
                    && getPurchaserListState.data.map((purchaser, index) => {
                        let photo = null
                        _.forEach(purchaser.PurchaserDocument, function (item) {
                            if (item.DocumentName === "Photo") {
                                photo = item.FileData
                            }
                        })
                        return (
                            <>
                                <Purchaser>
                                    <Image>
                                        {index + 1}.
                                    </Image>
                                    <Image>
                                        {photo &&
                                            <img src={`data:image/jpg;base64,${photo}`} alt="" style={{ width: "76px", height: "76px" }} />}
                                    </Image>
                                    <Details>
                                        <FlexDiv align="left">
                                            <Name>{`${purchaser.Salutation} ${purchaser.Name}`}</Name>
                                            {purchaser.IsPrimary === 'Y' &&
                                                <Tag color="gold">Primary {props.changeOfOwnerShip ? "Transferee" : "Purchaser"}</Tag>
                                            }
                                        </FlexDiv>

                                        <Mobile>{purchaser.MobileNumber || ""} {purchaser.EmailAddress ? " | " + purchaser.EmailAddress : ""}</Mobile>
                                        <FlexDiv align="left">
                                            <Space>
                                                <Button onClick={() => editPurchaserDetails(purchaser)}>Edit</Button>
                                                {purchaser.IsPrimary === 'N' &&
                                                    <Popconfirm
                                                        title="Confirm delete?"
                                                        onConfirm={() => deletePurchaserTransferApplication({
                                                            OrgId: OrgId,
                                                            PurchaserId: purchaser.PurchaserId,
                                                            AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
                                                            AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey
                                                        })}
                                                        okText="Yes"
                                                        cancelText="No"
                                                    >
                                                        <Button danger>Remove</Button>
                                                    </Popconfirm>
                                                }
                                            </Space>
                                        </FlexDiv>
                                    </Details>
                                </Purchaser>
                            </>
                        )
                    })
                }

            </PurchaserContainer>
            <div>
                {(getPurchaserListState.data
                    && getPurchaserListState.data.length > 0) &&
                    <>
                        <div style={{ marginBottom: 20 }}>
                            <BlueButton
                                onClick={() => {
                                    setOpenFrom(true)
                                    setFormData(initialFormDataNew)
                                    setDefaultFileList([])
                                    setFileList([])
                                    setFiles([])
                                    form.resetFields()
                                }}
                                style={{ marginTop: 16, marginBottom: 16 }}
                            >
                                {props.changeOfOwnerShip
                                    ? "Add More Transferee"
                                    : "Add More Purchaser"
                                }
                            </BlueButton>
                        </div>
                    </>
                }
            </div>
            {/* END: To display primary purchaer */}
            {openFrom &&

                <Form form={form} layout="vertical" onFinish={onFinish} style={{ backgroundColor: '#f5f5f5b5', padding: '20px' }} >
                    <Row gutter={24}>
                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                            <FormItem
                                name="Salutation"
                                label={"Salutation"}
                                rules={[{ required: true, message: 'Required' }]}
                            >
                                <Select name="Salutation" size="large" style={{ width: '100%' }} placeholder="Salutation" onSelect={handleSalutationSelect} >
                                    {getSalutationListState.list.map(item => (<Option key={item.Id} value={item.Id}>{item.Name}</Option>))}
                                </Select>
                            </FormItem>
                        </Col>
                        <Col xs={24} sm={24} md={16} lg={16} xl={8}>
                            <FormItem
                                name="Name"
                                label={props.changeOfOwnerShip ? "Transferee's Name" : "Purchaser Name"}
                                rules={[{ required: true, message: 'Required' }]}
                            >
                                <Input name="Name" placeholder="Name" size="large" onChange={handleOnChange} />
                            </FormItem>
                        </Col>
                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                            <FormItem
                                name="FatherName"
                                label={`${formData.Salutation === 88 ? 'Husband Name' : 'Father Name'}`}
                                rules={[{ required: true, message: 'Required' }]}
                            >
                                <Input name="FatherName" placeholder="Enter Father Name" size="large" onChange={handleOnChange} />
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
                                <Input name="Address" placeholder="Enter Address" size="large" onChange={handleOnChange} />
                            </FormItem>
                        </Col>
                    </Row>

                    <Row gutter={24}>
                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                            <FormItem
                                name="MobileNumber"

                                label="Mobile"
                                rules={[
                                    { required: true, message: 'Required' },
                                    {
                                        pattern: new RegExp('^[6-9]\\d{9}$'),
                                        message: 'Mobile number is not valid',
                                    }
                                ]}
                            >
                                <Input name="MobileNumber" placeholder="Enter Mobile" size="large" onChange={handleOnChange} />
                            </FormItem>
                        </Col>
                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                            <FormItem
                                name="EmailAddress"
                                label="Email"
                                rules={[
                                    { required: true, message: 'Required' },
                                    { type: 'email', message: 'Email is not valid' },
                                ]}
                            >
                                <Input name="EmailAddress" placeholder="Enter Email" size="large" onChange={handleOnChange} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span="24" >
                            <FileTitle>
                                <span>1. </span>
                                <ValidationDiv className="validate">
                                    Identity Proof of {props.changeOfOwnerShip ? 'Transferee' : 'Purchaser'}  (Aadhaar Card, PAN Card, Driving License or Passport)
                                </ValidationDiv>
                            </FileTitle>
                        </Col>
                        <Col span="24" >
                            <Form.Item
                                name="Identity Proof of Purchaser"
                                getValueFromEvent={normFile}
                                rules={[
                                    { required: _.find(defaultFileList, { 'documentTypeId': 3 }) ? false : true, message: 'Required' },
                                ]}
                                style={{ paddingLeft: 22 }}
                            >
                                <DocumentUpload
                                    name="Identity Proof of Purchaser"
                                    listType="picture-card"
                                    onPreview={() => onPreview(_.find(defaultFileList, { 'documentTypeId': 3 }))}
                                    action={`${conf.api.base_url}DMS_DocumentService/UploadPurchaserLegalHeirDocument?ApiKey=UploadPurchaserLegalHeirDocument&OrgId=${OrgId}&EntityType=900&EntityId=${formData.EntityId}&DocumentTypeId=3&DocumentName=IdentityProof`}
                                    headers={{
                                        'AuthToken': verifyUpnAndMobileSubmitOtpState.AuthToken,
                                        'AuthTokenKey': verifyUpnAndMobileSubmitOtpState.AuthTokenKey
                                    }}
                                    beforeUpload={file => {
                                        setFormData({
                                            ...formData,
                                            ["IdentityProofUploaded"]: true
                                        })
                                        setFiles({
                                            ...files,
                                            ["IdentityProofUploaded"]: file
                                        })
                                        setFileList(state => ({
                                            ...fileList,
                                            ["IdentityProofUploaded"]: []
                                        }))
                                        setSubmitDocumentStatus(true)
                                        return true
                                    }}
                                    onError={(info) => {
                                        setSubmitDocumentStatus(false)
                                        setFormData({ ...formData, ["IdentityProofUploaded"]: false })
                                    }}
                                    onRemove={file => {
                                        setFileList(state => ({
                                            ...fileList,
                                            ["IdentityProofUploaded"]: []
                                        }))
                                        const defaultFileLists = defaultFileList;
                                        let fileArr = []
                                        defaultFileLists.forEach(item => {
                                            if (item.documentTypeId !== 3) {
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
                                            let extension = files["IdentityProofUploaded"].name.substr(files["IdentityProofUploaded"].name.lastIndexOf(".") + 1)
                                            let filePrependString = ""
                                            if (extension === 'jpg' || extension === 'jpeg' || extension === 'png') {
                                                filePrependString = `data:image/${extension};base64,${response.CustomObject.FileData}`
                                            }
                                            else {
                                                filePrependString = `data:application/${extension};base64,${response.CustomObject.FileData}`
                                            }
                                            fileArr.push({
                                                documentTypeId: 3,
                                                uid: response.CustomObject.DocumentId,
                                                name: files["IdentityProofUploaded"].name,
                                                status: 'done',
                                                url: filePrependString,
                                                thumbUrl: filePrependString,
                                                preview: filePrependString,
                                            })
                                            setDefaultFileList(fileArr)
                                            setFileList(state => ({
                                                ...fileList,
                                                ["IdentityProofUploaded"]: [{
                                                    documentTypeId: 3,
                                                    uid: response.CustomObject.DocumentId,
                                                    name: files["IdentityProofUploaded"].name,
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
                                            setFormData({ ...formData, ["IdentityProofUploaded"]: false, ["TempIdentityProofId"]: response.CustomObject.EntityId })
                                        }
                                        else {
                                            setFormData({ ...formData, ["IdentityProofUploaded"]: false })
                                        }
                                        setSubmitDocumentStatus(false)
                                    }}
                                    defaultFileList={_.find(defaultFileList, { 'documentTypeId': 3 }) ? [_.find(defaultFileList, { 'documentTypeId': 3 })] : []}
                                    fileList={fileList["IdentityProofUploaded"]}
                                    allowedFileTypes={["image/jpg", "image/jpeg"]}
                                    allowedFileSizeInKb={512}
                                    fileTypeValidationMessage={"Only JPG & JPEG file types allowed!"}
                                >
                                    {_.find(defaultFileList, { 'documentTypeId': 3 }) ? null : <Button icon={<UploadOutlined />}
                                        loading={formData.IdentityProofUploaded}
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
                                    Passport size photo of {props.changeOfOwnerShip ? 'Transferee' : 'Purchaser'}
                                </ValidationDiv>
                            </FileTitle>
                        </Col>
                        <Col span="24" >
                            <Form.Item
                                name="Passport size photo of Purchaser"
                                getValueFromEvent={normFile}
                                rules={[
                                    { required: _.find(defaultFileList, { 'documentTypeId': 1 }) ? false : true, message: 'Required' },
                                ]}
                                style={{ paddingLeft: 22 }}
                            >
                                <DocumentUpload
                                    name="Passport size photo of Purchaser"
                                    listType="picture-card"
                                    onPreview={() => onPreview(_.find(defaultFileList, { 'documentTypeId': 1 }))}
                                    action={`${conf.api.base_url}DMS_DocumentService/UploadPurchaserLegalHeirDocument?ApiKey=UploadPurchaserLegalHeirDocument&OrgId=${OrgId}&EntityType=900&EntityId=${formData.EntityId}&DocumentTypeId=1&DocumentName=Photo`}
                                    headers={{
                                        'AuthToken': verifyUpnAndMobileSubmitOtpState.AuthToken,
                                        'AuthTokenKey': verifyUpnAndMobileSubmitOtpState.AuthTokenKey
                                    }}
                                    beforeUpload={file => {
                                        setFormData({
                                            ...formData,
                                            ["PhotoUploaded"]: true
                                        })
                                        setFiles({
                                            ...files,
                                            ["PhotoUploaded"]: file
                                        })
                                        setFileList(state => ({
                                            ...fileList,
                                            ["PhotoUploaded"]: []
                                        }))
                                        setSubmitDocumentStatus(true)
                                        return true
                                    }}
                                    onError={(info) => {
                                        setSubmitDocumentStatus(false)
                                        setFormData({ ...formData, ["PhotoUploaded"]: false })
                                    }}
                                    onRemove={file => {
                                        setFileList(state => ({
                                            ...fileList,
                                            ["PhotoUploaded"]: []
                                        }))
                                        const defaultFileLists = defaultFileList;
                                        let fileArr = []
                                        defaultFileLists.forEach(item => {
                                            if (item.documentTypeId !== 1) {
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
                                            let extension = files["PhotoUploaded"].name.substr(files["PhotoUploaded"].name.lastIndexOf(".") + 1)
                                            let filePrependString = ""
                                            if (extension === 'jpg' || extension === 'jpeg' || extension === 'png') {
                                                filePrependString = `data:image/${extension};base64,${response.CustomObject.FileData}`
                                            }
                                            else {
                                                filePrependString = `data:application/${extension};base64,${response.CustomObject.FileData}`
                                            }
                                            fileArr.push({
                                                documentTypeId: 1,
                                                uid: response.CustomObject.DocumentId,
                                                name: files["PhotoUploaded"].name,
                                                status: 'done',
                                                url: filePrependString,
                                                thumbUrl: filePrependString,
                                                preview: filePrependString,
                                            })
                                            setDefaultFileList(fileArr)
                                            setFileList(state => ({
                                                ...fileList,
                                                ["PhotoUploaded"]: [{
                                                    documentTypeId: 1,
                                                    uid: response.CustomObject.DocumentId,
                                                    name: files["PhotoUploaded"].name,
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
                                            setFormData({ ...formData, ["PhotoUploaded"]: false, ["TempPhotoId"]: response.CustomObject.EntityId })
                                        }
                                        else {
                                            setFormData({ ...formData, ["PhotoUploaded"]: false })
                                        }
                                        setSubmitDocumentStatus(false)
                                    }}
                                    defaultFileList={_.find(defaultFileList, { 'documentTypeId': 1 }) ? [_.find(defaultFileList, { 'documentTypeId': 1 })] : []}
                                    fileList={fileList["PhotoUploaded"]}
                                    allowedFileTypes={["image/jpg", "image/jpeg"]}
                                    allowedFileSizeInKb={512}
                                    fileTypeValidationMessage={"Only JPG & JPEG file types allowed!"}
                                >
                                    {_.find(defaultFileList, { 'documentTypeId': 1 }) ? null : <Button icon={<UploadOutlined />}
                                        loading={formData.PhotoUploaded}
                                    >Click to Upload</Button>
                                    }
                                </DocumentUpload>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span="24" >
                            <FileTitle>
                                <span>3. </span>
                                <ValidationDiv className="validate">
                                    Specimen Signature of {props.changeOfOwnerShip ? 'Transferee' : 'Purchaser'}
                                </ValidationDiv>
                            </FileTitle>
                        </Col>
                        <Col span="24" >
                            <Form.Item
                                name="SpecimenSignature"
                                getValueFromEvent={normFile}
                                rules={[
                                    { required: _.find(defaultFileList, { 'documentTypeId': 2 }) ? false : true, message: 'Required' },
                                ]}
                                style={{ paddingLeft: 22 }}
                            >
                                <DocumentUpload
                                    name="SpecimenSignature"
                                    listType="picture-card"
                                    onPreview={() => onPreview(_.find(defaultFileList, { 'documentTypeId': 2 }))}
                                    action={`${conf.api.base_url}DMS_DocumentService/UploadPurchaserLegalHeirDocument?ApiKey=UploadPurchaserLegalHeirDocument&OrgId=${OrgId}&EntityType=900&EntityId=${formData.EntityId}&DocumentTypeId=2&DocumentName=Signature`}
                                    headers={{
                                        'AuthToken': verifyUpnAndMobileSubmitOtpState.AuthToken,
                                        'AuthTokenKey': verifyUpnAndMobileSubmitOtpState.AuthTokenKey
                                    }}
                                    beforeUpload={file => {
                                        setFormData({
                                            ...formData,
                                            ["SignatureUploaded"]: true
                                        })
                                        setFiles({
                                            ...files,
                                            ["SignatureUploaded"]: file
                                        })
                                        setFileList(state => ({
                                            ...fileList,
                                            ["SignatureUploaded"]: []
                                        }))
                                        setSubmitDocumentStatus(true)
                                        return true
                                    }}
                                    onError={(info) => {
                                        setSubmitDocumentStatus(false)
                                        setFormData({ ...formData, ["SignatureUploaded"]: false })
                                    }}
                                    onRemove={file => {
                                        setFileList(state => ({
                                            ...fileList,
                                            ["SignatureUploaded"]: []
                                        }))
                                        const defaultFileLists = defaultFileList;
                                        let fileArr = []
                                        defaultFileLists.forEach(item => {
                                            if (item.documentTypeId !== 2) {
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
                                            let extension = files["SignatureUploaded"].name.substr(files["SignatureUploaded"].name.lastIndexOf(".") + 1)
                                            let filePrependString = ""
                                            if (extension === 'jpg' || extension === 'jpeg' || extension === 'png') {
                                                filePrependString = `data:image/${extension};base64,${response.CustomObject.FileData}`
                                            }
                                            else {
                                                filePrependString = `data:application/${extension};base64,${response.CustomObject.FileData}`
                                            }
                                            fileArr.push({
                                                documentTypeId: 2,
                                                uid: response.CustomObject.DocumentId,
                                                name: files["SignatureUploaded"].name,
                                                status: 'done',
                                                url: filePrependString,
                                                thumbUrl: filePrependString,
                                                preview: filePrependString,
                                            })
                                            setDefaultFileList(fileArr)
                                            setFileList(state => ({
                                                ...fileList,
                                                ["SignatureUploaded"]: [{
                                                    documentTypeId: 2,
                                                    uid: response.CustomObject.DocumentId,
                                                    name: files["SignatureUploaded"].name,
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
                                            setFormData({ ...formData, ["SignatureUploaded"]: false, ["TempSignId"]: response.CustomObject.EntityId })
                                        }
                                        else {
                                            setFormData({ ...formData, ["SignatureUploaded"]: false })
                                        }
                                        setSubmitDocumentStatus(false)
                                    }}
                                    defaultFileList={_.find(defaultFileList, { 'documentTypeId': 2 }) ? [_.find(defaultFileList, { 'documentTypeId': 2 })] : []}
                                    fileList={fileList["SignatureUploaded"]}
                                    allowedFileTypes={["image/jpg", "image/jpeg"]}
                                    allowedFileSizeInKb={512}
                                    fileTypeValidationMessage={"Only JPG & JPEG file types allowed!"}
                                >
                                    {_.find(defaultFileList, { 'documentTypeId': 2 }) ? null : <Button icon={<UploadOutlined />}
                                        loading={formData.SignatureUploaded}
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

                                    <BlueButton disabled={submitDocumentStatus} htmlType="submit" loading={transferApplicationSavePurchaserState.apiState === "loading" || submitBtnLoading ? true : false} >{props.changeOfOwnerShip ? "Save Transferee" : "Save Purchaser Details"}</BlueButton>
                                    {(getPurchaserListState.data
                                        && getPurchaserListState.data.length > 0) &&
                                        <TextButton icon={<CloseCircleOutlined />} onClick={() => {
                                            setOpenFrom(false)
                                            setFormData(initialFormData)
                                            setDefaultFileList([])
                                            setFileList([])
                                            setFiles([])
                                            form.resetFields()
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

            }
        </>
    )
}

EditPurchaserDetails.propTypes = {
    panelTitle: PropsTypes.string,
    OrgId: PropsTypes.string,
    applicationId: PropsTypes.string,
    refreshApplication: PropsTypes.func,
    triggerDraftSave: PropsTypes.func,
    triggerFetchApplication: PropsTypes.func,
    triggerPurchaserSubmit: PropsTypes.bool,
    changeOfOwnerShip: PropsTypes.bool,
}

EditPurchaserDetails.defaultProps = {
    panelTitle: "Purchaser's Details",
    OrgId: "",
    applicationId: "",
    refreshApplication: () => { return },
    triggerDraftSave: () => { return },
    triggerFetchApplication: () => { return },
    triggerPurchaserSubmit: false,
    changeOfOwnerShip: false
}

const mapStateToProps = (state) => ({
    transferApplicationSavePurchaserState: state.transferApplicationSavePurchaser,
    transferApplicationSaveState: state.transferApplicationSave,
    viewEditApplicationState: state.viewEditApplication,
    transferApplicationDeletePurchaserState: state.transferApplicationDeletePurchaser,
    getSalutationListState: state.getSalutationList,
    verifyUpnAndMobileSubmitOtpState: state.verifyUpnAndMobileSubmitOtp,
    getPurchaserListState: state.getPurchaserList,
})

const mapDispatchToProps = (dispatch) => ({
    savePurchaserTransferApplication: (params) => dispatch(savePurchaserTransferApplication(params)),
    deletePurchaserTransferApplication: (params) => dispatch(deletePurchaserTransferApplication(params)),
    getSalutationList: (params) => dispatch(getSalutationList(params)),
    savePurchaserTransferApplicationReset: () => dispatch(savePurchaserTransferApplicationReset()),
    getPurchaserList: (params) => dispatch(getPurchaserList(params)),
    getPurchaserListResetState: () => dispatch(getPurchaserListResetState()),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditPurchaserDetails)