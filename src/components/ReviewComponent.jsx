import { useEffect, useState } from "react";
import styled from "styled-components";
import { useUser } from "../context/Context";
import AxiosApi from "../api/AxiosApi";
import { FaStar, FaStarHalf } from "react-icons/fa"; // 별 아이콘을 사용하기 위한 import

const ReviewSectionContainer = styled.div`
  padding: 0 30px 70px 30px;

  h2 {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-bottom: 15px;
    padding: 10px 0 8px 0;
    border-bottom: 2px solid #7d8e9e;
  }

  .review-starbox {
    display: table;
    table-layout: fixed;
    width: 100%;
  }

  .review-rating {
    display: table-cell;
    width: 120px;
    padding: 32px 0 20px 0;
    text-align: center;
    cursor: default;
  }

  .average-rating {
    font-size: 20px;
    font-weight: bold;
    color: #333;
  }

  .star-icons {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 24px;
    color: yellow;
  }

  .total-ratings {
    font-size: 14px;
    color: #666;
    margin-top: 10px;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    border: 1px solid #ddd;
    padding: 10px;
    margin: 10px 0;
  }

  .review-rating {
    font-weight: bold;
    margin: 0;
  }

  .review-text {
    margin: 0;
    color: #333;
  }
`;

const ReviewSection = ({ openReviewModal, bookInfo }) => {
  const { isLoggedin, checkLoginStatus } = useUser();
  const [reviews, setReviews] = useState([]);

  const [averageRating, setAverageRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= averageRating) {
      stars.push(<FaStar key={i} color="#AAB9FF" />);
    } else if (i - 0.5 <= averageRating) {
      stars.push(<FaStarHalf key={i} color="#AAB9FF" />);
    } else {
      stars.push(<FaStar key={i} color="gray" />);
    }
  }
  // 리뷰 데이터를 가져오는 함수
  const fetchReviews = async () => {
    if (!bookInfo) {
      console.log(
        "bookInfo is null. fetchReviews will be called again when bookInfo is set."
      );
      return;
    }
    try {
      const response = await AxiosApi.getReviews(bookInfo.id);
      if (response.status === 200) {
        setReviews(response.data);
        fetchReviews();
        fetchReviewStats();
      } else {
        console.error("리뷰 가져오기 실패");
      }
    } catch (error) {
      console.error("리뷰 데이터 요청 에러", error);
    }
  };
  const fetchReviewStats = async () => {
    if (!bookInfo) {
      console.log(
        "bookInfo is null. fetchReviewStats will be called again when bookInfo is set."
      );
      return;
    }
    try {
      const response = await AxiosApi.getReviewStats(bookInfo.id);
      console.log(response);
      if (response.status === 200) {
        setAverageRating(response.data.averageRating);
        setTotalRatings(response.data.totalReviews);
      } else {
        console.error("Failed to fetch review stats");
      }
    } catch (error) {
      console.error("Failed to fetch review stats:", error);
    }
  };

  useEffect(() => {
    checkLoginStatus();
    fetchReviews();
    fetchReviewStats();
  }, []);

  return (
    <ReviewSectionContainer>
      <h2>리뷰</h2>
      <div className="review-starbox">
        <div className="review-rating">
          <p>평균 평점: {averageRating.toFixed(1)}</p>
          <p>별 개수: {stars}</p>
          <p>리뷰 개수: {totalRatings}</p>
          <button onClick={openReviewModal}>Review 작성</button>
        </div>
      </div>
      <ul>
        {reviews.length === 0 ? (
          <li>
            <p>리뷰가 없습니다.</p>
          </li>
        ) : (
          reviews.map((review, index) => (
            <li key={index}>
              <p className="review-rating">평점: {review.rating}</p>
              <p className="review-nickname">
                닉네임: {review.memberName}
              </p>{" "}
              <p className="review-id">작성자 ID: {review.memberId}</p>{" "}
              <p className="review-content">컨텐트: {review.content}</p>
            </li>
          ))
        )}
      </ul>
    </ReviewSectionContainer>
  );
};

export default ReviewSection;
