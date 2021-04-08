function Profile({ user }) {

    return (
      <div>
          <h2>Hello, {user.name}</h2>
          <p>{user.age} years old.
          {user.location}.
          </p>
          <h4>Bio:</h4>
          <p>{user.bio}</p>
      </div>
    );
}
 
export default Profile;
  