import styled, { css, keyframes } from "styled-components"
import { Tabs, Button, Input, Form, Checkbox, Skeleton, Table, Steps, Collapse, Pagination, Upload } from "antd"
import { Link } from "react-router-dom"

const Password = Input.Password

export const XTabs = styled(Tabs)`

    .ant-tabs-nav {
        margin: 0;
    }

    .ant-tabs-tab {
        margin: 0 12px 0 12px;
    }

    .ant-tabs-tab .ant-tabs-tab-btn {
        color: #000000;
    }

    .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
        color: #000000;
    }

    .ant-tabs-tab .ant-tabs-tab-btn .sub-tabs-icon svg {
		width: 14px;
	    height: 12px;
        margin-right: 10px;
        fill: #ffffffc7;
    }
    
    .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn .sub-tabs-icon svg {
        fill: #ffffff;
	}

    .ant-tabs-ink-bar {
        height: 3px !important;
        border-radius: 2px;
        background: #74bf98;
        margin-bottom: 0;
    }

`

export const Xtabs = styled(Tabs)`
    .ant-tabs-nav {
        margin: 0px;
        width: fit-content;
    }

    .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
        color: #fff !important;
        font-size: 18px;
    }

    .ant-tabs-tab-btn {
        color: #fff !important;
        font-size: 18px;
    }

    .ant-tabs-nav::before, .ant-tabs-bottom > .ant-tabs-nav::before, .ant-tabs-top > div > .ant-tabs-nav::before, .ant-tabs-bottom > div > .ant-tabs-nav::before {
        border-bottom: 1px solid ${props => props.theme.colors.blue};
    }

    .ant-tabs-ink-bar {
        background: #fff;
    }
`

export const BlueButton = styled(Button)`
    background: ${props => props.theme.colors.blue};
    height: 38px;
    color: #fff;
    border-color: ${props => props.theme.colors.blue};

    &:hover, 
    &:active, 
    &:focus {
        border-color: ${props => props.theme.colors.blue};
        color: #fff;
        background: ${props => props.theme.colors.blueHover};
    } 

    span {
        margin-top: -1px;
        padding: 4px 12px;
    }
`

export const PrimaryButton = styled(Button)`
    height: 44px;

    span {
        padding: 0px 4px;
    }
    /* background: ${props => props.theme.colors.primary}; */
     /* border-color: ${props => props.theme.colors.primary}; */
`

export const GhostButton = styled(Button)`
    background: ${props => props.theme.colors.white};
    height: 38px;
    color: ${props => props.theme.colors.black};
    border-color: ${props => props.theme.colors.black};

    &:hover, 
    &:active, 
    &:focus {
        border-color: ${props => props.theme.colors.black};
        color: ${props => props.theme.colors.black};
        background: ${props => props.theme.colors.whiteHover};
    } 

    span {
        margin-top: -1px;
        padding: 4px 12px;
    }
`


export const CenteredColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`

export const BlankSpace = styled.div`
    height: ${props => props.theme.blankSpace.x3l};

    ${props => props.xxl && css`
        height: 50px;
    `}
`

export const BlueLink = styled(Link)`
    color: ${props => props.theme.colors.textBlue};
    font-weight: bold;
    
    &:hover {
        color: ${props => props.theme.colors.textBlueHover};
    }
`

export const FormItem = styled(Form.Item)`
    .ant-form-item-label {
        /* margin-left: 16px; */
        font-weight: bold;
        color: #000000bd;
    }
`

export const Xcheckbox = styled(Checkbox)`
    
`

export const CheckboxContainer = styled.div`
    margin-bottom: ${props => props.theme.spaces.sm};

    .ant-checkbox, .ant-checkbox-inner {
        height: 20px;
        width: 20px;
        border-radius: 3px;
    }

    .ant-checkbox-checked .ant-checkbox-inner::after {
        margin-left: 2px;
    }
`

export const CheckboxLabel = styled.label`
    margin-left: 8px;
    font-size: ${props => props.theme.fontSizes.sm};
    font-weight: bold;
