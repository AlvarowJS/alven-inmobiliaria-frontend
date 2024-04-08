import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardBody, Button, Label, Input, Form, Col, Row } from 'reactstrap'
import { useForm, Controller } from 'react-hook-form'
import toast from 'react-hot-toast'
import { X, Plus } from 'react-feather'

const URL = '/v1/publicidad'
const URL_ESTADO = '/v1/actualizar-propiedad'
const URL_PROPIEDAD = '/v1/propiedades'
import Repeater from '@components/repeater'

const URL_MAPA = '/v1/publicidad-mapa'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import alvenApi from '../../../api/alvenApi'
const MySwal = withReactContent(Swal)

// const idPropiedad = localStorage.getItem('id');

const PublicidadForm = ({ stepper, idPropiedad, objectGlobal, asesorObj }) => {
  const token = localStorage.getItem('token');
  const role = localStorage?.getItem('role');
  const navigate = useNavigate()
  const [objectPublicidad, setObjectPublicidad] = useState()
  const [estadoPropiedad, setEstadoPropiedad] = useState()
  const [selectedImage, setSelectedImage] = useState()
  const [fotoMapa, setFotoMapa] = useState()
  const [count, setCount] = useState(1)
  const [formArray, setFormArray] = useState([])
  const [formArrayBack, setFormArrayBack] = useState([])

  const increaseCount = () => {
    setFormArray([...formArray, { red_social: '', enlace: '' }]);
    setCount(count + 1)
  }

  const deleteForm = (index) => {
    const updatedFormData = [...formArray];
    updatedFormData.splice(index, 1);
    setFormArray(updatedFormData);
    setCount(count - 1);
  }


  const {
    reset,
    control,
    setError,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()


  useEffect(() => {

    // console.log(objectGlobal?.publicidad?.ligas.length == undefined ? 0 : objectGlobal?.publicidad?.ligas, "asafsf")
    setSelectedImage(`https://backend.alven-inmobiliaria.com.mx/storage/${idPropiedad}/mapa/${objectGlobal?.publicidad?.mapa}`)
    setObjectPublicidad(objectGlobal?.publicidad)
    setEstadoPropiedad(objectGlobal?.publicidad?.estado)
    setFormArray(objectGlobal?.publicidad?.ligas == undefined ? [] : objectGlobal?.publicidad?.ligas)
    setFormArrayBack(objectGlobal?.publicidad?.ligas == undefined ? [] : objectGlobal?.publicidad?.ligas)
    // setCount((objectGlobal?.publicidad?.ligas).length == undefined ? 0 : objectGlobal?.publicidad?.ligas)
    setCount(objectGlobal?.publicidad?.ligas == undefined ? 1 : (objectGlobal?.publicidad?.ligas).length)
    reset(objectGlobal?.publicidad)
  }, [])

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Leer el archivo y obtener la URL de la imagen

      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
    setFotoMapa(file)
  };


  const handleChange = (index, field, value) => {
    const updatedFormData = [...formArray];
    updatedFormData[index] = {
      ...updatedFormData[index],
      [field]: value,
    };
    setFormArray(updatedFormData);
  };

  const onSubmit = data => {
    let idPublicidad = objectPublicidad?.id

    if (idPublicidad) {
      const f = new FormData()
      f.append('id_propiedad', idPropiedad)
      f.append('precio_venta', data.precio_venta)
      f.append('encabezado', data.encabezado)
      f.append('descripcion', data.descripcion)
      f.append('video_url', data.video_url)
      f.append('estado', data.estado)
      f.append('mapa', fotoMapa)
      f.append('fecha_promocion', data.fecha_promocion ?? '')
      f.append('fecha_manifestacion', data.fecha_manifestacion ?? '')
      f.append('fecha_suspendida', data.fecha_suspendida ?? '')
      f.append('fecha_cancelada', data.fecha_cancelada ?? '')
      f.append('fecha_cierre', data.fecha_cierre ?? '')
      f.append('precio_cierre', data.precio_cierre ?? '')
      f.append('asesor_cierre', data.asesor_cierre ?? '')
      const enlacesJson = JSON.stringify(formArray);
      f.append('enlaces', enlacesJson);
      f.append('id', idPublicidad)
      alvenApi.post(URL_MAPA, f, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
        .then(res => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Inventario Registrado',
            showConfirmButton: false,
            timer: 1500
          })
          navigate(`/inventario`)
          stepper.next()
        })
        .catch(err => null)
    } else {
      // data.id_propiedad = idPropiedad
      // Append
      const f = new FormData()
      f.append('precio_venta', data.precio_venta)
      f.append('encabezado', data.encabezado)
      f.append('descripcion', data.descripcion)
      f.append('video_url', data.video_url)
      f.append('estado', data.estado)
      f.append('mapa', fotoMapa)
      f.append('fecha_promocion', data.fecha_promocion ?? '')
      f.append('fecha_manifestacion', data.fecha_manifestacion ?? '')
      f.append('fecha_suspendida', data.fecha_suspendida ?? '')
      f.append('fecha_cancelada', data.fecha_cancelada ?? '')
      f.append('fecha_cierre', data.fecha_cierre ?? '')
      f.append('precio_cierre', data.precio_cierre ?? '')
      f.append('asesor_cierre', data.asesor_cierre ?? '')
      const enlacesJson = JSON.stringify(formArray);
      f.append('enlaces', enlacesJson);
      f.append('id_propiedad', idPropiedad)
      alvenApi.post(URL, f, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
        .then(res => {
          stepper.next()
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Inventario Registrado',
            showConfirmButton: false,
            timer: 1500
          })
          navigate(`/inventario`)
        })
        .catch(err => null)
    }
  }

  const handleReset = () => {
    reset({
      precio_venta: '',
      encabezado: '',
      descripcion: '',
      video_url: '',
      estado: '',
      fecha_promocion: '',
      fecha_manifestacion: '',
      fecha_suspendida: '',
      fecha_cancelada: '',
      fecha_cierre: '',
      precio_cierre: '',
      asesor_cierre: '',

    })
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Registrar Publicidad </CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-1'>
            <Label className='form-label' for='precio_venta'>
              Precio de venta
            </Label>
            <Controller
              defaultValue=''
              control={control}
              id='precio_venta'
              name='precio_venta'
              render={({ field }) => <Input invalid={errors.precio_venta && true}  {...field} />}
            />
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='encabezado'>
              Encabezado
            </Label>
            <Controller
              defaultValue=''
              control={control}
              id='encabezado'
              name='encabezado'
              render={({ field }) => <Input invalid={errors.encabezado && true}  {...field} />}
            />
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='descripcion'>
              Descripción
            </Label>
            <Controller
              defaultValue=''
              control={control}
              id='descripcion'
              name='descripcion'
              render={({ field }) => <Input type="textarea" invalid={errors.descripcion && true}  {...field} />}
            />
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='video_url'>
              Video URL
            </Label>
            <Controller
              defaultValue=''
              control={control}
              id='video_url'
              name='video_url'
              render={({ field }) => <Input invalid={errors.video_url && true}  {...field} />}
            />
          </div>

          <Card>
            <CardHeader>
              <h4 className='card-title'>Ligas del Inmueble</h4>
            </CardHeader>

            <CardBody>
              {/* <Repeater count={count}> */}
              {
                formArray.map((formData, index) => (

                  //i => (
                  // <Form key={i}>
                  <Row className='justify-content-between align-items-center'>
                    <Col md={4} className='mb-md-0 mb-1'>
                      <Label className='form-label' >
                        Red Social
                      </Label>
                      <Input
                        type='text'
                        // value={formArray[i]?.red_social || ''}
                        value={formData.red_social || ''}

                        onChange={e => handleChange(index, 'red_social', e.target.value)}
                      />
                    </Col>
                    <Col md={6} className='mb-md-0 mb-1'>
                      <Label className='form-label'>
                        Enlace
                      </Label>
                      <Input
                        type='text'
                        // value={formArray[i]?.enlace || ''}
                        value={formData.enlace || ''}
                        onChange={e => handleChange(index, 'enlace', e.target.value)}
                      />
                    </Col>

                    <Col md={2}>
                      <Button color='danger' className='text-nowrap px-1'
                        onClick={
                          () => deleteForm(index)
                          // (e) => deleteForm(e)
                        }
                        outline>
                        <X size={14} className='me-50' />
                        <span>Quitar</span>
                      </Button>
                    </Col>
                    <Col sm={12}>
                      <hr />
                    </Col>
                  </Row>
                ))
                // </Form>
                //)
              }
              {/* </Repeater> */}
              <Button className='btn-icon' color='primary' onClick={increaseCount}>
                <Plus size={14} />
                <span className='align-middle ms-25'>Agregar</span>
              </Button>
            </CardBody>
          </Card>

          <div className='mb-1'>
            <Label className='form-label' for='mapa'>
              Imagen del Mapa
            </Label>
            <input type="file" className="form-control" id="mapa"
              {...register('mapa')}
              onChange={handleFileChange}

            />
          </div>
          <div className="form-group mx-4 mb-2">
            {
              fotoMapa != null && selectedImage == null ?
                <img src={`https://backend.alven-inmobiliaria.com.mx/storage/${idPropiedad}/mapa/${fotoMapa}`} alt="" style={{ width: "100%", height: "auto" }} /> : null
            }
            {selectedImage && (
              <div className="preview-image">
                <img src={selectedImage} alt="Preview" style={{ width: "100%", height: "400px", objectFit: "cover" }} />
              </div>
            )}
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='estado'>
              Status
            </Label>
            <select className="form-select" id="estado" {...register("estado")} onChange={(e) => setEstadoPropiedad(e.target.value)}>
              <option value="En Promocion">En Promoción</option>
              <option value="Con Manifestacion">Con Manifestación</option>
              <option value="Cancelada">Cancelada </option>
              <option value="Suspendida">Suspendida </option>
              <option value="Cerrada">Cerrada</option>
            </select>
          </div>
          {
            estadoPropiedad == "En Promocion" ? (
              <div className='mb-1'>
                <Label className='form-label' for='fecha_promocion'>
                  Fecha de Promoción
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='fecha_promocion'
                  name='fecha_promocion'

                  render={({ field }) => <Input invalid={errors.fecha_promocion && true}  {...field} type='date' />}
                />
              </div>
            ) :
              estadoPropiedad == "Con Manifestacion" ? (
                <div className='mb-1'>
                  <Label className='form-label' for='fecha_manifestacion'>
                    Fecha con Manifestación
                  </Label>
                  <Controller
                    defaultValue=''
                    control={control}
                    id='fecha_manifestacion'
                    name='fecha_manifestacion'

                    render={({ field }) => <Input invalid={errors.fecha_manifestacion && true}  {...field} type='date' />}
                  />
                </div>
              ) :
                estadoPropiedad == "Cancelada" ? (
                  <div className='mb-1'>
                    <Label className='form-label' for='fecha_cancelada'>
                      Fecha Cancelada
                    </Label>
                    <Controller
                      defaultValue=''
                      control={control}
                      id='fecha_cancelada'
                      name='fecha_cancelada'

                      render={({ field }) => <Input invalid={errors.fecha_cancelada && true}  {...field} type='date' />}
                    />
                  </div>
                ) :
                  estadoPropiedad == "Suspendida" ? (
                    <div className='mb-1'>
                      <Label className='form-label' for='fecha_suspendida'>
                        Fecha Suspendida
                      </Label>
                      <Controller
                        defaultValue=''
                        control={control}
                        id='fecha_suspendida'
                        name='fecha_suspendida'

                        render={({ field }) => <Input invalid={errors.fecha_suspendida && true}  {...field} type='date' />}
                      />
                    </div>
                  ) :
                    estadoPropiedad == 'Cerrada' ?
                      (
                        <>
                          <div className='mb-1'>
                            <Label className='form-label' for='precio_cierre'>
                              Precio de Cierre
                            </Label>
                            <Controller
                              defaultValue=''
                              control={control}
                              id='precio_cierre'
                              name='precio_cierre'
                              render={({ field }) => <Input invalid={errors.precio_cierre && true}  {...field} />}
                            />
                          </div>
                          <div className='mb-1'>
                            <Label className='form-label' for='fecha_cierre'>
                              Fecha de Cierre
                            </Label>
                            <Controller
                              defaultValue=''
                              control={control}
                              id='fecha_cierre'
                              name='fecha_cierre'

                              render={({ field }) => <Input invalid={errors.fecha_cierre && true}  {...field} type='date' />}
                            />
                          </div>
                          <div className='mb-1'>
                            <Label className='form-label' for='asesor_cierre'>
                              Asesor de Cierre
                            </Label>
                            {/* <Controller
                          defaultValue=''
                          control={control}
                          id='asesor_cierre'
                          name='asesor_cierre'
                          render={({ field }) => <Input invalid={errors.asesor_cierre && true}  {...field} />}
                        /> */}
                            <select className="form-select" id="asesor_cierre" {...register("asesor_cierre")}>
                              <option key="" value="">Sin asesor</option>
                              {

                                asesorObj?.map(option => (
                                  <option key={option.id} value={option.nombre + ' ' + option.apellidos}>{option.nombre} {option.apellidos}</option>
                                ))
                              }
                            </select>
                          </div>
                        </>
                      ) :
                      null
          }

          <div className='d-flex'>
            {/* <Button className='me-1' color='success' onClick={terminarEdicion} disabled={estadoPropiedad}>
              Terminar
            </Button> */}
            {
              role == "1" ?
                <>
                  <Button className='me-1' color='primary' type='submit'>
                    Enviar y Terminar
                  </Button>
                  <Button outline color='secondary' type='reset' onClick={handleReset}>
                    Reset
                  </Button>
                </>
                : null
            }
          </div>
        </Form>
      </CardBody>
    </Card >
  )
}

export default PublicidadForm