import styled from 'styled-components'
import { Descriptions } from 'antd'

export const Container = styled.div`
    display: flex;
    flex-flow: column;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
`

export const Title = styled.h4`
    font-size: 16px;
    font-weight: bold;
    color: #2b2b2b;
    margin: 0;
    margin-top: 0.5rem;
    
    text-align: center;
`

export const Description = styled.p`
    font-size: 14px;
    color: #2b2b2b;
    margin: 0;
    text-align: center;
`

export const ActionContainer = styled.div`
    margin-top: 1rem;
`
