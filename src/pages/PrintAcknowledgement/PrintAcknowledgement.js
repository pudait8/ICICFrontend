import React, { useEffect, useState } from "react"
import { connect } from "react-redux"

//actions
import { getApplicationDetail } from '../../actions/getApplicationDetailAction'

//Others
import { getOrgId } from '../../utils'


const PrintAcknowledgement = props => {

    const { getApplicationDetail, getApplicationDetailState } = props

    useEffect(() => {
        getApplicationDetail({
            ApplicationId: parseInt(props.match.params.ApplicationId),
            OrgId: getOrgId(),
        })
    }, [])



    useEffect(() => {
        if (getApplicationDetailState.uiState === "ideal") {
            localStorage.removeItem('PudaAuthTokenKey')
            localStorage.removeItem('PudaAuthToken')
            setTimeout(function () {
                window.print()
            }, 500);

        }

    }, [getApplicationDetailState.uiState])

    return (
        <>
            {getApplicationDetailState.uiState === "ideal" &&
                <div align="left" style={{ width: '100%', margin: "15px" }}>
                    <table cellSpacing={1} cellPadding={2} style={{ textAlign: 'left', width: '350px', height: '335px', verticalAlign: 'top' }} width="100%" border={0}>
                        <tbody>
                            <tr>
                                <td colSpan={3} align="center" valign="top">
                                    <table cellSpacing={1} cellPadding={2} align="center" style={{ textAlign: 'left', height: '100%' }} width="100%" border={0}>
                                        <tbody>
                                            <tr>
                                                <td align="center" colSpan={3} style={{ fontSize: '12pt' }} valign="top" />
                                            </tr>
                                            <tr>
                                                <td align="center" colSpan={3} style={{ fontSize: '8pt' }} valign="top">
                                                    <span id="lblorgname" style={{ fontSize: 'Medium', fontWeight: 'bold' }}>{getApplicationDetailState.data.Organization || ""}</span><br />
                                                    <span id="lblAuthorityAddress" style={{ fontSize: '8pt', fontWeight: 'bold' }}>PUDA Bhawan, Sector-62, S.A.S Nagar</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="center" colSpan={3} style={{ fontSize: '10pt' }} valign="top" />
                                            </tr>
                                            <tr>
                                                <td align="center" colSpan={3} style={{ fontSize: '10pt', lineHeight: '10pt' }} valign="top">
                                                    ACKNOWLEDGEMENT
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="center" colSpan={3} style={{ fontSize: '10pt', lineHeight: '18pt' }} valign="top" />
                                            </tr>
                                            <tr>
                                                <td style={{ fontSize: '10pt', width: '40%' }} valign="top" align="justify">Application ID</td>
                                                <td style={{ fontSize: '10pt', width: '2%' }} valign="top" align="justify">
                                                    :
                                                </td>
                                                <td style={{ fontSize: '10pt', width: '80%' }} valign="top" align="justify">
                                                    <span id="lbl_applrefid" style={{ display: 'inline-block', fontSize: '10pt', width: '100%' }}>{props.match.params.ApplicationId}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ fontSize: '10pt', width: '40%' }} valign="top" align="justify">Reference No </td>
                                                <td style={{ fontSize: '10pt', width: '2%' }} valign="top" align="justify">
                                                    :
                                                </td>
                                                <td style={{ fontSize: '10pt', width: '80%' }} valign="top" align="justify">
                                                    <span id="lblDiaryNo" style={{ display: 'inline-block', fontSize: '10pt', width: '100%' }}>{getApplicationDetailState.data.ApplicationNo || ""}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="justify" style={{ fontSize: '10pt', width: '40%' }} valign="top">
                                                    Code File No.
                                                </td>
                                                <td align="justify" style={{ fontSize: '10pt', width: '2%' }} valign="top">
                                                    :
                                                </td>
                                                <td align="justify" style={{ fontSize: '10pt', width: '80%' }} valign="top">
                                                    <span id="lblCodeFileNo" style={{ display: 'inline-block', fontSize: '10pt', width: '100%' }}>-</span>
                                                </td>
                                            </tr>
                                            {(getApplicationDetailState.data.ApplicationTypeId !== 28 && getApplicationDetailState.data.ApplicationTypeId !== 29 && getApplicationDetailState.data.ApplicationTypeId !== 1721 && getApplicationDetailState.data.ApplicationTypeId !== 1726 && getApplicationDetailState.data.ApplicationTypeId !== 1679 && getApplicationDetailState.data.ApplicationTypeId !== 1710 && getApplicationDetailState.data.ApplicationTypeId !== 1727) &&
                                                <>
                                                    <tr>
                                                        <td align="justify" style={{ fontSize: '10pt', width: '40%' }} valign="top">
                                                            Property Size
                                                        </td>
                                                        <td align="justify" style={{ fontSize: '10pt', width: '2%' }} valign="top">
                                                            :
                                                        </td>
                                                        <td align="justify" style={{ fontSize: '10pt', width: '80%' }} valign="top">
                                                            <span id="lblPropertySize" style={{ display: 'inline-block', fontSize: '10pt', width: '100%' }}>{getApplicationDetailState.data.PropertyDetails && getApplicationDetailState.data.PropertyDetails.Area || ""}</span>
                                                        </td>
                                                    </tr>
                                                </>
                                            }
                                            <tr>
                                                <td style={{ fontSize: '10pt', width: '40%' }} valign="top" align="justify">Applicant’s Name </td>
                                                <td style={{ fontSize: '10pt', width: '2%' }} valign="top" align="justify">
                                                    :
                                                </td>
                                                <td style={{ fontSize: '10pt', width: '80%' }} valign="top" align="justify">
                                                    <span id="lblApplName" style={{ display: 'inline-block', fontSize: '10pt', width: '100%' }}>{getApplicationDetailState.data.ApplicantDetails && getApplicationDetailState.data.ApplicantDetails.Name || ""}</span>
                                                </td>
                                            </tr>
                                            {(getApplicationDetailState.data.ApplicationTypeId !== 28 && getApplicationDetailState.data.ApplicationTypeId !== 29 && getApplicationDetailState.data.ApplicationTypeId !== 1721 && getApplicationDetailState.data.ApplicationTypeId !== 1726 && getApplicationDetailState.data.ApplicationTypeId !== 1679 && getApplicationDetailState.data.ApplicationTypeId !== 1710 && getApplicationDetailState.data.ApplicationTypeId !== 1727) &&
                                                <>
                                                    <tr>
                                                        <td style={{ fontSize: '10pt', width: '40%' }} valign="top" align="justify">Property No. </td>
                                                        <td style={{ fontSize: '10pt', width: '2%' }} valign="top" align="justify">
                                                            :
                                                        </td>
                                                        <td style={{ fontSize: '10pt', width: '80%' }} valign="top" align="justify">
                                                            <span id="lblPropertyNo" style={{ display: 'inline-block', fontSize: '10pt', width: '100%' }}>{getApplicationDetailState.data.PropertyDetails && getApplicationDetailState.data.PropertyDetails.PlotNumber || ""}</span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ fontSize: '10pt', width: '40%' }} valign="top" align="justify">Scheme</td>
                                                        <td style={{ fontSize: '10pt', width: '2%' }} valign="top" align="justify">
                                                            :
                                                        </td>
                                                        <td style={{ fontSize: '10pt', width: '80%' }} valign="top" align="justify">
                                                            <span id="lblSectorScheme" style={{ display: 'inline-block', fontSize: '10pt', width: '100%' }}>{getApplicationDetailState.data.PropertyDetails && getApplicationDetailState.data.PropertyDetails.SchemeName || ""}<br /><br /></span>
                                                        </td>
                                                    </tr>
                                                </>
                                            }
                                            <tr>
                                                <td style={{ fontSize: '10pt', width: '40%' }} valign="top" align="justify">Service </td>
                                                <td style={{ fontSize: '10pt', width: '2%' }} valign="top" align="justify">
                                                    :
                                                </td>
                                                <td style={{ fontSize: '10pt', width: '80%' }} valign="top" >
                                                    <span id="lblService" style={{ display: 'inline-block', fontSize: '10pt', width: '100%' }}>{getApplicationDetailState.data.ApplicationName || ""}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ fontSize: '10pt', width: '40%' }} valign="top" >
                                                    Application Received On
                                                </td>
                                                <td style={{ fontSize: '10pt', width: '2%' }} valign="top" align="justify">
                                                    :
                                                </td>
                                                <td style={{ fontSize: '10pt', width: '80%' }} valign="top" align="justify">
                                                    <span id="lblApplDate" style={{ display: 'inline-block', fontSize: '10pt', width: '100%' }}>{getApplicationDetailState.data.ApplicationDate || ""}</span>
                                                </td>
                                            </tr>
                                            <tr id="disposaldt">
                                                <td style={{ fontSize: '10pt', width: '40%' }} valign="top" align="justify">Due Date of Disposal </td>
                                                <td style={{ fontSize: '10pt', width: '2%' }} valign="top" align="justify">
                                                    :
                                                </td>
                                                <td style={{ fontSize: '10pt', width: '80%' }} valign="top" align="justify">
                                                    <span id="lblDisposalDate" style={{ display: 'inline-block', fontSize: '10pt', width: '100%' }}>{getApplicationDetailState.data.TargetDisposalDate || ""}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="justify" style={{ fontSize: '10pt', width: '40%' }} valign="top">
                                                    Documents Checked
                                                </td>
                                                <td align="justify" style={{ fontSize: '10pt', width: '2%' }} valign="top">
                                                    :
                                                </td>
                                                <td align="justify" style={{ fontSize: '10pt', width: '80%' }} valign="top">
                                                    <span id="lblChecked" style={{ display: 'inline-block', fontSize: '10pt', width: '100%' }}>-</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="justify" style={{ fontSize: '10pt', width: '40%' }} valign="top">
                                                    Mark To
                                                </td>
                                                <td align="justify" style={{ fontSize: '10pt', width: '2%' }} valign="top">
                                                    :
                                                </td>
                                                <td align="justify" style={{ fontSize: '10pt', width: '80%' }} valign="top">
                                                    <span id="lblMarkTo" style={{ display: 'inline-block', fontSize: '10pt', width: '100%' }}>-</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="justify" style={{ fontSize: '10pt', width: '40%' }} valign="top">
                                                    &nbsp;
                                                </td>
                                                <td align="justify" style={{ fontSize: '10pt', width: '2%' }} valign="top" />
                                                <td align="justify" style={{ fontSize: '10pt', width: '80%' }} valign="top" />
                                            </tr>
                                            <tr>
                                                <td align="justify" style={{ fontSize: '10pt', width: '40%' }} valign="top">
                                                    &nbsp;
                                                </td>
                                                <td align="justify" style={{ fontSize: '10pt', width: '2%' }} valign="top" />
                                                <td align="right" style={{ fontSize: '10pt', width: '80%' }} valign="top">
                                                    Receipt Clerk
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            }
        </>
    )
}


const mapStateToProps = (state) => ({
    getApplicationDetailState: state.getApplicationDetail,
})
const mapDispatchToProps = (dispatch) => ({
    getApplicationDetail: (params) => dispatch(getApplicationDetail(params)),
})
export default connect(mapStateToProps, mapDispatchToProps)(PrintAcknowledgement)