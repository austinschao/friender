import React, { useState, useContext } from "react";
import "axios";
import axios from "axios";

function UpdateProfileForm() {
  // const { user, handleUserUpdate } = useContext(UserContext);
  // const { username, firstName, lastName, email } = user;
  const initialState = {
    image: null,
  };
  const [formData, setFormData] = useState(initialState);
  const [image, setImage] = useState([]);
  const [imgUrl, setImgUrl] = useState([]);
  const [hasUpdated, setHasUpdated] = useState(false);

  function handleImageChange(evt) {
    const { files } = evt.target;
    setFormData([...files]);
    console.log("files", files["0"]);
    console.log("formdata", files);
  }

  async function onImageSubmit(evt) {
    const uploadedFile = await axios.post(formData.image, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  /** Call parent function and clear form. */
  async function handleSubmit(evt) {
    evt.preventDefault();
    // const { firstName, lastName, email } = formData;
    // const updatedData = await handleUserUpdate(username, {
    //   firstName,
    //   lastName,
    //   email,
    // });
    // setFormData((formData) => ({
    //   ...formData,
    //   firstName: updatedData.firstName,
    //   lastName: updatedData.lastName,
    //   email: updatedData.email,
    // }));
    setHasUpdated(true);
  }

  /** Create form fields  */
  function renderFormFields() {
    const formFields = Object.keys(formData);
    return formFields.map((f) => (
      <div className="p-1" key={f}>
        <input
          type="file"
          id={f}
          name={f}
          // disabled={f === "username"}
          className="form-control"
          // placeholder={`Enter ${f}...`}
          onChange={handleImageChange}
          // value={formData[f]}
          aria-label={f}
        />
      </div>
    ));
  }

  return (
    <form className="UpdateUserForm col-md-6" onSubmit={handleSubmit}>
      <h2 className="mt-2">Edit Profile</h2>
      <div className="mb-3 col-md-9 mx-auto mt-2">
        {renderFormFields()}
        {/* {renderFlashMessage()} */}
        <button className="btn btn-info">Save Changes!</button>
      </div>
    </form>
  );
}

export default UpdateProfileForm;
