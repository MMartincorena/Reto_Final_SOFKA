import React from 'react'
import { TextField, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'

import { useDispatch, useSelector } from 'react-redux';
import { guardarDia } from '../../store/slices/formState';



export const DateField = ({label}) => {
  

  const dispatchDia = useDispatch()
  const {multiStepFormValue} = useSelector( state => state.formState )
      return (<>
        
        <Typography textAlign={'center'} style={{marginTop:"40px", padding:'5px 5px'}}>Escoja Un Dia</Typography>
        <DatePicker
          minDate={new Date()}
          label={label}
          value={multiStepFormValue.dia}
          onChange={(value) => {
            dispatchDia(guardarDia(value.toString()))
          }}
          renderInput={(params) => <TextField fullWidth style={{marginTop:"30px"}}
          {...params}
          />}
        />
        </>
    )
  }
  