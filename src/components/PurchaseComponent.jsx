import styled from "styled-components";
import CartModal from "../util/CartModal";
import PurchaseModal from "../util/PurchaseModal";
import { useState } from "react";

const BookPurchaseBlock = styled.div`
  background: #282828;
  color: #999;
  display: flex;
  flex-direction: row;
  margin: 120px auto;
  max-width: 1200px;
  min-height: 100vh;
  padding: 2rem;
  position: relative;

  .coverimg {
    flex: 0 0 50%;
    padding: 16px;
    position: absolute;
    left: 50%;
    transform: translateX(-100%);
    z-index: 1;

    img {
      display: block;
      height: auto;
      object-fit: cover;
      width: 100%;
    }
  }

  .info {
    background-color: #fff;
    border-radius: 16px;
    box-shadow: 0 14px 18px rgba(0, 0, 0, 0.06);
    padding: 32px 24px;
    z-index: 0;
    position: absolute;
    left: 50%;
    transform: translateX(0);
  }
  h2 {
    width: 100%;
    font-size: 24px;
    font-weight: bold;
    color: #999;
    margin-bottom: 15px;
    padding-bottom: 8px;
    border-bottom: 2px solid #999;
    text-align: center;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
    -webkit-font-smoothing: antialiased;
  }
  hr {
    position: relative;
    border: none;
    border-top: 1px solid #999;
    font: 26px sans-serif;
    text-align: center;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
    -webkit-font-smoothing: antialiased;
    margin: 0;
    height: 50px;
    &:before {
      position: relative;
      top: -12px;
      color: #999;
      content: "༺⁜࿇⁜༻";
    }
    &:after {
      position: absolute;
      left: 50%;
      margin-left: -10px;
      top: 22px;
      color: #999;
      content: "★";
    }
  }
  .coverimg,
  .info {
    flex: 1 0 50%;
  }

  .contents {
    display: flex;
    align-items: center;
    width: 100%;

    .coverimg {
      margin-right: 1rem;

      img {
        display: block;
        width: 100%;
        max-width: 100%;
        height: auto;
        object-fit: cover;
      }
    }

    .info {
      h3 {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 0.5rem;
      }

      p {
        margin: 0;
        line-height: 1.5;
        margin-top: 0.5rem;
      }

      .buttons {
        margin-top: 1em;

        button {
          margin-right: 1em;
          padding: 0.75em 1.5em;
          font-size: 16px;
          font-weight: bold;
          color: #fff;
          background-color: #007bff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s ease;

          &:hover {
            background-color: #0056b3;
          }
        }
      }
    }
  }
`;

const BookPurchase = ({
  info,
  isLoggedIn,
  isInCart,
  isPurchased,
  onAddToCart,
  onPurchase,
  onPreview,
}) => {
  const { title, author, publisher, price, description, imageUrl } = info;

  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);

  const openCartModal = () => {
    setCartModalOpen(true);
  };

  const closeCartModal = () => {
    setCartModalOpen(false);
  };

  const openPurchaseModal = () => {
    setPurchaseModalOpen(true);
  };

  const closePurchaseModal = () => {
    setPurchaseModalOpen(false);
  };

  const addToCart = () => {
    openCartModal();
  };

  const purchaseBook = () => {
    openPurchaseModal();
  };

  const viewPreview = () => {
    onPreview();
  };

  return (
    <BookPurchaseBlock>
      <div className="contents">
        <div className="coverimg">
          {imageUrl && <img src={imageUrl} alt="CoverImage" />}
        </div>
        <div className="info">
          <h3>{title}</h3>
          <p>저자: {author}</p>
          <p>출판사: {publisher}</p>
          <p>가격: {price} 원</p>
          <p>{description}</p>
          <div className="buttons">
            {isPurchased ? (
              <button onClick={viewPreview}>미리보기</button>
            ) : (
              <>
                {isLoggedIn ? (
                  <>
                    <button onClick={addToCart}>
                      {isInCart ? "장바구니에서 제거" : "장바구니에 담기"}
                    </button>
                    <button onClick={purchaseBook}>구매하기</button>
                  </>
                ) : (
                  <button>로그인이 필요합니다</button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <CartModal
        isOpen={cartModalOpen}
        closeModal={closeCartModal}
        onConfirm={() => {
          onAddToCart();
          closeCartModal();
        }}
        action={isInCart ? "remove" : "add"}
      />
      <PurchaseModal
        isOpen={purchaseModalOpen}
        closeModal={closePurchaseModal}
        onConfirm={() => {
          onPurchase();
          closePurchaseModal();
        }}
        action="purchase"
      />
    </BookPurchaseBlock>
  );
};

export default BookPurchase;
