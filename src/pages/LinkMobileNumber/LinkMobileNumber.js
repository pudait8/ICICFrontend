import React, { useState, useEffect } from 'react'
import { connect } from "react-redux"
import Lottie from 'react-lottie'
import { Link } from 'react-router-dom'
import { Form, Col, Row, Input, Select, Tooltip, notification, Space, Button, Alert } from 'antd'
import { CheckCircleFilled, CloseCircleOutlined, InfoCircleOutlined, UndoOutlined } from '@ant-design/icons'

import './LinkMobileNumber.css'
import {
    requestAuthorityList, requestLocationList,
    requestSectorList, requestUsageTypesList, requestPropertyTypeList,
    requestPropertyNumberList, getUpnSendOtp, getUpnVerifyOtp, getUpnResetState
} from "../../actions/GetUpnActions"
import { getCurrentOwnersByPropertyRefId, getCurrentOwnersByPropertyRefIdResetState } from "../../actions/getCurrentOwnersByPropertyRefIdAction"
import check from '../../Lottie/check.json'
import StatusCard from '../../components/StatusCard/StatusCard'
import { PrimaryButton, BlankSpace, FormItem, BlueButton, GreenButton, Xlink, FlexDiv, FlexRow, TextButton } from '../../components/Xcomponents'
import { Container, Heading } from './LinkMobileNumberStyle'
import { LeftSection, RightSection, ServiceBar, ServiceName } from '../ServiceDetailPage/ServiceDetailPageStyle'
import { BackIcon } from '../../components/CustomIcons'


const { Option } = Select;

