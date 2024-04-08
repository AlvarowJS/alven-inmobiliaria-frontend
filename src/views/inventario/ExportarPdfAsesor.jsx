import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import { useForm, Controller } from 'react-hook-form'

const ExportarPdfAsesor = ({
    modalPdf, descargarPdf, idAsesor
}) => {
    const {
        reset,
        control,
        setError,
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const onSubmit = data => {
        const idUser = localStorage?.getItem('id');        
        window.open(`http://127.0.0.1:8000/api/v1/exportar-propiedad/${idAsesor},${idUser}/${data.asesor}`)
    }
    return (
        <Modal isOpen={modalPdf} toggle={descargarPdf} size='lg'>
            <ModalHeader toggle={descargarPdf}>
                Descargar Ficha Técnica
            </ModalHeader>
            <ModalBody>
                <Form onSubmit={handleSubmit(onSubmit)}>

                    <div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="false" value="false" {...register("asesor")} />
                            <label class="form-check-label" for="false">Ficha sin Asesor</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="true" value="true" {...register("asesor")}/>
                            <label class="form-check-label" for="true">Ficha con Asesor</label>
                        </div>
                    </div>
                    <button className='btn btn-success my-2 mb-2' onClick={() => descargarReporteExcel}>Descargar</button>
                </Form>
            </ModalBody>

        </Modal>
    )
}

export default ExportarPdfAsesor