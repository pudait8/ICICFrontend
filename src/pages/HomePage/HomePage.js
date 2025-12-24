import React, { useEffect, useState, useCallback } from "react";
import {
  Col,
  Form,
  Row,
  notification,
  Button,
  Input,
  Space,
  Tag,
  Collapse,
} from "antd";
import { connect } from "react-redux";
import {
  CheckOutlined,
  UndoOutlined,
  MobileOutlined,
  InfoCircleOutlined,
  CaretRightOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Link, Prompt, Redirect } from "react-router-dom";
import debounce from "lodash/debounce";
// components
import {
  ApplicationNumberInput,
  Container,
  ContentArea,
  LeftSection,
  RightSection,
  InfoArea,
  MainContent,
  Heading,
  Description,
  DocumentLi,
  DocumentUl,
  IconContainer,
  DocumentTitle,
  ApplicationOtpNumberInput,
  InfoAreaNotice,
  InfoAreaExternalMenus,
  XPanel,
  TotalAuthority,
  Block,
  SpanHeaderLinking,
  SpanHeaderTotal,
  InfoAreaExternalMenusapplicationDashboard,
} from "./HomePageStyle";
import {
  BlankSpace,
  PrimaryButton,
  DynamicSkeleton,
  FormItem,
  BlueButton,
  Xlink,
  Xcollapse,
} from "../../components/Xcomponents";
import Footer from "../../components/Footer/Footer";
import CitizenService from "../../components/CitizenService/CitizenService";
// actions
import { getWebContent } from "../../actions/getWebContentAction";
import {
  verifyUpnAndMobile,
  verifyUpnAndMobileResetState,
} from "../../actions/verifyUpnAndMobileAction";
import {
  knowYourPropertyVerifyUpnAndMobile,
  knowYourPropertyVerifyUpnAndMobileResetState,
} from "../../actions/knowYourPropertyVerifyUpnAndMobileAction";
import {
  verifyUpnAndMobileSubmitOtp,
  verifyUpnAndMobileSubmitOtpResetState,
} from "../../actions/verifyUpnAndMobileSubmitOtpAction";
import { getAuthorityList } from "../../actions/getAuthorityListAction";
import { getMasterPlanList } from "../../actions/getMasterPlanListAction";
import { getActList } from "../../actions/getActListAction";
import {
  getApplicationTotalStatus,
  getApplicationTotalStatusResetState,
} from "../../actions/getApplicationTotalStatusAction";

// others
import { getOrgId, windowPath } from "../../utils";
import {
  SearchInput,
  TopBar,
  TopBarLeft,
  TopBarRight,
} from "../../components/CitizenService/CitizenServiceStyle";
import { ZoomGlassIcon } from "../../components/CustomIcons";
const { Panel } = Collapse;

