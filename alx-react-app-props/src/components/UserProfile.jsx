import { useContext } from 'react';
import UserContext from './UserContext';

function UserProfile() {
  const userData = useContext(UserContext);

  if (!userData) {
    return <p>No user data available.</p>;
  }

  return (
    <div style={{ border: '1px solid gray', padding: '10px', margin: '10px' }}>
      <h2 style={{ color: 'blue' }}>{userData.name}</h2>
      <p>Age: <span style={{ fontWeight: 'bold' }}>{userData.age || "N/A"}</span></p>
      <p>Bio: {userData.bio || "No bio provided."}</p>
      <p>Email: {userData.email}</p>
    </div>
  );
}

export default UserProfile;
