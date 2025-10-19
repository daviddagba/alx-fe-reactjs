import React, { useState } from 'react';

export default function RegistrationForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  function validate() {
    const newErrors = {};
    if (!username.trim()) newErrors.username = 'Username is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (email && !emailPattern.test(email)) newErrors.email = 'Email is invalid';
    return newErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage('');
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setSubmitting(true);
    try {
      const res = await fetch('https://example.com/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      setMessage('Registration successful');
      setUsername('');
      setEmail('');
      setPassword('');
      setErrors({});
    } catch (err) {
      setMessage('Registration failed (mock)');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} aria-label="registration-form">
      <h2>Registration (controlled)</h2>

      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
        />
        {errors.username && <div role="alert">{errors.username}</div>}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
        {errors.email && <div role="alert">{errors.email}</div>}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
        {errors.password && <div role="alert">{errors.password}</div>}
      </div>

      <button type="submit" disabled={submitting}>
        {submitting ? 'Submitting...' : 'Register'}
      </button>

      {message && <p>{message}</p>}
    </form>
  );
}