const HomePage = (props) => {
  // variables
  const {
    getWebContent,
    getWebContentState,
    verifyUpnAndMobile,
    verifyUpnAndMobileResetState,
    verifyUpnAndMobileState,
    knowYourPropertyVerifyUpnAndMobile,
    knowYourPropertyVerifyUpnAndMobileResetState,
    knowYourPropertyVerifyUpnAndMobileState,
    verifyUpnAndMobileSubmitOtp,
    verifyUpnAndMobileSubmitOtpResetState,
    verifyUpnAndMobileSubmitOtpState,
    getAuthorityList,
    getAuthorityListState,
    getMasterPlanList,
    getMasterPlanListState,
    getActList,
    getActListState,
    getApplicationTotalStatus,
    getApplicationTotalStatusResetState,
    getApplicationTotalStatusState,
  } = props;
  const OrgId = getOrgId();
  const [redirect, setRedirect] = useState([false, ""]);
  let initialFormData = {
    upn: "",
    mobile: "",
    otp: "",
    OrgId: getOrgId(),
    ApplicationType: "0",
    AuthToken: null,
    AuthTokenKey: null,
    ContextType: "View",
    ApplicationId: "0",
    OwnerName: "",
    GrievanceNo: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [form] = Form.useForm();
  const [upnForm] = Form.useForm();
  const [resendOtpTimer, setResendOtpTimer] = useState(0);
  const [resetOtpState, setResetOtpState] = useState(0);
  const [searchTextAct, setSearchTextAct] = useState("");
  const [searchTextMasterPlan, setSearchTextMasterPlan] = useState("");

  const setDebouncedSearchTextAct = useCallback(
    debounce((q) => setSearchTextAct(q), 500),
    []
  );
  const setDebouncedSearchTextMasterPlan = useCallback(
    debounce((q) => setSearchTextMasterPlan(q), 500),
    []
  );

  // callbacks
  useEffect(() => {
    verifyUpnAndMobileSubmitOtpResetState();
    verifyUpnAndMobileResetState();
    knowYourPropertyVerifyUpnAndMobileResetState();
    resetForm();
    resetKnowYourPropertyForm();
    setResetOtpState(1);
    getApplicationTotalStatusResetState();
    return () => {
      verifyUpnAndMobileResetState();
      knowYourPropertyVerifyUpnAndMobileResetState();
    };
  }, []);

  useEffect(() => {
    // getAuthorityList()
    window.scrollTo(0, 2);
  }, []);

  useEffect(() => {
    localStorage.removeItem("PudaAuthTokenKey");
    localStorage.removeItem("PudaAuthToken");
    getWebContent({
      OrgId: OrgId,
    });
  }, []);

  useEffect(() => {
    getMasterPlanList({
      OrgId: OrgId,
      SearchText: searchTextMasterPlan,
    });
  }, [searchTextMasterPlan]);

  useEffect(() => {
    getActList({
      OrgId: OrgId,
      SearchText: searchTextAct,
    });
  }, [searchTextAct]);

  useEffect(() => {
    if (resetOtpState === 1) {
      if (
        verifyUpnAndMobileState.apiState === "alert" ||
        verifyUpnAndMobileState.apiState === "error"
      ) {
        notification["error"]({
          message: verifyUpnAndMobileState.apiMessage,
          placement: "bottomRight",
        });
        verifyUpnAndMobileResetState();
      }
      if (verifyUpnAndMobileState.apiState === "success") {
        notification["success"]({
          message: verifyUpnAndMobileState.apiMessage,
          placement: "bottomRight",
        });
        setResendOtpTimer(29);
        setFormData({
          ...formData,
          ["ContextType"]: verifyUpnAndMobileState.data.ContextType,
          ["ApplicationId"]: verifyUpnAndMobileState.data.ApplicationId,
          ["OwnerName"]: verifyUpnAndMobileState.data.OwnerName,
          ["mobile"]: verifyUpnAndMobileState.data.MobileNumber,
          ["upn"]: verifyUpnAndMobileState.data.UPN,
        });
      }
    }
  }, [verifyUpnAndMobileState, resetOtpState]);

  // Resend Otp Timer
  useEffect(() => {
    if (resendOtpTimer > 0) {
      const timer = setTimeout(() => {
        setResendOtpTimer(resendOtpTimer - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendOtpTimer]);

  useEffect(() => {
    if (
      verifyUpnAndMobileSubmitOtpState.apiState === "alert" ||
      verifyUpnAndMobileSubmitOtpState.apiState === "error"
    ) {
      notification["error"]({
        message: verifyUpnAndMobileSubmitOtpState.apiMessage,
        placement: "bottomRight",
      });
      // verifyUpnAndMobileState.data.TransactionNumber = verifyUpnAndMobileSubmitOtpState.data.TransactionNumber
      verifyUpnAndMobileSubmitOtpResetState();
    }

    if (verifyUpnAndMobileSubmitOtpState.apiState === "success") {
      notification["success"]({
        message: verifyUpnAndMobileSubmitOtpState.apiMessage,
        placement: "bottomRight",
      });
      setFormData({
        ...formData,
        ["AuthToken"]: verifyUpnAndMobileSubmitOtpState.AuthToken,
        ["AuthTokenKey"]: verifyUpnAndMobileSubmitOtpState.AuthTokenKey,
      });
      if (verifyUpnAndMobileState.apiState === "success") {
        setRedirect([
          true,
          `/ndc-details/${verifyUpnAndMobileSubmitOtpState.data.ApplicationId}`,
        ]);
      }
      if (knowYourPropertyVerifyUpnAndMobileState.apiState === "success") {
        setRedirect([
          true,
          `/property-details/${verifyUpnAndMobileSubmitOtpState.data.PropertyRefId}`,
        ]);
      }
      verifyUpnAndMobileSubmitOtpState.apiState = "";
    }
  }, [verifyUpnAndMobileSubmitOtpState]);

  // Know your property
  useEffect(() => {
    if (
      knowYourPropertyVerifyUpnAndMobileState.apiState === "alert" ||
      knowYourPropertyVerifyUpnAndMobileState.apiState === "error"
    ) {
      notification["error"]({
        message: knowYourPropertyVerifyUpnAndMobileState.apiMessage,
        placement: "bottomRight",
      });
      verifyUpnAndMobileResetState();
    }
    if (knowYourPropertyVerifyUpnAndMobileState.apiState === "success") {
      notification["success"]({
        message: knowYourPropertyVerifyUpnAndMobileState.apiMessage,
        placement: "bottomRight",
      });
      setFormData({
        ...formData,
        ["ContextType"]:
          knowYourPropertyVerifyUpnAndMobileState.data.ContextType,
        ["ApplicationId"]:
          knowYourPropertyVerifyUpnAndMobileState.data.ApplicationId,
        ["OwnerName"]: knowYourPropertyVerifyUpnAndMobileState.data.OwnerName,
        ["mobile"]: knowYourPropertyVerifyUpnAndMobileState.data.MobileNumber,
        ["upn"]: knowYourPropertyVerifyUpnAndMobileState.data.UPN,
      });
    }
  }, [knowYourPropertyVerifyUpnAndMobileState]);

  useEffect(() => {
    getApplicationTotalStatus(OrgId);
  }, []);

  const handleKnowYourPropertySubmit = () => {
    verifyUpnAndMobileResetState();
    setFormData({ ...formData, ["ApplicationId"]: "", ["otp"]: "" });
    form.setFieldsValue({
      ApplicationId: "",
      otp: "",
    });
    if (knowYourPropertyVerifyUpnAndMobileState.apiState === "success") {
      verifyUpnAndMobileSubmitOtp({
        OrgId: formData.OrgId,
        PropertyRefId:
          knowYourPropertyVerifyUpnAndMobileState.data.PropertyRefId,
        OwnerId: knowYourPropertyVerifyUpnAndMobileState.data.OwnerId,
        MobileNumber: formData.mobile,
        upn: formData.upn,
        ApplicationType: formData.ApplicationType,
        TransactionNumber:
          knowYourPropertyVerifyUpnAndMobileState.data.TransactionNumber,
        OTP: formData.otp,
        ContextType: formData.ContextType,
        ApplicationId: "",
        OwnerName: formData.OwnerName,
      });
    } else {
      knowYourPropertyVerifyUpnAndMobile({
        upn: formData.upn,
        mobile: formData.mobile,
        otp: formData.otp,
        OrgId: formData.OrgId,
        ApplicationType: formData.ApplicationType,
        AuthToken: null,
        AuthTokenKey: null,
        ContextType: formData.ContextType,
        ApplicationId: "",
        OwnerName: formData.OwnerName,
      });
    }
  };

  const handleGrievanceDetails = () => {
    setRedirect([
      true,
      `/grievance-details/${formData.OrgId}/${formData.GrievanceNo}`,
    ]);
  };

  const handleSubmit = () => {
    knowYourPropertyVerifyUpnAndMobileResetState();
    setFormData({ ...formData, ["upn"]: "", ["otp"]: "", ["mobile"]: "" });
    upnForm.setFieldsValue({
      upn: "",
      otp: "",
      mobile: "",
    });
    if (verifyUpnAndMobileState.apiState === "success") {
      verifyUpnAndMobileSubmitOtp({
        OrgId: formData.OrgId,
        PropertyRefId: verifyUpnAndMobileState.data.PropertyRefId,
        OwnerId: verifyUpnAndMobileState.data.OwnerId,
        MobileNumber: formData.mobile,
        upn: "",
        ApplicationType: formData.ApplicationType,
        TransactionNumber: verifyUpnAndMobileState.data.TransactionNumber,
        OTP: formData.otp,
        ContextType: formData.ContextType,
        ApplicationId: formData.ApplicationId,
        OwnerName: formData.OwnerName,
      });
    } else {
      verifyUpnAndMobile({
        upn: "",
        mobile: formData.mobile,
        otp: formData.otp,
        OrgId: formData.OrgId,
        ApplicationType: formData.ApplicationType,
        AuthToken: null,
        AuthTokenKey: null,
        ContextType: formData.ContextType,
        ApplicationId: formData.ApplicationId,
        OwnerName: "",
      });
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    form.resetFields();
  };

  const resetKnowYourPropertyForm = () => {
    setFormData(initialFormData);
    upnForm.resetFields();
  };

  const handleOnchange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleResendOtp = () => {
    setFormData({
      ...formData,
      ["otp"]: "",
    });
    verifyUpnAndMobileState.apiState = "";
    handleSubmit();
  };
  const handleknowYourPropertyResendOtp = () => {
    setFormData({
      ...formData,
      ["otp"]: "",
    });
    knowYourPropertyVerifyUpnAndMobileState.apiState = "";
    handleKnowYourPropertySubmit();
  };

  const createMarkup = (processContent) => {
    return { __html: processContent };
  };

  const goToAnotherPage = () => {
    window.alert(
      "You are being redirected to Government of Punjab Centralized Greviance portal https://connect.punjab.gov.in. Click OK to proceed"
    );
    window.open("https://connect.punjab.gov.in", "_blank");
  };

  return (
    <>
      {redirect[0] && <Redirect to={redirect[1]} />}
      <Container style={{ marginBottom: 0 }}>
        <ContentArea
          className={OrgId ? "" : "blurpage"}
          style={{
            pointerEvents: OrgId ? "auto" : "none",
          }}
        >
          <>
            <LeftSection>
              <MainContent>
                <Heading id="CitizenServices">
                  Know your Application Status
                </Heading>
                <Description style={{ fontSize: 18 }}>
                  Enter Application number below and know the status of
                  Application at ease.
                </Description>
                <Form
                  layout="inline"
                  onFinish={handleSubmit}
                  form={form}
                  requiredMark={false}
                >
                  <Form.Item
                    name="ApplicationId"
                    rules={[
                      { required: true, message: "Required" },
                      {
                        pattern: new RegExp("^[0-9]+$"),
                        message: "Enter valid application number.",
                      },
                    ]}
                  >
                    <ApplicationNumberInput
                      maxLength={8}
                      name="ApplicationId"
                      onChange={handleOnchange}
                      placeholder="Enter application no."
                      readOnly={verifyUpnAndMobileState.apiState === "success"}
                    />
                  </Form.Item>
                  {verifyUpnAndMobileState.apiState === "success" && (
                    <Form.Item
                      name="otp"
                      rules={[{ required: true, message: "Required" }]}
                    >
                      <ApplicationOtpNumberInput
                        name="otp"
                        onChange={handleOnchange}
                        placeholder="Enter OTP"
                      />
                    </Form.Item>
                  )}
                  <BlueButton
                    htmlType="submit"
                    loading={
                      verifyUpnAndMobileState.apiState === "loading" ||
                      verifyUpnAndMobileSubmitOtpState.apiState === "loading"
                        ? true
                        : false
                    }
                  >
                    {verifyUpnAndMobileState.apiState === "success"
                      ? "VERIFY"
                      : "GET OTP"}
                  </BlueButton>
                  {verifyUpnAndMobileState.apiState === "success" && (
                    <>
                      <Button
                        style={{ padding: "0px" }}
                        type="link"
                        onClick={() => {
                          verifyUpnAndMobileResetState();
                          resetForm();
                        }}
                        icon={<UndoOutlined />}
                      >
                        Change Application No.
                      </Button>
                      <Button
                        type="link"
                        disabled={resendOtpTimer > 0 ? true : false}
                        onClick={handleResendOtp}
                        icon={<UndoOutlined />}
                        loading={
                          verifyUpnAndMobileState.apiState === "loading"
                            ? true
                            : false
                        }
                      >
                        Resend OTP
                        {resendOtpTimer > 0 && <> ({resendOtpTimer})</>}
                      </Button>
                    </>
                  )}
                </Form>

                <CitizenService />

                <BlankSpace xxl />
                <Heading id="PropertyDetails">Your Property Details</Heading>
                <Description>
                  Learn about your property dues, pay them online. For security
                  reasons you will be required to verify your authorization on
                  property.{" "}
                </Description>

                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                  {/* <Space>
                                    <PrimaryButton type="primary" >KNOW PROPERTY DETAILS</PrimaryButton>
                                </Space> */}
                  {verifyUpnAndMobileSubmitOtpState.apiState != "success" && (
                    <>
                      <Form
                        layout="vertical"
                        requiredMark={false}
                        onFinish={handleKnowYourPropertySubmit}
                        form={upnForm}
                      >
                        <Row gutter="24">
                          <Col span="12">
                            <FormItem
                              label="Unique Property Number"
                              name="upn"
                              rules={[{ required: true, message: "Required" }]}
                            >
                              <Input
                                size="large"
                                name="upn"
                                onChange={handleOnchange}
                                readOnly={
                                  knowYourPropertyVerifyUpnAndMobileState.apiState ===
                                  "success"
                                }
                              />
                            </FormItem>
                          </Col>
                          <Col span="12">
                            <FormItem
                              label="Registered Mobile Number"
                              name="mobile"
                              rules={[
                                { required: true, message: "Required" },
                                {
                                  pattern: new RegExp("^[6-9]\\d{9}$"),
                                  message: "Mobile number is not valid",
                                },
                              ]}
                            >
                              <Input
                                size="large"
                                name="mobile"
                                onChange={handleOnchange}
                                readOnly={
                                  knowYourPropertyVerifyUpnAndMobileState.apiState ===
                                  "success"
                                }
                              />
                            </FormItem>
                          </Col>
                        </Row>

                        {knowYourPropertyVerifyUpnAndMobileState.apiState ===
                          "success" && (
                          <Row gutter="24">
                            <Col span="12">
                              <FormItem
                                label="Enter OTP"
                                name="otp"
                                rules={[
                                  { required: true, message: "Required" },
                                ]}
                              >
                                <Input
                                  size="large"
                                  name="otp"
                                  onChange={handleOnchange}
                                />
                              </FormItem>
                            </Col>
                          </Row>
                        )}
                        <BlueButton
                          htmlType="submit"
                          loading={
                            knowYourPropertyVerifyUpnAndMobileState.apiState ===
                              "loading" ||
                            verifyUpnAndMobileSubmitOtpState.apiState ===
                              "loading"
                              ? true
                              : false
                          }
                        >
                          {knowYourPropertyVerifyUpnAndMobileState.apiState ===
                          "success"
                            ? "VERIFY"
                            : "GET OTP"}
                        </BlueButton>
                        {knowYourPropertyVerifyUpnAndMobileState.apiState ===
                          "success" && (
                          <>
                            <Button
                              type="link"
                              onClick={() => {
                                knowYourPropertyVerifyUpnAndMobileResetState();
                                resetKnowYourPropertyForm();
                              }}
                              icon={<UndoOutlined />}
                            >
                              Change UPN
                            </Button>
                            <Button
                              type="link"
                              disabled={resendOtpTimer > 0 ? true : false}
                              onClick={handleknowYourPropertyResendOtp}
                              icon={<UndoOutlined />}
                              loading={
                                knowYourPropertyVerifyUpnAndMobileState.apiState ===
                                "loading"
                                  ? true
                                  : false
                              }
                            >
                              Resend OTP
                              {resendOtpTimer > 0 && <> ({resendOtpTimer})</>}
                            </Button>
                          </>
                        )}
                      </Form>
                    </>
                  )}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    flexDirection: "column",
                    marginTop: 20,
                  }}
                >
                  <Xlink to="/link-mobile">
                    <PrimaryButton type="primary">
                      <MobileOutlined /> LINK MOBILE NUMBER WITH YOUR PROPERTY
                    </PrimaryButton>
                  </Xlink>
                  <Xlink to="/get-upn" style={{ marginTop: 10 }}>
                    <PrimaryButton type="primary">
                      <InfoCircleOutlined /> KNOW YOUR UPN
                    </PrimaryButton>
                  </Xlink>
                </div>

                <BlankSpace xxl />
                <Heading>Grievances</Heading>

                {/* <div>
                  {verifyUpnAndMobileSubmitOtpState.apiState != "success" && (
                    <>
                      <Form
                        layout="vertical"
                        requiredMark={false}
                        onFinish={handleGrievanceDetails}
                      >
                        <Row gutter="24" style={{ alignItems: "center" }}>
                          <Col span="12">
                            <FormItem
                              label="Enter Grievance Number"
                              name="GrievanceNo"
                              rules={[
                                { required: true, message: "Required" },
                                {
                                  pattern: new RegExp("^[0-9]+$"),
                                  message: "Enter valid grievance number.",
                                },
                              ]}
                            >
                              <Input
                                size="large"
                                name="GrievanceNo"
                                maxLength={6}
                                onChange={handleOnchange}
                                readOnly={
                                  knowYourPropertyVerifyUpnAndMobileState.apiState ===
                                  "success"
                                }
                              />
                            </FormItem>
                          </Col>
                          <Col span="12">
                            <BlueButton htmlType="submit">
                              GET DETAILS
                            </BlueButton>
                          </Col>
                        </Row>
                      </Form>
                    </>
                  )}
                </div> */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    flexDirection: "column",
                    marginTop: 0,
                  }}
                >
                  {/* <Xlink
                    //   to="/grievance"
                    to={{ pathname: "https://connect.punjab.gov.in" }}
                    style={{ marginTop: 0 }}
                    target="_blank"
                  >
                  </Xlink> */}
                  <div>
                    <PrimaryButton type="primary" onClick={goToAnotherPage}>
                      <ExclamationCircleOutlined />
                      REGISTER NEW GRIEVANCE
                    </PrimaryButton>
                  </div>
                </div>

                {getWebContentState.apiState === "success" && (
                  <>
                    {getWebContentState.data.NewSchemes &&
                      getWebContentState.data.NewSchemes.length > 0 && (
                        <>
                          <BlankSpace xxl />
                          <Heading id="NewSchemes">New Schemes</Heading>
                          <DocumentUl>
                            {getWebContentState.data.NewSchemes.map((item) => (
                              <Link
                                to={{ pathname: item.ContentURL }}
                                target="_blank"
                              >
                                <DocumentLi>
                                  <div>
                                    <IconContainer>
                                      <CheckOutlined
                                        style={{ color: "#fff" }}
                                      />
                                    </IconContainer>
                                  </div>
                                  <div>
                                    {item.IsNew && (
                                      <Tag color="default">NEW</Tag>
                                    )}
                                  </div>
                                  <DocumentTitle>{item.Title}</DocumentTitle>
                                </DocumentLi>
                              </Link>
                            ))}
                          </DocumentUl>
                        </>
                      )}
                  </>
                )}

                <>
                  <BlankSpace xxl />
                  <TopBar>
                    <TopBarLeft>
                      <Heading id="Laws">
                        {"Rules Acts & Notifications"}
                      </Heading>
                    </TopBarLeft>
                    <TopBarRight>
                      <SearchInput
                        placeholder="Search by Rules Acts & Notifications"
                        suffix={<ZoomGlassIcon size="18" />}
                        onChange={(e) =>
                          setDebouncedSearchTextAct(e.target.value)
                        }
                      />
                    </TopBarRight>
                  </TopBar>
                  {getActListState.apiState === "success" && (
                    <Xcollapse
                      ghost
                      expandIcon={({ isActive }) => (
                        <CaretRightOutlined rotate={isActive ? 90 : 0} />
                      )}
                      defaultActiveKey={
                        searchTextAct
                          ? getActListState.list.map((list) => list.GroupId)
                          : null
                      }
                    >
                      {getActListState.list.map((list) => {
                        return (
                          <Xcollapse.Panel
                            header={list.GroupName}
                            key={list.GroupId}
                          >
                            <Collapse
                              defaultActiveKey={
                                searchTextAct
                                  ? list.FAQ.map((faq) => faq.Id)
                                  : null
                              }
                            >
                              {list.FAQ.map((faq) => {
                                return (
                                  <XPanel header={faq.Question} key={faq.Id}>
                                    {faq.Answer !== null && (
                                      <div
                                        dangerouslySetInnerHTML={createMarkup(
                                          faq.Answer
                                        )}
                                      ></div>
                                    )}
                                  </XPanel>
                                );
                              })}
                            </Collapse>
                          </Xcollapse.Panel>
                        );
                      })}
                    </Xcollapse>
                  )}
                  {/* <DocumentUl>
                                                    {getWebContentState.data.Acts.map(item => (
                                                        <Link to={{ pathname: item.ContentURL }} target="_blank" >
                                                            <DocumentLi>
                                                                <div>
                                                                    <IconContainer>
                                                                        <CheckOutlined style={{ color: "#fff" }} />
                                                                    </IconContainer>
                                                                </div>
                                                                <div>
                                                                    {item.IsNew && <Tag color="default" >NEW</Tag>}
                                                                </div>
                                                                <DocumentTitle>{item.Title}</DocumentTitle>
                                                            </DocumentLi>
                                                        </Link>
                                                    ))}
                                                    {getWebContentState.data.Rules.map(item => (
                                                        <Link to={{ pathname: item.ContentURL }} target="_blank" >
                                                            <DocumentLi>
                                                                <div>
                                                                    <IconContainer>
                                                                        <CheckOutlined style={{ color: "#fff" }} />
                                                                    </IconContainer>
                                                                </div>
                                                                <div>
                                                                    {item.IsNew && <Tag color="default" >NEW</Tag>}
                                                                </div>
                                                                <DocumentTitle>{item.Title}</DocumentTitle>
                                                            </DocumentLi>
                                                        </Link>
                                                    ))}
                                                </DocumentUl> */}
                </>

                {getWebContentState.apiState === "success" && (
                  <>
                    {getWebContentState.data.Tenders &&
                      getWebContentState.data.Tenders.length > 0 && (
                        <>
                          <BlankSpace xxl />
                          <Heading id="Tender">{"Tender Notices"}</Heading>
                          <DocumentUl>
                            {getWebContentState.data.Tenders.map((item) => (
                              <Link
                                to={{ pathname: item.ContentURL }}
                                target="_blank"
                              >
                                <DocumentLi>
                                  <div>
                                    <IconContainer>
                                      <CheckOutlined
                                        style={{ color: "#fff" }}
                                      />
                                    </IconContainer>
                                  </div>
                                  <div>
                                    {item.IsNew && (
                                      <Tag color="default">NEW</Tag>
                                    )}
                                  </div>
                                  <DocumentTitle>{item.Title}</DocumentTitle>
                                </DocumentLi>
                              </Link>
                            ))}
                          </DocumentUl>
                        </>
                      )}
                  </>
                )}

                <>
                  <BlankSpace xxl />
                  <TopBar>
                    <TopBarLeft>
                      <Heading id="MasterPlan">{"Master Plan"}</Heading>
                    </TopBarLeft>
                    <TopBarRight>
                      <SearchInput
                        placeholder="Search by Master Plan"
                        suffix={<ZoomGlassIcon size="18" />}
                        onChange={(e) =>
                          setDebouncedSearchTextMasterPlan(e.target.value)
                        }
                      />
                    </TopBarRight>
                  </TopBar>
                  {getMasterPlanListState.apiState === "success" && (
                    <Xcollapse
                      ghost
                      expandIcon={({ isActive }) => (
                        <CaretRightOutlined rotate={isActive ? 90 : 0} />
                      )}
                      defaultActiveKey={
                        searchTextMasterPlan
                          ? getMasterPlanListState.list.map(
                              (list) => list.GroupId
                            )
                          : null
                      }
                    >
                      {getMasterPlanListState.list.map((list) => {
                        return (
                          <Xcollapse.Panel
                            header={list.GroupName}
                            key={list.GroupId}
                          >
                            <Collapse
                              defaultActiveKey={
                                searchTextMasterPlan
                                  ? list.FAQ.map((faq) => faq.Id)
                                  : null
                              }
                            >
                              {list.FAQ.map((faq) => {
                                return (
                                  <Panel header={faq.Question} key={faq.Id}>
                                    {faq.Answer !== null && (
                                      <div
                                        dangerouslySetInnerHTML={createMarkup(
                                          faq.Answer
                                        )}
                                      ></div>
                                    )}
                                  </Panel>
                                );
                              })}
                            </Collapse>
                          </Xcollapse.Panel>
                        );
                      })}
                    </Xcollapse>
                  )}
                </>
              </MainContent>
            </LeftSection>
            <RightSection>
              <InfoArea>
                <Space direction="vertical" style={{ width: "100%" }}>
                  <TotalAuthority>
                    <InfoAreaExternalMenusapplicationDashboard>
                      <Block to="/applicationDashboard">
                        <SpanHeaderLinking>
                          Total Applications recevied since 1st May 2021
                        </SpanHeaderLinking>
                        <SpanHeaderTotal>
                          {Object.keys(getApplicationTotalStatusState.list)
                            .length > 0
                            ? getApplicationTotalStatusState.list
                                .TotalApplRecMay21
                            : 0}
                        </SpanHeaderTotal>
                      </Block>
                    </InfoAreaExternalMenusapplicationDashboard>
                    <InfoAreaExternalMenusapplicationDashboard>
                      <Block to="/applicationDashboard">
                        <SpanHeaderLinking>
                          Total Applications Disposed off since 1st May 2021
                        </SpanHeaderLinking>
                        <SpanHeaderTotal>
                          {Object.keys(getApplicationTotalStatusState.list)
                            .length > 0
                            ? getApplicationTotalStatusState.list
                                .TotalApplDispMay21
                            : 0}
                        </SpanHeaderTotal>
                      </Block>
                    </InfoAreaExternalMenusapplicationDashboard>
                    <InfoAreaExternalMenusapplicationDashboard>
                      <Block to="/applicationDashboard">
                        <SpanHeaderLinking>
                          Applications Under Process
                        </SpanHeaderLinking>
                        <SpanHeaderTotal>
                          {Object.keys(getApplicationTotalStatusState.list)
                            .length > 0
                            ? getApplicationTotalStatusState.list
                                .TotalApplUnderProcess
                            : 0}
                        </SpanHeaderTotal>
                      </Block>
                    </InfoAreaExternalMenusapplicationDashboard>
                  </TotalAuthority>
                  <TotalAuthority>
                    <InfoAreaExternalMenusapplicationDashboard>
                      <Block to="/applicationDashboard">
                        <SpanHeaderLinking>
                          Applications Received Today
                        </SpanHeaderLinking>
                        <SpanHeaderTotal>
                          {Object.keys(getApplicationTotalStatusState.list)
                            .length > 0
                            ? getApplicationTotalStatusState.list
                                .TotalApplRecToday
                            : 0}
                        </SpanHeaderTotal>
                      </Block>
                    </InfoAreaExternalMenusapplicationDashboard>
                    <InfoAreaExternalMenusapplicationDashboard>
                      <Block to="/applicationDashboard">
                        <SpanHeaderLinking>
                          Applications Disposed off Today
                        </SpanHeaderLinking>
                        <SpanHeaderTotal>
                          {Object.keys(getApplicationTotalStatusState.list)
                            .length > 0
                            ? getApplicationTotalStatusState.list
                                .TotalApplDispToday
                            : 0}
                        </SpanHeaderTotal>
                      </Block>
                    </InfoAreaExternalMenusapplicationDashboard>
                    <InfoAreaExternalMenusapplicationDashboard>
                      <Block to="/applicationDashboard">
                        <SpanHeaderLinking>
                          Applications Pending with Applicant
                        </SpanHeaderLinking>
                        <SpanHeaderTotal>
                          {Object.keys(getApplicationTotalStatusState.list)
                            .length > 0
                            ? getApplicationTotalStatusState.list
                                .TotalApplPendAtApplicant
                            : 0}
                        </SpanHeaderTotal>
                      </Block>
                    </InfoAreaExternalMenusapplicationDashboard>
                  </TotalAuthority>
                  {getWebContentState.apiState === "success" && (
                    <>
                      {getWebContentState.data.ExternalMenus.length > 0 &&
                        getWebContentState.data.ExternalMenus.map((item) => (
                          <InfoAreaExternalMenus>
                            <Link
                              to={{ pathname: item.ContentURL }}
                              target="_blank"
                            >
                              <span
                                style={{
                                  color: "#fff",
                                  marginBottom: "0.3em",
                                  fontWeight: 300,
                                }}
                              >
                                <Tag
                                  color="#fff"
                                  style={{ color: "#000", cursor: "pointer" }}
                                >
                                  Click here
                                </Tag>
                                {item.Title}{" "}
                              </span>
                            </Link>
                          </InfoAreaExternalMenus>
                        ))}
                    </>
                  )}
                  <InfoAreaExternalMenus>
                    <Link to="/colonies">
                      <span
                        style={{
                          color: "#fff",
                          marginBottom: "0.3em",
                          fontWeight: 300,
                        }}
                      >
                        <Tag
                          color="#fff"
                          style={{ color: "#000", cursor: "pointer" }}
                        >
                          Click here
                        </Tag>
                        For List of Colonies
                      </span>
                    </Link>
                    <Link to="/pay-water-bill">
                      <span
                        style={{
                          color: "#fff",
                          marginBottom: "0.3em",
                          fontWeight: 300,
                        }}
                      >
                        <Tag
                          color="#fff"
                          style={{ color: "#000", cursor: "pointer" }}
                        >
                          Click here
                        </Tag>
                        Make online water payments
                      </span>
                    </Link>
                  </InfoAreaExternalMenus>
                  <InfoAreaNotice>
                    <h3 style={{ color: "#fff", fontFamily: "iic-fonts-bold" }}>
                      Notices and Advertisements{" "}
                    </h3>
                    {getWebContentState.apiState === "loading" && (
                      <span style={{ color: "#fff" }}>
                        Loading announcements...
                      </span>
                    )}
                    {getWebContentState.apiState === "success" && (
                      <>
                        {getWebContentState.data.Announcements.length === 0 ? (
                          <>
                            <span style={{ color: "#fff" }}>
                              There are no announcements currently.
                            </span>
                          </>
                        ) : (
                          <>
                            <ul style={{ paddingLeft: 17, marginBottom: 0 }}>
                              {getWebContentState.data.Announcements.map(
                                (item) => (
                                  <li>
                                    <Link
                                      to={{ pathname: item.ContentURL }}
                                      target="_blank"
                                    >
                                      <span
                                        style={{
                                          color: "#fff",
                                          marginBottom: "0.3em",
                                          fontWeight: 300,
                                        }}
                                      >
                                        {item.IsNew && (
                                          <Tag
                                            color="#fff"
                                            style={{ color: "#000" }}
                                          >
                                            NEW
                                          </Tag>
                                        )}
                                        {item.Title}{" "}
                                      </span>
                                    </Link>
                                  </li>
                                )
                              )}
                            </ul>
                          </>
                        )}
                      </>
                    )}
                  </InfoAreaNotice>
                </Space>
              </InfoArea>
            </RightSection>
          </>
        </ContentArea>
      </Container>
      <Container>
        <Footer />
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  getWebContentState: state.getWebContent,
  verifyUpnAndMobileState: state.verifyUpnAndMobile,
  knowYourPropertyVerifyUpnAndMobileState:
    state.knowYourPropertyVerifyUpnAndMobile,
  verifyUpnAndMobileSubmitOtpState: state.verifyUpnAndMobileSubmitOtp,
  getAuthorityListState: state.getAuthorityList,
  getMasterPlanListState: state.getMasterPlanList,
  getActListState: state.getActList,
  getApplicationTotalStatusState: state.getApplicationTotalStatus,
});
const mapDispatchToProps = (dispatch) => ({
  getWebContent: (params) => dispatch(getWebContent(params)),
  verifyUpnAndMobile: (params) => dispatch(verifyUpnAndMobile(params)),
  verifyUpnAndMobileResetState: () => dispatch(verifyUpnAndMobileResetState()),
  knowYourPropertyVerifyUpnAndMobile: (params) =>
    dispatch(knowYourPropertyVerifyUpnAndMobile(params)),
  knowYourPropertyVerifyUpnAndMobileResetState: () =>
    dispatch(knowYourPropertyVerifyUpnAndMobileResetState()),
  verifyUpnAndMobileSubmitOtp: (params) =>
    dispatch(verifyUpnAndMobileSubmitOtp(params)),
  verifyUpnAndMobileSubmitOtpResetState: () =>
    dispatch(verifyUpnAndMobileSubmitOtpResetState()),
  getAuthorityList: (params) => dispatch(getAuthorityList(params)),
  getMasterPlanList: (params) => dispatch(getMasterPlanList(params)),
  getActList: (params) => dispatch(getActList(params)),
  getApplicationTotalStatus: (params) =>
    dispatch(getApplicationTotalStatus(params)),
  getApplicationTotalStatusResetState: () =>
    dispatch(getApplicationTotalStatusResetState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
