import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Drawer, Form, Row, Col, Input, Select, notification, Upload, Button } from "antd"
import { CaretRightOutlined, CloseCircleOutlined, UploadOutlined } from '@ant-design/icons'
import { connect } from "react-redux"
import { useMediaQuery } from 'react-responsive'

// components
import FileUpload from '../FileUpload/FileUpload'
import { FlexDiv, OrangeButton, Xcollapse, TextButton, Xupload, FormItem } from '../Xcomponents'
// actions
import { saveLegalHeirTransferApplication } from '../../actions/transferApplicationSaveLegalHeirActions'
import { getSalutationList } from '../../actions/getSalutationListActions'

// others
import conf from '../../config'
import { getAuthData, getOrgId } from '../../utils'

import { FileTitle } from "./LegalHeirFormStyle"

const Option = Select.Option

const LegalHeirForm = props => {

    // variables
    const {
        saveLegalHeirTransferApplication, transferApplicationSaveLegalHeirState,
        transferApplicationSaveState,
        transferApplicationFetchState,
        getSalutationList, getSalutationListState,
        verifyUpnAndMobileSubmitOtpState
    } = props
    const headers = {
        // 'AuthKey': getAuthData().AuthKey,
        // 'AuthId': getAuthData().AuthId,
    }

    const [formData, setFormData] = useState({
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
        TempPhotoId: 0,
        TempSignId: 0,
        TempIdentityProofId: 0,
    })
    const [displayFileValidation, setDisplayFileValidation] = useState(false)
    const isMobileL = useMediaQuery({ query: '(max-width: 425px)' })
    const [fileList, setFileList] = useState([])
    const [uploadLoading, setUploadLoading] = useState([])
    const [files, setFiles] = useState([])
    const OrgId = getOrgId()
    const serviceId = props.serviceId
    useEffect(() => {
        if (transferApplicationSaveLegalHeirState.apiState === "success") {
            setDisplayFileValidation(false)
        }
    }, [transferApplicationSaveLegalHeirState.apiState])

    // functions
    const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSalutationSelect = (Salutation) => {
        setFormData({ ...formData, ["Salutation"]: Salutation })
    }

    const handleGenderSelect = (Gender) => {
        setFormData({ ...formData, ["Gender"]: Gender })
    }

    const onFinish = () => {
        if (formData.IdentityProofUploaded && formData.SignatureUploaded && formData.PhotoUploaded) {
            if (props.applicationId && props.purchaserId) {
                saveLegalHeirTransferApplication({
                    OrgId: OrgId,
                    PurchaserId: props.purchaserId,
                    LegalHeirId: 0,
                    ApplicationId: props.applicationId,
                    PropertyRefId: props.PropertyRefId,
                    Salutation: formData.Salutation,
                    Name: formData.Name,
                    FatherName: formData.FatherName,
                    Relationship: formData.Relationship,
                    Address: formData.Address,
                    Gender: formData.Gender,
                    MobileNumber: formData.MobileNumber,
                    EmailAddress: formData.EmailAddress,
                    TempPhotoId: formData.TempPhotoId,
                    TempSignId: formData.TempSignId,
                    TempIdentityProofId: formData.TempIdentityProofId,
                })
            }
        }
    }

    return (
        <Drawer
            title="Add Legal Heir"
            placement="right"
            width={isMobileL ? "100%" : 500}
            onClose={() => props.closeForm()}
            visible={props.visible}
        >
            {props.visible &&
                <Form layout="vertical" onFinish={onFinish} >
                    <Row gutter={24}>
                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                            <FormItem
                                name="Salutation"
                                label={"Salutation"}
                                rules={[{ required: true, message: 'Required' }]}
                            >
                                <Select name="Salutation" style={{ width: '100%' }} placeholder="Salutation" onSelect={handleSalutationSelect} >
                                    {getSalutationListState.list.map(item => (<Option key={item.Id} value={item.Id}>{item.Name}</Option>))}
                                </Select>
                            </FormItem>
                        </Col>
                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                            <FormItem
                                name="Name"
                                label="Legal Heir Name"
                                rules={[{ required: true, message: 'Required' }]}
                            >
                                <Input size="large" name="Name" placeholder="Name" onChange={handleOnChange} />
                            </FormItem>
                        </Col>
                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                            <FormItem
                                name="FatherName"
                                label="Father Name"
                                rules={[{ required: true, message: 'Required' }]}
                            >
                                <Input size="large" name="FatherName" placeholder="Enter Father Name" onChange={handleOnChange} />
                            </FormItem>
                        </Col>

                    </Row>

                    <Row gutter={24}>

                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                            <FormItem
                                name="Gender"
                                label="Select Gender"
                                rules={[{ required: true, message: 'Required' }]}
                            >
                                <Select placeholder="Gender" style={{ width: '100%' }} onSelect={handleGenderSelect} >
                                    <Option key={"Male"} value="Male">Male</Option>
                                    <Option key={"Female"} value="Female">Female</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                            <FormItem
                                name="Relationship"
                                label={`Relationship with ${props.PurchaserOrTransferee}`}
                                rules={[{ required: true, message: 'Required' }]}
                            >
                                <Input size="large" name="Relationship" placeholder={`Relationship with ${props.PurchaserOrTransferee}`} onChange={handleOnChange} />
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
                                <Input size="large" name="Address" placeholder="Enter Address" onChange={handleOnChange} />
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
                                    { pattern: '^[0-9]{10}$', message: 'Mobile number is not valid' }
                                ]}
                            >
                                <Input size="large" type="number" name="MobileNumber" placeholder="Enter Mobile" onChange={handleOnChange} />
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
                                <Input size="large" name="EmailAddress" placeholder="Enter Email" onChange={handleOnChange} />
                            </FormItem>
                        </Col>
                    </Row>

                    <Form.Item
                        label={<FileTitle>Identity Proof of Purchaser</FileTitle>}
                        name="Identity Proof of Purchaser"
                        rules={[
                            { required: true, message: 'Required' },
                        ]}
                    >
                        <Upload
                            name="Identity Proof of Purchaser"
                            action={`${conf.api.base_url}DMS_DocumentService/UploadPurchaserLegalHeirDocument?ApiKey=UploadPurchaserLegalHeirDocument&OrgId=${OrgId}&EntityType=900&EntityId=0&DocumentTypeId=3&DocumentName=IdentityProof`}
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
                                setUploadLoading({
                                    ...uploadLoading,
                                    ["IdentityProofUploaded"]: false
                                })
                            }}
                            fileList={fileList["IdentityProofUploaded"]}
                            allowedFileTypes={["image/jpg", "image/jpeg"]}
                            allowedFileSizeInKb={100}
                            fileTypeValidationMessage={"Only JPG & JPEG file types allowed!"}
                        >
                            <Button icon={<UploadOutlined />}
                                loading={uploadLoading["IdentityProofUploaded"]}
                            >Click to Upload</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        label={<FileTitle>Passport size photo of Purchaser</FileTitle>}
                        name="Passport size photo of Purchaser"
                        rules={[
                            { required: true, message: 'Required' },
                        ]}
                    >
                        <Upload
                            name="Passport size photo of Purchaser"
                            action={`${conf.api.base_url}DMS_DocumentService/UploadPurchaserLegalHeirDocument?ApiKey=UploadPurchaserLegalHeirDocument&OrgId=${OrgId}&EntityType=900&EntityId=0&DocumentTypeId=3&DocumentName=Photo`}
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
                                return true
                            }}
                            onError={(info) => console.log(info)}
                            onSuccess={(response) => {
                                if (response.Status === 2) {
                                    setFileList(state => ({
                                        ...fileList,
                                        ["PhotoUploaded"]: [files["PhotoUploaded"]]
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
                                    ["PhotoUploaded"]: false
                                })
                            }}
                            fileList={fileList["PhotoUploaded"]}
                            allowedFileTypes={["image/jpg", "image/jpeg"]}
                            allowedFileSizeInKb={100}
                            fileTypeValidationMessage={"Only JPG & JPEG file types allowed!"}
                        >
                            <Button icon={<UploadOutlined />}
                                loading={uploadLoading["PhotoUploaded"]}
                            >Click to Upload</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        label={<FileTitle>Passport size photo of Purchaser</FileTitle>}
                        name="Passport size photo of Purchaser"
                        rules={[
                            { required: true, message: 'Required' },
                        ]}
                    >
                        <Upload
                            name="Passport size photo of Purchaser"
                            action={`${conf.api.base_url}DMS_DocumentService/UploadPurchaserLegalHeirDocument?ApiKey=UploadPurchaserLegalHeirDocument&OrgId=${OrgId}&EntityType=900&EntityId=0&DocumentTypeId=3&DocumentName=Signature`}
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
                                setUploadLoading({
                                    ...uploadLoading,
                                    ["SignatureUploaded"]: false
                                })
                            }}
                            fileList={fileList["SignatureUploaded"]}
                            allowedFileTypes={["image/jpg", "image/jpeg"]}
                            allowedFileSizeInKb={100}
                            fileTypeValidationMessage={"Only JPG & JPEG file types allowed!"}
                        >
                            <Button icon={<UploadOutlined />}
                                loading={uploadLoading["SignatureUploaded"]}
                            >Click to Upload</Button>
                        </Upload>
                    </Form.Item>


                    <FlexDiv style={{ paddingTop: "2rem" }}>
                        <OrangeButton htmlType="submit" onClick={() => setDisplayFileValidation(true)} loading={transferApplicationSaveLegalHeirState.apiState === "loading" ? true : false} >Add Legal Heir</OrangeButton>
                        <TextButton icon={<CloseCircleOutlined />} onClick={() => props.closeForm()} > Cancel</TextButton>
                    </FlexDiv>
                </Form>
            }
        </Drawer>
    )
}

LegalHeirForm.propsTypes = {
    visible: PropTypes.bool,
    closeForm: PropTypes.func,
    purchaserId: PropTypes.string,
    OrgId: PropTypes.string,
    applicationId: PropTypes.string,
    PurchaserOrTransferee: PropTypes.string,
}

LegalHeirForm.defaultProps = {
    visible: false,
    closeForm: () => { return },
    purchaserId: 0,
    OrgId: 0,
    applicationId: "",
    PurchaserOrTransferee: "Purchaser",
}


const mapStateToProps = (state) => ({
    transferApplicationSaveLegalHeirState: state.transferApplicationSaveLegalHeir,
    transferApplicationSaveState: state.transferApplicationSave,
    transferApplicationFetchState: state.transferApplicationFetch,
    getSalutationListState: state.getSalutationList,
    verifyUpnAndMobileSubmitOtpState: state.verifyUpnAndMobileSubmitOtp,
})
const mapDispatchToProps = (dispatch) => ({
    saveLegalHeirTransferApplication: (params) => dispatch(saveLegalHeirTransferApplication(params)),
    getSalutationList: (params) => dispatch(getSalutationList(params)),
})
export default connect(mapStateToProps, mapDispatchToProps)(LegalHeirForm)