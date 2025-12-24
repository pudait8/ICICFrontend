import styled from "styled-components"

export const UploadContainer = styled.div`
    border: dashed 1px black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    border-radius: 5px;
`
export const ErrorContainer = styled.div`
    border: dashed 1px red;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    border-radius: 5px;
`

export const SuccessContainer = styled.div`
    border: dashed 1px green;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    border-radius: 5px;
    position: relative;
 

    .delete-container {
        display: none;
    }

    .delete-container span {
        color: white;
    }

    &:hover {
        .delete-container {
            display: block;
            position: absolute;
            width: 85%;
            height: 85%;
            background: black;
            opacity: 0.7;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 5px;
        }
    }
`

export const UploadWrapper = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;

   .title {
       text-align: center;
   }

   .display-validation > div > span > div {
       border: dashed 1px red;
   }
`

export const AsteriskMark = styled.span`
    color: red;
`

export const DeleteContainer = styled.div`
    position: absolute;
    height: 80px;
    width: 80px;
    background: black;
    border-radius: 5px;
    left: 46%;
    top: 48%;
    opacity: 0;
    transform: translate(-50%, -50%);
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const UploadArea = styled.div`
    position: relative;

    &:hover ${DeleteContainer} {
        opacity: 0.8;
        transition: opacity 0.5s;
    }
`