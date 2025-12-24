import styled from "styled-components"
import { Input } from "antd"

export const SearchInput = styled(Input)`
    height: 44px;
    border-radius: 5px;

    span {
        padding: 0px 16px;
    }

    .ant-input-suffix {
        padding: 0px;
    }
`

export const TopBar = styled.div`
    display: flex;
    margin-top: 48px;
    align-items: center;
`

export const TopBarLeft = styled.div`
    flex: 0.5;
`

export const TopBarRight = styled.div`
    flex: 0.5;
`

export const SeriveContainer = styled.div`
    
`

export const SeriveRow = styled.li`
    padding: 12px;
    border-bottom: solid 1px #70707036;
    border-radius: 5px;
    margin-left: 30px;
   

    &:hover {
        background: #f5f5f5;
    }
`

export const ServiceName = styled.span`
    color: ${props => props.theme.colors.black};
    font-size: 18px; 
    margin-left: 8px;
`