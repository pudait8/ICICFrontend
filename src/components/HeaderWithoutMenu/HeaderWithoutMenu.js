import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Button, Space, Tooltip } from "antd";
import { connect } from "react-redux";
import { Steps, Hints } from "intro.js-react";
import "intro.js/introjs.css";
import _ from "lodash";

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
  TopBarLeftHeader,
  SocialIcon,
} from "./HeaderStyle";

// actions
import { getAuthorityList } from "../../actions/getAuthorityListAction";

// others
import {
  getOrgId,
  setOrgId,
  getIsIntroDisplayed,
  setIsIntroDisplayed,
  getTollFree,
  setTollFree,
} from "../../utils";
import { Facebook, Instagram, Twitter, Youtube } from "../CustomIcons";

const HeaderWithoutMenu = (props) => {
  // variables
  const { getAuthorityList, getAuthorityListState } = props;
  const OrgId = getOrgId();
  const isIntroDisplayed = getIsIntroDisplayed();
  const [activeKey, setActiveKey] = useState("CitizenServices");
  const [redirect, setRedirect] = useState([false, ""]);
  const [introEnabled, setIntroEnabled] = useState(false);
  const [renderTollFree, setRenderTollFree] = useState(0);
  const steps = [
    {
      element: ".authorityMenu",
      intro: "You may change the authority from this section.",
    },
  ];

  // callbacks
  useEffect(() => {
    getAuthorityList();
  }, []);

  useEffect(() => {
    if (getAuthorityListState.apiState === "success") {
      if (!isIntroDisplayed && OrgId) {
        setIntroEnabled(true);
      }
      if (!OrgId) {
        if (getAuthorityListState.list[0] && getAuthorityListState.list[0].Id) {
          // setOrgId(getAuthorityListState.list[0].Id)
          // console.log('hello', `/?next=${encodeURIComponent(window.location)}`)
          setRedirect([true, `/?next=${encodeURIComponent(window.location)}`]);
        }
      }
      if (OrgId) {
        let data = _.find(getAuthorityListState.list, { Id: Number(OrgId) });
        setTollFree(data.TollFreeNo);
        setRenderTollFree(renderTollFree + 1);
      }
    }
  }, [getAuthorityListState]);

  //  functions

  return (
    <>
      {redirect[0] && <Redirect to={redirect[1]} />}
      <Container>
        <SubContainer>
          <Steps
            enabled={introEnabled}
            steps={steps}
            initialStep={0}
            onExit={() => {
              setIsIntroDisplayed();
              setIntroEnabled(false);
            }}
          />
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
              <Link to="/" style={{ display: "flex", alignItems: "center" }}>
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
                    {getAuthorityListState.list.map((item) => (
                      <Tooltip title={item.Name} placement="bottom">
                        <Link to={`/set-org-id/${item.Id}`}>
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
        </SubContainer>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  getAuthorityListState: state.getAuthorityList,
});
const mapDispatchToProps = (dispatch) => ({
  getAuthorityList: (params) => dispatch(getAuthorityList(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderWithoutMenu);
