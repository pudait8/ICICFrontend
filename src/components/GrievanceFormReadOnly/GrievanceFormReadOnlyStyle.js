import { Radio, Input, Checkbox } from "antd"
import styled from "styled-components"

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

export const QualificationRadio = styled(Radio)`
    white-space:normal;
    margin: 0 8px 0 0;
    display: inline-flex;
    align-items: baseline;
    .ant-radio{
        top:.2em;
        font-size: 14px;
    }
`
export const GrievanceTextarea = styled(Input.TextArea)`
    resize: none;
`
export const CheckboxData = styled(Checkbox)`
  margin-left: 0px  !important;
`