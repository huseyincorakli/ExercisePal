import { Box, Modal } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddExercise from './add_exercise'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3
}

const Exercises = ({ data, setRefreshData, refreshData }) => {
  const [exercisesData, setExercisesData] = useState([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (data && data.week_exercises) {
      setExercisesData(data.week_exercises)
    }
  }, [data])

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDeleteExercise = exerciseId => {
    if(confirm("Are you sure ?") == true){
      //delete exercise
      setRefreshData(true);
    }
    
  }
  setRefreshData(false);
  if (exercisesData.length === 0) {
    return (
      <div>
        <div className='text-black'>
          <div className='flex justify-end m-2'>
            <button
              onClick={handleOpen}
              className='bg-green-600 hover:bg-green-900 text-white font-semibold py-2 px-4 rounded mr-2'
            >
              Add Exercise
            </button>
          </div>
          <h2 className='text-white'>
            You have no exercise plan. Please add an exercise.
          </h2>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='parent-modal-title'
          aria-describedby='parent-modal-description'
        >
          <Box
            sx={{
              ...style,
              width: '50%',
              '@media (max-width: 600px)': { width: '98%' },
              maxHeight: '56%',
              backgroundColor: '#3B82F6',
              overflowY: 'hidden'
            }}
          >
            <AddExercise
              setRefreshData={setRefreshData}
              refreshData={refreshData}
              data={data}
              setOpen={setOpen}
            />
          </Box>
        </Modal>
      </div>
    )
  }

  return (
    <div className='text-black'>
      <div className='flex justify-end m-2'>
        <button
          onClick={handleOpen}
          className='bg-green-600 hover:bg-green-900 text-white font-semibold py-2 px-4 rounded mr-2'
        >
          Add Exercise
        </button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
      >
        <Box
          sx={{
            ...style,
            width: '50%',
            '@media (max-width: 600px)': { width: '98%' },
            maxHeight: '56%',
            backgroundColor: '#3B82F6',
            overflowY: 'hidden'
          }}
        >
          <AddExercise
            setRefreshData={setRefreshData}
            refreshData={refreshData}
            data={data}
            setOpen={setOpen}
          />
        </Box>
      </Modal>
      {exercisesData.map(exercise => (
        <div
          key={exercise.exercise_id}
          className='h-[10rem] bg-white rounded-md shadow-md overflow-hidden mb-2'
        >
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
                  <td className='px-2 py-1 border'>
                    {exercise.exercise_title}
                  </td>
                  <td className='px-2 py-1 border'>{exercise.exercise_rep}</td>
                </tr>
              </tbody>
            </table>
            <div className='flex justify-evenly float-right mt-1'>
              <button
                onClick={() => handleDeleteExercise(exercise.exercise_id)}
                className='bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-1 rounded'
              >
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
