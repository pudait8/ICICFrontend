import React from 'react'

import { Container } from './AdminSubHeaderStyle'

const AdminSubHeader = props => {

    return (
        <Container id="adminSubHeader">{props.children}</Container>
    )
}

export default AdminSubHeader