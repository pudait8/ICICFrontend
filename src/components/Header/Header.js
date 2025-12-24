import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Button, Space, Tooltip } from "antd";
import { connect } from "react-redux";
import { Steps, Hints } from "intro.js-react";
import "intro.js/introjs.css";
import { ArrowRightOutlined } from "@ant-design/icons";

// components
import { Xtabs } from "../Xcomponents";
import {
  Container,
  SubContainer,
  TopBar,
  TopBarLeft,
  TopBarRight,
  MenuItem,
  TabContainer,
  LogoutButton,
  Heading,
  TopBarLeftHeader,
  SocialIcon,
} from "./HeaderStyle";

// actions
import { getAuthorityList } from "../../actions/getAuthorityListAction";
import { logout } from "../../actions/logoutAction";
import { loginResetLoggedIn } from "../../actions/loginAction";

// others
import {
  getOrgId,
  setOrgId,
  getIsIntroDisplayed,
  setIsIntroDisplayed,
  getTollFree,
  setTollFree,
} from "../../utils";
import _ from "lodash";
import { Facebook, Instagram, Twitter, Youtube } from "../CustomIcons";

const Header = (props) => {
  // variables
  const {
    getAuthorityList,
    getAuthorityListState,
    loginState,
    logout,
    loginResetLoggedIn,
    logoutState,
  } = props;
  const OrgId = getOrgId();
  const isIntroDisplayed = getIsIntroDisplayed();
  const [activeKey, setActiveKey] = useState("CitizenServices");
  const [redirect, setRedirect] = useState([false, ""]);
  const [introEnabled, setIntroEnabled] = useState(false);
  const [moreDetailLink, setMoreDetailLink] = useState("");
  const [renderTollFree, setRenderTollFree] = useState(0);

  const steps = [
    {
      element: ".authorityMenu",
      intro: "You may change the authority from this section.",
    },
  ];

  const operations = OrgId ? (
    <Link
      className="ant-tabs-tab-btn"
      to={{ pathname: moreDetailLink }}
      target="_blank"
    >
      More Details
    </Link>
  ) : (
    <Link className="ant-tabs-tab-btn">More Details</Link>
  );

  // callbacks
  useEffect(() => {
    getAuthorityList();
  }, []);

  useEffect(() => {
    if (getAuthorityListState.apiState === "success") {
      // if (!isIntroDisplayed && OrgId) {
      //     setIntroEnabled(true)
      // }
      // if (!OrgId) {
      //     if (getAuthorityListState.list[0] && getAuthorityListState.list[0].Id) {
      //         // setOrgId(getAuthorityListState.list[0].Id)
      //         setRedirect([true, "/"])
      //     }
      // }
      if (OrgId) {
        let data = _.find(getAuthorityListState.list, { Id: Number(OrgId) });
        setTollFree(data.TollFreeNo);
        setMoreDetailLink(data.URL);
        setRenderTollFree(renderTollFree + 1);
      }
    }
  }, [getAuthorityListState]);

  useEffect(() => {
    var timeoutEvent;
    document.addEventListener("scroll", () => {
      clearTimeout(timeoutEvent);
      timeoutEvent = setTimeout(handleDocumentScroll, 10);
    });
  });

  useEffect(() => {
    if (logoutState.apiState === "success") {
      loginResetLoggedIn();
      setRedirect([true, "/"]);
    }
  }, [logoutState]);

  //  functions
  const handleDocumentScroll = () => {
    var CitizenServicesTarget = document.querySelector("#CitizenServices");
    var PropertyDetailsTarget = document.querySelector("#PropertyDetails");
    var NewSchemesTarget = document.querySelector("#NewSchemes");
    var LawsTarget = document.querySelector("#Laws");
    var TenderTarget = document.querySelector("#Tender");
    let key = "CitizenServices";
    let breakPoint = window.innerHeight / 2;
    if (
      CitizenServicesTarget &&
      CitizenServicesTarget.getBoundingClientRect().top < breakPoint
    ) {
      key = "CitizenServices";
    }
    if (
      PropertyDetailsTarget &&
      PropertyDetailsTarget.getBoundingClientRect().top < breakPoint
    ) {
      key = "PropertyDetails";
    }
    if (
      NewSchemesTarget &&
      NewSchemesTarget.getBoundingClientRect().top < breakPoint
    ) {
      key = "NewSchemes";
    }
    if (LawsTarget && LawsTarget.getBoundingClientRect().top < breakPoint) {
      key = "Laws";
    }
    if (TenderTarget && TenderTarget.getBoundingClientRect().top < breakPoint) {
      key = "Tender";
    }

    setActiveKey(key);
  };

  const handleTabChange = (key) => {
    if (key === "faq") {
      setRedirect([true, "/faq"]);
    }
    if (key === "moredetails") {
      setRedirect([true, "https://ant.design/components/tabs/"]);
    }
    var CitizenServicesTarget = document.querySelector("#CitizenServices");
    var PropertyDetailsTarget = document.querySelector("#PropertyDetails");
    var NewSchemesTarget = document.querySelector("#NewSchemes");
    var LawsTarget = document.querySelector("#Laws");
    var TenderTarget = document.querySelector("#Tender");
    var MasterPlanTarget = document.querySelector("#MasterPlan");

    if (key === "CitizenServices" && CitizenServicesTarget) {
      CitizenServicesTarget.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
    if (key === "PropertyDetails" && PropertyDetailsTarget) {
      PropertyDetailsTarget.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
    if (key === "NewSchemes" && NewSchemesTarget) {
      NewSchemesTarget.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
    if (key === "Laws" && LawsTarget) {
      LawsTarget.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
    if (key === "Tender" && TenderTarget) {
      TenderTarget.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
    if (key === "MasterPlan" && MasterPlanTarget) {
      MasterPlanTarget.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
    // setActiveKey(key)
  };

  return (
    <>
      {redirect[0] && <Redirect to={redirect[1]} />}
      <Container>
        <SubContainer>
          {/* <Steps
                        enabled={introEnabled}
                        steps={steps}
                        initialStep={0}
                        onExit={() => {
                            setIsIntroDisplayed()
                            setIntroEnabled(false)
                        }}
                    /> */}
          <TopBar>
            <TopBarLeftHeader>
              {renderTollFree && (
                <>
                  <SocialIcon>
                    <Link
                      to={{
                        pathname: "https://www.facebook.com/HUDPunjab/",
                      }}
                      target="_blank"
                    >
                      <Facebook />
                    </Link>
                    <Link
                      to={{
                        pathname: "https://www.instagram.com/HUDPunjab/",
                      }}
                      target="_blank"
                    >
                      <Instagram />
                    </Link>
                    <Link
                      to={{
                        pathname: "https://twitter.com/HUDPunjab/",
                      }}
                      target="_blank"
                    >
                      <Twitter />
                    </Link>
                    <Link
                      to={{
                        pathname: "https://www.youtube.com/@HUDPunjab",
                      }}
                      target="_blank"
                    >
                      <Youtube />
                    </Link>
                  </SocialIcon>
                  <a href={`tel:${getTollFree()}`}>
                    {getTollFree() ? `Toll Free ${getTollFree()}` : ""}
                  </a>
                </>
              )}
            </TopBarLeftHeader>
          </TopBar>
          <TopBar>
            <TopBarLeft>
              <Link
                to="/"
                style={{
                  display: "flex",
                  alignItems: "center",
                  pointerEvents: OrgId ? "auto" : "none",
                }}
              >
                <img
                  src="/images/puda-logo.png"
                  alt=""
                  style={{ width: 60, height: "auto" }}
                />
                <div
                  style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}
                >
                  <span>{"Punjab Urban Planning"} </span>
                  <br />
                  <span>{"& Development Authority"}</span>
                </div>
              </Link>
            </TopBarLeft>
            <TopBarRight>
              {getAuthorityListState.apiState === "success" && (
                <div className="authorityMenu">
                  <Space size="large">
                    {OrgId ? null : (
                      <Heading>
                        Select Authority To Continue <ArrowRightOutlined />{" "}
                      </Heading>
                    )}
                    {getAuthorityListState.list.map((item) => (
                      <Tooltip title={item.Name} placement="bottom">
                        <Link
                          to={`/set-org-id/${item.Id}${window.location.search}`}
                        >
                          <MenuItem
                            key={item.Id}
                            active={OrgId == item.Id ? true : false}
                          >
                            {item.AliasName}
                          </MenuItem>
                        </Link>
                      </Tooltip>
                    ))}
                  </Space>
                </div>
              )}
            </TopBarRight>
          </TopBar>
          <TabContainer>
            <Xtabs
              activeKey={activeKey}
              centered
              onChange={handleTabChange}
              tabBarExtraContent={operations}
            >
              <Xtabs.TabPane tab="Citizen Services" key="CitizenServices" />
              <Xtabs.TabPane
                tab="Your Property Details"
                key="PropertyDetails"
              />
              <Xtabs.TabPane tab="New Schemes" key="NewSchemes" />
              <Xtabs.TabPane tab={"Rules Acts & Notifications"} key="Laws" />
              <Xtabs.TabPane tab="Tender Notices" key="Tender" />
              <Xtabs.TabPane tab="Master Plan" key="MasterPlan" />
              <Xtabs.TabPane tab="FAQ" key={OrgId ? "faq" : ""} />
            </Xtabs>
          </TabContainer>
        </SubContainer>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  getAuthorityListState: state.getAuthorityList,
  loginState: state.login,
  logoutState: state.logout,
});
const mapDispatchToProps = (dispatch) => ({
  getAuthorityList: (params) => dispatch(getAuthorityList(params)),
  logout: () => dispatch(logout()),
  loginResetLoggedIn: () => dispatch(loginResetLoggedIn()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
