import styled, { css } from 'styled-components'

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: ${props => props.spacingY ? props.spacingY : 0};
    padding-bottom: ${props => props.spacingY ? props.spacingY : 0};
    padding-left: ${props => props.spacingX ? props.spacingX : 0};
    padding-right: ${props => props.spacingX ? props.spacingX : 0};
    width: 100%;
    

    ${props => props.background && css`
        ${props => props.background === "lightgray" && css`
            background: ${props => props.theme.colors.lightgray};
        `}
    `}
`

export const LeftSection = styled.div`
    display: flex;
    align-items: center;
`

export const RightSection = styled.div`
    display: flex;
    align-items: center;
`