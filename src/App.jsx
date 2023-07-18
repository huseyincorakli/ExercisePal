import React, { useState,useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import supabase from './utils/supabase';
import Loading from './components/utils/loading';
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user,setUser]=useState(null)
  const[loading,setLoading]=useState(false)
  
  useEffect(()=>{
    const session = supabase.auth.getUser();
    
    if (session) {
      setLoading(true)
      session.then((item)=>{
        const user= item.data.user
        setUser(user);
      })
      setLoading(false)
    }
  },[])
  const handleLogin = async () => {
    setLoading(true)
    try {
      const auth = await supabase.auth.signInWithPassword({
        email: 'user@gmail.com',
        password: '123',
      });
      
      if (auth.error) {
        console.error('Login failed:', error.message);
      } else {
        setIsLoggedIn(true)
        setUser(auth.data.user)
        //console.log('Login successful:', auth.data.user);
      }
    } catch (error) {
      console.error('Login failed:', error.message);
    }
    setLoading(false)
  };

  const handleLogout = async () => {
    setLoading(true)
    try {
      await supabase.auth.signOut();
      setIsLoggedIn(false);
      setUser(null);
      console.log('Logged out successfully');
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
    setLoading(false)
  };

  return (
    <div>
      <header><h2>Merhaba cart curt</h2></header>
      <hr />
      <section>
      {
        loading?
        <div><Loading/></div>
        :
        <BrowserRouter>
        <Routes>
          {user ? (
            <Route path="/*" element={<Home handleLogout={handleLogout} />} />
          ) : (
            <Route path="/*" element={<Login handleLogin={handleLogin} />} />
          )}
          {user ? <Route path="/home" element={<Home handleLogout={handleLogout} />} /> : null}
        </Routes>
      </BrowserRouter>
      }
      </section>
    </div>
  );
}

export default App;
