import { useContext } from "react";
import UserContext from "./userContext";

function ProfileImage() {
  const { currentUser } = useContext(UserContext);

  return (

    <div className="row">
      <img className="img-thumbnail col-md-4" src={currentUser.image_url} />
    </div>
  );
}

export default ProfileImage;
