import React, { useState, useEffect, useRef } from 'react'
import PropsTypes from 'prop-types'
import Lottie from 'react-lottie'
import { connect } from "react-redux"
import { ReloadOutlined } from '@ant-design/icons'
import { Skeleton, Input, Form, Modal, Alert, Spin, Row, Col } from "antd"
import _ from "lodash"
import { Link, useLocation } from 'react-router-dom'

import HappyFaceAnimation from '../../../Lottie/happy-face'
import FlexBar from '../../../components/FlexBar/FlexBar'
import { getPropertyDuePayments, getPropertyDuePaymentsResetState, getPaymentIntegrationPayload, paymentIntegrationStatusCheck } from '../../../actions/duePaymentsAction'
import { getAutoPropertyHeadList, getAutoPropertyHeadListResetState } from '../../../actions/getAutoPropertyHeadListAction'
import { Xtable, OrangeButton, Xbutton, BlueButton, FlexDiv, FormItem } from '../../../components/Xcomponents'
import StatusCard from '../../../components/StatusCard/StatusCard'
import { SendIcon } from '../../../components/CustomIcons'
import { Message, Footer, TotalLabel, TotalAmount, TableContainer, PaymentContainer, PaymentProcessing } from './DuePaymentsStyle'
import { inr } from '../../../utils'
import paymentProcessingAnimation from '../../../Lottie/payment-processing.json'
import paymentSuccessAnimation from '../../../Lottie/payment-success.json'
import paymentFailAnimation from '../../../Lottie/payment-fail.json'

