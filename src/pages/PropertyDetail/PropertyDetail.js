import React, { useState, useEffect } from "react";
import { Link, Redirect, useLocation } from "react-router-dom";
import { connect } from "react-redux";

import AdminSubHeader from "../../components/AdminSubHeader/AdminSubHeader";
import { XTabs, FlexDiv } from "../../components/Xcomponents";
import {
  ArchiveIcon,
  PermissionIcon,
  MoneyIcon,
  RightIcon,
  BackIcon,
  FolderIcon,
} from "../../components/CustomIcons";

import { Container, PropertyDetailTitle } from "./PropertyDetailStyle";

import Basic from "./Basic/Basic";
import Permissions from "./Permissions/Permissions";
import Payments from "./Payments/Payments";
import AllApplications from "./AllApplications/AllApplications";
import Documents from "./Documents/Documents";

import { getOrgId } from "../../utils";
import {
  LeftSection,
  RightSection,
  ServiceBar,
  ServiceName,
} from "../ServiceDetailPage/ServiceDetailPageStyle";
import { Space } from "antd";
import Ledger from "./Ledger/Ledger";
import PropertyFile from "./PropertyFile/PropertyFile";

const PropertyDetail = (props) => {
  const { getPropertyBasicDetailState, verifyUpnAndMobileSubmitOtpState } =
    props;
  const OrgId = getOrgId();
  const [refreshRedirect, setRefreshRedirect] = useState(false);
  let query = new URLSearchParams(useLocation().search);
  let uniqueKey = query.get("uniqueKey");
  let AuthTokenKey = query.get("AuthTokenKey");
  let AuthToken = query.get("AuthToken");
  let activeTabStr = "Details";
  if (uniqueKey) {
    activeTabStr = "Payments";
    verifyUpnAndMobileSubmitOtpState.AuthToken = decodeURIComponent(AuthToken);
    verifyUpnAndMobileSubmitOtpState.AuthTokenKey =
      decodeURIComponent(AuthTokenKey);
  }
  useEffect(() => {
    window.scrollTo(0, 2);
  }, []);
  useEffect(() => {
    if (verifyUpnAndMobileSubmitOtpState.AuthToken === null) {
      setRefreshRedirect(true);
    }
    window.onbeforeunload = () => {
      return true;
    };
    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  const [activeTab, setActiveTab] = useState(activeTabStr);

  return (
    <>
      <Container>
        {refreshRedirect && <Redirect to="/" />}
        <ServiceBar>
          <LeftSection>
            <Link to="/">
              <BackIcon style={{ marginTop: 5 }} />
            </Link>
          </LeftSection>
          <RightSection>
            <ServiceBar>
              <Space>
                <ServiceName>Property Details</ServiceName>
                <PropertyDetailTitle>
                  {getPropertyBasicDetailState.uiState === "ideal"
                    ? getPropertyBasicDetailState.data.PropertyHeader
                    : null}
                </PropertyDetailTitle>
              </Space>
            </ServiceBar>
          </RightSection>
        </ServiceBar>
        <AdminSubHeader>
          <XTabs
            defaultActiveKey={activeTab}
            onChange={(key) => setActiveTab(key)}
          >
            <XTabs.TabPane
              key="Details"
              tab={
                <FlexDiv>
                  <ArchiveIcon size="14" />
                  Details
                </FlexDiv>
              }
            />
            <XTabs.TabPane
              key="Permissions"
              tab={
                <FlexDiv>
                  <PermissionIcon size="16" />
                  Permissions
                </FlexDiv>
              }
            />
            {/* <XTabs.TabPane key="Property Ledger" tab={<FlexDiv><FolderIcon size="20" />Property Ledger</FlexDiv>} /> */}
            <XTabs.TabPane
              key="Payments"
              tab={
                <FlexDiv>
                  <MoneyIcon size="20" />
                  Payments
                </FlexDiv>
              }
            />
            {/* <XTabs.TabPane key="AllApplications" tab={<FlexDiv><RightIcon size="17" />All Applications</FlexDiv>} /> */}
            <XTabs.TabPane
              key="Documents"
              tab={
                <FlexDiv>
                  <FolderIcon size="20" />
                  Documents
                </FlexDiv>
              }
            />

            {/* This comment updated on 30dec to hide property file */}
            {/* <XTabs.TabPane
              key="PropertyFile"
              tab={
                <FlexDiv>
                  <ArchiveIcon size="14" />
                  Property File
                </FlexDiv>
              }
            /> */}
          </XTabs>
        </AdminSubHeader>
        {(() => {
          switch (activeTab) {
            case "Details":
              return (
                <Basic
                  id={props.match.params.id}
                  org={OrgId}
                  AuthToken={verifyUpnAndMobileSubmitOtpState.AuthToken}
                  AuthTokenKey={verifyUpnAndMobileSubmitOtpState.AuthTokenKey}
                />
              );

            case "Permissions":
              return (
                <Permissions
                  id={props.match.params.id}
                  org={OrgId}
                  AuthToken={verifyUpnAndMobileSubmitOtpState.AuthToken}
                  AuthTokenKey={verifyUpnAndMobileSubmitOtpState.AuthTokenKey}
                />
              );

            case "Payments":
              return (
                <Payments
                  id={props.match.params.id}
                  org={OrgId}
                  AuthToken={verifyUpnAndMobileSubmitOtpState.AuthToken}
                  AuthTokenKey={verifyUpnAndMobileSubmitOtpState.AuthTokenKey}
                />
              );

            // case 'Property Ledger':
            //     return <Ledger id={props.match.params.id} SchemeId={verifyUpnAndMobileSubmitOtpState.SchemeId} org={OrgId} AuthToken={verifyUpnAndMobileSubmitOtpState.AuthToken} AuthTokenKey={verifyUpnAndMobileSubmitOtpState.AuthTokenKey} />

            case "Documents":
              return (
                <Documents
                  id={props.match.params.id}
                  org={OrgId}
                  AuthToken={verifyUpnAndMobileSubmitOtpState.AuthToken}
                  AuthTokenKey={verifyUpnAndMobileSubmitOtpState.AuthTokenKey}
                />
              );

            // default:
            //     return <AllApplications id={props.match.params.id} org={OrgId} AuthToken={verifyUpnAndMobileSubmitOtpState.AuthToken} AuthTokenKey={verifyUpnAndMobileSubmitOtpState.AuthTokenKey} />

            // This comment updated on 30dec to hide property file
            // case "PropertyFile":
            //   return (
            //     <PropertyFile
            //       id={props.match.params.id}
            //       org={OrgId}
            //       AuthToken={verifyUpnAndMobileSubmitOtpState.AuthToken}
            //       AuthTokenKey={verifyUpnAndMobileSubmitOtpState.AuthTokenKey}
            //     />
            //   );
          }
        })()}
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  getPropertyBasicDetailState: state.getPropertyBasicDetail,
  verifyUpnAndMobileSubmitOtpState: state.verifyUpnAndMobileSubmitOtp,
});

export default connect(mapStateToProps, null)(PropertyDetail);
