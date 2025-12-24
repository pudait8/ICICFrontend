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
