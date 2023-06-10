import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useDispatch } from 'react-redux'
import { Card, CardHeader, CardTitle, Input, Label, Row, Col, Button, Badge } from 'reactstrap'
import DataTable from 'react-data-table-component'
import { ChevronDown, Delete, Edit, Trash } from 'react-feather'
import { useNavigate } from 'react-router-dom'
const URL = 'https://backend.alven-inmobiliaria.com.mx/api/v1/propiedades'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

const TablaInventario = () => {
    const token = localStorage?.getItem('token');
    const navigate = useNavigate()
    const [estado, setEstado] = useState(false)
    const [idPropiedad, setIdPropiedad] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [searchValue, setSearchValue] = useState('')
    const [filter, setFilter] = useState()
    const [getData, setGetData] = useState()
    const [getTotalData, setGetTotalData] = useState()
    const [store, setStore] = useState()
    
    const dispatch = useDispatch()

    const updateInventarioById = (id) => {
        navigate(`/registrar-propiedad/${id}`)
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
                axios.delete(`${URL}/${id}`, {
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

        axios.post(URL, null, {
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
        // console.log(id, "id ")

        // if (id == null) {
        //     console.log('entro al if')
        //     axios.post(URL, null, {
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

    const handleFilter = e => {
        setSearchValue(e.target.value)
    }

    useEffect(() => {
        axios.get(URL, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(res => {
                setFilter(res.data.filter(e => e.general?.numero_ofna.toLowerCase().indexOf(searchValue?.toLowerCase()) !== -1))
            })
            .catch(err => { console.log(err) })
    }, [searchValue])

    console.log(filter)
    // Columnas
    const serverSideColumns = [
        {
            sortable: true,
            name: 'ID',
            minWidth: '25px',
            selector: row => row?.general?.numero_ofna == undefined ? 'Sin asignar' : row?.general?.numero_ofna
        },
        {
            sortable: true,
            name: 'Direccion',
            minWidth: '250px',
            // selector: row => row.direccion_id
            cell: row => {
                return (
                    <>
                        {
                            row?.direccion?.pais == undefined ? 'Sin asignar' : row?.direccion?.pais
                                + ' ' +
                                row?.direccion?.codigo_postal
                                + ' ' +
                                row?.direccion?.estado
                        }
                    </>
                )
            }
        },
        {
            sortable: true,
            name: 'SubTipo',
            minWidth: '250px',
            selector: row => row?.general?.tipo_propiedad == undefined ? 'Sin asignar' : row?.general?.tipo_propiedad
        },
        {
            sortable: true,
            name: 'Tipo Operación',
            minWidth: '250px',
            selector: row => row?.general?.tipo_operacion == undefined ? 'Sin asignar' : row?.general?.tipo_operacion
        },
        {
            sortable: true,
            name: 'Asingación',
            minWidth: '250px',
            cell: row => {
                return (
                    <>
                        Asesor: {
                            row?.cliente?.asesor?.nombre == undefined ? 'Sin asignar' : row?.cliente?.asesor?.nombre
                                + ' ' +
                                row?.cliente?.asesor?.apellidos
                        }
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
            minWidth: '250px',
            cell: row => {
                return (
                    <>

                        <img src={`https://backend.alven-inmobiliaria.com.mx/storage/${row?.id}/${row?.foto[0]?.fotos}`} alt="" style={{ width: "120px", height: "80px" }} />
                    </>
                )
            }
        },
        {
            sortable: true,
            name: 'Precio',
            minWidth: '120px',
            selector: row => row?.publicidad?.precio_venta == undefined ? '00.00' : row?.publicidad?.precio_venta + 'MXM'
        },
        {
            sortable: true,
            name: 'Estado',
            minWidth: '100px',
            cell: row => {
                return (
                    <>
                        {
                            row?.estado == true ?

                                <Badge color='light-success'>
                                    Terminado
                                </Badge>
                                :
                                <Badge color='light-danger'>
                                    En Borrador
                                </Badge>

                        }
                    </>
                )
            }
            // selector: row => row?.estado == 'false'
        },
        {
            name: 'Acciones',
            sortable: true,
            allowOverflow: true,
            cell: row => {
                return (
                    <div className='local_buttons'>
                        <button className='btn btn-warning my-1' onClick={() => updateInventarioById(row?.id)}>
                            <Edit />
                        </button>
                        <button className='btn btn-danger mb-1' onClick={() => deleteInventarioById(row?.id)}>
                            <Trash />
                        </button>

                    </div>
                )
            }
        }
    ]

    useEffect(() => {

        axios.get(URL, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(res => {

                // Total de registros
                let totalData = res?.data.length
                setGetTotalData(totalData)

                // Con la sigueinte logica evitara errores
                if (totalData > (res?.data).slice(0, rowsPerPage).length) {

                    //Cantidad enumaraciones
                    let count = Math.ceil(totalData / rowsPerPage)
                    let cantidadPag = Math.ceil(totalData / count)
                    let limite = cantidadPag * currentPage
                    let inicio = cantidadPag * (currentPage - 1)

                    // console.log(currentPage-1, limite, "currente y limite")
                    let data = (res?.data).slice(inicio, limite)
                    setGetData(data)
                } else {
                    setGetData((res?.data).slice(0, rowsPerPage))
                }

            })
            .catch(err => { console.log(err) })
    }, [rowsPerPage, currentPage, estado])

    const handlePerPage = e => {
        setRowsPerPage(parseInt(e.target.value))
    }

    const handlePagination = page => {
        setCurrentPage(page.selected + 1)
    }


    const CustomPagination = () => {

        const count = Math.ceil(getTotalData / rowsPerPage)

        return (
            <ReactPaginate
                previousLabel={''}
                nextLabel={''}
                breakLabel='...'
                pageCount={Math.ceil(count) || 1}
                marginPagesDisplayed={2}
                pageRangeDisplayed={2}
                activeClassName='active'
                forcePage={currentPage !== 0 ? currentPage - 1 : 0}
                onPageChange={page => handlePagination(page)}
                pageClassName='page-item'
                breakClassName='page-item'
                nextLinkClassName='page-link'
                pageLinkClassName='page-link'
                breakLinkClassName='page-link'
                previousLinkClassName='page-link'
                nextClassName='page-item next-item'
                previousClassName='page-item prev-item'
                containerClassName={
                    'pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1'
                }
            />
        )
    }
    return (
        <>
            <Fragment>
                <Card className='p-4'>
                    <Row>
                        <Col lg='6' className='d-flex align-items-center px-0 px-lg-1'>
                            <Button className='mt-sm-0 mt-1' color='primary' onClick={registrarPropiedad}>
                                Agregar Propiedad
                            </Button>
                        </Col>
                    </Row>


                </Card>
                <Card>
                    <CardHeader className='border-bottom'>
                        <CardTitle tag='h4'>Inventario</CardTitle>
                    </CardHeader>
                    <Row className='mx-0 mt-1 mb-50'>
                        <Col sm='6'>
                            <div className='d-flex align-items-center'>
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
                            </div>
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
                            pagination
                            paginationServer
                            className='react-dataTable'
                            columns={serverSideColumns}
                            sortIcon={<ChevronDown size={10} />}
                            paginationComponent={CustomPagination}
                            // data={getData}
                            data={searchValue ? filter : getData}
                        />
                    </div>
                </Card>
            </Fragment>
        </>
    )
}

export default TablaInventario