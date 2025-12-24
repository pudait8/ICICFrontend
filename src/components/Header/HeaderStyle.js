import { Button } from "antd";
import styled, { css } from "styled-components";

export const Container = styled.div`
  height: 148px;
  background: ${(props) => props.theme.colors.blue};
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const SubContainer = styled.div`
  width: 1280px;
  margin: auto;
  padding: 0px 42px 0px 42px;
`;

export const TopBar = styled.div`
  display: flex;
  width: 100% auto;
`;
export const TopBarLeftHeader = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  color: #fff;
  font-size: 20px;
  a {
    color: #fff;
  }
`;

export const TopBarLeft = styled.div`
  flex: 0.3;
`;

export const TopBarRight = styled.div`
  flex: 0.7;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
export const MenuItem = styled.span`
  font-size: 18px;
  color: #fff;

  ${(props) =>
    props.active &&
    css`
      color: ${(props) => props.theme.colors.blue};
      background: white;
      padding: 5px 10px;
      border-radius: 5px;
    `};
`;

export const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LogoutButton = styled(Button)`
  background: #fff;
  color: ${(props) => props.theme.colors.primary};
  border-color: #fff;
  border-radius: 24px;

  &:hover,
  &:active,
  &:focus {
    border-color: #fff;
    color: ${(props) => props.theme.colors.primary};
    background: #fff;
  }
`;
export const Heading = styled.h1`
  font-size: ${(props) => props.theme.fontSizes.md};
  margin-bottom: 0px;
  color: ${(props) => props.theme.colors.white};
  animation: 2s blinker linear infinite;
  -webkit-animation: 2s blinker linear infinite;
  -moz-animation: 2s blinker linear infinite;
  @-moz-keyframes blinker {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @-webkit-keyframes blinker {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes blinker {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

export const SocialIcon = styled.div`
  flex-direction: row;
  padding-right: 20px;
  padding-left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
`;
