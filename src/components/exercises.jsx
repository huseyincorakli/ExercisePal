import { Box, Paper } from '@mui/material'
import React from 'react'

const Exercises = ({ data }) => {
  console.log('exercises:', data.week_exercises)
  return (
    <div className='text-black '>
      <div class='flex justify-end m-2'>
        <div>
          <button class='bg-green-600 hover:bg-green-900 text-white font-semibold py-2 px-4 rounded mr-2'>
            Add Exercise
          </button>
          <button class='bg-red-600 hover:bg-red-900 text-white font-semibold py-2 px-4 rounded'>
            Delete All
          </button>
        </div>
      </div>
      {data.week_exercises.map((exercise, index) => (
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
  )
}

export default Exercises
