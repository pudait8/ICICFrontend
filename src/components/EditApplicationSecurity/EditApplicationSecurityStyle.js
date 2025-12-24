import styled from "styled-components"

export const Container = styled.div`
    margin-top: ${props => props.theme.spaces.x5l};
    margin-bottom: ${props => props.theme.spaces.x5l};
    /* height:0; */
    /* overflow:hidden; */
`

export const Heading = styled.h3`
    font-size: ${props => props.theme.fontSizes.lg};
    font-weight: bold;
    border-bottom: solid 1px #70707063;
    padding-bottom: ${props => props.theme.fontSizes.sm};
`

export const Description = styled.p`
    font-size: ${props => props.theme.fontSizes.md};
`
