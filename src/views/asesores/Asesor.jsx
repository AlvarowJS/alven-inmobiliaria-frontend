import React, { Fragment, useEffect, useState } from 'react'
import { Breadcrumb, Col, Card, Row, Button } from 'reactstrap'
import TablaAsesor from './TablaAsesor'
import FormAsesor from './FormAsesor'
import { useForm } from 'react-hook-form'
const URL = '/v1/asesor'
const URL_FOTO = '/v1/asesor-foto'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import alvenApi from '../../api/alvenApi'
const MySwal = withReactContent(Swal)
const Asesor = () => {

  const token = localStorage.getItem('token');
  const [modal, setModal] = useState(false)
  const [estado, setEstado] = useState(false)
  const [objUpdate, setObjUpdate] = useState()
  const [data, setData] = useState([]);
  const [fotoAsesor, setFotoAsesor] = useState()
  const [selectedImage, setSelectedImage] = useState(null);

  const { handleSubmit, control, register, reset, setError, formState: { errors } } = useForm()

  const defaultValuesForm = {
    nombre: '',
    apellidos: '',
    rfc: '',
    email: '',
    celular: '',
    direccion: '',
    contacto_emergencia: '',
    foto: '',
    status: '',
    publico: '',
    password: '',
  }

  const toggle = () => {
    setObjUpdate(null)
    setSelectedImage(null)
    setFotoAsesor(null)
    setModal(!modal)

    if (objUpdate !== undefined) {
      reset(defaultValuesForm)
    }
  };

  const updateAsesor = (id, data) => {
    const f = new FormData()
    f.append('id', id)
    f.append('nombre', data.nombre)
    f.append('apellidos', data.apellidos)
    f.append('celular', data.celular)
    f.append('direccion', data.direccion)
    f.append('email', data.email)
    f.append('password', data.password)
    f.append('rfc', data.rfc)
    f.append('role_id', data.user.role_id)
    f.append('contacto_emergencia', data.contacto_emergencia)
    f.append('foto', fotoAsesor)
    f.append('status', data.status)
    // f.append('publico', data.publico)
    f.append('publico', data.publico ? 1 : 0);


    alvenApi.post(`${URL_FOTO}`, f, {
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
      .catch(err => null)
  }

  const crearAsesor = data => {
    setEstado(false)
    const f = new FormData()
    f.append('nombre', data.nombre)
    f.append('apellidos', data.apellidos)
    f.append('celular', data.celular)
    f.append('direccion', data.direccion)
    f.append('password', data.password)
    f.append('email', data.email)
    f.append('rfc', data.rfc)
    f.append('role_id', data.user.role_id)
    f.append('contacto_emergencia', data.contacto_emergencia)
    f.append('foto', fotoAsesor)
    // f.append('publico', data.publico)
    f.append('publico', data.publico ? 1 : 0);

    f.append('status', data.status)
    alvenApi.post(URL, f, {
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
      .catch(err => null)
  }

  const updateAsesorById = (id) => {
    setEstado(false)
    toggle.call()
    alvenApi.get(`${URL}/${id}`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => {
        setObjUpdate(res?.data)
        setFotoAsesor(res?.data?.foto)
        const object = res?.data
        reset(object)

      })
      .catch(err => null)
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
    // console.log(objUpdate)  
    // console.log(data.id)
    if (objUpdate != null || data.id != undefined) {

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
        fotoAsesor={fotoAsesor}
        setFotoAsesor={setFotoAsesor}
        setSelectedImage={setSelectedImage}
        selectedImage={selectedImage}
      />
    </Fragment>
  )
}

export default Asesor