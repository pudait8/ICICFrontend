import styled from "styled-components";

export const Container = styled.div`
  margin: 2rem 4rem;
  max-width: 900px;

  @media ${(props) => props.theme.device.tablet} {
    margin: 2rem 0.5rem;
  }
`;

export const PDFBotton = styled.div`
  display: flex;
`;

export const PDFBottonPTag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PDFButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #006fc3;
  width: 40px;
  border: none;
`;
