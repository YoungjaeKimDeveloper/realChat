import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { Loader, CircleSlash2 } from "lucide-react";

const Homepage = () => {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // 아직 로딩중이고 사용자를 찾지못했을때
  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }
  if (!isCheckingAuth && !isCheckingAuth) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-y-4">
        <h1>Can't find User</h1>
        <CircleSlash2 className="size-10" />
      </div>
    );
  }
  return <div>Homepage</div>;
};

export default Homepage;
