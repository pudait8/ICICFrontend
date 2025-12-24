import styled from "styled-components"
import { Modal } from "antd"

export const Item = styled.div`
    padding: 10px 24px;
    border-bottom: solid 1px #f5f5f5;
    width: 100%;
    border-radius: 5px;

    &:hover {
        background: #f5f5f5;
    }
`

export const Xmodal = styled(Modal)`
    .ant-modal-body {
        padding: 0px;
    }

    .ant-modal-title {
        font-weight: bold;
    }
    
`