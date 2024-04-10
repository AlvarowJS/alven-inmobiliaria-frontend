import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardBody, Button, Label, Input, Form, Col, Row, InputGroup, InputGroupText } from 'reactstrap'
import Select from 'react-select';
import { useForm } from 'react-hook-form'
const URL_ASESOR = '/v1/asesor'
const URL = '/v1/cliente'
const URL_MEDIO = '/v1/medios'
const URL_ID = '/v1/cliente-id'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import alvenApi from '../../../api/alvenApi';
const MySwal = withReactContent(Swal)

const ClienteForm = ({ stepper, objectGlobal, idPropiedad, borrador,asesorObj }) => {
  const token = localStorage.getItem('token');
  const [activar, setActivar] = useState(false)
  const role = localStorage?.getItem('role');

  const [options, setOptions] = useState()
  const [optionsAsesor, setOptionsAsesor] = useState([])
  const [optionsMedio, setOptionsMedio] = useState()
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
      alvenApi.get(URL_MEDIO, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
        .then(res => setOptionsMedio(res.data))
        .catch(err => null)
    } catch (error) {
      null
    }

  }, [])


  // useEffect(() => {
  //   try {
  //     alvenApi.get(URL_ASESOR, {
  //       headers: {
  //         'Authorization': 'Bearer ' + token
  //       }
  //     })
  //       .then(res => setOptionsAsesor(res?.data))
  //       .catch(err => null)
  //   } catch (error) {
  //     null
  //   }

  // }, [])

  useEffect(() => {
    try {
      alvenApi.get(`${URL}`, {
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
      alvenApi.get(`${URL}/${idCliente}`, {
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

  const crearCliente = () => {
    setActivar(!activar)
    if (activar) {
    } else {
    }

  }
  console.log(activar)
  const submit = (data) => {
    // false = registrar cliente
    // true = buscar por cliente 
    console.log(objectCliente.id,"xd")
    let idClienteActual = objectCliente?.id
    if (activar) {
      let actualizaCliente = {}
      actualizaCliente.cliente_id = idCliente

      alvenApi.put(`${URL_ID}/${idPropiedad}`, actualizaCliente, {
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
      console.log("entro al else")
      console.log(idCliente, "entro al else")
      if (idCliente) {
        alvenApi.put(`${URL}/${idCliente}`, data, {
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
      } else if(objectCliente?.id){
        alvenApi.put(`${URL}/${objectCliente?.id}`, data, {
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
      else {
        data.id_propiedad = idPropiedad
        alvenApi.post(URL, data, {
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
          .catch(err => {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Numero ya registrado',
              text: `Por el cliente ${err.response.data.cliente}`,
              showConfirmButton: false,
            })
          })
      }
    }
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Registrar Propietario</CardTitle>

      </CardHeader>
      <CardBody>
        <Row>
          <Col className='mx-4 my-2'>
            <button className='btn btn-info' onClick={crearCliente}>
              {
                activar ? 'Crear Cliente' : 'Buscar Cliente'
              }

            </button>
          </Col>
        </Row>

        {
          activar ?
            <Row className='mx-2 my-2'>
              <Label className='me-1' for='search-input'>
                <h2> Buscar Cliente</h2>
              </Label>

              <Select
                options={options}
                isSearchable
                placeholder="Buscar..."
                onChange={buscarCliente}
              />

            </Row>
            : null
        }


        <form onSubmit={handleSubmit(submit)}>
          <Row>
            <h4 className='mx-2'> Nombre del cliente</h4>
            <Col>
              <div className="form-group mx-4 mb-2">
                <label htmlFor="nombre">Nombre</label>
                <input type="text" className="form-control" id="nombre"
                  {...register('nombre')}
                  placeholder="Alvaro..."
                  disabled={activar}
                />
              </div>
            </Col>
            <Col>
              <div className="form-group mx-4 mb-2">
                <label htmlFor="apellido_paterno">Apellido Paterno</label>
                <input type="text" className="form-control" id="apellido_paterno"
                  {...register('apellido_paterno')}
                  placeholder="Rosas"
                  disabled={activar}
                />
              </div>
            </Col>
            <Col>
              <div className="form-group mx-4 mb-2">
                <label htmlFor="apellido_materno">Apellido Materno</label>
                <input type="text" className="form-control" id="apellido_materno"
                  {...register('apellido_materno')}
                  placeholder="Perez"
                  disabled={activar}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <h4 className='mx-2'> Datos de Contacto</h4>

            <Col>
              <div className="form-group mx-4 mb-2">
                <label htmlFor="interesado">Interesado En</label>
                <input type="text" className="form-control" id="interesado"
                  {...register('interesado')}
                  disabled={activar}
                />
              </div>
            </Col>
            <Col>
              <div className="form-group mx-4 mb-2">
                <label htmlFor="email">Email</label>
                <input type="email" className="form-control" id="email"
                  {...register('email')}
                  placeholder="ejemplo@gmail.com"
                  disabled={activar}
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
                  disabled={activar}
                />
              </div>
            </Col>
            <Col>
              <div className="form-group mx-4 mb-2">
                <label htmlFor="medio_contacto">Medio de Contacto</label>
                <select className="form-select" id="medio_contacto" {...register("medio_contacto")} disabled={activar}>
                  {
                    optionsMedio?.map(optionMedio => (
                      <option key={optionMedio.id} value={optionMedio.medio_contacto}>{optionMedio.medio_contacto} </option>
                    ))
                  }
                </select>
              </div>
              {/* <div className="form-group mx-4 mb-2">
                <label htmlFor="medio_contacto">Medio de Contacto</label>
                <input type="text" className="form-control" id="medio_contacto"
                  {...register('medio_contacto')}
                  placeholder="celular, email, telefono..."
                  disabled={activar}
                />                
              </div> */}
            </Col>
          </Row>
          <h4 className='mx-2'> Asesor</h4>

          <div className="form-group mx-4 mb-2">
            <label htmlFor="asesor_id">Seleccionar al Asesor</label>
            <select className="form-select" id="asesor_id" {...register("asesor_id")} disabled={activar}>
              <option key="" value="">Sin asesor</option>
              {
                asesorObj?.map(optionAsesor => (
                  <option key={optionAsesor?.id} value={optionAsesor?.id}>{optionAsesor?.nombre} {optionAsesor?.apellidos}</option>
                ))
              }
            </select>
          </div>

          <h4 className='mx-2'> Tipo de cliente</h4>

          <div className="form-group mx-4 mb-2">
            <label htmlFor="tipo_cliente">Seleccionar el tipo de cliente</label>
            <select className="form-select" id="tipo_cliente" {...register("tipo_cliente")} disabled={activar}>
              <option value="Propietario">Propietario</option>
              <option value="Interesado">Interesado</option>
            </select>
          </div>

          {
            role == "1" ?
              <button className='btn btn-primary mx-4 mb-2'>Enviar</button>
              : null
          }
        </form>
      </CardBody>
    </Card>
  )
}

export default ClienteForm