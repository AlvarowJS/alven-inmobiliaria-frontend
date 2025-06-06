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
import { Card, Label, Input } from 'reactstrap'
const URL_ESTADO = '/v1/estado-propiedad'
const URL_PROPIEDAD = '/v1/propiedades'
const URL_ASESOR = '/v1/asesor'
const URL_ID = '/v1/general-id'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import alvenApi from '../../api/alvenApi';
const MySwal = withReactContent(Swal)

const RegistrarPropiedad = () => {
    const token = localStorage.getItem('token');
    const [objectGlobal, setObjectGlobal] = useState()
    const [borrador, setBorrador] = useState()
    const [asesorObj, setAsesorObj] = useState()
    const [idGeneral, setIdGeneral] = useState()

    const id = useParams();

    // General
    useEffect(() => {
        alvenApi.get(URL_ID, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(res => {
                setIdGeneral(res.data)
            })
            .catch(err => { console.log(err) })

    }, [])
    // Listar Asesores
    useEffect(() => {

        alvenApi.get(`${URL_ASESOR}`, {
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

        alvenApi.get(`${URL_PROPIEDAD}/${id?.id}`, {
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
        alvenApi.put(`${URL_ESTADO}/${id?.id}`, actualizarEstado, {
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
            content: <ClienteForm stepper={stepper} borrador={borrador} asesorObj={asesorObj} objectGlobal={objectGlobal} idPropiedad={id.id} type='wizard-modern' />
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
            content: <GeneralForm stepper={stepper} idGeneral={idGeneral} asesorObj={asesorObj} borrador={borrador} objectGlobal={objectGlobal} idPropiedad={id.id} type='wizard-modern' />
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
            content: <PublicidadForm stepper={stepper} asesorObj={asesorObj} objectGlobal={objectGlobal} idPropiedad={id.id} type='wizard-modern' />
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
                        <Input type='switch' onClick={cambiarEstado} id='icon-success' name='icon-success' defaultChecked={borrador} />
                        <CustomLabel htmlFor='icon-success' />
                    </div>
                    <Label for='switch-primary' className='form-check-label mb-50'>
                        Terminado
                    </Label>
                </div>
                <Card className='p-2 mt-1'>
                    <div>
                        {
                            objectGlobal?.direccion ?
                                <h3>{objectGlobal?.direccion?.calle} - {objectGlobal?.direccion?.colonia} - {objectGlobal?.direccion?.numero} - {objectGlobal?.direccion?.municipio} - {objectGlobal?.direccion?.estado} </h3>
                                :
                                <h3>Sin dirección</h3>
                        }
                        
                    </div>
                </Card>
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