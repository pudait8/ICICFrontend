import styled from 'styled-components'

export const Label = styled.label`
    color: ${props => props.theme.colors.textBlack};
    font-size: 14px;
`

export const Value = styled.label`
    color: ${props => props.theme.colors.textBlack};
    font-size: 14px;
    font-weight: 700;
    overflow-wrap: break-word;
    word-wrap: break-word;
`