import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useEffect, PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }: PropsWithChildren) {
  const auth = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.userProfile === null) {
      navigate("/login", { replace: true });
    }
  }, [auth, navigate]);

  if (auth.userProfile === null) {
    return null;
  }

  return children;
}

export default ProtectedRoute;
