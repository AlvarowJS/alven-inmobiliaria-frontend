import { useEffect, useRef, useState } from 'react'

// ** Custom Components
import Wizard from '@components/wizard'
import { AlignLeft, ArrowLeft, Camera, Clipboard, Columns, Eye, MapPin, User } from 'react-feather'
import { CustomLabel } from './registro-pasos/CustomLabel';
import ClienteForm from './registro-pasos/ClienteForm'
import Fotos from './registro-pasos/Fotos'
import PublicidadForm from './registro-pasos/PublicidadForm'
import CaracteristicasForm from './registro-pasos/CaracteristicasForm'
import BasicosForm from './registro-pasos/BasicosForm'
import GeneralForm from './registro-pasos/GeneralForm'
import DireccionForm from './registro-pasos/DireccionForm'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { Card, Label, Input } from 'reactstrap'
const URL_ESTADO = 'https://backend.alven-inmobiliaria.com.mx/api/v1/estado-propiedad'
const URL_PROPIEDAD = 'https://backend.alven-inmobiliaria.com.mx/api/v1/propiedades'
const URL_ASESOR = 'https://backend.alven-inmobiliaria.com.mx/api/v1/asesor'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

const RegistrarPropiedad = () => {
    const token = localStorage.getItem('token');
    const [objectGlobal, setObjectGlobal] = useState()
    const [borrador, setBorrador] = useState()
    const [asesorObj, setAsesorObj] = useState()

    const id = useParams();

    // Listar Asesores
    useEffect(() => {

        axios.get(`${URL_ASESOR}`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(res => {
                setAsesorObj(res?.data)                
            })
            .catch(err => null)
    }, [])
    // LLenara datos 
    useEffect(() => {

        axios.get(`${URL_PROPIEDAD}/${id?.id}`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(res => {
                setObjectGlobal(res?.data)
                setBorrador(res?.data?.estado)
            })
            .catch(err => null)
    }, [])

    // Cambiar estado
    const cambiarEstado = e => {
        let estadoActual = e.target.checked                
        let actualizarEstado = {}
        actualizarEstado.estado = estadoActual
        axios.put(`${URL_ESTADO}/${id?.id}`, actualizarEstado, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(res => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Estado actualizado',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            .catch(err => null)
    }

    // ** Ref
    const ref = useRef(null)

    // ** State
    const [stepper, setStepper] = useState(null)
    const steps = [
        {
            id: 'propietario',
            title: 'Propietario',
            icon: <User size={18} />,
            content: <ClienteForm stepper={stepper} borrador={borrador} objectGlobal={objectGlobal} idPropiedad={id.id} type='wizard-modern' />
        },
        {
            id: 'direccion',
            title: 'Dirección',
            icon: <MapPin size={18} />,
            content: <DireccionForm stepper={stepper} borrador={borrador} objectGlobal={objectGlobal} idPropiedad={id.id} type='wizard-modern' />
        },
        {
            id: 'general',
            title: 'General',
            icon: <AlignLeft size={18} />,
            content: <GeneralForm stepper={stepper} asesorObj={asesorObj} borrador={borrador} objectGlobal={objectGlobal} idPropiedad={id.id} type='wizard-modern' />
        },
        {
            id: 'basico',
            title: 'Básicos',
            icon: <Clipboard size={18} />,
            content: <BasicosForm stepper={stepper} objectGlobal={objectGlobal} idPropiedad={id.id} type='wizard-modern' />
        },
        {
            id: 'caracteristica',
            title: 'Características',
            icon: <Columns size={18} />,
            content: <CaracteristicasForm stepper={stepper} objectGlobal={objectGlobal} idPropiedad={id.id} type='wizard-modern' />
        },
        {
            id: 'fotos',
            title: 'Fotos',
            icon: <Camera size={18} />,
            content: <Fotos stepper={stepper} idPropiedad={id.id} type='wizard-modern' />
        },
        {
            id: 'publicidad',
            title: 'Publicidad',
            icon: <Eye size={18} />,
            content: <PublicidadForm stepper={stepper} objectGlobal={objectGlobal} idPropiedad={id.id} type='wizard-modern' />
        }

    ]
    return (
        <>
            <Link to="/inventario" >
                <ArrowLeft /> Volver
            </Link>
            <div className='modern-horizontal-wizard mt-2'>
                <div className='d-flex flex-row gap-1'>
                    <Label for='switch-primary' className='form-check-label mb-50'>
                        En Borrador
                    </Label>
                    <div className='form-switch form-check-success'>
                        <Input type='switch' onClick={cambiarEstado} id='icon-success' name='icon-success' defaultChecked={borrador}/>
                        <CustomLabel htmlFor='icon-success' />
                    </div>
                    <Label for='switch-primary' className='form-check-label mb-50'>
                        Terminado
                    </Label>
                </div>
                {
                    objectGlobal ?
                        <Wizard
                            type='modern-horizontal'
                            ref={ref}
                            steps={steps}
                            options={{
                                linear: false
                            }}
                            instance={el => setStepper(el)}
                        />
                        : null
                }

            </div>

        </>
    )
}

export default RegistrarPropiedad