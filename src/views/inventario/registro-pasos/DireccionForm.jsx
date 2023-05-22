import React from 'react'
import { Card, CardHeader, CardTitle, CardBody, Button, Label, Input, Form, Col, Row } from 'reactstrap'
import { useForm, Controller } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Map, Marker } from 'google-maps-react';


const DireccionForm = () => {

  const coordenadas = { lat: 37.7749, lng: -122.4194 };

  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = data => {
    if (Object.values(data).every(field => field.length > 0)) {
      toast(
        <div className='d-flex'>
          <div className='me-1'>
            <Avatar size='sm' color='success' icon={<Check size={12} />} />
          </div>
          <div className='d-flex flex-column'>
            <h6>Form Submitted!</h6>
            <ul className='list-unstyled mb-0'>
              <li>
                <strong>firstName</strong>: {data.firstNameBasic}
              </li>
              <li>
                <strong>lastName</strong>: {data.lastNameBasic}
              </li>
              <li>
                <strong>email</strong>: {data.emailBasic}
              </li>
            </ul>
          </div>
        </div>
      )
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual'
          })
        }
      }
    }
  }

  const handleReset = () => {
    reset({
      emailBasic: '',
      firstNameBasic: '',
      lastNameBasic: ''
    })
  }

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
                <Controller
                  defaultValue=''
                  control={control}
                  id='LAT'
                  name='LAT'
                  render={({ field }) => (
                    <Input
                      type='text'
                      placeholder='99.9999'
                      invalid={errors.LAT && true}
                      {...field}
                    />
                  )}
                />
              </div>
            </Col>
            <Col>
              <div className='mb-1'>
                <Label className='form-label' for='LON'>
                  LON
                </Label>
                <Controller
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
                />
              </div>
            </Col>
            <Col>
              <div className='mb-1'>
                <Label className='form-label' for='ZOOM'>
                  ZOOM
                </Label>
                <Controller
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
                />
              </div>
            </Col>
          </Row>
          <Row className='px-4'>
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1532.7096120314905!2d-76.24779307750135!3d-9.95721809312256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2spe!4v1684713602685!5m2!1ses-419!2spe" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
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

export default DireccionForm