import { Box, Button, Modal } from '@mui/material'
import React from 'react'
import Exercises from './exercises';
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

const Week = ({ weekname,number, data,setRefreshData,refreshData }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  
 
  return (
    <div className='border bg-[#7895CB] m-4 p-4 flex items-center rounded-tr-[40px] rounded-bl-[40px]'>
      <p className='flex-1 text-black'>{weekname} </p>
      <button
      onClick={handleOpen}
        type='button'
        class='text-white bg-blue-700 hover:bg-blue-800  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-tr-[30px] rounded-bl-[30px] text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
      >
        Exercises
        <svg
          class='w-3.5 h-3.5 ml-2'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 14 10'
        >
          <path
            stroke='currentColor'
            stroke-linecap='round'
            stroke-linejoin='round'
            stroke-width='2'
            d='M1 5h12m0 0L9 1m4 4L9 9'
          />
        </svg>
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{  
            ...style,
            width: '85%', // Set the width to 70% of the screen
            '@media (max-width: 600px)': {
              width: '98%',
            },
            maxHeight:'70%',
            backgroundColor:'#1E0B32',
            overflowY:'scroll',
          }}>
          <Exercises data={number} setRefreshData={setRefreshData} refreshData={refreshData}></Exercises>
        </Box>
      </Modal>
    </div>
  )
}
export default Week
