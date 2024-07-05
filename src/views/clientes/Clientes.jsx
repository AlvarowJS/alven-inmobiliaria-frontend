import React, { Fragment, useEffect, useState } from 'react'
import { Breadcrumb, Col, Card, Row, Button } from 'reactstrap'
import { useForm } from 'react-hook-form'
const URL = '/v1/cliente'
const REG_URL = '/v1/registrar-cliente'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import TablaCliente from './TablaCliente'
import FormCliente from './FormCliente'
import alvenApi from '../../api/alvenApi'
const MySwal = withReactContent(Swal)

const Clientes = () => {
  const token = localStorage.getItem('token');
  const [modal, setModal] = useState(false)
  const [estado, setEstado] = useState(false)
  const [objUpdate, setObjUpdate] = useState()
  const [data, setData] = useState([]);

  const { handleSubmit, control, register, reset, setError, formState: { errors } } = useForm()

  const defaultValuesForm = {
    nombre: '',
    apellido_materno: '',
    apellido_paterno: '',
    cedula: '',
    email: '',
    celular: '',
    medio_contacto: ''
  }

  const toggle = () => {
    setModal(!modal)
    if (objUpdate !== undefined) {
      reset(defaultValuesForm)
    }
  };

  const updateCliente = (id, data) => {
    setEstado(!estado)

    alvenApi.patch(`${URL}/${id}`, data, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => {
        setEstado(!estado)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Cliente Actualizado',
          showConfirmButton: false,
          timer: 1500
        })
      })
      .catch(err => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Este número ya esta registrado',
          text: `Por el asesor ${err.response.data.asesor}`,
          showConfirmButton: false,
          // timer: 2500
        })
      })
  }

  const crearCliente = data => {
    setEstado(false)
    alvenApi.post(REG_URL, data, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => {
        setEstado(true)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Cliente Registrado',
          showConfirmButton: false,
          timer: 1500
        })
      })
      .catch(err => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Número ya registrado',
          text: `Por el asesor ${err.response.data.asesor}`,
          showConfirmButton: false,
          // timer: 2500
        })

      })
  }

  const updateClienteById = (id) => {
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
      .catch(err => {

      })
  }

  const deleteClienteById = (id) => {
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
    setEstado(!estado)
    if (objUpdate !== undefined) {

      updateCliente(objUpdate?.id, data)
      reset(defaultValuesForm)
      toggle.call()

    } else {
      reset(defaultValuesForm)
      crearCliente(data)
      toggle.call()
    }
  }
  return (
    <Fragment>
      <Card className='p-4'>
        <Row>
          <Col lg='6' className='d-flex align-items-center px-0 px-lg-1'>
            <Button className='mt-sm-0 mt-1' color='primary' onClick={toggle}>
              Agregar Cliente
            </Button>
          </Col>
        </Row>


      </Card>
      <Breadcrumb title='Datatables Advance' data={[{ title: 'Datatables' }, { title: 'Datatables Advance' }]} />
      <Row>
        <Col sm='12'>
          <TablaCliente
            updateClienteById={updateClienteById}
            deleteClienteById={deleteClienteById}
            estado={estado}
            modal={modal}
          />
        </Col>
      </Row>

      <FormCliente
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

export default Clientes