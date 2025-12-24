import { Input } from "antd"
import styled from "styled-components"

export const Container1 = styled.div`
    margin-top: ${props => props.theme.spaces.x5l};
    margin-bottom: ${props => props.theme.spaces.x5l};
    height:0;
    overflow:hidden;
`

export const Container = styled.div`
    width: 1050px;
    padding: 16px;
    background: #fff;
    border: solid 1px #707070;
    margin-bottom: 48px;
    margin-top: 12px;
`


export const DetailContainer = styled.div`
     margin-left: 10px;
     margin-right: 10px;
`


export const Name = styled.h2`
font-weight: 700;
margin-bottom: 0px;
`
export const ArchitectDetail = styled.h3`
margin-bottom: 0px;
display: flex;
`

export const ArchitectDetailKey = styled.div`
font-weight: 700;
width: 55px;
`
export const ArchitectDetailKeyMemo = styled.div`
font-weight: 700;
width: 140px;
`
export const ArchitectDetailValue = styled.div`
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

export const SearchInput = styled(Input)`
    border-radius: 5px;

    span {
        padding: 0px 16px;
    }

    .ant-input-suffix {
        padding: 0px;
    }
`

export const BlankSpace = styled.div`
        height: 20px;
`