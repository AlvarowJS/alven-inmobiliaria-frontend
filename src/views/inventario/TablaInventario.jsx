import React, { Fragment, useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useDispatch } from 'react-redux'
import { Card, CardHeader, CardTitle, Input, Label, Row, Col, Button, Badge } from 'reactstrap'
import DataTable from 'react-data-table-component'
import { ChevronDown, Delete, Edit, ExternalLink, Eye, File, FileText, Globe, Trash } from 'react-feather'
import { useNavigate } from 'react-router-dom'
const URL = '/v1/propiedades'
const URL_FILTER = '/v1/propiedad-filtrado'
const URL_ASESOR = '/v1/asesor'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import DescargarReporte from './DescargarReporte'
import ExportarPdfAsesor from './ExportarPdfAsesor'
import alvenApi from '../../api/alvenApi'
import iconWorld from '../../assets/images/logo/iconWorld.png'
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
const MySwal = withReactContent(Swal)

const TablaInventario = () => {
    const token = localStorage?.getItem('token');
    const role = localStorage?.getItem('role');
    const navigate = useNavigate()
    const [estado, setEstado] = useState(false)
    const [modal, setModal] = useState(false)
    const [modalPdf, setModalPdf] = useState(false)
    const [idPropiedad, setIdPropiedad] = useState()
    const [idAsesor, setIdAsesor] = useState()
    // const [currentPage, setCurrentPage] = useState(1)
    // const [rowsPerPage, setRowsPerPage] = useState(5)
    const [searchValue, setSearchValue] = useState('')
    const [filter, setFilter] = useState()
    const [getData, setGetData] = useState()
    const [getTotalData, setGetTotalData] = useState()
    const [store, setStore] = useState()
    const [estadoPropiedad, setEstadoPropiedad] = useState()
    const [nombreEstado, setNombreEstado] = useState('Todos')
    const [contador, setContador] = useState()
    const [asesorObj, setAsesorObj] = useState()

    const dispatch = useDispatch()

    const customStyles = {
        rows: {
            style: {
                minHeight: 'auto', // Esto permite que las filas se ajusten al contenido
                '&:not(:last-of-type)': {
                    borderBottomStyle: 'solid',
                    borderBottomWidth: '1px',
                },
            }
        },
        cells: {
            style: {
                paddingTop: '8px',
                paddingBottom: '8px',
                whiteSpace: 'normal', // Permite el salto de línea
                wordBreak: 'break-word', // Rompe palabras largas
                overflow: 'visible', // Asegura que el contenido no se corte
                textOverflow: 'unset', // Evita el recorte de texto
            }
        }
    };

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

    const CambiarEstado = (status) => {
        setNombreEstado(status)
        let objStatus = {}
        objStatus.estado = status
        alvenApi.post(URL_FILTER, objStatus, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(res => {
                setEstadoPropiedad(res?.data)
                setContador(res?.data.length)
            })
            .catch(err => { console.log(err) })
    }


    const updateInventarioById = (id) => {
        navigate(`/registrar-propiedad/${id}`)
    }

    const verInventarioById = (id) => {
        navigate(`/ver-propiedad/${id}`)
    }

    const abrirEnlace = (enlace) => {
        window.open(enlace, '_blank')
    }

    const deleteInventarioById = (id) => {

        setEstado(false)
        return MySwal.fire({
            title: '¿Estás seguro de eliminar?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si',
            customClass: {
                confirmButton: 'btn btn-primary',
                cancelButton: 'btn btn-outline-danger ms-1'
            },
            buttonsStyling: false
        }).then(function (result) {
            if (result.value) {
                alvenApi.delete(`${URL}/${id}`, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
                    .then(res => {
                        setEstado(true)
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Inventario Eliminado',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    })
                    .catch(err => {
                        console.log(err)
                        Swal.fire({
                            position: 'center',
                            icon: 'warning',
                            title: 'Porfavor eliminar primero las imagenes',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    })
            }
        })
    }

    const registrarPropiedad = () => {

        alvenApi.post(URL, null, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(res => {
                setIdPropiedad(res?.data?.id)
                let idProp = res?.data?.id
                navigate(`/registrar-propiedad/${idProp}`)

            })
            .catch(err => { console.log(err) })
    }

    const descargarReporte = () => {
        setModal(!modal)
    }


    const verInventarioExterno = (id) => {
        window.open(`https://alven-inmobiliaria.com.mx/#/propiedad-info/${id}`, '_blank')
    }

    const descargarPdf = (id) => {
        setModalPdf(!modalPdf)
        setIdAsesor(id)
    }

    const handleFilter = e => {
        setSearchValue(e.target.value)
    }

    useEffect(() => {
        setFilter(getData?.filter(e =>
            (e.general?.numero_ofna && e.general?.numero_ofna?.toLowerCase().indexOf(searchValue?.toLowerCase()) !== -1) ||
            (e.publicidad?.encabezado && e.publicidad?.encabezado?.toLowerCase().indexOf(searchValue?.toLowerCase()) !== -1) ||
            (e.cliente?.asesor?.nombre && e.cliente?.asesor?.nombre.toLowerCase().indexOf(searchValue?.toLowerCase()) !== -1) ||
            (e.cliente?.asesor?.apellidos && e.cliente?.asesor?.apellidos.toLowerCase().indexOf(searchValue?.toLowerCase()) !== -1) ||
            (
                (e.direccion?.calle ?? '') +
                ' ' +
                (e.direccion?.numero ?? '') +
                ' ' +
                (e.direccion?.colonia ?? '') +
                ' ' +
                (e.direccion?.municipio ?? '') +
                ' ' +
                (e.direccion?.estado ?? '') +
                ' ' +
                (e.direccion?.pais ?? '')
            ).toLowerCase().indexOf(searchValue?.toLowerCase()) !== -1)
        );
        setContador((getData?.filter(e =>
            e.publicidad?.encabezado &&
            e.publicidad?.encabezado?.toLowerCase().indexOf(searchValue?.toLowerCase()) !== -1
        ))?.length);

    }, [searchValue])
    // Columnas
    const serverSideColumns = [
        {
            sortable: true,
            name: 'ID',
            minWidth: '80px',
            maxWidth: '90px',
            selector: row => row?.general?.numero_ofna == undefined ? 'Sin asignar' : row?.general?.numero_ofna,
            cell: row => {
                return (
                    <>
                        <div className='d-flex flex-column'>
                            <div>
                                {row?.general?.numero_ofna == undefined ? 'Sin asignar' : row?.general?.numero_ofna}
                            </div>


                            <div className='d-flex gap-1 flex-column'>
                                {
                                    role === "1" ?
                                        <button className='btn btn-warning btn-sm' onClick={() => updateInventarioById(row?.id)}>
                                            <Edit className='text-secondary' />
                                        </button> : null
                                }

                                {
                                    role === "2" ?
                                        // <button className='btn btn-warning mb-1 mt-1' onClick={() => updateInventarioById(row?.id)}>
                                        <button className='btn btn-warning btn-sm' onClick={() => verInventarioExterno(row?.id)}>
                                            <Eye className='text-secondary' />
                                        </button>
                                        : null
                                }
                                <button className='btn btn-success btn-sm' onClick={() => descargarPdf(row?.id)}>
                                    <FileText
                                        className='text-secondary'
                                    />
                                </button>
                            </div>
                        </div>
                    </>
                )
            }
        },
        {
            sortable: true,
            name: 'Dirección',
            minWidth: '250px',
            wrap: true,
            grow: 1,
            selector: row => row?.direccion?.calle,
            cell: row => {
                return (
                    <>

                        {
                            (row?.direccion?.calle ?? '') +
                            ' - ' +
                            (row?.direccion?.numero ?? '') +
                            ' - ' +
                            (row?.direccion?.colonia ?? '') +
                            ' - ' +
                            (row?.direccion?.municipio ?? '') +
                            ' - ' +
                            (row?.direccion?.estado ?? '') +
                            ' - ' +
                            (row?.direccion?.pais ?? '')

                        }
                        <br />
                        {
                            'Cod Postal: ' + (row?.direccion?.codigo_postal ?? '')
                        }
                    </>
                )
            }
        },

        {
            sortable: true,
            name: (
                <div style={{ whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>
                    Precio
                </div>
            ),
            minWidth: '130px',
            maxWidth: '190px',
            selector: row => row?.publicidad?.precio_venta,
            cell: row => {
                return (
                    <>
                        {row?.publicidad?.precio_venta == undefined ? '00.00' : '$ ' + row?.publicidad?.precio_venta.toLocaleString()}
                    </>
                )
            }

        },
        {
            sortable: true,
            name: (
                <div style={{ whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>
                    Días
                </div>
            ),
            minWidth: '80px',
            maxWidth: '100px',
            selector: row => row?.general?.fecha_alta,
            cell: row => {
                return (
                    <>
                        {Math.abs(Math.ceil((new Date(row?.general?.fecha_alta) - new Date()) / (1000 * 60 * 60 * 24)))}
                    </>
                )
            }
        },
        {
            sortable: true,
            name: (
                <div style={{ whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>
                    Sub Tipo
                </div>
            ),
            // minWidth: '250px',
            selector: row => row?.general?.sub_tipo_propiedad == undefined ? 'Sin asignar' : row?.general?.sub_tipo_propiedad,
            cell: row => {
                return (
                    <>
                        {
                            row?.general?.sub_tipo_propiedad
                        }
                    </>
                )
            }

        },
        {
            sortable: true,
            name: (
                <div style={{ whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>
                    Tipo Operación
                </div>
            ),
            minWidth: '120px',
            maxWidth: '140px',
            selector: row => row?.general?.tipo_operacion == undefined ? 'Sin asignar' : row?.general?.tipo_operacion
        },
        {
            sortable: true,
            name: (
                <div style={{ whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>
                    Status
                </div>
            ),
            minWidth: '120px',
            maxWidth: '140px',
            selector: row => row?.publicidad?.estado == undefined ? 'Sin asignar' : row?.publicidad?.estado,
            cell: row => {
                return (
                    <>
                        {
                            row?.publicidad?.estado == undefined ? 'Sin asignar' : row?.publicidad?.estado
                        }
                    </>
                )
            }
        },
        {
            sortable: true,
            name: (
                <div style={{ whiteSpace: 'normal', wordBreak: 'break-word', textAlign: 'center' }}>
                    Asignación
                </div>
            ),
            minWidth: '120px',
            maxWidth: '140px',
            // minWidth: '250px',
            selector: row => row?.cliente?.asesor?.nombre,
            wrap: true,
            cell: row => {
                return (
                    <>
                        Asesor: {
                            row?.cliente?.asesor?.nombre == undefined ? 'Sin asignar' : row?.cliente?.asesor?.nombre
                                + ' ' +
                                row?.cliente?.asesor?.apellidos
                        }
                        <br />
                        <br />
                        Dueño: {
                            row?.cliente?.nombre == undefined ? 'Sin asignar' : row?.cliente?.nombre
                                + ' ' +
                                row?.cliente?.apellido_materno
                                + ' ' +
                                row?.cliente?.apellido_paterno
                        }
                    </>
                )
            }
        },
        {
            sortable: true,
            name: 'Foto',
            minWidth: '140px',
            cell: row => {
                return (
                    <>

                        <img src={`https://backend.alven-inmobiliaria.com.mx/storage/${row?.id}/${row?.foto[0]?.fotos}`} alt="" style={{ width: "120px", height: "80px" }} loading='lazy' />
                    </>
                )
            }
        },
        {
            sortable: false,
            name: 'Ligas',
            minWidth: '180px',
            maxWidth: '240px',
            grow: 1,
            wrap: true,
            cell: row => {
                return (
                    <div className='d-flex flex-column'>
                        {
                            row?.publicidad?.ligas?.map(liga => (
                                // <div className='d-flex flex-column'>
                                <>
                                    <div className='d-flex flex-column'>
                                        <p>
                                            {liga.red_social} :
                                        </p>
                                        {/* <Globe onClick={() => abrirEnlace(liga?.enlace)} style={{ cursor: "pointer" }} /> */}
                                        <img src={iconWorld} width={30} height={30} onClick={() => abrirEnlace(liga?.enlace)} style={{ cursor: "pointer" }} />

                                    </div>
                                    <br />
                                </>
                                // </div>

                            ))
                        }
                    </div>
                )
            }
        },

        // {
        //     name: 'Acciones',
        //     sortable: true,
        //     wrap: true,
        //     allowOverflow: true,
        //     cell: row => {
        //         return (
        //             <div className='local_buttons'>

        //                 {
        //                     role === "1" ?
        //                         <button className='btn btn-warning my-1' onClick={() => updateInventarioById(row?.id)}>
        //                             <Edit className='text-secondary' />
        //                         </button> : null
        //                 }
        //                 {
        //                     role === "2" ?
        //                         // <button className='btn btn-warning mb-1 mt-1' onClick={() => updateInventarioById(row?.id)}>
        //                         <button className='btn btn-warning mb-1 mt-1' onClick={() => verInventarioExterno(row?.id)}>
        //                             <Eye className='text-secondary' />
        //                         </button>
        //                         : null
        //                 }
        //                 <button className='btn btn-success mb-1' onClick={() => descargarPdf(row?.id)}>
        //                     <FileText
        //                         className='text-secondary'
        //                     />
        //                 </button>

        //             </div >
        //         )
        //     }
        // }
    ]
    useEffect(() => {

        if (nombreEstado == 'Todos' || estadoPropiedad == undefined) {

            alvenApi.get(URL, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
                .then(res => {

                    // Total de registros
                    let totalData = res?.data.length
                    setContador(totalData)
                    let allData = res?.data
                    setGetTotalData(totalData)
                    setGetData(allData)


                })
                .catch(err => { console.log(err) })
        } else {
            let totalData = estadoPropiedad.length
            let allData = estadoPropiedad
            setGetTotalData(totalData)
            setGetData(allData)

        }

    }, [
        // rowsPerPage, 
        // currentPage, 
        estado, estadoPropiedad])

    const handlePerPage = e => {
        setRowsPerPage(parseInt(e.target.value))
    }

    const handlePagination = page => {
        setCurrentPage(page.selected + 1)
    }

    return (
        <>
            <Fragment>
                {
                    role === "1" ?
                        <Card className='px-4 py-1'>
                            <Row>
                                <Col lg='6' className='d-flex align-items-center px-0 px-lg-1'>

                                    <Button className='mt-sm-0 mt-1' color='primary' onClick={registrarPropiedad}>
                                        Agregar Propiedad
                                    </Button>


                                </Col>
                                <Col lg='6' className='d-flex align-items-center px-0 px-lg-1'>
                                    {
                                        role == "1" ?
                                            <Button className='mt-sm-0 mt-1 btn-success' onClick={descargarReporte}>
                                                Descargar Reporte
                                                <FileText />
                                            </Button> : null
                                    }



                                </Col>
                            </Row>
                        </Card>
                        :
                        null
                }
                <Card className='p-4'>
                    <Row>
                        <Col lg='6' className='d-flex align-items-center px-0 px-lg-1'>
                            <Button
                                className={'mt-sm-0 mt-1 mx-2'}
                                color={nombreEstado == 'Todos' ? 'primary' : 'secondary'}
                                onClick={() => CambiarEstado('Todos')}
                            >
                                Todos
                            </Button>
                            <Button
                                className='mt-sm-0 mt-1 mx-2'
                                color={nombreEstado == 'En Promocion' ? 'primary' : 'secondary'}
                                style={{ whiteSpace: 'nowrap' }}
                                onClick={() => CambiarEstado('En Promocion')}>
                                En promoción
                            </Button>
                            <Button
                                className='mt-sm-0 mt-1 mx-2'
                                color={nombreEstado == 'Con Manifestación' ? 'primary' : 'secondary'}
                                style={{ whiteSpace: 'nowrap' }}
                                onClick={() => CambiarEstado('Con Manifestación')}>
                                Con Manifestación
                            </Button>
                            <Button
                                className='mt-sm-0 mt-1 mx-2'
                                color={nombreEstado == 'Cancelada' ? 'primary' : 'secondary'}
                                onClick={() => CambiarEstado('Cancelada')}>
                                Cancelada
                            </Button>
                            <Button
                                className='mt-sm-0 mt-1 mx-2'
                                color={nombreEstado == 'Suspendida' ? 'primary' : 'secondary'}
                                onClick={() => CambiarEstado('Suspendida')}>
                                Suspendida
                            </Button>
                            <Button
                                className='mt-sm-0 mt-1 mx-2'
                                color={nombreEstado == 'Cerrada' ? 'primary' : 'secondary'}
                                onClick={() => CambiarEstado('Cerrada')}>
                                Cerrada
                            </Button>
                        </Col>
                    </Row>
                </Card>

                <Card>
                    <CardHeader className='border-bottom'>
                        <CardTitle tag='h4'>Inventario</CardTitle>
                        <h4>Total: {contador}</h4>
                    </CardHeader>
                    <Row className='mx-0 mt-1 mb-50'>
                        <Col sm='6'>

                        </Col>
                        <Col className='d-flex align-items-center justify-content-sm-end mt-sm-0 mt-1' sm='6'>
                            <Label className='me-1' for='search-input'>
                                Buscar
                            </Label>
                            <Input
                                className='dataTable-filter'
                                type='text'
                                bsSize='sm'
                                id='search-input'
                                // value={searchValue}
                                onChange={handleFilter}
                            />
                        </Col>
                    </Row>

                    <div className='invoice-list-wrapper'>
                        <Card>
                            <div className='invoice-list-dataTable react-dataTable'>
                                <DataTable
                                    noHeader
                                    className='react-dataTable'
                                    columns={serverSideColumns}
                                    sortIcon={<ChevronDown size={10} />}
                                    data={searchValue ? filter : getData}
                                    customStyles={customStyles}
                                    dense
                                    fixedHeader={false}
                                    responsive
                                    persistTableHead
                                />
                            </div>
                        </Card>
                    </div>

                </Card>

                <DescargarReporte
                    descargarReporte={descargarReporte}
                    modal={modal}
                    setModal={setModal}
                    asesorObj={asesorObj}
                />

                <ExportarPdfAsesor
                    descargarPdf={descargarPdf}
                    idAsesor={idAsesor}
                    modalPdf={modalPdf}
                    setModalPdf={setModalPdf}

                />
            </Fragment>
        </>
    )
}

export default TablaInventario