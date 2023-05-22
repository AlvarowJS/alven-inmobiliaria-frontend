import { useRef, useState } from 'react'

// ** Custom Components
import Wizard from '@components/wizard'
import { AlignLeft, Camera, Clipboard, Columns, Eye, MapPin, User } from 'react-feather'

import ClienteForm from './registro-pasos/ClienteForm'
import Fotos from './registro-pasos/Fotos'
import PublicidadForm from './registro-pasos/PublicidadForm'
import CaracteristicasForm from './registro-pasos/CaracteristicasForm'
import BasicosForm from './registro-pasos/BasicosForm'
import GeneralForm from './registro-pasos/GeneralForm'
import DireccionForm from './registro-pasos/DireccionForm'

const RegistrarPropiedad = () => {
    // ** Ref
    const ref = useRef(null)

    // ** State
    const [stepper, setStepper] = useState(null)
    const steps = [
        {
            id: 'propietario',
            title: 'Propietario',
            // subtitle: 'Ingrese al propietario o cliente.',
            icon: <User size={18} />,
            content: <ClienteForm stepper={stepper} type='wizard-modern' />
        },
        {
            id: 'direccion',
            title: 'Direccion',
            // subtitle: 'Ingrese la direccion.',
            icon: <MapPin    size={18} />,
            content: <DireccionForm stepper={stepper} type='wizard-modern' />
        },
        {
            id: 'general',
            title: 'General',
            // subtitle: 'Ingrese datos generales de la propiedad.',
            icon: <AlignLeft size={18} />,
            content: <GeneralForm stepper={stepper} type='wizard-modern' />
        },
        {
            id: 'basico',
            title: 'Basicos',
            // subtitle: 'Ingrese datos basicos.',
            icon: <Clipboard size={18} />,
            content: <BasicosForm stepper={stepper} type='wizard-modern' />
        },
        {
            id: 'caracteristica',
            title: 'Caracteristicas',
            // subtitle: 'Ingrese caracteristicas de la propiedad.',
            icon: <Columns size={18} />,
            content: <CaracteristicasForm stepper={stepper} type='wizard-modern' />
        },
        {
            id: 'publicidad',
            title: 'Publicidad',
            // subtitle: 'Ingrese datos de publicidad.',
            icon: <Eye size={18} />,
            content: <PublicidadForm stepper={stepper} type='wizard-modern' />
        },
        {
            id: 'fotos',
            title: 'Fotos',
            // subtitle: 'Ingrese fotos de la propiedad',
            icon: <Camera size={18} />,
            content: <Fotos stepper={stepper} type='wizard-modern' />
        },

    ]
    return (
        <div className='modern-horizontal-wizard'>
            <Wizard
                type='modern-horizontal'
                ref={ref}
                steps={steps}
                options={{
                    linear: false
                }}
                instance={el => setStepper(el)}
            />
        </div>
    )
}

export default RegistrarPropiedad