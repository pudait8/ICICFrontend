import styled from "styled-components"
import { Form } from "antd"

export const Message = styled.span`
    margin-left: 10px;
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

export const TableContainer = styled.div`
    th, td {
        padding: 5px;
    }
`

export const PaymentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const PaymentProcessing = styled.div`
    color: #f5a623;
    font-weight: bold;
    margin-bottom: 1rem;
`