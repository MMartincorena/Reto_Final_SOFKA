import React from "react"
import { useState } from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import Alert from "@mui/material/Alert"
import Stack from "@mui/material/Stack"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { seeAlertActualizada } from "../../store/slices/formState"

export const Reservation = ({ onClose }) => {
  const dispatchAlertActualizada = useDispatch()

  const [buscador, setBuscador] = useState(false)
  const [input, setInput] = useState("")
  const [input2, setInput2] = useState("")
  const [reserva, setReserva] = useState([])
  const [busquedaRealizada, setBusquedaRealizada] = useState(false)
  const [error, setError] = useState("")
  const [modificando, setModificando] = useState(false)

  const baseUrl = `${process.env.REACT_APP_API_URL}/`
  const endPoint = `${input}`

  const search = () => {
    if (input.length > 0) {
      fetch(baseUrl + endPoint)
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          setReserva(data)
          setBusquedaRealizada(true)
        })
        .catch((error) => {
          setError(error)
        })
    }
  }

  const handleClick = () => {
    validarTiempoModificacion()
  }

  const modificarPedido = () => {
    fetch(baseUrl + endPoint, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cantidadPersonas: reserva.cantidadPersonas,
        cliente: {
          apellido: reserva.cliente.apellido,
          email: reserva.cliente.email,
          nombre: reserva.cliente.nombre,
        },
        dia: reserva.dia,
        hora: reserva.hora,
        mensaje: input2,
        telefono: reserva.telefono,
      }),
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        console.error(error)
      })

    onClose()
  }
  const postEmail = () => {
    fetch(`${baseUrl}sendEmailModification`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cantidadPersonas: reserva.cantidadPersonas,
        cliente: {
          apellido: reserva.cliente.apellido,
          email: reserva.cliente.email,
          nombre: reserva.cliente.nombre,
        },
        dia: reserva.dia,
        hora: reserva.hora,
        mensaje: input2,
        telefono: reserva.telefono,
        id: input,
      }),
    })
      .then((res) => res)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }

  const cancelarModificacion = () => {
    onClose()
    modificando(false)
    setInput2("")
  }

  const enviarEmailCancelar = () => {
    fetch(`${baseUrl}sendEmailDelete`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cantidadPersonas: reserva.cantidadPersonas,
        cliente: {
          apellido: reserva.cliente.apellido,
          email: reserva.cliente.email,
          nombre: reserva.cliente.nombre,
        },
        dia: reserva.dia,
        hora: reserva.hora,
        mensaje: input2,
        telefono: reserva.telefono,
        id: input,
      }),
    })
      .then((res) => res)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }

  const validarTiempoModificacion = async () => {
    let diaSplit = reserva.dia.split("/")
    let dateActual = new Date()
    let dateReserva = new Date(
      [diaSplit[2], diaSplit[0], diaSplit[1]].map((d) => (d.length == 1 ? "0" + d : d)).join("-") + "T" + reserva.hora
    )
    if (dateReserva - dateActual > 7200000) {
      dispatchAlertActualizada(seeAlertActualizada(true))
      setTimeout(() => {
        dispatchAlertActualizada(seeAlertActualizada(false))
      }, 4000)
      modificarPedido()
      postEmail()
      onClose()
    } else {
      onClose()
      alert("Fuera del rango de hora para modificar la reserva, comuníquese con el administrador del restaurante")
    }
  }

  const validarTiempo = async () => {
    console.log("entre a validar", reserva.dia)

    let diaSplit = reserva.dia.split("/")
    let dateActual = new Date()
    let dateReserva = new Date(
      [diaSplit[2], diaSplit[0], diaSplit[1]].map((d) => (d.length == 1 ? "0" + d : d)).join("-") + "T" + reserva.hora
    )

    console.log(dateActual, dateReserva)
    console.log(reserva.hora)
    if (dateReserva - dateActual > 7200000) {
      cancelarReserva()
      enviarEmailCancelar()
    } else {
      alert("Fuera del rango de hora para cancelar, comuníquese con el administrador del restaurante")
    }
  }

  const cancelarReserva = () => {
    if (window.confirm("¿Está seguro de querer cancelar su reserva?")) {
      fetch(baseUrl + endPoint, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cantidadPersonas: reserva.cantidadPersonas,
          cliente: {
            apellido: reserva.cliente.apellido,
            email: reserva.cliente.email,
            nombre: reserva.cliente.nombre,
          },
          dia: reserva.dia,
          hora: reserva.hora,
          mensaje: input2,
          telefono: reserva.telefono,
        }),
      })
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          console.log(data)
          alert("Cancelación exitosa")
        })
        .catch((error) => {
          console.error(error)
        })
    }
    onClose()
  }

  return (
    <div>
      <TextField
        label="Código de reseva"
        variant="outlined"
        required
        value={input}
        onChange={(e) => {
          setInput(e.target.value)
          setBusquedaRealizada(false)
          setError("")
        }}
      />
      <br />
      <Button
        variant="outlined"
        onClick={() => {
          setBuscador(false)
          onClose()
        }}
      >
        Cancelar
      </Button>
      <Button variant="outlined" onClick={search}>
        Buscar
      </Button>
      {busquedaRealizada ? (
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "50ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <br />
          <div>
            <h4>Reserva</h4>
            <TextField id="day-disabled" disabled label="Día de la reserva" defaultValue={reserva.dia} />
            <TextField id="time-disabled" disabled label="Hora de la reserva" defaultValue={reserva.hora} />
            <TextField
              id="customername-disabled"
              disabled
              label="Nombre del cliente"
              defaultValue={reserva.cliente.nombre}
            />
            <TextField
              id="customersurname-disabled"
              disabled
              label="Apellido del cliente"
              defaultValue={reserva.cliente.apellido}
            />
            <TextField
              id="customeremail-disabled"
              disabled
              label="Correo electrónico"
              defaultValue={reserva.cliente.email}
            />
            <TextField
              id="customerphone-disabled"
              disabled
              label="Número de teléfono"
              defaultValue={reserva.telefono}
            />
            <TextField
              id="customerperson-disabled"
              disabled
              label="Cantidad de personas"
              defaultValue={reserva.cantidadPersonas}
            />
            <TextField id="order-disabled" disabled label="Pedido" defaultValue={reserva.mensaje} />
            <Button variant="outlined" onClick={() => setModificando(true)}>
              Modificar reserva
            </Button>
            <Button id="idcancelarReserva" variant="outlined" onClick={() => validarTiempo()}>
              Cancelar reserva
            </Button>
          </div>
        </Box>
      ) : (
        <></>
      )}
      {modificando ? (
        <div>
          <p className="mt-3">Modifica tu pedido aquí</p>
          <TextField
            required
            id="customersurname-disabled"
            label="Nuevo pedido"
            multiline
            value={input2}
            rows={4}
            onChange={(e) => {
              setInput2(e.target.value)
              setBusquedaRealizada(false)
              setError("")
            }}
          />
          <br />
          <Button
            variant="outlined"
            className="mt-2"
            onClick={() => {
              if (input2) {
                handleClick()
              }
            }}
          >
            Guardar modificación
          </Button>
          <Button
            variant="outlined"
            className="mt-2"
            onClick={() => {
              cancelarModificacion()
              onClose()
            }}
          >
            Cancelar modificación
          </Button>
        </div>
      ) : (
        <></>
      )}

      {error ? (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">No hay reservaciones con este código</Alert>
        </Stack>
      ) : (
        <></>
      )}
    </div>
  )
}
