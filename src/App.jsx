import React, { useState,useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import supabase from './utils/supabase';
import Loading from './components/utils/loading';
import SignUp from './pages/signup';
import Notification, {successLoginNotify,errorLoginNotify,errorLogOutNotify,successLogOutNotify} from './components/utils/notification'

import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user,setUser]=useState(null)
  const[loading,setLoading]=useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
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
        email: email,
        password: password,
      });
      
      if (auth.error) {
        console.error('Login failed:', error.message);
        errorLoginNotify();
        
      } else {
        setIsLoggedIn(true)
        setUser(auth.data.user)
        successLoginNotify();
        //console.log('Login successful:', auth.data.user);
      }
    } catch (error) {
      console.error('Login failed:', error.message);
      errorLoginNotify();
    }
    setLoading(false)
  };

  const handleLogout = async () => {
    setLoading(true)
    try {
      await supabase.auth.signOut();
      setIsLoggedIn(false);
      setUser(null);
      successLogOutNotify();
      setEmail(null);
      setPassword(null)
      console.log('Logged out successfully');
    } catch (error) {
      console.error('Logout failed:', error.message);
      errorLogOutNotify();
    }
    setLoading(false)
  };

  return (
    <div className='main h-auto'>
      <Notification/>
      <header className='my-4 mb-5 header animate-bounce '><h2 className='text-white text-3xl uppercase p-2'>Welcome To Exercise Pal</h2></header>
     
      <section className='mt-2 '>
      {
        loading?
        <div><Loading/></div>
        :
        <BrowserRouter>
        <Routes>
          {user ? (
            <Route path="/*" element={<Home handleLogout={handleLogout} />} />
          ) : (
            <Route path="/*" element={<Login handleEmailChange={(e) => setEmail(e.target.value)}
            handlePasswordChange={(e) => setPassword(e.target.value)} handleLogin={handleLogin} />} />
          )}
           <Route path="/signup" element={<SignUp />} />
          {user ? <Route path="/home" element={<Home handleLogout={handleLogout} />} /> : null}
          
        </Routes>
      </BrowserRouter>
      }
      </section>
    </div>
  );
}

export default App;
