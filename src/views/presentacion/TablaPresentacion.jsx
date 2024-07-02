import React from 'react'
import DataTable from 'react-data-table-component'
import { Edit, Trash } from 'react-feather'
import { Card } from 'reactstrap'

const TablaPresentacion = ({
  updatePresentacionById, deletePresentacionId, estado, data
}) => {
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
            <img src={`http://127.0.0.1:8000/storage/fotoPresentacion/${row?.foto}`} alt={row?.nombre} width="300px" height="200px"/>
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
          <div className='my-1'>
            <button className='btn btn-warning' onClick={() => updatePresentacionById(row?.id)}>
              <Edit />
            </button>
            <button className='btn btn-danger mx-1' onClick={() => deletePresentacionId(row?.id)}>
              <Trash />
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
        // data={search ? filter : data}
        data={data}

      />
    </Card>
  )
}

export default TablaPresentacion