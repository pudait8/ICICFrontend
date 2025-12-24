import React from 'react'
import { PropTypes } from 'prop-types'

import { Container, Title, Description, ActionContainer } from './StatusCardStyle'


const StatusCard = props => {
    return (
        <Container>
            {props.graphics}
            {
                props.title &&
                <Title>{props.title}</Title>
            }
            {
                props.description &&
                <Description>{props.description}</Description>
            }
            {
                props.action &&
                <ActionContainer>{props.action}</ActionContainer>
            }
        </Container>
    )
}

StatusCard.propTypes = {
    graphics: PropTypes.element,
    title: PropTypes.string,
    description: PropTypes.string,
    action: PropTypes.element,
}

StatusCard.defaultProps = {
    graphics: null,
    title: "",
    description: "",
    action: null,
}

export default StatusCard