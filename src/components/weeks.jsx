import React, { useEffect, useState } from 'react'
import Week from './week'
import PlayList from './playlist'
import supabase from '../utils/supabase'
import LinearProgress from '@mui/material/LinearProgress';
const Weeks = ({user}) => {
  const [userData,setUserData]=useState([])
  const[loading,setLoading]=useState(false)
  const message = 'Attention! Weeks are sorted by creation date!'
  const userId=user.id;
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    const response = await supabase
      .from('weeks')
      .select('week_id, user_id, week_exercises, week_created_at')
      .eq('user_id', `${userId}`)

    const data = response.data;
    setUserData(data);
    setLoading(false)
  }
  

  return (
    <div className='p-2'>
      <PlayList></PlayList>
      {!loading ?userData.map((date, index) => (
        <Week key={index} number={index + 1} data={userData} />
      )):<div className='p-2 mt-5'><LinearProgress/></div>}
    </div>
  )
}

export default Weeks
