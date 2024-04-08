import React, { Fragment, useEffect, useState } from 'react'
import { Breadcrumb, Col, Card, Row, Button } from 'reactstrap'
import { useForm } from 'react-hook-form'
const URL = '/v1/medios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import TablaMedio from './TablaMedio'
import FormMedio from './FormMedio'
import alvenApi from '../../api/alvenApi'
const MySwal = withReactContent(Swal)
const Medio = () => {
    const token = localStorage.getItem('token');
    const [modal, setModal] = useState(false)
    const [estado, setEstado] = useState(false)
    const [objUpdate, setObjUpdate] = useState()

    const { handleSubmit, control, register, reset, setError, formState: { errors } } = useForm()

    const defaultValuesForm = {
        medio_contacto: '',
    }

    const toggle = () => {
        setModal(!modal)
        if (objUpdate !== undefined) {
            reset(defaultValuesForm)
        }
    };

    const updateMedio = (id, data) => {
        setEstado(false)
        alvenApi.patch(`${URL}/${id}`, data, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(res => {
                setEstado(true)
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Cliente Actualizado',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            .catch(err => null)
    }

    const crearMedio = data => {
        setEstado(false)
        alvenApi.post(URL, data, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(res => {
                setEstado(true)
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Cliente Registrado',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            .catch(err => null)
    }

    const updateMedioById = (id) => {
        setEstado(false)
        toggle.call()
        alvenApi.get(`${URL}/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(res => {
                setObjUpdate(res?.data)
                const object = res?.data
                reset(object)

            })
            .catch(err => null)
    }

    const deleteMedioById = (id) => {
        setEstado(false)

        return MySwal.fire({
            title: '¿Estás seguro de eliminar?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si',
            customClass: {
                confirmButton: 'btn btn-primary',
                cancelButton: 'btn btn-outline-danger ms-1'
            },
            buttonsStyling: false
        }).then(function (result) {
            if (result.value) {
                alvenApi.delete(`${URL}/${id}`, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
                    .then(res => {
                        setEstado(true)
                    })
                    .catch(err => null)
            }
        })

    }

    const submit = (data) => {
        if (objUpdate !== undefined) {

            updateMedio(objUpdate?.id, data)
            reset(defaultValuesForm)
            toggle.call()

        } else {
            reset(defaultValuesForm)
            crearMedio(data)
            toggle.call()
        }
    }
    return (
        <Fragment>
            <Card className='p-4'>
                <Row>
                    <Col lg='6' className='d-flex align-items-center px-0 px-lg-1'>
                        <Button className='mt-sm-0 mt-1' color='primary' onClick={toggle}>
                            Agregar Medio de Contacto
                        </Button>
                    </Col>
                </Row>


            </Card>
            <Breadcrumb title='Datatables Advance' data={[{ title: 'Datatables' }, { title: 'Datatables Advance' }]} />
            <Row>
                <Col sm='12'>
                    <TablaMedio
                        updateMedioById={updateMedioById}
                        deleteMedioById={deleteMedioById}
                        estado={estado}
                    />
                </Col>
            </Row>

            <FormMedio
                toggle={toggle}
                modal={modal}
                setModal={setModal}
                handleSubmit={handleSubmit}
                submit={submit}
                control={control}
                register={register}
                reset={reset}
                errors={errors}
            />
        </Fragment>
    )
}

export default Medio