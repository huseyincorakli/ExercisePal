import React, { useState,useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import supabase from './utils/supabase';
import Loading from './components/utils/loading';
import SignUp from './pages/signup';
import Notification, {successLoginNotify,errorLoginNotify,errorLogOutNotify,successLogOutNotify} from './components/utils/notification'


import './App.css'
import ResetPasword from './pages/resetPasword';
//userid:auth.data.user.id
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
        errorLoginNotify(auth.error);
      } else {
        setIsLoggedIn(true)
        setUser(auth.data.user)
        const mail = auth.data.user.email.split('@')[0];
        successLoginNotify(mail);
        setCurrentUser(auth.data.user)
 
      }
    } catch (err) {
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
    } catch (error) {
      errorLogOutNotify();
    }
    setLoading(false)
  };

  return (
    <div className='main h-auto'>
      <Notification/>
      <header  className='mt-2 mb-1 header animate-bounce '><h2 className='text-white text-3xl uppercase p-2'>Welcome To Exercise Pal </h2>
      </header>
     
      <section className='mt-2 '>
      {
        loading?
        <div><Loading/></div>
        :
        <BrowserRouter>
        <Routes>
          {user ? (
            <Route path="/*" element={<Home user={user} handleLogout={handleLogout} />} />
          ) : (
            <Route path="/*" element={<Login handleEmailChange={(e) => setEmail(e.target.value)}
            handlePasswordChange={(e) => setPassword(e.target.value)} handleLogin={handleLogin} />} />
          )}
           <Route path="/signup" element={<SignUp />} />
           <Route path="/update-password" element={<ResetPasword />} />
          {user ? <Route path="/home" element={<Home user={user} handleLogout={handleLogout} />} /> : null}
          
        </Routes>
      </BrowserRouter>
      }
      </section>
    </div>
  );
}

export default App;
