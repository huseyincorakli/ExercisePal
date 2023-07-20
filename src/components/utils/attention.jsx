import { Alert } from '@mui/material'
import React from 'react'

const Attention = ({ message }) => {
  return (
    <div className="flex items-center justify-center mt-1">

    <Alert  sx={{ width:380,margin:0.5}} variant="filled" severity="warning">
      {message}
    </Alert>

</div>
  )
}

export default Attention
