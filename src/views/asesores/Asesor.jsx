import React, { Fragment, useEffect, useState } from 'react'
import { Breadcrumb, Col, Card, Row, Button } from 'reactstrap'
import TablaAsesor from './TablaAsesor'
import FormAsesor from './FormAsesor'
import axios from 'axios'
import { useForm } from 'react-hook-form'
const URL = 'https://backend.alven-inmobiliaria.com.mx/api/v1/asesor'
const token = localStorage.getItem('token');
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
const Asesor = () => {

  const [modal, setModal] = useState(false)
  const [estado, setEstado] = useState(false)
  const [objUpdate, setObjUpdate] = useState()
  const [data, setData] = useState([]);

  const { handleSubmit, control, register, reset, setError, formState: { errors } } = useForm()

  const defaultValuesForm = {
    nombre: '',
    apellidos: '',
    cedula: '',
    email: '',
    celular: '',
  }

  const toggle = () => {
    setModal(!modal)
    if (objUpdate !== undefined) {
      reset(defaultValuesForm)
    }
  };

  const updateAsesor = (id, data) => {
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
          title: 'Asesor Actualizado',
          showConfirmButton: false,
          timer: 1500
        })
      })
      .catch(err => console.log(err))
  }

  const crearAsesor = data => {

    axios.post(URL, data, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => {
        setEstado(true)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Asesor Registrado',
          showConfirmButton: false,
          timer: 1500
        })
      })
      .catch(err => console.log(err))
  }

  const updateAsesorById = (id) => {
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

  const deleteAsesorById = (id) => {
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

      updateAsesor(objUpdate?.id, data)
      reset(defaultValuesForm)
      toggle.call()

    } else {
      reset(defaultValuesForm)
      crearAsesor(data)
      toggle.call()
    }
  }



  return (
    <Fragment>
      <Card className='p-4'>
        <Row>
          <Col lg='6' className='d-flex align-items-center px-0 px-lg-1'>
            <Button className='mt-sm-0 mt-1' color='primary' onClick={toggle}>
              Agregar Asesor
            </Button>
          </Col>
        </Row>


      </Card>
      <Breadcrumb title='Datatables Advance' data={[{ title: 'Datatables' }, { title: 'Datatables Advance' }]} />
      <Row>
        <Col sm='12'>
          <TablaAsesor
            updateAsesorById={updateAsesorById}
            deleteAsesorById={deleteAsesorById}
            estado={estado}
          />
        </Col>
      </Row>

      <FormAsesor
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

export default Asesor