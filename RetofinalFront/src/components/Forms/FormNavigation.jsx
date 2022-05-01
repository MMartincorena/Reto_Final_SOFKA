import React from 'react'
import { Button } from '@mui/material'


export const FormNavigation = (props) => {
  return (
    <div
        style={{
            display: 'flex',
            marginTop: 50,
            minWidth: 20,
            justifyContent: 'center'
        }}
    >
        {props.hasPrevious && <Button onClick={props.onBackClick} type='button' variant='contained' >Back</Button>}

        <Button variant='outlined' type='submit' color='primary' >{props.isLastStep ? 'Reservar' : 'Next'}</Button>
    </div>
  )
}
