import { Button } from "antd"
import styled, { css } from "styled-components"

export const Container = styled.div`
    height: 60px;
    width: ${props => props.width}px;
    padding: 16px;
    background: #fff;
    border: solid 1px #7070707a;
    margin: auto;
    margin-top: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
export const TextContainer = styled.div`
`
export const ButtonContainer = styled.div`
`

export const LogoutButton = styled(Button)`
    background: #fff;
    color: ${props => props.theme.colors.primary};
    border-color: #fff;
    border-radius: 24px;

    &:hover, 
    &:active, 
    &:focus {
        border-color: #fff;
        color: ${props => props.theme.colors.primary};
        background: #fff;
    } 
`