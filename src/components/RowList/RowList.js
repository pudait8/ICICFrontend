import React from 'react'
import { PropTypes } from 'prop-types'
import { RightOutlined } from '@ant-design/icons'
import { Space, Tag } from "antd"

import { Container, LeftSection, RightSection, Title, SubTitle, IconContainer, ContentOnHover, TitleContaiiner, StatusContainer } from './RowListStyle'

const RowList = props => {
    return (
        <Container>
            <LeftSection>
                <IconContainer bg={props.iconBg}>{props.img}</IconContainer>
            </LeftSection>
            <RightSection>
                <TitleContaiiner>
                    <Title>{props.title}</Title>
                    <StatusContainer>{props.status}</StatusContainer>
                </TitleContaiiner>
                {
                    props.subTitles.map(text => {
                        return <SubTitle>{text}</SubTitle>
                    })
                }
            </RightSection>
            {props.displayContentOnHover &&
                <ContentOnHover>{props.contentOnHover} <RightOutlined style={{ fontSize: '12px' }} /></ContentOnHover>
            }
        </Container>
    )
}

RowList.propTypes = {
    img: PropTypes.element,
    iconBg: PropTypes.string,
    title: PropTypes.string,
    status: PropTypes.element,
    subTitles: PropTypes.array,
    displayContentOnHover: PropTypes.bool,
    contentOnHover: PropTypes.string,
}

RowList.defaultProps = {
    img: null,
    iconBg: "#ffffff",
    title: "",
    status: null,
    subTitles: [],
    displayContentOnHover: true,
    contentOnHover: "Details"
}

export default RowList