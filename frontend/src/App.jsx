import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./Pages/Homepage";
import LoginPage from "./Pages/LoginPage";
import ProfilePage from "./Pages/ProfilePage";
import SettingsPage from "./Pages/SettingsPage";
import SignUpPage from "./Pages/SignUpPage";

import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { CircleSlash2 } from "lucide-react";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });
  // 아직 로딩중이고 사용자를 찾지못했을때
  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }
  // if (!isCheckingAuth && !isCheckingAuth) {
  //   return (
  //     <div className="flex h-screen flex-col items-center justify-center gap-y-4">
  //       <h1>Can't find User</h1>
  //       <CircleSlash2 className="size-10" />
  //     </div>
  //   );
  // }
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <Homepage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <SignUpPage />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route path="/settings" element={<SettingsPage />} />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
};

export default App;

// 1:51:31
