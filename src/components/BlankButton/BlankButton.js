import React from "react"
import PropsTypes from "prop-types"
import { PlusOutlined } from "@ant-design/icons"

//comsponents
import { Container, BtnBorder, BtnLabel } from './BlankButtonStyle'

const BlankButton = props => {

    const handleClick = () => {
        props.onClick()
    }

    return (
        <Container onClick={handleClick}>
            <BtnBorder>
                <PlusOutlined />
            </BtnBorder>
            <BtnLabel>{props.btnLabel}</BtnLabel>
        </Container>
    )
}

BlankButton.propsTypes = {
    onClick: PropsTypes.func,
    btnLabel: PropsTypes.element,
}

BlankButton.defaultProps = {
    onClick: () => { return },
    btnLabel: "Add"
}

export default BlankButton