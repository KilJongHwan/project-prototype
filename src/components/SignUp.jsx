import React, { useState, useEffect } from "react";

const SignUp = () => {
  const [signUpData, setSignUpData] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
  });

  const [dataErrors, setDataErrors] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
  });

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  useEffect(() => {
    const validateForm = () => {
      const usernameRegex = /^[a-zA-Z0-9]{8,20}$/;
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
      const emailRegex = /^[A-Za-z0-9]+@[A-Za-z]+\.[A-Za-z]+$/;
      const phoneRegex = /^\d{2,3}-\d{3,4}-\d{4}$/;

      const usernameError = !usernameRegex.test(signUpData.username)
        ? "아이디는 8~20자의 영문 대소문자와 숫자 조합이어야 합니다."
        : "";

      const passwordError = !passwordRegex.test(signUpData.password)
        ? "패스워드는 8~20자의 대소문자, 특수문자, 숫자를 포함해야 합니다."
        : "";

      const emailError = !emailRegex.test(signUpData.email)
        ? "올바른 이메일 형식이 아닙니다."
        : "";

      const phoneError = !phoneRegex.test(signUpData.phone)
        ? "올바른 전화번호 형식이 아닙니다."
        : "";

      setDataErrors({
        username: usernameError,
        password: passwordError,
        email: emailError,
        phone: phoneError,
      });
    };

    validateForm();
  }, [signUpData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpData({ ...signUpData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 회원가입 요청 또는 다른 작업 수행
  };

  return (
    <div>
      <h2>Sign-Up</h2>
      <div>
        <input
          type="text"
          name="username"
          placeholder="아이디 입력"
          value={signUpData.username}
          onChange={handleChange}
        />
        {dataErrors.username && (
          <div className="error">{dataErrors.username}</div>
        )}
      </div>
      <div>
        <input
          type="password"
          name="password"
          placeholder="패스워드 입력"
          value={signUpData.password}
          onChange={handleChange}
        />
        {dataErrors.password && (
          <div className="error">{dataErrors.password}</div>
        )}
      </div>
      <div>
        <input
          type="email"
          name="email"
          placeholder="이메일 입력"
          value={signUpData.email}
          onChange={handleChange}
        />
        {dataErrors.email && <div className="error">{dataErrors.email}</div>}
      </div>
      <div>
        <input
          type="tel"
          name="phone"
          placeholder="전화번호 입력"
          value={signUpData.phone}
          onChange={handleChange}
        />
        {dataErrors.phone && <div className="error">{dataErrors.phone}</div>}
      </div>
      <button
        onClick={handleSubmit}
        style={{
          width: "100%",
          height: "30px",
          backgroundColor: "royalblue",
          color: "white",
        }}
        disabled={isSubmitDisabled}
      >
        가입 요청
      </button>
    </div>
  );
};

export default SignUp;
