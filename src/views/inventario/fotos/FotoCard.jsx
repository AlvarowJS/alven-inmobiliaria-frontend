import axios from 'axios';
import React from 'react'
import { Trash } from 'react-feather'
const URL_FOTOS = 'http://127.0.0.1:8000/api/v1/fotos'
const FotoCard = ({ foto, setEstado }) => {
    const token = localStorage.getItem('token');
    let img = `http://127.0.0.1:8000/storage/${foto?.propiedad_id}/${foto?.fotos}`
    const deleteFotoById = (id) => {
        axios.delete(`${URL_FOTOS}/${id}`, {
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
        <>
            <div className='d-flex justify-content-around border my-2'>
                <img src={img} style={{ width: '50%' }} alt="" />
                <button className='align-self-center btn btn-danger mb-1 my-5' onClick={() => deleteFotoById(foto.id)}>
                    <Trash />
                </button>
            </div>
        </>
    )
}

export default FotoCard