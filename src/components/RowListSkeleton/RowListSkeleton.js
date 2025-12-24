import React from 'react'
import PropTypes from 'prop-types'

import { Container, LeftSection, RightSection, IconContainer, Title, SubTitle } from './RowListSkeletonStyle'
import { Xskeleton } from '../Xcomponents'

const RowListSkeleton = props => {
    const RowSkeleton = () => (
        <Container>
            <LeftSection>
                <IconContainer><Xskeleton type="box" h="100%" br="10px" active /></IconContainer>
            </LeftSection>
            <RightSection>
                <Title><Xskeleton type="text" w="70%" h="25px" mb="5px" active /></Title>
                <SubTitle>
                    <Xskeleton type="text" w="100px" h="15px" mr="5px" active />
                    <Xskeleton type="text" w="100px" h="15px" active />
                </SubTitle>
            </RightSection>
        </Container>
    )

    let rs = []
    for (var row = 1; row <= props.rows; row++) {
        rs.push(<RowSkeleton />)
    }

    return rs
}

RowListSkeleton.propTypes = {
    rows: PropTypes.number,
}

RowListSkeleton.defaultProps = {
    rows: 4
}

export default RowListSkeleton