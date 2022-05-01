import React from 'react'
import { Slider, Typography } from '@mui/material'

import { useDispatch, useSelector } from 'react-redux';
import { guardarCantidadPersonas } from '../../store/slices/formState';
import { Box } from '@mui/system';

export const InputPersonas = ({label}) => {

  const dispatchNumero = useDispatch()
  const {multiStepFormValue} = useSelector(state => state.formState)
  const {cantidadPersonas} = useSelector(state => state.formState)
  const handleChange = (e) => {
    dispatchNumero(guardarCantidadPersonas(Math.round((e.target.value)/10))); 
    console.log(multiStepFormValue.cantidadPersonas)
  }
    return (
        <Box style={{ padding:'20px 20px'}}>
        <Typography style={{marginTop:"25px"}}>Numero De personas {multiStepFormValue.cantidadPersonas}</Typography>
        <Slider
            min={10}
            value={cantidadPersonas}
            onChange={handleChange}
        />
        </Box>
    )
}
