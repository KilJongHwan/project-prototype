import React, { useState, useEffect } from "react";
import AxiosApi from "../api/AxiosApi";
import { Button, Input } from "./LoginComponent";

const EmailVerificationComponent = ({ onVerification }) => {
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState("");

  const sendVerificationEmail = async () => {
    try {
      // 프론트엔드에서 이메일 백엔드로 전송
      const response = await AxiosApi.sendVerificationEmail(email);
      console.log("Response" + response.data);
      if (response.data === true) {
        setIsEmailSent(true);
        setVerificationMessage("인증 코드를 전송했습니다.");
      } else {
        setVerificationMessage("인증 코드 전송에 실패했습니다.");
      }
    } catch (e) {
      console.error("이메일 전송 중 오류 발생:", e);
      setVerificationMessage("오류 발생: " + e.message);
    }
  };

  const verifyEmail = async () => {
    try {
      // 프론트엔드에서 백엔드로 인증 코드와 이메일 전송
      const response = await AxiosApi.verifyEmail(email, verificationCode);
      if (response.data === true) {
        setIsVerified(true);
        setVerificationMessage("이메일이 성공적으로 인증되었습니다!");
        onVerification(true); //부모 컴포넌트로 신호 보내기
      } else {
        setVerificationMessage("이메일 인증에 실패했습니다.");
      }
    } catch (e) {
      console.error("이메일 인증 중 오류 발생:", e);
      setVerificationMessage("오류 발생: " + e.message);
    }
  };

  useEffect(() => {
    // isVerified 상태가 변경될 때 onVerification을 호출
    onVerification(isVerified);
  }, [isVerified, onVerification]);

  return (
    <div>
      {isEmailSent ? (
        <div>
          <Input
            disabled={isVerified}
            type="text"
            placeholder="인증 코드 입력"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <Button disabled={isVerified} type="button" onClick={verifyEmail}>
            인증 완료
          </Button>
        </div>
      ) : (
        <div>
          <Input
            type="email"
            placeholder="이메일 입력"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="button" onClick={() => sendVerificationEmail()}>
            이메일로 인증 코드 받기
          </Button>
        </div>
      )}
      {verificationMessage && <p>{verificationMessage}</p>}
    </div>
  );
};

export default EmailVerificationComponent;
