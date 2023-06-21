import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardBody, Button, Label, Input, Form, Col, Row } from 'reactstrap'
import { useForm, Controller } from 'react-hook-form'
import toast from 'react-hot-toast'
import axios from 'axios'
import Select from 'react-select'
const URL = 'http://127.0.0.1:8000/api/v1/general'
const URL_PROPIEDAD = 'http://127.0.0.1:8000/api/v1/propiedades'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
const GeneralForm = ({ asesorObj, idPropiedad, stepper, objectGlobal }) => {
  const token = localStorage.getItem('token');
  const [objectGeneral, setObjectGeneral] = useState()

  const {
    reset,
    control,
    setError,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const onSubmit = data => {
    let idGeneral = objectGeneral?.id
    if (idGeneral) {
      axios.put(`${URL}/${idGeneral}`, data, {
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

  useEffect(() => {

    setObjectGeneral(objectGlobal?.general)
    reset(objectGlobal?.general)

  }, [])

  const handleReset = () => {
    reset({
      numero_ofna: '',
      fecha_alta: '',
      tipo_operacion: '',
      tipo_propiedad: '',
      tipo_contrato: '',
      asesor_exclusivo: '',
      porcentaje: '',
      aceptar_creditos: '',
      fecha_credito: '',
      fecha_inicio: '',
      duracion_dias: '',
      requisito_arrendamiento: '',
    })
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Registrar datos Generales</CardTitle>
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
              required
              render={({ field }) => <Input placeholder='23423' invalid={errors.numero_ofna && true} {...field} />}
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
              required
              render={({ field }) => <Input type='date' placeholder='fecha alta' invalid={errors.fecha_alta && true} {...field} />}
            />
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='tipo_operacion'>
              Tipo de Operación
            </Label>
            <select className="form-select" id="tipo_operacion" {...register("tipo_operacion")}>
              <option value="Venta">Venta</option>
              <option value="Renta">Renta</option>
            </select>
            {/* <Controller
              defaultValue=''
              control={control}
              id='tipo_operacion'
              name='tipo_operacion'
              render={({ field }) => (
                <Input
                  type='text'
                  placeholder='Venta...'
                  required
                  invalid={errors.tipo_operacion && true}
                  {...field}
                />
              )}
            /> */}
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
                  required
                  invalid={errors.tipo_propiedad && true}
                  {...field}
                />
              )}
            />
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='tipo_contrato'>
              Tipo de Contrato
            </Label>
            <select className="form-select" id="tipo_contrato" {...register("tipo_contrato")}>
              <option value="Exclusiva">Exclusiva</option>
              <option value="Opción">Opción</option>
            </select>
            {/* <Controller
              defaultValue=''
              control={control}
              id='tipo_contrato'
              name='tipo_contrato'
              render={({ field }) => (
                <Input
                  type='text'
                  placeholder='Exclusiva...'
                  required
                  invalid={errors.tipo_contrato && true}
                  {...field}
                />
              )}
            /> */}
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='asesor_exclusivo'>
              Asesor de Exclusiva
            </Label>
            <select className="form-select" id="asesor_id" {...register("asesor_exclusivo")}>
              {
                asesorObj?.map(option => (
                  <option key={option.id} value={option.nombre +' '+ option.apellidos}>{option.nombre} {option.apellidos}</option>
                ))
              }
            </select>
            {/* <Controller
              defaultValue=''
              control={control}
              id='asesor_exclusivo'
              name='asesor_exclusivo'
              render={({ field }) => (
                <Input
                  type='text'
                  placeholder=''
                  required
                  invalid={errors.asesor_exclusivo && true}
                  {...field}
                />
              )}
            /> */}
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
                  required
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
                  required
                  invalid={errors.aceptar_creditos && true}
                  {...field}
                />
              )}
            />
          </div>
          {/* <div className='mb-1'>
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
                  required
                  invalid={errors.fecha_credito && true}
                  {...field}
                />
              )}
            />
          </div> */}
          {/* <div className='mb-1'>
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
                  required
                  invalid={errors.fecha_inicio && true}
                  {...field}
                />
              )}
            />
          </div> */}
          <div className='mb-1'>
            <Label className='form-label' for='duracion_dias'>
              Duración de días de contrato
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
                  required
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
                  required
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

export default GeneralForm