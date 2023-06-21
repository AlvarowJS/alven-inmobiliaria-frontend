import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardBody, Button, Label, Input, Form, Col, Row } from 'reactstrap'
import { useForm, Controller } from 'react-hook-form'
import toast from 'react-hot-toast'
import axios from 'axios'
const URL = 'http://127.0.0.1:8000/api/v1/publicidad'
const URL_ESTADO = 'http://127.0.0.1:8000/api/v1/actualizar-propiedad'
const URL_PROPIEDAD = 'http://127.0.0.1:8000/api/v1/propiedades'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

// const idPropiedad = localStorage.getItem('id');

const PublicidadForm = ({ stepper, idPropiedad, objectGlobal }) => {
  const token = localStorage.getItem('token');

  const navigate = useNavigate()
  const [objectPublicidad, setObjectPublicidad] = useState()
  const [estadoPropiedad, setEstadoPropiedad] = useState()

  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm()

  // const terminarEdicion = () => {
  //   axios.put(`${URL_ESTADO}/${idPropiedad}`, null, {
  //     headers: {
  //       'Authorization': 'Bearer ' + token
  //     }
  //   })
  //     .then(res => {
  //       Swal.fire({
  //         position: 'center',
  //         icon: 'success',
  //         title: 'Inventario Registrado',
  //         showConfirmButton: false,
  //         timer: 1500
  //       })
  //       navigate(`/inventario`)
  //     })
  //     .catch(err => null)
  // }

  useEffect(() => {

    setObjectPublicidad(objectGlobal?.publicidad)
    reset(objectGlobal?.publicidad)

  }, [])

  const onSubmit = data => {
    let idPublicidad = objectPublicidad?.id
    if (idPublicidad) {
      axios.put(`${URL}/${idPublicidad}`, data, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
        .then(res => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Inventario Registrado',
            showConfirmButton: false,
            timer: 1500
          })
          navigate(`/inventario`)
          stepper.next()
        })
        .catch(err => null)
    } else {
      data.id_propiedad = idPropiedad

      axios.post(URL, data, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
        .then(res => {
          stepper.next()
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Inventario Registrado',
            showConfirmButton: false,
            timer: 1500
          })
          navigate(`/inventario`)
        })
        .catch(err => null)
    }
  }

  const handleReset = () => {
    reset({
      precio_venta: '',
      encabezado: '',
      descripcion: '',
      video_url: ''
    })
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Registrar Publicidad </CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-1'>
            <Label className='form-label' for='precio_venta'>
              Precio de venta
            </Label>
            <Controller
              defaultValue=''
              control={control}
              id='precio_venta'
              name='precio_venta'
              render={({ field }) => <Input invalid={errors.precio_venta && true} required {...field} />}
            />
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='encabezado'>
              Encabezado
            </Label>
            <Controller
              defaultValue=''
              control={control}
              id='encabezado'
              name='encabezado'
              render={({ field }) => <Input invalid={errors.encabezado && true} required {...field} />}
            />
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='descripcion'>
              Descripción
            </Label>
            <Controller
              defaultValue=''
              control={control}
              id='descripcion'
              name='descripcion'
              render={({ field }) => <Input type="textarea" invalid={errors.descripcion && true} required {...field} />}
            />
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='video_url'>
              Video URL
            </Label>
            <Controller
              defaultValue=''
              control={control}
              id='video_url'
              name='video_url'
              render={({ field }) => <Input invalid={errors.video_url && true} required {...field} />}
            />
          </div>
          <div className='d-flex'>
            {/* <Button className='me-1' color='success' onClick={terminarEdicion} disabled={estadoPropiedad}>
              Terminar
            </Button> */}
            <Button className='me-1' color='primary' type='submit'>
              Enviar y Terminar
            </Button>
            <Button outline color='secondary' type='reset' onClick={handleReset}>
              Reset
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card >
  )
}

export default PublicidadForm