import { useDispatch } from "react-redux";
import { login, getProfile } from "./authenticationSlice";
import { AppDispatch } from "../../app/store";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get("username") as string;
    const password = data.get("password") as string;
    const rememberMe = data.get("remember-me");

    console.log(`username : ${email}`);
    console.log(`password : ${password}`);
    console.log(`remember-me : ${rememberMe}`);
    try {
      const resultLogin = await dispatch(login({ email, password }));
      if (login.fulfilled.match(resultLogin)) {
        const resultProfile = await dispatch(getProfile());
        if (getProfile.fulfilled.match(resultProfile)) {
          navigate("/profile");
        }
      }
    } catch (error) {
      console.error("Failed to login:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" />
      </div>
      <div className="input-wrapper">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />
      </div>
      <div className="input-remember">
        <input type="checkbox" id="remember-me" name="remember-me" />
        <label htmlFor="remember-me">Remember me</label>
      </div>
      <button type="submit" className="sign-in-button">
        Sign In
      </button>
    </form>
  );
}

export default LoginForm;
