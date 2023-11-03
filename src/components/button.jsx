import React from "react";
import styled from "styled-components";

const Button = styled.button`
  position: relative;
  padding: 0;
  width: 200px;
  height: 200px;
  border: 4px solid #888888;
  outline: none;
  background-color: #f4f5f6;
  border-radius: 40px;
  box-shadow: -6px -20px 35px #ffffff, -6px -10px 15px #ffffff,
    -20px 0px 30px #ffffff, 6px 20px 25px rgba(0, 0, 0, 0.2);
  transition: 0.13s ease-in-out;
  cursor: pointer;

  &:active {
    box-shadow: none;
    .button__content {
      box-shadow: none;
      .button__text,
      .button__icon {
        transform: translate3d(0px, 0px, 0px);
      }
    }
  }
`;

const ButtonContent = styled.div`
  position: relative;
  display: grid;
  padding: 20px;
  width: 100%;
  height: 100%;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  box-shadow: inset 0px -8px 0px #dddddd, 0px -8px 0px #f4f5f6;
  border-radius: 40px;
  transition: 0.13s ease-in-out;
  z-index: 1;
`;

const ButtonIcon = styled.div`
  position: relative;
  display: flex;
  transform: translate3d(0px, -4px, 0px);
  grid-column: 4;
  align-self: start;
  justify-self: end;
  width: 32px;
  height: 32px;
  transition: 0.13s ease-in-out;

  svg {
    width: 32px;
    height: 32px;
    fill: #aaaaaa;
  }
`;

const ButtonText = styled.p`
  position: relative;
  transform: translate3d(0px, 0px, 0px);
  margin: 0;
  align-self: end;
  grid-column: 1/5;
  grid-row: 2;
  text-align: center;
  font-size: 32px;
  background-color: #888888;
  color: transparent;
  text-shadow: 2px 2px 3px rgba(255, 255, 255, 0.5);
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
  transition: 0.13s ease-in-out;
`;

const Credits = styled.p`
  margin-top: 50px;
`;

const ReferenceLink = styled.a`
  display: inline-block;
  border-bottom: 1px solid transparent;
  color: #0099ff;
  text-decoration: none;
  transition: ease-in 0.13s;

  &:hover {
    border-bottom-color: #0099ff;
  }
`;

const SVGButton = () => {
  return (
    <div>
      <Button>
        <ButtonContent>
          <ButtonIcon>
            <svg
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              width="80px"
              height="80px"
              viewBox="0 0 80 80"
              style={{ enableBackground: "new 0 0 80 80" }}
              xmlSpace="preserve"
            ></svg>
          </ButtonIcon>
          <ButtonText className="button__text">command</ButtonText>
        </ButtonContent>
      </Button>
      <Credits>
        Thanks{" "}
        <ReferenceLink href="https://twitter.com/pwign">Anh</ReferenceLink> for
        the inspiration
      </Credits>
    </div>
  );
};

export default SVGButton;
