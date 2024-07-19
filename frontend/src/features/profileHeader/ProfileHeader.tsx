import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { useState } from "react";
import { updateProfile } from "../authentication/authenticationSlice";

function ProfileHeader() {
  const userProfile = useSelector((state: RootState) => state.auth.userProfile);
  console.log(userProfile);
  const [showEdit, setshowEdit] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleEdit = () => {
    setshowEdit(true);
  };
  const handleCancel = () => {
    setshowEdit(false);
  };
  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const firstName = data.get("firstName") as string;
    const lastName = data.get("lastName") as string;

    try {
      const resultUpdate = await dispatch(updateProfile({ firstName, lastName }));
      if (updateProfile.fulfilled.match(resultUpdate)) {
        console.log("update réussi");
      } else {
        console.log("update échoué");
      }
    } catch (error) {
      console.error("Failed to login:", error);
    }
    setshowEdit(false);
  };

  return (
    <div className="header">
      <h1>
        Welcome back
        <br />
        {!showEdit && userProfile?.firstName}{" "}
        {!showEdit && userProfile?.lastName}
      </h1>
      {showEdit ? (
        <form className="edit-form" onSubmit={handleSave}>
          <div className="edit-inputs">
            <input
              type="text"
              name="firstName"
              placeholder={userProfile?.firstName}
            />
            <input
              type="text"
              name="lastName"
              placeholder={userProfile?.lastName}
            />
          </div>
          <div className="edit-buttons">
            <button type="submit" className="save-button">
              Save
            </button>
            <button className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button className="edit-button" onClick={handleEdit}>
          Edit Name
        </button>
      )}
    </div>
  );
}

export default ProfileHeader;