const DuePayments = props => {

    const {
        PropertyDuePaymentsState, getPropertyDuePaymentsResetState, getPropertyDuePayments, getPaymentIntegrationPayload, paymentIntegrationStatusCheck,
        getAutoPropertyHeadList, getAutoPropertyHeadListState, getAutoPropertyHeadListResetState
    } = props

    let query = new URLSearchParams(useLocation().search)
    let uniqueKey = query.get("uniqueKey")

    const ref = useRef({})

    const [formData, setFormData] = useState([])
    const [refresh, setRefresh] = useState(0)
    const [defaultValues, setDefaultValues] = useState({})
    const [drawerVisible, setDrawerVisible] = useState(false)
    const [blokScreen, setBlockScreen] = useState(false)
    const [totalTobePaidAmount, setTotalTobePaidAmount] = useState(0)
    const [displayPaymentStatusModal, setDisplayPaymentStatusModal] = useState(false)
    const [gstVlaue, setGstVlaue] = useState(0)
    const [autoPayent, setAutoPayent] = useState(0)



    useEffect(() => {
        if (uniqueKey) {
            paymentIntegrationStatusCheck({
                UniqueId: uniqueKey,
                OrgId: props.org,
                AuthToken: props.AuthToken,
                AuthTokenKey: props.AuthTokenKey
            })
        }
    }, [])

    useEffect(() => {
        return (() => {
            getPropertyDuePaymentsResetState()
            getAutoPropertyHeadListResetState()
        })
    }, [])
    useEffect(() => {
        if (["Success", "Failed", "In-Progress", "Cancelled"].includes(PropertyDuePaymentsState.paymentStatus)) {
            setDisplayPaymentStatusModal(true)
        }
    }, [PropertyDuePaymentsState.paymentStatus])


    useEffect(() => {
        getPropertyDuePayments({
            PropertyRefId: props.id,
            OrgId: props.org,
            AuthToken: props.AuthToken,
            AuthTokenKey: props.AuthTokenKey
        })
    }, [refresh])


    useEffect(() => {
        if (PropertyDuePaymentsState.uiState === "ideal") {
            let headArr = []
            let dftVle = {}
            PropertyDuePaymentsState.list.map((item) => {
                // headArr.push({
                //     "HeadId": item.HeadId,
                //     "HeadName": item.HeadName,
                //     "DueAmount": item.DueAmount,
                //     "TobePaidAmount": item.TobePaidAmount,
                // })

                // if (item.HeadId === 192) {
                //     headArr.push({
                //         "HeadId": 1562,
                //         "HeadName": "GST",
                //         "DueAmount": 0,
                //         "TobePaidAmount": _.round(item.TobePaidAmount * 0.18, 2),
                //     })
                // }

                dftVle[item.HeadId] = item.DueAmount
                if (item.HeadId === 192) setGstVlaue(_.round(item.TobePaidAmount * 0.18, 2))
            })
            setAutoPayent(PropertyDuePaymentsState.totalDueAmount)
            // setFormData(headArr)
            // setDefaultValues(dftVle)
        }
    }, [PropertyDuePaymentsState.uiState])

    useEffect(() => {
        let totalPayingAmount = 0
        _.forEach(formData, function (obj) {
            totalPayingAmount = parseFloat(totalPayingAmount) + parseFloat(obj.TobePaidAmount)
        })
        setTotalTobePaidAmount(_.round(totalPayingAmount, 2))
    }, [formData])

    useEffect(() => {
        if (PropertyDuePaymentsState.paymentIntegrationApiState === "ideal") {
            window.location = `${PropertyDuePaymentsState.paymentIntegrationPayload.URL}?UniqueId=${PropertyDuePaymentsState.paymentIntegrationPayload.UniqueId}&UserId=${PropertyDuePaymentsState.paymentIntegrationPayload.UserId}&Amount=${PropertyDuePaymentsState.paymentIntegrationPayload.Amount}&AuthTokenKey=${encodeURIComponent(props.AuthTokenKey)}&AuthToken=${encodeURIComponent(props.AuthToken)}`
        }
    }, [PropertyDuePaymentsState.paymentIntegrationApiState])

    useEffect(() => {
        if (getAutoPropertyHeadListState.apiState === "success") {
            setDrawerVisible(true)
            var formDataArr = []
            getAutoPropertyHeadListState.data.headDetails.map((item) => {

                formDataArr.push({
                    "HeadId": item.HeadId,
                    "HeadName": item.HeadName,
                    "DueAmount": item.DueAmount,
                    "TobePaidAmount": item.TobePaidAmount,
                })
                if (item.HeadId === 192) {
                    formDataArr.push({
                        "HeadId": 1562,
                        "HeadName": "GST",
                        "DueAmount": 0,
                        "TobePaidAmount": _.round(item.TobePaidAmount * 0.18, 2),
                    })
                }

                if (item.HeadId === 192) setGstVlaue(_.round(item.TobePaidAmount * 0.18, 2))
            })
            setFormData(formDataArr)
        }
    }, [getAutoPropertyHeadListState])


    // const handleOnChange = e => {
    //     let HeadId = parseInt(e.target.getAttribute("HeadId"))
    //     let HeadName = e.target.getAttribute("HeadName")
    //     let DueAmount = e.target.getAttribute("DueAmount")
    //     let TobePaidAmount = parseInt(e.target.value)
    //     if (Number.isNaN(TobePaidAmount)) TobePaidAmount = 0

    //     if (HeadId == 192) {
    //         var formDataArr = []
    //         formData.map(obj => {
    //             if (obj.HeadId === 192) {
    //                 formDataArr.push({
    //                     "HeadId": HeadId,
    //                     "HeadName": HeadName,
    //                     "DueAmount": DueAmount,
    //                     "TobePaidAmount": TobePaidAmount,
    //                 })
    //             } else if (obj.HeadId === 1562) {
    //                 formDataArr.push({
    //                     "HeadId": 1562,
    //                     "HeadName": "GST",
    //                     "DueAmount": 0,
    //                     "TobePaidAmount": _.round(TobePaidAmount * 0.18, 2),
    //                 })
    //             } else {
    //                 formDataArr.push(obj)
    //             }
    //         })
    //     } else {
    //         var formDataArr = []
    //         formData.map(obj => {
    //             if (obj.HeadId === HeadId) {
    //                 formDataArr.push({
    //                     "HeadId": HeadId,
    //                     "HeadName": HeadName,
    //                     "DueAmount": DueAmount,
    //                     "TobePaidAmount": TobePaidAmount,
    //                 })
    //             } else {
    //                 formDataArr.push(obj)
    //             }
    //         })
    //     }

    //     if (HeadId === 192) {
    //         setGstVlaue(_.round(TobePaidAmount * 0.18, 2))
    //     }

    //     setFormData(formDataArr)
    // }

    const onFinish = () => {
        if (totalTobePaidAmount > 0) {
            getPaymentIntegrationPayload({
                PropertyRefId: props.id,
                OrgId: props.org,
                TotalDueAmount: totalTobePaidAmount,
                headDetails: formData,
                AuthToken: props.AuthToken,
                AuthTokenKey: props.AuthTokenKey
            })
        }
    }

    const handleInputBlur = (e) => {
        let HeadId = e.target.getAttribute("HeadId")
        if (e.target.value === "") {
            ref.current[HeadId].state.value = 0
        }
    }

    const handleOnChangeGetHead = e => {
        setAutoPayent(e.target.value)
    }

    const getAutoPropertyHead = () => {
        getAutoPropertyHeadList({
            PropertyRefId: props.id,
            OrgId: props.org,
            TotalAmount: autoPayent,
            AuthToken: props.AuthToken,
            AuthTokenKey: props.AuthTokenKey
        })
    }

    const animationOptions = {
        loop: true,
        autoplay: true,
        animationData: HappyFaceAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        },
        align: "left"
    }

    const columns = [
        {
            title: "Payment Head",
            dataIndex: "PaymentHead",
            width: '70%',
        },
        {
            title: "Due Amount (₹)",
            dataIndex: "Amount",
            align: "right"
        }
    ]

    const dataSource = PropertyDuePaymentsState.list.map((item) => {
        return {
            PaymentHead: item.HeadName,
            Amount: inr(item.DueAmount),
        }
    })

    const paymentProcessingAnimationOptions = {
        loop: true,
        autoplay: true,
        animationData: paymentProcessingAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        },
    }

    const paymentSuccessAnimationOptions = {
        loop: false,
        autoplay: true,
        animationData: paymentSuccessAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }

    const paymentFailAnimationOptions = {
        loop: false,
        autoplay: true,
        animationData: paymentFailAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }

    let otherJsx = null
    if (PropertyDuePaymentsState.uiState === "loading") {
        otherJsx = <Skeleton active />
    } else if (PropertyDuePaymentsState.uiState === "ideal" || PropertyDuePaymentsState.uiState === "empty") {
        otherJsx = <>
            {getAutoPropertyHeadListState.apiState === "success" &&
                <Modal
                    title="Payment Details"
                    visible={drawerVisible}
                    onCancel={() => setDrawerVisible(false)}
                    footer={null}
                >

                    <Form layout="vertical" onFinish={onFinish} >
                        <TableContainer>

                            <table width="100%" cellPadding="15" cellSpacing="15" >
                                <thead>
                                    <tr>
                                        <th>Payment Head</th>
                                        <th style={{ textAlign: "right" }}>Due(₹)</th>
                                        <th style={{ textAlign: "right" }}>Pay(₹)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {getAutoPropertyHeadListState.data.headDetails.map(item => {
                                        return (
                                            <>
                                                <tr>
                                                    <td>{item.HeadName}</td>
                                                    <td style={{ textAlign: "right" }}>{inr(item.DueAmount)}</td>
                                                    <td align="right">
                                                        <Input
                                                            // min={0}
                                                            // max={item.DueAmount}
                                                            defaultValue={item.DueAmount}
                                                            // onBlur={handleInputBlur}
                                                            name={`TobePaidAmount${item.HeadId}`}
                                                            style={{ width: "100px" }}
                                                            // onChange={handleOnChange}
                                                            readOnly={true}
                                                            type="number" id={item.HeadId} HeadId={item.HeadId} HeadName={item.HeadName} DueAmount={item.DueAmount}
                                                            ref={element => (ref.current[item.HeadId] = element)}
                                                            onKeyPress={(e) => {
                                                                if ([43, 45, 46].includes(e.charCode)) e.preventDefault()
                                                            }}
                                                            onPaste={e => e.preventDefault()}
                                                        />
                                                    </td>
                                                </tr>
                                                {
                                                    item.HeadId === 192
                                                        ? <tr>
                                                            <td>GST@18% on {item.HeadName}</td>
                                                            <td style={{ textAlign: "right" }}>-</td>
                                                            <td align="right">
                                                                <Input
                                                                    readOnly={true}
                                                                    value={gstVlaue}
                                                                    name={`TobePaidAmount${item.HeadId}`}
                                                                    style={{ width: "100px" }}
                                                                    type="number" id={item.HeadId} HeadId={item.HeadId} HeadName={item.HeadName} DueAmount={item.DueAmount}
                                                                    ref={element => (ref.current[item.HeadId] = element)}
                                                                    onKeyPress={(e) => {
                                                                        if ([43, 45, 46].includes(e.charCode)) e.preventDefault()
                                                                    }}
                                                                    onPaste={e => e.preventDefault()}
                                                                />
                                                            </td>
                                                        </tr>
                                                        : null
                                                }
                                            </>
                                        )
                                    })
                                    }
                                </tbody>
                            </table>
                        </TableContainer>
                        <Footer>
                            <div>
                                <FlexBar
                                    leftContent={
                                        getAutoPropertyHeadListState.data.TotalDueAmount <= 0 &&
                                        <Alert
                                            description="Amount should be greater than zero."
                                            type="error"
                                        />
                                    }
                                    rightContent={<><TotalLabel>Pay:</TotalLabel><TotalAmount>₹{inr(getAutoPropertyHeadListState.data.TotalDueAmount)}</TotalAmount></>}
                                />
                                <FlexBar
                                    rightContent={
                                        getAutoPropertyHeadListState.data.TotalDueAmount > PropertyDuePaymentsState.totalDueAmount &&
                                        <Alert style={{ marginTop: 6 }}
                                            description={getAutoPropertyHeadListState.data.TotalDueAmount > PropertyDuePaymentsState.totalDueAmount ? <TotalLabel>Advance installment amount is ₹{inr(getAutoPropertyHeadListState.data.TotalDueAmount - PropertyDuePaymentsState.totalDueAmount)}. It will be adjusted in next installment amount.</TotalLabel> : null}
                                            type="error"
                                        />
                                    }
                                />
                            </div>
                        </Footer>
                        <Footer>
                            <OrangeButton htmlType="submit" loading={PropertyDuePaymentsState.paymentIntegrationApiState === "loading" ? true : false} icon={<SendIcon size={12} />}>PAY NOW</OrangeButton>

                        </Footer>
                    </Form>
                </Modal>
            }
            <Xtable dataSource={dataSource} columns={columns} pagination={false} scroll={{ x: 300 }} locale={{
                emptyText: <>
                    <Lottie
                        options={animationOptions}
                        height={40}
                        width={40}
                    />
                    <Message>Great, No dues pending!</Message>
                </>
            }} />
            <Footer>
                <TotalLabel>Total Due Amount:</TotalLabel>
                <TotalAmount>₹ {inr(PropertyDuePaymentsState.totalDueAmount)}</TotalAmount>
            </Footer>
            <Footer>
                {/* <OrangeButton onClick={() => setDrawerVisible(true)} icon={<SendIcon size={12} />} >PAY NOW</OrangeButton> */}
                <Form layout="vertical" onFinish={getAutoPropertyHead} >
                    <Row gutter="24" style={{ alignItems: "center" }} >
                        <Col span="15" >
                            <FormItem
                                label="Enter amount to be paid"
                                rules={[
                                    { required: true, message: 'Required' },
                                ]}
                            >
                                <Input
                                    min={1}
                                    // max={PropertyDuePaymentsState.totalDueAmount}
                                    defaultValue={PropertyDuePaymentsState.totalDueAmount}
                                    name="TotalAmount"
                                    onChange={handleOnChangeGetHead}
                                    type="number"
                                />
                            </FormItem>
                        </Col>
                        <Col span="9" >
                            <OrangeButton htmlType="submit" loading={getAutoPropertyHeadListState.apiState === "loading" ? true : false} icon={<SendIcon size={12} />}>PAY NOW</OrangeButton>
                        </Col>
                    </Row>
                </Form>
            </Footer>

            <Modal
                title={null}
                visible={blokScreen}
                footer={null}
                centered
                closable={false}
            >
                <div style={{ textAlign: "center" }}>Processing Payment...</div>
            </Modal>
        </>
    } else if (PropertyDuePaymentsState.uiState === "empty") {
        otherJsx = <FlexBar leftContent={
            <>
                <Lottie
                    options={animationOptions}
                    height={40}
                    width={40}
                />
                <Message>Great, No dues pending!</Message>
            </>
        } />
    } else {
        otherJsx = <StatusCard title="Something is not right." action={<Xbutton icon={<ReloadOutlined />} onClick={() => setRefresh(refresh + 1)}>Try Again</Xbutton>} />
    }

    return (
        <>
            {otherJsx}
            <Modal
                title={null}
                visible={displayPaymentStatusModal}
                footer={null}
                centered
                closable={false}
                className="round-shape"
            >
                {
                    PropertyDuePaymentsState.paymentStatus === "Success" &&
                    <PaymentContainer>
                        <Lottie
                            options={paymentSuccessAnimationOptions}
                            height={300}
                            width={300}
                            speed={1.5}
                        />
                    </PaymentContainer>
                }

                {
                    PropertyDuePaymentsState.paymentStatus === "Failed" &&
                    <PaymentContainer>
                        <Lottie
                            options={paymentFailAnimationOptions}
                            height={300}
                            width={300}
                            speed={1.5}
                        />
                    </PaymentContainer>
                }

                {
                    PropertyDuePaymentsState.paymentStatus === "In-Progress" &&
                    <PaymentContainer>
                        <Lottie
                            options={paymentProcessingAnimationOptions}
                            height={150}
                            width={150}
                            speed={2}
                        />
                        <PaymentProcessing>Fetching payment status</PaymentProcessing>
                    </PaymentContainer>
                }

                {
                    PropertyDuePaymentsState.paymentStatus === "Cancelled" &&
                    <PaymentContainer>
                        <Lottie
                            options={paymentFailAnimationOptions}
                            height={300}
                            width={300}
                            speed={2}
                        />
                    </PaymentContainer>
                }

                {PropertyDuePaymentsState.paymentStatus === "In-Progress"
                    ? null
                    : <FlexDiv><Link to={`/property-detail/${props.id}?org=${props.org}`}><BlueButton onClick={() => {
                        setDisplayPaymentStatusModal(false)
                        PropertyDuePaymentsState.paymentStatus = ""
                    }} style={{ padding: "0 2rem" }}>OK</BlueButton></Link></FlexDiv>}
            </Modal>
        </>
    )

}

DuePayments.PropsTypes = {
    id: PropsTypes.string,
    org: PropsTypes.string,
    AuthToken: PropsTypes.string,
    AuthTokenKey: PropsTypes.string,
}

DuePayments.defaultProps = {
    id: null,
    org: null,
    AuthToken: null,
    AuthTokenKey: null,
}

const mapStateToProps = (state) => ({
    PropertyDuePaymentsState: state.PropertyDuePayments,
    getAutoPropertyHeadListState: state.getAutoPropertyHeadList
});

const mapDispatchToProps = (dispatch) => ({
    getPropertyDuePayments: (params) => dispatch(getPropertyDuePayments(params)),
    getPaymentIntegrationPayload: (params) => dispatch(getPaymentIntegrationPayload(params)),
    paymentIntegrationStatusCheck: (params) => dispatch(paymentIntegrationStatusCheck(params)),
    getPropertyDuePaymentsResetState: () => dispatch(getPropertyDuePaymentsResetState()),
    getAutoPropertyHeadList: (params) => dispatch(getAutoPropertyHeadList(params)),
    getAutoPropertyHeadListResetState: () => dispatch(getAutoPropertyHeadListResetState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DuePayments)