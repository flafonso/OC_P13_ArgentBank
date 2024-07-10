function LoginForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const username = data.get("username");
    const password = data.get("password");
    const rememberMe = data.get("remember-me");

    console.log(`username : ${username}`);
    console.log(`password : ${password}`);
    console.log(`remember-me : ${rememberMe}`);
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
      <button className="sign-in-button">Sign In</button>
    </form>
  );
}

export default LoginForm;
