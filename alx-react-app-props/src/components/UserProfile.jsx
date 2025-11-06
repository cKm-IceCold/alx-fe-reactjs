import { useContext } from 'react'
import { UserContext } from './UserContext';



function UserProfile() {
  const user = useContext(UserContext); // ✅ Get user data from context

  return (
    <div style={{ border: '1px solid gray', padding: '10px', margin: '10px' }}>
      <h2 style={{ color: 'blue' }}>{user.name}</h2>
      <p>
        Age: <span style={{ fontWeight: 'bold' }}>{user.age}</span>
      </p>
      <p>Bio: {user.bio}</p>
    </div>
  );
}

export default UserProfile;