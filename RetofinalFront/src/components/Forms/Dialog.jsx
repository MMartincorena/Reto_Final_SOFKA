import * as React from "react"
import PropTypes from "prop-types"
import Button from "@mui/material/Button"
import { styled } from "@mui/material/styles"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"
import axios from "axios"
import { useSelector } from "react-redux"

import { useDispatch } from "react-redux"
import Reservar from "../Pages/Reservar"
import { Box } from "@mui/material"

const baseUrl = `${process.env.REACT_APP_API_URL}`

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(1),
    margin: theme.spacing(0),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}))

const borrarReserva = (id) => {
  axios.delete(`${baseUrl}/${id}`)
}

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props
  const { id } = useSelector((state) => state.formState)
  const dispatchCloseForm = useDispatch()

  return (
    <DialogTitle sx={{ m: 2, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={() => {
            onClose()
            borrarReserva(id)
          }}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
}

export default function CustomizedDialogs() {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Box>
      <Button variant="outlined" onClick={handleClickOpen}>
        Reservar
      </Button>

      <BootstrapDialog
        style={{ minWidth: 320 }}
        //onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Cree su reserva
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Reservar onClose={handleClose} />
        </DialogContent>
      </BootstrapDialog>
    </Box>
  )
}
