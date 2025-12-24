import React, { useEffect, useState } from "react"
import { Col, Form, Row, Upload, Button, notification, Input, DatePicker, Select, Checkbox, InputNumber, Alert, Space, Modal } from "antd"
import { connect } from "react-redux"
import { UploadOutlined } from '@ant-design/icons'
import _ from "lodash"
import { Link, Redirect } from "react-router-dom"

// Components
import { BlankSpace, FlexDiv, DocumentUpload, TextButton, FormItem, ValidationDiv, BlueButton, FileTitle } from '../Xcomponents'
import { Container, Heading } from './ServiceDetailsPrivatePropertiesFormStyle'
import { getAuthData, getOrgId } from '../../utils'
import OwnerForm from "../../pages/ServiceDetailsPrivateProperties/OwnerForm"
import conf from '../../config'

// Actions
import { privatePropertyApplication, privatePropertyApplicationResetState } from '../../actions/privatePropertyApplicationAction'
import { getAppointmentDate, getAppointmentDateResetState } from '../../actions/getAppointmentDateAction'
import { getDocumentList, getDocumentListResetState } from '../../actions/getDocumentListAction'
import { toGetPrivateScheme, toGetPrivateSchemeResetState } from '../../actions/toGetPrivateSchemeAction'
import { toGetPrivatePropertiesList, toGetPrivatePropertiesListResetState } from '../../actions/toGetPrivatePropertiesListAction'
import { saveNdcApplication, saveNdcApplicationResetState } from '../../actions/saveNdcApplicationAction'
import { getPropertyAreaUnitList, resetStateGetPropertyAreaUnitList } from '../../actions/getPropertyAreaUnitListAction'


