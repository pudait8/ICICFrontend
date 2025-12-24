import { Upload, Input } from "antd"
import { Link } from "react-router-dom"
import styled from "styled-components"

export const Container = styled.div`
    width: 950px;
    padding: 16px;
    background: #fff;
    border: solid 1px #707070;
    margin-bottom: 48px;
    margin-top: 12px;
`

export const Title = styled.h3`
    font-size: ${props => props.theme.fontSizes.lg};
    font-weight: bold;
    margin: 0;
`

export const Status = styled.h3`
    font-size: ${props => props.theme.fontSizes.lg};
    font-weight: bold;
    color: #16b12d;
     margin: 0;
    margin-left: 8px;
`

export const SuccessBar = styled.div`
    display: flex;
    background: ${props => props.theme.colors.primary};
    padding: 10px;
    align-items: center;
`

export const SuccessBarText = styled.p`
    color: ${props => props.theme.colors.white};
    margin: 0;
    font-size: ${props => props.theme.fontSizes.md};
    margin-left: 16px;
    font-weight: bold;
`

export const Description = styled.p`
    margin: 0;
    font-size: ${props => props.theme.fontSizes.sm};
`

export const Heading = styled.h3`
    font-size: ${props => props.theme.fontSizes.lg};
    font-weight: bold;
    border-bottom: solid 1px #70707063;
    padding-bottom: ${props => props.theme.fontSizes.sm};
`

export const FileContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 1rem 0.5rem;

    &:hover {
        background: ${props => props.theme.colors.lightgray};
        cursor: pointer;
    }

    .title {
        margin: 0;
        margin-left: 0.8rem;
    }
`

export const ViewPlanLink = styled(Link)`
    color: ${props => props.theme.colors.blue};
    text-decoration: underline;
     &:hover {
       color: ${props => props.theme.colors.blue};
        text-decoration: underline;
    }
    font-weight: 700;
`
export const UploadButton = styled(Upload)`
    
`
export const GrievanceTextarea = styled(Input.TextArea)`
    resize: none;
`