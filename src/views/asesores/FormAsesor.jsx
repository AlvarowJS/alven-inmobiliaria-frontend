import React, { useState } from 'react'
import { Button, Col, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'

const FormAsesor = ({
    modal, toggle, submit, control, register, 
    reset, errors, handleSubmit, fotoAsesor, setFotoAsesor,
    selectedImage, setSelectedImage
}) => {
    // const [selectedImage, setSelectedImage] = useState(null);

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
        setFotoAsesor(file)
    };


    return (
        <Modal isOpen={modal} toggle={toggle} size='lg'>
            <ModalHeader toggle={toggle}>
                Registrar Asesor
            </ModalHeader>
            <ModalBody>
                <form onSubmit={handleSubmit(submit)}>
                    <div className="form-group mx-4 mb-2">
                        <label htmlFor="nombre">Nombre</label>
                        <input type="text" className="form-control" id="nombre"
                            {...register('nombre')}
                            placeholder="Alvaro..."
                            required
                        />
                    </div>

                    <div className="form-group mx-4 mb-2">
                        <label htmlFor="apellidos">Apellidos</label>
                        <input type="text" className="form-control" id="apellidos"
                            {...register('apellidos')}
                            placeholder="Perez..."
                            required
                        />
                    </div>

                    <div className="form-group mx-4 mb-2">
                        <label htmlFor="rfc">RFC</label>
                        <input type="text" className="form-control" id="rfc"
                            {...register('rfc')}
                            placeholder="7468737"
                            required
                        />
                    </div>

                    <div className="form-group mx-4 mb-2">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" id="email"
                            {...register('email')}
                            placeholder="ejemplo@gmail.com"
                            required
                        />
                    </div>

                    <div className="form-group mx-4 mb-2">
                        <label htmlFor="celular">Celular</label>
                        <input type="text" className="form-control" id="celular"
                            {...register('celular')}
                            placeholder="99 442409"
                            required
                        />
                    </div>
                    <div className="form-group mx-4 mb-2">
                        <label htmlFor="direccion">Dirección </label>
                        <input type="text" className="form-control" id="direccion"
                            {...register('direccion')}
                            placeholder="99 442409"
                            required
                        />
                    </div>

                    <div className="form-group mx-4 mb-2">
                        <label htmlFor="contacto_emergencia">Contacto de emergencia</label>
                        <input type="text" className="form-control" id="contacto_emergencia"
                            {...register('contacto_emergencia')}
                            placeholder="99 442409"
                            required
                        />
                    </div>

                    <div className="form-group mx-4 mb-2">
                        <label htmlFor="foto">Foto de asesor</label>
                        <input type="file" className="form-control" id="foto"
                            {...register('foto')}
                            onChange={handleFileChange}
                            required
                        />
                    </div>
                    {/* Mostrar la imagen seleccionada */}
                    <div className="form-group mx-4 mb-2">
                        {
                            fotoAsesor != null && selectedImage == null ?
                            <img src={`https://backend.alven-inmobiliaria.com.mx/storage/asesor/${fotoAsesor}`} alt="" style={{ width: "100%", height: "auto" }} />:null
                        }
                        {selectedImage && (
                            <div className="preview-image">
                                <img src={selectedImage} alt="Preview" style={{ width: "100%", height: "auto" }}/>
                            </div>
                        )}
                    </div>
                    <button className='btn btn-primary mx-4 mb-2'>Enviar</button>
                    {/* <button className='btn btn-secondary' onClick={toggle}>Cancelar</button> */}
                </form>
            </ModalBody>

        </Modal>
    )
}

export default FormAsesor