`

export const DynamicSkeleton = styled(Skeleton.Input)`
    width: ${props => props.w ? props.w : "100%"};
    height: 100%;

    .ant-skeleton-input {
        height: ${props => props.h ? props.h : "15px"};
    }
`

export const XSteps = styled(Steps)`
    /* .ant-steps-item-active .ant-steps-item-container .ant-steps-item-icon, */
    .ant-steps-item-finish .ant-steps-item-container .ant-steps-item-icon {
        background: ${props => props.theme.colors.green};
        border: none;
    }

   
    .ant-steps-item-finish .ant-steps-item-container .ant-steps-item-tail {
        background: ${props => props.theme.colors.green};
        height: 0px;
        padding: 2px;
        margin-top: 5px;
        width: 93%;
    }
.ant-steps-item-process .ant-steps-item-container .ant-steps-item-tail,    
.ant-steps-item-wait .ant-steps-item-container .ant-steps-item-tail {
        height: 0px;
        padding: 3.5px 0px 3.5px 10px;
        margin-top: 5px;
        width: 93%;
    }


    /* .ant-steps-item-process > .ant-steps-item-container > .ant-steps-item-tail::after, */
    .ant-steps-item-finish > .ant-steps-item-container > .ant-steps-item-tail::after {
        background-color: ${props => props.theme.colors.green};
        height: 0;
    }
    
    .ant-steps-item-icon .anticon-check {
        color: ${props => props.theme.colors.white};
    }

    .ant-steps-item-title {
        font-size: 16px;
        font-weight: bold;
        line-height: 20px;
        color: ${props => props.theme.colors.black};
    }

    .ant-steps-item-title .ant-steps-item-subtitle {
        font-size: 12px;
        color: ${props => props.theme.colors.gray};
    }
`
const rippleKeyframes = keyframes`
    /* 0% {
        box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.75);
    }
    100% {
        box-shadow: -12px 3px 56px 0px rgba(0,0,0,0.75);
    } */

    0% {
        transform: scale(0.8);
        opacity: 0.5;
    }
    100% {
        transform: scale(2.4);
        opacity: 0;
    }
`

export const XDotSteps = styled(Steps)`
    .ant-steps-item-active .ant-steps-item-container .ant-steps-item-icon .ant-steps-icon-dot,
    .ant-steps-item-active .ant-steps-item-container .ant-steps-item-icon .ant-steps-icon-dot,
    .ant-steps-item .ant-steps-item-container .ant-steps-item-icon .ant-steps-icon-dot {
        background: ${props => props.theme.colors.darkGray};
        border: none;
        height: 10px;
        width: 10px;
    }
    .ant-steps-vertical > .ant-steps-item > .ant-steps-item-container > .ant-steps-item-tail::after {
    width: 2px !important;
}
.ant-steps-vertical > .ant-steps-item > .ant-steps-item-container > .ant-steps-item-tail{
    left: -8px;
}
    .ant-steps-item.show-ripple .ant-steps-item-container .ant-steps-item-icon .ant-steps-icon-dot::after{
        border: 6px solid #1890ff !important;
    }
    .ant-steps-item-wait > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title {
        color: ${props => props.theme.colors.textBlack};
        font-weight: bold;
        font-size: 14px;
    }

    .ant-steps-item-process > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title {
        font-size: 16px;
        font-weight: bold;
        color: ${props => props.theme.colors.textBlack};
    }

    .ant-steps-item.show-ripple .ant-steps-item-container .ant-steps-item-icon .ant-steps-icon-dot::after {
        position: absolute;
        top: -1px;
        left: -1px;
        width: 100%;
        height: 100%;
        border: 1px solid #1890ff;
        border-radius: 50%;
        animation: ${rippleKeyframes} 1.2s infinite ease-in-out;
        content: '';
    }
    .ant-steps-item-finish > .ant-steps-item-container > .ant-steps-item-tail,
    .ant-steps-item-process > .ant-steps-item-container > .ant-steps-item-tail,
    .ant-steps-item-wait > .ant-steps-item-container > .ant-steps-item-tail{
        left: -8px !important;
    }
    .ant-steps-item-process > .ant-steps-item-container > .ant-steps-item-tail::after {
        background-color: #000;
        opacity: 0.3;
    }
    .ant-steps-item-wait > .ant-steps-item-container > .ant-steps-item-tail::after {
        background-color: #000;
        opacity: 0.3;
    }
