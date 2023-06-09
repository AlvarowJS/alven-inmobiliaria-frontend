import React, { Fragment, useEffect, useState } from 'react'
import { Breadcrumb, Col, Card, Row, Button } from 'reactstrap'
import axios from 'axios'
import { useForm } from 'react-hook-form'
const URL = 'https://backend.alven-inmobiliaria.com.mx/api/v1/cliente'
const REG_URL = 'https://backend.alven-inmobiliaria.com.mx/api/v1/registrar-cliente'
const token = localStorage.getItem('token');
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import TablaCliente from './TablaCliente'
import FormCliente from './FormCliente'
const MySwal = withReactContent(Swal)

const Clientes = () => {
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
    axios.patch(`${URL}/${id}`, data, {
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
      .catch(err => console.log(err))
  }

  const crearCliente = data => {

    axios.post(REG_URL, data, {
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
      .catch(err => console.log(err))
  }

  const updateClienteById = (id) => {
    setEstado(false)
    toggle.call()
    axios.get(`${URL}/${id}`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => {
        setObjUpdate(res?.data)
        const object = res?.data
        reset(object)

      })
      .catch(err => console.log(err))
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
        axios.delete(`${URL}/${id}`, {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        })
          .then(res => {
            setEstado(true)
          })
          .catch(err => console.log(err))
      }
    })

  }

  const submit = (data) => {
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