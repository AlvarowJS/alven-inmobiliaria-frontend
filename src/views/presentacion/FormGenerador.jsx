import React, { useRef } from 'react'
import { Button, Col, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import CartaPresentacion from './CartaPresentacion'
import html2canvas from 'html2canvas';

const FormGenerador = ({
    modalGenerador, toggleGenerador, setFrase, frase, imagenFondo, telefono, nombrecompleto
}) => {
    const cartaRef = useRef(null);
    const handleInputChange = (e) => {
        setFrase(e.target.value)
    }

    const generarImagen = (e) => {
        e.preventDefault();
        html2canvas(cartaRef.current).then((canvas) => {
          const link = document.createElement("a");
          link.download = "carta_presentacion.png";
          link.href = canvas.toDataURL();
          link.click();
        });
      };
    return (
        <Modal isOpen={modalGenerador} toggle={toggleGenerador} size='lg'>
            <ModalHeader toggle={toggleGenerador}>
                Generar Presentación
            </ModalHeader>
            <ModalBody>
                <form onSubmit={generarImagen}>
                    <label htmlFor="nombre">Escribe una Frase</label>
                    <input
                        type="text"
                        className="form-control"
                        id="frase"
                        value={frase}
                        onChange={handleInputChange}
                        placeholder="Ingrese un frase que ira en el cuerpo de la presentación"
                        required
                    />
                    <button type='button' className='btn btn-success my-2' onClick={generarImagen}>
                        Generar Imagen
                    </button>
                </form>

            </ModalBody>
            {/* <div style={{ display: 'none' }}> */}
            <div>
                <CartaPresentacion
                    ref={cartaRef}
                    frase={frase}
                    imagenFondo={imagenFondo}
                    telefono={telefono}
                    nombrecompleto={nombrecompleto}
                />
            </div>
            {/* </div> */}
        </Modal >
    )
}

export default FormGenerador