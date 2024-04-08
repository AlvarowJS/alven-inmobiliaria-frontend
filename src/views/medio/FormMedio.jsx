import React, { useEffect, useState } from 'react'
import { Button, Col, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'

const FormMedio = ({
  modal, toggle, submit, control, register, reset, errors, handleSubmit
}) => {

  const token = localStorage.getItem('token');

  return (
    <Modal isOpen={modal} toggle={toggle} size='lg'>
      <ModalHeader toggle={toggle}>
        Registrar Medio de Contacto
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(submit)}>
          <div className="form-group mx-4 mb-2">
            <label htmlFor="medio_contacto">Medio de Contacto</label>
            <input type="text" className="form-control" id="medio_contacto"
              {...register('medio_contacto')}
              placeholder="alerta, referido, etc"
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

export default FormMedio