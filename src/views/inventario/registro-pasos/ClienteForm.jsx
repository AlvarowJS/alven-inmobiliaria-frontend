import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardBody, Button, Label, Input, Form, Col, Row, InputGroup, InputGroupText } from 'reactstrap'
import Select from 'react-select';
import { useForm } from 'react-hook-form'
const URL_ASESOR = 'http://127.0.0.1:8000/api/v1/asesor'
const URL = 'http://127.0.0.1:8000/api/v1/cliente'
const URL_ID = 'http://127.0.0.1:8000/api/v1/cliente-id'
import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

const ClienteForm = ({ stepper, objectGlobal, idPropiedad, borrador }) => {
  const token = localStorage.getItem('token');
  const [options, setOptions] = useState()
  const [optionsAsesor, setOptionsAsesor] = useState()
  const [objectCliente, setObjectCliente] = useState()
  const [idCliente, setIdCliente] = useState()
  const { handleSubmit, control, register, reset, setError, formState: { errors } } = useForm()

  // LLenara datos 
  useEffect(() => {
    reset(objectGlobal?.cliente)
    setObjectCliente(objectGlobal?.cliente)

  }, [])

  useEffect(() => {
    try {
      axios.get(URL_ASESOR, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
        .then(res => setOptionsAsesor(res.data))
        .catch(err => null)
    } catch (error) {
      null
    }

  }, [])

  useEffect(() => {
    try {
      axios.get(`${URL}`, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
        .then(res => {
          const tranformarData = res?.data?.map(item => ({
            value: item.id,
            label: item.nombre
          }))
          setOptions(tranformarData)
        })
        .catch(err => null)
    } catch (error) {
      null
    }

  }, [])


  useEffect(() => {

    try {
      axios.get(`${URL}/${idCliente}`, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
        .then(res => {

          reset(res?.data)

        })
        .catch(err => null)
    } catch (error) {
      null
    }


  }, [idCliente, options, optionsAsesor])

  const buscarCliente = (selectedOption) => {
    setIdCliente(selectedOption?.value)
  }

  const submit = (data) => {
    let idClienteActual = objectCliente?.id
    let actualizaCliente = {}
    actualizaCliente.cliente_id = idCliente

    axios.put(`${URL_ID}/${idPropiedad}`, actualizaCliente, {
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
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Registrar Propietario</CardTitle>

      </CardHeader>
      <CardBody>
        <Row className='mx-4 my-2'>
          <Label className='me-1' for='search-input'>
            Buscar Cliente
          </Label>

          <Select
            options={options}
            isSearchable
            placeholder="Buscar..."
            onChange={buscarCliente}
          />

        </Row>
        <form onSubmit={handleSubmit(submit)}>
          <Row>
            <h4 className='mx-2'> Nombre del cliente</h4>
            <Col>
              <div className="form-group mx-4 mb-2">
                <label htmlFor="nombre">Nombre</label>
                <input type="text" className="form-control" id="nombre"
                  {...register('nombre')}
                  placeholder="Alvaro..."
                  disabled
                />
              </div>
            </Col>
            <Col>
              <div className="form-group mx-4 mb-2">
                <label htmlFor="apellido_paterno">Apellido Paterno</label>
                <input type="text" className="form-control" id="apellido_paterno"
                  {...register('apellido_paterno')}
                  placeholder="Rosas"
                  disabled
                />
              </div>
            </Col>
            <Col>
              <div className="form-group mx-4 mb-2">
                <label htmlFor="apellido_materno">Apellido Materno</label>
                <input type="text" className="form-control" id="apellido_materno"
                  {...register('apellido_materno')}
                  placeholder="Perez"
                  disabled
                />
              </div>
            </Col>
          </Row>
          <Row>
            <h4 className='mx-2'> Datos de Contacto</h4>

            <Col>
              <div className="form-group mx-4 mb-2">
                <label htmlFor="cedula">Cédula</label>
                <input type="text" className="form-control" id="cedula"
                  {...register('cedula')}
                  placeholder="7468737"
                  disabled
                />
              </div>
            </Col>
            <Col>
              <div className="form-group mx-4 mb-2">
                <label htmlFor="email">Email</label>
                <input type="email" className="form-control" id="email"
                  {...register('email')}
                  placeholder="ejemplo@gmail.com"
                  disabled
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="form-group mx-4 mb-2">
                <label htmlFor="celular">Celular</label>
                <input type="text" className="form-control" id="celular"
                  {...register('celular')}
                  placeholder="99 442409"
                  disabled
                />
              </div>
            </Col>
            <Col>
              <div className="form-group mx-4 mb-2">
                <label htmlFor="medio_contacto">Medio de Contacto</label>
                <input type="text" className="form-control" id="medio_contacto"
                  {...register('medio_contacto')}
                  placeholder="celular, email, telefono..."
                  disabled
                />
              </div>
            </Col>
          </Row>
          <h4 className='mx-2'> Asesor</h4>

          <div className="form-group mx-4 mb-2">
            <label htmlFor="nombre_tarifa">Seleccionar al Asesor</label>
            <select className="form-select" id="asesor_id" {...register("asesor_id")} disabled>
              {
                optionsAsesor?.map(optionAsesor => (
                  <option key={optionAsesor.id} value={optionAsesor.id}>{optionAsesor.nombe} {optionAsesor.apellidos}</option>
                ))
              }
            </select>
          </div>

          <button className='btn btn-primary mx-4 mb-2'>Enviar</button>
        </form>
      </CardBody>
    </Card>
  )
}

export default ClienteForm