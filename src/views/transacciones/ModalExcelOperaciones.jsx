import React from 'react'
import Select from 'react-select'
import { useForm, Controller } from 'react-hook-form'
import { selectThemeColors } from '@utils'
import { Button, Input, Label, Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Card, Col, Row, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, InputGroupText } from 'reactstrap'
import { DownloadCloud } from 'react-feather'
const ModalExcelOperaciones = ({ toggleExcel, modalExcel, setModalExcel, arrayID }) => {
    console.log(arrayID, "asd")
    const { handleSubmit, control, register, reset, setError, formState: { errors } } = useForm()
    const excelOptions = [
        { value: '1', label: 'A - Factoring Proveedor' },
        { value: '2', label: 'A - Confirming Deudor' },
        { value: '3', label: 'B - Pre-Factoring - Proveedor' },
        { value: '4', label: 'B - Descuento OC - Proveedor' },
        { value: '5', label: 'B - Factoring Proveedor' }
    ]
    const submit = data => {
        let tipoExcel = data.tipo_excel.value
        let argIds = []
        let consulta
        for (let i = 0; i < arrayID.length; i++) {
            argIds.push(arrayID[i].id)
        }
        console.log(argIds)
        consulta = argIds.join(',')
        console.log(tipoExcel, "as")
        switch (tipoExcel) {
            case '1':
                console.log("se descargo")
                window.open(`https://notify.grupogenera.pe/api/v1/decargar-excel/${consulta}`, "_blank");
                break;
            case '2':
                window.open(`https://notify.grupogenera.pe/api/v1/decargar-confirming-excel/${consulta}`, "_blank");
                break;
            case '3':
                window.open(`https://notify.grupogenera.pe/api/v1/decargar-pre-factoring-b-excel/${consulta}`, "_blank");
                break;
            case '4':
                window.open(`https://notify.grupogenera.pe/api/v1/decargar-descuento-oc-b-excel/${consulta}`, "_blank");
                break;
            case '5':
                window.open(`https://notify.grupogenera.pe/api/v1/decargar-factoring-b-excel/${consulta}`, "_blank");
                break;
            default:
                break;
        }

    }

    return (
        <div>
            <Modal isOpen={modalExcel} toggle={toggleExcel} className='modal-dialog modal-lg' >
                <ModalHeader toggle={toggleExcel}></ModalHeader>
                <ModalBody>
                    <h3>Escoja el formato de excel a descargar</h3>
                    <form onSubmit={handleSubmit(submit)}>
                        <Label className='form-label'>Selecciona una opción y luego descargue el excel</Label>
                        <Controller
                            control={control}
                            id='tipo_excel'
                            name='tipo_excel'
                            render={({ field }) => (
                                <Select
                                    theme={selectThemeColors}
                                    className='react-select'
                                    classNamePrefix='select'
                                    defaultValue={excelOptions[0]}
                                    options={excelOptions}
                                    isClearable={false}
                                    invalid={errors.excelOptions && true}
                                    {...field}
                                />
                            )}
                        />
                        <div className="d-flex flex-row-reverse">

                            <Button className='mt-2 mb-2' color='success'><DownloadCloud />Descargar Excel</Button>
                            <Button className='mt-2 mb-2 mx-2' color="secondary" onClick={toggleExcel}>
                                Cancelar
                            </Button>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default ModalExcelOperaciones