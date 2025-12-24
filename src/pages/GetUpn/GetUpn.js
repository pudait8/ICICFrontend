import React, { useState, useEffect } from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router-dom'
import { Form, Col, Row, Input, Select, Tooltip, notification, Space, Button, Alert } from 'antd'
import { CheckCircleFilled, CloseCircleOutlined, InfoCircleOutlined, UndoOutlined } from '@ant-design/icons'

import './GetUpn.css'
import {
    requestAuthorityList, requestLocationList,
    requestSectorList, requestUsageTypesList, requestPropertyTypeList,
    requestPropertyNumberList, getUpnNumber, getUpnVerifyOtp, getUpnResetState
} from "../../actions/GetUpnActions"
import { PrimaryButton, BlankSpace, FormItem, BlueButton, GreenButton, Xlink, FlexDiv, FlexRow, TextButton } from '../../components/Xcomponents'
import { Container, UpnNumberCard, Label } from './GetUpnStyle'
import { LeftSection, RightSection, ServiceBar, ServiceName } from '../ServiceDetailPage/ServiceDetailPageStyle'
import { BackIcon } from '../../components/CustomIcons'


const { Option } = Select;

const GetUpn = props => {

    const {
        GetUpnState, getUpnResetState, requestLocationList,
        requestSectorList, requestUsageTypesList, requestPropertyTypeList,
        requestPropertyNumberList, getUpnNumber,
        getAuthorityListState
    } = props

    const {
        getUpnData,
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
        getUpnNumberStatus,
        loadingSubmit,
        getUpnNumberAlertMessage,
        visibleOtpModal,
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
        PropertyNumberId: null,
        AllotmentNumber: "",
        MobileNumber: "",
    }
    const [FormData, setFormData] = useState(initialFormData)

    const [displayOtpModal, setDisplayOtpModal] = useState(false)

    const [form] = Form.useForm();




    useEffect(() => {
        // requestAuthorityList()
        return (() => getUpnResetState())
    }, [])

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
        setFormData({ ...FormData, ["PropertyNumberId"]: PropertyNumberId })
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
        if (getUpnNumberStatus === "Fail") {
            GetUpnState.getUpnNumberStatus = null
            notification.error({
                message: "Something went wrong. Please submit again.",
                placement: "bottomRight"
            })
        }

        if (getUpnNumberStatus === "Alert") {
            GetUpnState.getUpnNumberStatus = null
            notification.error({
                message: getUpnNumberAlertMessage,
                placement: "bottomRight"
            })
        }

        if (getUpnNumberStatus === "Success") {
            setPropertyNumberOptions([])
            setPropertyTypeOptions([])
            setUsageTypesOptions([])
            setSectorOptions([])
            setLocationOptions([])
            setFormData({ ...initialFormData })
            form.resetFields()
            setDisplayOtpModal(false)
        }
    }, [getUpnNumberStatus])







    // useEffect(() => {
    //     if (visibleOtpModal) {

    //         // notification.success({
    //         //     message: `Enter OTP received on ${firstPart}********${lastPart}`,
    //         //     placement: "bottomRight"
    //         // })
    //         setDisplayOtpModal(true)
    //     } else {
    //         setDisplayOtpModal(false)
    //     }
    // }, [visibleOtpModal])

    const onFinish = () => {
        getUpnNumber(FormData)
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
        getUpnResetState()
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
                    <ServiceName>Get UPN of Your Property (UPN)</ServiceName>
                </RightSection>
            </ServiceBar>
            {getUpnNumberStatus === "Success" &&
                <UpnNumberCard className="get-upn-from-container">
                    <Label>The UPN of the Property is {getUpnData.UPN}.</Label><br />
                </UpnNumberCard>
            }
            <div className="get-upn-from-container">
                <Form form={form} layout="vertical" hideRequiredMark={true} onFinish={onFinish} >
                    <Row gutter={24}>
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
                                    disabled={DisableDevelopmentAuthority}
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
                                    disabled={DisableLocation}
                                    onSelect={handleLocationSelect}
                                    loading={LoadingLocation === true}
                                    autoComplete="dontshow"
                                >
                                    {LocationOptions}
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={24}>
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
                                    disabled={DisableSector}
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
                                    disabled={DisableUsageType}
                                    onSelect={handleUsageTypeSelect}
                                    loading={LoadingUsageType === true}
                                    autoComplete="dontshow"
                                >
                                    {UsageTypesOptions}
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={24}>
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
                                    disabled={DisablePropertyType}
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
                                    disabled={DisablePropertyNumber}
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
                    <Row gutter={24}>
                        <Col span={11}>
                            <FormItem
                                name="AllotmentNumber"
                                label="LOI/Allotment number"
                                rules={[{ required: FormData.MobileNumber !== "" ? false : true, message: 'Required' }]}
                                className="round-input"
                                onChange={handleOnChange}
                                autoComplete="dontshow"
                            >
                                <Input size="large" name="AllotmentNumber" disabled={displayOtpModal | FormData.MobileNumber !== ""} />
                            </FormItem>
                        </Col>
                        <Col span={2} style={{ display: "flex", alignItems: "center", fontWeight: 700 }}>
                            <div>OR</div>
                        </Col>
                        <Col span={11}>
                            <FormItem
                                name="MobileNumber"
                                label="Mobile number"
                                rules={[{ required: FormData.AllotmentNumber !== "" ? false : true, message: 'Required' }]}
                                className="round-input"
                                onChange={handleOnChange}
                                autoComplete="dontshow"
                            >
                                <Input size="large" name="MobileNumber" disabled={displayOtpModal | FormData.AllotmentNumber !== ""} />
                            </FormItem>
                        </Col>
                    </Row>

                    <FlexRow>
                        <FlexDiv>
                            <Space>
                                <BlueButton htmlType="submit" icon={<CheckCircleFilled />} loading={loadingSubmit === true} >Get UPN Details</BlueButton>
                                <Button type="link" onClick={resetForm} icon={<CloseCircleOutlined />} >Reset Form</Button>
                            </Space>
                        </FlexDiv>
                    </FlexRow>
                </Form>

            </div>

        </Container>
    )
}

const mapStateToProps = (state) => ({
    GetUpnState: state.GetUpn,
    getAuthorityListState: state.getAuthorityList,
});

const mapDispatchToProps = (dispatch) => ({
    requestAuthorityList: () => dispatch(requestAuthorityList()),
    requestLocationList: (AuthorityId) => dispatch(requestLocationList(AuthorityId)),
    requestSectorList: (params) => dispatch(requestSectorList(params)),
    requestUsageTypesList: (params) => dispatch(requestUsageTypesList(params)),
    requestPropertyTypeList: (params) => dispatch(requestPropertyTypeList(params)),
    requestPropertyNumberList: (params) => dispatch(requestPropertyNumberList(params)),
    getUpnNumber: (params) => dispatch(getUpnNumber(params)),
    getUpnResetState: () => dispatch(getUpnResetState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GetUpn);