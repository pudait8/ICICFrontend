import styled from "styled-components"

export const Container = styled.div`
    margin-top: ${props => props.theme.spaces.x5l};
    margin-bottom: ${props => props.theme.spaces.x5l};
    transition: height 1s ease-out;
    height:0;
    overflow:hidden;
`

export const Heading = styled.h3`
    font-size: ${props => props.theme.fontSizes.lg};
    font-weight: bold;
    border-bottom: solid 1px #70707063;
    padding-bottom: ${props => props.theme.fontSizes.sm};
`

export const LoginContainer = styled.div`
    display: flex;
    margin-top: ${props => props.theme.spaces.x3l};
`

export const LeftSection = styled.div`
    flex: 0.5;
    padding-right: ${props => props.theme.spaces.x5l};
`

export const RightSection = styled.div`
    flex: 0.5;
    border-left: solid 1px #70707045;
    padding-left: ${props => props.theme.spaces.x5l};
    
`

export const Title = styled.h4`
    font-size: ${props => props.theme.fontSizes.md};
    color: ${props => props.theme.colors.textBlue};
    font-weight: bold;
`

export const Description = styled.p`
    font-size: ${props => props.theme.fontSizes.md};
    margin-bottom: ${props => props.theme.spaces.x5l};
`

export const ForgotPaswordText = styled.p`
    font-size: ${props => props.theme.fontSizes.sm};
    margin-top: ${props => props.theme.spaces.xsm};
`