`
export const Xbutton = styled(Button)`
    padding: 0px 1rem;
    height: 2.1rem;
    border-radius: 0.5rem;
    font-weight: 600;
    border: none;
    background-color: rgb(175 175 175 / 0.75);
    color: #000000;

    &:hover,
    &:active,
    &:focus {
        background-color: rgb(175 175 175 / 1);
        color: #000000;
    }
`

export const GreenButton = styled(Xbutton)`
    height: 44px;
    background-color: #a3d116;
    color: #ffffff;
    &:hover,
    &:active,
    &:focus {
        background-color: #99c317;
        color: #ffffff;
    }
`

export const OrangeButton = styled(Xbutton)`
    background-color: ${props => props.theme.colors.orange};
    color: #ffffff;
    font-size: 13px;
    &:hover,
    &:active,
    &:focus {
        background-color: ${props => props.theme.colors.orange};
        color: ${props => props.theme.colors.white};
        opacity: 0.8;
    }
`
export const FlexDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    ${props => props.align === "left" && css`
        justify-content: flex-start;
    `}

    ${props => props.align === "right" && css`
        justify-content: flex-end;
    `}

    ${props => props.ml && css`
        margin-left: ${props.ml};
    `}

    ${props => props.mr && css`
        margin-left: ${props.mr};
    `}

    ${props => props.mt && css`
        margin-top: ${props.mt};
    `}

    ${props => props.mb && css`
        margin-bottom: ${props.mb};
    `}

    ${props => props.my && css`
        margin: ${props.my} 0;
    `}

    ${props => props.mx && css`
        margin: 0 ${props.mx};
    `}
`
export const Xtable = styled(Table)`
    .ant-table-thead > tr > th {
        font-family: Helvetica;
        font-weight: bold;
        color: rgb(0 0 0 / 1);
        background-color: #ffffff;
        font-size: 1.17em;
        padding: 0.5rem 1rem;
        white-space: nowrap;
    }

    .ant-table-thead .ant-table-column-sorters {
        padding: 0;
    }

    .ant-table-tbody > tr > td {
        font-family: Helvetica;
        font-weight: normal;
        color: rgb(0 0 0 / 1);
        background-color: #ffffff;
         font-size: 1.17em;
        padding: 0.3rem 1rem;
    }
`

export const Ledgertable = styled(Table)`
    .ant-table-thead > tr > th {
        font-family: Helvetica;
        font-weight: bold;
        color: rgb(0 0 0 / 1);
        background-color: #ffffff;
        font-size: 0.9em;
        padding: 0.5rem 1rem;
        text-align: left !important;
        border-top: 1px solid #f0f0f0;
    }

    .ant-table-thead .ant-table-column-sorters {
        padding: 0;
    }

    .ant-table-tbody > tr > td {
        font-family: Helvetica;
        font-weight: normal;
        color: rgb(0 0 0 / 1);
        background-color: #ffffff;
         font-size: 0.9em;
        padding: 0.3rem 1rem;
    }
`

export const FlexRow = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
export const TextButton = styled(Xbutton)`
    background-color: white;
    color: rgb(0 0 0 / 0.75);
    box-shadow: none;

    &:hover,
    &:active,
    &:focus {
        background-color: white;
        color: rgb(0 0 0 / 1);
    }
`
export const Xlink = styled(Link)`
    font-weight: bold;
    margin: ${props => props.margin ? props.margin : "none"};
    margin-left: ${props => props.marginLeft ? props.marginLeft : "none"};
    white-space: ${props => props.noWrap ? "nowrap" : "initial"};
    color: ${props => props.black ? "rgb(0 0 0 / 0.75)" : "rgb(0 111 195 / 0.75)"};
    
    &:hover {
        color: ${props => props.black ? "rgb(0 0 0 / 1)" : "rgb(0 111 195 / 1)"};
    }
`

