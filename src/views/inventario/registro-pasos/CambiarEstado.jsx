import React, { useEffect, useState } from 'react'
const URL_ESTADO = '/v1/estado-propiedad'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Input, Label } from 'reactstrap'
const MySwal = withReactContent(Swal)
import { CustomLabel } from './CustomLabel';
import alvenApi from '../../../api/alvenApi'
const CambiarEstado = ({ idPropiedad, borrador }) => {
    const token = localStorage.getItem('token');
    //Cambiar estado de borrador
    const cambiarEstado = e => {

        let estadoActual = e.target.checked
        let actualizarEstado = {}
        actualizarEstado.estado = estadoActual
        alvenApi.put(`${URL_ESTADO}/${idPropiedad}`, actualizarEstado, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(res => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Estado actualizado',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            .catch(err => null)
    }
    return (
        <div className='d-flex flex-row gap-1'>
            <Label for='switch-primary' className='form-check-label mb-50'>
                En Borrador
            </Label>
            <div className='form-switch form-check-success'>
                <Input type='switch' defaultChecked={borrador} id='icon-success' name='icon-success' onChange={cambiarEstado} />
                <CustomLabel htmlFor='icon-success' />
            </div>
            <Label for='switch-primary' className='form-check-label mb-50'>
                Terminado
            </Label>
        </div>
    )
}

export default CambiarEstado