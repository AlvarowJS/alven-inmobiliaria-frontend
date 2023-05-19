import React, { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import { Button, Col, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import Select from "react-select";
import axios from 'axios';
import './deudor.css'

const FormDeudor = ({ modal, toggle, setModal, handleSubmit,
    submit, control, register, reset, errors, setEstadoUbi, estadoUbi,
    setDepartamentoVal, departamentoVal, setDistritoVal, distritoVal, setProvinciaVal, provinciaVal
}) => {
    const [departamento, setDepartamento] = useState("");
    const [provincia, setProvincia] = useState("");
    const [distrito, setDistrito] = useState("");
    const [departamentos, setDepartamentos] = useState([]);
    const [provincias, setProvincias] = useState([]);
    const [distritos, setDistritos] = useState([]);

    useEffect(() => {
        
        axios.get("https://notify.grupogenera.pe/api/v1/departamentos/")
            .then(response => {
                setDepartamentos(response?.data);
                
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        console.log(distritoVal," ",departamento, " ",departamentoVal, "?")
        if (departamentoVal != null || distritoVal != null) {
            console.log("seactivo departamento")

            axios.get(`https://notify.grupogenera.pe/api/v1/provincias/${departamentoVal}`)
                .then(response => {
                    console.log(response.data, "as")
                    setDepartamento("");
                    setProvincias(response?.data);
                })
                .catch(error => {
                    console.error(error);
                });
        }
        if (departamento) {
            console.log("seactivo tambien depa")
            axios.get(`https://notify.grupogenera.pe/api/v1/provincias/${departamento}`)
                .then(response => {
                    console.log(response.data, "as")
                    setProvincias(response?.data);
                    setDepartamentoVal("")
                    setProvinciaVal("")
                    setDistritoVal("")
                    setDistrito("");
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [departamento, departamentoVal, estadoUbi]);

    useEffect(() => {
        if (provinciaVal != null) {
            console.log("seactivo distrito")
            axios.get(`https://notify.grupogenera.pe/api/v1/distritos/${provinciaVal}`)
                .then(response => {
                    setDistritos(response?.data);
                    
                })
                .catch(error => {
                    console.error(error);
                });
        }
        if (provincia) {
            console.log("seactivo tambien distrito")
            axios.get(`https://notify.grupogenera.pe/api/v1/distritos/${provincia}`)
                .then(response => {
                    setDistritos(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [provincia, provinciaVal, estadoUbi]);

    const departamentoOptions = departamentos.map(departamento => ({
        label: departamento.name,
        value: departamento.name
    }));

    const provinciaOptions = provincias.map(provincia => ({
        label: provincia.name,
        value: provincia.name
    }));

    const distritoOptions = distritos.map(distrito => ({
        label: distrito.name,
        value: distrito.name
    }));

    return (
        <div>
            <Modal isOpen={modal} toggle={toggle} className='modal-dialog modal-lg'>
                <ModalHeader toggle={toggle}>

                </ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit(submit)}>
                        <div className='text-center mb-2'>
                            <h1 className='mb-1'>Editar Datos del Cliente</h1>
                        </div>
                        <Row className='mb-2'>
                            <Col>
                                <Label className='form-label'> RUC</Label>
                                <Controller
                                    defaultValue=''
                                    control={control}
                                    id='ruc'
                                    name='ruc'
                                    render={({ field }) => (
                                        <Input
                                            type='text'
                                            placeholder='INGRESE N. DE RUC'
                                            invalid={errors.ruc && true}
                                            {...field}
                                        />
                                    )}
                                />

                            </Col>
                            <Col>
                                <Label className='form-label'> Razón Social</Label>
                                <Controller
                                    defaultValue=''
                                    control={control}
                                    id='razon_social'
                                    name='razon_social'
                                    render={({ field }) => (
                                        <Input
                                            type='text'
                                            placeholder='INGRESE RAZON SOCIAL'
                                            invalid={errors.razon_social && true}
                                            {...field}
                                        />
                                    )}
                                />
                            </Col>
                        </Row>
                        <Row className='mb-2'>
                            <Col>
                                <Label className='form-label'> DIRECCIÓN</Label>
                                <Controller
                                    defaultValue=''
                                    control={control}
                                    id='direccion'
                                    name='direccion'
                                    render={({ field }) => (
                                        <Input
                                            type='text'
                                            placeholder='INGRESE LA DIRECCIÓN'
                                            invalid={errors.direccion && true}
                                            {...field}
                                        />
                                    )}
                                />

                            </Col>
                        </Row>
                        <Row className='mb-2'>
                            <Col>
                                <div className="custom-select">

                                    <select
                                        name="departamento"
                                        // value={departamentoVal == [] ? departamento : departamentoVal }
                                        {...register("departamento_nombre")}
                                        onChange={event => {
                                            setDepartamento(event.target.value);
                                            setDepartamentoVal(null);
                                            setProvinciaVal(null);
                                            setDistritoVal(null);
                                            setProvincias([]);
                                            setDistritos([]);
                                        }}
                                    >
                                        <option value="">Seleccione un departamento</option>
                                        {departamentoOptions?.map(departamento => (
                                            <option key={departamento?.value} value={departamento?.value}>{departamento?.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </Col>
                            <Col>
                                <div className="custom-select">
                                    <select
                                        name="provincia"
                                        
                                        value={provinciaVal == null ? provincia : provinciaVal}                                        
                                        {...register("provincia_nombre")}
                                        onChange={event => {
                                            setProvincia(event.target.value);
                                            setProvinciaVal(null);
                                            setDistritoVal(null);
                                            setDistritos([]);
                                        }}
                                    >
                                        <option value="">Seleccione una provincia</option>
                                        {provinciaOptions?.map(provincia => (
                                            <option key={provincia?.value} value={provincia?.value}>{provincia?.label}</option>
                                        ))}
                                    </select>
                                </div>

                            </Col>
                            <Col>
                                <div className="custom-select">
                                    <select
                                        name="distrito"                                        
                                        value={distritoVal == null ? distrito : distritoVal}
                                        {...register("distrito_nombre")}
                                        onChange={event => {
                                            setDistrito(event.target.value)
                                            setDistritoVal(null);
                                        }}
                                    >
                                        <option value="">Seleccione un distrito</option>
                                        {distritoOptions?.map(distrito => (
                                            <option key={distrito?.value} value={distrito?.value}>{distrito?.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </Col>                    
                        </Row>
                        <div className='d-flex justify-content-end'>
                            <div className='local_butons_form d-flex justify-content-end'>
                                <Button color="secondary" onClick={toggle}>
                                    Cancelar
                                </Button>
                                <Button className='mx-2' color="info">
                                    Grabar
                                </Button>
                            </div>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
        </div >
    )
}

export default FormDeudor