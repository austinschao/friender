import { useState } from "react";
import userContext from "./userContext";
import { useContext } from "react";

/** Add match Form Component
 *
 * state - formData
 *
 */

function AddOrRejectMatchForm({ handleMatch, handleReject, otherUser }) {
  const [formData, setFormData] = useState({ otherUser });
  const { currentUser, setCurrentUser } = useContext(userContext);





  return (
    <form className="AddOrRejectForm">
      <div className="d-flex justify-content-center">
        <button className="btn btn-success btn-sm mx-1">Match</button>
        <button className="btn btn-danger btn-sm mx-1">Reject</button>
      </div>
    </form>
  );
}

export default AddOrRejectMatchForm;