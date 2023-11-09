// 장바구니 페이지
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AxiosApi from "../api/AxiosApi";
import { useUser } from "../context/Context";

const CartPageContainer = styled.div`
  padding: 0 30px 70px 30px;

  h2 {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-bottom: 15px;
    padding: 10px 0 8px 0;
    border-bottom: 2px solid #7d8e9e;
  }

  .item {
    border: 1px solid #ddd;
    padding: 10px;
    margin: 10px 0;
  }

  .remove-button {
    margin-left: 10px;
  }
`;

const CartPage = ({}) => {
  const [cartItems, setCartItems] = useState([]);
  const { user, checkLoginStatus } = useUser();

  useEffect(() => {
    if (user) {
      fetchCartItems();
    }
  }, [user]);
  useEffect(() => {
    checkLoginStatus();
  }, []);
  useEffect(() => {
    console.log(cartItems); // 상태 업데이트 후의 장바구니 항목 출력
  }, [cartItems]);
  const fetchCartItems = async () => {
    try {
      const response = await AxiosApi.getCartItems(user.id);
      console.log(response.data); // 응답 출력
      if (response.status === 200) {
        const cartItemsWithBookInfo = await Promise.all(
          // 병렬구문처리할떄 쓰는 Promise
          response.data.map(async (item) => {
            const bookResponse = await AxiosApi.getBookInfo(item.bookId);
            return {
              ...item,
              bookInfo: bookResponse.data,
            };
          })
        );
        setCartItems(cartItemsWithBookInfo);
        console.log(cartItems); // 상태 업데이트 후의 cartItems 출력
      } else {
        console.error("짱바구니 가져오기 실패");
      }
    } catch (error) {
      console.error("에러 확인", error);
    }
  };

  const removeFromCart = async (bookId) => {
    try {
      const response = await AxiosApi.removeFromCart(user.id, bookId);
      console.log(response); // 서버로부터의 응답 출력
      if (response.status === 200) {
        fetchCartItems(); // 장바구니 아이템 제거 후 장바구니 아이템 목록을 다시 불러옴
      } else {
        console.error("장바구니 아이템 목록 가져오기 실패");
      }
    } catch (error) {
      console.error("에러 확인", error);
    }
  };

  return (
    <CartPageContainer>
      <h2>장바구니</h2>
      {cartItems.map((item) => (
        <div key={item.bookId}>
          <p>{item.bookInfo.title}</p>
          <button onClick={() => removeFromCart(item.bookId)}>제거</button>
        </div>
      ))}
    </CartPageContainer>
  );
};

export default CartPage;