const { Option } = Select
export const ServiceDetailsPrivatePropertiesForm = (props) => {
    const {
        getPropertyAreaUnitList,
        getPropertyAreaUnitListState,
        privatePropertyApplication,
        privatePropertyApplicationResetState,
        verifyUpnAndMobileSubmitOtpState,
        toGetPrivatePropertiesList,
        toGetPrivateScheme,
        saveNdcApplication,
        saveNdcApplicationResetState,
        listofDocuments,
        saveNdcApplicationState,
        getDocumentList, getDocumentListState,
        toGetPrivatePropertiesListState,
        toGetPrivateSchemeState,
        getAppointmentDateState,
        mobileNoState,
        getDocumentListResetState,
        getAppointmentDate,
        getAppointmentDateResetState,
        saveOwnerPrivatePropertiesState,
        toGetPrivatePropertiesListResetState } = props;
    const [uploadLoading, setUploadLoading] = useState([])
    const [documentFileId, setDocumentFileId] = useState([])
    const [redirect, setRedirect] = useState(false);
    const [appId, setAppId] = useState();
    const OrgId = getOrgId();
    const [currentFileType, setCurrentFileType] = useState(''); // Current file format
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([])
    const [files, setFiles] = useState([])
    const [form] = Form.useForm();
    const [defaultFileList, setDefaultFileList] = useState([]);
    const [submitDocumentStatus, setSubmitDocumentStatus] = useState(false);
    const [basedOnProperty, setBasedOnProperty] = useState(true);
    const [formData, setFormData] = useState({
        IdentityProofUploaded: "",
        ApplicantName: '',
        Remark: "",
        SchemeId: "",
        PropertyNumber: "",
        Mobile: '',
        AppointmentDate: '',
        UnitOfArea: '',
        Area: ''
    });
    const [isPVerificationRequired, setIsPVerificationRequired] = useState(false);

    useEffect(() => {
        setAppId();
        setRedirect(false);
        toGetPrivateScheme();
        saveNdcApplicationResetState();
        privatePropertyApplicationResetState();
        getDocumentListResetState();
        getAppointmentDateResetState();
        getDocumentList({
            PropertyId: verifyUpnAndMobileSubmitOtpState.data.PropertyRefId,
            OrgId: OrgId,
            ApplicationTypeId: props.serviceId,
            AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
            AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey
        })
        getPropertyAreaUnitList();
    }, []);

    const handleOnChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    };

    useEffect(() => {
        if (saveNdcApplicationState.apiState === "success") {
            notification.success({
                message: saveNdcApplicationState.apiMessage,
                placement: "bottomRight"
            });
            setRedirect(true);
            setAppId(saveNdcApplicationState.data.ApplicationId)
        }
        else if (saveNdcApplicationState.apiState == 'alert') {
            notification.warn({
                message: saveNdcApplicationState.apiMessage,
                placement: "bottomRight"
            });
        }
    }, [saveNdcApplicationState]);

    const submit = () => {
        if (saveOwnerPrivatePropertiesState.apiState === 'success') {
            saveNdcApplication({
                OrgId: OrgId,
                PermissionNo: verifyUpnAndMobileSubmitOtpState.nocNumber,
                ApplicationType: props.serviceId,
                Name: formData.ApplicantName,
                Remark: formData.Remark,
                Mobile: mobileNoState.MobileNo,
                UnitOfArea: formData.UnitOfArea,
                Area: formData.Area,
                TemporaryApplicationId: getDocumentListState.EntityId,
                PropertyRefId: formData.PropertyNumber,
                SubmitType: 1,
                AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
                AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey,
                ApiKey: "SavePropertyApplication",
                GPASPA: "",
                AppointmentDate: formData.AppointmentDate,
            })
        }
        else {
            notification.warn({
                message: "Atleast one owner must be added",
                placement: "bottomRight"
            });
        }
    };

    const handleOnChangeSelect = (field, value) => {
        setFormData({ ...formData, [field]: value })
    };

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e
        }
        return e && e.fileList
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
            setCurrentFileType('image');
            setPreviewImage(src);
            setPreviewVisible(true);
        }
        else {
            setCurrentFileType('pdf');
            setPreviewImage(src);
            setPreviewVisible(true);
        }
    };

    useEffect(() => {
        if (formData.SchemeId) {
            form.setFieldsValue({ "PropertyNumber": "", "Area": "", "UnitOfArea": "" })
            toGetPrivatePropertiesList(formData.SchemeId);
        }
    }, [formData.SchemeId]);

    useEffect(() => {
        if (formData.PropertyNumber) {
            let array = [];
            toGetPrivatePropertiesListState.data.map((item) => {
                if (item.Id === formData.PropertyNumber) {
                    array = item
                }
            }, [])
            if (array.PropertyAreaUnit === 0 && array.Area === 0) {
                setBasedOnProperty(false)
            }
            else {
                setBasedOnProperty(true);
                setFormData({ ...formData, ['Area']: "", ['UnitOfArea']: "" });
            }
            form.setFieldsValue({
                ...form,
                Area: array.Area == 0 ? "" : array.Area,
                UnitOfArea: array.PropertyAreaLabel == "-" ? "" : array.PropertyAreaLabel
            })
        }

    }, [formData.PropertyNumber]);

    const renderExtensions = (extension) => {
        let extensionData = []
        extension.map((data) => {
            let a = "." + _.split(data, "/")[1]
            extensionData.push(a)
        })
        return extensionData.join(", ")
    };

    const handleCancel = () => {
        setPreviewVisible(false);
    };

    useEffect(() => {
        if (getDocumentListState.apiState === "success") {
            let data = _.find(getDocumentListState.list, { 'IsPVerificationRequired': true }) ? true : false
            if (data) {
                setIsPVerificationRequired(true);
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

    return (
        <>
            {saveNdcApplicationState.apiState === "success" && appId ?
                <Redirect to={`/ndc-details/${appId}`} />
                :
                <Container>
                    <Form
                        layout="vertical"
                        form={form}
                        onFinish={submit}
                    >
                        <Heading>Applicant Details</Heading>
                        <Row gutter="24" >
                            <Col span="8" >
                                <FormItem
                                    label="Applicant Name"
                                    name="ApplicantName"
                                    rules={[{
                                        required: true,
                                        message: 'Required'
                                    }]}
                                >
                                    <Input name="ApplicantName" maxLength={50} size="large" onChange={handleOnChange} />
                                </FormItem>
                            </Col>
                            <Col span="8" >
                                <FormItem
                                    label="Remark"
                                    name="Remark"
                                >
                                    <Input size="large" name="Remark" onChange={handleOnChange} showCount maxLength={200} />
                                </FormItem>
                            </Col>
                        </Row>

                        <Heading>Property Details</Heading>
                        <Row gutter="24" >
                            <Col span="8" >
                                <FormItem
                                    label="Select Scheme"
                                    name="SchemeId"
                                    rules={[{
                                        required: true,
                                        message: 'Required'
                                    }]}
                                >
                                    <Select
                                        showSearch
                                        name="SchemeId"
                                        disabled={props.IsRenewal === "Y"}
                                        onSelect={(v) => handleOnChangeSelect("SchemeId", v)}
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        size="large"
                                    >
                                        {toGetPrivateSchemeState.data.length > 0 &&
                                            toGetPrivateSchemeState.data.map((item) => (<Option key={item.Id} value={item.Id}>{item.Name}</Option>))}
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span="8" >
                                <FormItem
                                    label="Select Property Number"
                                    name="PropertyNumber"
                                    rules={[{
                                        required: true,
                                        message: 'Required'
                                    }]}
                                >
                                    <Select
                                        showSearch
                                        name="PropertyNumber"
                                        disabled={props.IsRenewal === "Y"}
                                        onSelect={(v) => handleOnChangeSelect("PropertyNumber", v)}
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        size="large"
                                    >
                                        {toGetPrivatePropertiesListState.data.length > 0 &&
                                            toGetPrivatePropertiesListState.data.map((item) => <Option key={item.Id} value={item.Id}>{item.Name}</Option>)}
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span="8" >
                                <FormItem
                                    label="Area"
                                    name="Area"
                                    rules={[{
                                        required: true,
                                        message: 'Required'
                                    }]}
                                >
                                    <Input readOnly={basedOnProperty} disabled={props.IsRenewal === "Y"} size="large" name="Area" onChange={handleOnChange} />
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter="24" >
                            <Col span="8" >
                                <FormItem
                                    label="Unit Of Area"
                                    name="UnitOfArea"
                                    rules={[{
                                        required: true,
                                        message: 'Required'
                                    }]}
                                >
                                    <Select
                                        // aria-readonly={basedOnProperty}
                                        // readOnly={basedOnProperty}
                                        showSearch
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        name="UnitOfArea"
                                        disabled={props.IsRenewal === "Y" || basedOnProperty}
                                        onSelect={(v) => handleOnChangeSelect("UnitOfArea", v)}
                                        size="large"
                                    >
                                        {getPropertyAreaUnitListState.data.length > 0 &&
                                            getPropertyAreaUnitListState.data.map((item) =>
                                                <Option key={item.Id} value={item.Id}>{item.Name}</Option>)}
                                    </Select>
                                </FormItem>
                            </Col>
                        </Row>
                        <Heading>Owner Details</Heading>
                        <OwnerForm
                            serviceId={props.serviceId}
                            // triggerDraftSave={onSaveDraft}
                            AuthToken={verifyUpnAndMobileSubmitOtpState.AuthToken}
                            AuthTokenKey={verifyUpnAndMobileSubmitOtpState.AuthTokenKey}
                            EntityId={getDocumentListState.EntityId}
                        />
                        <BlankSpace />

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
                                                onSelect={(v) => handleOnChangeSelect("AppointmentDate", v)}
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

                        <Space size="middle" >
                            <BlueButton disabled={false} loading={false} htmlType="submit" >Submit Application For Processing</BlueButton>
                        </Space>
                    </Form>
                </Container>
            }

        </>
    )
}

const mapStateToProps = (state) => ({
    verifyUpnAndMobileSubmitOtpState: state.verifyUpnAndMobileSubmitOtp,
    getDocumentListState: state.getDocumentList,
    toGetPrivateSchemeState: state.toGetPrivateScheme,
    toGetPrivatePropertiesListState: state.toGetPrivatePropertiesList,
    saveNdcApplicationState: state.saveNdcApplication,
    mobileNoState: state.mobileNo,
    saveOwnerPrivatePropertiesState: state.saveOwnerPrivateProperties,
    getAppointmentDateState: state.getAppointmentDate,
    getPropertyAreaUnitListState: state.getPropertyAreaUnitList,
})

const mapDispatchToProps = (dispatch) => ({
    privatePropertyApplication: (params) => dispatch(privatePropertyApplication(params)),
    getDocumentListResetState: () => dispatch(getDocumentListResetState()),
    getDocumentList: (params) => dispatch(getDocumentList(params)),
    privatePropertyApplicationResetState: () => dispatch(privatePropertyApplicationResetState()),
    toGetPrivateScheme: () => dispatch(toGetPrivateScheme()),
    toGetPrivatePropertiesList: (params) => dispatch(toGetPrivatePropertiesList(params)),
    toGetPrivatePropertiesListResetState: () => dispatch(toGetPrivatePropertiesListResetState()),
    saveNdcApplication: (params) => dispatch(saveNdcApplication(params)),
    saveNdcApplicationResetState: () => dispatch(saveNdcApplicationResetState()),
    getAppointmentDate: (params) => dispatch(getAppointmentDate(params)),
    getAppointmentDateResetState: () => dispatch(getAppointmentDateResetState()),
    getPropertyAreaUnitList: () => dispatch(getPropertyAreaUnitList()),

})

export default connect(mapStateToProps, mapDispatchToProps)(ServiceDetailsPrivatePropertiesForm)