import React, { useEffect, useState } from "react";
import ReviewModal from "../util/ReviewModal";
import BookPurchase from "../components/PurchaseComponent";
import ReviewSection from "../components/ReviewComponent";
import LoginLogoutButton from "../components/LoginLogoutButtonComponent";
import { useUser } from "../context/Context";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../api/AxiosApi";

const BuyReviewPg = () => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]); // 리뷰 데이터를 관리하는 상태
  const { isLoggedin, checkLoginStatus, user } = useUser();
  const navigate = useNavigate();

  const bookInfo = {
    id: 21,
    title: "책 제목",
    author: "작가",
    publisher: "출판사",
    genre: "소설",
    imageUrl: "https://via.placeholder.com/160x100",
    contentUrl: "https://example.com/book-content",
    summary: "책 요약...",
    price: 15000,
    publishYear: new Date(2022, 0, 1), // 2022년 1월 1일
    entryTime: new Date(), // 현재 시간
    purchaseCount: 0,
  };

  useEffect(() => {
    checkLoginStatus();
  }, [isLoggedin]);
  const openReviewModal = () => {
    if (isLoggedin) {
      // 로그인 상태 확인
      setIsReviewModalOpen(true); // 로그인 상태라면 리뷰 모달 창 열기
    } else {
      // 로그인 상태가 아니라면 로그인 페이지로 이동
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  };

  const closeReviewModal = () => {
    setIsReviewModalOpen(false);
  };

  const reviewSubmit = async (reviewData) => {
    try {
      // 서버에 데이터 전송
      const response = await AxiosApi.reviewData(
        user.id, // 현재 사용자의 ID
        bookInfo.id, // 현재 책의 ID
        reviewData.reviewText,
        reviewData.rating
      );

      if (response.status === 201) {
        // 성공적으로 데이터가 전송되었으면, 리뷰 목록에 새 리뷰 추가
        setReviews([...reviews, reviewData]);

        closeReviewModal();
      } else {
        // 서버에서 응답이 오지 않거나, 응답의 상태 코드가 200이 아닌 경우 에러 처리
        console.error("Failed to submit review");
      }
    } catch (error) {
      // 네트워크 요청 중에 오류가 발생한 경우 에러 처리
      console.error("Failed to submit review:", error);
    }
  };

  // 책 구매 여부 (예: true - 이미 구매한 책, false - 아직 구매하지 않은 책)
  const isPurchased = false; // 또는 true

  // 장바구니에 담기 함수
  const addToCart = () => {};

  // 책 구매 함수
  const purchaseBook = () => {};

  // 미리보기 함수
  const viewPreview = () => {};

  return (
    <div>
      <LoginLogoutButton />
      <BookPurchase
        info={bookInfo}
        isLoggedIn={isLoggedin}
        isPurchased={isPurchased}
        onAddToCart={addToCart}
        onPurchase={purchaseBook}
        onPreview={viewPreview}
      />

      <ReviewModal
        isOpen={isReviewModalOpen}
        closeModal={closeReviewModal}
        onSubmit={reviewSubmit}
      />
      <ReviewSection openReviewModal={openReviewModal} bookInfo={bookInfo} />
    </div>
  );
};

export default BuyReviewPg;
