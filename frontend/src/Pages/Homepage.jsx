import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { Loader, CircleSlash2 } from "lucide-react";

const Homepage = () => {
  const { checkAuth, isCheckingAuth, authUser, logout } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  
  return (
    <div>
      <button onClick={logout}>logout</button>
    </div>
  );
};

export default Homepage;
