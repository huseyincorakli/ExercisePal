import { Box, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';

const Exercises = ({ data }) => {
  const [exercisesData, setExercisesData] = useState([]);
  useEffect(() => {
    if (data && data.week_exercises) {
      setExercisesData(data.week_exercises);
    }
  }, [data]);

  if (exercisesData.length === 0) {
    return <div>Loading...</div>;
  }

  // Additional check to prevent mapping when exercisesData is not an array
  if (!Array.isArray(exercisesData)) {
    return <div>
      <div className='text-black'>
      <div className='flex justify-end m-2'>
        <div>
          <button className='bg-green-600 hover:bg-green-900 text-white font-semibold py-2 px-4 rounded mr-2'>
            Add Exercise
          </button>
          <button className='bg-red-600 hover:bg-red-900 text-white font-semibold py-2 px-4 rounded'>
            Delete All
          </button>
        </div>
       
      </div>
      <h2 className='text-white'>You have no exercise plan.Please add exercise.</h2>
    </div>
    </div>;
  }

  return (
    <div className='text-black'>
      <div className='flex justify-end m-2'>
        <div>
          <button className='bg-green-600 hover:bg-green-900 text-white font-semibold py-2 px-4 rounded mr-2'>
            Add Exercise
          </button>
          <button className='bg-red-600 hover:bg-red-900 text-white font-semibold py-2 px-4 rounded'>
            Delete All
          </button>
        </div>
      </div>
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
              <button className='bg-blue-500 mr-1 hover:bg-blue-600 text-white font-semibold py-1 px-1 rounded'>
                Edit
              </button>
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
