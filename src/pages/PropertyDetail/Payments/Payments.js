import React from 'react'
import PropsTypes from 'prop-types'
import { CaretRightOutlined } from '@ant-design/icons'

import AllPayments from '../AllPayments/AllPayments'
import DuePayments from '../DuePayments/DuePayments'
import { Container } from './PaymentsStyle'
import { Xcollapse } from '../../../components/Xcomponents'
import ScrollBox from '../../../components/ScrollBox'

const Payment = props => {
    return (
        <ScrollBox>
            <Xcollapse defaultActiveKey={['1', '2']} ghost
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
            >
                <Xcollapse.Panel header="Due Payments" key="1" >
                    <DuePayments id={props.id} org={props.org} AuthToken={props.AuthToken} AuthTokenKey={props.AuthTokenKey} />
                </Xcollapse.Panel>
                <Xcollapse.Panel header="All Payments" key="2">
                    <AllPayments id={props.id} org={props.org} AuthToken={props.AuthToken} AuthTokenKey={props.AuthTokenKey} />
                </Xcollapse.Panel>
            </Xcollapse>
        </ScrollBox>
    )
}

Payment.PropsTypes = {
    id: PropsTypes.string,
    org: PropsTypes.string,
    AuthToken: PropsTypes.string,
    AuthTokenKey: PropsTypes.string,
}

Payment.defaultProps = {
    id: null,
    org: null,
    AuthToken: null,
    AuthTokenKey: null,
}
export default Payment