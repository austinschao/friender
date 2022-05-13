import UpdateImageForm from "./forms/UpdateImageForm";
import UpdateUserInfoForm from "./forms/UpdateUserInfoForm";
import ProfileImage from "./ProfileImage";

function UserProfile() {
  return (
    <div className="row container-flex">
      <h1>Profile</h1>
      <ProfileImage />
      <UpdateImageForm />
      <UpdateUserInfoForm />
    </div>
  );
}

export default UserProfile;
