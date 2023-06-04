import React from 'react'
import { Button, Col, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'

const FormAsesor = ({
    modal, toggle, submit, control, register, reset, errors, handleSubmit
}) => {
    return (
        <Modal isOpen={modal} toggle={toggle} size='lg'>
            <ModalHeader toggle={toggle}>
                Registrar Asesor
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
                        <label htmlFor="apellidos">Apellidos</label>
                        <input type="text" className="form-control" id="apellidos"
                            {...register('apellidos')}
                            placeholder="Perez..."
                            required
                        />
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


                    <button className='btn btn-primary mx-4 mb-2'>Enviar</button>
                    {/* <button className='btn btn-secondary' onClick={toggle}>Cancelar</button> */}
                </form>
            </ModalBody>
        
        </Modal>
    )
}

export default FormAsesor