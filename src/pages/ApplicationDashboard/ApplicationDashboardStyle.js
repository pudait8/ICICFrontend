import styled from "styled-components"
import { Table } from "antd"

export const Container = styled.div`
    width: 1200px;
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

export const ApplicationDetails = styled.div`
    border: 1px solid #000;
    display: flex;
    border-radius: 6px;
    padding: 8px;
`

export const ApplicationDetailWidget = styled.div`
    width: 20%;
    text-align: center;
    border-right: ${props => props.border ? '1px solid #f0f0f0' : 'none'};
`

export const WidgetValue = styled.h2`
    margin-bottom: 0px;
    color: ${props => props.theme.colors.blue};
`

export const WidgetText = styled.div`
`

export const BlankSpace = styled.div`
    height: 20px;
`
export const TableColumnName = styled.h3`
    font-family: Helvetica;
    font-weight: bold;
    font-size: 0.8em;
    color: rgb(0 0 0 / 1);
    /* text-align: center */
`
export const ApplicationDashboardTable = styled(Table)`
    .ant-table-thead > tr > th {
        font-family: Helvetica;
        color: rgb(0 0 0 / 1);
        background-color: #ffffff;
    }
`