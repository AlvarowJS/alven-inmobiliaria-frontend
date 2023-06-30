import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardBody, Button, Label, Input, Form, Col, Row } from 'reactstrap'
import { useForm, Controller } from 'react-hook-form'
import toast from 'react-hot-toast'
import axios from 'axios'
import Select from 'react-select'
const URL = 'https://backend.alven-inmobiliaria.com.mx/api/v1/general'
const URL_PROPIEDAD = 'https://backend.alven-inmobiliaria.com.mx/api/v1/propiedades'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
const GeneralForm = ({ asesorObj, idPropiedad, stepper, objectGlobal, idGeneral }) => {

  console.log(idGeneral)
  const token = localStorage.getItem('token');
  const [objectGeneral, setObjectGeneral] = useState()
  const [tipoOpe, setTipoOpe] = useState()
  const [tipoProp, setTipoProp] = useState()
  const {
    reset,
    control,
    setError,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const onSubmit = data => {
    let idGeneralForm = objectGeneral?.id    
    if (idGeneralForm) {
      
      axios.put(`${URL}/${idGeneralForm}`, data, {
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
      data.numero_ofna = idGeneral
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
    setTipoOpe(objectGlobal?.general?.tipo_operacion)
    setTipoOpe(objectGlobal?.general?.tipo_propiedad)
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
      aceptar_creditos: '',
      fecha_credito: '',
      fecha_inicio: '',
      operacion: '',
      requisito_arrendamiento: '',
    })
  }

  console.log(tipoOpe)
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
            <input className='form-control' type="text" value={idGeneral} {...register("numero_ofna")} disabled/>
            {/* <Controller
              defaultValue=''
              control={control}
              id='numero_ofna'
              name='numero_ofna'
              
              render={({ field }) => <Input placeholder='23423' invalid={errors.numero_ofna && true} {...field} />}
            /> */}
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
              Tipo de Operación
            </Label>
            <select className="form-select" id="tipo_operacion" {...register("tipo_operacion")} onChange={(e) => setTipoOpe(e.target.value)} >
              <option value="Venta">Venta</option>
              <option value="Renta">Renta</option>
            </select>

          </div>
          <div className='mb-1'>
            <Label className='form-label' for='tipo_propiedad'>
              Tipo de Propiedad
            </Label>
            <select className="form-select" id="tipo_propiedad" {...register("tipo_propiedad")} onChange={(e) => setTipoProp(e.target.value)}>
              <option value="Habitacional">Habitacional</option>
              <option value="Comercial">Comercial</option>
            </select>

          </div>

          <div className='mb-1'>
            <Label className='form-label' for='tipo_propiedad'>
              Subtipo de Propiedad
            </Label>

            {
              tipoProp == 'Habitacional' ? (
                <select className="form-select" id="tipo_propiedad" {...register("sub_tipo_propiedad")} >
                  <option value="Casa">Casa</option>
                  <option value="Casa Duplex">Casa Duplex</option>
                  <option value="Casa en Condominio">Casa en Condominio</option>
                  <option value="Departamento">Departamento</option>
                  <option value="Penthouse">Penthouse</option>
                  <option value="Terreno">Terreno</option>
                  <option value="Huerta">Huerta</option>
                  <option value="Quinta">Quinta</option>
                  <option value="Rancho">Rancho</option>
                  <option value="Hacienda">Hacienda</option>
                  <option value="Edificio">Edificio</option>
                </select>

              ) :
                (
                  <select className="form-select" id="tipo_propiedad" {...register("sub_tipo_propiedad")} >
                    <option value="Terreno">Terreno</option>
                    <option value="Edificio">Edificio</option>
                    <option value="Fracccionamiento">Fracccionamiento</option>
                    <option value="Inmueble Productivo">Inmueble Productivo</option>
                    <option value="Consultorio">Consultorio</option>
                    <option value="Local">Local</option>
                    <option value="Oficinas">Oficinas</option>
                    <option value="Bodegas">Bodegas</option>
                    <option value="Fábrica">Fábrica</option>
                    <option value="Nave">Nave</option>
                  </select>
                )}



          </div>
          <div className='mb-1'>
            <Label className='form-label' for='tipo_contrato'>
              Tipo de Contrato
            </Label>
            <select className="form-select" id="tipo_contrato" {...register("tipo_contrato")}>
              <option value="Exclusiva">Exclusiva</option>
              <option value="Opción">Opción</option>
            </select>

          </div>
          <div className='mb-1'>
            <Label className='form-label' for='asesor_exclusivo'>
              Asesor de Exclusiva
            </Label>
            <select className="form-select" id="asesor_id" {...register("asesor_exclusivo")}>
              {
                asesorObj?.map(option => (
                  <option key={option.id} value={option.nombre + ' ' + option.apellidos}>{option.nombre} {option.apellidos}</option>
                ))
              }
            </select>

          </div>
          <div className='mb-1'>
            <Label className='form-label' for='operacion'>
              {
                tipoOpe == 'Venta' ? 'Porcentaje de comisión' : 'Número de Días'
              }

            </Label>
            <Controller
              defaultValue=''
              control={control}
              id='operacion'
              name='operacion'
              render={({ field }) => (
                <Input
                  type='text'
                  placeholder=''
                  
                  invalid={errors.operacion && true}
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
                  placeholder=''
                  
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