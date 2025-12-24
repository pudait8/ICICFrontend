import styled from "styled-components"

export const Container = styled.div`
    width: 950px;
    padding: 16px;
    background: #fff;
    margin-bottom: 48px;
    margin-top: 12px;
    border: solid 1px #707070;
`

export const ServiceBar = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`

export const LeftSection = styled.div`
    width: 40px;
`
export const RightSection = styled.div`
`
export const ServiceName = styled.h3`
    font-size: ${props => props.theme.fontSizes.xl};
    margin: 0px;
    font-weight: bold;
`