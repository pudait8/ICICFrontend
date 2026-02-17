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
            {getApplicationDetailState.uiState === "ideal" && (
                (getApplicationDetailState.data.ApplicationTypeId === 1791 || getApplicationDetailState.data.ApplicationTypeId === 1796)
                    ? <BPPrintLayout data={getApplicationDetailState.data} />
                    : <DefaultAcknowledgement {...props} />
            )}

        </>
    )
}

const DefaultAcknowledgement = (props) => {
    const { getApplicationDetailState } = props
    return (
        <>
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
        </>
    )
}

const BPPrintLayout = ({ data }) => {

    const architectExtraDetails = React.useMemo(() => {
        if (!data.BuildingApplicationDetails?.ExtraDetails) return null;

        try {
            const d = JSON.parse(data.BuildingApplicationDetails.ExtraDetails);
            return d.architectName || d.certificateNo ? d : null;
        } catch {
            return null;
        }
    }, [data.BuildingApplicationDetails?.ExtraDetails]);


    const styles = {
        page: {
            width: "800px",
            margin: "0 auto",
            fontFamily: "Arial, Helvetica, sans-serif",
            fontSize: "12px",
            color: "#000"
        },
        headerBar: {
            background: "#2f96b4",
            color: "#000",
            padding: "12px",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "16px",
            position: "relative"
        },
        subHeader: {
            textAlign: "center",
            fontWeight: "bold",
            margin: "15px 0",
            fontSize: "14px"
        },
        table: {
            width: "100%",
            borderCollapse: "collapse"
        },
        td: {
            padding: "6px",
            verticalAlign: "top"
        },
        label: {
            fontWeight: "bold",
            whiteSpace: "nowrap"
        },
        section: {
            background: "#d3d3d3",
            fontWeight: "bold",
            padding: "6px"
        },
        checklist: {
            paddingLeft: "20px",
            lineHeight: "18px"
        },
        note: {
            marginTop: "15px",
            fontSize: "11px",
            fontWeight: "bold"
        }
    }

    return (
        // <div style={styles.page}>
        <div
            style={{
                ...styles.page,
                backgroundColor: "#fff",
                padding: "20px",
                minHeight: "100vh"
            }}
        >
            {/* HEADER */}
            <div style={styles.headerBar}>
                {data.PropertyDetails.AuthorityName}<br />
                <span style={{ fontSize: "14px" }}>ਗਰੇਟਰ ਮੋਹਾਲੀ ਏਰੀਆ ਡਿਵੈਲਪਮੈਂਟ ਅਥਾਰਿਟੀ</span>
            </div>

            <div style={styles.subHeader}>
                {/* Acknowledgement Receipt under Self-Certification Scheme */}
                Auto Sanction-Cum-Acknowledgement Slip
            </div>

            {/* APPLICATION INFO */}
            <table style={styles.table}>
                <tbody>
                    <tr>
                        <td style={styles.td}><span style={styles.label}>Application No.:</span> {data.ApplicationNo}</td>
                        <td style={styles.td} align="right">
                            <span style={styles.label}>Date:</span> {data.ApplicationDate}
                        </td>
                    </tr>
                </tbody>
            </table>

            {/* APPLICATION DETAILS */}
            <table style={styles.table}>
                <tbody>
                    <tr>
                        <td colSpan={4} style={styles.section}>Application Details -</td>
                    </tr>
                    <tr>
                        <td style={{ ...styles.td, width: "20%" }}>Application Type :</td>
                        <td style={styles.td} colSpan={3}>{data.ApplicationName}</td>
                    </tr>
                </tbody>
            </table>

            {/* PROPERTY DETAILS */}
            <table style={styles.table}>
                <tbody>
                    <tr>
                        <td colSpan={4} style={styles.section}>Property Details -</td>
                    </tr>
                    <tr>
                        <td style={styles.td}>Scheme Name :</td>
                        <td style={styles.td}>{data.PropertyDetails?.SchemeName}</td>
                        <td style={styles.td}>Plot No :</td>
                        <td style={styles.td}>{data.PropertyDetails?.PlotNumber}</td>
                    </tr>
                    <tr>
                        <td style={styles.td}>Area :</td>
                        <td style={styles.td}>{data.PropertyDetails?.Area}</td>
                        <td style={styles.td}>Sale Type :</td>
                        <td style={styles.td}>{data.PropertyDetails?.SaleType}</td>
                    </tr>
                    <tr>
                        <td style={styles.td}>Property Type :</td>
                        <td style={styles.td}>{data.PropertyDetails?.PropertyType}</td>
                        <td style={styles.td}>LOI Number :</td>
                        <td style={styles.td}>{data.PropertyDetails?.LOINumber}</td>
                    </tr>
                    <tr>
                        <td style={styles.td}>LOI Date :</td>
                        <td style={styles.td}>{data.PropertyDetails?.LOIDate}</td>
                        <td style={styles.td}>Total Fee Paid :</td>
                        <td style={styles.td}>{data.BuildingApplicationDetails?.TotalAmount ?? 0}</td>
                        <td />
                        <td />
                    </tr>
                </tbody>
            </table>

            {/* APPLICANT DETAILS */}
            <table style={styles.table}>
                <tbody>
                    <tr>
                        <td colSpan={4} style={styles.section}>Applicants Details -</td>
                    </tr>
                    <tr>
                        <td style={styles.td}>Applicant Name :</td>
                        <td style={styles.td} colSpan={3}>{data.ApplicantDetails?.Name}</td>
                    </tr>
                </tbody>
            </table>

            {/* Architect DETAILS */}
            {/* Architect DETAILS */}
            {(
                (data?.ApplicationTypeId === 1791 ||
                    data?.ApplicationTypeId === 1796) &&
                architectExtraDetails
            ) && (
                    <table style={styles.table}>
                        <tbody>
                            <tr>
                                <td colSpan={4} style={styles.section}>
                                    Architect Details -
                                </td>
                            </tr>
                            <tr>
                                <td style={styles.td}>
                                    Architect Name : {architectExtraDetails.architectName ?? "N/A"}
                                </td>
                                <td style={styles.td} colSpan={3}>
                                    Certificate No. : {architectExtraDetails.certificateNo ?? "N/A"}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                )}

            {/* COMMUNICATION */}
            <table style={styles.table}>
                <tbody>
                    <tr>
                        <td colSpan={4} style={styles.section}>Communication Details -</td>
                    </tr>
                    <tr>
                        <td style={styles.td}>Mobile Number :</td>
                        <td style={styles.td}>{data.ApplicantDetails?.MobileNo}</td>
                        <td style={styles.td}>Email Address :</td>
                        {
                            (data.ApplicantDetails?.EmailId &&
                                data.ApplicantDetails.EmailId !== "-"
                                ? data.ApplicantDetails.EmailId
                                : data.PurchaserDetails?.find(
                                    item => item.EmailAddress && item.EmailAddress !== "-"
                                )?.EmailAddress) || "-"
                        }

                    </tr>
                </tbody>
            </table>

            {/* CHECKLIST */}
            <table style={styles.table}>
                <tbody>
                    <tr>
                        <td colSpan={4} style={styles.section}>Checklist of Uploaded Documents -</td>
                    </tr>
                    <tr>
                        <td colSpan={4} style={styles.td}>
                            <ol style={styles.checklist}>
                                {(data.Documents || []).map((doc, i) => (
                                    <li key={doc.DocumentId || i}>
                                        {doc.Name || doc.FileName || "Document"}
                                    </li>
                                ))}
                            </ol>
                        </td>
                    </tr>
                </tbody>
            </table>

            {/* NOTES */}
            <div style={styles.note}>
                Note: <br />
                1. All the required documents as mentioned in the checklist are duly filled and attested by the applicant.<br />
                2. This is computer generated automatic receipt vide application No. {data.ApplicationNo}. NO Signature Is Required.<br />
                3.In reference to subject cited above, the documents have been received and are being kept in this office for record with understanding that these plans have been prepared as per the terms and conditions of allotment letter, zoning plan and have also been prepared within the framework of provisions of applicable building rules.
            </div>

        </div>
    )
}



const mapStateToProps = (state) => ({
    getApplicationDetailState: state.getApplicationDetail,
})
const mapDispatchToProps = (dispatch) => ({
    getApplicationDetail: (params) => dispatch(getApplicationDetail(params)),
})
export default connect(mapStateToProps, mapDispatchToProps)(PrintAcknowledgement)