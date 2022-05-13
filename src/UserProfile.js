import UpdateImageForm from "./forms/UpdateImageForm";
import UpdateUserInfoForm from "./forms/UpdateUserInfoForm";

function UserProfile() {
  return (
    <div className="row container-flex">
      <h1>Profile</h1>
      <UpdateImageForm />
      <UpdateUserInfoForm />
    </div>
  );
}

export default UserProfile;
