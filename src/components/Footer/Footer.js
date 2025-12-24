import React from "react";
import {
  CheckOutlined,
  UndoOutlined,
  MobileOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";

// components
import { Container } from "./FooterStyle";
import { getOrgId } from "../../utils";
import { Col, Row, Tooltip } from "antd";

const Footer = (props) => {
  const OrgId = getOrgId();
  const { getAuthorityListState } = props;
  return (
    <Container>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <p
            style={{
              borderBottom: "solid 1px #70707036",
              fontFamily: "iic-fonts-bold",
              marginBottom: 0,
              fontSize: 18,
              paddingBottom: 12,
            }}
          >
            CONTACT US
          </p>
        </Col>
        {getAuthorityListState.apiState === "success" &&
          getAuthorityListState.list.map((item) =>
            OrgId === "2" ? (
              <>
                <Col span={12}>
                  <p
                    style={{
                      fontFamily: "iic-fonts-bold",
                      marginBottom: 0,
                      fontSize: 14,
                    }}
                  >
                    <Tooltip title={item.Name} placement="right">
                      <span
                        style={{
                          fontFamily: "iic-fonts-bold",
                          marginBottom: 0,
                          fontSize: 14,
                        }}
                      >
                        {item.AliasName}
                      </span>
                    </Tooltip>
                  </p>
                  <p style={{ fontSize: 16 }}>
                    {item.OrgAddress}
                    {item.ContactNumber && (
                      <>
                        <br />
                        <MobileOutlined /> {item.ContactNumber}
                      </>
                    )}
                    {item.EmailAddress && (
                      <>
                        <br />
                        <MailOutlined /> {item.EmailAddress}
                      </>
                    )}
                  </p>
                </Col>
              </>
            ) : (
              <>
                {(item.Id === 2 || item.Id === Number(OrgId)) && (
                  <Col span={12}>
                    <p
                      style={{
                        fontFamily: "iic-fonts-bold",
                        marginBottom: 0,
                        fontSize: 14,
                      }}
                    >
                      <Tooltip title={item.Name} placement="right">
                        <span
                          style={{
                            fontFamily: "iic-fonts-bold",
                            marginBottom: 0,
                            fontSize: 14,
                          }}
                        >
                          {item.AliasName}
                        </span>
                      </Tooltip>
                    </p>
                    <p style={{ fontSize: 16 }}>
                      {item.OrgAddress}
                      {item.ContactNumber && (
                        <>
                          <br />
                          <MobileOutlined /> {item.ContactNumber}
                        </>
                      )}
                      {item.EmailAddress && (
                        <>
                          <br />
                          <MailOutlined /> {item.EmailAddress}
                        </>
                      )}
                    </p>
                  </Col>
                )}
              </>
            )
          )}
        <Col span={24}>
          <p
            style={{
              borderTop: "solid 1px #70707036",
              fontSize: 14,
              paddingTop: 12,
            }}
          >
            Copyright © 2021- All Rights Reserved Official Website Of Punjab
            Urban Planning & Development Authority, Punjab
          </p>
        </Col>
      </Row>
    </Container>
  );
};
const mapStateToProps = (state) => ({
  getAuthorityListState: state.getAuthorityList,
});
export default connect(mapStateToProps, null)(Footer);
