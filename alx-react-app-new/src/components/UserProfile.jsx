// src/components/UserProfile.jsx
const UserProfile = (props) => {
  return (
    <div
      style={{
        border: '1px solid #e5e7eb',
        padding: '10px',            // <-- includes "10px"
        margin: '10px auto',
        maxWidth: '420px',
        borderRadius: '12px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
        backgroundColor: 'white'
      }}
    >
      <h2 style={{ color: 'blue', margin: 0, fontSize: '24px' }}>
        {props.name}
      </h2>
      <p style={{ margin: '8px 0 4px' }}>
        Age: <span style={{ fontWeight: 'bold' }}>{props.age}</span>
      </p>
      <p style={{ margin: 0 }}>Bio: {props.bio}</p>
    </div>
  );
};

export default UserProfile;