const LinkMobileNumber = props => {

    const {
        GetUpnState, getUpnResetState, requestLocationList,
        requestSectorList, requestUsageTypesList, requestPropertyTypeList,
        requestPropertyNumberList, getUpnSendOtp, getUpnVerifyOtp,
        getAuthorityListState,
        getCurrentOwnersByPropertyRefId, getCurrentOwnersByPropertyRefIdState, getCurrentOwnersByPropertyRefIdResetState,
    } = props

    const {
        displayError,
        errorMessage,
        AuthorityListRequestStatus,
        LocationList,
        SectorList,
        UsageTypesList,
        PropertyTypeList,
        PropertyNumberList,
        DisableDevelopmentAuthority,
        DisableLocation,
        DisableSector,
        DisableUsageType,
        DisablePropertyType,
        DisablePropertyNumber,
        LoadingDevelopmentAuthority,
        LoadingLocation,
        LoadingSector,
        LoadingUsageType,
        LoadingPropertyType,
        LoadingPropertyNumber,
        getUpnSendOtpStatus,
        loadingSubmit,
        getUpnSendOtpAlertMessage,
        visibleOtpModal,
        getUpnObjAfterOtp,
        getUpnVerifyOtpStatus,
        getUpnVerifyOtpAlertMessage
    } = GetUpnState


    const [DevelopmentAuthorityOptions, setDevelopmentAuthorityOptions] = useState([])
    const [LocationOptions, setLocationOptions] = useState([])
    const [SectorOptions, setSectorOptions] = useState([])
    const [UsageTypesOptions, setUsageTypesOptions] = useState([])
    const [PropertyTypeOptions, setPropertyTypeOptions] = useState([])
    const [PropertyNumberOptions, setPropertyNumberOptions] = useState([])
    const initialFormData = {
        AuthorityId: null,
        LocationName: null,
        SectorId: null,
        UsageTypeId: null,
        PropertyTypeId: null,
        PropertyNumberId: null
    }
    const [FormData, setFormData] = useState(initialFormData)

    const [otp, setOtp] = useState(null)
    const [verifyOtpLoading, setVerifyOtpLoading] = useState(false)
    const [displayOtpModal, setDisplayOtpModal] = useState(false)
    const [resendOtpTimer, setResendOtpTimer] = useState(0)

    const [form] = Form.useForm();

    const animationOptions = {
        loop: true,
        autoplay: true,
        animationData: check,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }


    useEffect(() => {
        return (() => {
            getUpnResetState()
            getCurrentOwnersByPropertyRefIdResetState()
        })
    }, [])

    // Resend Otp Timer
    useEffect(() => {
        if (resendOtpTimer > 0) {
            const timer = setTimeout(() => {
                setResendOtpTimer(resendOtpTimer - 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [resendOtpTimer])


    useEffect(() => {
        {
            let options = []
            getAuthorityListState.list.map(item => {
                options.push(<Option key={item.Id} value={item.Id}>{item.Name}</Option>)
            })
            setDevelopmentAuthorityOptions(options)
        }
    }, [getAuthorityListState])

    useEffect(() => {
        if (LocationList && LocationList.length > 0) {
            let options = []
            LocationList.forEach(
                (item) => {
                    if (item.Name) options.push(<Option key={item.IdStr} value={item.IdStr}>{item.Name}</Option>)
                }
            )
            setLocationOptions(options)
        }
    }, [LocationList])

    useEffect(() => {
        if (SectorList && SectorList.length > 0) {
            let options = []
            SectorList.forEach(
                (item) => {
                    if (item.Name) options.push(<Option key={item.Id} value={item.Id}>{item.Name}</Option>)
                }
            )
            setSectorOptions(options)
        }
    }, [SectorList])

    useEffect(() => {
        if (UsageTypesList && UsageTypesList.length > 0) {
            let options = []
            UsageTypesList.forEach(
                (item) => {
                    if (item.Name) options.push(<Option key={item.Id} value={item.Id}>{item.Name}</Option>)
                }
            )
            setUsageTypesOptions(options)
        }
    }, [UsageTypesList])

    useEffect(() => {
        if (PropertyTypeList && PropertyTypeList.length > 0) {
            let options = []
            PropertyTypeList.forEach(
                (item) => {
                    if (item.Name) options.push(<Option key={item.Id} value={item.Id}>{item.Name}</Option>)
                }
            )
            setPropertyTypeOptions(options)
        }
    }, [PropertyTypeList])

    useEffect(() => {
        if (PropertyNumberList && PropertyNumberList.length > 0) {
            let options = []
            PropertyNumberList.forEach(
                (item) => {
                    if (item.Name) options.push(<Option key={item.Id} value={item.Id}>{item.Name}</Option>)
                }
            )
            setPropertyNumberOptions(options)
        } else {
            setPropertyNumberOptions([])
        }
    }, [PropertyNumberList])

    useEffect(() => {
        if (AuthorityListRequestStatus === "Fail") {
            GetUpnState.AuthorityListRequestStatus = null
            notification.error({
                message: "Something went wrong. Please reload the page.",
                placement: "bottomRight"
            })
        }
    }, [AuthorityListRequestStatus])

    useEffect(() => {
        if (getUpnSendOtpStatus === "Fail") {
            GetUpnState.getUpnSendOtpStatus = null
            notification.error({
                message: "Something went wrong. Please submit again.",
                placement: "bottomRight"
            })
        }

        if (getUpnSendOtpStatus === "Alert") {
            GetUpnState.getUpnSendOtpStatus = null
            notification.error({
                message: getUpnSendOtpAlertMessage,
                placement: "bottomRight"
            })
        }

    }, [getUpnSendOtpStatus])



    useEffect(() => {
        if (getUpnVerifyOtpStatus === "Fail") {
            setVerifyOtpLoading(false)
            GetUpnState.getUpnVerifyOtpStatus = null
            notification.error({
                message: "Something went wrong. OTP can't verify.",
                placement: "bottomRight"
            })
        }

        if (getUpnVerifyOtpStatus === "Alert") {
            setVerifyOtpLoading(false)
            GetUpnState.getUpnVerifyOtpStatus = null
            notification.error({
                message: getUpnVerifyOtpAlertMessage,
                placement: "bottomRight"
            })
        }

        if (getUpnVerifyOtpStatus === "Success") {
            setVerifyOtpLoading(false)
            GetUpnState.getUpnVerifyOtpStatus = null
            setDisplayOtpModal(false)
        }
    }, [getUpnVerifyOtpStatus])




    useEffect(() => {
        if (visibleOtpModal) {
            var mobile = FormData.MobileNumber
            var firstPart = mobile.charAt(0) + mobile.charAt(1)
            var lastPart = mobile.charAt(8) + mobile.charAt(9)
            // setOtpModalTitle(`Enter OTP received on ${firstPart}********${lastPart}`)
            notification.success({
                message: `Enter OTP received on ${firstPart}********${lastPart}`,
                placement: "bottomRight"
            })
            setDisplayOtpModal(true)
            setResendOtpTimer(29)
        } else {
            setDisplayOtpModal(false)
        }
    }, [visibleOtpModal])


    const onFinish = () => {
        getUpnSendOtp(FormData)
    }


    const RenderAlert = () => {
        if (displayError) {
            return (
                <div className="error-box">
                    <Alert message={errorMessage} type="error" showIcon />
                </div>
            )
        }

        return null
    }


    const handleDevelopmentAuthoritySelect = (AuthorityId, option) => {
        setFormData({ ...FormData, ["AuthorityId"]: AuthorityId })
        requestLocationList(AuthorityId)
        form.setFieldsValue({
            Location: undefined,
            Sector: undefined,
            UsageType: undefined,
            PropertyType: undefined,
            PropertyNumber: undefined
        });
    }

    const handleLocationSelect = (LocationName, option) => {
        setFormData({ ...FormData, ["LocationName"]: LocationName })
        requestSectorList({
            AuthorityId: FormData.AuthorityId,
            LocationName: LocationName
        })
        form.setFieldsValue({
            Sector: undefined,
            UsageType: undefined,
            PropertyType: undefined,
            PropertyNumber: undefined
        });
    }
    const handleSelect = (name, v) => {
        setFormData({ ...FormData, [name]: v })
    }

    const handleSectorSelect = (SectorId, option) => {
        setFormData({ ...FormData, ["SectorId"]: SectorId })
        requestUsageTypesList({
            AuthorityId: FormData.AuthorityId,
            SectorId: SectorId
        })
        form.setFieldsValue({
            UsageType: undefined,
            PropertyType: undefined,
            PropertyNumber: undefined
        });
    }

    const handleUsageTypeSelect = (UsageTypeId, option) => {
        setFormData({ ...FormData, ["UsageTypeId"]: UsageTypeId })
        requestPropertyTypeList({
            AuthorityId: FormData.AuthorityId,
            SectorId: FormData.SectorId,
            UsageTypeId: UsageTypeId
        })
        form.setFieldsValue({
            PropertyType: undefined,
            PropertyNumber: undefined
        })
    }

    const handlePropertyTypeSelect = (PropertyTypeId, option) => {
        GetUpnState.DisablePropertyNumber = false
        GetUpnState.PropertyNumberList = null
        setFormData({ ...FormData, ["PropertyTypeId"]: PropertyTypeId })
    }

    const handlePropertyNumberSelect = (PropertyNumberId, option) => {
        setFormData({ ...FormData, ["PropertyNumberId"]: PropertyNumberId, ['AlloteeName']: "" })
        form.setFieldsValue({
            AlloteeName: null
        })
        getCurrentOwnersByPropertyRefId({
            OrgId: FormData.AuthorityId,
            PropertyRefId: PropertyNumberId,
        })
    }

    const handlePropertyNumberSearch = (SearchTerm) => {
        if (SearchTerm.length >= 1) {
            requestPropertyNumberList({
                AuthorityId: FormData.AuthorityId,
                SectorId: FormData.SectorId,
                UsageTypeId: FormData.UsageTypeId,
                PropertyTypeId: FormData.PropertyTypeId,
                SearchTerm: SearchTerm
            })
        } else {
            setPropertyNumberOptions([])
        }
    }

    const handleOnChange = (e) => {
        setFormData({ ...FormData, [e.target.name]: e.target.value })
    }

    const handleOtpChange = (e) => {
        setOtp(e.target.value)
    }

    const handleVerifyOtpClick = () => {
        GetUpnState.getUpnObjAfterOtp.OTP = otp
        setVerifyOtpLoading(true)
        getUpnVerifyOtp(getUpnObjAfterOtp)
    }



    const resetForm = () => {
        setPropertyNumberOptions([])
        setPropertyTypeOptions([])
        setUsageTypesOptions([])
        setSectorOptions([])
        setLocationOptions([])
        setFormData({ ...initialFormData })
        form.resetFields()
        setDisplayOtpModal(false)
    }

    return (
        <Container>
            <ServiceBar>
                <LeftSection>
                    <Link to="/" >
                        <BackIcon style={{ marginTop: 5 }} />
                    </Link>
                </LeftSection>
                <RightSection>
                    <ServiceName>Link Mobile Number With Your Property (UPN)</ServiceName>
                </RightSection>
            </ServiceBar>
            {
                (GetUpnState.uiState === "ideal") &&
                <div className="get-upn-from-container">
                    <Form form={form} layout="vertical" hideRequiredMark={true} onFinish={onFinish} >
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <FormItem
                                    name="DevelopmentAuthority"
                                    label="Select Development Authority"
                                    rules={[{ required: true, message: 'Required' }]}
                                    className="round-select"
                                >
                                    <Select name="DevelopmentAuthority"
                                        size="large"
                                        showSearch
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        notFoundContent={<span>Not Found</span>}
                                        disabled={DisableDevelopmentAuthority || displayOtpModal}
                                        onSelect={handleDevelopmentAuthoritySelect}
                                        loading={LoadingDevelopmentAuthority === true}
                                        autoComplete="dontshow"
                                    >
                                        {DevelopmentAuthorityOptions}
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <FormItem
                                    name="Location"
                                    label="Select Location"
                                    rules={[{ required: true, message: 'Required' }]}
                                    className="round-select"
                                >
                                    <Select name="Location"
                                        size="large"
                                        showSearch
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        notFoundContent={<span>Not Found</span>}
                                        disabled={DisableLocation || displayOtpModal}
                                        onSelect={handleLocationSelect}
                                        loading={LoadingLocation === true}
                                        autoComplete="dontshow"
                                    >
                                        {LocationOptions}
                                    </Select>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <FormItem
                                    name="Sector"
                                    label="Select Sector"
                                    rules={[{ required: true, message: 'Required' }]}
                                    className="round-select"
                                >
                                    <Select name="Sector"
                                        size="large"
                                        showSearch
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        notFoundContent={<span>Not Found</span>}
                                        disabled={DisableSector || displayOtpModal}
                                        onSelect={handleSectorSelect}
                                        loading={LoadingSector === true}
                                        autoComplete="dontshow"
                                    >
                                        {SectorOptions}
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <FormItem
                                    name="UsageType"
                                    label="Usage Type"
                                    rules={[{ required: true, message: 'Required' }]}
                                    className="round-select"
                                >
                                    <Select name="UsageType"
                                        size="large"
                                        showSearch
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        notFoundContent={<span>Not Found</span>}
                                        disabled={DisableUsageType || displayOtpModal}
                                        onSelect={handleUsageTypeSelect}
                                        loading={LoadingUsageType === true}
                                        autoComplete="dontshow"
                                    >
                                        {UsageTypesOptions}
                                    </Select>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <FormItem
                                    name="PropertyType"
                                    label="Property Type"
                                    rules={[{ required: true, message: 'Required' }]}
                                    className="round-select"
                                >
                                    <Select name="PropertyType"
                                        size="large"
                                        showSearch
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        notFoundContent={<span>Not Found</span>}
                                        disabled={DisablePropertyType || displayOtpModal}
                                        onSelect={handlePropertyTypeSelect}
                                        loading={LoadingPropertyType === true}
                                        autoComplete="dontshow"
                                    >
                                        {PropertyTypeOptions}
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <FormItem
                                    name="PropertyNumber"
                                    label="Search by property/form no."
                                    rules={[{ required: true, message: 'Required' }]}
                                    className="round-select"
                                >
                                    <Select name="PropertyNumber"
                                        size="large"
                                        showSearch
                                        notFoundContent={null}
                                        disabled={DisablePropertyNumber || displayOtpModal}
                                        onSearch={handlePropertyNumberSearch}
                                        onSelect={handlePropertyNumberSelect}
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        loading={LoadingPropertyNumber === true}
                                    >
                                        {PropertyNumberOptions}
                                    </Select>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <FormItem
                                    name="AllotmentNumber"
                                    label="LOI/Allotment number"
                                    rules={[{ required: true, message: 'Required' }]}
                                    className="round-input"
                                    onChange={handleOnChange}
                                    autoComplete="dontshow"
                                >
                                    <Input size="large" name="AllotmentNumber" disabled={displayOtpModal} />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <FormItem
                                    name="AlloteeName"
                                    label="Current Owner"
                                    rules={[{ required: true, message: 'Required' }]}
                                    onChange={handleOnChange}
                                    className="round-input"
                                    autoComplete="dontshow"
                                >
                                    <Select name="AlloteeName"
                                        size="large"
                                        showSearch
                                        notFoundContent={null}
                                        disabled={displayOtpModal}
                                        onSelect={(v) => handleSelect('AlloteeName', v)}
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        loading={getCurrentOwnersByPropertyRefIdState.apiState === 'loading'}
                                    >
                                        {getCurrentOwnersByPropertyRefIdState.apiState === "success" && getCurrentOwnersByPropertyRefIdState.list.map((item) => (
                                            <Option value={item.Name}>{item.Name}</Option>
                                        ))}
                                    </Select>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <FormItem
                                    name="EmailAddress"
                                    label="Email Address"
                                    onChange={handleOnChange}
                                    rules={[
                                        { required: true, message: 'Required' },
                                        { type: 'email', message: 'Email is not valid' },
                                    ]}
                                    className="round-input"
                                    autoComplete="dontshow"
                                >
                                    <Input size="large" name="EmailAddress" disabled={displayOtpModal} />
                                </FormItem>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <FormItem
                                    name="MobileNumber"
                                    label="Mobile Number to be registered"
                                    onChange={handleOnChange}
                                    rules={[
                                        { required: true, message: 'Required' },
                                        {
                                            pattern: new RegExp('^[6-9]\\d{9}$'),
                                            message: 'Mobile number is not valid',
                                        }
                                    ]}
                                    className="round-input"
                                    autoComplete="dontshow"
                                >
                                    <Input size="large" name="MobileNumber" addonBefore="+91" disabled={displayOtpModal} />
                                </FormItem>
                            </Col>
                        </Row>
                        {!displayOtpModal &&
                            <FlexRow>
                                <FlexDiv>
                                    <Space>
                                        <BlueButton type="primary" htmlType="submit" icon={<CheckCircleFilled />} loading={loadingSubmit === true} >Verify Details and Get OTP</BlueButton>
                                        <Button type="link" onClick={resetForm} icon={<CloseCircleOutlined />} >Reset Form</Button>
                                    </Space>
                                </FlexDiv>
                            </FlexRow>
                        }
                    </Form>
                    {displayOtpModal &&
                        <Form layout="vertical" hideRequiredMark={true} onFinish={handleVerifyOtpClick} >
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                    <FormItem
                                        name="otp"
                                        label="Enter OTP"
                                        onChange={handleOtpChange}
                                        rules={[
                                            { required: true, message: 'Required' },
                                        ]}
                                        className="round-input"
                                        autoComplete="dontshow"
                                    >
                                        <Input size="large" name="EmailAddress" />
                                    </FormItem>
                                </Col>
                            </Row>
                            <RenderAlert />
                            <FlexRow>
                                <FlexDiv>
                                    <Space>
                                        <BlueButton type="primary" htmlType="submit" icon={<CheckCircleFilled />} loading={verifyOtpLoading === true} >Verify OTP</BlueButton>
                                        <Button type="link" disabled={resendOtpTimer > 0 ? true : false} onClick={onFinish} icon={<UndoOutlined />} loading={loadingSubmit === true} >
                                            Resend OTP
                                            {resendOtpTimer > 0 &&
                                                <> ({resendOtpTimer})</>
                                            }
                                        </Button>
                                        <Button type="link" onClick={resetForm} icon={<CloseCircleOutlined />} >Reset Form</Button>
                                    </Space>
                                </FlexDiv>
                            </FlexRow>
                        </Form>
                    }

                </div>
            }

            {
                (GetUpnState.uiState === "success") &&
                <>
                    <BlankSpace />
                    <BlankSpace />
                    <BlankSpace />
                    <StatusCard
                        graphics={
                            <Lottie
                                options={animationOptions}
                                height={200}
                                width={200}
                                autoplay
                            />
                        }
                        title="Mobile Number registered successfully!"
                        description="UPN details sent to your registered mobile number."
                        action={<Link to="/"><PrimaryButton type="primary">Go Back To Citizen Service</PrimaryButton></Link>}
                    />
                    <BlankSpace />
                    <BlankSpace />
                    <BlankSpace />
                </>
            }
        </Container>
    )
}

const mapStateToProps = (state) => ({
    GetUpnState: state.GetUpn,
    getAuthorityListState: state.getAuthorityList,
    getCurrentOwnersByPropertyRefIdState: state.getCurrentOwnersByPropertyRefId,
});

const mapDispatchToProps = (dispatch) => ({
    requestAuthorityList: () => dispatch(requestAuthorityList()),
    requestLocationList: (AuthorityId) => dispatch(requestLocationList(AuthorityId)),
    requestSectorList: (params) => dispatch(requestSectorList(params)),
    requestUsageTypesList: (params) => dispatch(requestUsageTypesList(params)),
    requestPropertyTypeList: (params) => dispatch(requestPropertyTypeList(params)),
    requestPropertyNumberList: (params) => dispatch(requestPropertyNumberList(params)),
    getUpnSendOtp: (params) => dispatch(getUpnSendOtp(params)),
    getUpnVerifyOtp: (params) => dispatch(getUpnVerifyOtp(params)),
    getUpnResetState: () => dispatch(getUpnResetState()),
    getCurrentOwnersByPropertyRefId: (params) => dispatch(getCurrentOwnersByPropertyRefId(params)),
    getCurrentOwnersByPropertyRefIdResetState: () => dispatch(getCurrentOwnersByPropertyRefIdResetState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LinkMobileNumber);