import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Form,
  Col,
  Row,
  Input,
  Select,
  Tooltip,
  notification,
  Space,
  Button,
  Alert,
} from "antd";
import {
  CheckCircleFilled,
  CloseCircleOutlined,
  InfoCircleOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import { price_in_words } from "../../utils";

// Custom Components import
import {
  Container,
  ServiceBar,
  LeftSection,
  RightSection,
  ServiceName,
} from "./PayWaterBillStyle";
import ScrollBox from "../../components/ScrollBox";
import { BackIcon, SendIcon } from "../../components/CustomIcons";
import {
  PrimaryButton,
  BlankSpace,
  FormItem,
  BlueButton,
  GreenButton,
  Xlink,
  FlexDiv,
  FlexRow,
  TextButton,
  Divider,
} from "../../components/Xcomponents";
import {
  requestAuthorityList,
  requestLocationList,
  requestSectorList,
  requestUsageTypesList,
  requestPropertyTypeList,
  requestPropertyNumberList,
  getUpnNumber,
  getUpnVerifyOtp,
  getUpnResetState,
} from "../../actions/GetUpnActions";
import {
  getWaterBillDetails,
  getWaterBillDetailsReset,
} from "../../actions/getWaterBillDetailsAction";
import {
  getOldBillDetails,
  getOldBillDetailsResetState,
} from "../../actions/getOldBillDetailsAction";
import { getOrgId } from "../../utils";
import {
  getPaymentIntegrationPayload,
  paymentIntegrationStatusCheck,
} from "../../actions/duePaymentsAction";
import {
  getWaterPaymentLink,
  getWaterPaymentLinkReset,
} from "../../actions/getWaterPaymentLinkAction";

const { Option } = Select;

const PayWaterBill = (props) => {
  const OrgId = getOrgId();
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();

  const [sectionVisible, setSectionVisible] = useState("first");
  const [oldBillNumber, setOldBillNumber] = useState("");
  const [DevelopmentAuthorityOptions, setDevelopmentAuthorityOptions] =
    useState([]);
  const {
    getOldBillDetail,
    getOldBillDetailsResetState,
    getoldBillDetailState,
    GetUpnState,
    getUpnResetState,
    requestLocationList,
    requestSectorList,
    requestUsageTypesList,
    requestPropertyTypeList,
    requestPropertyNumberList,
    getUpnNumber,
    getAuthorityListState,
    getWaterBillDetails,
    getWaterBillDetailsReset,
    getWaterBillDetailsState,
    getPaymentIntegrationPayload,
    paymentIntegrationStatusCheck,
    getWaterPaymentLink,
    getWaterPaymentLinkReset,
    getWaterPaymentLinkState,
  } = props;
  const initialFormData = {
    AuthorityId: null,
    LocationName: null,
    SectorId: null,
    UsageTypeId: null,
    PropertyTypeId: null,
    PropertyNumberId: null,
    AllotmentNumber: "",
    MobileNumber: "",
  };
  const [FormData, setFormData] = useState(initialFormData);
  const [LocationOptions, setLocationOptions] = useState([]);
  const [SectorOptions, setSectorOptions] = useState([]);
  const [UsageTypesOptions, setUsageTypesOptions] = useState([]);
  const [PropertyTypeOptions, setPropertyTypeOptions] = useState([]);
  const [PropertyNumberOptions, setPropertyNumberOptions] = useState([]);
  const [displayOtpModal, setDisplayOtpModal] = useState(false);
  const [billOrKNumber, setBillOrKNumber] = useState({
    billNumber: "",
    kNumber: "",
  });
  const [visible, setVisible] = useState(false);
  const [displayErrMsg, setDisplayErrMsg] = useState(false);
  const [displayBillDetails, setDisplayBillDetails] = useState(false);

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
  } = GetUpnState;

  useEffect(() => {
    return () => {
      getWaterBillDetailsReset();
      getOldBillDetailsResetState();
    };
  }, []);

  useEffect(() => {
    {
      let options = [];
      getAuthorityListState.list.map((item) => {
        options.push(
          <Option key={item.Id} value={item.Id}>
            {item.Name}
          </Option>
        );
      });
      setDevelopmentAuthorityOptions(options);
    }
  }, [getAuthorityListState]);

  useEffect(() => {
    if (LocationList && LocationList.length > 0) {
      let options = [];
      LocationList.forEach((item) => {
        if (item.Name)
          options.push(
            <Option key={item.IdStr} value={item.IdStr}>
              {item.Name}
            </Option>
          );
      });
      setLocationOptions(options);
    }
  }, [LocationList]);

  useEffect(() => {
    if (SectorList && SectorList.length > 0) {
      let options = [];
      SectorList.forEach((item) => {
        if (item.Name)
          options.push(
            <Option key={item.Id} value={item.Id}>
              {item.Name}
            </Option>
          );
      });
      setSectorOptions(options);
    }
  }, [SectorList]);

  useEffect(() => {
    if (UsageTypesList && UsageTypesList.length > 0) {
      let options = [];
      UsageTypesList.forEach((item) => {
        if (item.Name)
          options.push(
            <Option key={item.Id} value={item.Id}>
              {item.Name}
            </Option>
          );
      });
      setUsageTypesOptions(options);
    }
  }, [UsageTypesList]);

  useEffect(() => {
    if (PropertyTypeList && PropertyTypeList.length > 0) {
      let options = [];
      PropertyTypeList.forEach((item) => {
        if (item.Name)
          options.push(
            <Option key={item.Id} value={item.Id}>
              {item.Name}
            </Option>
          );
      });
      setPropertyTypeOptions(options);
    }
  }, [PropertyTypeList]);

  useEffect(() => {
    if (PropertyNumberList && PropertyNumberList.length > 0) {
      let options = [];
      PropertyNumberList.forEach((item) => {
        if (item.Name)
          options.push(
            <Option key={item.Id} value={item.Id}>
              {item.Name}
            </Option>
          );
      });
      setPropertyNumberOptions(options);
    } else {
      setPropertyNumberOptions([]);
    }
  }, [PropertyNumberList]);

  useEffect(() => {
    if (getWaterBillDetailsState.apiState === "success") {
      getOldBillDetailsResetState();
      setDisplayBillDetails(true);
    }
    if (
      getWaterBillDetailsState.apiState === "alert" ||
      getWaterBillDetailsState.apiState === "error"
    ) {
      notification.error({
        message: getWaterBillDetailsState.apiMessage,
        placement: "bottomRight",
      });
    }
  }, [getWaterBillDetailsState]);

  useEffect(() => {
    if (getWaterPaymentLinkState.apiState === "success") {
      window.location.href = `${getWaterPaymentLinkState.data.URL}?UniqueId=${getWaterPaymentLinkState.data.UniqueId}&UserId=${getWaterPaymentLinkState.data.UserId}&Amount=${getWaterPaymentLinkState.data.Amount}`;
    }
  }, [getWaterPaymentLinkState]);

  const handleDevelopmentAuthoritySelect = (AuthorityId, option) => {
    setFormData({ ...FormData, ["AuthorityId"]: AuthorityId });
    requestLocationList(AuthorityId);
    form.setFieldsValue({
      Location: undefined,
      Sector: undefined,
      UsageType: undefined,
      PropertyType: undefined,
      PropertyNumber: undefined,
    });
  };

  const handleLocationSelect = (LocationName, option) => {
    setFormData({ ...FormData, ["LocationName"]: LocationName });
    requestSectorList({
      AuthorityId: FormData.AuthorityId,
      LocationName: LocationName,
    });
    form.setFieldsValue({
      Sector: undefined,
      UsageType: undefined,
      PropertyType: undefined,
      PropertyNumber: undefined,
    });
  };

  const handleSectorSelect = (SectorId, option) => {
    setFormData({ ...FormData, ["SectorId"]: SectorId });
    requestUsageTypesList({
      AuthorityId: FormData.AuthorityId,
      SectorId: SectorId,
    });
    form.setFieldsValue({
      UsageType: undefined,
      PropertyType: undefined,
      PropertyNumber: undefined,
    });
  };

  const handleUsageTypeSelect = (UsageTypeId, option) => {
    setFormData({ ...FormData, ["UsageTypeId"]: UsageTypeId });
    requestPropertyTypeList({
      AuthorityId: FormData.AuthorityId,
      SectorId: FormData.SectorId,
      UsageTypeId: UsageTypeId,
    });
    form.setFieldsValue({
      PropertyType: undefined,
      PropertyNumber: undefined,
    });
  };

  const handlePropertyTypeSelect = (PropertyTypeId, option) => {
    GetUpnState.DisablePropertyNumber = false;
    GetUpnState.PropertyNumberList = null;
    setFormData({ ...FormData, ["PropertyTypeId"]: PropertyTypeId });
  };

  const handlePropertyNumberSearch = (SearchTerm) => {
    if (SearchTerm.length >= 1) {
      requestPropertyNumberList({
        AuthorityId: FormData.AuthorityId,
        SectorId: FormData.SectorId,
        UsageTypeId: FormData.UsageTypeId,
        PropertyTypeId: FormData.PropertyTypeId,
        SearchTerm: SearchTerm,
      });
    } else {
      setPropertyNumberOptions([]);
    }
  };

  const handlePropertyNumberSelect = (PropertyNumberId, option) => {
    setFormData({ ...FormData, ["PropertyNumberId"]: PropertyNumberId });
  };

  const resetForm = () => {
    setPropertyNumberOptions([]);
    setPropertyTypeOptions([]);
    setUsageTypesOptions([]);
    setSectorOptions([]);
    setLocationOptions([]);
    setFormData({ ...initialFormData });
    form.resetFields();
    setDisplayOtpModal(false);
    getUpnResetState();
  };

  const handleSubmitkNumber = () => {
    if (!billOrKNumber.billNumber && !billOrKNumber.kNumber) {
      setDisplayErrMsg(true);
      return;
    } else {
      setDisplayErrMsg(false);
      getWaterBillDetails({
        OrgId: OrgId,
        Type: billOrKNumber.billNumber ? "B" : "K",
        KNO: billOrKNumber.billNumber
          ? billOrKNumber.billNumber
          : billOrKNumber.kNumber,
      });
      return;
    }
  };

  const onFinish = () => {
    getWaterBillDetails({
      OrgId: OrgId,
      Type: "P",
      KNO: FormData.PropertyNumberId,
    });
  };

  const handleOnChange = (e) => {
    setFormData({ ...FormData, [e.target.name]: e.target.value });
  };
  const getOldBill = () => {
    getOldBillDetailsResetState();
    setVisible(false);
    getOldBillDetail({
      OrgId: OrgId,
      BillNo: oldBillNumber,
    });
  };

  useEffect(() => {
    if (getoldBillDetailState.apiState === "success") {
      getWaterBillDetailsReset();
      notification.success({
        message: "Bill details Fetch Successfully",
        placement: "bottomRight",
      });
      setVisible(true);
    } else if (getoldBillDetailState.apiState == "alert") {
      notification.info({
        message: getoldBillDetailState.alertMessage,
        placement: "bottomRight",
      });
    }
  }, [getoldBillDetailState]);

  function printPage() {
    var printHtml = window.open("", "PRINT", "height=400,width=600");

    printHtml.document.write("<html><head>");
    printHtml.document.write(document.getElementById("print-div").innerHTML);
    printHtml.document.write("</body></html>");

    printHtml.print();
    // printHtml.close();

    return true;
  }

  return (
    <Container>
      <ScrollBox>
        <ServiceBar>
          <LeftSection>
            <Link to="/">
              <BackIcon style={{ marginTop: 5 }} />
            </Link>
          </LeftSection>
          <RightSection>
            <ServiceName>Pay Water Bill Online</ServiceName>
          </RightSection>
        </ServiceBar>

        <div
          className="get-upn-from-container"
          style={{ display: displayBillDetails ? "none" : "block" }}
        >
          <div
            style={{
              overflow: "hidden",
              transition: "all 200ms ease-in-out",
              transform: sectionVisible === "first" ? "scaleY(1)" : "scaleY(0)",
              height: sectionVisible === "first" ? "auto" : "0px",
            }}
          >
            <Form
              form={form2}
              layout="vertical"
              hideRequiredMark={true}
              onFinish={() => {}}
            >
              <Row
                gutter={24}
                style={{
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                  <FormItem name="billNumber" label="Enter Bill Number">
                    <Input
                      maxLength={20}
                      name="billNumber"
                      onChange={(e) =>
                        setBillOrKNumber({
                          ...billOrKNumber,
                          ["billNumber"]: e.target.value,
                        })
                      }
                      onFocus={() => {
                        setBillOrKNumber({ ...billOrKNumber, ["kNumber"]: "" });
                        form2.setFieldsValue({
                          kNumber: "",
                        });
                      }}
                    />
                  </FormItem>
                </Col>
                <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                  <div style={{ fontWeight: "bold", textAlign: "center" }}>
                    OR
                  </div>
                </Col>
                <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                  <FormItem name="kNumber" label="Enter K Number">
                    <Input
                      maxLength={20}
                      name="kNumber"
                      onChange={(e) =>
                        setBillOrKNumber({
                          ...billOrKNumber,
                          ["kNumber"]: e.target.value,
                        })
                      }
                      onFocus={() => {
                        setBillOrKNumber({
                          ...billOrKNumber,
                          ["billNumber"]: "",
                        });
                        form2.setFieldsValue({
                          billNumber: "",
                        });
                      }}
                    />
                  </FormItem>
                </Col>
              </Row>
              {displayErrMsg && (
                <div
                  style={{
                    marginBottom: "16px",
                    textAlign: "center",
                    fontSize: 12,
                    color: "#da0000",
                  }}
                >
                  Enter any one from Bill or K Number.
                </div>
              )}
              <FlexRow>
                <FlexDiv>
                  <Space>
                    <BlueButton
                      onClick={handleSubmitkNumber}
                      icon={<CheckCircleFilled />}
                      loading={getWaterBillDetailsState.apiState === "loading"}
                    >
                      Get Bill Details
                    </BlueButton>
                    <Button
                      type="link"
                      onClick={() => {
                        setBillOrKNumber({
                          billNumber: "",
                          kNumber: "",
                        });
                        form2.setFieldsValue({
                          billNumber: "",
                          kNumber: "",
                        });
                      }}
                      icon={<CloseCircleOutlined />}
                    >
                      Reset{" "}
                    </Button>
                  </Space>
                </FlexDiv>
              </FlexRow>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 8,
                }}
              >
                <div>
                  Don't remember K/Bill number?{" "}
                  <Xlink onClick={() => setSectionVisible("second")}>
                    Pay water bill through property number.
                  </Xlink>
                </div>
              </div>
            </Form>
          </div>

          {sectionVisible == "second" && (
            <div
              style={{
                overflow: "hidden",
                transition: "all 200ms ease-in-out",
                transform:
                  sectionVisible === "second" ? "scaleY(1)" : "scaleY(0)",
              }}
            >
              <Form
                form={form}
                layout="vertical"
                hideRequiredMark={true}
                onFinish={onFinish}
              >
                <Row gutter={24}>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <FormItem
                      name="DevelopmentAuthority"
                      label="Select Development Authority"
                      rules={[{ required: true, message: "Required" }]}
                      className="round-select"
                    >
                      <Select
                        name="DevelopmentAuthority"
                        size="large"
                        showSearch
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
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
                      rules={[{ required: true, message: "Required" }]}
                      className="round-select"
                    >
                      <Select
                        name="Location"
                        size="large"
                        showSearch
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
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
                      rules={[{ required: true, message: "Required" }]}
                      className="round-select"
                    >
                      <Select
                        name="Sector"
                        size="large"
                        showSearch
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
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
                      rules={[{ required: true, message: "Required" }]}
                      className="round-select"
                    >
                      <Select
                        name="UsageType"
                        size="large"
                        showSearch
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
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
                      rules={[{ required: true, message: "Required" }]}
                      className="round-select"
                    >
                      <Select
                        name="PropertyType"
                        size="large"
                        showSearch
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
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
                      rules={[{ required: true, message: "Required" }]}
                      className="round-select"
                    >
                      <Select
                        name="PropertyNumber"
                        size="large"
                        showSearch
                        notFoundContent={null}
                        disabled={DisablePropertyNumber}
                        onSearch={handlePropertyNumberSearch}
                        onSelect={handlePropertyNumberSelect}
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                        loading={LoadingPropertyNumber === true}
                      >
                        {PropertyNumberOptions}
                      </Select>
                    </FormItem>
                  </Col>
                </Row>
                <FlexRow>
                  <FlexDiv>
                    <Space>
                      <BlueButton
                        htmlType="submit"
                        icon={<CheckCircleFilled />}
                        loading={loadingSubmit === true}
                      >
                        Get Bill Details
                      </BlueButton>
                      <Button
                        type="link"
                        onClick={resetForm}
                        icon={<CloseCircleOutlined />}
                      >
                        Reset Form
                      </Button>
                    </Space>
                  </FlexDiv>
                </FlexRow>
              </Form>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 8,
                }}
              >
                <div>
                  {" "}
                  <Xlink onClick={() => setSectionVisible("first")}>
                    Pay water bill through Bill/K number.
                  </Xlink>
                </div>
              </div>
            </div>
          )}
          <Divider />
          <ServiceName
            style={{ marginBottom: 10, textDecoration: "underline" }}
          >
            Water Bill Receipt
          </ServiceName>
          <Form form={form3} layout="vertical" onFinish={getOldBill}>
            <Row
              gutter={24}
              style={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                <FormItem
                  name="oldBillNumber"
                  label="Enter Bill Number"
                  rules={[{ required: true, message: "Required" }]}
                >
                  <Input
                    maxLength={20}
                    name="oldBillNumber"
                    onChange={(e) => setOldBillNumber(e.target.value)}
                  />
                </FormItem>
              </Col>
            </Row>
            <BlueButton
              loading={getoldBillDetailState.apiState === "loading"}
              htmlType="submit"
            >
              Get Bill Details
            </BlueButton>
          </Form>
        </div>

        <div
          className="get-upn-from-container"
          style={{
            display: !displayBillDetails ? "none" : "block",
            maxWidth: 800,
          }}
        >
          {getWaterBillDetailsState.apiState === "success" && (
            <div style={{ border: "solid 1px", padding: 10 }}>
              <h1 style={{ textAlign: "center" }}>Water & Sewerage Bill</h1>
              <hr />
              <div style={{ display: "flex" }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ textAlign: "center" }}>Property Details</h3>
                  <table width={"100%"}>
                    <tr>
                      <td>Type</td>
                      <td>:{getWaterBillDetailsState.data.PropertyType}</td>
                    </tr>
                    <tr>
                      <td>Property No</td>
                      <td>:{getWaterBillDetailsState.data.PropertyNo}</td>
                    </tr>
                    <tr>
                      <td>Owner</td>
                      <td>:{getWaterBillDetailsState.data.Owner}</td>
                    </tr>
                    <tr>
                      <td>Mobile No</td>
                      <td>:{getWaterBillDetailsState.data.MobileNo}</td>
                    </tr>
                  </table>
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ textAlign: "center" }}>Bill Details</h3>
                  <table width={"100%"}>
                    <tr>
                      <td>Bill No</td>
                      <td>:{getWaterBillDetailsState.data.BillNo}</td>
                    </tr>
                    <tr>
                      <td>Issue Date</td>
                      <td>:{getWaterBillDetailsState.data.IssueDate}</td>
                    </tr>
                    <tr>
                      <td>Due Date</td>
                      <td>:{getWaterBillDetailsState.data.DueDate}</td>
                    </tr>
                    <tr>
                      <td>Bill Type</td>
                      <td>:{getWaterBillDetailsState.data.BillType}</td>
                    </tr>
                  </table>
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ textAlign: "center" }}>Bill Period</h3>
                  <table width={"100%"}>
                    <tr>
                      <td>No of Days</td>
                      <td>:{getWaterBillDetailsState.data.NoofDays}</td>
                    </tr>
                    <tr>
                      <td>Date From</td>
                      <td>:{getWaterBillDetailsState.data.DateFrom}</td>
                    </tr>
                    <tr>
                      <td>Date To</td>
                      <td>:{getWaterBillDetailsState.data.DateTo}</td>
                    </tr>
                    <tr>
                      <td>K Number</td>
                      <td>:{getWaterBillDetailsState.data.KNumber}</td>
                    </tr>
                  </table>
                </div>
              </div>
              <hr />
              <div style={{ display: "flex" }}>
                <div style={{ flex: 1, paddingRight: 30 }}>
                  <h4 style={{ textAlign: "center" }}>
                    Meter Readings [Status:{" "}
                    {getWaterBillDetailsState.data.ReadingStatus}]
                  </h4>
                  <table width={"100%"}>
                    <tr>
                      <td>Meter Number</td>
                      <td>:{getWaterBillDetailsState.data.MeterNo}</td>
                    </tr>
                    <tr>
                      <td>Current Meter Reading</td>
                      <td>:{getWaterBillDetailsState.data.CurrentReading}</td>
                    </tr>
                    <tr>
                      <td>Previous Meter Reading</td>
                      <td>:{getWaterBillDetailsState.data.PreviousReading}</td>
                    </tr>
                    <tr>
                      <td>Units Consumed</td>
                      <td>:{getWaterBillDetailsState.data.UnitsConsumed}</td>
                    </tr>
                  </table>
                </div>
                <div style={{ flex: 1 }}>
                  <table width={"100%"}>
                    <tr>
                      <td>Water charges</td>
                      <td>:{getWaterBillDetailsState.data.WaterCharges}</td>
                    </tr>
                    <tr>
                      <td>
                        Sewer charges (No. of seats{" "}
                        {getWaterBillDetailsState.data.NoofSeat})
                      </td>
                      <td>:{getWaterBillDetailsState.data.SewerCharges}</td>
                    </tr>
                    <tr>
                      <td>Current bill amount</td>
                      <td>:{getWaterBillDetailsState.data.CurrentBillAmt}</td>
                    </tr>
                    <tr>
                      <td>Outstanding</td>
                      <td>:{getWaterBillDetailsState.data.Outstanding}</td>
                    </tr>
                    <tr>
                      <td>Advance amount</td>
                      <td>:{getWaterBillDetailsState.data.AdvanceAmount}</td>
                    </tr>
                    <tr>
                      <td>Amount payble before due date</td>
                      <td>
                        :{getWaterBillDetailsState.data.AmtPayableBeforeDueDate}
                      </td>
                    </tr>
                    <tr>
                      <td>Surcharge after due date</td>
                      <td>:{getWaterBillDetailsState.data.Surchage}</td>
                    </tr>
                    <tr>
                      <td>Amount payble after due date</td>
                      <td>
                        :{getWaterBillDetailsState.data.AmtPayableAfterDueDate}
                      </td>
                    </tr>
                  </table>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 16,
                }}
              >
                <BlueButton
                  icon={<SendIcon size={12} />}
                  onClick={() =>
                    getWaterPaymentLink(
                      getWaterBillDetailsState.data.DuePaymentModel
                    )
                  }
                >
                  PAY NOW
                </BlueButton>
              </div>
            </div>
          )}
        </div>

        <div
          className="get-upn-from-container"
          style={{ display: !visible ? "none" : "block", maxWidth: 800 }}
        >
          {visible && (
            <>
              <div
                style={{
                  border: "solid 1px #000",
                  margin: "16px 0",
                  padding: "0 16px",
                }}
                id="print-div"
              >
                <h3 style={{ textAlign: "center" }}>
                  Water & Sewerage Payment Receipt
                </h3>
                <hr style={{ margin: "4px 0" }} />
                {/* <h4 style={{ fontWeight: 'bold' }} >{authority.Name}</h4> */}
                {/* <p style={{ fontSize: 12 }}>{authority.OrgAddress}</p> */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 16,
                  }}
                >
                  <div style={{ fontSize: 14 }}>
                    <h4 style={{ fontWeight: "bold" }}>Owner Detail</h4>
                    <table>
                      <tr>
                        <td style={{ fontWeight: "bold" }}>Received From.</td>
                        <td>: {getoldBillDetailState.data.Owner}</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "bold" }}>Scheme.</td>
                        <td>: {getoldBillDetailState.data.SchemeName}</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "bold" }}>Property No.</td>
                        <td>: {getoldBillDetailState.data.PropertyNo}</td>
                      </tr>

                      <tr>
                        <td style={{ fontWeight: "bold" }}>Type</td>
                        <td>: {getoldBillDetailState.data.PropertyType}</td>
                      </tr>
                    </table>
                  </div>
                  <div>
                    <h4 style={{ fontWeight: "bold" }}>Receipt Detail</h4>
                    <table>
                      <tr>
                        <td style={{ fontWeight: "bold" }}>Receipt No :</td>
                        <td style={{ textAlign: "right" }}>
                          {getoldBillDetailState.data.BillId}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "bold" }}>Receipt Date :</td>
                        <td style={{ textAlign: "right" }}>
                          {getoldBillDetailState.data.IssueDate}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "bold" }}>Bill No :</td>
                        <td style={{ textAlign: "right" }}>
                          {getoldBillDetailState.data.BillNo}
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
                <hr style={{ margin: "4px 0" }} />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 16,
                  }}
                >
                  <div>
                    <table>
                      <tr>
                        <td>Paymode</td>
                        <td>: Online</td>
                      </tr>
                    </table>
                  </div>
                  <div>
                    <table>
                      <tr>
                        <td style={{ fontWeight: "bold" }}>
                          Bill Amount to be Received :
                        </td>
                        <td style={{ textAlign: "right" }}>
                          ₹{getoldBillDetailState.data.PayableAmount}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "bold" }}>
                          Amount Received :
                        </td>
                        <td style={{ textAlign: "right" }}>
                          ₹{getoldBillDetailState.data.ReceivedAmount}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "bold" }}>Balance :</td>
                        <td style={{ textAlign: "right" }}>
                          ₹{getoldBillDetailState.data.BalanceAmount}
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
                <div>
                  <p style={{ fontSize: 12, textTransform: "uppercase" }}>
                    <b>Amount in Words :</b>{" "}
                    {price_in_words(getoldBillDetailState.data.PayableAmount)}
                  </p>
                  <p style={{ fontSize: 12, textAlign: "center" }}>
                    Its a computer generated receipt, does not Require
                    Authentication.
                  </p>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button type="primary" onClick={printPage}>
                  Print
                </Button>
              </div>
            </>
          )}
        </div>
      </ScrollBox>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  GetUpnState: state.GetUpn,
  getAuthorityListState: state.getAuthorityList,
  getWaterBillDetailsState: state.getWaterBillDetails,
  getWaterPaymentLinkState: state.getWaterPaymentLink,
  getoldBillDetailState: state.getOldBillDetails,
});

