import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardBody, Button, Label, Input, Form, Col, Row, InputGroup, InputGroupText } from 'reactstrap'

const URL = 'http://127.0.0.1:8000/api/v1/cliente'
const URL_PROPIEDAD = 'http://127.0.0.1:8000/api/v1/propiedades'
import { useForm } from 'react-hook-form'
import axios from 'axios'
const token = localStorage.getItem('token');
const ClienteForm = ({ stepper, idPropiedad }) => {
  const [options, setOptions] = useState()

  const { handleSubmit, control, register, reset, setError, formState: { errors } } = useForm()

  useEffect(() => {
    axios.get(`${URL_PROPIEDAD}/${idPropiedad}`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => {
        reset(res?.data?.cliente)
      })
      .catch(err => console.log(err))
  }, [])


  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Registrar Propietario</CardTitle>
      </CardHeader>
      <CardBody>
        <div className="form-group mx-4 mb-2">
          <label htmlFor="nombre">Nombre</label>
          <input type="text" className="form-control" id="nombre"
            {...register('nombre')}
            placeholder="Alvaro..."
            required
          />
        </div>

        <div className="form-group mx-4 mb-2">
          <label htmlFor="apellido_paterno">Apellido Paterno</label>
          <input type="text" className="form-control" id="apellido_paterno"
            {...register('apellido_paterno')}
            placeholder="Rosas"
            required
          />
        </div>

        <div className="form-group mx-4 mb-2">
          <label htmlFor="apellido_materno">Apellido Materno</label>
          <input type="text" className="form-control" id="apellido_materno"
            {...register('apellido_materno')}
            placeholder="Perez"
            required
          />
        </div>

        <div className="form-group mx-4 mb-2">
          <label htmlFor="nombre_tarifa">Seleccionar al Asesor</label>
          <select className="form-select" id="asesor_id" {...register("asesor_id")}>
            {
              options?.map(option => (
                <option key={option.id} value={option.id}>{option.nombe} {option.apellidos}</option>
              ))
            }
          </select>
        </div>

        <div className="form-group mx-4 mb-2">
          <label htmlFor="cedula">Cedula</label>
          <input type="text" className="form-control" id="cedula"
            {...register('cedula')}
            placeholder="7468737"
            required
          />
        </div>

        <div className="form-group mx-4 mb-2">
          <label htmlFor="email">Email</label>
          <input type="email" className="form-control" id="email"
            {...register('email')}
            placeholder="ejemplo@gmail.com"
            required
          />
        </div>

        <div className="form-group mx-4 mb-2">
          <label htmlFor="celular">Celular</label>
          <input type="text" className="form-control" id="celular"
            {...register('celular')}
            placeholder="99 442409"
            required
          />
        </div>

        <div className="form-group mx-4 mb-2">
          <label htmlFor="medio_contacto">Medio de Contacto</label>
          <input type="text" className="form-control" id="medio_contacto"
            {...register('medio_contacto')}
            placeholder="celular, email, telefono..."
            required
          />
        </div>

      </CardBody>
    </Card>
  )
}

export default ClienteForm