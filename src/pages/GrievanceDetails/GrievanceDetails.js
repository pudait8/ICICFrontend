import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { CheckCircleFilled, FileOutlined, UploadOutlined } from "@ant-design/icons"
import { Row, Col, Form, Skeleton, Input, Select, notification, List, Upload, Space, Button, Checkbox } from "antd"
import { Link, Redirect, useLocation, useHistory } from "react-router-dom"
import folderAnimation from '../../Lottie/folder-animation.json'
import _ from "lodash"

// components
import {
    Container, Title, Status, SuccessBar, SuccessBarText, Description,
    Heading, FileContainer, ViewPlanLink, UploadButton, GrievanceTextarea
} from "./GrievanceDetailsStyle"
import { PrimaryButton, BlankSpace, FormItem, BlueButton, FlexDiv } from '../../components/Xcomponents'
import ApplicationProgress from "../ApplicationProgress/ApplicationProgress"
import FlexBar from "../../components/FlexBar/FlexBar"
import Lottie from "react-lottie"
import { BackIcon } from "../../components/CustomIcons"

// others
import { getOrgId } from '../../utils'
import conf from '../../config'

// actions
import { getGrievanceDetail, getGrievanceDetailResetState } from "../../actions/getGrievanceDetailAction"

import { verifyUpnAndMobileSubmitOtpResetState } from '../../actions/verifyUpnAndMobileSubmitOtpAction'
import { Divider } from "rc-menu"

const { Option } = Select

