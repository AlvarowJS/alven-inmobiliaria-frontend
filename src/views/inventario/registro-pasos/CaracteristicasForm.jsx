import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardBody, Button, Label, Input, Form, Col, Row } from 'reactstrap'
import { useForm, Controller } from 'react-hook-form'
import toast from 'react-hot-toast'
import axios from 'axios';

const URL = 'https://backend.alven-inmobiliaria.com.mx/api/v1/caracteristica'
const URL_PROPIEDAD = 'https://backend.alven-inmobiliaria.com.mx/api/v1/propiedades'
const CaracteristicasForm = ({ stepper, idPropiedad }) => {
  const token = localStorage.getItem('token');

  const [objectCaracteristica, setObjectCaracteristica] = useState()
  const arrayEspacios = ['Jardin', 'Estudio', 'Cuarto servicio', 'Desayunador', 'Comedor', 'Cuarto TV', 'Biblioteca', 'Cantina', 'Area de lavado', 'Bodega', 'Sala', 'Balcon']
  const arrayInstalaciones = ['Agua', 'Drenaje', 'Luz', 'Linea Telefonica', 'Chimenea', 'Cisterna', 'Aire Acondicionado', 'Calefacción', 'Jacuzzi', 'TV Cable', 'Circuito Cerrado', 'Alumbrado', 'Hidroneumático', 'Closets', 'Portón Eléctrico', 'Interfon', 'Video Portero', 'Tanque Gas Estacionario', 'Gas Tanque Cilindrico', 'Gas Red', 'Asador', 'Tinaco']
  const arrayRestricciones = ['No niños', 'Solo Familias', 'Para Ejecutivos', 'Para Estudiantes']
  const arrayExtras = ['Amueblado', 'Vigilancia Privada', 'Propiedad Nueva']

  const {
    reset,
    control,
    setError,
    handleSubmit,
    register,
    setValue,
    formState: { errors }
  } = useForm()

  useEffect(() => {
    axios.get(`${URL_PROPIEDAD}/${idPropiedad}`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => {
        let object = res?.data?.caracteristica
        setObjectCaracteristica(object)
        reset(object)

        const espaciosArray = JSON.parse(object?.espacios);
        const espaciosCoincidentes = arrayEspacios.filter(espacio => espaciosArray.includes(espacio));
        setValue('espacios', espaciosCoincidentes);

        const instalacionesArray = JSON.parse(object?.instalaciones);
        const instalacionesCoincidentes = arrayInstalaciones.filter(instalacion => instalacionesArray.includes(instalacion));
        setValue('instalaciones', instalacionesCoincidentes);

        const restriccionesArray = JSON.parse(object?.restricciones);
        const restriccionesCoincidentes = arrayRestricciones.filter(restriccion => restriccionesArray.includes(restriccion));
        setValue('restricciones', restriccionesCoincidentes);

        const extrasArray = JSON.parse(object?.extras);
        const extrasCoincidentes = arrayExtras.filter(extra => extrasArray.includes(extra));
        setValue('extras', extrasCoincidentes);

      })
      .catch(err => console.log(err))
  }, [])

  const onSubmit = data => {
    let idCaracteristica = objectCaracteristica?.id

    if (idCaracteristica) {
      axios.put(`${URL}/${idCaracteristica}`, data, {
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
      mascotas: '',
      espacios: '',
      instalaciones: '',
      basicos: '',
    })
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Registrar Caracteristicas </CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col>
              <div className='my-2'>
                <Label className='form-label' for='calle'>
                  <b>  Acepta Mascotas</b>
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='mascotas'
                  name='mascotas'
                  render={({ field }) => (
                    <Input
                      type='text'
                      placeholder='si se aceptan pero...'
                      invalid={errors.mascotas && true}
                      {...field}
                    />
                  )}
                />
              </div>
            </Col>
          </Row>
          {/* Espacios */}
          <h5 className='my-2 mx-2'>Espacios</h5>

          <Row className='mx-4'>
            <Col>
              <div className='form-check form-check-inline'>
                {/* <input className='form-check-input' type='checkbox' id='jardin'/> */}
                <input className='form-check-input' type='checkbox' id='jardin' value='Jardin'  {...register('espacios')} />
                <Label for='jardin' className='form-check-label'>
                  Jardin
                </Label>
              </div>
            </Col>
            <Col>
              <div className='form-check form-check-inline'>
                {/* <input className='form-check-input' type='checkbox' id='estudio' /> */}
                <input className='form-check-input' type='checkbox' id='estudio' value='Estudio'  {...register('espacios')} />
                <Label for='estudio' className='form-check-label'>
                  Estudio
                </Label>
              </div>
            </Col>
            <Col>
              <div className='form-check form-check-inline'>
                {/* <input className='form-check-input' type='checkbox' id='cuarto servicio' /> */}
                <input className='form-check-input' type='checkbox' id='cuarto servicio' value='Cuarto servicio'  {...register('espacios')} />
                <Label for='cuarto servicio' className='form-check-label'>
                  Cuarto Servicio
                </Label>
              </div>
            </Col>
            <Col>
              <div className='form-check form-check-inline'>
                {/* <input className='form-check-input' type='checkbox' id='desayunador' /> */}
                <input className='form-check-input' type='checkbox' id='desayunador' value='Desayunador'  {...register('espacios')} />
                <Label for='desayunador' className='form-check-label'>
                  Desayunador
                </Label>
              </div>
            </Col>

          </Row>

          <Row className='mx-4 my-2'>
            <Col>
              <div className='form-check form-check-inline'>
                {/* <input className='form-check-input' type='checkbox' id='comedor' /> */}
                <input className='form-check-input' type='checkbox' id='comedor' value='Comedor'  {...register('espacios')} />
                <Label for='comedor' className='form-check-label'>
                  Comedor
                </Label>
              </div>
            </Col>
            <Col>
              <div className='form-check form-check-inline'>
                {/* <input className='form-check-input' type='checkbox' id='cuarto tv' /> */}
                <input className='form-check-input' type='checkbox' id='Cuarto TV' value='Cuarto TV'  {...register('espacios')} />
                <Label for='Cuarto TV' className='form-check-label'>
                  Cuarto TV
                </Label>
              </div>
            </Col>
            <Col>
              <div className='form-check form-check-inline'>
                {/* <input className='form-check-input' type='checkbox' id='biblioteca' /> */}
                <input className='form-check-input' type='checkbox' id='Biblioteca' value='Biblioteca'  {...register('espacios')} />
                <Label for='Biblioteca' className='form-check-label'>
                  Biblioteca
                </Label>
              </div>
            </Col>
            <Col>
              <div className='form-check form-check-inline'>
                {/* <input className='form-check-input' type='checkbox' id='cantina' /> */}
                <input className='form-check-input' type='checkbox' id='Cantina' value='Cantina'  {...register('espacios')} />
                <Label for='Cantina' className='form-check-label'>
                  Cantina
                </Label>
              </div>
            </Col>

          </Row>
          <Row className='mx-4 my-2'>
            <Col>
              <div className='form-check form-check-inline'>
                {/* <input className='form-check-input' type='checkbox' id='area de lavado' /> */}
                <input className='form-check-input' type='checkbox' id='area de lavado' value='Area de lavado'  {...register('espacios')} />
                <Label for='area de lavado' className='form-check-label'>
                  Área de Lavado
                </Label>
              </div>
            </Col>
            <Col>
              <div className='form-check form-check-inline'>
                {/* <input className='form-check-input' type='checkbox' id='bodega' /> */}
                <input className='form-check-input' type='checkbox' id='Bodega' value='Bodega'  {...register('espacios')} />
                <Label for='Bodega' className='form-check-label'>
                  Bodega
                </Label>
              </div>
            </Col>
            <Col>
              <div className='form-check form-check-inline'>
                {/* <input className='form-check-input' type='checkbox' id='sala' /> */}
                <input className='form-check-input' type='checkbox' id='Sala' value='Sala'  {...register('espacios')} />
                <Label for='Sala' className='form-check-label'>
                  Sala
                </Label>
              </div>
            </Col>
            <Col>
              <div className='form-check form-check-inline'>
                {/* <input className='form-check-input' type='checkbox' id='balcon' /> */}
                <input className='form-check-input' type='checkbox' id='Balcon' value='Balcon'  {...register('espacios')} />
                <Label for='Balcon' className='form-check-label'>
                  Balcón
                </Label>
              </div>
            </Col>
          </Row>

          {/* Instalaciones */}
          <h5 className='my-2 mx-2'>Instalaciones</h5>
          <Row className='mx-4'>
            <Col>
              <div className='form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' id='Agua' value='Agua' {...register('instalaciones')} />
                <Label for='Agua' className='form-check-label'>
                  Agua
                </Label>
              </div>
            </Col>
            <Col>
              <div className='form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' id='Drenaje' value='Drenaje' {...register('instalaciones')} />
                <Label for='Drenaje' className='form-check-label'>
                  Drenaje
                </Label>
              </div>
            </Col>
            <Col>
              <div className='form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' id='Luz' value='Luz' {...register('instalaciones')} />
                <Label for='Luz' className='form-check-label'>
                  Luz
                </Label>
              </div>
            </Col>
            <Col>
              <div className='form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' id='Linea Telefonica' value='Linea Telefonica' {...register('instalaciones')} />
                <Label for='Linea Telefonica' className='form-check-label'>
                  Linea Telefonica
                </Label>
              </div>
            </Col>

          </Row>

          <Row className='mx-4 my-2'>
            <Col>
              <div className='form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' id='Chimenea' value='Chimenea' {...register('instalaciones')} />
                <Label for='Chimenea' className='form-check-label'>
                  Chimenea
                </Label>
              </div>
            </Col>
            <Col>
              <div className='form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' id='Cisterna' value='Cisterna' {...register('instalaciones')} />
                <Label for='Cisterna' className='form-check-label'>
                  Cisterna
                </Label>
              </div>
            </Col>
            <Col>
              <div className='form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' id='Aire Acondicionado' value='Aire Acondicionado' {...register('instalaciones')} />
                <Label for='Aire Acondicionado' className='form-check-label'>
                  Aire Acondicionado
                </Label>
              </div>
            </Col>
            <Col>
              <div className='form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' id='Calefacción' value='Calefacción' {...register('instalaciones')} />
                <Label for='Calefacción' className='form-check-label'>
                  Calefacción
                </Label>
              </div>
            </Col>

          </Row>
          <Row className='mx-4 my-2'>
            <Col>
              <div className='form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' id='Jacuzzi' value='Jacuzzi' {...register('instalaciones')} />
                <Label for='Jacuzzi' className='form-check-label'>
                  Jacuzzi
                </Label>
              </div>
            </Col>
            <Col>
              <div className='form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' id='TV Cable' value='TV Cable' {...register('instalaciones')} />
                <Label for='TV Cable' className='form-check-label'>
                  TV Cable
                </Label>
              </div>
            </Col>
            <Col>
              <div className='form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' id='Circuito Cerrado' value='Circuito Cerrado' {...register('instalaciones')} />
                <Label for='Circuito Cerrado' className='form-check-label'>
                  Circuito Cerrado
                </Label>
              </div>
            </Col>
            <Col>
              <div className='form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' id='Alumbrado' value='Alumbrado' {...register('instalaciones')} />
                <Label for='Alumbrado' className='form-check-label'>
                  Alumbrado
                </Label>
              </div>
            </Col>
          </Row>
          <Row className='mx-4 my-2'>
            <Col>
              <div className='form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' id='Hidroneumático' value='Hidroneumático' {...register('instalaciones')} />
                <Label for='Hidroneumático' className='form-check-label'>
                  Hidroneumático
                </Label>
              </div>
            </Col>
            <Col>
              <div className='form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' id='Closets' value='Closets' {...register('instalaciones')} />
                <Label for='Closets' className='form-check-label'>
                  Closets
                </Label>
              </div>
            </Col>
            <Col>
              <div className='form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' id='Portón Eléctrico' value='Portón Eléctrico' {...register('instalaciones')} />
                <Label for='Portón Eléctrico' className='form-check-label'>
                  Portón Eléctrico
                </Label>
              </div>
            </Col>
            <Col>
              <div className='form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' id='Interfon' value='Interfon' {...register('instalaciones')} />
                <Label for='Interfon' className='form-check-label'>
                  Interfon
                </Label>
              </div>
            </Col>
          </Row>
          <Row className='mx-4 my-2'>
            <Col>
              <div className='form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' id='Video Portero' value='Video Portero' {...register('instalaciones')} />
                <Label for='Video Portero' className='form-check-label'>
                  Video Portero
                </Label>
              </div>
            </Col>
            <Col>
              <div className='form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' id='Tanque Gas Estacionario' value='Tanque Gas Estacionario' {...register('instalaciones')} />
                <Label for='Tanque Gas Estacionario' className='form-check-label'>
                  Tanque Gas Estacionario
                </Label>
              </div>
            </Col>
            <Col>
              <div className='form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' id='Gas Tanque Cilindrico' value='Gas Tanque Cilindrico' {...register('instalaciones')} />
                <Label for='Gas Tanque Cilindrico' className='form-check-label'>
                  Gas Tanque Cilindrico
                </Label>
              </div>
            </Col>
            <Col>
              <div className='form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' id='Gas Red' value='Gas Red' {...register('instalaciones')} />
                <Label for='Gas Red' className='form-check-label'>
                  Gas Red
                </Label>
              </div>
            </Col>
          </Row>
          <Row className='mx-4 my-2'>

            <Col>
              <div className='form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' id='Asador' value='Asador' {...register('instalaciones')} />
                <Label for='Asador' className='form-check-label'>
                  Asador
                </Label>
              </div>
            </Col>
            <Col>
              <div className='form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' id='Tinaco' value='Tinaco' {...register('instalaciones')} />
                <Label for='Tinaco' className='form-check-label'>
                  Tinaco
                </Label>
              </div>
            </Col>
            <Col></Col>
            <Col></Col>
          </Row>

          {/* Restricciones */}
          <h5 className='my-2 mx-2'>Restricciones</h5>
          <Row className='mx-4'>
            <Col>
              <div className='form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' id='No niños' value='No niños' {...register('restricciones')} />
                <Label for='No niños' className='form-check-label'>
                  No niños
                </Label>
              </div>
            </Col>
            <Col>
              <div className='form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' id='Solo Familias' value='Solo Familias' {...register('restricciones')} />
                <Label for='Solo Familias' className='form-check-label'>
                  Solo Familias
                </Label>
              </div>
            </Col>
            <Col>
              <div className='form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' id='Para Ejecutivos' value='Para Ejecutivos' {...register('restricciones')} />
                <Label for='Para Ejecutivos' className='form-check-label'>
                  Para Ejecutivos
                </Label>
              </div>
            </Col>
            <Col>
              <div className='form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' id='Para Estudiantes' value='Para Estudiantes' {...register('restricciones')} />
                <Label for='Para Estudiantes' className='form-check-label'>
                  Para Estudiantes
                </Label>
              </div>
            </Col>
          </Row>

          {/* Extras */}
          <h5 className='my-2 mx-2'>Extras</h5>
          <Row className='mx-4'>
            <Col>
              <div className='form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' id='Amueblado' value='Amueblado' {...register('extras')} />
                <Label for='Amueblado' className='form-check-label'>
                  Amueblado
                </Label>
              </div>
            </Col>
            <Col>
              <div className='form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' id='Vigilancia Privada' value='Vigilancia Privada' {...register('extras')} />
                <Label for='Vigilancia Privada' className='form-check-label'>
                  Vigilancia Privada
                </Label>
              </div>
            </Col>
            <Col>
              <div className='form-check form-check-inline'>
                <input className='form-check-input' type='checkbox' id='Propiedad Nueva' value='Propiedad Nueva' {...register('extras')} />
                <Label for='Propiedad Nueva' className='form-check-label'>
                  Propiedad Nueva
                </Label>
              </div>
            </Col>
            <Col>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className='my-2 mx-4'>
                <Label className='form-label' for='calle'>
                  <b>  URL Recorrido Virtual</b>
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='youtube'
                  name='youtube'
                  render={({ field }) => (
                    <Input
                      type='text'
                      placeholder='www.youtube.com'
                      invalid={errors.youtube && true}
                      {...field}
                    />
                  )}
                />
              </div>
            </Col>
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
    </Card >
  )
}

export default CaracteristicasForm