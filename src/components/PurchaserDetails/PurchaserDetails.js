import React, { useEffect, useState } from "react"
import { Form, Row, Col, Input, Select, notification, Button, Popconfirm, Tag, Space, Modal } from "antd"
import { CloseCircleOutlined, UploadOutlined } from '@ant-design/icons'
import { connect } from "react-redux"
import PropsTypes from "prop-types"
import _ from "lodash"
import { useMediaQuery } from 'react-responsive'



// components
import { FlexDiv, DocumentUpload, TextButton, FormItem, ValidationDiv, BlueButton, FileTitle } from '../Xcomponents'
import { PurchaserContainer, Purchaser, Name, Details, Mobile, Image } from "./PurchaserDetailsStyle"

// actions
import { savePurchaserTransferApplication, savePurchaserTransferApplicationReset } from '../../actions/transferApplicationSavePurchaserActions'
import { deletePurchaserTransferApplication } from '../../actions/transferApplicationDeletePurchaserActions'
import { getSalutationList } from '../../actions/getSalutationListActions'
import { saveGpa, saveGpaResetState } from '../../actions/saveGpaAction'
import { deleteGpa, deleteGpaResetState } from '../../actions/deleteGpaActions'
import { getPurchaserList, getPurchaserListResetState } from '../../actions/getPurchaserListAction'

// others
import conf from '../../config'
import { getAuthData, getOrgId } from '../../utils'


const Option = Select.Option

