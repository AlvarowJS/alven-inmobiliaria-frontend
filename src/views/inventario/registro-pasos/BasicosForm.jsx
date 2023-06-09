import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardBody, Button, Label, Input, Form, Col, Row } from 'reactstrap'
import { useForm, Controller } from 'react-hook-form'
import toast from 'react-hot-toast'
import axios from 'axios'
const URL = 'https://backend.alven-inmobiliaria.com.mx/api/v1/basicos'
const URL_PROPIEDAD = 'https://backend.alven-inmobiliaria.com.mx/api/v1/propiedades'
const token = localStorage.getItem('token');
// const idPropiedad = localStorage.getItem('id');
const BasicosForm = ({ stepper, idPropiedad }) => {

  const [objectBasicos, setObjectBasicos] = useState()

  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm()

  useEffect(() => {
    axios.get(`${URL_PROPIEDAD}/${idPropiedad}`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => {
        let object = res?.data?.basico        
        setObjectBasicos(object)
        reset(object)
      })
      .catch(err => console.log(err))
  }, [])

  const onSubmit = data => {
    
    let idBasicos = objectBasicos?.id

    if (idBasicos) {
      axios.put(`${URL}/${idBasicos}`, data, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
        .then(res => {
          stepper.next()
        })
        .catch(err => console.log(err))
    } else {
      data.id_propiedad = idPropiedad

      axios.post(URL, data, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
        .then(res => {
          stepper.next()
        })
        .catch(err => console.log(err))
    }
  }

  const handleReset = () => {
    reset({
      superficie_terreno: '',
      superficie_construccion: '',
      banios: '',
      medios_banios: '',
      recamaras: '',
      cocina: '',
      estacionamiento: '',
      niveles_construidos: '',
      cuota_mantenimiento: '',
      numero_casas: '',
      numero_elevadores: '',
      piso_ubicado: '',
    })
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Registrar Básicos </CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col>
              <div className='mb-1'>
                <Label className='form-label' for='superficie_terreno'>
                  Superficie de Terreno
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='superficie_terreno'
                  name='superficie_terreno'
                  render={({ field }) => <Input invalid={errors.superficie_terreno && true} {...field} />}
                />
              </div>
            </Col>
            <Col>
              <div className='mb-1'>
                <Label className='form-label' for='niveles_construidos'>
                  Niveles Construidos
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='niveles_construidos'
                  name='niveles_construidos'
                  render={({ field }) => <Input invalid={errors.niveles_construidos && true} {...field} />}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className='mb-1'>
                <Label className='form-label' for='superficie_construccion'>
                  Superficie de construcción
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='superficie_construccion'
                  name='superficie_construccion'
                  render={({ field }) => <Input type='text' placeholder='' invalid={errors.superficie_construccion && true} {...field} />}
                />
              </div>
            </Col>
            <Col>
              <div className='mb-1'>
                <Label className='form-label' for='cuota_mantenimiento'>
                  Cuota Mantenimiento
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='cuota_mantenimiento'
                  name='cuota_mantenimiento'
                  render={({ field }) => <Input type='text' placeholder='' invalid={errors.cuota_mantenimiento && true} {...field} />}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className='mb-1'>
                <Label className='form-label' for='banios'>
                  Baños
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='banios'
                  name='banios'
                  render={({ field }) => (
                    <Input
                      type='text'
                      placeholder=''
                      invalid={errors.banios && true}
                      {...field}
                    />
                  )}
                />
              </div>
            </Col>
            <Col>
              <div className='mb-1'>
                <Label className='form-label' for='medios_banios'>
                  Medios Baños
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='medios_banios'
                  name='medios_banios'
                  render={({ field }) => (
                    <Input
                      type='text'
                      placeholder=''
                      invalid={errors.medios_banios && true}
                      {...field}
                    />
                  )}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className='mb-1'>
                <Label className='form-label' for='recamaras'>
                  Recamaras
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='recamaras'
                  name='recamaras'
                  render={({ field }) => (
                    <Input
                      type='text'
                      placeholder=''
                      invalid={errors.recamaras && true}
                      {...field}
                    />
                  )}
                />
              </div>
            </Col>
            <Col>
              <div className='mb-1'>
                <Label className='form-label' for='numero_casas'>
                  Numero de casas
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='numero_casas'
                  name='numero_casas'
                  render={({ field }) => (
                    <Input
                      type='text'
                      placeholder=''
                      invalid={errors.numero_casas && true}
                      {...field}
                    />
                  )}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className='mb-1'>
                <Label className='form-label' for='cocina'>
                  Cocinas
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='cocina'
                  name='cocina'
                  render={({ field }) => (
                    <Input
                      type='text'
                      placeholder=''
                      invalid={errors.cocina && true}
                      {...field}
                    />
                  )}
                />
              </div>
            </Col>
            <Col>
              <div className='mb-1'>
                <Label className='form-label' for='estacionamiento'>
                  Estacionamiento
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='estacionamiento'
                  name='estacionamiento'
                  render={({ field }) => (
                    <Input
                      type='text'
                      placeholder=''
                      invalid={errors.estacionamiento && true}
                      {...field}
                    />
                  )}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className='mb-1'>
                <Label className='form-label' for='numero_elevadores'>
                  Numero de elevadores
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='numero_elevadores'
                  name='numero_elevadores'
                  render={({ field }) => (
                    <Input
                      type='text'
                      invalid={errors.numero_elevadores && true}
                      {...field}
                    />
                  )}
                />
              </div>
            </Col>
            <Col>
              <div className='mb-1'>
                <Label className='form-label' for='piso_ubicado'>
                  Piso en que se encuentra
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='piso_ubicado'
                  name='piso_ubicado'
                  render={({ field }) => (
                    <Input
                      type='text'
                      invalid={errors.piso_ubicado && true}
                      {...field}
                    />
                  )}
                />
              </div>
            </Col>
          </Row>
          <div className='d-flex'>
            <Button className='me-1' color='primary' type='submit'>
              Enviar
            </Button>
            <Button outline color='secondary' type='reset' onClick={handleReset}>
              Reset
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  )
}

export default BasicosForm