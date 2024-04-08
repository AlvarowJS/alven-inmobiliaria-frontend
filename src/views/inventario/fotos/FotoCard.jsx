import React from 'react'
import { Trash } from 'react-feather'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import alvenApi from '../../../api/alvenApi';
const URL_FOTOS = '/v1/fotos'
const FotoCard = ({ foto, setEstado }) => {

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({
        id: foto.id
    })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }
    const token = localStorage.getItem('token');
    const role = localStorage?.getItem('role');
    let img = `https://backend.alven-inmobiliaria.com.mx/storage/${foto?.propiedad_id}/${foto?.fotos}`
    const deleteFotoById = (id) => {

        alvenApi.delete(`${URL_FOTOS}/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(res => {
                setEstado(false)

            })
            .catch(err => null)

    }

    return (

        <div
            style={style}
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            className='d-flex justify-content-around border my-2'
        >

            <img src={img} style={{ width: '15%' }} alt="" />
            {
                role == "1" ?
                    <button className='align-self-center btn btn-danger mb-1 my-5'
                        onPointerUp={() => deleteFotoById(foto.id)}
                    >
                        <Trash />
                    </button>
                    : null
            }
        </div>

    )
}

export default FotoCard