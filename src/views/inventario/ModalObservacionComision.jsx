import React from 'react'
import { Button, Col, Form, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'

const ModalObservacionComision = ({
    modalObservacion, cerrarObservacion, mostrarObservacion, dataGeneral
}) => {
    return (
        <Modal isOpen={modalObservacion} toggle={cerrarObservacion} size='lg'>
            <ModalHeader toggle={cerrarObservacion}>
                {
                (dataGeneral?.direccion?.calle ?? '') +
                ' ' +
                (dataGeneral?.direccion?.numero ?? '') +
                ' ' +
                (dataGeneral?.direccion?.colonia ?? '') +
                ' ' +
                (dataGeneral?.direccion?.municipio ?? '') +
                ' ' +
                (dataGeneral?.direccion?.estado ?? '') +
                ' ' +
                (dataGeneral?.direccion?.pais ?? '')
                }
            </ModalHeader>
            <ModalBody>
                {dataGeneral && (
                    <div>
                        <p><strong>Porcentaje de Comisión:</strong> {dataGeneral?.general?.comision}</p>
                        <p><strong>Observación:</strong> {dataGeneral?.general?.observaciones}</p>
                    </div>
                )}
            </ModalBody>

        </Modal>
    )
}

export default ModalObservacionComision