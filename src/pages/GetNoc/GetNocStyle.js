import styled from "styled-components"

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

export const UpnNumberCard = styled.div`
    text-align: center;
    padding: 12px;
    margin-top: 10px;
    border-radius: 10px;
    border:dashed 1px #49cc49;
    background-color: #f3fdf3;
`

export const Label = styled.span`
    font-size: 16px;
    font-weight: bold;
`