import React from 'react';

const Home = ({ handleLogout }) => {
  return (
    <div>
      <h3>Home Sayfası</h3>
      <button onClick={handleLogout}>Çıkış Yap</button>
    </div>
  );
};

export default Home;
