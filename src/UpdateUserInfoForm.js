import { useState, useContext } from "react";
import UserContext from "./userContext";

function UpdateUserInfoForm() {
  const [hasUpdated, setHasUpdated] = useState(false);
  const { currentUser, handleUserUpdate } = useContext(UserContext);
  const { username, first_name, last_name, email, hobbies, interests } =
    currentUser;
  const [formData, setFormData] = useState({
    first_name,
    last_name,
    email,
    hobbies,
    interests,
  });

  /** Update form inputs */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  /** Call parent function and clear form. */
  async function handleSubmit(evt) {
    evt.preventDefault();
    const { first_name, last_name, email } = formData;
    const updatedData = await handleUserUpdate(username, {
      first_name,
      last_name,
      email,
    });
    setFormData((formData) => ({
      ...formData,
      first_name: updatedData.first_name,
      last_name: updatedData.last_name,
      email: updatedData.email,
    }));
    setHasUpdated(true);
  }

  return (
    <form className="UpdateUserForm col-md-6" onSubmit={handleSubmit}>
      <h2 className="mt-2">Edit Profile</h2>
      <div className="mb-3 col-md-9 mx-auto mt-2">
        {Object.keys(formData).map((f) => (
          <div className="p-1" key={f}>
            <input
              id={f}
              name={f}
              className="form-control"
              placeholder={`Enter ${f}...`}
              onChange={handleChange}
              value={formData[f] || ""}
              aria-label={f}
            />
          </div>
        ))}
        <button className="btn btn-info">Save Changes!</button>
      </div>
    </form>
  );
}

export default UpdateUserInfoForm;
