import AccountSection from "../components/AccountSection";

function ProfilePage() {
  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          Tony Jarvis!
        </h1>
        <button className="edit-button">Edit Name</button>
      </div>
      <h2 className="sr-only">Accounts</h2>
      <AccountSection
        title="Argent Bank Checking (x8349)"
        amount={2082.79}
        description="Available Balance"
      />
      <AccountSection
        title="Argent Bank Savings (x6712)"
        amount={10928.42}
        description="Available Balance"
      />
      <AccountSection
        title="Argent Bank Credit Card (x8349)"
        amount={184.30}
        description="Current Balance"
      />
    </main>
  );
}

export default ProfilePage;
