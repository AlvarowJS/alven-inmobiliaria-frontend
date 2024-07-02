import React, { useEffect, useState } from 'react'
import { Button, Col, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'

const FormPresentacion = ({
  modal, toggle, submit, control, register, reset, errors, handleSubmit, setFotos
}) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFotos(file)
  };
  return (
    <Modal isOpen={modal} toggle={toggle} size='lg'>
      <ModalHeader toggle={toggle}>
        Registrar Presentacion
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(submit)}>
          <div className="form-group mx-4 mb-2">
            <label htmlFor="nombre">Nombre de referencia</label>
            <input type="text" className="form-control" id="nombre"
              {...register('nombre')}
              placeholder="Ingrese un nombre referencial de la imagen"
              required
            />
          </div>
          <div className="form-group mx-4 mb-2">
            <label htmlFor="foto">Foto</label>
            <input type="file" className="form-control" id="foto"
              {...register('foto')}
              onChange={handleFileChange}
            />
          </div>
          <button className='btn btn-primary mx-4 mb-2'>Enviar</button>
          {/* <button className='btn btn-secondary' onClick={toggle}>Cancelar</button> */}
        </form>
      </ModalBody>

    </Modal>
  )
}

export default FormPresentacion