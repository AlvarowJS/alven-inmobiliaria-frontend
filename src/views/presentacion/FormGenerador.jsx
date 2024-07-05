import React, { useRef } from 'react'
import { Button, Col, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import CartaPresentacion from './CartaPresentacion'
import html2canvas from 'html2canvas';
import alvenApi from '../../api/alvenApi';
const URL = "https://backend.alven-inmobiliaria.com.mx/api/v1/foto-generador"

const FormGenerador = ({
    modalGenerador, toggleGenerador, setFrase, frase, imagenFondo, telefono, nombrecompleto
}) => {
    const cartaRef = useRef(null);
    const handleInputChange = (e) => {
        setFrase(e.target.value)
    }
    const generarNuevaImagen = (e) => {
        e.preventDefault();
        window.open(`${URL}?frase=${frase}&imagen=${imagenFondo}&nombre=${nombrecompleto}&telefono=${telefono}`)

        // alvenApi.get(`${URL}?frase=${frase}&imagen=${imagenFondo}&nombre=${nombrecompleto}&telefono=${telefono}`)
    }
    // const generarImagen = async (e) => {
    //     e.preventDefault();
    //     toggleGenerador();
    //     if (cartaRef.current) {
    //         html2canvas(cartaRef.current, {
    //             letterRendering: 1,
    //             allowTaint: false,
    //             useCORS: true,
    //             logging: true
    //         }).then(canvas => {
    //             const dataUrl = canvas.toDataURL('image/png');
    //             const link = document.createElement('a');
    //             link.href = dataUrl;
    //             link.download = 'carta-presentacion.png';
    //             link.click();
    //         }).catch(error => {
    //             console.error("Error generando la imagen:", error);
    //         });
    //     }
    // }


    return (
        <Modal isOpen={modalGenerador} toggle={toggleGenerador} size='lg'>
            <ModalHeader toggle={toggleGenerador}>
                Generar Presentación
            </ModalHeader>
            <ModalBody>
                <form onSubmit={generarNuevaImagen}>
                    <label htmlFor="nombre">Escribe una Frase</label>
                    <input
                        type="text"
                        className="form-control"
                        id="frase"
                        value={frase}
                        maxLength="144"
                        onChange={handleInputChange}
                        placeholder="Ingrese un frase que ira en el cuerpo de la presentación"
                        required
                    />
                    <button type='button' className='btn btn-success my-2' onClick={generarNuevaImagen}>
                        Generar Imagen
                    </button>
                </form>

            </ModalBody>
            {/* <div style={{ display: 'none' }}> */}
            {/* <div>
                <CartaPresentacion
                    ref={cartaRef}
                    frase={frase}
                    imagenFondo={imagenFondo}
                    telefono={telefono}
                    nombrecompleto={nombrecompleto}
                />
            </div> */}
            {/* </div> */}
        </Modal >
    )
}

export default FormGenerador