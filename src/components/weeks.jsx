import React, { useEffect, useState } from 'react'
import Week from './week'
import Attention from './utils/attention'
import supabase from '../utils/supabase'
const Weeks = ({user}) => {
  const [userData,setUserData]=useState([])
  const message = 'Attention! Weeks are sorted by creation date!'
  const userId=user.id;
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const response = await supabase
      .from('weeks')
      .select('week_id, user_id, week_exercises, week_created_at')
      .eq('user_id', `${userId}`)

    const data = response.data;
    setUserData(data);
    console.log(userId);
  }

  return (
    <div className='p-2'>
      <Attention message={message}></Attention>
      {userData.map((date, index) => (
        <Week key={index} number={index + 1} data={userData} />
      ))}
    </div>
  )
}

export default Weeks
