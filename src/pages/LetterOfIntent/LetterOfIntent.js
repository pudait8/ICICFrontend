import React, { useState, useEffect } from "react"
import { CaretRightOutlined, FileImageFilled } from '@ant-design/icons'
import { connect } from "react-redux"
import Lottie from 'react-lottie'
import _ from "lodash"
import { Xcollapse, BlueButton } from '../../components/Xcomponents'
import ScrollBox from '../../components/ScrollBox'
import { DocumentIcon } from '../../components/CustomIcons'
import conf from '../../config'
import StatusCard from '../../components/StatusCard/StatusCard'
import RowListSkeleton from '../../components/RowListSkeleton/RowListSkeleton'
import RowList from '../../components/RowList/RowList'
import FlexBar from '../../components/FlexBar/FlexBar'
import folderAnimation from '../../Lottie/folder-animation.json'
import { verifyUpnAndMobileSubmitOtpResetState } from '../../actions/verifyUpnAndMobileSubmitOtpAction'
import { getOrgId } from '../../utils'
const LetterOfIntent = props => {

    //Variables
    const { verifyUpnAndMobileSubmitOtpState, verifyUpnAndMobileSubmitOtpResetState } = props
    const [referesh, setRefresh] = useState(0)
    const [loiScheme, setLoiScheme] = useState([])
    let randomColors = ["#c4e56d", "#e59b6d", "#b1e7ff"]
    const OrgId = getOrgId()
    // Callback
    useEffect(() => {
        if (verifyUpnAndMobileSubmitOtpState.apiState === "success") {

            let grouped_data = _.chain(verifyUpnAndMobileSubmitOtpState.data.LOILists)
                .groupBy("SchemeName")
                .map((value, key) => ({ scheme: key, list: value }))
                .value()
            setLoiScheme(grouped_data)
        }
    }, [verifyUpnAndMobileSubmitOtpState])

    useEffect(() => {
        return (() => {
            verifyUpnAndMobileSubmitOtpResetState()
        })
    }, [])

    //Function
    const DownloadLOIFile = (DocumentId, FileName) => {
        fetch(`${conf.api.base_url}DMS_DocumentService/GetLOIDocument?ApiKey=GetLOIDocument&OrgId=${OrgId}&IssuedDocumentId=${DocumentId}`, {
            method: 'POST',
            headers: {
                'AuthToken': verifyUpnAndMobileSubmitOtpState.AuthToken,
                'AuthTokenKey': verifyUpnAndMobileSubmitOtpState.AuthTokenKey
            }
        })
            .then(res => {
                if (res.status === 200) {
                    return res.blob()
                } else {
                    return null
                }
            })
            .then(blob => {
                if (blob) {
                    var url = window.URL.createObjectURL(blob)
                    var a = document.createElement('a');
                    a.href = url;
                    a.download = FileName
                    document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
                    a.click()
                    a.remove()  //afterwards we remove the element again    
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    const folderAnimationOptions = {
        loop: true,
        autoplay: true,
        animationData: folderAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }

    return (
        <ScrollBox>
            {loiScheme.length === 0 &&
                <span style={{ fontSize: 18 }}>No Letter of Intent issued on this mobile number.</span>
            }
            <Xcollapse defaultActiveKey={['0']} ghost
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
            >
                {loiScheme.length > 0 && loiScheme.map((groupKey, index) => (
                    <Xcollapse.Panel header={groupKey.scheme} key={index}>
                        {verifyUpnAndMobileSubmitOtpState.apiState === "loading" &&
                            <RowListSkeleton rows={10} />}

                        {verifyUpnAndMobileSubmitOtpState.data.LOILists === 0 &&
                            <FlexBar leftContent={
                                <>
                                    <Lottie
                                        options={folderAnimationOptions}
                                        height={80}
                                        width={80}
                                    />
                                    <span>No document uploaded.</span>
                                </>
                            } />}

                        {verifyUpnAndMobileSubmitOtpState.apiState === "success"
                            ?
                            [
                                groupKey.list.map(item => (
                                    <a onClick={() => DownloadLOIFile(item.IssuedDocumentId, item.FileName)}>
                                        <RowList
                                            img={<DocumentIcon />}
                                            iconBg={randomColors[~~(randomColors.length * Math.random())]}
                                            title={`Letter of Intent Number : ${item.LOINO}`}
                                            subTitles={[
                                                "LOI Date : " + item.LOIDate,
                                                "Issued Date : " + item.IssuedOn
                                            ]}
                                            contentOnHover={"Download"}
                                        //  "LOI Date : " + item.LOIDate + <br /> + "Issued Date : " + item.IssuedOn
                                        />
                                    </a>
                                ))
                            ]

                            : null
                        }

                        {verifyUpnAndMobileSubmitOtpState.apiState === "error" &&
                            <StatusCard title="Something is not right" action={<BlueButton onClick={() => setRefresh(referesh + 1)} >Try Again</BlueButton>} />
                        }
                    </Xcollapse.Panel>
                ))}
            </Xcollapse>
        </ScrollBox>
    )
}


const mapStateToProps = (state) => ({
    verifyUpnAndMobileSubmitOtpState: state.verifyUpnAndMobileSubmitOtp
});
const mapDispatchToProps = (dispatch) => ({
    verifyUpnAndMobileSubmitOtpResetState: () => dispatch(verifyUpnAndMobileSubmitOtpResetState()),
})

export default connect(mapStateToProps, mapDispatchToProps)(LetterOfIntent)