import styled from "styled-components"
import { Steps } from 'antd'

const { Step } = Steps

export const Container = styled.div`
    width: 950px;
    padding: 16px;
    background: #fff;
    border: solid 1px #707070;
    margin-bottom: 48px;
    margin-top: 12px;
`
export const ServiceBar = styled.div`
    display: flex;
    align-items: center;
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
export const DetailContainer = styled.div`
     margin-left: 40px;
`

export const Title = styled.p`
    font-size: ${props => props.theme.fontSizes.lg};
    margin: 0;
    text-decoration: underline;
    font-weight: bold;
    margin: ${props => props.theme.spaces.xl} 0;
`

export const Xsteps = styled(Steps)`
    margin-left: 24px;

    .ant-steps-item-title {
        font-size: ${props => props.theme.fontSizes.md};
        color: #000 !important;
    }

    .ant-steps-item-process .ant-steps-item-icon > .ant-steps-icon .ant-steps-icon-dot {
        background: #bedb39;
        border: solid 1px #000000;
        width: 19px;
        height: 19px;
        margin: 0px 0px 0px -6px;
    }

    .ant-steps-item-wait .ant-steps-item-icon > .ant-steps-icon .ant-steps-icon-dot {
        background: #bedb39;
        border: solid 1px #000000;
        width: 19px;
        height: 19px;
        margin: 0px 0px 0px -6px;
    }

    
`

export const Xstep = styled(Step)`
    
`

export const DocumentUl = styled.ul`
    list-style-type: none;
    margin-bottom: ${props => props.theme.spaces.xxxl};
`

export const DocumentLi = styled.li`
    display: flex;
    align-items: center;
    margin-bottom: ${props => props.theme.fontSizes.sm};
    margin-left: ${props => props.theme.fontSizes.sm};
`
export const IconContainer = styled.span`
    background: #5bb518;
    border-radius: 5px;
    height: 20px;
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const DocumentTitle = styled.p`
    margin: 0;
    margin-left: ${props => props.theme.fontSizes.sm};
    font-size: ${props => props.theme.fontSizes.md};
`