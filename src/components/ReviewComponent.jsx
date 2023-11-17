import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useUser } from "../context/Context";
import AxiosApi from "../api/AxiosApi";
import { FaStar, FaStarHalf } from "react-icons/fa"; // 별 아이콘을 사용하기 위한 import

const ReviewSectionContainer = styled.div`
  padding: 0 30px 70px 30px;
  height: auto;
  width: 100%; // 너비를 100%로 설정
  max-width: 1200px; // 컨테이너의 최대 너비 설정
  margin: 0 auto; // 좌우 중앙에 배치

  @media screen and (max-width: 768px) {
    padding: 0 15px 35px 15px; // 화면이 768px 이하일 때 패딩 변경
  }
  h2 {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-bottom: 15px;
    padding: 10px 0 8px 0;
    border-bottom: 2px solid #7d8e9e;
    text-transform: uppercase; /* 텍스트를 대문자로 변환 */
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
    justify-content: center;
    cursor: default;
    vertical-align: middle; /* 셀 내용 중앙 정렬 */
  }

  .average-rating {
    font-size: 20px;
    font-weight: bold;
    color: #333;
    color: #007bff; /* 평균 평점의 색상 변경 */
  }

  .star-icons {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 24px;
    justify-content: center; /* 별 아이콘 가운데 정렬 */
  }

  .total-ratings {
    font-size: 14px;
    color: #666;
    margin-top: 10px;
    text-align: right; /* 총 평점을 오른쪽 정렬 */
  }

  ul {
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
    display: block;
    display: flex;
    text-align: center;
    overflow: auto;
    flex-direction: column;
    overflow-x: auto;
  }

  li {
    border: 1px solid #ddd;
    text-align: center;
    padding: 20px;
    margin: 10px;
    border-radius: 5px;
    box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.1); // 상자 그림자 추가
    margin-right: 10px;
  }

  .review-rating {
    font-weight: bold;
    margin: 0;
    color: #007bff;
  }
`;

const ReviewText = ({ isExpanded, children }) => (
  <p
    style={{
      textAlign: "center",
      margin: 0,
      color: "#333",
      fontStyle: "italic",
      width: "100%",
      overflow: isExpanded ? "visible" : "hidden",
      textOverflow: "ellipsis",
      display: isExpanded ? "block" : "-webkit-box",
      whiteSpace: isExpanded ? "normal" : "nowrap",
      WebkitBoxOrient: "vertical",
      WebkitLineClamp: isExpanded ? "none" : 2,
      wordBreak: "break-all",
    }}
  >
    {isExpanded
      ? children
      : children.length <= 35
      ? children
      : children.slice(0, 35) + "..."}{" "}
  </p>
);

const WriteButton = styled.button`
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

const MoreButton = styled.button`
  --btn-bg: #000;
  position: relative;
  width: 100%;
  height: 40px;
  padding: 10px 25px;
  border: none;
  font-family: "Lato", sans-serif;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;

  &::before,
  &::after {
    position: absolute;
    content: "";
    left: 0;
    width: 100%;
    height: 1px;
    background: var(--btn-bg);
    opacity: 0;
    transform: scaleX(0);
    transition: 0.4s ease-in-out;
  }

  &::before {
    top: 0;
  }

  &::after {
    bottom: 0;
  }

  &:hover {
    letter-spacing: 5px;
    color: var(--btn-bg);
    background: transparent;

    &::before,
    &::after {
      opacity: 1;
      transform: scaleX(1.2);
    }
  }
`;
const Nickname = styled.p`
  color: #333;
  font-size: 18px;
  font-weight: bold;
  margin: 0;
  text-align: center;
`;

const Id = styled.p`
  color: #666;
  font-size: 16px;
  margin: 0;
  text-align: center;
`;
const ReviewDate = styled.p`
  color: #999;
  font-size: 14px;
  margin: 0;
  text-align: center; // 텍스트 중앙 정렬
`;

const ReviewSection = ({ openReviewModal, bookInfo }) => {
  const { checkLoginStatus } = useUser();
  const [reviews, setReviews] = useState([]);

  const [expandedReviews, setExpandedReviews] = useState([]);

  const [averageRating, setAverageRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);
  const stars = [];
  const [visibleReviews, setVisibleReviews] = useState(10); // 초기에 보여지는 리뷰 개수 설정

  const showMoreReviews = () => {
    setVisibleReviews((prevVisibleReviews) => prevVisibleReviews + 10); // 더 보기 클릭 시 보여지는 리뷰 개수 10개 증가
  };

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
  const fetchReviews = useCallback(async () => {
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
      } else {
        console.error("리뷰 가져오기 실패");
      }
    } catch (error) {
      console.error("리뷰 데이터 요청 에러", error);
    }
  }, [bookInfo]);
  const fetchReviewStats = useCallback(async () => {
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
  }, [bookInfo]);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  useEffect(() => {
    if (bookInfo) {
      fetchReviews();
      fetchReviewStats();
    }
  }, [bookInfo]);
  return (
    <ReviewSectionContainer>
      <h2>리뷰</h2>
      <div className="review-starbox">
        <div className="review-rating">
          <p>평균 평점: {averageRating.toFixed(1)}</p>
          <p>{stars}</p>
          <p>리뷰 개수: {totalRatings}</p>
          <WriteButton onClick={openReviewModal}>Review 작성</WriteButton>
        </div>
      </div>
      <ul>
        {reviews.length === 0 ? (
          <li>
            <p>리뷰가 없습니다.</p>
          </li>
        ) : (
          reviews.slice(0, visibleReviews).map((review, index) => (
            <li key={index}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div style={{ marginRight: "40px", width: "120px" }}>
                  <Nickname>{review.memberName}</Nickname>
                  <Id>
                    {review.memberId.substring(0, 2) +
                      "*".repeat(review.memberId.length - 2)}
                  </Id>
                  <ReviewDate>{review.creationDate}</ReviewDate>
                </div>
                <div className="star-icons">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i}>
                      {i + 1 <= review.rating ? (
                        <FaStar color="#AAB9FF" />
                      ) : i + 0.5 === review.rating ? (
                        <FaStarHalf color="#AAB9FF" />
                      ) : (
                        <FaStar color="gray" />
                      )}
                    </span>
                  ))}
                </div>
                <div
                  style={{ width: "100%", height: "100%", overflow: "hidden" }}
                >
                  <ReviewText isExpanded={expandedReviews.includes(index)}>
                    {review.content}
                  </ReviewText>
                  {review.content.length > 35 && (
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault(); // 링크 기본 동작 방지
                        setExpandedReviews((prevExpandedReviews) =>
                          prevExpandedReviews.includes(index)
                            ? prevExpandedReviews.filter((i) => i !== index)
                            : [...prevExpandedReviews, index]
                        );
                      }}
                      style={{
                        color: "#007bff", // 링크 색상
                        textDecoration: "none", // 밑줄 없애기
                      }}
                    >
                      {expandedReviews.includes(index)
                        ? "간략히 보기"
                        : "자세히 보기"}
                    </a>
                  )}
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
      {reviews.length > visibleReviews && ( // 더 보기 버튼. 보여지는 리뷰 개수보다 전체 리뷰 개수가 많을 경우에만 보여짐
        <MoreButton className="btn-11" onClick={showMoreReviews}>
          10개 더보기
        </MoreButton>
      )}
    </ReviewSectionContainer>
  );
};

export default ReviewSection;
