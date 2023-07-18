import React from 'react';

const Login = ({ handleLogin }) => {
  return (
    <div>
      <h3>Login Sayfası</h3>
      <button onClick={handleLogin}>Giriş Yap</button>
    </div>
  );
};

export default Login;
