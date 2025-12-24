import React from 'react'
import { Row, Col } from 'antd'
import { Label, Value } from './LabelViewStyle'

const LabelView = props => {
    return (
        <Row gutter={[4, 0]}>
            <Col span={10}><Label>{props.label}</Label></Col>
            <Col span={13}><Value>{props.value}</Value></Col>
            <Col span={1}></Col>
        </Row>
    )
}

export default LabelView