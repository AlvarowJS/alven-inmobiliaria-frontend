import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardBody, Button, Label, Input, Form, Col, Row } from 'reactstrap'
import { useForm, Controller } from 'react-hook-form'
import toast from 'react-hot-toast'
import axios from 'axios'
const URL = 'https://backend.alven-inmobiliaria.com.mx/api/v1/publicidad'
const URL_ESTADO = 'https://backend.alven-inmobiliaria.com.mx/api/v1/actualizar-propiedad'
const URL_PROPIEDAD = 'https://backend.alven-inmobiliaria.com.mx/api/v1/propiedades'
const URL_MAPA = 'https://backend.alven-inmobiliaria.com.mx/api/v1/publicidad-mapa'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

// const idPropiedad = localStorage.getItem('id');

const PublicidadForm = ({ stepper, idPropiedad, objectGlobal }) => {
  const token = localStorage.getItem('token');
  const role = localStorage?.getItem('role');
  const navigate = useNavigate()
  const [objectPublicidad, setObjectPublicidad] = useState()
  const [estadoPropiedad, setEstadoPropiedad] = useState()
  const [selectedImage, setSelectedImage] = useState()
  const [fotoMapa, setFotoMapa] = useState()

  const {
    reset,
    control,
    setError,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()


  useEffect(() => {
    
    setSelectedImage(`https://backend.alven-inmobiliaria.com.mx/storage/${idPropiedad}/mapa/${objectGlobal?.publicidad?.mapa}`)
    setObjectPublicidad(objectGlobal?.publicidad)
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
      f.append('id', idPublicidad)
      axios.post(URL_MAPA, f, {
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
      f.append('id_propiedad', idPropiedad)
      axios.post(URL, f, {
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
      estado: ''
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
            <select className="form-select" id="estado" {...register("estado")} >
              <option value="En Promocion">En Promoción</option>
              <option value="Con Manifestacion">Con Manifestación</option>
              <option value="Cancelada">Cancelada </option>
              <option value="Suspendida">Suspendida </option>
              <option value="Cerrada">Cerrada</option>
            </select>
          </div>
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