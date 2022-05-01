import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = `${process.env.REACT_APP_API_URL}`
const formatDate = (string) => {
    let date = Date.parse(string)
    let formatted_date = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    return formatted_date;
}

export const formStateSlice = createSlice({
    name: 'formState',
    initialState: {
        multiStepFormValue: {
            cantidadPersonas: 1,
            cliente: {
                apellido: '',
                email: '',
                nombre: '',
            },
            dia: new Date().toString(),
            hora: '08:00',
            mensaje: '',
            telefono: 0
        },
        id: '',
        reservasDelDia: [],
        alertasForm:{
            formExitoso: false,
            formFeo: false,
            formActualizado: false,
            formHoraInvalida: false,
        }
    },
    reducers: {
        setFormHoraInvalida: (state, action) => {
            state.alertasForm.formHoraInvalida = action.payload
        },
        setFormActualizado: (state, action) => {
            state.alertasForm.formActualizado = action.payload
        },
        setFormFeo: (state, action) => {
            state.alertasForm.formFeo = action.payload
        },
        setFormExitoso: (state, action) => {
            state.alertasForm.formExitoso = action.payload
        },
        setBuscarReservasDelDia: (state, action) => {
            state.reservasDelDia = action.payload
        },
        setCantidadPersonas: (state, action) => {
            state.multiStepFormValue.cantidadPersonas = action.payload
        },
        setTelefono: (state, action) => {
            state.multiStepFormValue.telefono = action.payload
        },
        setDia: (state, action) => {
            state.multiStepFormValue.dia = action.payload
        },
        setHora: (state, action) => {
            state.multiStepFormValue.hora = action.payload
        },
        setName: (state, action) => {
            state.multiStepFormValue.cliente.nombre = action.payload
        },
        setEmail: (state, action) => {
            state.multiStepFormValue.cliente.email = action.payload
        },
        setNumber: (state, action) => {
            state.multiStepFormValue.cliente.apellido = action.payload
        },
        setPedido: (state, action) => {
            state.multiStepFormValue.mensaje = action.payload
        },
        setId: (state, action) => {
            state.id = action.payload
        },
    }
})

export const { setFormHoraInvalida ,setFormActualizado ,setFormFeo ,setFormExitoso ,setDia, setHora, setName, setEmail, setNumber, setPedido, setId, setCantidadPersonas, setTelefono, setBuscarReservasDelDia } = formStateSlice.actions;

export const seeAlertHoraInvalida = (bool) => (dispatch) => {
    dispatch(setFormHoraInvalida(bool))
}

export const seeAlertActualizada = (bool) => (dispatch) => {
    dispatch(setFormActualizado(bool))
}

export const seeAlertFea = (bool) => (dispatch) => {
    dispatch(setFormFeo(bool))
}

export const seeAlertExitosa = (bool) => (dispatch) => {
    dispatch(setFormExitoso(bool))
}

export const setInitialState = () => (dispatch) => {
    dispatch(setCantidadPersonas(1))//Set personas
    dispatch(setNumber(''))//Set apellido
    dispatch(setEmail(''))//Set email
    dispatch(setName(''))
    dispatch(setDia(new Date().toString()))
    dispatch(setHora('08:00'))
    dispatch(setPedido(''))
    dispatch(setTelefono(0))
    dispatch(setId(''))
    dispatch(setBuscarReservasDelDia([]))
}

export const guardarCantidadPersonas = (cantidadPersonas) => (dispatch) => {
    dispatch(setCantidadPersonas(cantidadPersonas))
}

export const guardarTelefono = (telefono) => (dispatch) => {
    dispatch(setTelefono(telefono))
}

export const guardarId = (id) => (dispatch) => {
    dispatch(setId(id))
}

export const guardarDia = (dia) => (dispatch) => {
    dispatch(setDia(dia))
}

export const guardarHora = (hora) => (dispatch) => {
    dispatch(setHora(hora))
}

export const guardarNombre = (nombre) => (dispatch) => {
    dispatch(setName(nombre))
}

export const guardarEmail = (email) => (dispatch) => {
    dispatch(setEmail(email))
}

export const guardarNumero = (numero) => (dispatch) => {
    dispatch(setNumber(numero.toString()))
}

export const guardarPedido = (mensaje) => (dispatch) => {
    dispatch(setPedido(mensaje))
}

export const postReservaReducer = (multiStepFormValue, dispatchId, setId) => (dispatch) => {
    fetch(baseUrl, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            dia: formatDate(multiStepFormValue.dia),
            hora: multiStepFormValue.hora
        }),
    }).then(res => {
        res.json()
        // console.log(res.json())
        //console.log(res)
    })
        .then(res => {
            console.log("Post reserva" + formatDate(multiStepFormValue.dia) + multiStepFormValue.hora)

            //console.log(res)
            dispatchId(setId(res.id))
        }).catch(err => console(err))
        ;
};


export const getReservasPorDia = (dia) => (dispatch) => {
    const diaActualizado = dia.replace("/", "%2F")
    const diaActualizado2 = diaActualizado.replace("/", "%2F")
    axios.get(`${baseUrl}/findByDia/${diaActualizado2}`).then(res => {

        //console.log(res.data)
        dispatch(setBuscarReservasDelDia(res.data))
    });

};


export default formStateSlice.reducer;