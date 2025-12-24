import React, { useEffect, useState } from "react"
import { Col, Form, Row, Upload, Button, notification, Input, DatePicker, Select, Checkbox, InputNumber, Space, Alert, Modal } from "antd"
import { connect } from "react-redux"
import { UploadOutlined } from '@ant-design/icons'
import { Link, Redirect } from "react-router-dom"
import _ from "lodash"

// components
import { Container, Heading } from './EditApplicationFormStyle'
import { FormItem, BlankSpace, BlueButton, DocumentUpload, ValidationDiv, FileTitle } from '../Xcomponents'
import SelectSearchNotFound from "../SelectSearchNotFound";

// actions
import { getDocumentList, getDocumentListResetState } from '../../actions/getDocumentListAction'
import { saveTransferApplication, saveTransferApplicationResetState } from '../../actions/transferApplicationSaveActions'
import { fetchTransferApplication, resetStateFetchTransferApplication } from '../../actions/transferApplicationfetchActions'
import { deleteTransferApplication } from '../../actions/transferApplicationDeleteActions'
import { saveEditApplication, saveEditApplicationResetState } from '../../actions/saveEditApplicationAction'

// others
import { getOrgId } from '../../utils'
import conf from "../../config"
import EditLegalHeirForm from "../EditLegalHeirForm/EditLegalHeirForm"
import EditPurchaserDetails from "../EditPurchaserDetails/EditPurchaserDetails"
const { Option } = Select

