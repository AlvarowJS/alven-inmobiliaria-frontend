import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardBody, Button, Label, Input, Form, Col, Row, InputGroup, InputGroupText } from 'reactstrap'
import { useForm, Controller } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Link, Navigate, useNavigate } from "react-router-dom";
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import './../style/style.css'
const containerStyle = {
  width: '100%',
  height: '400px'
};
import axios from 'axios';
// const idPropiedad = localStorage.getItem('id');
const URL = 'https://backend.alven-inmobiliaria.com.mx/api/v1/direccion'
const URL_PROPIEDAD = 'https://backend.alven-inmobiliaria.com.mx/api/v1/propiedades'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

const DireccionForm = ({ stepper, idPropiedad }) => {

  const token = localStorage.getItem('token');

  const navigate = useNavigate()

  const [estado, setEstado] = useState()
  const [objectDirection, setObjectDirection] = useState()
  const [lat, setLat] = useState()
  const [lng, setLng] = useState()
  const [zoom, setZoom] = useState()

  useEffect(() => {

    axios.get(`${URL_PROPIEDAD}/${idPropiedad}`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => {

        let object = res?.data?.direccion

        setLat(parseFloat(object?.LAT))
        setLng(parseFloat(object?.LON))
        setZoom(parseFloat(object?.ZOOM))
        setObjectDirection(object)

        reset(object)
      })
      .catch(err => console.log(err))
  }, [])


  const {
    reset,
    control,
    setError,
    handleSubmit,
    register,
    formState: { errors }
  } = useForm()

  const onSubmit = data => {

    let idDireccion = objectDirection?.id

    if (idDireccion) {
      axios.put(`${URL}/${idDireccion}`, data, {
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

  const handleLat = (e) => {
    let latValue = e.target.value
    if (latValue.endsWith(".")) {
      setLat(latValue)
    }
    else {
      latValue = Number(latValue)
      if (typeof (latValue) == 'number') {
        setLat(latValue)
        if (isNaN(latValue)) {
          setLat(0)
        }
      }
    }
  }
  const handleLong = (e) => {
    let lonValue = e.target.value
    if (lonValue.endsWith(".")) {
      setLng(lonValue)
    }
    else {
      lonValue = Number(lonValue)
      if (typeof (lonValue) == 'number') {
        setLng(lonValue)
        if (isNaN(lonValue)) {
          setLng(0)
        }
      }
    }
  }

  const handleZoom = (e) => {
    let zoomValue = e.target.value
    zoomValue = Number(zoomValue)
    if (typeof (zoomValue) == 'number') {
      setZoom(zoomValue)
      if (isNaN(zoomValue)) {
        setZoom(0)
      }
    }
  }

  const handleReset = () => {
    reset({
      LAT: '',
      LON: '',
      ZOOM: '',
      calle: '',
      codigo_postal: '',
      colonia: '',
      estado: '',
      municipio: '',
      numero: '',
      pais: ''
    })
  }

  console.log(lat, "lat", lng, "lon", zoom, "zoom")
  return (

    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Registrar Dirección</CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-1'>
            <Label className='form-label' for='pais'>
              Pais
            </Label>
            <Controller
              defaultValue=''
              control={control}
              id='pais'
              name='pais'
              render={({ field }) => <Input placeholder='pais' invalid={errors.pais && true} {...field} />}
            />
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='codigo_postal'>
              Código Postal
            </Label>
            <Controller
              defaultValue=''
              control={control}
              id='codigo_postal'
              name='codigo_postal'
              render={({ field }) => <Input placeholder='10003' invalid={errors.codigo_postal && true} {...field} />}
            />
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='estado'>
              Estado
            </Label>
            <Controller
              defaultValue=''
              control={control}
              id='estado'
              name='estado'
              render={({ field }) => (
                <Input
                  type='text'
                  placeholder='ingrese el estado'
                  invalid={errors.estado && true}
                  {...field}
                />
              )}
            />
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='municipio'>
              Municipio
            </Label>
            <Controller
              defaultValue=''
              control={control}
              id='municipio'
              name='municipio'
              render={({ field }) => (
                <Input
                  type='text'
                  placeholder='ingrese el municipio'
                  invalid={errors.municipio && true}
                  {...field}
                />
              )}
            />
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='colonia'>
              Colonia
            </Label>
            <Controller
              defaultValue=''
              control={control}
              id='colonia'
              name='colonia'
              render={({ field }) => (
                <Input
                  type='text'
                  placeholder='ingrese el estado'
                  invalid={errors.colonia && true}
                  {...field}
                />
              )}
            />
          </div>

          <Row>
            <Col>
              <div className='mb-1'>
                <Label className='form-label' for='calle'>
                  Calle
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='calle'
                  name='calle'
                  render={({ field }) => (
                    <Input
                      type='text'
                      placeholder='ingrese el calle'
                      invalid={errors.calle && true}
                      {...field}
                    />
                  )}
                />
              </div>
            </Col>
            <Col>
              <div className='mb-1'>
                <Label className='form-label' for='numero'>
                  Numero
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='numero'
                  name='numero'
                  render={({ field }) => (
                    <Input
                      type='text'
                      placeholder='ingrese el numero'
                      invalid={errors.numero && true}
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
                <Label className='form-label' for='LAT'>
                  Lat
                </Label>
                {/* <Controller
                  defaultValue=''
                  control={control}
                  id='LAT'
                  name='LAT'
                  render={({ field }) => (
                    <Input
                      type='text'
                      placeholder='99.9999'
                      invalid={errors.LAT && true}
                      onChange={handleLat}
                      {...field}
                    />
                  )}
                /> */}
                <InputGroupText>
                  <input className='local_input' type="text" id="LAT"
                    {...register('LAT')}
                    onChange={handleLat}
                    value={lat}
                  />
                </InputGroupText>
              </div>
            </Col>
            <Col>
              <div className='mb-1'>
                <Label className='form-label' for='LON'>
                  LON
                </Label>
                {/* <Controller
                  defaultValue=''
                  control={control}
                  id='LON'
                  name='LON'
                  render={({ field }) => (
                    <Input
                      type='text'
                      placeholder='99.9999'
                      invalid={errors.LON && true}
                      {...field}
                    />
                  )}
                /> */}
                <InputGroupText>
                  <input className='local_input' type="text" id="LON"
                    {...register('LON')}
                    onChange={handleLong}
                    value={lng}
                  />
                </InputGroupText>
              </div>
            </Col>
            <Col>
              <div className='mb-1'>
                <Label className='form-label' for='ZOOM'>
                  ZOOM
                </Label>
                {/* <Controller
                  defaultValue=''
                  control={control}
                  id='ZOOM'
                  name='ZOOM'
                  render={({ field }) => (
                    <Input
                      type='text'
                      placeholder='16'
                      invalid={errors.ZOOM && true}
                      {...field}
                    />
                  )}
                /> */}
                <InputGroupText>
                  <input className='local_input' type="text" id="ZOOM"
                    {...register('ZOOM')}
                    onChange={handleZoom}
                    value={zoom}
                  />
                </InputGroupText>
              </div>

            </Col>
          </Row>
          <Row className='px-4'>
            {lat && lng && (

              <LoadScript
                googleMapsApiKey="AIzaSyCq_n_0fxE6-qDWeqeFZBfahzXrGDy0U_Q"
              >
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={{
                    lat: lat,
                    lng: lng
                  }}
                  zoom={zoom}
                >
                  { /* Child components, such as markers, info windows, etc. */}
                  <></>
                </GoogleMap>
              </LoadScript>
            )}
            {/* AIzaSyCq_n_0fxE6-qDWeqeFZBfahzXrGDy0U_Q */}

          </Row>
          <div className='d-flex mt-2'>
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

export default DireccionForm