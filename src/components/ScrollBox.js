import React, { useEffect, useState } from 'react'
import windowDimensions from './windowDimensions'

const ScrollBox = (props) => {

    const [adminHeaderHeight, setAdminHeaderHeight] = useState(0)
    const [adminSubHeaderHeight, setAdminSubHeaderHeight] = useState(0)
    const [adminSubHeader2Height, setAdminSubHeader2Height] = useState(0)

    useEffect(() => {
        if (document.getElementById('adminHeader')) {
            setAdminHeaderHeight(document.getElementById('adminHeader').offsetHeight)
        } else {
            setAdminHeaderHeight(0)
        }

        if (document.getElementById('adminSubHeader')) {
            setAdminSubHeaderHeight(document.getElementById('adminSubHeader').offsetHeight)
        } else {
            setAdminSubHeaderHeight(0)
        }

        if (document.getElementById('adminSubHeader2')) {
            setAdminSubHeader2Height(document.getElementById('adminSubHeader2').offsetHeight)
        } else {
            setAdminSubHeader2Height(0)
        }
    }, [])

    const { pageHeight } = windowDimensions()

    return (
        <div style={{
            "height": pageHeight - adminHeaderHeight - adminSubHeaderHeight - adminSubHeader2Height,
            "overflowX": 'hidden',
            "overflowY": 'auto',
            "backgroundColor": '#fff'
        }}
        >
            {
                (props.spacingTop) &&
                <div style={{ height: `${props.spacingTop}rem` }} />
            }

            {props.children}
        </div>
    )
}

export default ScrollBox
