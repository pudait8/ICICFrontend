import React, { useEffect, useState } from 'react'
import { Link, Redirect, useLocation, useHistory } from "react-router-dom"
import { connect } from "react-redux"
import { getOrgId } from '../../utils'
import { Alert, notification, Button } from 'antd';

import { paymentIntegrationStatusCheck } from '../../actions/duePaymentsAction'
import { Container } from './WaterBillPaymentStatusStyle'
import { getWaterReceipt } from '../../actions/getWaterReceiptAction'
import { price_in_words } from '../../utils'

const WaterBillPaymentStatus = (props) => {
    let query = new URLSearchParams(useLocation().search)
    const UniqueId = query.get("UniqueId")
    const billNo = query.get("billNo")
    const { paymentIntegrationStatusCheck, PropertyDuePaymentsState,
        getWaterReceipt, getWaterReceiptState, getAuthorityListState
    } = props
    const OrgId = getOrgId()
    const [paymentState, setPaymentState] = useState('')
    const [authority, setAuthority] = useState({})

    useEffect(() => {
        paymentIntegrationStatusCheck({
            UniqueId: UniqueId,
            OrgId: parseInt(OrgId),
            checkForWater: true
        })
    }, [])

    useEffect(() => {
        if (PropertyDuePaymentsState.statusCheckApiState === 'succcess') {
            if (PropertyDuePaymentsState.paymentStatus === 'Success') {
                setPaymentState('Success')
            }
            if (PropertyDuePaymentsState.paymentStatus === 'Failed') {
                setPaymentState('Failed')
            }
            if (PropertyDuePaymentsState.paymentStatus === 'Cancelled') {
                setPaymentState('Cancelled')
            }
            if (PropertyDuePaymentsState.paymentStatus === 'In-Progress') {
                setPaymentState('In-Progress')
            }
        }
        if (PropertyDuePaymentsState.statusCheckApiState === 'error') {
            setPaymentState('Failed')
        }
    }, [PropertyDuePaymentsState])

    useEffect(() => {
        if (paymentState === 'Success') {
            let Authority = getAuthorityListState.list.find(item => item.Id == OrgId)
            setAuthority(Authority)
            getWaterReceipt({
                OrgId: OrgId,
                billNo: billNo
            })
        }
    }, [paymentState])

    useEffect(() => {
        if (getWaterReceiptState.apiState === 'alert') {
            notification.error({
                message: getWaterReceiptState.apiMessage,
                placement: "bottomRight"
            })
        }
    }, [getWaterReceiptState.apiState])

    function printPage() {

        var printHtml = window.open('', 'PRINT', 'height=400,width=600');

        printHtml.document.write('<html><head>');
        printHtml.document.write(document.getElementById("print-div").innerHTML);
        printHtml.document.write('</body></html>');


        printHtml.print();
        // printHtml.close();

        return true;

    }



    return (
        <Container>
            {paymentState === '' && <h3>Fetching payment status.</h3>}
            {paymentState === 'In-Progress' && <Alert message="Your payment is in In-Progress state." type="warning" />}
            {paymentState === 'Success' && <Alert message="Your payment has been done successfully." type="success" />}
            {paymentState === 'Failed' && <Alert message="Your payment has failed." type="error" />}
            {paymentState === 'Cancelled' && <Alert message="Your payment has cancelled." type="error" />}


            {(authority && getWaterReceiptState.apiState === 'success') &&
                <>
                    <div style={{ border: 'solid 1px #000', margin: '16px 0', padding: '0 16px' }} id="print-div" >
                        <h3 style={{ textAlign: 'center' }}>Water & Sewerage Payment Receipt</h3>
                        <hr style={{ margin: '4px 0' }} />
                        <h4 style={{ fontWeight: 'bold' }} >{authority.Name}</h4>
                        <p style={{ fontSize: 12 }}>{authority.OrgAddress}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
                            <div style={{ fontSize: 14 }}>
                                <h4 style={{ fontWeight: 'bold' }}>Owner Detail</h4>
                                <table>
                                    <tr>
                                        <td style={{ fontWeight: 'bold' }}>Received From.</td>
                                        <td>: {getWaterReceiptState.data.Owner}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: 'bold' }}>Scheme.</td>
                                        <td>: {getWaterReceiptState.data.SchemeName}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: 'bold' }}>Property No.</td>
                                        <td>: {getWaterReceiptState.data.PropertyNo}</td>
                                    </tr>

                                    <tr>
                                        <td style={{ fontWeight: 'bold' }}>Type</td>
                                        <td>: {getWaterReceiptState.data.PropertyType}</td>
                                    </tr>
                                </table>
                            </div>
                            <div>
                                <h4 style={{ fontWeight: 'bold' }}>Receipt Detail</h4>
                                <table>
                                    <tr>
                                        <td style={{ fontWeight: 'bold' }}>Receipt No :</td>
                                        <td style={{ textAlign: 'right' }} >{getWaterReceiptState.data.BillId}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: 'bold' }}>Receipt Date :</td>
                                        <td style={{ textAlign: 'right' }} >{getWaterReceiptState.data.IssueDate}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: 'bold' }}>Bill No :</td>
                                        <td style={{ textAlign: 'right' }} >{getWaterReceiptState.data.BillNo}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <hr style={{ margin: '4px 0' }} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
                            <div>
                                <table>
                                    <tr>
                                        <td>Paymode</td>
                                        <td>: Online</td>
                                    </tr>
                                    <tr>
                                        <td>Transaction No</td>
                                        <td>: {PropertyDuePaymentsState.TransactionNo}</td>
                                    </tr>
                                </table>
                            </div>
                            <div>
                                <table>
                                    <tr>
                                        <td style={{ fontWeight: 'bold' }}>Bill Amount to be Received :</td>
                                        <td style={{ textAlign: 'right' }} >₹{getWaterReceiptState.data.PayableAmount}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: 'bold' }}>Amount Received :</td>
                                        <td style={{ textAlign: 'right' }} >₹{getWaterReceiptState.data.ReceivedAmount}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: 'bold' }}>Balance :</td>
                                        <td style={{ textAlign: 'right' }} >₹{getWaterReceiptState.data.BalanceAmount}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <div>
                            <p style={{ fontSize: 12, textTransform: 'uppercase' }}><b>Amount in Words :</b> {price_in_words(getWaterReceiptState.data.PayableAmount)}</p>
                            <p style={{ fontSize: 12, textAlign: 'center' }}>Its a computer generated receipt, does not Require Authentication.</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button type="primary" onClick={printPage}>Print</Button>
                    </div>
                </>
            }
        </Container>
    )
}

const mapStateToProps = (state) => ({
    PropertyDuePaymentsState: state.PropertyDuePayments,
    getWaterReceiptState: state.getWaterReceipt,
    getAuthorityListState: state.getAuthorityList,
});

const mapDispatchToProps = (dispatch) => ({
    paymentIntegrationStatusCheck: (params) => dispatch(paymentIntegrationStatusCheck(params)),
    getWaterReceipt: (params) => dispatch(getWaterReceipt(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WaterBillPaymentStatus)