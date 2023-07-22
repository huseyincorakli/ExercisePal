import { Box, Modal, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddExeercise from './add_exercise'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%', // Set the initial width to 70% of the screen
  //maxWidth: '400px', // Optional: add a maximum width to the Modal
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const Exercises = ({ data,setRefreshData,refreshData }) => {
  const [exercisesData, setExercisesData] = useState([]);
  const [open, setOpen] = React.useState(false);

  
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (data && data.week_exercises) {
      setExercisesData(data.week_exercises);
    }
  }, [data]);

  if (exercisesData.length === 0) {
    return <div>Loading...</div>;
  }
  
  if (!Array.isArray(exercisesData)) {
    return <div>
      <div className='text-black'>
      <div className='flex justify-end m-2'>
        <div>
          <button onClick={handleOpen} className='bg-green-600 hover:bg-green-900 text-white font-semibold py-2 px-4 rounded mr-2'>
            Add Exercise
          </button>
        </div>
       
      </div>
      <h2 className='text-white'>You have no exercise plan.Please add exercise.</h2>
    </div>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{  
            ...style,
            width: '50%', // Set the width to 70% of the screen
            '@media (max-width: 600px)': {
              width: '98%',
            },
            maxHeight:'56%',
            backgroundColor:'#3B82F6',
            overflowY:'hidden'
          }}>
          <AddExeercise setRefreshData={setRefreshData} refreshData={refreshData} data={data} setOpen={setOpen}/>
        </Box>
      </Modal>
    </div>;
  }
  console.log(exercisesData);
  return (
    <div className='text-black'>
      <div className='flex justify-end m-2'>
        <div>
          <button onClick={handleOpen} className='bg-green-600 hover:bg-green-900 text-white font-semibold py-2 px-4 rounded mr-2'>
            Add Exercise
          </button>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{  
            ...style,
            width: '50%', // Set the width to 70% of the screen
            '@media (max-width: 600px)': {
              width: '98%',
            },
            maxHeight:'56%',
            backgroundColor:'#3B82F6',
            overflowY:'hidden'
          }}>
          <AddExeercise setRefreshData={setRefreshData} refreshData={refreshData}  data={data} setOpen={setOpen}/>
        </Box>
      </Modal>
      {exercisesData.map((exercise, index) => (
        <div key={index} className='h-[10rem] bg-white rounded-md shadow-md overflow-hidden mb-2'>
          <div className='w-auto p-4'>
            <table className='w-full'>
              <thead>
                <tr>
                  <th className='px-2 py-1 bg-gray-100 border'>Name</th>
                  <th className='px-2 py-1 bg-gray-100 border'>Repetition</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='px-2 py-1 border'>{exercise.exercise_title}</td>
                  <td className='px-2 py-1 border'> {exercise.exercise_rep}</td>
                </tr>
              </tbody>
            </table>
            <div className='flex justify-evenly float-right mt-1'>
              <button className='bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-1 rounded'>
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Exercises;
