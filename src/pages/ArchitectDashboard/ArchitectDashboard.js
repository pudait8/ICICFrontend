import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { EyeOutlined, DownOutlined } from "@ant-design/icons";
import {
  Skeleton,
  Space,
  Col,
  Row,
  Button,
  Select,
  Divider,
  Dropdown,
  Menu,
} from "antd";
import { Link, Redirect } from "react-router-dom";
import _ from "lodash";

// components
import {
  Container,
  DetailContainer,
  Name,
  ArchitectDetail,
  ArchitectDetailKey,
  ArchitectDetailValue,
  ArchitectDetailKeyMemo,
  ApplicationDetails,
  ApplicationDetailWidget,
  WidgetValue,
  WidgetText,
  SearchInput,
  BlankSpace,
} from "./ArchitectDashboardStyle";
import { ZoomGlassIcon } from "../../components/CustomIcons";
import {
  BlueButton,
  PrimaryButton,
  Xtable,
} from "../../components/Xcomponents";

// actions
import {
  getArchitectDashboard,
  getArchitectDashboardResetState,
} from "../../actions/getArchitectDashboardAction";
//Others
import { getOrgId, getArchitectToken } from "../../utils";

const ArchitectLogin = (props) => {
  // variables
  const {
    getArchitectDashboard,
    getArchitectDashboardState,
    getArchitectDashboardResetState,
  } = props;
  const [tableData, setTableData] = useState([]);
  const [redirect, setRedirect] = useState([false, ""]);
  const columns = [
    {
      title: "",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Application ID",
      dataIndex: "application_id",
      key: "application_id",
    },
    {
      title: "Property",
      dataIndex: "property",
      key: "property",
      render: (property) => (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <div>{property.UPN}</div>
          <div>{property.PropertyNo}</div>
        </div>
      ),
    },
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
    },
    {
      title: "Submitted On",
      dataIndex: "submitted_on",
      key: "submitted_on",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      dataIndex: "application_id",
      key: "action",
      render: (application_id) => (
        <Space size="small">
          <Link to={`/ndc-details/${application_id}`}>
            <Button size="small" shape="circle" icon={<EyeOutlined />} />
          </Link>
        </Space>
      ),
    },
  ];
  const architect = getArchitectToken();
  let puda_architect_service_id_logged_in = localStorage.getItem(
    "puda_architect_service_id_logged_in"
  );

  // callbacks
  useEffect(() => {
    getArchitectDashboard({ OrgId: getOrgId() });
    return () => {
      getArchitectDashboardResetState();
    };
  }, []);
  useEffect(() => {
    window.scrollTo(0, 2);
    if (getArchitectDashboardState.apiState === "success") {
      let tableData = [];

      getArchitectDashboardState.data.ApplicationDetails.map((data, index) => {
        tableData.push({
          key: ++index,
          application_id: data.ApplicationId,
          property: { UPN: data.UPN, PropertyNo: data.PropertyNo },
          owner: data.OwnerName,
          submitted_on: data.ApplDate,
          status: data.Status,
        });
      });

      setTableData(tableData);
    } else if (
      getArchitectDashboardState.apiState === "alert" ||
      getArchitectDashboardState.apiState === "error"
    ) {
      localStorage.removeItem("PudaArchitectToken");
      localStorage.removeItem("PudaArchitectTokenKey");
      localStorage.removeItem("PudaEnterprenurId");
      setRedirect([true, "/architect-login/27"]);
    }
  }, [getArchitectDashboardState]);
  useEffect(() => {
    window.onbeforeunload = () => {
      return true;
    };
    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  useEffect(() => {}, []);

  // functions
  const goToDetail = (application_id) => {
    //?uniqueKey=456g5453&ArchitectToken=${architect.ArchitectToken}&ArchitectTokenKey=${architect.ArchitectTokenKey}&architect=true`
    setRedirect([true, `/ndc-details/${application_id}`]);
  };

  // const handleMenuClick = (e) => {
  //     if (verifyUpnAndMobileSubmitOtpState.apiState !== "success") {
  //         setSecurityCheck({ ...securityCheck, ['open']: true, ['type']: e.key })
  //     }
  // }
  const menu = (
    <Menu>
      <Menu.Item>
        <Link to="service-details/1731">
          Approval of Building Plan above 4000 sq mtrs
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="service-details/1729">
          Approval of Building Plan up to 500 sq mtrs
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/building-details-private-properties/951">
          Approval of Building plan for Private Properties
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="service-details/1730">
          Approval of Building Plan Above 500 sq mtrs and up to 4000 sq mtrs
        </Link>
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      {redirect[0] && <Redirect to={redirect[1]} />}
      <Container>
        <>
          {getArchitectDashboardState.apiState === "success" && (
            <DetailContainer>
              <>
                <Row>
                  {/* <Col span={4}>
                                        <img style={{ width: 150, height: 160, borderRadius: 8 }} src="https://cdn.thelivemirror.com/wp-content/uploads/2020/01/Ashish-Chanchlani-Controversial-Statements.jpg"></img>
                                    </Col> */}
                  <Col span={24}>
                    <Row>
                      <Col span={10}>
                        <Name>
                          {
                            getArchitectDashboardState.data.EnterprenurDetails
                              .Name
                          }
                        </Name>
                      </Col>
                      <Col span={14}></Col>
                    </Row>
                    <Row>
                      <Col span={10}>
                        <ArchitectDetail>
                          <ArchitectDetailKey>PAN</ArchitectDetailKey>{" "}
                          <ArchitectDetailValue>
                            :{" "}
                            {
                              getArchitectDashboardState.data.EnterprenurDetails
                                .PAN
                            }
                          </ArchitectDetailValue>
                        </ArchitectDetail>
                        <ArchitectDetail>
                          <ArchitectDetailKey>DOB</ArchitectDetailKey>{" "}
                          <ArchitectDetailValue>
                            :{" "}
                            {
                              getArchitectDashboardState.data.EnterprenurDetails
                                .DOB
                            }
                          </ArchitectDetailValue>
                        </ArchitectDetail>
                        <ArchitectDetail>
                          <ArchitectDetailKey>Mob.</ArchitectDetailKey>{" "}
                          <ArchitectDetailValue>
                            :{" "}
                            {
                              getArchitectDashboardState.data.EnterprenurDetails
                                .Mobile
                            }
                          </ArchitectDetailValue>
                        </ArchitectDetail>
                        <ArchitectDetail>
                          <ArchitectDetailKey>Email</ArchitectDetailKey>{" "}
                          <ArchitectDetailValue>
                            :{" "}
                            {
                              getArchitectDashboardState.data.EnterprenurDetails
                                .Email
                            }
                          </ArchitectDetailValue>
                        </ArchitectDetail>
                      </Col>
                      <Col span={14}>
                        <ArchitectDetail>
                          <ArchitectDetailKeyMemo>
                            Memo/Reg. No.
                          </ArchitectDetailKeyMemo>{" "}
                          <ArchitectDetailValue>
                            :{" "}
                            {
                              getArchitectDashboardState.data.EnterprenurDetails
                                .RegistrationNo
                            }
                          </ArchitectDetailValue>
                        </ArchitectDetail>
                        <ArchitectDetail>
                          <ArchitectDetailKeyMemo>
                            Validity
                          </ArchitectDetailKeyMemo>{" "}
                          <ArchitectDetailValue>
                            {" "}
                            :{" "}
                            {
                              getArchitectDashboardState.data.EnterprenurDetails
                                .Validity
                            }
                          </ArchitectDetailValue>
                        </ArchitectDetail>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                {/* <BlankSpace />
                                <Row>
                                    <Col span={4}>
                                    </Col>
                                    <Col span={20}>
                                        <Space>
                                            <PrimaryButton type="primary"  >VIEW COMPLETE PROFILE DET   AILS</PrimaryButton>
                                            <PrimaryButton type="primary"  >CHANGE COMMUNICATION DETAILS</PrimaryButton>
                                            <PrimaryButton type="primary"  >RENEW CERTIFICATE</PrimaryButton>
                                        </Space>
                                    </Col>
                                </Row> */}
              </>
              <Divider style={{ borderWidth: 2 }} />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Name>Applications Details</Name>
                <div style={{}}>
                  <Dropdown overlay={menu}>
                    <BlueButton>
                      Select Building Plan
                      <DownOutlined />
                    </BlueButton>
                  </Dropdown>
                  {/* <Link to={`/building-details-private-properties/${puda_architect_service_id_logged_in}`}>
                                        <BlueButton>APPLY NEW BUILDING PLAN APPROVAL OF PRIVATE PROPERTIES</BlueButton>
                                    </Link>
                                    <BlankSpace />
                                    <Link to={`/service-details/${puda_architect_service_id_logged_in}`}>
                                        <BlueButton>APPLY NEW BUILDING PLAN APPROVAL APPLICATION</BlueButton>
                                    </Link> */}
                </div>
              </div>
              <BlankSpace />
              <ApplicationDetails>
                <ApplicationDetailWidget border={true}>
                  <WidgetValue>
                    {getArchitectDashboardState.data.TotalApplCount}
                  </WidgetValue>
                  <WidgetText>TOTAL APPLICATIONS</WidgetText>
                </ApplicationDetailWidget>
                <ApplicationDetailWidget border={true}>
                  <WidgetValue>
                    {getArchitectDashboardState.data.PendingPaymentApplCount}
                  </WidgetValue>
                  <WidgetText>PENDING PAYMENT</WidgetText>
                </ApplicationDetailWidget>
                <ApplicationDetailWidget border={true}>
                  <WidgetValue>
                    {getArchitectDashboardState.data.PendingApplCount}
                  </WidgetValue>
                  <WidgetText>PENDING APPLICATIONS</WidgetText>
                </ApplicationDetailWidget>
                <ApplicationDetailWidget border={true}>
                  <WidgetValue>
                    {getArchitectDashboardState.data.RejectedApplCount}
                  </WidgetValue>
                  <WidgetText>REJECTED APPLICATIONS</WidgetText>
                </ApplicationDetailWidget>
                <ApplicationDetailWidget border={false}>
                  <WidgetValue>
                    {getArchitectDashboardState.data.DisposedApplCount}
                  </WidgetValue>
                  <WidgetText>DISPOSED APPLICATIONS</WidgetText>
                </ApplicationDetailWidget>
              </ApplicationDetails>
              {/* <BlankSpace /> */}
              {/* <div>

                                <Row >
                                    <Col span={8} style={{ marginRight: 16 }}>
                                        <SearchInput
                                            placeholder="Search Application"
                                            suffix={<ZoomGlassIcon size="18" />}
                                            size="large"
                                            onSearch={_.debounce(function (v) {

                                            }, 500)}
                                        />
                                    </Col>
                                    <Col span={6} style={{ marginRight: 16 }}>
                                        <Select
                                            name="authority"
                                            size="large"
                                            placeholder="Filter by Authority"
                                            style={{ width: '100%' }}
                                            optionFilterProp="children"
                                            allowClear
                                            // onChange={(v) => handleSelectChange("hospital", v)}
                                            showSearch
                                            filterOption={false}
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                        </Select>
                                    </Col>
                                    <Col span={6}>
                                        <Select
                                            name="status"
                                            size="large"
                                            placeholder="Filter by Status"
                                            style={{ width: '100%' }}
                                            optionFilterProp="children"
                                            allowClear
                                            // onChange={(v) => handleSelectChange("hospital", v)}
                                            showSearch
                                            filterOption={false}
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                        </Select>
                                    </Col>
                                </Row>

                            </div> */}
              <BlankSpace />
              <Xtable
                columns={columns}
                dataSource={tableData}
                pagination={false}
                scroll={{ x: 768 }}
              />
            </DetailContainer>
          )}
        </>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  getArchitectDashboardState: state.getArchitectDashboard,
});
const mapDispatchToProps = (dispatch) => ({
  getArchitectDashboard: (params) => dispatch(getArchitectDashboard(params)),
  getArchitectDashboardResetState: () =>
    dispatch(getArchitectDashboardResetState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ArchitectLogin);
