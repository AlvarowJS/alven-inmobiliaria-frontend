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
        // let id = localStorage.getItem('id');

        // if (id == null) {
        //     alvenApi.post(URL, null, {
        //         headers: {
        //             'Authorization': 'Bearer ' + token
        //         }
        //     })
        //         .then(res => {
        //             localStorage.setItem('id', res.data.id)
        //             navigate('/registrar-propiedad')

        //         })
        //         .catch(err => { console.log(err) })
        // } else {
        //     console.log('entro al else')
        //     navigate('/registrar-propiedad')
        // }
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
        // const idUser = localStorage?.getItem('id');        
        // window.open(`https://backend.alven-inmobiliaria.com.mx/api/v1/exportar-propiedad/${id},${idUser}`)
    }

    const handleFilter = e => {
        setSearchValue(e.target.value)
    }

    // useEffect(() => {
    //     alvenApi.get(URL, {
    //         headers: {
    //             'Authorization': 'Bearer ' + token
    //         }
    //     })
    //         .then(res => {

    //             // setFilter(res.data.filter(e =>
    //             //     e.publicidad?.encabezado?.toLowerCase().indexOf(searchValue?.toLowerCase()) !== -1
    //             // ));


    //         })
    //         .catch(err => { console.log(err) })
    // }, [searchValue])
    useEffect(() => {
        setFilter(getData?.filter(e =>
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
            minWidth: '25px',
            maxWidth: '75px',
            selector: row => row?.general?.numero_ofna == undefined ? 'Sin asignar' : row?.general?.numero_ofna
        },
        {
            sortable: true,
            name: 'Dirección',
            minWidth: '250px',
            // selector: row => row.direccion_id
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
        // {
        //     sortable: true,
        //     name: 'SubTipo',
        //     minWidth: '250px',
        //     selector: row => row?.general?.tipo_propiedad == undefined ? 'Sin asignar' : row?.general?.tipo_propiedad
        // },
        {
            sortable: true,
            name: 'Precio',
            // minWidth: '120px',
            selector: row => row?.publicidad?.precio_venta,
            cell: row => {
                return (
                    <>
                        {row?.publicidad?.precio_venta == undefined ? '00.00' : '$ ' + row?.publicidad?.precio_venta.toLocaleString()}
                    </>
                )
            }
            // selector: row => row?.publicidad?.precio_venta == undefined ? '00.00' : '$ ' + row?.publicidad?.precio_venta.toLocaleString()
        },
        {
            sortable: true,
            name: 'Días',
            minWidth: '10px',
            maxWidth: '80px',
            selector: row => row?.general?.fecha_alta,
            cell: row => {
                return (
                    <>
                        {Math.abs(Math.ceil((new Date(row?.general?.fecha_alta) - new Date()) / (1000 * 60 * 60 * 24)))}
                    </>
                )
            }
            // selector: row => row?.publicidad?.precio_venta == undefined ? '00.00' : '$ ' + row?.publicidad?.precio_venta.toLocaleString()
        },
        {
            sortable: true,
            name: 'Sub Tipo',
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
            name: 'Tipo\nOperación',
            // minWidth: '250px',
            selector: row => row?.general?.tipo_operacion == undefined ? 'Sin asignar' : row?.general?.tipo_operacion
        },
        {
            sortable: true,
            name: 'Status',
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
            name: 'Asignación',
            // minWidth: '250px',
            selector: row => row?.cliente?.asesor?.nombre,
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
            minWidth: '250px',
            cell: row => {
                return (
                    <div className='d-flex flex-column'>
                        {
                            row?.publicidad?.ligas?.map(liga => (
                                // <div className='d-flex flex-column'>
                                <>
                                    <div className='d-flex gap-1'>
                                        {liga.red_social} :
                                        {/* <Globe onClick={() => abrirEnlace(liga?.enlace)} style={{ cursor: "pointer" }} /> */}
                                        <img src={iconWorld} width={30} height={30} onClick={() => abrirEnlace(liga?.enlace)} style={{ cursor: "pointer" }}/>

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
        //     sortable: true,
        //     name: 'Estado',
        //     minWidth: '100px',
        //     cell: row => {
        //         return (
        //             <>
        //                 {
        //                     row?.estado == true ?

        //                         <Badge color='light-success'>
        //                             Terminado
        //                         </Badge>
        //                         :
        //                         <Badge color='light-danger'>
        //                             En Borrador
        //                         </Badge>

        //                 }
        //             </>
        //         )
        //     }            
        // },
        {
            name: 'Acciones',
            sortable: true,
            allowOverflow: true,
            cell: row => {
                return (
                    <div className='local_buttons'>

                        {
                            role === "1" ?
                                <button className='btn btn-warning my-1' onClick={() => updateInventarioById(row?.id)}>
                                    <Edit />
                                </button> : null
                        }

                        {/* <button className='btn btn-danger mb-1' onClick={() => deleteInventarioById(row?.id)}>
                            <Trash />
                        </button> */}
                        {
                            role === "2" ?
                                // <button className='btn btn-warning mb-1 mt-1' onClick={() => updateInventarioById(row?.id)}>
                                <button className='btn btn-warning mb-1 mt-1' onClick={() => verInventarioExterno(row?.id)}>
                                    <Eye />
                                </button>
                                : null
                        }
                        <button className='btn btn-success mb-1' onClick={() => descargarPdf(row?.id)}>
                            <FileText />
                        </button>

                    </div >
                )
            }
        }
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
                    // if (totalData > (allData).slice(0, rowsPerPage).length) {

                    //     let count = Math.ceil(totalData / rowsPerPage)
                    //     let cantidadPag = Math.ceil(totalData / count)
                    //     let limite = cantidadPag * currentPage
                    //     let inicio = cantidadPag * (currentPage - 1)

                    //     let data = (allData).slice(inicio, limite)
                    //     setGetData(data)
                    // } else {
                    //     setGetData((allData).slice(0, rowsPerPage))
                    // }

                })
                .catch(err => { console.log(err) })
        } else {
            let totalData = estadoPropiedad.length
            let allData = estadoPropiedad
            setGetTotalData(totalData)
            setGetData(allData)
            // if (totalData > (allData).slice(0, rowsPerPage).length) {

            //     let count = Math.ceil(totalData / rowsPerPage)
            //     let cantidadPag = Math.ceil(totalData / count)
            //     let limite = cantidadPag * currentPage
            //     let inicio = cantidadPag * (currentPage - 1)

            //     let data = (allData).slice(inicio, limite)
            //     setGetData(data)
            // } else {
            //     setGetData((allData).slice(0, rowsPerPage))
            // }
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


    // const CustomPagination = () => {

    //     const count = Math.ceil(getTotalData / rowsPerPage)

    //     return (
    //         <ReactPaginate
    //             previousLabel={''}
    //             nextLabel={''}
    //             breakLabel='...'
    //             pageCount={Math.ceil(count) || 1}
    //             marginPagesDisplayed={2}
    //             pageRangeDisplayed={2}
    //             activeClassName='active'
    //             forcePage={currentPage !== 0 ? currentPage - 1 : 0}
    //             onPageChange={page => handlePagination(page)}
    //             pageClassName='page-item'
    //             breakClassName='page-item'
    //             nextLinkClassName='page-link'
    //             pageLinkClassName='page-link'
    //             breakLinkClassName='page-link'
    //             previousLinkClassName='page-link'
    //             nextClassName='page-item next-item'
    //             previousClassName='page-item prev-item'
    //             containerClassName={
    //                 'pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1'
    //             }
    //         />
    //     )
    // }
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
                            {/* <div className='d-flex align-items-center'>
                                <Label for='sort-select'>Mostrar</Label>
                                <Input
                                    className='dataTable-select'
                                    type='select'
                                    id='sort-select'
                                    value={rowsPerPage}
                                    onChange={e => handlePerPage(e)}
                                >

                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={25}>25</option>
                                    <option value={50}>50</option>
                                    <option value={75}>75</option>
                                    <option value={100}>100</option>
                                </Input>
                                <Label for='sort-select'>entradas</Label>
                            </div> */}
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
                    <div className='react-dataTable'>
                        <DataTable
                            noHeader
                            // pagination
                            // paginationServer
                            className='react-dataTable'
                            columns={serverSideColumns}
                            sortIcon={<ChevronDown size={10} />}
                            // paginationComponent={CustomPagination}
                            // data={getData}
                            data={searchValue ? filter : getData}
                        />
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