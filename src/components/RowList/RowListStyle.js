import styled, { css } from 'styled-components'

export const ContentOnHover = styled.div`
    position: absolute;
    right: 1.5rem;
    top: 50%;
    transform: translateY(-50%);
    display: none;
    color: ${props => props.theme.colors.textBlack};
    background: #f5f5f5;
`

export const Container = styled.div`
    display: flex;
    padding: 1rem;
    border-radius: 10px;
    position: relative;

    &:hover {
        background: #f5f5f5;
        ${ContentOnHover} {
            display: block;
        }
    }

    @media ${props => props.theme.device.tablet} {
        &:hover {
            ${ContentOnHover} {
                display: none;
            }
        }
    }
`

export const LeftSection = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 0.5rem;
`

export const RightSection = styled.div`
    margin-left: 1.5rem;
`

export const IconContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    width: 60px;
    height: 60px;
    background: #c4e56d;
    background: ${props => props.bg};
`

export const TitleContaiiner = styled.div`
    display: flex;
    flex-flow: wrap;
`

export const StatusContainer = styled.span`
    margin-left: 5px;
`

export const Title = styled.span`
    font-family: Helvetica;
    font-size: 14px;
    font-weight: 600;
    color: ${props => props.theme.primaryTextColor};
    margin: 0;
`

export const SubTitle = styled.span`
    font-family: Helvetica;
    font-size: 14px;
    color: ${props => props.theme.secondaryTextColor};
    margin-right: 10px;
`