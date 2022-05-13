function UserCard({ user }) {
  // console.log(user);
  // Have to change default image to a URL so it can be displayed
  // Need to show a link to display list of messages between each other
  // Include a button to add a message that will send a post request to API
  return (
    <div className="card mb-3" style={{ maxWidth: "540px" }}>
      <div className="row g-0">
        <div className="col-md-4">
          <img src="https://r25-friender.s3.us-west-1.amazonaws.com/default-pic.png" className="img-fluid rounded-start" alt="..." />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{user.first_name}</h5>
            <ul>
              <li className="card-text">Interests: {user.interests}</li>
              <li className="card-text">Hobbies: {user.hobbies}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCard;