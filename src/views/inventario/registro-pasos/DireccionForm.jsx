import React, { useEffect, useRef, useState } from 'react'
import { Card, CardHeader, CardTitle, CardBody, Button, Label, Input, Form, Col, Row, InputGroup, InputGroupText } from 'reactstrap'
import { useForm, Controller } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Link, Navigate, useNavigate } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Check, X } from 'react-feather'

import './../style/style.css'
const containerStyle = {
  width: '100%',
  height: '400px'
};
import axios from 'axios';
const URL = 'https://backend.alven-inmobiliaria.com.mx/api/v1/direccion'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import html2canvas from 'html2canvas';
const MySwal = withReactContent(Swal)

const DireccionForm = ({ stepper, idPropiedad, objectGlobal }) => {

  const token = localStorage.getItem('token');

  const navigate = useNavigate()

  const [estado, setEstado] = useState()
  const [pais, setPais] = useState()
  const [municipio, setMunicipio] = useState()
  const [colonia, setColonia] = useState()
  const [calle, setCalle] = useState()
  const [numero, setNumero] = useState()

  const [mapaCapturado, setMapaCapturado] = useState(null);
  const [objectDirection, setObjectDirection] = useState()
  const [lat, setLat] = useState(-9.960817)
  const [lng, setLng] = useState(-76.248254)
  const [zoom, setZoom] = useState(15)
  const [direccion, setDireccion] = useState('');

  // const mapRef = useRef(null);

  // const capturarMapa = () => {
  //   const mapContainer = document.getElementById('map-container');

  //   html2canvas(mapContainer).then((canvas) => {
  //     const imgData = canvas.toDataURL('image/png');
  //     setMapaCapturado(imgData);
  //   });
  // };



  const handleMapClick = (event) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: event.latLng }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          setDireccion(results[0].formatted_address);
          const { lat, lng } = results[0].geometry.location;
          setLat(lat())
          setLng(lng())
        }
      } else {
        console.error('Error al obtener la dirección:', status);
      }
    });
  };

  useEffect(() => {
    setPais(objectGlobal?.direccion?.pais)
    setEstado(objectGlobal?.direccion?.estado)
    setMunicipio(objectGlobal?.direccion?.municipio)
    setColonia(objectGlobal?.direccion?.colonia)
    setCalle(objectGlobal?.direccion?.calle)
    setNumero(objectGlobal?.direccion?.numero)

    reset(objectGlobal?.direccion)
    setLat(parseFloat(objectGlobal?.direccion?.LAT) ? parseFloat(objectGlobal?.direccion?.LAT) : lat)
    setLng(parseFloat(objectGlobal?.direccion?.LON) ? parseFloat(objectGlobal?.direccion?.LON) : lng)
    setZoom(parseFloat(objectGlobal?.direccion?.ZOOM) ? parseFloat(objectGlobal?.direccion?.ZOOM) : zoom)
    setObjectDirection(parseFloat(objectGlobal?.direccion))

  }, [])


  const {
    reset,
    control,
    setError,
    handleSubmit,
    register,
    formState: { errors }
  } = useForm()

  const buscarDireccion = () => {
    let direccionUnida = `${pais && pais} ${estado && estado} ${municipio && municipio} ${colonia && colonia} ${calle && calle} ${numero && numero}`
    console.log(direccionUnida)
    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ address: direccionUnida }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {

          const { lat, lng } = results[0].geometry.location;
          // Utiliza las coordenadas obtenidas (lat y lng) como nuevo centro del mapa
          setLat(lat);
          setLng(lng);
          setZoom(15);
        }
      } else {
        console.error('Error al buscar la dirección:', status);
      }
    });
  };

  const onSubmit = data => {

    let idDireccion = objectDirection?.id
    data.LAT = lat
    data.LON = lng
    data.ZOOM = zoom
    if (idDireccion) {
      axios.put(`${URL}/${idDireccion}`, data, {
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

  const handleLat = (e) => {
    let latValue = e.target.value
    if (latValue.endsWith(".")) {
      setLat(latValue)
    }
    else {
      latValue = Number(latValue)
      if (typeof (latValue) == 'number') {
        setLat(latValue)
        if (isNaN(latValue)) {
          setLat(0)

        }
      }
    }
  }
  const handleLong = (e) => {
    let lonValue = e.target.value
    if (lonValue.endsWith(".")) {
      setLng(lonValue)
    }
    else {
      lonValue = Number(lonValue)
      if (typeof (lonValue) == 'number') {
        setLng(lonValue)
        if (isNaN(lonValue)) {
          setLng(0)
        }
      }
    }
  }

  const handleZoom = (e) => {
    let zoomValue = e.target.value
    zoomValue = Number(zoomValue)
    if (typeof (zoomValue) == 'number') {
      setZoom(zoomValue)
      if (isNaN(zoomValue)) {
        setZoom(0)
      }
    }
  }

  const handleReset = () => {
    reset({
      LAT: '',
      LON: '',
      ZOOM: '',
      calle: '',
      codigo_postal: '',
      colonia: '',
      estado: '',
      municipio: '',
      numero: '',
      numero_interior: '',
      pais: ''
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
            <input className='form-control' type="text" {...register("pais")} onInput={(e) => setPais(e.target.value)}  />

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
              render={({ field }) => <Input placeholder='10003' invalid={errors.codigo_postal && true} {...field}  />}
            />
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='estado'>
              Estado
            </Label>
            <input className='form-control' type="text" {...register("estado")} onInput={(e) => setEstado(e.target.value)}  />

          </div>
          <div className='mb-1'>
            <Label className='form-label' for='municipio'>
              Municipio
            </Label>
            <input className='form-control' type="text" {...register("municipio")} onInput={(e) => setMunicipio(e.target.value)}  />

          </div>
          <div className='mb-1'>
            <Label className='form-label' for='colonia'>
              Colonia
            </Label>
            <input className='form-control' type="text" {...register("colonia")} onInput={(e) => setColonia(e.target.value)}  />

          </div>

          <Row>
            <Col>
              <div className='mb-1'>
                <Label className='form-label' for='calle'>
                  Calle
                </Label>
                <input className='form-control' type="text" {...register("calle")} onInput={(e) => setCalle(e.target.value)}  />

              </div>
            </Col>
            <Col>
              <div className='mb-1'>
                <Label className='form-label' for='numero'>
                  Número
                </Label>
                <input className='form-control' type="text" {...register("numero")} onInput={(e) => setNumero(e.target.value)}  />
              </div>
            </Col>
            <Col>
              <div className='mb-1'>
                <Label className='form-label' for='numero_interior'>
                  Número Interior
                </Label>
                <input className='form-control' type="text" {...register("numero_interior")}  />
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className='mb-1'>
                <Label className='form-label' for='LAT'>
                  LATITUD
                </Label>

                <InputGroupText>
                  <input className='local_input' type="text" id="LAT"
                    
                    value={lat}
                    onChange={handleLat}
                    {...register('LAT')}
                  />
                </InputGroupText>
              </div>
            </Col>
            <Col>
              <div className='mb-1'>
                <Label className='form-label' for='LON'>
                  LONGITUD
                </Label>

                <InputGroupText>
                  <input className='local_input' type="text" id="LON"

                    
                    value={lng}
                    onChange={handleLong}
                    {...register('LON')}
                  />
                </InputGroupText>
              </div>
            </Col>
            <Col>
              <div className='mb-1'>
                <Label className='form-label' for='ZOOM'>
                  ZOOM
                </Label>

                <InputGroupText>
                  <input className='local_input' type="text" id="ZOOM"

                    onChange={handleZoom}
                    value={zoom}
                    
                    placeholder='Distancia en como se vera el mapa'
                    {...register('ZOOM')}
                  />
                </InputGroupText>
              </div>

            </Col>
          </Row>
          <Row className='mb-2'>
            <Col>
              <Button onClick={buscarDireccion}>Buscar en el mapa</Button>
            </Col>

            {/* <Button onClick={capturarMapa}>Descargar</Button> */}

          </Row>
          <Row className='px-4 '>

            {/* <div id="map-container"> */}
            {lat && lng && (

              <LoadScript
                googleMapsApiKey="AIzaSyCq_n_0fxE6-qDWeqeFZBfahzXrGDy0U_Q"
              >
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  onClick={handleMapClick}
                  center={{
                    lat: lat,
                    lng: lng
                  }}
                  zoom={zoom}
                >
                  {/* {direccion && ( */}
                  <Marker position={{ lat: lat, lng: lng }} />
                  {/* )} */}
                </GoogleMap>
              </LoadScript>
            )}
            {/* </div> */}
          </Row>
          <div className='d-flex mt-2'>
            <Button className='me-1' color='primary' type='submit'>
              Enviar
            </Button>
            <Button outline color='secondary' type='reset' onClick={handleReset}>
              Reset
            </Button>
          </div>
        </Form>
      </CardBody>
      {/* {mapaCapturado && <img src={mapaCapturado} alt="Mapa capturado" />} */}

    </Card>
  )
}

export default DireccionForm