const EditApplicationForm = props => {
    // variables
    const {
        getServiceDetailState,
        getDocumentList, getDocumentListResetState, getDocumentListState,
        verifyUpnAndMobileSubmitOtpState,
        verifyUpnAndMobileState,
        saveTransferApplication, transferApplicationSaveState, saveTransferApplicationResetState,
        fetchTransferApplication, transferApplicationFetchState, resetStateFetchTransferApplication,
        saveEditApplication, saveEditApplicationResetState, saveEditApplicationState,
        token,
        viewEditApplicationState,
        getLegalHeirListState,
        getPurchaserListState
    } = props
    const serviceId = props.serviceId
    const OrgId = getOrgId()

    let initialFormData = {
        PropertyId: viewEditApplicationState.data.PropertyRefId,
        OrgId: OrgId ? OrgId : 0,
        ApplicationTypeId: serviceId,
        OwnerId: 0,
        Remark: viewEditApplicationState.data.Remarks,
        Remarks: "",
        PermissionType: viewEditApplicationState.data.Remarks,
        Relation: viewEditApplicationState.data.Remarks,
        Share: viewEditApplicationState.data.Remarks,
        documentEntityId: 0,
        PermissionNo: viewEditApplicationState.data.PermissionNo,
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
    const [applicationId, setApplicationId] = useState(viewEditApplicationState.data.ApplicationId)
    const [submitApplication, setSubmitApplication] = useState(false)
    const [isPVerificationRequired, setIsPVerificationRequired] = useState(false)
    const [defaultFileList, setDefaultFileList] = useState([])
    // const [triggerPurchaserSubmit, setTriggerPurchaserSubmit] = useState(false)
    // const [triggerPurchaserSubmitStatus, setTriggerPurchaserSubmitStatus] = useState(false)
    // callbacks
    useEffect(() => {
        return (() => {
            // saveTransferApplicationResetState()
            resetStateFetchTransferApplication()
            getDocumentListResetState()
            saveEditApplicationResetState()
        })
    }, [])

    useEffect(() => {
        if (serviceId === '21' || serviceId === '1048') {
            setFormData({ ...formData, ['PermissionType']: 'Transfer' })
        }
        getDocumentList({
            PropertyId: viewEditApplicationState.data.PropertyRefId,
            OrgId: OrgId,
            ApplicationTypeId: serviceId,
            AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
            AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey
        })
    }, [])


    useEffect(() => {
        if (viewEditApplicationState.apiState === "success") {
            form.resetFields()
            setFormData({
                ...formData,
                ["OwnerId"]: viewEditApplicationState.data.OwnerId,
                ["PermissionType"]: viewEditApplicationState.data.TransferType,
                ["Relation"]: viewEditApplicationState.data.TransferSubType,
                ["Share"]: viewEditApplicationState.data.TransferPercentage,
                ["Remark"]: viewEditApplicationState.data.Remarks,
            })
            form.setFieldsValue({
                OwnerName: viewEditApplicationState.data.ApplicantDetails.Name,
                PermissionType: viewEditApplicationState.data.TransferType,
                Relation: viewEditApplicationState.data.TransferSubType,
                Share: viewEditApplicationState.data.TransferPercentage,
                Remark: viewEditApplicationState.data.Remarks,
            })
            let fileArr = []
            viewEditApplicationState.data.Documents.map((item) => {
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
    }, [viewEditApplicationState])

    // useEffect(() => {
    //     if (transferApplicationSaveState.apiState === "alert") {
    //         notification["error"]({
    //             message: transferApplicationSaveState.apiMessage,
    //             placement: "bottomRight"
    //         })
    //         saveTransferApplicationResetState()
    //         setSubmitApplication(false)
    //     }

    //     if (transferApplicationSaveState.apiState === "success") {
    //         notification["success"]({
    //             message: transferApplicationSaveState.apiMessage,
    //             placement: "bottomRight"
    //         })
    //         setApplicationId(transferApplicationSaveState.data.ApplicationId)
    //         fetchApplication()
    //         if (triggerPurchaserSubmitStatus) {
    //             setTriggerPurchaserSubmit(true)
    //         }
    //         if (submitApplication) {
    //             setRedirect([true, "/ndc-details/" + transferApplicationSaveState.data.ApplicationId])
    //         }
    //     }
    // }, [transferApplicationSaveState])


    useEffect(() => {
        if (saveEditApplicationState.apiState === "alert") {
            notification["error"]({
                message: saveEditApplicationState.apiMessage,
                placement: "bottomRight"
            })
            saveEditApplicationResetState()
            setSubmitApplication(false)
        }

        if (saveEditApplicationState.apiState === "success") {
            notification["success"]({
                message: saveEditApplicationState.apiMessage,
                placement: "bottomRight"
            })
            setApplicationId(viewEditApplicationState.data.ApplicationId)
            // if (triggerPurchaserSubmitStatus) {
            //     setTriggerPurchaserSubmit(true)
            // }
            setRedirect([true, "/ndc-details/" + viewEditApplicationState.data.ApplicationId])
        }
    }, [saveEditApplicationState])

    // functions

    const fetchApplication = () => {
        props.fetchNdcApplication()
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
                    saveEditApplication({
                        ApplicationId: viewEditApplicationState.data.ApplicationId,
                        PropertyRefId: viewEditApplicationState.data.PropertyRefId,
                        OrgId: formData.OrgId,
                        ApplicationType: props.serviceId,
                        Remark: formData.Remark,
                        Remarks: formData.Remarks,
                        AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
                        AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey,
                        TransferType: formData.PermissionType,
                        TransferSubType: formData.Relation,
                        TransferPercentage: formData.Share,
                        PermissionNo: formData.PermissionNo,
                        OwnerId: viewEditApplicationState.data.OwnerId,
                        GPASPA: "N",
                    })

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
                                <Input size="large" readOnly defaultValue={viewEditApplicationState.data.PropertyDetails.UPN} />
                            </FormItem>
                        </Col>
                        <Col span="8" >
                            <FormItem
                                label="Area"
                            >
                                <Input size="large" readOnly defaultValue={viewEditApplicationState.data.PropertyDetails.Area} />
                            </FormItem>
                        </Col>
                        <Col span="8" >
                            <FormItem
                                label="Authority Name"
                            >
                                <Input size="large" readOnly defaultValue={viewEditApplicationState.data.PropertyDetails.AuthorityName} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter="24" >
                        <Col span="8" >
                            <FormItem
                                label="Plot Number"
                            >
                                <Input size="large" readOnly defaultValue={viewEditApplicationState.data.PropertyDetails.PlotNumber} />
                            </FormItem>
                        </Col>
                        <Col span="8" >
                            <FormItem
                                label="Property Type"
                            >
                                <Input size="large" readOnly defaultValue={viewEditApplicationState.data.PropertyDetails.PropertyType} />
                            </FormItem>
                        </Col>
                        <Col span="8" >
                            <FormItem
                                label="Scheme Name"
                            >
                                <Input size="large" readOnly defaultValue={viewEditApplicationState.data.PropertyDetails.SchemeName} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter="24" >
                        <Col span="8" >
                            <FormItem
                                label="Reserved Price"
                            >
                                <Input size="large" readOnly defaultValue={viewEditApplicationState.data.PropertyDetails.ReservedPrice} />
                            </FormItem>
                        </Col>
                        <Col span="8" >
                            <FormItem
                                label="Sale Type"
                            >
                                <Input size="large" readOnly defaultValue={viewEditApplicationState.data.PropertyDetails.SaleType} />
                            </FormItem>
                        </Col>
                        <Col span="8" >
                            <FormItem
                                label="Usage Type"
                            >
                                <Input size="large" readOnly defaultValue={viewEditApplicationState.data.PropertyDetails.UsageType} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Heading style={{ marginTop: 16 }}>Applicant Details</Heading>
                    <Row gutter="24" >
                        <Col span="8" >
                            <FormItem
                                name="OwnerName"
                                label="Applying on behalf of"
                            >
                                <Input size="large" readOnly defaultValue={viewEditApplicationState.data.ApplicantDetails.Name} />
                            </FormItem>
                        </Col>

                        {(serviceId === '1509' || serviceId === '1508' || serviceId === '26' || serviceId === '25' || serviceId === '32') ?
                            null :
                            viewEditApplicationState.data.IsConveyanceDeedTaken === "Yes" &&
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
                                <Input size="large" readOnly name="Remark" showCount maxLength={200} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Heading>Edit Remark</Heading>
                    <Row gutter="24" >
                        <Col span="14" >
                            <FormItem
                                label="Remark"
                                name="Remarks"
                            >
                                <Input size="large" name="Remarks" showCount maxLength={200} onChange={handleOnChange} />
                            </FormItem>
                        </Col>
                    </Row>

                    <Heading style={{ marginTop: 16 }}>{props.changeOfOwnerShip ? "Transferee's" : "Purchaser's"} Details</Heading>
                    <EditPurchaserDetails
                        triggerFetchApplication={fetchApplication}
                        applicationId={applicationId}
                        changeOfOwnerShip={props.changeOfOwnerShip}
                        serviceId={props.serviceId}
                    // triggerPurchaserSubmit={triggerPurchaserSubmit}
                    />
                    <Heading style={{ marginTop: 16 }}>Legal Heir Details</Heading>
                    <EditLegalHeirForm
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
                                                    action={encodeURI(`${conf.api.base_url}DMS_DocumentService/UploadDocument?ApiKey=UploadDocument&OrgId=${OrgId}&ApplicationTypeId=${serviceId}&DocumentTypeId=${item.DocumentTypeId}&Documentname=${item.Name}&EntityTypeID=111&ApplicationId=${viewEditApplicationState.data.ApplicationId}&PhysicalVerificationRequired=${item.IsPVerificationRequired ? 1 : 0}`)}
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


                    <BlankSpace />
                    {getDocumentListState.apiState === "success" &&
                        <Space size="middle" >

                            <BlueButton disabled={submitDocumentStatus} loading={(saveEditApplicationState.apiState === "loading" || transferApplicationSaveState.apiState === "loading") ? true : false} htmlType="submit" >Submit Application For Processing</BlueButton>

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
    saveEditApplicationState: state.saveEditApplication,
    viewEditApplicationState: state.viewEditApplication,
    getLegalHeirListState: state.getLegalHeirList,
    getPurchaserListState: state.getPurchaserList,
})

const mapDispatchToProps = (dispatch) => ({
    getDocumentList: (params) => dispatch(getDocumentList(params)),
    // saveTransferApplication: (params) => dispatch(saveTransferApplication(params)),
    fetchTransferApplication: (params) => dispatch(fetchTransferApplication(params)),
    getAppintmentDate: (params) => dispatch(deleteTransferApplication(params)),
    resetStateFetchTransferApplication: () => dispatch(resetStateFetchTransferApplication()),
    // saveTransferApplicationResetState: () => dispatch(saveTransferApplicationResetState()),
    getDocumentListResetState: () => dispatch(getDocumentListResetState()),
    saveEditApplication: (params) => dispatch(saveEditApplication(params)),
    saveEditApplicationResetState: () => dispatch(saveEditApplicationResetState()),

})

export default connect(mapStateToProps, mapDispatchToProps)(EditApplicationForm)