const mapDispatchToProps = (dispatch) => ({
  requestAuthorityList: () => dispatch(requestAuthorityList()),
  requestLocationList: (AuthorityId) =>
    dispatch(requestLocationList(AuthorityId)),
  requestSectorList: (params) => dispatch(requestSectorList(params)),
  requestUsageTypesList: (params) => dispatch(requestUsageTypesList(params)),
  requestPropertyTypeList: (params) =>
    dispatch(requestPropertyTypeList(params)),
  requestPropertyNumberList: (params) =>
    dispatch(requestPropertyNumberList(params)),
  getUpnNumber: (params) => dispatch(getUpnNumber(params)),
  getUpnResetState: () => dispatch(getUpnResetState()),
  getWaterBillDetails: (params) => dispatch(getWaterBillDetails(params)),
  getWaterBillDetailsReset: () => dispatch(getWaterBillDetailsReset()),
  getPaymentIntegrationPayload: (params) =>
    dispatch(getPaymentIntegrationPayload(params)),
  paymentIntegrationStatusCheck: (params) =>
    dispatch(paymentIntegrationStatusCheck(params)),
  getWaterPaymentLink: (params) => dispatch(getWaterPaymentLink(params)),
  getOldBillDetail: (params) => dispatch(getOldBillDetails(params)),
  getOldBillDetailsResetState: () => dispatch(getOldBillDetailsResetState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PayWaterBill);
