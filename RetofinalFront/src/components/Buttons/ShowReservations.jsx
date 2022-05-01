import { useState } from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import Alert from "@mui/material/Alert"
import Stack from "@mui/material/Stack"

const ShowReservations = () => {
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

  const modificarPedido = () => {
    console.log("Aqui el nuevo pedido: " + input2)
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
  }
  const cancelarModificacion = () => {
    modificando(false)
    setInput2("")
  }
  return (
    <div>
      <Button variant="outlined" onClick={() => setBuscador(true)}>
        Mis reservas
      </Button>

      {buscador ? (
        <div>
          <br />
          <label>Ingresa tu código de reserva</label>
          <br />
          <TextField
            label="Código de reseva"
            variant="outlined"
            onChange={(e) => {
              setInput(e.target.value)
              setBusquedaRealizada(false)
              setError("")
            }}
          />
          <br />
          <Button variant="outlined" onClick={() => setBuscador(false)}>
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
                <TextField id="order-disabled" disabled label="Pedido" defaultValue={reserva.mensaje} />
                <Button variant="outlined" onClick={() => setModificando(true)}>
                  Modificar pedido
                </Button>
                <Button variant="outlined">Cancelar reserva</Button>
              </div>
            </Box>
          ) : (
            <></>
          )}
          {modificando ? (
            <div>
              <p>Modificando el pedido</p>
              <TextField
                id="customersurname-disabled"
                label="Nuevo pedido"
                onChange={(e) => {
                  setInput2(e.target.value)
                  setBusquedaRealizada(false)
                  setError("")
                }}
              />
              <Button variant="outlined" onClick={() => modificarPedido()}>
                Guardar modificación
              </Button>
              <Button variant="outlined" onClick={() => cancelarModificacion()}>
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
      ) : (
        <></>
      )}
    </div>
  )
}

export default ShowReservations
