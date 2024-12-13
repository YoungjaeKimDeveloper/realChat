import React from "react";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

const LoginPage = () => {
  // 유저 값 추적하기
  const { login } = useAuthStore();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const handleLogin = (e) => {
    e.preventDefault();
    console.log("HandleLogin Data", userInfo);
    login(userInfo);
  };
  return (
    <div className="mt-20">
      <form onSubmit={(e) => handleLogin(e)}>
        <input
          type="text"
          value={userInfo.email}
          onChange={(e) =>
            setUserInfo((prev) => ({ ...prev, email: e.target.value }))
          }
          placeholder="Write Email..."
        />

        <input
          type="password"
          value={userInfo.password}
          onChange={(e) =>
            setUserInfo((prev) => ({ ...prev, password: e.target.value }))
          }
          placeholder="Write Email..."
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LoginPage;
