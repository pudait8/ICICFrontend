import React, { useState, useEffect } from "react"
import { Col, Form, Row, Input, Space, Checkbox, Select, Upload, message, Switch, InputNumber, notification, Button, Modal } from "antd"
import { connect } from "react-redux"
import _ from "lodash"
import { UploadOutlined } from '@ant-design/icons'


// Action
import { getStateList, getStateListResetState } from '../../../actions/getStateListAction'
import { getDistrictList, getDistrictListResetState } from '../../../actions/getDistrictListAction'
import { saveEcluProjectDetails, saveEcluProjectDetailsResetState } from '../../../actions/saveEcluProjectDetailsAction'
import { getDocumentList, getDocumentListResetState } from '../../../actions/getDocumentListAction'

//Others
import { getOrgId } from '../../../utils'
import { BlankSpace, BlueButton, DocumentUpload, FileTitle, FormItem, ValidationDiv } from "../../Xcomponents";
import conf from "../../../config"
const { Option } = Select


const ProjectDetails = props => {
    const {
        getStateList, getStateListState, getStateListReset,
        getDistrictList, getDistrictListState, getDistrictListReset,
        verifyUpnAndMobileSubmitOtpState,
        saveEcluProjectDetails, saveEcluProjectDetailsResetState, saveEcluProjectDetailsState,
        getDocumentList, getDocumentListResetState, getDocumentListState,
        getEcluDetailState
    } = props

    //Variables
    const OrgId = getOrgId()
    const [formData, setFormData] = useState({
        "ProjectId": 0,
        "ApplicantId": "",
        "Name": "",
        "Purpose": "",
        "Address1": "",
        "Address2": "",
        "Pin": "",
        "Country": "",
        "StateId": "",
        "DistrictId": "",
        "Tehsil": "",
        "LiesUnderMC": "N",
        "Distance": "",
        "LiesUnderMonuments": "N",
        "NocTaken": "N",
        "ClearanceTaken": "N",
        "TempDPRId": "",
        "UploadDPR": "",
    })
    const [form] = Form.useForm()
    const [checkSameAs, setCheckSameAs] = useState(false)
    const [applicationId, setApplicationId] = useState(0)
    const [previewVisible, setPreviewVisible] = useState(false)
    const [previewImage, setPreviewImage] = useState('')
    const [currentFileType, setCurrentFileType] = useState('') // Current file format
    const [submitDocumentStatus, setSubmitDocumentStatus] = useState(false) // Current file format
    const [fileList, setFileList] = useState([])
    const [defaultFileList, setDefaultFileList] = useState([])
    const [files, setFiles] = useState([])
    //Callback
    useEffect(() => {
        getStateList({
            OrgId: OrgId,
        })
        return (() => {
            getDistrictListResetState()
            getStateListResetState()
            getDocumentListResetState()
            saveEcluProjectDetailsResetState()
        })
    }, [])
    useEffect(() => {
        if (saveEcluProjectDetailsState.apiState === "alert") {
            notification["error"]({
                message: saveEcluProjectDetailsState.apiMessage,
                placement: "bottomRight"
            })
        }

        if (saveEcluProjectDetailsState.apiState === "success") {
            notification["success"]({
                message: saveEcluProjectDetailsState.apiMessage,
                placement: "bottomRight"
            })
        }
    }, [saveEcluProjectDetailsState])


    useEffect(() => {
        if (getEcluDetailState.apiState === "success") {
            // setApplicantId(getEcluDetailState.data.ApplicantId)
            if (getEcluDetailState.data.ProjectDetails) {

                getDistrictList({
                    OrgId: OrgId,
                    StateId: getEcluDetailState.data.ProjectDetails.StateId
                })
                setFormData({
                    ...formData,
                    ApplicantId: getEcluDetailState.data.ApplicantId,
                    ProjectId: getEcluDetailState.data.ProjectDetails.ProjectId,
                    Name: getEcluDetailState.data.ProjectDetails.Name,
                    Purpose: getEcluDetailState.data.ProjectDetails.Purpose,
                    Address1: getEcluDetailState.data.ProjectDetails.Address1,
                    Address2: getEcluDetailState.data.ProjectDetails.Address2,
                    Pin: getEcluDetailState.data.ProjectDetails.Pin,
                    Country: getEcluDetailState.data.ProjectDetails.Country,
                    StateId: getEcluDetailState.data.ProjectDetails.StateId,
                    DistrictId: getEcluDetailState.data.ProjectDetails.DistrictId,
                    Tehsil: getEcluDetailState.data.ProjectDetails.Tehsil,
                    LiesUnderMC: getEcluDetailState.data.ProjectDetails.LiesUnderMC,
                    Distance: getEcluDetailState.data.ProjectDetails.Distance,
                    LiesUnderMonuments: getEcluDetailState.data.ProjectDetails.LiesUnderMonuments,
                    NocTaken: getEcluDetailState.data.ProjectDetails.NocTaken,
                    ClearanceTaken: getEcluDetailState.data.ProjectDetails.ClearanceTaken,
                })
                form.setFieldsValue({
                    Title: getEcluDetailState.data.ProjectDetails.Title,
                    Name: getEcluDetailState.data.ProjectDetails.Name,
                    Purpose: getEcluDetailState.data.ProjectDetails.Purpose,
                    Address1: getEcluDetailState.data.ProjectDetails.Address1,
                    Address2: getEcluDetailState.data.ProjectDetails.Address2,
                    Pin: getEcluDetailState.data.ProjectDetails.Pin,
                    Country: getEcluDetailState.data.ProjectDetails.Country,
                    StateId: getEcluDetailState.data.ProjectDetails.StateId,
                    DistrictId: getEcluDetailState.data.ProjectDetails.DistrictId,
                    Tehsil: getEcluDetailState.data.ProjectDetails.Tehsil,
                    LiesUnderMC: getEcluDetailState.data.ProjectDetails.LiesUnderMC,
                    Distance: getEcluDetailState.data.ProjectDetails.Distance,
                    LiesUnderMonuments: getEcluDetailState.data.ProjectDetails.LiesUnderMonuments,
                    NocTaken: getEcluDetailState.data.ProjectDetails.NocTaken,
                    ClearanceTaken: getEcluDetailState.data.ProjectDetails.ClearanceTaken,
                })
                //Document
                let fileArr = []
                getEcluDetailState.data.ProjectDetails.DPRReport.map((item) => {
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
                if (getEcluDetailState.data.ProjectDetails && getEcluDetailState.data.ProjectDetails.ProjectId > 0) {
                    setApplicationId(getEcluDetailState.data.ProjectDetails.ProjectId)
                }
            }
            else {
                setApplicationId(getDocumentListState.EntityId)
            }
        }
    }, [getDocumentListState])

    //Functions
    const handleOnChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }


    const onSameAsChange = (e) => {
        setCheckSameAs(e.target.checked)
        if (e.target.checked) {
            if (getEcluDetailState.data.BussinessEntityDetails) {
                getDistrictList({
                    OrgId: OrgId,
                    StateId: getEcluDetailState.data.BussinessEntityDetails.StateId
                })

                setFormData({
                    ...formData,
                    Address1: getEcluDetailState.data.BussinessEntityDetails.Address1,
                    Address2: getEcluDetailState.data.BussinessEntityDetails.Address2,
                    Pin: getEcluDetailState.data.BussinessEntityDetails.Pin,
                    Country: getEcluDetailState.data.BussinessEntityDetails.Country,
                    StateId: getEcluDetailState.data.BussinessEntityDetails.StateId,
                    DistrictId: getEcluDetailState.data.BussinessEntityDetails.DistrictId,
                    Tehsil: getEcluDetailState.data.BussinessEntityDetails.Tehsil,
                })
                form.setFieldsValue({
                    Address1: getEcluDetailState.data.BussinessEntityDetails.Address1,
                    Address2: getEcluDetailState.data.BussinessEntityDetails.Address2,
                    Pin: getEcluDetailState.data.BussinessEntityDetails.Pin,
                    Country: getEcluDetailState.data.BussinessEntityDetails.Country,
                    StateId: getEcluDetailState.data.BussinessEntityDetails.StateId,
                    DistrictId: getEcluDetailState.data.BussinessEntityDetails.DistrictId,
                    Tehsil: getEcluDetailState.data.BussinessEntityDetails.Tehsil,
                })
            }

        }
        else {
            setFormData({
                ...formData,
                Address1: "",
                Address2: "",
                Pin: "",
                Country: "",
                StateId: "",
                DistrictId: "",
                Tehsil: "",
            })
            form.setFieldsValue({
                Address1: "",
                Address2: "",
                Pin: "",
                Country: "",
                StateId: null,
                DistrictId: null,
                Tehsil: "",
            })
        }

    }

    const handleOnChangeSelect = (value, name) => {
        setFormData({ ...formData, [name]: value })
    }


    const handleSwitchChange = (name, checked) => {
        setFormData({ ...formData, [name]: checked })
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
        saveEcluProjectDetails({
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
                    <Col span="16" >
                        <FormItem
                            label="Project Name"
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
                            label="Project Purpose"
                            name="Purpose"
                            rules={[{
                                required: true,
                                message: 'Required'
                            }]}
                        >
                            <Input name="Purpose" size="large" onChange={handleOnChange} />
                        </FormItem>
                    </Col>
                </Row>
                {/* <Heading>Project Address</Heading> */}
                {/* <BlankSpace /> */}
                <Row gutter="24" >
                    <Col span="24" >
                        <FormItem>
                            <Checkbox checked={checkSameAs} onChange={onSameAsChange}>Project Address same as Business Address</Checkbox>
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter="24" >
                    <Col span="8" >
                        <FormItem
                            label="Address Line 1"
                            name="Address1"
                            rules={[{
                                required: true,
                                message: 'Required'
                            }]}
                        >
                            <Input name="Address1" size="large" onChange={handleOnChange} />
                        </FormItem>
                    </Col>
                    <Col span="8" >
                        <FormItem
                            label="Address Line 2"
                            name="Address2"
                            rules={[{ required: true, message: 'Required' }]}
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
                                { required: true, message: 'Required' }
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
                <Row gutter="24" >
                    <Col span="8" >
                        <FormItem
                            label="Does this site lie under MC Limit?"
                            name="LiesUnderMC"
                        >
                            <Switch onChange={checked => handleSwitchChange("LiesUnderMC", checked ? "Y" : "N")}
                                checked={formData.LiesUnderMC === "Y"} checkedChildren="Yes" unCheckedChildren="No" />
                        </FormItem>
                    </Col>
                    <Col span="8" >
                        <FormItem
                            label="Distance from MC Limit"
                            name="Distance"
                            rules={[
                                { required: true, message: 'Required' },
                            ]}
                        >
                            <InputNumber name="Distance" size="large" onChange={(v) => handleOnChangeSelect(v, 'Distance')} style={{ width: "100%" }} />
                        </FormItem>
                    </Col>
                    <Col span="8" ></Col>
                    <Col span="8" >
                        <FormItem
                            label="Is proposed construction sites fell in limit of any centrally protected Mounments?"
                            name="LiesUnderMonuments"
                        >
                            <Switch onChange={checked => handleSwitchChange("LiesUnderMonuments", checked ? "Y" : "N")}
                                checked={formData.LiesUnderMonuments === "Y"} checkedChildren="Yes" unCheckedChildren="No" />
                        </FormItem>
                    </Col>
                    <Col span="8" >
                        <FormItem
                            label="Weather NMA Noc is available with you for proposed construction sites?"
                            name="NocTaken"
                        >
                            <Switch onChange={checked => handleSwitchChange("NocTaken", checked ? "Y" : "N")}
                                checked={formData.NocTaken === "Y"} checkedChildren="Yes" unCheckedChildren="No" />
                        </FormItem>
                    </Col>
                    <Col span="8" ></Col>
                    <Col span="8" >
                        <FormItem
                            label="Do you already have any Regulatory Clearance"
                            name="ClearanceTaken"
                        >
                            <Switch onChange={checked => handleSwitchChange("ClearanceTaken", checked ? "Y" : "N")}
                                checked={formData.ClearanceTaken === "Y"} checkedChildren="Yes" unCheckedChildren="No" />
                        </FormItem>
                    </Col>
                </Row>
                {getDocumentListState.apiState === "success" &&
                    <>
                        <Row gutter={24}>
                            <Col span="24" >
                                <FileTitle>
                                    <span>2. </span>
                                    <ValidationDiv className="validate">
                                        Upload Detaild Project Report (DPR)
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
                                        { required: _.find(defaultFileList, { 'documentTypeId': 1504 }) ? false : true, message: 'Required' },
                                    ]}
                                    style={{ paddingLeft: 22 }}
                                >
                                    <DocumentUpload
                                        name="UploadAadhaarCard"
                                        listType="picture-card"
                                        onPreview={() => onPreview(_.find(defaultFileList, { 'documentTypeId': 1504 }))}
                                        action={`${conf.api.base_url}DMS_DocumentService/UploadDocument?ApiKey=UploadDocument&OrgId=${OrgId}&ApplicationTypeId=23&EntityTypeID=700&DocumentTypeId=1504&DocumentName=DPR&ApplicationId=${applicationId}&PhysicalVerificationRequired=0`}
                                        headers={{
                                            'AuthToken': verifyUpnAndMobileSubmitOtpState.AuthToken,
                                            'AuthTokenKey': verifyUpnAndMobileSubmitOtpState.AuthTokenKey
                                        }}
                                        beforeUpload={file => {
                                            let checkValicdation = beforeUpload(file)
                                            if (checkValicdation) {
                                                setFormData({
                                                    ...formData,
                                                    ["UploadDPR"]: true
                                                })
                                                setFiles({
                                                    ...files,
                                                    ["UploadDPR"]: file
                                                })
                                                setFileList(state => ({
                                                    ...fileList,
                                                    ["UploadDPR"]: []
                                                }))
                                                setSubmitDocumentStatus(true)
                                                return true
                                            }
                                            else {
                                                setFileList(state => ({
                                                    ...fileList,
                                                    ["UploadDPR"]: []
                                                }))
                                                setFormData({
                                                    ...formData,
                                                    ["UploadDPR"]: ""
                                                })

                                                return false
                                                // return Upload.LIST_IGNORE
                                            }
                                        }}
                                        onError={(info) => {
                                            setSubmitDocumentStatus(false)
                                            setFormData({ ...formData, ["UploadDPR"]: false })
                                        }}
                                        onRemove={file => {
                                            setFileList(state => ({
                                                ...fileList,
                                                ["UploadDPR"]: []
                                            }))
                                            const defaultFileLists = defaultFileList;
                                            let fileArr = []
                                            defaultFileLists.forEach(item => {
                                                if (item.documentTypeId !== 1504) {
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
                                                let extension = files["UploadDPR"].name.substr(files["UploadDPR"].name.lastIndexOf(".") + 1)
                                                let filePrependString = ""
                                                if (extension === 'jpg' || extension === 'jpeg' || extension === 'png') {
                                                    filePrependString = `data:image/${extension};base64,${response.CustomObject.FileData}`
                                                }
                                                else {
                                                    filePrependString = `data:application/${extension};base64,${response.CustomObject.FileData}`
                                                }
                                                fileArr.push({
                                                    documentTypeId: 1504,
                                                    uid: response.CustomObject.FileId,
                                                    name: files["UploadDPR"].name,
                                                    status: 'done',
                                                    url: filePrependString,
                                                    thumbUrl: filePrependString,
                                                    preview: filePrependString,
                                                })
                                                setDefaultFileList(fileArr)
                                                setFileList(state => ({
                                                    ...fileList,
                                                    ["UploadDPR"]: [{
                                                        documentTypeId: 1504,
                                                        uid: response.CustomObject.FileId,
                                                        name: files["UploadDPR"].name,
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
                                                setFormData({ ...formData, ["UploadDPR"]: false, ["TempDPRId"]: response.CustomObject.EntityId })
                                            }
                                            else {
                                                setFormData({ ...formData, ["UploadDPR"]: false })
                                            }
                                            setSubmitDocumentStatus(false)
                                        }}
                                        defaultFileList={_.find(defaultFileList, { 'documentTypeId': 1504 }) ? [_.find(defaultFileList, { 'documentTypeId': 1504 })] : []}
                                        fileList={fileList["UploadDPR"]}
                                        allowedFileTypes={["image/jpg", "image/jpeg"]}
                                        allowedFileSizeInKb={100}
                                        fileTypeValidationMessage={"Only JPG & JPEG file types allowed!"}
                                    >
                                        {_.find(defaultFileList, { 'documentTypeId': 1504 }) ? null : <Button icon={<UploadOutlined />}
                                            loading={formData.UploadDPR}
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
                        <Space>
                            {/* <BlueButton htmlType="submit" >GO TO BUSINESS ENTITY DETAIL SECTION</BlueButton> */}
                            <BlueButton htmlType="submit" disabled={submitDocumentStatus} loading={saveEcluProjectDetails.apiState === "loading"}>SAVE AND GO TO PROJECT SITE/LAND DETAILS</BlueButton>
                        </Space>
                    </>
                }
            </Form>
        </>
    )


}
const mapStateToProps = (state) => ({
    getStateListState: state.getStateList,
    getDistrictListState: state.getDistrictList,
    verifyUpnAndMobileSubmitOtpState: state.verifyUpnAndMobileSubmitOtp,
    saveEcluProjectDetailsState: state.saveEcluProjectDetails,
    getDocumentListState: state.getDocumentList,
    getEcluDetailState: state.getEcluDetail,
})

const mapDispatchToProps = (dispatch) => ({
    getStateList: (params) => dispatch(getStateList(params)),
    getStateListResetState: () => dispatch(getStateListResetState()),
    getDistrictList: (params) => dispatch(getDistrictList(params)),
    getDistrictListResetState: () => dispatch(getDistrictListResetState()),
    saveEcluProjectDetails: (params) => dispatch(saveEcluProjectDetails(params)),
    saveEcluProjectDetailsResetState: () => dispatch(saveEcluProjectDetailsResetState()),
    getDocumentList: (params) => dispatch(getDocumentList(params)),
    getDocumentListResetState: () => dispatch(getDocumentListResetState()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetails)
