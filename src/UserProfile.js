import UpdateImageForm from "./forms/UpdateImageForm";
import UpdateUserInfoForm from "./forms/UpdateUserInfoForm";
import ProfileImage from "./ProfileImage";
import { useParams } from "react-router-dom";

function UserProfile() {
  const { username } = useParams();
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
