import React, { useEffect, useState } from 'react'
import { Button, Col, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import alvenApi from '../../api/alvenApi'
const URL = '/v1/asesor'


const FormCliente = ({
  modal, toggle, submit, control, register, reset, errors, handleSubmit
}) => {

  const token = localStorage.getItem('token');
  const [options, setOptions] = useState()

  useEffect(() => {
    alvenApi.get(URL, {
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
            <label htmlFor="celular">Celular</label>
            <input type="text" className="form-control" id="celular"
              {...register('celular')}

            />
          </div>

          <div className="form-group mx-4 mb-2">
            <label htmlFor="nombre">Nombre</label>
            <input type="text" className="form-control" id="nombre"
              {...register('nombre')}

            />
          </div>

          <div className="form-group mx-4 mb-2">
            <label htmlFor="apellido_paterno">Apellido Paterno</label>
            <input type="text" className="form-control" id="apellido_paterno"
              {...register('apellido_paterno')}

            />
          </div>

          <div className="form-group mx-4 mb-2">
            <label htmlFor="apellido_materno">Apellido Materno</label>
            <input type="text" className="form-control" id="apellido_materno"
              {...register('apellido_materno')}

            />
          </div>

          <div className="form-group mx-4 mb-2">
            <label htmlFor="nombre_tarifa">Seleccionar al Asesor</label>
            <select className="form-select" id="asesor_id" {...register("asesor_id")}>
            <option key="" value="">Sin asesor</option>
              {
                options?.map(option => (
                  <option key={option.id} value={option.id}>{option.nombre} {option.apellidos}</option>
                ))
              }
            </select>
          </div>

          <div className="form-group mx-4 mb-2">
            <label htmlFor="interesado">Interesado en</label>
            <input type="text" className="form-control" id="interesado"
              {...register('interesado')}

            />
          </div>

          <div className="form-group mx-4 mb-2">
            <label htmlFor="email">Email</label>
            <input type="email" className="form-control" id="email"
              {...register('email')}

            />
          </div>

          <div className="form-group mx-4 mb-2">
            <label htmlFor="medio_contacto">Medio de Contacto</label>
            <input type="text" className="form-control" id="medio_contacto"
              {...register('medio_contacto')}
              placeholder="celular, email, telefono..."

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