const PurchaserDetails = props => {

    // variables
    const {
        savePurchaserTransferApplication, transferApplicationSavePurchaserState, savePurchaserTransferApplicationReset,
        transferApplicationSaveState,
        saveChangeOfOwnershipApplicationState,
        transferApplicationFetchState,
        deletePurchaserTransferApplication, transferApplicationDeletePurchaserState,
        getSalutationList, getSalutationListState,
        verifyUpnAndMobileSubmitOtpState,
        saveGpa, saveGpaState, saveGpaResetState,
        deleteGpa, deleteGpaState, deleteGpaResetState,
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

    const [filesGpa, setFilesGpa] = useState([])
    const [fileListGpa, setFileListGpa] = useState([])
    const [defaultFileListGpa, setDefaultFileListGpa] = useState([])
    const [visibleGpa, setVisibleGpa] = useState(false)
    const [currentGpa, setCurrentGpa] = useState(false)

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
            saveGpaResetState()
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
    // GPA
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
                // props.triggerFetchApplication()
                callGetPurchaserList()
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
                // props.triggerFetchApplication()
                callGetPurchaserList()
                setCurrentGpa(false)
            }
        }
    }, [deleteGpaState])


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
    }, [transferApplicationSavePurchaserState])



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


    // useEffect(() => {
    //     if (transferApplicationSaveState.apiState === "success" && props.applicationId) {
    //         if (formData.Salutation) {
    //             setSubmitBtnLoading(false)
    //             setDisplayFileValidation(false)
    //             transferApplicationSaveState.apiState = ""
    //             savePurchaserTransferApplication({
    //                 OrgId: OrgId,
    //                 PurchaserId: formData.PurchaserId,
    //                 ApplicationId: props.applicationId,
    //                 PropertyRefId: verifyUpnAndMobileSubmitOtpState.data.PropertyRefId,
    //                 Salutation: formData.Salutation,
    //                 Name: formData.Name,
    //                 FatherName: formData.FatherName,
    //                 Address: formData.Address,
    //                 Gender: formData.Gender,
    //                 MobileNumber: formData.MobileNumber,
    //                 EmailAddress: formData.EmailAddress,
    //                 TempPhotoId: formData.TempPhotoId,
    //                 TempSignId: formData.TempSignId,
    //                 TempIdentityProofId: formData.TempIdentityProofId,
    //                 IsPrimary: formData.IsPrimary,
    //                 AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
    //                 AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey
    //             })
    //         }
    //     }
    // }, [transferApplicationSaveState, props.applicationId])

    useEffect(() => {
        if (props.triggerPurchaserSubmit) {
            onFinish()
        }
    }, [props.triggerPurchaserSubmit])


    useEffect(() => {
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
    }, [getPurchaserListState])

    useEffect(() => {
        if (verifyUpnAndMobileSubmitOtpState.apiState === "success") {
            if (serviceId === '25') {

                if (getPurchaserListState.data && getPurchaserListState.data.length > 0) {

                }
                else {

                    form.resetFields()
                    let editFormData = {
                        Name: verifyUpnAndMobileSubmitOtpState.data.TransfereeDetails[0].Name,
                        FatherName: verifyUpnAndMobileSubmitOtpState.data.TransfereeDetails[0].FatherName,
                        Address: verifyUpnAndMobileSubmitOtpState.data.TransfereeDetails[0].Address,
                        MobileNumber: verifyUpnAndMobileSubmitOtpState.data.TransfereeDetails[0].MobileNumber,
                        EmailAddress: verifyUpnAndMobileSubmitOtpState.data.TransfereeDetails[0].EmailAddress,
                        PurchaserId: verifyUpnAndMobileSubmitOtpState.data.TransfereeDetails[0].PurchaserId,
                        EntityId: verifyUpnAndMobileSubmitOtpState.data.TransfereeDetails[0].PurchaserId,
                        IsPrimary: 'Y',
                    }
                    let editFormDataValue = {
                        Name: verifyUpnAndMobileSubmitOtpState.data.TransfereeDetails[0].Name,
                        FatherName: verifyUpnAndMobileSubmitOtpState.data.TransfereeDetails[0].FatherName,
                        Address: verifyUpnAndMobileSubmitOtpState.data.TransfereeDetails[0].Address,
                        Gender: verifyUpnAndMobileSubmitOtpState.data.TransfereeDetails[0].Gender,
                        MobileNumber: verifyUpnAndMobileSubmitOtpState.data.TransfereeDetails[0].MobileNumber,
                        EmailAddress: verifyUpnAndMobileSubmitOtpState.data.TransfereeDetails[0].EmailAddress,
                        PurchaserId: verifyUpnAndMobileSubmitOtpState.data.TransfereeDetails[0].PurchaserId,
                        IsPrimary: 'Y',
                    }
                    setFormData(editFormData)
                    form.setFieldsValue(editFormDataValue)
                }
            }
        }
    }, [verifyUpnAndMobileSubmitOtpState])
    // functions
    const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSalutationSelect = (Salutation) => {
        setFormData({ ...formData, ["Salutation"]: Salutation })
    }


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
            ApplicationId: props.applicationId,
            PropertyRefId: verifyUpnAndMobileSubmitOtpState.data.PropertyRefId,
            Name: gpaFormData.Name,
            FName: gpaFormData.FName,
            Address: gpaFormData.Address,
            AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
            AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey,
        })

    }
    const onFinish = () => {
        if (props.applicationId) {
            setSubmitBtnLoading(false)
            setDisplayFileValidation(false)
            transferApplicationSaveState.apiState = ""
            saveChangeOfOwnershipApplicationState.apiState = ""
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
                PropertyRefId: verifyUpnAndMobileSubmitOtpState.data.PropertyRefId,
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
    const addGpa = (purchaserId) => {
        setVisibleGpa(true)
        gpaForm.resetFields()
        setGpaFormData({ ...gpaFormData, ['Id']: 0, ['EntityId']: purchaserId, ['ApplicationId']: props.applicationId, ['EntityType']: 'P', ['PropertyRefId']: verifyUpnAndMobileSubmitOtpState.data.PropertyRefId, ['Name']: "", ['FName']: "", ['Address']: "" })
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

                                                {(purchaser.GPADetails && purchaser.GPADetails.Id > 0) ?
                                                    <>
                                                        <Button onClick={() => editGpa(purchaser.GPADetails)}>Edit GPA</Button>
                                                        <Popconfirm
                                                            title="Confirm delete?"
                                                            onConfirm={() => removeGpa(purchaser.GPADetails)}
                                                            okText="Yes"
                                                            cancelText="No"
                                                        >
                                                            <Button danger>Remove GPA</Button>
                                                        </Popconfirm>
                                                    </>
                                                    :
                                                    <Button onClick={() => addGpa(purchaser.PurchaserId)}>Add GPA</Button>

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

            {/* GPA Form */}
            {visibleGpa &&

                <Form form={gpaForm} layout="vertical" onFinish={onFinishGpa} style={{ backgroundColor: '#f5f5f5b5', padding: '20px' }} >
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
                                <ValidationDiv >
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

            }
        </>
    )
}

PurchaserDetails.propTypes = {
    panelTitle: PropsTypes.string,
    OrgId: PropsTypes.string,
    applicationId: PropsTypes.string,
    refreshApplication: PropsTypes.func,
    triggerDraftSave: PropsTypes.func,
    triggerFetchApplication: PropsTypes.func,
    triggerPurchaserSubmit: PropsTypes.bool,
    changeOfOwnerShip: PropsTypes.bool,
}

PurchaserDetails.defaultProps = {
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
    transferApplicationFetchState: state.transferApplicationFetch,
    transferApplicationDeletePurchaserState: state.transferApplicationDeletePurchaser,
    getSalutationListState: state.getSalutationList,
    verifyUpnAndMobileSubmitOtpState: state.verifyUpnAndMobileSubmitOtp,
    saveChangeOfOwnershipApplicationState: state.saveChangeOfOwnershipApplication,
    saveGpaState: state.saveGpa,
    deleteGpaState: state.deleteGpa,
    getPurchaserListState: state.getPurchaserList,

})

const mapDispatchToProps = (dispatch) => ({
    savePurchaserTransferApplication: (params) => dispatch(savePurchaserTransferApplication(params)),
    deletePurchaserTransferApplication: (params) => dispatch(deletePurchaserTransferApplication(params)),
    getSalutationList: (params) => dispatch(getSalutationList(params)),
    savePurchaserTransferApplicationReset: () => dispatch(savePurchaserTransferApplicationReset()),
    saveGpa: (params) => dispatch(saveGpa(params)),
    saveGpaResetState: () => dispatch(saveGpaResetState()),
    deleteGpa: (params) => dispatch(deleteGpa(params)),
    deleteGpaResetState: () => dispatch(deleteGpaResetState()),
    getPurchaserList: (params) => dispatch(getPurchaserList(params)),
    getPurchaserListResetState: () => dispatch(getPurchaserListResetState()),
})

export default connect(mapStateToProps, mapDispatchToProps)(PurchaserDetails)