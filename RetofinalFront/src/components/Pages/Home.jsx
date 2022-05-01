import React from "react"
import imagenlogo from "../../assets/img/Foodka.jpg"
import imagenalmuerzo from "../../assets/img/almuerzo1.jpg"
import Footer from "./Footer"
import Dialog from "../Forms/Dialog"
import DialogButtons from "../Buttons/DialogButtons"
import { useSelector, useDispatch } from "react-redux"
import { AlertNice } from "../Alertas/AlertNice"
const Home = () => {
  const { alertasForm } = useSelector((state) => state.formState)
  
  return (
    <div>
      <div className="card mb-3 align-items-center">
        <img src={imagenlogo} className="img-fluid" />
      </div>
      {
        alertasForm.formExitoso && <AlertNice mensaje={`Reserva exitosa revise su correo para ver su codigo`}/>
      }
      {
        alertasForm.formActualizado && <AlertNice mensaje={`Reserva actualizada con exito`}/>
      }
      {
        alertasForm.formHoraInvalida && <AlertNice exito={false} mensaje={`"No es posible realizar la cancelación porque no está dentro del tiempo permitido, debe ser con mínimo dos horas de anticipación !Comuníquese por favor con el restaurante!"`}/>
      }
      {
        alertasForm.formFeo && <AlertNice mensaje={"Seleccione una Hora por favor"} exito={false}/>
      }
      <div className="row">
        <div className="col-sm-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Reserva</h5>
              <p className="card-text">Reserva nuestra mesa exclusiva</p>
              <Dialog fullScreen={true} />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Mis reservas</h5>
              <p className="card-text">¡Busca aquí tus reservas pendientes!</p>
              <DialogButtons />
            </div>
          </div>
        </div>
      </div>
      <div className="carrusel">
        <div className="container mt-5">
          <div className="row align-items-center">
            <div className="col-4">
              <div id="carouselExampleDark" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img src={imagenalmuerzo} className="d-block w-100" />
                    <div>
                      <h5 className="nombrescarrusel">Desayunos</h5>
                      <p className="nombrescarrusel">Deliciosos desayunos</p>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <img src={imagenalmuerzo} className="d-block w-100" alt="..." />
                  </div>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleDark"
                  data-bs-slide="prev"
                >
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleDark"
                  data-bs-slide="next"
                >
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                </button>
              </div>
            </div>
            <div className="col-4">
              <div id="carouselExampleDark" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img src={imagenalmuerzo} className="d-block w-100" />
                    <div>
                      <h5 className="nombrescarrusel">Almuerzos</h5>
                      <p className="nombrescarrusel">Deliciosos almuerzos</p>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <img src={imagenalmuerzo} className="d-block w-100" alt="..." />
                  </div>
                </div>

                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleDark"
                  data-bs-slide="prev"
                >
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleDark"
                  data-bs-slide="next"
                >
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                </button>
              </div>
            </div>
            <div className="col-4">
              <div id="carouselExampleDark" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img src={imagenalmuerzo} className="d-block w-100" />
                    <div>
                      <h5 className="nombrescarrusel">Cenas</h5>
                      <p className="nombrescarrusel">Deliciosas cenas</p>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <img src={imagenalmuerzo} className="d-block w-100" alt="..." />
                  </div>
                </div>

                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleDark"
                  data-bs-slide="prev"
                >
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleDark"
                  data-bs-slide="next"
                >
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Home
