import React from 'react'
import PropTypes from 'prop-types'

import { Container, LeftSection, RightSection } from './FlexBarStyle'


const FlexBar = props => {

    const { leftContent, rightContent, spacingX, spacingY, background } = props

    return (
        <Container spacingX={spacingX} spacingY={spacingY} background={background}>
            <LeftSection>{leftContent}</LeftSection>
            <RightSection>{rightContent}</RightSection>
        </Container>
    )
}

FlexBar.propTypes = {
    leftContent: PropTypes.element,
    rightContent: PropTypes.element,
    spacingX: PropTypes.string,
    spacingY: PropTypes.string,
    background: PropTypes.string,
}

FlexBar.defaultProps = {
    leftContent: null,
    rightContent: null,
    spacingX: "",
    spacingY: "",
    background: "", //lightgray
}

export default FlexBar