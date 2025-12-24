import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Skeleton, Tooltip } from "antd";
import { CaretRightOutlined, CheckCircleTwoTone } from "@ant-design/icons";

import { Container } from "./BasicStyle";
import { getPropertyBasicDetail } from "../../../actions/getPropertyBasicDetailAction";
import LabelView from "./LabelView/LabelView";
import {
  Xcollapse,
  Xgrid,
  XgridCard,
  Xtable,
  FlexDiv,
} from "../../../components/Xcomponents";
import ScrollBox from "../../../components/ScrollBox";

const Basic = (props) => {
  const { getPropertyBasicDetailState, getPropertyBasicDetail } = props;

  useEffect(() => {
    getPropertyBasicDetail({
      PropertyId: props.id,
      OrgId: props.org,
      AuthToken: props.AuthToken,
      AuthTokenKey: props.AuthTokenKey,
    });
  }, []);

  const columns = [
    {
      title: "",
      dataIndex: "IsLinked",
      render: (item) =>
        item.IsLinked > 0 ? (
          <Tooltip title="Property linked">
            <CheckCircleTwoTone
              twoToneColor="#32bea7"
              style={{ fontSize: "16px" }}
            />
          </Tooltip>
        ) : null,
    },
    {
      title: "Name",
      dataIndex: "Name",
      render: (item) => (
        <span>
          {item.Salutation} {item.Name}
        </span>
      ),
      width: 200,
    },
    {
      title: "Father/Husband Name",
      dataIndex: "FatherName",
    },
    {
      title: "Address",
      dataIndex: "Address",
    },
    {
      title: "Email",
      dataIndex: "Email",
    },
    {
      title: "Mobile",
      dataIndex: "Mobile",
    },
  ];
  // { `${purchaser.SalutationId === 88 ? 'Husband Name' : 'Father Name'}` }
  const dataSource = getPropertyBasicDetailState.CurrentOwners.map((item) => {
    return {
      IsLinked: { IsLinked: item.LinkId },
      Name: { Name: item.Name, Salutation: item.Salutation },
      FatherName: item.FatherName,
      Address: item.Address,
      Email: item.EmailAddress,
      Mobile: item.MobileNumber,
    };
  });

  const columns2 = [
    {
      title: "Name",
      dataIndex: "Name",
      render: (item) => (
        <span>
          {item.Salutation} {item.Name}
        </span>
      ),
      width: 200,
    },
    {
      title: "Father/Husband Name",
      dataIndex: "FatherName",
    },
    {
      title: "Address",
      dataIndex: "Address",
    },
    {
      title: "Email",
      dataIndex: "Email",
    },
    {
      title: "Mobile",
      dataIndex: "Mobile",
    },
  ];

  const dataSource2 = getPropertyBasicDetailState.FirstAllottees.map((item) => {
    return {
      Name: { Name: item.Name, Salutation: item.Salutation },
      FatherName: item.FatherName,
      Address: item.Address,
      Email: item.EmailAddress,
      Mobile: item.MobileNumber,
    };
  });

  return (
    <ScrollBox>
      <Xcollapse
        defaultActiveKey={["1"]}
        ghost
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
      >
        <Xcollapse.Panel header="Property Details" key="1">
          {getPropertyBasicDetailState.uiState === "loading" && (
            <Skeleton active />
          )}

          {getPropertyBasicDetailState.uiState === "ideal" && (
            <Xgrid>
              <XgridCard>
                <LabelView
                  label="UPN"
                  value={getPropertyBasicDetailState.data.ProertyDetails.UPN}
                />
              </XgridCard>
              <XgridCard>
                <LabelView
                  label="Area"
                  value={getPropertyBasicDetailState.data.ProertyDetails.Area}
                />
              </XgridCard>
              <XgridCard>
                <LabelView
                  label="Authority Name"
                  value={
                    getPropertyBasicDetailState.data.ProertyDetails
                      .AuthorityName
                  }
                />
              </XgridCard>
              <XgridCard>
                <LabelView
                  label="Plot Number"
                  value={
                    getPropertyBasicDetailState.data.ProertyDetails.PlotNumber
                  }
                />
              </XgridCard>
              <XgridCard>
                <LabelView
                  label="Property Type"
                  value={
                    getPropertyBasicDetailState.data.ProertyDetails.PropertyType
                  }
                />
              </XgridCard>
              <XgridCard>
                <LabelView
                  label="Reserved Price"
                  value={
                    getPropertyBasicDetailState.data.ProertyDetails
                      .ReservedPrice
                  }
                />
              </XgridCard>
              <XgridCard>
                <LabelView
                  label="Sale Type"
                  value={
                    getPropertyBasicDetailState.data.ProertyDetails.SaleType
                  }
                />
              </XgridCard>
              <XgridCard>
                <LabelView
                  label="Scheme Name"
                  value={
                    getPropertyBasicDetailState.data.ProertyDetails.SchemeName
                  }
                />
              </XgridCard>
              <XgridCard>
                <LabelView
                  label="Usage Type"
                  value={
                    getPropertyBasicDetailState.data.ProertyDetails.UsageType
                  }
                />
              </XgridCard>
            </Xgrid>
          )}
        </Xcollapse.Panel>
        <Xcollapse.Panel header="Current Owner Details" key="2">
          {getPropertyBasicDetailState.uiState === "loading" && (
            <Skeleton active />
          )}

          {getPropertyBasicDetailState.uiState === "ideal" && (
            <Xtable
              dataSource={dataSource}
              columns={columns}
              pagination={false}
              scroll={{ x: 768 }}
            />
          )}
        </Xcollapse.Panel>
        <Xcollapse.Panel header="Allotment Detail" key="3">
          {getPropertyBasicDetailState.uiState === "loading" && (
            <Skeleton active />
          )}

          {getPropertyBasicDetailState.uiState === "ideal" && (
            <>
              <Xgrid>
                <XgridCard>
                  <LabelView
                    label="Date of Allotment"
                    value={
                      getPropertyBasicDetailState.OtherDetails.AllotmentDate
                    }
                  />
                </XgridCard>
                <XgridCard>
                  <LabelView
                    label="Allotment Number"
                    value={
                      getPropertyBasicDetailState.OtherDetails.AllotmentNumber
                    }
                  />
                </XgridCard>
                <XgridCard>
                  <LabelView
                    label="Date of Possession"
                    value={
                      getPropertyBasicDetailState.OtherDetails.PossessionDate
                    }
                  />
                </XgridCard>
                <XgridCard>
                  <LabelView
                    label="Possession Reference Number"
                    value={
                      getPropertyBasicDetailState.OtherDetails
                        .ConstructionPermisisonNumber
                    }
                  />
                </XgridCard>
              </Xgrid>
            </>
          )}
        </Xcollapse.Panel>
        <Xcollapse.Panel header="Allottees" key="4">
          {getPropertyBasicDetailState.uiState === "loading" && (
            <Skeleton active />
          )}

          {getPropertyBasicDetailState.uiState === "ideal" && (
            <Xtable
              dataSource={dataSource2}
              columns={columns2}
              pagination={false}
              scroll={{ x: 768 }}
            />
          )}
        </Xcollapse.Panel>
      </Xcollapse>
    </ScrollBox>
  );
};

const mapStateToProps = (state) => ({
  getPropertyBasicDetailState: state.getPropertyBasicDetail,
});

const mapDispatchToProps = (dispatch) => ({
  getPropertyBasicDetail: (params) => dispatch(getPropertyBasicDetail(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Basic);
