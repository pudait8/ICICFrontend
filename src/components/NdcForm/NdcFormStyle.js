import styled from "styled-components"
import { Input, Space } from "antd"

export const Container = styled.div`
    margin-top: ${props => props.theme.spaces.x5l};
    margin-bottom: ${props => props.theme.spaces.x5l};
`

export const Heading = styled.h3`
    font-size: ${props => props.theme.fontSizes.lg};
    font-weight: bold;
    border-bottom: solid 1px #70707063;
    padding-bottom: ${props => props.theme.fontSizes.sm};
`




//from application style
export const Title = styled.h3`
    font-weight: bold;
    margin: 2rem 0;
`

export const Label = styled.span`
    font-size: 14px;
    color: black;
`

export const Xspace = styled(Space)`
.ant-space-item{
    margin-bottom: 2px !important;
}
`

export const Lvalue = styled.span`
    margin-left: 5px;
    font-size: 14px;
`


export const PaymentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const DemandNoteDate = styled.div`
    font-size: 12px;
    color: ${props => props.theme.colors.gray};
`

export const Footer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 0.5rem;

    .ant-alert-with-description.ant-alert-no-icon {
        padding: 5px 10px;
    }
`

export const TotalLabel = styled.span`
    margin-right: 0.5rem;
`

export const TotalAmount = styled.span`
    margin-right: 0.5rem;
    font-size: 14px;
    font-weight: bold;
`

export const ClarificationDiv = styled.div`
    border: 1px solid #707070;
    border-radius: 8px;
    display: inline-block;
    width:600px;
`

export const ClarificationAction = styled.div`
    border: none;
    margin: 5px;
        display: flex;
    justify-content: flex-end;
    align-items: center;
`

export const ClarificationTextarea = styled(Input.TextArea)`
    border: none;
    resize: none;
    border-radius: 20px !important;
    
    &:hover {
        border: none;
        box-shadow: none;
    }
    &:focus {
        border: none;
        box-shadow: none;
    }
    
`