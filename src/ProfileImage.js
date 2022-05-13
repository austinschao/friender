import { useContext } from "react";
import UserContext from "./userContext";

function ProfileImage() {
  const { currentUser } = useContext(UserContext);

  return (

    <div className="card">
      <div>
        <img className="img-thumbnail col-md-4" src={currentUser.image_url} />
      </div>
    </div>
  );
}

export default ProfileImage;
