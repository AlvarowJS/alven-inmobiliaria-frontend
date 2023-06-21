import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useDispatch } from 'react-redux'
import { Card, CardHeader, CardTitle, Input, Label, Row, Col, Button } from 'reactstrap'
import DataTable from 'react-data-table-component'
import { ChevronDown, Delete, Edit, Trash } from 'react-feather'
import { useNavigate } from 'react-router-dom'
const URL = 'http://127.0.0.1:8000/api/v1/contacto/'

const TablaMensajes = ({ deleteMensajeById, estado }) => {
    const token = localStorage.getItem('token');

    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(3)
    const [searchValue, setSearchValue] = useState('')
    const [getData, setGetData] = useState()
    const [getTotalData, setGetTotalData] = useState()
    const [store, setStore] = useState()
    const [filter, setFilter] = useState()

    const handleFilter = e => {
        setSearchValue(e.target.value)

    }
    const serverSideColumns = [

        {
            sortable: true,
            name: 'Nombre',
            minWidth: '125px',
            // selector: row => row.nombre
            cell: row => {
                return (
                    <div className='local_buttons'>
                        {row?.nombre}

                    </div>
                )
            }
        },
        {
            sortable: true,
            name: 'Apellido',
            minWidth: '155px',
            // selector: row => row.apellido
            cell: row => {
                return (
                    <div className='local_buttons'>
                        {row?.apellido}

                    </div>
                )
            }
        },
        {
            sortable: true,
            name: 'Email',
            minWidth: '155px',
            // selector: row => row.email
            cell: row => {
                return (
                    <div className='local_buttons'>
                        {row?.email}

                    </div>
                )
            }
        },
        {
            sortable: true,
            name: 'Telefono',
            minWidth: '225px',
            // selector: row => row?.telefono
            cell: row => {
                return (
                    <div className='local_buttons'>
                        {row?.telefono}

                    </div>
                )
            }
        },
        {
            sortable: true,
            name: 'Mensaje',
            minWidth: '225px',
            cell: row => {
                return (
                    <div className='local_buttons'>
                        {row?.direccion_inmueble}

                    </div>
                )
            }
            // selector: row => row?.direccion_inmueble
        },
        {
            name: 'Acciones',
            sortable: true,
            allowOverflow: true,
            cell: row => {
                return (
                    <div className='local_buttons'>
                        <button className='btn btn-danger mb-1' onClick={() => deleteMensajeById(row?.id)}>
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
                setFilter(res.data.filter(e => e.nombre.toLowerCase().indexOf(searchValue?.toLowerCase()) !== -1))
            })
            .catch(err => { console.log(err) })
    }, [searchValue])

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
        <Fragment>

            <Card>
                <CardHeader className='border-bottom'>
                    <CardTitle tag='h4'>Administrar Clientes</CardTitle>
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
                        data={searchValue ? filter : getData}
                    />
                </div>
            </Card>
        </Fragment>
    )
}

export default TablaMensajes