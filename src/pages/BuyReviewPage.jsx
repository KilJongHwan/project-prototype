import React, { useState } from "react";
import ReviewModal from "../util/ReviewModal";
import { FaStar, FaStarHalf } from "react-icons/fa"; // 별 아이콘을 사용하기 위한 import
import BookPurchase from "../components/PurchaseComponent";
import ReviewSection from "../components/ReviewComponent";
import LoginLogoutButton from "../components/LoginLogoutButtonComponent";

const BuyReviewPg = () => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]); // 리뷰 데이터를 관리하는 상태

  const openReviewModal = () => {
    setIsReviewModalOpen(true);
  };

  const closeReviewModal = () => {
    setIsReviewModalOpen(false);
  };

  const reviewSubmit = (reviewData) => {
    // 새로운 리뷰 데이터를 추가 백엔드 처리
    setReviews([...reviews, reviewData]);
    closeReviewModal();
  };

  // 사용자 로그인 상태 (예: true - 로그인 상태, false - 비로그인 상태)
  const isLoggedIn = true; // 또는 false

  // 책 구매 여부 (예: true - 이미 구매한 책, false - 아직 구매하지 않은 책)
  const isPurchased = false; // 또는 true

  // 장바구니에 담기 함수
  const addToCart = () => {};

  // 책 구매 함수
  const purchaseBook = () => {};

  // 미리보기 함수
  const viewPreview = () => {};

  const bookInfo = {
    title: "책 제목",
    author: "작가",
    publisher: "출판사",
    price: 15000,
    description: "책 설명...",
    urlToImage: "https://via.placeholder.com/160x100",
  };

  // 평균 별점 계산
  const totalRatings = reviews.length;
  const totalRatingSum = reviews.reduce(
    (sum, review) => sum + review.rating,
    0
  );
  const averageRating = totalRatings > 0.0 ? totalRatingSum / totalRatings : 0;

  // 별 아이콘을 표시하기 위한 배열 생성
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= averageRating) {
      stars.push(<FaStar key={i} color="yellow" />);
    } else if (i - 0.5 <= averageRating) {
      stars.push(<FaStarHalf key={i} color="yellow" />);
    } else {
      stars.push(<FaStar key={i} color="gray" />);
    }
  }

  return (
    <div>
      <LoginLogoutButton />
      <BookPurchase
        info={bookInfo}
        isLoggedIn={isLoggedIn}
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
      <ReviewSection
        averageRating={averageRating}
        stars={stars}
        totalRatings={totalRatings}
        reviews={reviews}
        openReviewModal={openReviewModal}
      />
    </div>
  );
};

export default BuyReviewPg;
