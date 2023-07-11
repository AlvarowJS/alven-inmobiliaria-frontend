import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardBody, Button, Label, Input, Form, Col, Row } from 'reactstrap'
import { useForm, Controller } from 'react-hook-form'
import toast from 'react-hot-toast'
import axios from 'axios'
const URL = 'https://backend.alven-inmobiliaria.com.mx/api/v1/basicos'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

const BasicosForm = ({ stepper, idPropiedad, objectGlobal }) => {

  const token = localStorage.getItem('token');
  const role = localStorage?.getItem('role');
  const [objectBasicos, setObjectBasicos] = useState()

  const {
    reset,
    control,
    setError,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  useEffect(() => {
    setObjectBasicos(objectGlobal?.basico)
    reset(objectGlobal?.basico)
    // axios.get(`${URL_PROPIEDAD}/${idPropiedad}`, {
    //   headers: {
    //     'Authorization': 'Bearer ' + token
    //   }
    // })
    //   .then(res => {
    //     let object = res?.data?.basico
    //     setObjectBasicos(object)
    //     reset(object)
    //   })
    //   .catch(err => null)
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
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Guardado',
            showConfirmButton: false,
            timer: 1500
          })
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
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Guardado',
            showConfirmButton: false,
            timer: 1500
          })
          stepper.next()
        })
        .catch(err => null)
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
                  render={({ field }) => <Input invalid={errors.superficie_terreno && true}  {...field} />}
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
                  render={({ field }) => <Input invalid={errors.niveles_construidos && true}  {...field} />}
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
                  render={({ field }) => <Input type='text' placeholder='' invalid={errors.superficie_construccion && true}  {...field} />}
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
                  render={({ field }) => <Input type='text' placeholder='' invalid={errors.cuota_mantenimiento && true}  {...field} />}
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
                  Recámaras
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
                  Número de casas
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
                <select className="form-select" id="cocina" {...register("cocina")}>
                  <option value="Integral">Integral</option>
                  <option value="Solo Tarja">Solo Tarja</option>
                  <option value="Sin Cocina">Sin Cocina</option>
                  <option value="Cocineta">Cocineta</option>
                </select>
                {/* <Controller
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
                /> */}
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
                  Número de elevadores
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

            {
              role == "1" ?
                <>
                  <Button className='me-1' color='primary' type='submit'>
                    Enviar
                  </Button>
                  <Button outline color='secondary' type='reset' onClick={handleReset}>
                    Reset
                  </Button>
                </>
                : null
            }

          </div>
        </Form>
      </CardBody>
    </Card>
  )
}

export default BasicosForm