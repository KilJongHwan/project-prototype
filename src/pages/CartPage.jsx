// 장바구니 페이지
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AxiosApi from "../api/AxiosApi";

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

const CartPage = ({ memberId }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await AxiosApi.getCartItems(memberId);
      if (response.status === 200) {
        const cartItemsWithBookInfo = await Promise.all(
          response.data.map(async (item) => {
            const bookResponse = await AxiosApi.getBookInfo(item.bookId);
            return {
              ...item,
              bookInfo: bookResponse.data,
            };
          })
        );
        setCartItems(cartItemsWithBookInfo);
      } else {
        console.error("짱바구니 가져오기 실패");
      }
    } catch (error) {
      console.error("에러 확인", error);
    }
  };

  const removeFromCart = async (bookId) => {
    try {
      const response = await AxiosApi.removeFromCart(memberId, bookId);
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
          <p>{item.bookTitle}</p>
          <button onClick={() => removeFromCart(item.bookId)}>제거</button>
        </div>
      ))}
    </CartPageContainer>
  );
};

export default CartPage;
