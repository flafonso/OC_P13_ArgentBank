import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { useState } from "react";
import { updateProfile } from "../authentication/authenticationSlice";
import { editFormFieldCheck, FormFieldCheck } from "../../utils/fieldCheck";

function ProfileHeader() {
  const userProfile = useSelector((state: RootState) => state.auth.userProfile);
  // console.log(userProfile);
  const [showEdit, setshowEdit] = useState(false);
  const [fieldCheck, setFieldCheck] = useState<FormFieldCheck>({
    valid: false,
    error: {},
  });
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
    const firstName = (data.get("firstName") as string | null)?.trim() ?? "";
    const lastName = (data.get("lastName") as string | null)?.trim() ?? "";
    // console.log("check dans le composant retour direct =>");
    // console.log(editFormFieldCheck(firstName, lastName));

    const validation = editFormFieldCheck(firstName, lastName);
    setFieldCheck(validation);
    console.log("check dans le composant =>");
    console.log(fieldCheck);

    if (!validation.valid) {
      return;
    }
    try {
      const resultUpdate = await dispatch(
        updateProfile({ firstName, lastName })
      );
      if (updateProfile.fulfilled.match(resultUpdate)) {
        setshowEdit(false);
      }
    } catch (error) {
      console.error("Failed to login:", error);
    }
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
            <div>
              <input
                type="text"
                name="firstName"
                placeholder={userProfile?.firstName}
                className={fieldCheck.error.firstName ? "error" : ""}
              />
              {fieldCheck.error.firstName && (
                <div className="error-message">
                  {fieldCheck.error.firstName}
                </div>
              )}
            </div>
            <div>
              <input
                type="text"
                name="lastName"
                placeholder={userProfile?.lastName}
                className={fieldCheck.error.lastName ? "error" : ""}
              />
              {fieldCheck.error.lastName && (
                <div className="error-message">
                  {fieldCheck.error.lastName}
                </div>
              )}
            </div>
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
