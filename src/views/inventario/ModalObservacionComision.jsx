import React from 'react'
import { Button, Col, Form, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'

const ModalObservacionComision = ({
    modalObservacion, cerrarObservacion, mostrarObservacion, dataGeneral
}) => {
    return (
        <Modal isOpen={modalObservacion} toggle={cerrarObservacion} size='lg'>
            <ModalHeader toggle={cerrarObservacion}>
                Información importante
            </ModalHeader>
            <ModalBody>
                {dataGeneral && (
                    <div>
                        <p><strong>Observación:</strong> {dataGeneral.observaciones}</p>
                        <p><strong>Porcentaje de Comisión:</strong> {dataGeneral.comision}</p>
                    </div>
                )}
            </ModalBody>

        </Modal>
    )
}

export default ModalObservacionComision