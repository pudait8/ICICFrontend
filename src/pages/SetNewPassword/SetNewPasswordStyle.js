import styled from "styled-components"

export const Container = styled.div`
    width: 950px;
    padding: 32px;
    background: #fff;
    border: solid 1px #707070;
    margin-bottom: 48px;
    margin-top: 12px;
`

export const Heading = styled.h1`
    font-size: ${props => props.theme.fontSizes.lg};
    font-weight: bold;
`

export const FormContainer = styled.div`
    max-width: 400px;
    margin-top: 32px;
`