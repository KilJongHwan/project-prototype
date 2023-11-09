import axios from "axios";
const DOMAIN = "http://localhost:8111";

const AxiosApi = {
  // 로그인
  memberLogin: async (id, password) => {
    const login = {
      id: id,
      password: password,
    };
    return await axios.post(DOMAIN + "/users/login", login);
  },
  checkLogin: async (token) => {
    const response = await axios.get(DOMAIN + "/users/check-login", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  },

  // 로그아웃
  memberLogout: async (id, password, token) => {
    const logout = {
      id: id,
      password: password,
      token: token,
    };
    return await axios.post(DOMAIN + "/users/logout", logout);
  },

  // 회원가입
  memberSignup: async (id, password, email, phone) => {
    const signupData = {
      id: id,
      password: password,
      name: "user",
      email: email,
      tel: phone,
      cash: "0",
    };
    return await axios.post(DOMAIN + "/users/signup", signupData);
  },

  // 이메일 보내기
  sendVerificationEmail: async (email) => {
    const sendEmail = {
      email: email,
    };

    return await axios.post(`${DOMAIN}/api/send-email`, sendEmail);
  },

  // 이메일 인증 코드 확인
  verifyEmail: async (email, verificationCode) => {
    const verification = {
      email: email,
      code: verificationCode,
    };
    return await axios.post(`${DOMAIN}/api/verify-email`, verification);
  },

  // 리뷰 데이터
  reviewData: async (memberId, bookId, content, rating) => {
    const reviewData = {
      memberId: memberId,
      bookId: bookId,
      content: content,
      rating: rating,
    };
    return await axios.post(`${DOMAIN}/purchase/review`, reviewData);
  },
  getReviews: async (bookid) => {
    return await axios.get(`${DOMAIN}/purchase/reviewdata/${bookid}`);
  },
  getReviewStats: async (bookId) => {
    return await axios.get(`${DOMAIN}/purchase/reviewdata/stats/${bookId}`);
  },

  // 장바구니 아이템 추가
  addToCart: async (memberId, bookId) => {
    return await axios.post(`${DOMAIN}/cart/add`, { memberId, bookId });
  },
  // 장바구니 아이템 가져오기
  getCartItems: async (memberId) => {
    return await axios.get(`${DOMAIN}/cart/${memberId}`);
  },
  // 장바구니 아이템 제거
  removeFromCart: async (memberId, bookId) => {
    return await axios.delete(`${DOMAIN}/cart/${memberId}/${bookId}`);
  },
  // 책 정보 가져오기
  getBookInfo: async (bookId) => {
    return await axios.get(`${DOMAIN}/books/${bookId}`);
  },
};

export default AxiosApi;
