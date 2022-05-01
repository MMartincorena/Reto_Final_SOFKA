import { TextField, Typography } from '@mui/material'
import React from 'react'
import { useDispatch} from 'react-redux';
import { guardarPedido } from '../../store/slices/formState';

export const TextAreaField = ({label}) => {
  

    const dispatchPedido = useDispatch()

    const handleChange = (e) => {
      dispatchPedido(guardarPedido(e.target.value.toString()))
    }
  
      return (
        <>
        <Typography textAlign={'center'} style={{marginTop:"25px", padding:'5px 5px'}}>Realice su pedido</Typography>
      <TextField
          required
          multiline={true}
          minRows={3}
          fullWidth 
          label={label}
          onChange={handleChange}
          style={{marginTop:30}}
      />
      </>
    )
  }
