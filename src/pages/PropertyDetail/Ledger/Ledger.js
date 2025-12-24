import React, { useState, useEffect, useCallback } from 'react'
import PropsTypes from 'prop-types'
import { connect } from "react-redux"
import { Row, Col, Select } from 'antd'

import { Container, DisplayColorBox } from './LedgerStyle'
import SelectSearchNotFound from "../../../components/SelectSearchNotFound";
import { Ledgertable } from '../../../components/Xcomponents'

// Actions
import { getPropertyDetailLedger, getPropertyDetailLedgerResetState } from '../../../actions/getPropertyDetailLedgerAction'
import { getPropertyLedger, getPropertyLedgerResetState } from '../../../actions/getPropertyLedgerAction'

const { Option } = Select


const Ledger = props => {
    //Variables
    const {
        getPropertyDetailLedgerState, getPropertyDetailLedger, getPropertyDetailLedgerResetState,
        getPropertyLedgerState, getPropertyLedger, getPropertyLedgerResetState,
    } = props

    const [transactionType, setTransactionType] = useState(0)
    const [dataSource, setDataSource] = useState([])
    const [columns, setColumns] = useState([])

    //Callback
    useEffect(() => {
        getPropertyDetailLedger({
            propertyRefId: props.id,
            schemeId: props.SchemeId,
            OrgId: props.org,
            AuthToken: props.AuthToken,
            AuthTokenKey: props.AuthTokenKey
        })


    }, [])

    useEffect(() => {
        getPropertyLedger({
            propertyRefId: props.id,
            TransTypeId: transactionType,
            OrgId: props.org,
            AuthToken: props.AuthToken,
            AuthTokenKey: props.AuthTokenKey
        })
    }, [transactionType])

    useEffect(() => {
        const columns = [
            {
                title: "#",
                dataIndex: "SrNo",
                render(item) {
                    return {
                        props: {
                            style: {
                                background: item.TransId !== "0" ? item.TransColorCode : '#0000',
                                color: item.TransId == "0" && item.TransColorCode,
                                borderTop: item.TransId == "0" && '2px solid #999',
                                borderBottom: item.TransId == "0" && '2px solid #999',
                                borderLeft: item.TransId == "0" && '2px solid #999',
                                fontWeight: item.TransId == "0" && '700'
                            }
                        },
                        children: <div>{item.SrNo}</div>
                    };
                }
            },
            {
                title: "Date",
                dataIndex: "ShowDueDate",
                width: 130,
                render(item) {
                    return {
                        props: {
                            style: {
                                background: item.TransId !== "0" ? item.TransColorCode : '#0000',
                                color: item.TransId == "0" && item.TransColorCode,
                                borderTop: item.TransId == "0" && '2px solid #999',
                                borderBottom: item.TransId == "0" && '2px solid #999',
                                fontWeight: item.TransId == "0" && '700'
                            }
                        },
                        children: <div>{item.ShowDueDate}</div>
                    };
                }
            },
            {
                title: "Narration",
                dataIndex: "Narration",
                width: 250,
                render(item) {
                    return {
                        props: {
                            style: {
                                background: item.TransId !== "0" ? item.TransColorCode : '#0000',
                                color: item.TransId == "0" && item.TransColorCode,
                                borderTop: item.TransId == "0" && '2px solid #999',
                                borderBottom: item.TransId == "0" && '2px solid #999',
                                fontWeight: item.TransId == "0" && '700'
                            }
                        },
                        children: <div>{item.Narration}</div>
                    };
                }
            },
            {
                title: "Dr. Amount",
                dataIndex: "DR",
                align: "right",
                render(item) {
                    return {
                        props: {
                            style: {
                                background: item.TransId !== "0" ? item.TransColorCode : '#0000',
                                color: item.TransId == "0" && item.TransColorCode,
                                borderTop: item.TransId == "0" && '2px solid #999',
                                borderBottom: item.TransId == "0" && '2px solid #999',
                                fontWeight: item.TransId == "0" && '700'
                            }
                        },
                        children: <div>{item.DR}</div>
                    };
                }
            },
            {
                title: "Cr. Amount",
                dataIndex: "CR",
                align: "right",
                render(item) {
                    return {
                        props: {
                            style: {
                                background: item.TransId !== "0" ? item.TransColorCode : '#0000',
                                color: item.TransId == "0" && item.TransColorCode,
                                borderTop: item.TransId == "0" && '2px solid #999',
                                borderBottom: item.TransId == "0" && '2px solid #999',
                                fontWeight: item.TransId == "0" && '700'
                            }
                        },
                        children: <div>{item.CR}</div>
                    };
                }
            },
            {
                title: `Delay (in days) for which penal interest is payable`,
                dataIndex: "Days",
                width: 150,
                align: "right",
                render(item) {
                    return {
                        props: {
                            style: {
                                background: item.TransId !== "0" ? item.TransColorCode : '#0000',
                                color: item.TransId == "0" && item.TransColorCode,
                                borderTop: item.TransId == "0" && '2px solid #999',
                                borderBottom: item.TransId == "0" && '2px solid #999',
                                fontWeight: item.TransId == "0" && '700'
                            }
                        },
                        children: <div>{item.Days}</div>
                    };
                }
            },
            {
                title: "Balance",
                dataIndex: "balance",
                align: "right",
                render(item) {
                    return {
                        props: {
                            style: {
                                background: item.TransId !== "0" ? item.TransColorCode : '#0000',
                                color: item.TransId == "0" && item.TransColorCode,
                                borderTop: item.TransId == "0" && '2px solid #999',
                                borderBottom: item.TransId == "0" && '2px solid #999',
                                borderRight: item.TransId == "0" && '2px solid #999',
                                fontWeight: item.TransId == "0" && '700'
                            }
                        },
                        children: <div>{item.balance}</div>
                    };
                }
            },
        ]
        setColumns(columns)
    }, [])

    useEffect(() => {
        if (getPropertyLedgerState.apiState === "success") {
            let data = []
            getPropertyLedgerState.data.Data.map((item, index) => {
                data.push({
                    SrNo: { SrNo: ++index, TransColorCode: item.TransColorCode, TransId: item.TransId },
                    ShowDueDate: { ShowDueDate: item.ShowDueDate, TransColorCode: item.TransColorCode, TransId: item.TransId },
                    Narration: { Narration: item.Narration, TransColorCode: item.TransColorCode, TransId: item.TransId },
                    DR: { DR: item.DR, TransColorCode: item.TransColorCode, TransId: item.TransId },
                    CR: { CR: item.CR, TransColorCode: item.TransColorCode, TransId: item.TransId },
                    Days: { Days: item.Days, TransColorCode: item.TransColorCode, TransId: item.TransId },
                    balance: { balance: item.balance, TransColorCode: item.TransColorCode, TransId: item.TransId },
                })
            })
            // console.log(data)
            setDataSource(data)
        }
    }, [getPropertyLedgerState])


    //Functions
    const handleOnChangeSelect = (value) => {
        setTransactionType(value)
    }


    return (
        <Container>
            <div style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 24 }}>Ownership Details</div>
            {getPropertyDetailLedgerState.apiState === "success" &&
                <>
                    <Row gutter={[16, 24]}>
                        <Col span={12}>
                            <Row gutter={[0, 8]}>
                                <Col span={24} style={{ fontSize: 16, fontWeight: 'bold' }}>Current Owner Name :</Col>
                                <Col span={24}>{getPropertyDetailLedgerState.data.PropertyDetail.AllotteesName}</Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Row gutter={[0, 8]}>
                                <Col span={24} style={{ fontSize: 16, fontWeight: 'bold' }}>Address :</Col>
                                <Col span={24}>{getPropertyDetailLedgerState.data.PropertyDetail.AddressOfCorrespondence}</Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row gutter={[16, 24]}>
                        <Col span={12}>
                            <Row gutter={[0, 8]}>
                                <Col span={10} style={{ fontSize: 16, fontWeight: 'bold' }}>Attributes of Site</Col>
                            </Row>
                            <Row >
                                <Col span={12}>Plot Area</Col>
                                <Col span={12}>{getPropertyDetailLedgerState.data.PropertyDetail.Area}</Col>
                            </Row>
                            <Row >
                                <Col span={12}>Property Type</Col>
                                <Col span={12}>{getPropertyDetailLedgerState.data.PropertyDetail.PropertyType}</Col>
                            </Row>
                            <Row >
                                <Col span={12}>Premium Category Type</Col>
                                <Col span={12}>{getPropertyDetailLedgerState.data.PropertyDetail.PC}</Col>
                            </Row>
                            <Row >
                                <Col span={12}>Sale Type</Col>
                                <Col span={12}>{getPropertyDetailLedgerState.data.PropertyDetail.SaleType}</Col>
                            </Row>
                            <Row >
                                <Col span={12}>Usage Type</Col>
                                <Col span={12}>{getPropertyDetailLedgerState.data.PropertyDetail.UsageType}</Col>
                            </Row>
                            <Row >
                                <Col span={12}>Lease/CD Reg. Date</Col>
                                <Col span={12}>{getPropertyDetailLedgerState.data.PropertyDetail.Regdate}</Col>
                            </Row>
                            <Row >
                                <Col span={12}>LOI No. & Date</Col>
                                <Col span={12}>{getPropertyDetailLedgerState.data.PropertyDetail.LOIDetail}</Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Row gutter={[0, 8]}>
                                <Col span={24} style={{ fontSize: 16, fontWeight: 'bold' }}>Financial Details</Col>
                            </Row>
                            <Row >
                                <Col span={12}>Sale Price (LumpSum)</Col>
                                <Col span={12}>{getPropertyDetailLedgerState.data.PropertyDetail.SP}</Col>
                            </Row>
                            <Row >
                                <Col span={12}>Sale Amount</Col>
                                <Col span={12}>{getPropertyDetailLedgerState.data.PropertyDetail.Saleprice}</Col>
                            </Row>
                            <Row >
                                <Col span={12}>Premium Category % & Amt</Col>
                                <Col span={12}>{getPropertyDetailLedgerState.data.PropertyDetail.PCAmt}</Col>
                            </Row>
                            <Row >
                                <Col span={12}>Total Sale Amount</Col>
                                <Col span={12}>{getPropertyDetailLedgerState.data.PropertyDetail.TotAmount}</Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Row gutter={[0, 8]}>
                                <Col span={24} style={{ fontSize: 16, fontWeight: 'bold' }}>Allotment Details</Col>
                            </Row>
                            <Row>
                                <Col span={12}>Auction Date</Col>
                                <Col span={12}>{getPropertyDetailLedgerState.data.PropertyDetail.AuctionDate}</Col>
                            </Row>
                            <Row>
                                <Col span={12}>Allotment No. & Date</Col>
                                <Col span={12}>{getPropertyDetailLedgerState.data.PropertyDetail.AlotDate}</Col>
                            </Row>
                            <Row>
                                <Col span={12}>Construction Completion Date</Col>
                                <Col span={12}>{getPropertyDetailLedgerState.data.PropertyDetail.Consdate}</Col>
                            </Row>
                            <Row>
                                <Col span={12}>Possession Date</Col>
                                <Col span={12}>{getPropertyDetailLedgerState.data.PropertyDetail.Possesdate}</Col>
                            </Row>
                            <Row>
                                <Col span={12}>Verified by</Col>
                                <Col span={12}>{getPropertyDetailLedgerState.data.PropertyDetail.VerifiedBy}</Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Row gutter={[0, 8]}>
                                <Col span={24} style={{ fontSize: 16, fontWeight: 'bold' }}>Litigation Details</Col>
                            </Row>
                            <Row>
                                <Col span={12}>Is Under Litigation</Col>
                                <Col span={12}>{getPropertyDetailLedgerState.data.PropertyDetail.IsUnderLitigation}</Col>
                            </Row>
                            <Row>
                                <Col span={12}>Litigation Completion Date</Col>
                                <Col span={12}>{getPropertyDetailLedgerState.data.PropertyDetail.LitigationDate}</Col>
                            </Row>
                            <Row>
                                <Col span={12}>Court Case</Col>
                                <Col span={12}>{getPropertyDetailLedgerState.data.PropertyDetail.CourtCase}</Col>
                            </Row>
                            <Row>
                                <Col span={12}>NDC Dispatch No.</Col>
                                <Col span={12}>{getPropertyDetailLedgerState.data.PropertyDetail.DispatchNo}</Col>
                            </Row>
                            <Row>
                                <Col span={12}>NDC Dispatch Date</Col>
                                <Col span={12}>{getPropertyDetailLedgerState.data.PropertyDetail.DispatchDate}</Col>
                            </Row>
                            <Row>
                                <Col span={12}>Checked By</Col>
                                <Col span={12}>{getPropertyDetailLedgerState.data.PropertyDetail.CheckedBy}</Col>
                            </Row>
                        </Col>
                    </Row>

                    <Row gutter={[16, 8]} style={{ marginTop: 32 }}>
                        <Col span={8}>
                            <Select
                                placeholder="Filter By Transaction Type"
                                size="large"
                                showSearch
                                allowClear
                                onClear={() => setTransactionType(0)}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                notFoundContent={<SelectSearchNotFound />}
                                onSelect={(v) => handleOnChangeSelect(v)}
                                style={{ width: "100%", fontSize: 15 }}
                            >
                                {getPropertyDetailLedgerState.data.TransType.map((item) => (

                                    <Option key={item.TransId} value={item.TransId} >{item.TransName}</Option>
                                ))
                                }
                            </Select>
                        </Col>
                        <Col span={16}>
                            <Row gutter={[16, 8]} >
                                {getPropertyDetailLedgerState.data.TransType.map(o => (
                                    <Col span={8} style={{ display: "flex", alignItems: "center" }} key={o.TransId}>
                                        <DisplayColorBox style={{ backgroundColor: o.TransColorCode }} ></DisplayColorBox>
                                        <div style={{ fontSize: 14 }}> {o.TransName}</div></Col>))}
                            </Row>
                        </Col>
                    </Row>
                </>
            }
            <Ledgertable dataSource={dataSource} columns={columns} pagination={false} scroll={{ x: 768 }} />
        </Container>
    )
}

Ledger.PropsTypes = {
    id: PropsTypes.string,
    SchemeId: PropsTypes.number,
    org: PropsTypes.string,
    AuthToken: PropsTypes.string,
    AuthTokenKey: PropsTypes.string,
}

Ledger.defaultProps = {
    id: null,
    SchemeId: 0,
    org: null,
    AuthToken: null,
    AuthTokenKey: null,
}

const mapStateToProps = (state) => ({
    getPropertyDetailLedgerState: state.getPropertyDetailLedger,
    getPropertyLedgerState: state.getPropertyLedger,
});

const mapDispatchToProps = (dispatch) => ({
    getPropertyDetailLedger: (params) => dispatch(getPropertyDetailLedger(params)),
    getPropertyDetailLedgerResetState: () => dispatch(getPropertyDetailLedgerResetState()),
    getPropertyLedger: (params) => dispatch(getPropertyLedger(params)),
    getPropertyLedgerResetState: () => dispatch(getPropertyLedgerResetState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Ledger)