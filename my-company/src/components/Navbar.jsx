import { Link } from 'react-router-dom';

function Navbar() {
  const navStyle = {
    display: 'flex',
    gap: 12,
    padding: '12px 20px',
    alignItems: 'center',
    backgroundColor: '#0b5fff',
    color: 'white'
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 600
  };

  return (
    <nav style={navStyle}>
      <div style={{ fontWeight: 'bold', marginRight: 16 }}>My Company</div>
      <Link to="/" style={linkStyle}>Home</Link>
      <Link to="/about" style={linkStyle}>About</Link>
      <Link to="/services" style={linkStyle}>Services</Link>
      <Link to="/contact" style={linkStyle}>Contact</Link>
    </nav>
  );
}

export default Navbar;
