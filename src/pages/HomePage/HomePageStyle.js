import styled from "styled-components"
import { Input, Button, Collapse, } from "antd"
import { Link } from "react-router-dom"
const { Panel } = Collapse;


export const XPanel = styled(Panel)`
.ant-collapse-content-box{
    /* max-width: 523px; */
    /* overflow: scroll; */
    text-align: justify;
    div > table > tbody > tr > td {
        vertical-align: middle !important;
    }
}
`
export const ApplicationNumberInput = styled(Input)`
    padding: 8px;
    width: 200px;
    font-size: 16px;
`
export const ApplicationOtpNumberInput = styled(Input)`
    padding: 8px;
    width: 150px;
    font-size: 16px;
`

export const Container = styled.div`
    width: 950px;
    padding: 8px;
    background: #fff;
    border: solid 1px #7070707a;
    margin-bottom: 48px;
    margin-top: 12px;
    .blurpage{
        -webkit-filter: blur(2px);
  -moz-filter: blur(2px);
  -o-filter: blur(2px);
  -ms-filter: blur(2px);
  filter: blur(2px);
  background-color: #fff;
    }
`

export const ContentArea = styled.div`
    display: flex;
`
export const LeftSection = styled.div`
    flex: 0.65;
`

export const RightSection = styled.div`
    flex: 0.35;
`


export const InfoArea = styled.div`
    position: sticky;
    top: 150px;
`

export const InfoAreaNotice = styled.div`
    background: ${props => props.theme.colors.blue};
    padding: 10px;
    color: #fff;
    min-height: 500px;
    border-radius: 5px;
`

export const InfoAreaExternalMenus = styled.div`
    background: ${props => props.theme.colors.blue};
    padding: 10px;
    color: #fff;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap: 8px;
`

export const MainContent = styled.div`
    margin: 12px 24px 12px 24px;
`

export const Heading = styled.h1`
    font-size: ${props => props.theme.fontSizes.lg};
    font-weight: bold;
`

export const Description = styled.p`
    font-size: ${props => props.theme.fontSizes.md};
`


export const DocumentUl = styled.ul`
    list-style-type: none;
    margin-bottom: ${props => props.theme.spaces.xxxl};
`


export const DocumentLi = styled.li`
    display: flex;
    align-items: center;
    margin-bottom: ${props => props.theme.fontSizes.sm};
    border-bottom: solid 1px #70707036;
    padding-bottom: 10px;
    color: ${props => props.theme.colors.black};

    &:hover {
        color: ${props => props.theme.colors.blackHover};
    }
`
export const IconContainer = styled.span`
    background: #5bb518;
    border-radius: 5px;
    height: 20px;
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 16px;
`

export const DocumentTitle = styled.p`
    margin: 0;
    font-size: ${props => props.theme.fontSizes.md};
`

export const Item = styled.div`
    padding: 10px 12px;
    border-bottom: solid 1px #f5f5f5;
    width: 100%;
    border-radius: 5px;

    &:hover {
        background: #f5f5f5;
    }
`
export const TotalAuthority = styled.div`
    display: flex;
    gap: 10px;
`
export const Block = styled(Link)`
    display: flex;
    flex-direction: column;
    align-items: center;
    height:100%;
    justify-content:  space-between;
`
export const SpanHeaderLinking = styled.span`
    color: #fff;
    margin-bottom: 0.3em; 
    font-weight: 300px;
    text-align: center;
    flex:1 ;
    flex-direction:column ;
    justify-content:center ;
    align-items:center ;
    display:flex ;
     font-size:0.8em ;
`
export const SpanHeaderTotal = styled.span`
    color: #fff;
    margin-bottom: 0.3em; 
    font-weight: 300;
   
`
export const InfoAreaExternalMenusapplicationDashboard = styled.div`
    background: ${props => props.theme.colors.blue};
    color: #fff;
    border-radius: 5px;
    width:120px;
`