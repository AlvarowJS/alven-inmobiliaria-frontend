import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardBody, Button, Label, Input, Form, Col, Row, InputGroup, InputGroupText } from 'reactstrap'
import Select from 'react-select';
import { useForm } from 'react-hook-form'
const URL_ASESOR = 'http://127.0.0.1:8000/api/v1/asesor'
const URL = 'http://127.0.0.1:8000/api/v1/cliente'
const URL_PROPIEDAD = 'http://127.0.0.1:8000/api/v1/propiedades'
import axios from 'axios'
import Autocomplete from '@components/autocomplete'
const token = localStorage.getItem('token');
const ClienteForm = ({ stepper, idPropiedad }) => {
  const [options, setOptions] = useState()
  const [optionsAsesor, setOptionsAsesor] = useState()
  const [objectCliente, setObjectCliente] = useState()
  const [idCliente, setIdCliente] = useState()
  const { handleSubmit, control, register, reset, setError, formState: { errors } } = useForm()

  useEffect(() => {
    axios.get(URL_ASESOR, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => setOptionsAsesor(res.data))
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    axios.get(`${URL}`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => {
        console.log(res.data)
        const tranformarData = res?.data?.map(item => ({
          value: item.id,
          label: item.nombre
        }))
        setOptions(tranformarData)
      })
      .catch(err => console.log(err))
  }, [])


  useEffect(() => {

    axios.get(`${URL}/${idCliente}`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => {
        console.log(res?.data)
        reset(res?.data)

      })
      .catch(err => console.log(err))

  }, [idCliente, options, optionsAsesor])

  // LLenara datos 
  useEffect(() => {
    axios.get(`${URL_PROPIEDAD}/${idPropiedad}`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => {
        reset(res?.data?.cliente)
        setObjectCliente(res?.data?.cliente)

      })
      .catch(err => console.log(err))
  }, [])


  const buscarCliente = (selectedOption) => {
    setIdCliente(selectedOption?.value)
  }

  const submit = (data) => {
    let idCliente = objectCliente?.id

    if (idCliente) {
      axios.put(`${URL}/${idCliente}`, data, {
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
                  required
                />
              </div>
            </Col>
            <Col>
              <div className="form-group mx-4 mb-2">
                <label htmlFor="apellido_paterno">Apellido Paterno</label>
                <input type="text" className="form-control" id="apellido_paterno"
                  {...register('apellido_paterno')}
                  placeholder="Rosas"
                  required
                />
              </div>
            </Col>
            <Col>
              <div className="form-group mx-4 mb-2">
                <label htmlFor="apellido_materno">Apellido Materno</label>
                <input type="text" className="form-control" id="apellido_materno"
                  {...register('apellido_materno')}
                  placeholder="Perez"
                  required
                />
              </div>
            </Col>
          </Row>
          <Row>
            <h4 className='mx-2'> Datos de Contacto</h4>

            <Col>
              <div className="form-group mx-4 mb-2">
                <label htmlFor="cedula">Cedula</label>
                <input type="text" className="form-control" id="cedula"
                  {...register('cedula')}
                  placeholder="7468737"
                  required
                />
              </div>
            </Col>
            <Col>
              <div className="form-group mx-4 mb-2">
                <label htmlFor="email">Email</label>
                <input type="email" className="form-control" id="email"
                  {...register('email')}
                  placeholder="ejemplo@gmail.com"
                  required
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
                  required
                />
              </div>
            </Col>
            <Col>
              <div className="form-group mx-4 mb-2">
                <label htmlFor="medio_contacto">Medio de Contacto</label>
                <input type="text" className="form-control" id="medio_contacto"
                  {...register('medio_contacto')}
                  placeholder="celular, email, telefono..."
                  required
                />
              </div>
            </Col>
          </Row>
          <h4 className='mx-2'> Asesor</h4>

          <div className="form-group mx-4 mb-2">
            <label htmlFor="nombre_tarifa">Seleccionar al Asesor</label>
            <select className="form-select" id="asesor_id" {...register("asesor_id")}>
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