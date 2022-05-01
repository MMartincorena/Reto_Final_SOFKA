import React from "react"
import { TextField } from "@mui/material"

import { useDispatch } from "react-redux"
import { guardarEmail, guardarNombre, guardarNumero, guardarTelefono } from "../../store/slices/formState"

export const InputField = ({ label, type = "text" }) => {
  const dispatchName = useDispatch()
  const dispatchEmail = useDispatch()
  const dispatchNumero = useDispatch()
  const dispatchTelefono = useDispatch()

  const handleChange = (e) => {
    switch (label) {
      case "Nombre":
        dispatchName(guardarNombre(e.target.value.toString()))
        break
      case "Email":
        dispatchEmail(guardarEmail(e.target.value.toString()))
        break
      case "Apellido":
        dispatchNumero(guardarNumero(e.target.value.toString()))
        break
      case "Teléfono":
        dispatchTelefono(guardarTelefono(e.target.value.toString()))
        break
    } //tel email
  }
  return <TextField type={type} fullWidth label={label} onChange={handleChange} style={{ marginTop: 30 }} required />
}