const GrievanceDetails = props => {
    // variables
    const OrgId = props.match.params.OrgId
    const GrievanceNo = props.match.params.GrievanceNo
    const {
        verifyUpnAndMobileSubmitOtpState, verifyUpnAndMobileSubmitOtpResetState,
        getGrievanceDetail, getGrievanceDetailState, getGrievanceDetailResetState,
    } = props
    const [refreshRedirect, setRefreshRedirect] = useState(false)
    const [attachedDocs, setAttachedDocs] = useState(0)
    const folderAnimationOptions = {
        loop: true,
        autoplay: true,
        animationData: folderAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }

    const [render, setRender] = useState(false)


    const previousPath = useHistory()
    let query = new URLSearchParams(useLocation().search)
    let uniqueKey = query.get("uniqueKey")
    let AuthTokenKey = query.get("AuthTokenKey")
    let AuthToken = query.get("AuthToken")
    let ArchitectTokenKey = query.get("ArchitectTokenKey")
    let ArchitectToken = query.get("ArchitectToken")
    let architect = query.get("architect")
    if (uniqueKey) {
        verifyUpnAndMobileSubmitOtpState.AuthToken = decodeURIComponent(AuthToken)
        verifyUpnAndMobileSubmitOtpState.AuthTokenKey = decodeURIComponent(AuthTokenKey)
        verifyUpnAndMobileSubmitOtpState.ArchitectToken = decodeURIComponent(ArchitectToken)
        verifyUpnAndMobileSubmitOtpState.ArchitectTokenKey = decodeURIComponent(ArchitectTokenKey)
    }

    //callback
    useEffect(() => {
        window.scrollTo(0, 2)
    }, [])
    useEffect(() => {
        getGrievanceDetail({
            OrgId: OrgId,
            GrievanceNo: GrievanceNo
        })
        return (() => {
            getGrievanceDetailResetState()
        })
    }, [])

    useEffect(() => {
        if (getGrievanceDetailState.apiState === "success") {
            setRender(true)
        }
    }, [getGrievanceDetailState])


    // function



    const DownloadFile = (DocumentId, FileName) => {
        fetch(`${conf.api.base_url}Gateway_PortalService/GetList`, {
            method: 'POST',
            body: JSON.stringify(
                {
                    ApiKey: "DownloadGrievanceDocument",
                    OrgId: OrgId,
                    ApiParams: {
                        DocumentId: DocumentId
                    }
                }
            ),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
            // headers: {
            //     'AuthToken': verifyUpnAndMobileSubmitOtpState.AuthToken ?? "",
            //     'AuthTokenKey': verifyUpnAndMobileSubmitOtpState.AuthTokenKey ?? "",
            //     'ArchitectToken': verifyUpnAndMobileSubmitOtpState.ArchitectToken ?? "",
            //     'ArchitectTokenKey': verifyUpnAndMobileSubmitOtpState.ArchitectTokenKey ?? ""
            // }
        })
            .then(res => {
                if (res.status === 200) {
                    return res.blob()
                } else {
                    return null
                }
            })
            .then(blob => {
                if (blob) {
                    var url = window.URL.createObjectURL(blob)
                    var a = document.createElement('a');
                    a.href = url;
                    a.download = FileName
                    document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
                    a.click()
                    a.remove()  //afterwards we remove the element again    
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    const goToPreviousPath = () => {
        previousPath.goBack()
    }

    return (
        <Container>
            {refreshRedirect &&
                <Redirect to="/" />
            }
            {getGrievanceDetailState.apiState === "loading" &&
                <Skeleton active />
            }

            {["error", "alert"].includes(getGrievanceDetailState.apiState) &&
                <>
                    <div style={{ display: "flex" }} >
                        <Link to="/" style={{ width: 40 }}>
                            <BackIcon style={{ marginTop: 8 }} />
                        </Link>
                        <h3>Please enter valid grievance Number.</h3>

                    </div>
                </>
            }

            {render &&
                <>
                    <div style={{ display: "flex", justifyContent: "space-between" }} >
                        <div>
                            <div style={{ display: "flex" }} >
                                <Link to="/" style={{ width: 40 }}>
                                    <BackIcon style={{ marginTop: 8 }} />
                                </Link>
                                <Title>Grievance Number : {getGrievanceDetailState.data.GrievanceNo}</Title>

                                <div class="ant-divider ant-divider-vertical" role="separator" style={{ top: "0.22em", height: "1.5em", borderLeft: "0.12em solid rgb(0 0 0)" }}></div>
                                <a><Status>{getGrievanceDetailState.data.Status}</Status></a>
                            </div>
                            <Title style={{ marginLeft: 40 }}>{getGrievanceDetailState.data.GrievanceDate}</Title>
                        </div>
                    </div>
                    <BlankSpace />
                    <div style={{ display: "flex", justifyContent: "center" }} >
                        <div style={{ width: "90%" }} >

                            <Form
                                layout="vertical"
                            >

                                <Heading>Complainant's Details</Heading>

                                <Row gutter="24" >
                                    <Col span="8" >
                                        <FormItem
                                            label="Full Name"
                                        >
                                            <Input size="large" readOnly defaultValue={getGrievanceDetailState.data.FullName} />
                                        </FormItem>
                                    </Col>
                                    <Col span="8" >
                                        <FormItem
                                            label="Gender"
                                        >
                                            <Input size="large" readOnly defaultValue={getGrievanceDetailState.data.Gender} />
                                        </FormItem>
                                    </Col>
                                    <Col span="8" >
                                        <FormItem
                                            label="Email ID"
                                        >
                                            <Input size="large" readOnly defaultValue={getGrievanceDetailState.data.EmailAddress} />
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row gutter="24" >
                                    <Col span="24" >
                                        <FormItem
                                            label="Address Line 1"
                                        >
                                            <Input size="large" readOnly defaultValue={getGrievanceDetailState.data.AddressLine1} />
                                        </FormItem>
                                    </Col>
                                    <Col span="24" >
                                        <FormItem
                                            label="Address Line 2"
                                        >
                                            <Input size="large" readOnly defaultValue={getGrievanceDetailState.data.AddressLine2} />
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row gutter="24" >
                                    <Col span="8" >
                                        <FormItem
                                            label="State"
                                        >
                                            <Input size="large" readOnly defaultValue={getGrievanceDetailState.data.State} />
                                        </FormItem>
                                    </Col>
                                    <Col span="8" >
                                        <FormItem
                                            label="City"
                                        >
                                            <Input size="large" readOnly defaultValue={getGrievanceDetailState.data.City} />
                                        </FormItem>
                                    </Col>
                                    <Col span="8" >
                                        <FormItem
                                            label="Pincode"
                                        >
                                            <Input size="large" readOnly defaultValue={getGrievanceDetailState.data.PIN} />
                                        </FormItem>
                                    </Col>
                                </Row>
                                <BlankSpace />
                                <Heading>Grievance Details</Heading>
                                <Row gutter="24" >
                                    <Col span="8" >
                                        <FormItem
                                            label="Grievance Pertaining to"
                                        >
                                            <Input size="large" readOnly defaultValue={getGrievanceDetailState.data.GrievanceTypeName} />
                                        </FormItem>
                                    </Col>
                                    {getGrievanceDetailState.data.GrievanceTypeId === 19 ?
                                        <>
                                            <Col span="8" >
                                                <FormItem
                                                    label="Department Name"
                                                >
                                                    <Input size="large" readOnly defaultValue={getGrievanceDetailState.data.DepartmentName} />
                                                </FormItem>
                                            </Col>
                                            <Col span="8" >
                                                <FormItem
                                                    label="Designation Name"
                                                >
                                                    <Input size="large" readOnly defaultValue={getGrievanceDetailState.data.DesignationName} />
                                                </FormItem>
                                            </Col>
                                        </>
                                        :
                                        <>
                                            <Col span="8" >
                                                <FormItem
                                                    label="Service Name"
                                                >
                                                    <Input size="large" readOnly defaultValue={getGrievanceDetailState.data.ApplicationTypeName} />
                                                </FormItem>
                                            </Col>
                                            <Col span="8" >
                                                <FormItem
                                                    label="Application Number"
                                                >
                                                    <Input size="large" readOnly defaultValue={getGrievanceDetailState.data.RefApplicationId} />
                                                </FormItem>
                                            </Col>
                                        </>
                                    }
                                </Row>
                                <Row gutter="24" >
                                    <Col span="24" >
                                        <FormItem
                                            label="Grievance Description"
                                        >
                                            <GrievanceTextarea readOnly defaultValue={getGrievanceDetailState.data.GrievanceDescription} />
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row gutter="24" >
                                    <Col span="24" >
                                        <FormItem
                                            label="Assistance Required"
                                        >
                                            <Checkbox checked={getGrievanceDetailState.data.AssistanceRequired === "Yes"} >I would like to get tele-phonic assistance on my mobile number verified above.</Checkbox>
                                        </FormItem>
                                    </Col>
                                </Row>

                                <BlankSpace />
                                <Heading>Documents Uploaded</Heading>

                                {(getGrievanceDetailState.data.Documents || []).map(item => {
                                    if (item.DocumentId) {
                                        return (
                                            <FileContainer onClick={() => DownloadFile(item.DocumentId, item.FileName)}>
                                                <div><FileOutlined /></div>
                                                <p className="title">{item.Name}</p>
                                            </FileContainer>
                                        )
                                    }
                                })}

                                {/* {getDocumentListState.apiState === "success"
                                    ? [
                                        attachedDocs === 0
                                            ? <FlexBar leftContent={
                                                <>
                                                    <Lottie
                                                        options={folderAnimationOptions}
                                                        height={80}
                                                        width={80}
                                                    />
                                                    <span>No document attached.</span>
                                                </>
                                            } />
                                            : null
                                    ]
                                    : null} */}

                                {/* <BlankSpace /> */}
                                {/* <ApplicationProgress ApplicationId={ApplicationId} DownloadCertificateLink={getGrievanceDetailState.data.DownloadCertificateLink}  /> */}
                            </Form>
                        </div>
                    </div>

                </>
            }
        </Container >
    )
}

const mapStateToProps = (state) => ({
    getGrievanceDetailState: state.getGrievanceDetail,
    verifyUpnAndMobileSubmitOtpState: state.verifyUpnAndMobileSubmitOtp,
})
const mapDispatchToProps = (dispatch) => ({
    getGrievanceDetail: (params) => dispatch(getGrievanceDetail(params)),
    getGrievanceDetailResetState: () => dispatch(getGrievanceDetailResetState()),
    verifyUpnAndMobileSubmitOtpResetState: () => dispatch(verifyUpnAndMobileSubmitOtpResetState()),
})

export default connect(mapStateToProps, mapDispatchToProps)(GrievanceDetails)