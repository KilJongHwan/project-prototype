import React from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(200px);
  }
  to {
    transform: translateY(0);
  }
`;

const ModalWrapper = styled.div`
  display: ${(props) => (props.open ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  align-items: center;
  justify-content: center;
  z-index: 99;
  animation: ${fadeIn} 0.5s;
`;

const ModalContent = styled.section`
  width: 90%;
  max-width: 450px;
  background-color: #fff;
  border-radius: 0.3rem;
  animation: ${slideUp} 0.5s;
`;

const ModalHeader = styled.header`
  position: relative;
  padding: 16px 64px 16px 16px;
  background-color: #f1f1f1;
  font-weight: 700;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 30px;
  font-size: 21px;
  font-weight: 700;
  text-align: center;
  color: #999;
  background-color: transparent;
  border: none;
`;

const ConfirmButton = styled.button`
  padding: 6px 12px;
  color: #fff;
  background-color: #6c757d;
  border-radius: 5px;
  font-size: 13px;
  margin: 0 4px;
`;

const ModalMain = styled.main`
  padding: 16px;
  border-bottom: 1px solid #dee2e6;
  border-top: 1px solid #dee2e6;
`;

const ModalFooter = styled.footer`
  padding: 12px 16px;
  text-align: right;
`;

const PurchaseModal = ({ isOpen, closeModal, onConfirm, action }) => {
  const modalClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  return (
    <ModalWrapper open={isOpen} onClick={modalClick}>
      <ModalContent>
        <ModalHeader>
          책 {action === "purchase" ? "구매" : "장바구니에 담기"}
          <CloseButton onClick={closeModal}>&times;</CloseButton>
        </ModalHeader>
        <ModalMain>
          이 책을{" "}
          {action === "purchase"
            ? "구매하시겠습니까?"
            : "장바구니에 담으시겠습니까?"}
        </ModalMain>
        <ModalFooter>
          <ConfirmButton onClick={onConfirm}>확인</ConfirmButton>
          <ConfirmButton onClick={closeModal}>취소</ConfirmButton>
        </ModalFooter>
      </ModalContent>
    </ModalWrapper>
  );
};

export default PurchaseModal;
