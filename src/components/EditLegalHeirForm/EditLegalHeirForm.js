import React, { useEffect, useState } from "react"
import { Form, Row, Col, Input, Select, notification, Button, Popconfirm, Space, Skeleton, Modal } from "antd"
import { CloseCircleOutlined, UploadOutlined } from '@ant-design/icons'
import { connect } from "react-redux"
import PropsTypes from "prop-types"
import _ from "lodash"

// components
import { FlexDiv, DocumentUpload, TextButton, FormItem, BlueButton, ValidationDiv, FileTitle } from '../Xcomponents'
import { PurchaserContainer, Purchaser, Name, Details, Image, Mobile } from "./EditLegalHeirFormStyle"

// actions
import { saveLegalHeirTransferApplication } from '../../actions/transferApplicationSaveLegalHeirActions'
import { getSalutationList } from '../../actions/getSalutationListActions'
import { deleteLegalHeirTransferApplication } from '../../actions/transferApplicationDeleteLegalHeirActions'
import { getLegalHeirList, getLegalHeirListResetState } from '../../actions/getLegalHeirListAction'

// others
import conf from '../../config'
import { getAuthData, getOrgId } from '../../utils'

const Option = Select.Option

const EditLegalHeirForm = props => {
    // variables
    const {
        saveLegalHeirTransferApplication, transferApplicationSaveLegalHeirState,
        getSalutationList, getSalutationListState,
        deleteLegalHeirTransferApplication, transferApplicationDeleteLegalHeirState,
        verifyUpnAndMobileSubmitOtpState,
        viewEditApplicationState,
        getLegalHeirList, getLegalHeirListState, getLegalHeirListResetState,
        getPurchaserListState
    } = props
    const [openFrom, setOpenFrom] = useState(false)
    const initialFormData = {
        Salutation: "",
        Name: "",
        FatherName: "",
        Relationship: "",
        Address: "",
        Gender: "",
        Mobile: "",
        Email: "",
        IdentityProofUploaded: false,
        PhotoUploaded: false,
        SignatureUploaded: false,
        TempPhotoId: "",
        TempSignId: "",
        TempIdentityProofId: "",
        PurchaserId: 0,
        EntityId: 0,
        LegalHeirId: 0,
    }
    const [formData, setFormData] = useState(initialFormData)
    const [form] = Form.useForm()
    const headers = {
        'AuthKey': getAuthData().AuthKey,
        'AuthId': getAuthData().AuthId,
    }
    const [submitBtnLoading, setSubmitBtnLoading] = useState(false)
    const [fileList, setFileList] = useState([])
    const [uploadLoading, setUploadLoading] = useState([])
    const [files, setFiles] = useState([])
    const OrgId = getOrgId()
    const [defaultFileList, setDefaultFileList] = useState([])
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [currentFileType, setCurrentFileType] = useState(''); // Current file format
    const [submitDocumentStatus, setSubmitDocumentStatus] = useState(false); // Current file format
    const serviceId = props.serviceId

    // callbacks

    /* call salutation list on component mount */
    useEffect(() => {
        getSalutationList({
            OrgId: OrgId,
            AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
            AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey
        })
        callLegalHeirList()
        return (() => {
            getLegalHeirListResetState()
        })
    }, [])

    const callLegalHeirList = () => {
        getLegalHeirList({
            OrgId: OrgId,
            ApplicationId: props.applicationId,
            AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
            AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey
        })
    }

    useEffect(() => {
        if (getLegalHeirListState.apiState === "success") {
            if (getLegalHeirListState.data && getLegalHeirListState.data.length > 0) {
                setOpenFrom(false)
            }
            else {
                if (getPurchaserListState.data && getPurchaserListState.data.length > 0) {
                    setOpenFrom(true)
                    setDefaultFileList([])
                    setFileList([])
                    setFiles([])
                    form.resetFields()
                }

            }
        }
    }, [getLegalHeirListState, getPurchaserListState])


    useEffect(() => {
        if (transferApplicationDeleteLegalHeirState.apiState === "alert") {
            transferApplicationDeleteLegalHeirState.apiState = ""
            notification.error({
                message: transferApplicationDeleteLegalHeirState.alertMessage,
                placement: "bottomRight"
            })
        }

        if (transferApplicationDeleteLegalHeirState.apiState === "error") {
            transferApplicationDeleteLegalHeirState.apiState = ""
            notification.error({
                message: "Something went wrong, please try again.",
                placement: "bottomRight"
            })
        }

        if (transferApplicationDeleteLegalHeirState.apiState === "success") {
            transferApplicationDeleteLegalHeirState.apiState = ""
            setOpenFrom(false)
            setFormData(initialFormData)
            setDefaultFileList([])
            setFileList([])
            setFiles([])
            form.resetFields()
            notification.success({
                message: "Legal Heir has been deleted",
                placement: "bottomRight"
            })
            // props.triggerFetchApplication()
            callLegalHeirList()
        }
    }, [transferApplicationDeleteLegalHeirState.apiState])

    useEffect(() => {
        if (transferApplicationSaveLegalHeirState.apiState === "alert") {
            transferApplicationSaveLegalHeirState.apiState = ""
            notification.error({
                message: transferApplicationSaveLegalHeirState.alertMessage,
                placement: "bottomRight"
            })
        }

        if (transferApplicationSaveLegalHeirState.apiState === "error") {
            transferApplicationSaveLegalHeirState.apiState = ""
            notification.error({
                message: "Something went wrong, please try again.",
                placement: "bottomRight"
            })
        }

        if (transferApplicationSaveLegalHeirState.apiState === "success") {
            transferApplicationSaveLegalHeirState.apiState = ""
            setOpenFrom(false)
            setFormData(initialFormData)
            setDefaultFileList([])
            setFileList([])
            setFiles([])
            form.resetFields()
            notification.success({
                message: "Legal Heir has been saved",
                placement: "bottomRight"
            })
            // props.triggerFetchApplication()
            callLegalHeirList()
            // props.refreshApplication()
        }
    }, [transferApplicationSaveLegalHeirState.apiState])

    /* watching viewEditApplicationState to check whther we need to display Add-primary-purchaser-button or not */

    // functions
    const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSalutationSelect = (Salutation) => {
        setFormData({ ...formData, ["Salutation"]: Salutation })
    }


    const handlePurchaserSelect = (PurchaserId) => {
        setFormData({ ...formData, ["PurchaserId"]: PurchaserId })
    }

    const editLegalHeirDetails = (legalHeir) => {
        form.resetFields()
        let editFormData = {
            Salutation: legalHeir.SalutationId,
            Name: legalHeir.Name,
            FatherName: legalHeir.FatherName,
            Address: legalHeir.Address,
            Gender: legalHeir.Gender,
            MobileNumber: legalHeir.MobileNumber,
            EmailAddress: legalHeir.EmailAddress,
            IsPrimary: legalHeir.IsPrimary,
            LegalHeirId: legalHeir.LegalHeirId,
            EntityId: legalHeir.LegalHeirId,
            PurchaserId: legalHeir.PurchaserId,
            Relationship: legalHeir.Relationship
        }
        let editFormDataValue = {
            Salutation: legalHeir.Salutation,
            Name: legalHeir.Name,
            FatherName: legalHeir.FatherName,
            Address: legalHeir.Address,
            Gender: legalHeir.Gender,
            MobileNumber: legalHeir.MobileNumber,
            EmailAddress: legalHeir.EmailAddress,
            IsPrimary: legalHeir.IsPrimary,
            LegalHeirId: legalHeir.LegalHeirId,
            PurchaserId: legalHeir.PurchaserId,
            Relationship: legalHeir.Relationship
        }
        setFormData(editFormData)
        form.setFieldsValue(editFormDataValue)
        let fileArr = []
        legalHeir.LegalHeirDocument.map((item) => {
            let extension = item.FileName.substr(item.FileName.lastIndexOf(".") + 1)
            let filePrependString = ""
            if (extension === 'jpg' || extension === 'jpeg' || extension === 'png') {
                filePrependString = `data:image/${extension};base64,${item.FileData}`
            }
            else {
                filePrependString = `data:application/${extension};base64,${item.FileData}`
            }
            // if (item.DocumentTypeId === 3) {
            //     fileArr.push({
            //         documentTypeId: item.DocumentTypeId,
            //         uid: item.DocumentId,
            //         name: item.FileName,
            //         status: 'done',
            //         url: item.FileData,
            //     })
            // }
            // else if (item.DocumentTypeId === 2) {

            //     fileArr.push({
            //         documentTypeId: item.DocumentTypeId,
            //         uid: item.DocumentId,
            //         name: item.FileName,
            //         status: 'done',
            //         url: item.FileData,
            //     })
            // }
            if (item.DocumentTypeId === 1) {

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
            saveLegalHeirTransferApplication({
                OrgId: OrgId,
                PurchaserId: formData.PurchaserId,
                LegalHeirId: formData.LegalHeirId,
                ApplicationId: props.applicationId,
                PropertyRefId: viewEditApplicationState.data.PropertyRefId,
                Salutation: formData.Salutation,
                Name: formData.Name,
                FatherName: formData.FatherName,
                Relationship: formData.Relationship,
                Address: formData.Address,
                Gender: formData.Gender,
                MobileNumber: formData.MobileNumber,
                EmailAddress: formData.EmailAddress,
                AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
                AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey,
                ...temp
            })
        }
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
                {getLegalHeirListState.data
                    && getLegalHeirListState.data.length > 0
                    && getLegalHeirListState.data.map((legalHeir, index) => {
                        let photo = null
                        _.forEach(legalHeir.LegalHeirDocument, function (item) {
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
                                            <Name>{`${legalHeir.Salutation} ${legalHeir.Name}`}</Name>
                                        </FlexDiv>
                                        <Mobile>Legal Heir of <span style={{ fontWeight: 'bold' }}>{legalHeir.PurchaserName || ""}</span></Mobile>
                                        {/* <Mobile>{legalHeir.MobileNumber || ""} {legalHeir.EmailAddress ? " | " + legalHeir.EmailAddress : ""}</Mobile> */}
                                        <FlexDiv align="left">
                                            <Space>
                                                <Button onClick={() => editLegalHeirDetails(legalHeir)}>Edit</Button>
                                                <Popconfirm
                                                    title="Confirm delete?"
                                                    onConfirm={() => deleteLegalHeirTransferApplication({
                                                        OrgId: OrgId,
                                                        LegalHeirId: legalHeir.LegalHeirId,
                                                        AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
                                                        AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey
                                                    })}
                                                    okText="Yes"
                                                    cancelText="No"
                                                >
                                                    <Button danger>Remove</Button>
                                                </Popconfirm>
                                            </Space>
                                        </FlexDiv>
                                    </Details>
                                </Purchaser>
                            </>
                        )
                    })
                }

            </PurchaserContainer>
            {getLegalHeirListState.apiState === 'loading' ?
                <Skeleton active />
                :
                (getLegalHeirListState.data
                    && getLegalHeirListState.data.length > 0) ?
                    <>
                        <div style={{ marginBottom: 20 }}>
                            <BlueButton
                                onClick={() => {
                                    setOpenFrom(true)
                                    setFormData(initialFormData)
                                    setDefaultFileList([])
                                    setFileList([])
                                    setFiles([])
                                    form.resetFields()
                                }}
                                style={{ marginTop: 16, marginBottom: 16 }}
                            >
                                Add More Legal Heir
                            </BlueButton>
                        </div>
                    </>
                    : !openFrom ?
                        <>
                            <div style={{ marginBottom: 20 }}>
                                <span>To add legal heir please save at least one {props.PurchaserOrTransferee} details.</span>
                            </div>
                        </>
                        : null


            }


            {/* END: To display primary purchaer */}

            {openFrom &&
                <Form layout="vertical" form={form} onFinish={onFinish} style={{ backgroundColor: '#f5f5f5b5', padding: '20px' }}>
                    <Row gutter={24}>
                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                            <FormItem
                                name="PurchaserId"
                                label={"Legal Heir Of"}
                                rules={[{ required: true, message: 'Required' }]}
                            >
                                <Select name="PurchaserId" size="large" style={{ width: '100%' }} placeholder="Legal Heir Of" onSelect={handlePurchaserSelect} >
                                    {getPurchaserListState.data
                                        && getPurchaserListState.data.length > 0
                                        && getPurchaserListState.data.map(purchaser => (
                                            <Option key={purchaser.PurchaserId} value={purchaser.PurchaserId}>{`${purchaser.Salutation} ${purchaser.Name}`}</Option>
                                        ))
                                    }
                                </Select>
                            </FormItem>
                        </Col>
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
                                label="Legal Heir Name"
                                // label={props.changeOfOwnerShip ? "Transferee's Name" : "Legal Heir Name"}
                                rules={[{ required: true, message: 'Required' }]}
                            >
                                <Input name="Name" placeholder="Name" size="large" onChange={handleOnChange} />
                            </FormItem>
                        </Col>
                        {/* <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                            <FormItem
                                name="FatherName"
                                label="Father Name"
                                rules={[{ required: true, message: 'Required' }]}
                            >
                                <Input name="FatherName" placeholder="Enter Father Name" size="large" onChange={handleOnChange} />
                            </FormItem>
                        </Col> */}
                    </Row>

                    {/* <Row gutter={24}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <FormItem
                                name="Address"
                                label="Address"
                                rules={[{ required: true, message: 'Required' }]}
                            >
                                <Input name="Address" placeholder="Enter Address" size="large" onChange={handleOnChange} />
                            </FormItem>
                        </Col>
                    </Row> */}

                    <Row gutter={24}>
                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                            <FormItem
                                name="Relationship"
                                label={`Relationship with ${props.PurchaserOrTransferee}`}
                                rules={[{ required: true, message: 'Required' }]}
                            >
                                <Input size="large" name="Relationship" placeholder={`Relationship with ${props.PurchaserOrTransferee}`} onChange={handleOnChange} />
                            </FormItem>
                        </Col>
                        {/* <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                            <FormItem
                                name="MobileNumber"

                                label="Mobile of Legal Heir"
                                rules={[
                                    { required: true, message: 'Required' },
                                    { pattern: '^[0-9]{10}$', message: 'Mobile number is not valid' }
                                ]}
                            >
                                <Input type="number" name="MobileNumber" placeholder="Enter Mobile" size="large" onChange={handleOnChange} />
                            </FormItem>
                        </Col>
                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                            <FormItem
                                name="EmailAddress"
                                label="Email of Legal Heir"
                                rules={[
                                    { required: true, message: 'Required' },
                                    { type: 'email', message: 'Email is not valid' },
                                ]}
                            >
                                <Input name="EmailAddress" placeholder="Enter Email" size="large" onChange={handleOnChange} />
                            </FormItem>
                        </Col> */}
                    </Row>
                    {/* <Form.Item
                        label={<FileTitle>Identity Proof of Legal Heir (Aadhaar Card, PAN Card, Driving License or Passport)</FileTitle>}
                        name="Identity Proof of Legal Heir"
                        rules={[
                            { required: formData.LegalHeirId > 0 ? false : true, message: 'Required' },
                        ]}
                    >
                        <Upload
                            name="Identity Proof of Legal Heir"
                            action={`${conf.api.base_url}DMS_DocumentService/UploadPurchaserLegalHeirDocument?ApiKey=UploadPurchaserLegalHeirDocument&OrgId=${OrgId}&EntityType=901&EntityId=${formData.EntityId}&DocumentTypeId=3&DocumentName=IdentityProof`}
                            headers={{
                                'AuthToken': verifyUpnAndMobileSubmitOtpState.AuthToken,
                                'AuthTokenKey': verifyUpnAndMobileSubmitOtpState.AuthTokenKey
                            }}
                            beforeUpload={file => {
                                setUploadLoading({
                                    ...uploadLoading,
                                    ["IdentityProofUploaded"]: true
                                })
                                setFiles({
                                    ...files,
                                    ["IdentityProofUploaded"]: file
                                })
                                setFileList(state => ({
                                    ["IdentityProofUploaded"]: []
                                }))
                                return true
                            }}
                            onError={(info) => console.log(info)}
                            onSuccess={(response) => {
                                if (response.Status === 2) {
                                    setFileList(state => ({
                                        ...fileList,
                                        ["IdentityProofUploaded"]: [files["IdentityProofUploaded"]]
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
                                setUploadLoading({
                                    ...uploadLoading,
                                    ["IdentityProofUploaded"]: false
                                })
                            }}
                            defaultFileList={defaultFileList.length > 0 ? [_.find(defaultFileList, { 'documentTypeId': 3 })] : []}
                            fileList={fileList["IdentityProofUploaded"]}
                            allowedFileTypes={["image/jpg", "image/jpeg"]}
                            allowedFileSizeInKb={100}
                            fileTypeValidationMessage={"Only JPG & JPEG file types allowed!"}
                        >
                            <Button icon={<UploadOutlined />}
                                loading={uploadLoading["IdentityProofUploaded"]}
                            >Upload</Button>
                        </Upload>
                    </Form.Item>
                     */}
                    <Row gutter={24}>
                        <Col span="24" >
                            <FileTitle>
                                <span>1. </span>
                                <ValidationDiv className="validate">
                                    Passport size photo of Legal Heir
                                </ValidationDiv>
                            </FileTitle>
                        </Col>
                        <Col span="24" >
                            <Form.Item
                                name="Passport size photo of Legal Heir"
                                getValueFromEvent={normFile}
                                rules={[
                                    { required: _.find(defaultFileList, { 'documentTypeId': 1 }) ? false : true, message: 'Required' },
                                ]}
                            >
                                <DocumentUpload
                                    name="Passport size photo of Legal Heir"
                                    listType="picture-card"
                                    onPreview={() => onPreview(_.find(defaultFileList, { 'documentTypeId': 1 }))}
                                    action={`${conf.api.base_url}DMS_DocumentService/UploadPurchaserLegalHeirDocument?ApiKey=UploadPurchaserLegalHeirDocument&OrgId=${OrgId}&EntityType=901&EntityId=${formData.EntityId}&DocumentTypeId=1&DocumentName=Photo`}
                                    headers={{
                                        'AuthToken': verifyUpnAndMobileSubmitOtpState.AuthToken,
                                        'AuthTokenKey': verifyUpnAndMobileSubmitOtpState.AuthTokenKey
                                    }}
                                    beforeUpload={file => {
                                        setUploadLoading({
                                            ...uploadLoading,
                                            ["PhotoUploaded"]: true
                                        })
                                        setFiles({
                                            ...files,
                                            ["PhotoUploaded"]: file
                                        })
                                        setFileList(state => ({
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
                    {/* <Form.Item
                        label={<FileTitle>Specimen Signature of Legal Heir</FileTitle>}
                        name="Specimen Signature of Legal Heir"
                        rules={[
                            { required: formData.LegalHeirId > 0 ? false : true, message: 'Required' },
                        ]}
                    >
                        <Upload
                            name="Specimen Signature of Legal Heir"
                            action={`${conf.api.base_url}DMS_DocumentService/UploadPurchaserLegalHeirDocument?ApiKey=UploadPurchaserLegalHeirDocument&OrgId=${OrgId}&EntityType=901&EntityId=${formData.EntityId}&DocumentTypeId=2&DocumentName=Signature`}
                            headers={{
                                'AuthToken': verifyUpnAndMobileSubmitOtpState.AuthToken,
                                'AuthTokenKey': verifyUpnAndMobileSubmitOtpState.AuthTokenKey
                            }}
                            beforeUpload={file => {
                                setUploadLoading({
                                    ...uploadLoading,
                                    ["SignatureUploaded"]: true
                                })
                                setFiles({
                                    ...files,
                                    ["SignatureUploaded"]: file
                                })
                                setFileList(state => ({
                                    ["SignatureUploaded"]: []
                                }))
                                return true
                            }}
                            onError={(info) => console.log(info)}
                            onSuccess={(response) => {
                                if (response.Status === 2) {
                                    setFileList(state => ({
                                        ...fileList,
                                        ["SignatureUploaded"]: [files["SignatureUploaded"]]
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
                                setUploadLoading({
                                    ...uploadLoading,
                                    ["SignatureUploaded"]: false
                                })
                            }}
                            defaultFileList={defaultFileList.length > 0 ? [_.find(defaultFileList, { 'documentTypeId': 2 })] : []}
                            fileList={fileList["SignatureUploaded"]}
                            allowedFileTypes={["image/jpg", "image/jpeg"]}
                            allowedFileSizeInKb={100}
                            fileTypeValidationMessage={"Only JPG & JPEG file types allowed!"}
                        >
                            <Button icon={<UploadOutlined />}
                                loading={uploadLoading["SignatureUploaded"]}
                            >Upload</Button>
                        </Upload>
                    </Form.Item>
                     */}
                    <Row gutter={24}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item>
                                <Space size="middle" >
                                    <BlueButton disabled={submitDocumentStatus} htmlType="submit" loading={transferApplicationSaveLegalHeirState.apiState === "loading" || submitBtnLoading ? true : false} >Save Legal Heir Details</BlueButton>
                                    {getLegalHeirListState.data
                                        && getLegalHeirListState.data.length > 0 &&
                                        < TextButton icon={<CloseCircleOutlined />} onClick={() => {
                                            setOpenFrom(false)
                                            setFormData(initialFormData)
                                            setDefaultFileList([])
                                            setFileList([])
                                            setFiles([])
                                            form.resetFields()
                                        }} > Cancel</TextButton>
                                    }
                                </Space>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            }
        </>
    )
}

EditLegalHeirForm.propTypes = {
    visible: PropsTypes.bool,
    closeForm: PropsTypes.func,
    OrgId: PropsTypes.string,
    applicationId: PropsTypes.string,
    PurchaserOrTransferee: PropsTypes.string,
}

EditLegalHeirForm.defaultProps = {
    visible: false,
    closeForm: () => { return },
    OrgId: 0,
    applicationId: "",
    PurchaserOrTransferee: "Purchaser",
}

const mapStateToProps = (state) => ({
    transferApplicationSaveLegalHeirState: state.transferApplicationSaveLegalHeir,
    viewEditApplicationState: state.viewEditApplication,
    getSalutationListState: state.getSalutationList,
    verifyUpnAndMobileSubmitOtpState: state.verifyUpnAndMobileSubmitOtp,
    transferApplicationDeleteLegalHeirState: state.transferApplicationDeleteLegalHeir,
    getLegalHeirListState: state.getLegalHeirList,
    getPurchaserListState: state.getPurchaserList,
})
const mapDispatchToProps = (dispatch) => ({
    saveLegalHeirTransferApplication: (params) => dispatch(saveLegalHeirTransferApplication(params)),
    getSalutationList: (params) => dispatch(getSalutationList(params)),
    deleteLegalHeirTransferApplication: (params) => dispatch(deleteLegalHeirTransferApplication(params)),
    getLegalHeirList: (params) => dispatch(getLegalHeirList(params)),
    getLegalHeirListResetState: () => dispatch(getLegalHeirListResetState()),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditLegalHeirForm)