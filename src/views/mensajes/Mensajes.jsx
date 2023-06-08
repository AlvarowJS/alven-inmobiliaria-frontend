import React, { Fragment, useEffect, useState } from 'react'
import { Breadcrumb, Col, Card, Row, Button } from 'reactstrap'
import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import TablaMensajes from './TablaMensajes'
const MySwal = withReactContent(Swal)
const URL = 'http://127.0.0.1:8000/api/v1/contacto'
const token = localStorage.getItem('token');
const Mensajes = () => {

  const [estado, setEstado] = useState()

  const deleteMensajeById = (id) => {
    setEstado(false)

    return MySwal.fire({
      title: '¿Estás seguro de eliminar?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    }).then(function (result) {
      if (result.value) {
        axios.delete(`${URL}/${id}`, {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        })
          .then(res => {
            setEstado(true)
          })
          .catch(err => console.log(err))
      }
    })

  }
  return (
    <Fragment>
      <Breadcrumb title='Datatables Advance' data={[{ title: 'Datatables' }, { title: 'Datatables Advance' }]} />
      <Row>
        <Col sm='12'>
          <TablaMensajes
            deleteMensajeById={deleteMensajeById}
            estado={estado}
          />
        </Col>
      </Row>

    </Fragment>
  )
}

export default Mensajes