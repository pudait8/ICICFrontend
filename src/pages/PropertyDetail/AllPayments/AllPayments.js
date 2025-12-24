import React, { useState, useEffect, useCallback } from "react";
import PropsTypes from "prop-types";
import { connect } from "react-redux";
import { Skeleton, Popover } from "antd";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";
import _ from "lodash";

import {
  Xtable,
  Xbutton,
  Xpagination,
  AnimatedSearch,
  Xlink,
} from "../../../components/Xcomponents";
import { getPropertyAllPayments } from "../../../actions/getPropertyAllPaymentsAction";
import StatusCard from "../../../components/StatusCard/StatusCard";
import FlexBar from "../../../components/FlexBar/FlexBar";
import { inr } from "../../../utils";
import { DownloadIcon, EyeIcon } from "../../../components/CustomIcons";
import { ReceiptColumn } from "./AllPaymentsStyle";
import PaymentPdfModal from "../../../components/PaymentPdfModal/PaymentPdfModal";

const AllPayments = (props) => {
  const {
    getPropertyAllPaymentsState,
    getPropertyAllPayments,
    getPropertyBasicDetailState,
    getAuthorityListState,
  } = props;

  const [pagination, setPagination] = useState({
    currentPage: 1,
    recordsPerPage: 10,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    getPropertyAllPayments({
      PropertyId: props.id,
      OrgId: props.org,
      CurrentPageNumber: pagination.currentPage,
      PageSize: pagination.recordsPerPage,
      SearchText: searchTerm,
      AuthToken: props.AuthToken,
      AuthTokenKey: props.AuthTokenKey,
    });
  }, [pagination, searchTerm, refresh]);

  const handlePaginationPageChange = (page, pageSize) => {
    setPagination({
      ...pagination,
      ["currentPage"]: page,
      ["recordsPerPage"]: pageSize,
    });
  };

  const setDebouncedSearchTerm = useCallback(
    _.debounce((q) => setSearchTerm(q), 500),
    []
  );

  const columns = [
    {
      title: "Payment Details",
      dataIndex: "PaymentDetails",
      width: "35%",
    },

    {
      title: "Payment Mode",
      dataIndex: "PaymentMode",
    },
    {
      title: "Paid On",
      dataIndex: "PaidOn",
    },
    {
      title: "Amount (₹)",
      dataIndex: "Amount",
      align: "right",
      render: (item) => (
        <Popover
          title="Payment Details"
          trigger={["click", "hover"]}
          content={item.PaymentHeadDetails.map((rcd) => (
            <div style={{ width: "100%" }}>
              <FlexBar
                leftContent={rcd.HeadName}
                rightContent={
                  <span style={{ marginLeft: "10px" }}>{`₹${inr(
                    rcd.HeadAmount
                  )}`}</span>
                }
              />
            </div>
          ))}
        >
          <Xlink>{inr(item.Amount)}</Xlink>
        </Popover>
      ),
    },
    {
      title: "Receipt",
      dataIndex: "Receipt",
      render: (item) => (
        <PaymentPdfModal
          item={item}
          itemTwo={getPropertyBasicDetailState}
          authorityList={getAuthorityListState}
        />
      ),
    },
  ];
  const dataSource = getPropertyAllPaymentsState.list.map((item) => {
    return {
      PaymentDetails: item.PaymentDetail,
      Amount: {
        Amount: item.TotalAmount,
        PaymentHeadDetails: item.PaymentHeadDetails,
      },
      PaymentMode: item.PaymentMode,
      PaidOn: item.PaymentDate,
      Receipt: item,
    };
  });

  return (
    <>
      <FlexBar
        leftContent={
          <AnimatedSearch
            placeholder="Search"
            prefix={<SearchOutlined />}
            onChange={(e) => setDebouncedSearchTerm(e.target.value)}
            allowClear
          />
        }
        background="lightgray"
        spacingX="1rem"
        spacingY="0.5rem"
      />

      {getPropertyAllPaymentsState.uiState === "loading" && <Skeleton />}

      {getPropertyAllPaymentsState.uiState === "empty" && (
        <StatusCard title="No payment has been made" />
      )}

      {getPropertyAllPaymentsState.uiState === "notFound" && (
        <StatusCard title="Record not found " />
      )}

      {getPropertyAllPaymentsState.uiState === "ideal" && (
        <>
          <Xtable
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            scroll={{ x: 768 }}
          />
          <Xpagination
            pageSizeOptions={["2", "10", "15", "25", "50"]}
            showSizeChanger
            hideOnSinglePage
            onChange={handlePaginationPageChange}
            current={pagination.currentPage}
            defaultPageSize={pagination.recordsPerPage}
            total={getPropertyAllPaymentsState.totalRecords}
            showTotal={(total, range) =>
              `${range[0]}-${range[1]} of ${total} items`
            }
          />
        </>
      )}

      {getPropertyAllPaymentsState.uiState === "error" && (
        <StatusCard
          title="Something is not right"
          action={
            <Xbutton
              icon={<ReloadOutlined />}
              onClick={() => setRefresh(refresh + 1)}
            >
              Try Again
            </Xbutton>
          }
        />
      )}
    </>
  );
};

AllPayments.PropsTypes = {
  id: PropsTypes.string,
  AuthToken: PropsTypes.string,
  AuthTokenKey: PropsTypes.string,
};

AllPayments.defaultProps = {
  id: null,
  AuthToken: null,
  AuthTokenKey: null,
};

const mapStateToProps = (state) => ({
  getPropertyAllPaymentsState: state.getPropertyAllPayments,
  getPropertyBasicDetailState: state.getPropertyBasicDetail,
  getAuthorityListState: state.getAuthorityList,
});

const mapDispatchToProps = (dispatch) => ({
  getPropertyAllPayments: (params) => dispatch(getPropertyAllPayments(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllPayments);
