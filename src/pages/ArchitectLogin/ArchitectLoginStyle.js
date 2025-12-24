import styled from "styled-components"

export const Container1 = styled.div`
    margin-top: ${props => props.theme.spaces.x5l};
    margin-bottom: ${props => props.theme.spaces.x5l};
    height:0;
    overflow:hidden;
`

export const Container = styled.div`
    width: 950px;
    padding: 16px;
    background: #fff;
    border: solid 1px #707070;
    margin-bottom: 48px;
    margin-top: 12px;
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

export const DetailContainer = styled.div`
     margin-left: 40px;
`

export const LeftSection = styled.div`
    width: 40px;
`
export const RightSection = styled.div`
`

export const ServiceBar = styled.div`
    display: flex;
    align-items: center;
`
export const ServiceName = styled.h3`
    font-size: ${props => props.theme.fontSizes.xl};
    margin: 0px;
    font-weight: bold;
`