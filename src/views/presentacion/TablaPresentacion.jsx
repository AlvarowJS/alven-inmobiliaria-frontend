import React from 'react'
import DataTable from 'react-data-table-component'
import { Aperture, Edit, Trash } from 'react-feather'
import { Card } from 'reactstrap'

const TablaPresentacion = ({
  updatePresentacionById, deletePresentacionId, toggleGenerador, data, modalGenerador,filteredData,searchValue
}) => {
console.log(filteredData, "das")
  // columnas
  const columns = [
    {
      sortable: true,
      name: 'ID',
      minWidth: '25px',
      selector: row => row?.id
    },
    {
      sortable: true,
      name: 'Nombre',
      minWidth: '25px',
      selector: row => row?.nombre
    },
    {
      sortable: true,
      name: 'Imagen',
      minWidth: '300px',
      selector: row => {
        return (
          <>
            <img src={`https://backend.alven-inmobiliaria.com.mx/storage/fotoPresentacion/${row?.foto}`} alt={row?.nombre} width="300px" height="200px" loading='lazy' />
          </>
        )
      }
    },
    {
      name: 'Acciones',
      sortable: true,
      allowOverflow: true,
      cell: row => {
        return (
          <div className='d-flex gap-1'>
            <button className='btn btn-warning my-1' onClick={() => updatePresentacionById(row?.id)}>
              <Edit />
            </button>
            <button className='btn btn-danger my-1' onClick={() => deletePresentacionId(row?.id)}>
              <Trash />
            </button>
            <button className='btn btn-success my-1' onClick={() => toggleGenerador(row?.foto)}>
              <Aperture />
            </button>
          </div>
        )
      }
    }
  ]
  return (
    <Card className='mt-2'>
      
      <DataTable
        noHeader
        // pagination
        className='react-datatable'
        columns={columns}      
        data={filteredData}

      />
    </Card>
  )
}

export default TablaPresentacion