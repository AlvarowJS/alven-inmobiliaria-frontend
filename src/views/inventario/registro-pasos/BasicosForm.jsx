import React from 'react'
import { Card, CardHeader, CardTitle, CardBody, Button, Label, Input, Form, Col, Row } from 'reactstrap'
import { useForm, Controller } from 'react-hook-form'
import toast from 'react-hot-toast'

const BasicosForm = () => {
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
            <Label className='form-label' for='numero_ofna'>
              id
            </Label>
            <Controller
              defaultValue=''
              control={control}
              id='numero_ofna'
              name='numero_ofna'
              render={({ field }) => <Input placeholder='numero_ofna' invalid={errors.numero_ofna && true} {...field} />}
            />
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='fecha_alta'>
              Fecha Alta
            </Label>
            <Controller
              defaultValue=''
              control={control}
              id='fecha_alta'
              name='fecha_alta'
              render={({ field }) => <Input type='date' placeholder='fecha alta' invalid={errors.fecha_alta && true} {...field} />}
            />
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='tipo_operacion'>
              Tipo Operación
            </Label>
            <Controller
              defaultValue=''
              control={control}
              id='tipo_operacion'
              name='tipo_operacion'
              render={({ field }) => (
                <Input
                  type='text'
                  placeholder='ingrese el tipo de operación'
                  invalid={errors.tipo_operacion && true}
                  {...field}
                />
              )}
            />
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='tipo_propiedad'>
              Tipo de Propiedad
            </Label>
            <Controller
              defaultValue=''
              control={control}
              id='tipo_propiedad'
              name='tipo_propiedad'
              render={({ field }) => (
                <Input
                  type='text'
                  placeholder=''
                  invalid={errors.tipo_propiedad && true}
                  {...field}
                />
              )}
            />
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='tipo_contrato'>
              Tipo Contrato
            </Label>
            <Controller
              defaultValue=''
              control={control}
              id='tipo_contrato'
              name='tipo_contrato'
              render={({ field }) => (
                <Input
                  type='text'
                  placeholder=''
                  invalid={errors.tipo_contrato && true}
                  {...field}
                />
              )}
            />
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='asesor_exclusivo'>
              Asesor Exclusivo
            </Label>
            <Controller
              defaultValue=''
              control={control}
              id='asesor_exclusivo'
              name='asesor_exclusivo'
              render={({ field }) => (
                <Input
                  type='text'
                  placeholder=''
                  invalid={errors.asesor_exclusivo && true}
                  {...field}
                />
              )}
            />
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='porcentaje'>
              Porcentaje de comisión
            </Label>
            <Controller
              defaultValue=''
              control={control}
              id='porcentaje'
              name='porcentaje'
              render={({ field }) => (
                <Input
                  type='text'
                  placeholder=''
                  invalid={errors.porcentaje && true}
                  {...field}
                />
              )}
            />
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='aceptar_creditos'>
              Acepta Creditos
            </Label>
            <Controller
              defaultValue=''
              control={control}
              id='aceptar_creditos'
              name='aceptar_creditos'
              render={({ field }) => (
                <Input
                  type='text'
                  placeholder='si/no'
                  invalid={errors.aceptar_creditos && true}
                  {...field}
                />
              )}
            />
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='fecha_credito'>
              Fecha Credito
            </Label>
            <Controller
              defaultValue=''
              control={control}
              id='fecha_credito'
              name='fecha_credito'
              render={({ field }) => (
                <Input
                  type='date'
                  invalid={errors.fecha_credito && true}
                  {...field}
                />
              )}
            />
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='fecha_inicio'>
              Fecha Inicio de Contratación de Servicios
            </Label>
            <Controller
              defaultValue=''
              control={control}
              id='fecha_inicio'
              name='fecha_inicio'
              render={({ field }) => (
                <Input
                  type='date'
                  invalid={errors.fecha_inicio && true}
                  {...field}
                />
              )}
            />
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='duracion_dias'>
              Duración de dias de contrato
            </Label>
            <Controller
              defaultValue=''
              control={control}
              id='duracion_dias'
              name='duracion_dias'
              render={({ field }) => (
                <Input
                  type='number'
                  placeholder='ingrese en dias'
                  invalid={errors.duracion_dias && true}
                  {...field}
                />
              )}
            />
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='requisito_arrendamiento'>
              Requisitos de arrendamiento
            </Label>
            <Controller
              defaultValue=''
              control={control}
              id='requisito_arrendamiento'
              name='requisito_arrendamiento'
              render={({ field }) => (
                <Input
                  type='textarea'
                  placeholder='ingrese en dias'
                  invalid={errors.requisito_arrendamiento && true}
                  {...field}
                />
              )}
            />
          </div>

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