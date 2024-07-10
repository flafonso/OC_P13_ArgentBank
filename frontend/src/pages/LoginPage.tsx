import SigninForm from "../components/SigninForm";

function LoginPage() {
  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <SigninForm />
      </section>
    </main>
  );
}

export default LoginPage;
