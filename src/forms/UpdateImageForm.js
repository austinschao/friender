import React, { useState, useContext } from "react";
import UserContext from "../userContext";

function UpdateProfileForm() {
  // const { user, handleUserUpdate } = useContext(UserContext);
  // const { username, firstName, lastName, email } = user;
  const { currentUser, uploadUserImage } = useContext(UserContext);
  const initialState = {
    image: null,
  };
  const [formData, setFormData] = useState(initialState);
  // const [image, setImage] = useState([]);
  // const [imgUrl, setImgUrl] = useState([]);
  const [hasUpdated, setHasUpdated] = useState(false);

  function handleImageChange(evt) {
    const { files } = evt.target;
    const imageFile = { ...files };
    console.log("IMAGE FILE", imageFile);
    setFormData(imageFile["0"]);
    console.log("filessss at 0", imageFile["0"]);
  }
  // create instance of FormData ('file', file)
  async function onImageSubmit(evt) {
    evt.preventDefault();

    const res = await uploadUserImage(currentUser.username, formData);
    setHasUpdated(true);
    console.log(res, "res");
  }

  return (
    <>
      <form className="UpdateUserForm col-md-6" encType="multipart/form-data" onSubmit={onImageSubmit}>
        <h2 className="mt-2">Edit Image</h2>
        <div className="mb-3 col-md-9 mx-auto mt-2">
          <input
            type="file"
            name="file"
            // disabled={f === "username"}
            className="form-control"
            // placeholder={`Enter ${f}...`}
            onChange={handleImageChange}
          // value={formData[f]}
          />

          <button className="btn btn-info">Save Changes!</button>
        </div>
      </form>
    </>
  );
}

export default UpdateProfileForm;
