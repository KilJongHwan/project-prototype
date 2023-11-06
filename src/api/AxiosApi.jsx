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
    return await axios.get(DOMAIN + "/users/check-login", {
      headers: {
        Authorization: `Bearer ${token}`, // JWT 토큰을 Bearer 형식으로 설정
      },
    });
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
  reviewData: async (memberId, bookId, reviewText, reviewRating) => {
    const reviewData = {
      memberId: memberId,
      bookId: bookId,
      reviewText: reviewText,
      reviewScore: reviewRating,
    };
    return await axios.post(`${DOMAIN}/purchase/review`, reviewData);
  },
};

export default AxiosApi;
