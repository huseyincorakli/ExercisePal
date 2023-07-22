import React, { useEffect, useState } from 'react';
import Week from './week';
import PlayList from './playlist';
import supabase from '../utils/supabase';
import LinearProgress from '@mui/material/LinearProgress';

const Weeks = ({ user }) => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshData,setRefreshData]=useState(false)
  const message = 'Attention! Weeks are sorted by creation date!';
  const userId = user.id;

  useEffect(() => {
    fetchData();
  }, [refreshData]);

  const fetchData = async () => {
    setLoading(true);
    const response = await supabase
      .from('weeks')
      .select('week_id, user_id, week_exercises, week_created_at, week_name')
      .eq('user_id', `${userId}`);

    const data = response.data;

    // Sort the data array by week_name in ascending order
    const sortedData = data.sort((a, b) => a.week_name.localeCompare(b.week_name));

    setUserData(sortedData);
    setLoading(false);
    setRefreshData(false)
  };

  return (
    <div className='p-2'>
      <PlayList></PlayList>
      {!loading ? (
        userData.map((weekData, index) => (
          <Week setRefreshData={setRefreshData}refreshData={refreshData} key={index} number={weekData} weekname={weekData.week_name} data={userData} />
        ))
      ) : (
        <div className='p-2 mt-5'>
          <LinearProgress />
        </div>
      )}
    </div>
  );
};

export default Weeks;
