import React, { useState, useEffect } from "react"
import { Col, Form, Row, Input, Switch, Space, notification, Button, message } from "antd"
import _ from 'lodash'
import { UploadOutlined } from '@ant-design/icons'
import { connect } from "react-redux"

//Others
import { FormItem, BlankSpace, BlueButton, DocumentUpload } from "../../Xcomponents";
import { Heading } from "../../../pages/ECLU/ECLUStyle";
import { getOrgId } from '../../../utils'

//Actions
import { saveEcluLandDetails, saveEcluLandDetailsResetState } from '../../../actions/saveEcluLandDetailsAction'
import { getDocumentList, getDocumentListResetState } from '../../../actions/getDocumentListAction'


const ProjectSiteDetails = props => {

    //Variables
    const {
        verifyUpnAndMobileSubmitOtpState,
        saveEcluLandDetails, saveEcluLandDetailsResetState, saveEcluLandDetailsState,
        getDocumentList, getDocumentListResetState, getDocumentListState,
        getEcluDetailState
    } = props
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
        return (() => {
            getDocumentListResetState()
            saveEcluLandDetailsResetState()
        })
    }, [])
    useEffect(() => {
        if (saveEcluLandDetailsState.apiState === "alert") {
            notification["error"]({
                message: saveEcluLandDetailsState.apiMessage,
                placement: "bottomRight"
            })
        }

        if (saveEcluLandDetailsState.apiState === "success") {
            notification["success"]({
                message: saveEcluLandDetailsState.apiMessage,
                placement: "bottomRight"
            })
        }
    }, [saveEcluLandDetailsState])

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
            // if (getEcluDetailState.apiState === "success") {
            //     if (getEcluDetailState.data.ProjectDetails && getEcluDetailState.data.ProjectDetails.ProjectId > 0) {
            //         setApplicationId(getEcluDetailState.data.ProjectDetails.ProjectId)
            //     }
            // }
            // else {
            //     setApplicationId(getDocumentListState.EntityId)
            // }
            setApplicationId(getDocumentListState.EntityId)
        }
    }, [getDocumentListState])

    //Functions
    const handleOnChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSwitchChange = (name, checked) => {
        setFormData({ ...formData, [name]: checked })
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

    const handleSubmit = () => {
        saveEcluLandDetails({
            OrgId: OrgId,
            AuthToken: verifyUpnAndMobileSubmitOtpState.AuthToken,
            AuthTokenKey: verifyUpnAndMobileSubmitOtpState.AuthTokenKey,
            ...formData
        })
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
                            label="Scale of Mesurement(As spacified by Patwari on Ask-Shajra Plan)"
                            name="ScaleMesurement"
                            rules={[{
                                required: true,
                                message: 'Required'
                            }]}
                        >
                            <Input name="ScaleMesurement" size="large" onChange={handleOnChange} />
                        </FormItem>
                    </Col>
                    <Col span="8" >
                        <FormItem
                            label="Hadbast No."
                            name="Hadbast"
                            rules={[{
                                required: true,
                                message: 'Required'
                            }]}
                        >
                            <Input name="Hadbast" size="large" onChange={handleOnChange} />
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter="24" >
                    <Col span="8" >
                        <FormItem
                            label="Musteel & Khasra Nos."
                            name="Musteel"
                            rules={[{
                                required: true,
                                message: 'Required'
                            }]}
                        >
                            <Input name="Musteel" size="large" onChange={handleOnChange} />
                        </FormItem>
                    </Col>
                </Row>
                <BlankSpace />
                <Heading>List of Khasra number for which CLU is being applied for</Heading>
                <p>(For Standalone Project: The Khasra number under join ownership (Mustaka Khata) shall not be considered for CLU Only sole ownership (Salam Khata)/ Registered Lease Dead for Minimum 15 years of Khasra Numbers under sole ownership shall be considered for )</p>
                <Row gutter="24" >
                    <Col span="8" >
                        <FormItem
                            label="Bigah/Kanal"
                            name="Bigah"
                            rules={[{ required: true, message: 'Required' }]}
                        >
                            <Input name="Bigah" size="large" onChange={handleOnChange} />
                        </FormItem>
                    </Col>
                    <Col span="8" >
                        <FormItem
                            label="Biswa/Marla"
                            name="Biswa"
                            rules={[
                                { required: true, message: 'Required' },
                            ]}
                        >
                            <Input name="Biswa" size="large" onChange={handleOnChange} />
                        </FormItem>
                    </Col>
                    <Col span="8" >
                        <FormItem
                            label="Biswasi/Sarsai"
                            name="Biswasi"
                            rules={[
                                { required: true, message: 'Required' }
                            ]}
                        >
                            <Input name="Biswasi" size="large" onChange={handleOnChange} />
                        </FormItem>
                    </Col>
                    <Col span="8" >
                        <FormItem
                            label="Detail of Ownership"
                            name="Ownership"
                            rules={[
                                { required: true, message: 'Required' }
                            ]}
                        >
                            <Input name="Ownership" size="large" onChange={handleOnChange} />
                        </FormItem>
                    </Col>
                    <Col span="8" >
                        <FormItem
                            label="Type of Land Ownership"
                            name="LandOwnership"
                            rules={[
                                { required: true, message: 'Required' }
                            ]}
                        >
                            <Input name="LandOwnership" size="large" onChange={handleOnChange} />
                        </FormItem>
                    </Col>
                    <Col span="8" >
                        <FormItem
                            label="Is Mortgaged"
                            name="IsMortgaged"
                            rules={[
                                { required: true, message: 'Required' }
                            ]}
                        >
                            <Input name="IsMortgaged" size="large" onChange={handleOnChange} />
                        </FormItem>
                    </Col>
                </Row>
                <Button type="primary">SAVE LAND DETAIL</Button>
                <BlankSpace />
                <p>Detail of Already Granted CLU (if Any)</p>
                <Row gutter="24" >
                    <Col span="8" >
                        <FormItem
                            label="Vide Letter Number"
                            name="VideLetter"
                            rules={[
                                { required: true, message: 'Required' },
                            ]}
                        >
                            <Input name="VideLetter" size="large" onChange={handleOnChange} />
                        </FormItem>
                    </Col>
                    <Col span="8" >
                        <FormItem
                            label="Dated"
                            name="Dated"
                            rules={[
                                { required: true, message: 'Required' },
                            ]}
                        >
                            <Input name="Dated" size="large" onChange={handleOnChange} />
                        </FormItem>
                    </Col>
                    <Col span="8" >
                        <FormItem
                            label="Area"
                            name="Area"
                            rules={[
                                { required: true, message: 'Required' }
                            ]}
                        >
                            <Input name="Area" size="large" onChange={handleOnChange} />
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span="20" >
                        <div style={{ display: "flex" }} >
                            <FormItem
                                name="UploadGPA"
                                getValueFromEvent={normFile}
                            >
                                <DocumentUpload
                                    name="UploadGPA"
                                    listType="picture-card"
                                    onPreview={() => onPreview(_.find(defaultFileList, { 'documentTypeId': 812 }))}
                                    action={`http://localhost:3000/`}
                                    className="avatar-uploader"
                                    beforeUpload={file => {
                                        setFormData({
                                            ...formData,
                                            ["UploadGPA"]: true
                                        })
                                        setFiles({
                                            ...files,
                                            ["UploadGPA"]: file
                                        })
                                        setFileList(state => ({
                                            ...fileList,
                                            ["UploadGPA"]: []
                                        }))
                                        setSubmitDocumentStatus(true)
                                        return true
                                    }}
                                    onError={(info) => {
                                        setSubmitDocumentStatus(false)
                                        setFormData({ ...formData, ["UploadGPA"]: false })
                                    }}
                                    onRemove={file => {
                                        setFileList(state => ({
                                            ...fileList,
                                            ["UploadGPA"]: []
                                        }))
                                        const defaultFileLists = defaultFileList;
                                        let fileArr = []
                                        defaultFileLists.forEach(item => {
                                            if (item.documentTypeId !== 812) {
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
                                            let extension = files["UploadGPA"].name.substr(files["UploadGPA"].name.lastIndexOf(".") + 1)
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
                                                name: files["UploadGPA"].name,
                                                status: 'done',
                                                url: filePrependString,
                                                thumbUrl: filePrependString,
                                                preview: filePrependString,
                                            })
                                            setDefaultFileList(fileArr)
                                            setFileList(state => ({
                                                ...fileList,
                                                ["UploadGPA"]: [{
                                                    documentTypeId: 812,
                                                    uid: response.CustomObject.DocumentId,
                                                    name: files["UploadGPA"].name,
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
                                            setFormData({ ...formData, ["UploadGPA"]: false })
                                        }
                                        else {
                                            setFormData({ ...formData, ["UploadGPA"]: false })
                                        }
                                        setSubmitDocumentStatus(false)
                                    }}
                                    defaultFileList={_.find(defaultFileList, { 'documentTypeId': 812 }) ? [_.find(defaultFileList, { 'documentTypeId': 812 })] : []}
                                    fileList={fileList["UploadGPA"]}
                                >
                                    {_.find(defaultFileList, { 'documentTypeId': 812 }) ? null : <Button icon={<UploadOutlined />}
                                        loading={formData.UploadGPA}
                                    >Click to Upload</Button>
                                    }
                                </DocumentUpload>
                            </FormItem>
                            <span>
                                CLU LETTER
                            </span>

                        </div>
                    </Col>
                    <Col span="4" >
                        <Button type="primary">ADD CLU</Button>
                    </Col>
                </Row>

                <BlankSpace />
                <Row gutter="24" >
                    <Col span="12" >
                        <FormItem
                            label="Weather the land free from any encumbrance"
                            name="encumbrance"
                            rules={[
                                { required: true, message: 'Required' }
                            ]}
                        >
                            <Input name="encumbrance" size="large" onChange={handleOnChange} />
                        </FormItem>
                    </Col>
                    <Col span="12" >
                        <FormItem
                            label="Enter details if yes"
                            name="Details"
                            rules={[
                                { required: true, message: 'Required' }
                            ]}
                        >
                            <Input name="Details" size="large" onChange={handleOnChange} />
                        </FormItem>
                    </Col>
                    <Col span="8" >
                        <FormItem
                            label="Status of site/land"
                            name="land"
                            rules={[
                                { required: true, message: 'Required' }
                            ]}
                        >
                            <Input name="land" size="large" onChange={handleOnChange} />
                        </FormItem>
                    </Col>
                    <Col span="8" >
                        <FormItem
                            label="Land zone as per master plan"
                            name="land"
                            rules={[
                                { required: true, message: 'Required' }
                            ]}
                        >
                            <Input name="land" size="large" onChange={handleOnChange} />
                        </FormItem>
                    </Col>
                    <Col span="8" >
                        <FormItem
                            label="Width of exsiting approach revenue road"
                            name="RevenueRoad"
                            rules={[
                                { required: true, message: 'Required' }
                            ]}
                        >
                            <Input name="RevenueRoad" size="large" onChange={handleOnChange} />
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter="24" >
                    <Col span="2">
                        <Switch onChange={handleSwitchChange} checkedChildren="Yes" unCheckedChildren="No" />
                    </Col>
                    <Col span="22">
                        Whether approach to site [Entry/ Exit] from National Highway, Attach Provisional NOC/Clearance of National YES Highway Authority of India, MoRTH
                    </Col>
                    <Col span="2">
                        <Switch onChange={handleSwitchChange} checkedChildren="Yes" unCheckedChildren="No" />
                    </Col>
                    <Col span="22">
                        Whether approach to site [Entry/ Exit] from Scheduled Road (List of Scheduled Roads), Attach NOC from PWD NO (B&R) Punjab
                    </Col>
                    <Col span="2">
                        <Switch onChange={handleSwitchChange} checkedChildren="Yes" unCheckedChildren="No" />
                    </Col>
                    <Col span="22">
                        If the site is in vicinity of railway line, whether provision to open space as per guidelines/ norms of Railway YES Department/ Government of India from railway line boundary
                    </Col>
                    <Col span="2">
                        <Switch onChange={handleSwitchChange} checkedChildren="Yes" unCheckedChildren="No" />
                    </Col>
                    <Col span="22">
                        Whether any canal, river or Drain is abutting on the site/ falls within the Site, then whether NOC of Department of NO Irrigation obtained
                    </Col>
                    <Col span="2">
                        <Switch onChange={handleSwitchChange} checkedChildren="Yes" unCheckedChildren="No" />
                    </Col>
                    <Col span="22">
                        Whether any electrical line passes through project site (optional)
                    </Col>
                    <Col span="2">
                        <Switch onChange={handleSwitchChange} checkedChildren="Yes" unCheckedChildren="No" />
                    </Col>
                    <Col span="22">
                        Is Site falls within the radius of vicinity of Defense Installation as per the norms/ guidelines of Ministry of Defense
                    </Col>
                    <Col span="2">
                        <Switch onChange={handleSwitchChange} checkedChildren="Yes" unCheckedChildren="No" />
                    </Col>
                    <Col span="22">
                        Whether any court case on the land
                    </Col>
                    <Col span="2">
                        <Switch onChange={handleSwitchChange} checkedChildren="Yes" unCheckedChildren="No" />
                    </Col>
                    <Col span="22">
                        Whether the case has been rejected by any other authority
                    </Col>
                </Row>
                <BlankSpace />

                <div>
                    <span>Declaration</span><br />
                    <span>I Ashok Kumar on behalf of iic, do hereby undertake as under that</span>
                    <p>1. All the facts, figures and information submitted are true and correct and nothing has been misstated or misrepresented or concealed therein. </p>
                    <p>2. All the documents submitted/ uploaded are genuine and authentic.</p>
                    <p>3. The site/land for which Change of Land Use is being applied is Under Construction.</p>
                    <p>4 All applicable statutory laws, rules, regulations and notifications shall be binding.</p>
                    <p>5. In the event of any false /incorrect / fake / misleading submission of any facts/ figures/ information/documents submitted or concealment of these thereupon at any point of time, then, the applicant and the business entity shall be liable for prosecution and / or penalization. </p>
                    <p>6. Any further responses, replies, information, additional fees/charges required/sought from time to time, while processing this application, shall be submitted appropriately in a time-bound manner as and when demanded.</p>
                    <p>7. Any instruction passed on while processing this application shall be binding. 8. It is understood that merely submission of this application do not guarantee acceptance/approval for the request applied for.</p>
                </div>
                <Space>
                    <BlueButton htmlType="submit" >GO TO PROJECT DETAILS SECTION</BlueButton>
                    <BlueButton htmlType="submit" >SUBMIT APPLICATION</BlueButton>
                </Space>
            </Form>
        </>
    )


}

const mapStateToProps = (state) => ({
    verifyUpnAndMobileSubmitOtpState: state.verifyUpnAndMobileSubmitOtp,
    saveEcluLandDetailsState: state.saveEcluLandDetails,
    getDocumentListState: state.getDocumentList,
    getEcluDetailState: state.getEcluDetail,
})

const mapDispatchToProps = (dispatch) => ({
    saveEcluLandDetails: (params) => dispatch(saveEcluLandDetails(params)),
    saveEcluLandDetailsResetState: () => dispatch(saveEcluLandDetailsResetState()),
    getDocumentList: (params) => dispatch(getDocumentList(params)),
    getDocumentListResetState: () => dispatch(getDocumentListResetState()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectSiteDetails)