export const AnimatedSearch = styled(Input)`
    border-radius: 16px;
    width: 180px;
    transition: all 0.3s ease;

    &:focus-within {
        width: 220px;
    }
`
export const Xcollapse = styled(Collapse)`
    .ant-collapse-header {
        color: #000000;
        font-weight: bold;
        border-bottom: solid 1px #e6e6e6;
    }
`
export const Xpagination = styled(Pagination)`
    display: flex;
    justify-content: center;
    margin:1rem 0;
`

export const Xgrid = styled.div`
    display: flex;
	flex-flow: wrap;
`

export const XgridCard = styled.div`
    width: 33%;
    margin-bottom: 1rem;

    @media ${props => props.theme.device.tablet} {
        width: 50%;
    }

    
    @media ${props => props.theme.device.mobileL} {
        width: 100%;

        ${props => props.ml === 2 && css`
            width: 50%;
        `};
    }

     @media ${props => props.theme.device.mobileM} {
        width: 100%;

        ${props => props.mm === 2 && css`
            width: 100%;
        `};
    }
`

export const XgridCardRow = styled.div`
    width: 100%;
    margin-bottom: 1rem;
    `

export const Xskeleton = styled(Skeleton.Button)`

    margin-bottom: ${props => props.mb ? props.mb : 0};
    margin-right: ${props => props.mr ? props.mr : 0};

    ${props => props.type === "box" && css`
        width: 100%;
        height: 100%;

        .ant-skeleton-button {
            width: ${props => props.w ? props.w : "100%"};
            height: ${props => props.h ? props.h : "100%"};
            border-radius: ${props => props.br ? props.br : "0"};
        }
    `}

    ${props => props.type === "text" && css`
        width: ${props => props.w ? props.w : "100%"};
        height: ${props => props.h ? props.h : "100%"};

        .ant-skeleton-button {
            width: 100%;
            height: 100%;
        }
    `}
`
export const Xupload = styled(Upload)`
    .ant-upload.ant-upload-select-picture-card {
        border: none;
    }
    
    width: auto;
`
export const DocumentUploadSingle = styled(Upload)`
/* margin-left: 20px; */
    .ant-upload-list-item-card-actions {
        right: auto;
    }
    .ant-upload-list{
         width:100px;
         margin-right: 20px;
    }
    .ant-upload-list-item-card-actions-btn{
        opacity:1;
    }
`

export const DocumentUpload = styled(Upload)`
/* margin-left: 20px; */
    .ant-upload-list-item-card-actions {
        /* right: auto; */
    }
    .ant-upload-list{
        /* margin-left: 20px; */
         width:90%;
    }
    .ant-upload-list-item-card-actions-btn{
        opacity:1;
    }
    .ant-upload.ant-upload-select-picture-card{
        width: initial;
        height: initial;
        border: none;
    }
`

export const RedButton = styled(Button)`
    color: ${props => props.theme.colors.red};
    background-color: ${props => props.theme.colors.white};
    border-color: ${props => props.theme.colors.red};

    &:hover,
    &:active,
    &:focus {
        color: ${props => props.theme.colors.red};
        background-color: ${props => props.theme.colors.white};
        border-color: ${props => props.theme.colors.red};
        opacity: 0.8;
    }
`
export const WhiteButton = styled(Button)`
    color: ${props => props.theme.colors.black};
    background-color: ${props => props.theme.colors.white};
    border-color: ${props => props.theme.colors.white};

    &:hover,
    &:active,
    &:focus {
        color: ${props => props.theme.colors.black};
        background-color: ${props => props.theme.colors.white};
        border-color: ${props => props.theme.colors.white};
        opacity: 0.8;
    }
`
export const ValidationDiv = styled.div`
    margin-left: 6px;
    &.validate::after {
        margin-left: 4px;
        color: #ff4d4f;
        font-size: 16px;
        font-family: SimSun, sans-serif;
        content: '*';
        font-weight: 700;
    }
`
export const FileTitle = styled.h3`
    font-size: ${props => props.theme.fontSizes.md};
    display: flex;
    /* margin-bottom: 24px; */
`
export const Divider = styled.div`
    border-top: 1px solid rgba(0,0,0,0.2);
    margin-top: 40px;
    margin-bottom: 40px;
`