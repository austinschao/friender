import UpdateImageForm from "./UpdateImageForm";
import UpdateUserInfoForm from "./UpdateUserInfoForm";

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
