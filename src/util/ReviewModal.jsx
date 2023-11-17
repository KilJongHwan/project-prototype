import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { FaStar } from "react-icons/fa";
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
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 0.3s;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  width: 50%;
  max-width: 500px;
  text-align: center;
  margin: auto;
  animation: ${slideUp} 0.5s;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #333;
`;

const StarRating = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  gap: 15px;
`;

const Star = styled(FaStar)`
  font-size: 32px;
  cursor: pointer;
`;
const TextArea = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 10px;
  margin-top: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  resize: none;
`;
const SubmitButton = styled.button`
  position: relative;
  display: inline-block;
  cursor: pointer;
  outline: none;
  border: 0;
  vertical-align: middle;
  text-decoration: none;
  font-size: inherit;
  font-family: inherit;
  font-weight: 600;
  color: #382b22;
  text-transform: uppercase;
  padding: 1.25em 2em;
  background: #e0e0e0;
  border: 2px solid #b3b3b3;
  border-radius: 0.75em;
  transform-style: preserve-3d;
  transition: transform 150ms cubic-bezier(0, 0, 0.58, 1),
    background 150ms cubic-bezier(0, 0, 0.58, 1);
  &:before {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #d4d4d4;
    border-radius: inherit;
    box-shadow: 0 0 0 2px #b3b3b3, 0 0.625em 0 0 #c0c0c0;
    transform: translate3d(0, 0.75em, -1em);
    transition: transform 150ms cubic-bezier(0, 0, 0.58, 1),
      box-shadow 150ms cubic-bezier(0, 0, 0.58, 1);
  }
  &:hover {
    background: #c0c0c0;
    transform: translate(0, 0.25em);
    &:before {
      box-shadow: 0 0 0 2px #b3b3b3, 0 0.5em 0 0 #b3b3b3;
      transform: translate3d(0, 0.5em, -1em);
    }
  }
  &:active {
    background: #a9a9a9;
    transform: translate(0em, 0.75em);
    &:before {
      box-shadow: 0 0 0 2px #b3b3b3, 0 0 #a9a9a9;
      transform: translate3d(0, 0, -1em);
    }
  }
`;

const ReviewModal = ({ isOpen, closeModal, onSubmit }) => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const reviewTextChange = (e) => {
    setReviewText(e.target.value);
  };
  const ratingChange = (value) => {
    setRating(value);
  };

  const mouseEnter = (value) => {
    setHoverRating(value);
  };

  const mouseLeave = () => {
    setHoverRating(0);
  };

  const submitReview = () => {
    if (!reviewText.trim()) {
      // 텍스트가 비어 있는지 확인
      alert("리뷰 내용을 입력해주세요.");
      return;
    }
    onSubmit({ rating, reviewText });
    closeModal();
    window.location.reload();
  };
  const modalClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal(); // 모달 바깥 부분 클릭 시 모달 닫기
    }
  };

  return (
    <>
      {isOpen && (
        <ModalWrapper onClick={modalClick}>
          <ModalContent>
            <CloseButton onClick={closeModal}>&times;</CloseButton>
            <h2>리뷰 작성</h2>
            <div>
              <StarRating>
                {[1, 2, 3, 4, 5].map((value) => (
                  <Star
                    key={value}
                    onClick={() => ratingChange(value)}
                    onMouseEnter={() => mouseEnter(value)}
                    onMouseLeave={mouseLeave}
                    color={
                      value <= (hoverRating || rating) ? "#AAB9FF" : "gray"
                    }
                  />
                ))}
              </StarRating>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <label htmlFor="reviewText"></label>
              <TextArea
                id="reviewText"
                value={reviewText}
                onChange={reviewTextChange}
                required
              />
            </div>
            <SubmitButton onClick={submitReview}>리뷰 제출</SubmitButton>
          </ModalContent>
        </ModalWrapper>
      )}
    </>
  );
};

export default ReviewModal;
