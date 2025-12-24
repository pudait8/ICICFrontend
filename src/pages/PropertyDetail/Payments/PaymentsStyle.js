import styled from 'styled-components'

export const Container = styled.div`
    margin:  2rem 4rem;
    max-width: 900px;

    @media ${props => props.theme.device.tablet} {
        margin: 2rem  0.5rem;
    } 
`