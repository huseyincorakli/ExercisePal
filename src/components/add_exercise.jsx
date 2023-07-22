import React, { useState } from 'react'
import supabase from '../utils/supabase';
import { v4 as uuidv4 } from 'uuid';
const AddExeercise = ({setOpen,data,setRefreshData,refreshData}) => {
    const newExerciseId = uuidv4();
    const [exerciseData, setExerciseData] = useState({
        exercise_id:newExerciseId,
        exercise_rep: '',
        exercise_title: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setExerciseData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };
    
      const handleSubmit = async(e) => {
        e.preventDefault();
        const weekId = data.week_id;
        const userId = data.user_id;
    
        // Get the existing week_exercises from the database for the given weekId and userId
        const { data: weekData, error: weekError } = await supabase
          .from('weeks')
          .select('week_exercises')
          .match({ week_id: weekId, user_id: userId })
          .single();
    
        if (weekError) {
          console.error('Error fetching week data:', weekError);
          return;
        }
    
        // Check if week_exercises is an array, if not, initialize as an empty array
        const existingWeekExercises = Array.isArray(weekData.week_exercises)
          ? weekData.week_exercises
          : [];
    
        // Merge the new exerciseData with the existing week_exercises
        const updatedWeekExercises = [
          ...existingWeekExercises,
          exerciseData,
        ];
    
        // Update the week_exercises field in the database using jsonb_set
        const { error: updateError } = await supabase
          .from('weeks')
          .update({ week_exercises: updatedWeekExercises })
          .match({ week_id: weekId, user_id: userId });
        if (updateError) {
          console.error('Error updating week_exercises:', updateError);
          return;
        }
    
        // Clear the form fields after submission
        setExerciseData({
          exercise_id:newExerciseId,
          exercise_rep: '',
          exercise_title: '',
        });
        
        setOpen(false);
        setRefreshData(true)
      }
  return (
    <form className='p-6 bg-white rounded-lg shadow-md'>
    <div className='mb-4'>
      <label htmlFor='exercise_rep' className='block text-sm font-medium text-gray-700'>
        Exercise Repetition
      </label>
      <input
        type='text'
        id='exercise_rep'
        name='exercise_rep'
        value={exerciseData.exercise_rep}
        onChange={handleChange}
        placeholder='Enter Exercise Repetition'
        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-300'
      />
    </div>
    <div className='mb-4'>
      <label htmlFor='exercise_title' className='block text-sm font-medium text-gray-700'>
        Exercise Title
      </label>
      <input
        type='text'
        id='exercise_title'
        name='exercise_title'
        value={exerciseData.exercise_title}
        onChange={handleChange}
        placeholder='Enter Exercise Title'
        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-300'
      />
    </div>
    <div className='flex justify-end'>
      <button
        type='submit'
        onClick={handleSubmit}
        className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded'
      >
        Add Exercise
      </button>
    </div>
  </form>
  )
}

export default AddExeercise