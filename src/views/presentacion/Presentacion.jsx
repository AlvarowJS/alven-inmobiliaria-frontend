import React, { Fragment, useEffect, useState } from 'react'
import { Breadcrumb, Col, Card, Row, Button } from 'reactstrap'
import { useForm } from 'react-hook-form'
// const URL = '/v1/medios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import alvenApi from '../../api/alvenApi'
const MySwal = withReactContent(Swal)

const Presentacion = () => {
  return (
    <div>Presentacion</div>
  )
}

export default Presentacion