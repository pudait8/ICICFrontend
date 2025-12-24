import React from "react"
import PropsTypes from "prop-types"
import { PlusOutlined } from "@ant-design/icons"

//comsponents
import { Container, BtnBorder, BtnLabel } from './BlankRoundButtonStyle'

const BlankRoundButton = props => {

    const handleClick = () => {
        props.onClick()
    }

    return (
        <Container onClick={handleClick}>
            <BtnBorder>
                <PlusOutlined />
            </BtnBorder>
            <BtnLabel>Add Legal Heir</BtnLabel>
        </Container>
    )
}

BlankRoundButton.propsTypes = {
    onClick: PropsTypes.func
}

BlankRoundButton.defaultProps = {
    onClick: () => { return }
}

export default BlankRoundButton