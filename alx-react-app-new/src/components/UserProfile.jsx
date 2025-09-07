const UserProfile = (props) => {
  const cardStyle = {
    border: '1px solid #e5e7eb',
    padding: 16,
    margin: '16px auto',
    maxWidth: 420,
    borderRadius: 12,
    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
    backgroundColor: 'white'
  };

  const nameStyle = { color: '#2563eb', margin: 0, fontSize: 24 };
  const ageStyle = { margin: '8px 0 4px' };
  const bioStyle = { margin: 0, color: '#374151' };

  return (
    <div style={cardStyle}>
      <h2 style={nameStyle}>{props.name}</h2>
      <p style={ageStyle}>
        Age: <span style={{ fontWeight: 'bold' }}>{props.age}</span>
      </p>
      <p style={bioStyle}>Bio: {props.bio}</p>
    </div>
  );
};

export default UserProfile;
