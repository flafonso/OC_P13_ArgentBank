import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useEffect, PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }: PropsWithChildren) {
  const auth = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  console.log(token);

  useEffect(() => {
    if (token === null && auth.userProfile === null) {
      navigate("/login", { replace: true });
    }
  }, [auth, token, navigate]);

  if (token === null && auth.userProfile === null) {
    return null;
  }

  return children;
}

export default ProtectedRoute;
