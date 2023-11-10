import styled, { css, keyframes } from "styled-components";
import KakaoColorImg from "../images/kakao_color.png";
import KakaoImg from "../images/kakao_white.png";
const slideInLeft = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideInRight = keyframes`
  from {
    transform: translateX(0);
    opacity: 0;
  }
  to {
    transform: translateX(100%);
    opacity: 1;
  }
`;
const slideLayLeft = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(-100%);
    opacity: 1;
  }
`;

const slideLayRight = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(100%);
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ebecf0;
  overflow: hidden;
`;

const Container = styled.div`
  display: flex;
  border-radius: 10px;
  box-shadow: -5px -5px 10px #fff, 5px 5px 10px #babebc;
  width: 768px;
  min-height: 480px;
  overflow: hidden;
  position: relative;
`;

const Form = styled.form`
  flex: 1;
  background: #ebecf0;
  display: flex;
  flex-direction: column;
  padding: 0 50px;
  justify-content: center;
  align-items: center;

  ${(props) =>
    props.$isRightPanelActive &&
    css`
      animation: ${slideInRight} 0.5s forwards;
    `}

  ${(props) =>
    !props.$isRightPanelActive &&
    css`
      animation: ${slideInLeft} 0.5s forwards;
    `}
`;

const Input = styled.input`
  background: #eee;
  padding: 16px;
  margin: 8px 0;
  width: 100%;
  border: 0;
  outline: none;
  border-radius: 20px;
  box-shadow: inset 7px 2px 10px #babebc, inset -5px -5px 12px #fff;
`;

const Button = styled.button`
  border-radius: 20px;
  border: none;
  outline: none;
  font-size: 12px;
  font-weight: bold;
  padding: 15px 45px;
  margin: 14px;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: transform 80ms ease-in;
  box-shadow: -5px -5px 10px #fff, 5px 5px 8px #babebc;

  &:active {
    box-shadow: inset 1px 1px 2px #babebc, inset -1px -1px 2px #fff;
  }
`;
const SocialLinks = styled.div`
  margin: 20px 0;
  display: flex;
`;

const SocialLink = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  border-radius: 50%;
  box-shadow: -5px -5px 10px #fff, 5px 5px 8px #babebc;
  cursor: pointer;
  background-image: url(${KakaoImg});
  background-size: cover;
  transition: background-image 0.5s ease-in-out;

  &:hover {
    background-image: url(${KakaoColorImg});
  }

  &:active {
    box-shadow: inset 1px 1px 2px #babebc, inset -1px -1px 2px #fff;
  }
`;

const OverlayButton = styled.button`
  background-color: #ff4b2b;
  color: #fff;
  border-radius: 20px;
  border: none;
  outline: none;
  font-size: 12px;
  font-weight: bold;
  padding: 15px 45px;
  cursor: pointer;
  transition: transform 80ms ease-in;
  box-shadow: -5px -5px 10px #ff6b3f, 5px 5px 8px #bf4b2b;
  &:active {
    box-shadow: inset 1px 1px 2px #bf4b2b, inset -1px -1px 2px #ff6b3f;
  }
`;

const Overlay = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 50px;
  justify-content: center;
  align-items: center;
  background-color: #ff4b2b;
  color: #fff;
  transition: all 0.5s;
`;

const OverlayLeft = styled(Overlay)`
  opacity: 0;
  transform: translateX(-100%);
  z-index: 1;
  ${(props) =>
    props.$isRightPanelActive &&
    css`
      animation: ${slideLayLeft} 0.5s forwards;
      transform: translateX(0);
      opacity: 1;
      z-index: 2;
    `}
`;

const OverlayRight = styled(Overlay)`
  transform: translateX(0);
  z-index: 1;
  ${(props) =>
    props.$isRightPanelActive &&
    css`
      animation: ${slideLayRight} 0.5s forwards;
      transform: translateX(100%);
      opacity: 1;
      z-index: 2;
    `}
`;
const ErrorText = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 4px;
`;

export {
  slideInLeft,
  slideInRight,
  slideLayLeft,
  slideLayRight,
  Wrapper,
  Container,
  Form,
  Input,
  Button,
  SocialLinks,
  SocialLink,
  OverlayButton,
  Overlay,
  OverlayLeft,
  OverlayRight,
  ErrorText,
};
