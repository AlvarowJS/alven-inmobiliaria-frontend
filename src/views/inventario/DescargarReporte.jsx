import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import { useForm, Controller } from 'react-hook-form'


const DescargarReporte = ({
    modal, descargarReporte, asesorObj
}) => {
    const {
        reset,
        control,
        setError,
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()
    

    const statusList = ['todos', 'En Promocion', 'Con manifestacion', 'Cancelada', 'Suspendida', 'Cerrada']

    // const descargarReporteExcel = () => {
    
    // }

    const onSubmit = data => {        
        window.open(`https://backend.alven-inmobiliaria.com.mx/api/v1/exportexcel/${data.status}/${data.asesor}/${data.fecha_inicio}/${data.fecha_fin}`)
    }
    return (
        <Modal isOpen={modal} toggle={descargarReporte} size='lg'>
            <ModalHeader toggle={descargarReporte}>
                Descargar Reporte
            </ModalHeader>
            <ModalBody>
                <Form onSubmit={handleSubmit(onSubmit)}>

                    <Label className='form-label' for='asesor_exclusivo' >
                        Seleccionar el Asesor
                    </Label>
                    <select className="form-select" id="" {...register("asesor")} >
                        <option value="todos">todos</option>
                        {
                            asesorObj?.map(option => (
                                <option key={option.id} value={option.nombre + ' ' + option.apellidos}>{option.nombre} {option.apellidos}</option>
                            ))
                        }
                    </select>
                    <Label className='form-label mt-2' for='asesor_exclusivo'>
                        Seleccionar el status
                    </Label>
                    <select className="form-select" id="" {...register("status")} >
                        {
                            statusList?.map(option => (
                                <option value={option}>{option}</option>
                            ))
                        }
                    </select>
                    <div>
                        <Label className='form-label mt-2' for='fecha_inicio'>
                            Fecha Inicio
                        </Label>
                        <input className='form-control' type="date" {...register("fecha_inicio")} required/>

                        <Label className='form-label mt-2' for='fecha_inicio'>
                            Fecha Fin
                        </Label>
                        <input className='form-control' type="date" {...register("fecha_fin")} required/>
                    </div>
                    <button className='btn btn-success my-2 mb-2' onClick={() => descargarReporteExcel}>Descargar</button>
                </Form>
            </ModalBody>

        </Modal>
    )
}

export default DescargarReporte