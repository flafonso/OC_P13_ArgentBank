import { useDispatch } from "react-redux";
import { login, getProfile } from "./authenticationSlice";
import { AppDispatch } from "../../app/store";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().trim().email(),
  password: z.string().trim().min(6),
});

type FormFields = z.infer<typeof schema>;

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const email = data.email;
    const password = data.password;
    // const rememberMe = data.get("remember-me");

    console.log(data);
    console.log(`email : ${email}`);
    console.log(`password : ${password}`);
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="input-wrapper">
        <label htmlFor="email">Username</label>
        <input
          {...register("email")}
          type="text"
          id="email"
          name="email"
          className={errors.email ? "error" : ""}
        />
        {errors.email && (
          <div className="error-message">{errors.email.message}</div>
        )}
      </div>
      <div className="input-wrapper">
        <label htmlFor="password">Password</label>
        <input
          {...register("password")}
          type="password"
          id="password"
          name="password"
          className={errors.password ? "error" : ""}
        />
        {errors.password && (
          <div className="error-message">{errors.password.message}</div>
        )}
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
