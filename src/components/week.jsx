import React from 'react'

const Week = ({ number,data }) => {
    console.log('week',data);
  return (
    <div className='border m-4 p-4 flex items-center rounded-tr-[40px] rounded-bl-[40px] bg-slate-600'>
      <p className='flex-1'>Week { number} </p>
      <button className='ml-auto border border-black'>Exercises</button>
    </div>
  )
}

export default Week
