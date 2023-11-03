import styled from "styled-components";

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

const ReviewSection = ({
  averageRating,
  stars,
  totalRatings,
  reviews,
  openReviewModal,
}) => {
  return (
    <ReviewSectionContainer>
      <h2>리뷰</h2>
      <div className="review-starbox">
        <div className="review-rating">
          <p>평균 평점: {averageRating.toFixed(1)}</p>
          <p>별 개수: {stars}</p>
          <p>리뷰 개수: {totalRatings}</p>
          <button onClick={openReviewModal}>Review Modal 열기</button>
        </div>
      </div>
      <ul>
        {reviews.map((review, index) => (
          <li key={index}>
            <p className="review-rating">평점: {review.rating}</p>
            <p className="review-text">리뷰: {review.reviewText}</p>
          </li>
        ))}
      </ul>
    </ReviewSectionContainer>
  );
};

export default ReviewSection;
