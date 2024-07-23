import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { useEffect, useState } from "react";
import { updateProfile } from "../authentication/authenticationSlice";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  firstName: z.string().trim().min(2, "First name is required"),
  lastName: z.string().trim().min(2, "Last name is required"),
});
type FormFields = z.infer<typeof schema>;

function ProfileHeader() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormFields>({ resolver: zodResolver(schema) });

  const userProfile = useSelector((state: RootState) => state.auth.userProfile);
  const [showEdit, setshowEdit] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const onSave: SubmitHandler<FormFields> = async (data) => {
    console.log(data);
    try {
      const resultUpdate = await dispatch(updateProfile(data));
      if (updateProfile.fulfilled.match(resultUpdate)) {
        setshowEdit(false);
      }
    } catch (error) {
      console.error("Failed to login:", error);
    }
  };

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  const handleEdit = () => {
    setshowEdit(true);
  };
  const handleCancel = () => {
    setshowEdit(false);
    reset();
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
        <form className="edit-form" onSubmit={handleSubmit(onSave)}>
          <div className="edit-inputs">
            <div>
              <input
                {...register("firstName")}
                type="text"
                name="firstName"
                placeholder={userProfile?.firstName}
                className={errors.firstName ? "error" : ""}
              />
              {errors.firstName && (
                <div className="error-message">{errors.firstName.message}</div>
              )}
            </div>
            <div>
              <input
                {...register("lastName")}
                type="text"
                name="lastName"
                placeholder={userProfile?.lastName}
                className={errors.lastName ? "error" : ""}
              />
              {errors.lastName && (
                <div className="error-message">{errors.lastName.message}</div>
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
