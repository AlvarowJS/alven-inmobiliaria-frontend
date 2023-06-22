import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
const URL = 'https://backend.alven-inmobiliaria.com.mx/api/v1/asesor'


const FormCliente = ({
  modal, toggle, submit, control, register, reset, errors, handleSubmit
}) => {

  const token = localStorage.getItem('token');
  const [options, setOptions] = useState()

  useEffect(() => {
    axios.get(URL, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => setOptions(res.data))
      .catch(err => null)
  }, [])


  return (
    <Modal isOpen={modal} toggle={toggle} size='lg'>
      <ModalHeader toggle={toggle}>
        Registrar Cliente
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(submit)}>
          <div className="form-group mx-4 mb-2">
            <label htmlFor="nombre">Nombre</label>
            <input type="text" className="form-control" id="nombre"
              {...register('nombre')}
              placeholder="Alvaro..."
              required
            />
          </div>

          <div className="form-group mx-4 mb-2">
            <label htmlFor="apellido_paterno">Apellido Paterno</label>
            <input type="text" className="form-control" id="apellido_paterno"
              {...register('apellido_paterno')}
              placeholder="Rosas"
              required
            />
          </div>

          <div className="form-group mx-4 mb-2">
            <label htmlFor="apellido_materno">Apellido Materno</label>
            <input type="text" className="form-control" id="apellido_materno"
              {...register('apellido_materno')}
              placeholder="Perez"
              required
            />
          </div>

          <div className="form-group mx-4 mb-2">
            <label htmlFor="nombre_tarifa">Seleccionar al Asesor</label>
            <select className="form-select" id="asesor_id" {...register("asesor_id")}>
              {
                options?.map(option => (
                  <option key={option.id} value={option.id}>{option.nombre} {option.apellidos}</option>
                ))
              }
            </select>
          </div>

          <div className="form-group mx-4 mb-2">
            <label htmlFor="cedula">Cedula</label>
            <input type="text" className="form-control" id="cedula"
              {...register('cedula')}
              placeholder="7468737"
              required
            />
          </div>

          <div className="form-group mx-4 mb-2">
            <label htmlFor="email">Email</label>
            <input type="email" className="form-control" id="email"
              {...register('email')}
              placeholder="ejemplo@gmail.com"
              required
            />
          </div>

          <div className="form-group mx-4 mb-2">
            <label htmlFor="celular">Celular</label>
            <input type="text" className="form-control" id="celular"
              {...register('celular')}
              placeholder="99 442409"
              required
            />
          </div>

          <div className="form-group mx-4 mb-2">
            <label htmlFor="medio_contacto">Medio de Contacto</label>
            <input type="text" className="form-control" id="medio_contacto"
              {...register('medio_contacto')}
              placeholder="celular, email, telefono..."
              required
            />
          </div>


          <button className='btn btn-primary mx-4 mb-2'>Enviar</button>
          {/* <button className='btn btn-secondary' onClick={toggle}>Cancelar</button> */}
        </form>
      </ModalBody>

    </Modal>
  )
}

export default FormCliente