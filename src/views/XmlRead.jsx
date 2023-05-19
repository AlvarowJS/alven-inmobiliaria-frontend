import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ChevronDown,MoreVertical, Edit, FileText, Archive, Trash } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Controller, useForm } from 'react-hook-form'
import { Button, Input, Label,Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import xmlApi from '../api/xmlApi'

// const URL = 'https://notify.grupogenera.pe/api/v1/readxml/'
const URL = 'https://notify.grupogenera.pe/api/v1/readxml/'
const XmlRead = () => {
  const { handleSubmit, control, register, reset, formState: { errors } } = useForm()
  const [xml, setXml] = useState()

  // useEffect(() => {

  //   xmlApi.post({ 
  //     carpeta: carpeta
  //   })
  //     .then(resp => {
  //       setXml(resp.data)
  //     })
  // }, [])
  const readXml = newData => {
    axios.post(URL, newData)
      .then(res => setXml(res.data))
      .catch(err => console.log(err))
  }
  const submit = data => {
    readXml(data)
  }
  const cols = [
    {
      name: 'Ruc Cliente',
      selector: 'providerRuc',
      sortable: true
    },
    {
      name: 'Razon social proveedor',
      selector: 'businessName',
      sortable: true
    },
    {
      name: 'Codigo Ubigeo',
      selector: 'providerUbigeoCode',
      sortable: true
    },
    {
      name: 'Razon social',
      selector: 'businessName',
      sortable: true
    },
    {
      name: 'Razon social deudor',
      selector: 'businessName',
      sortable: true
    },
    {
      name: 'Tipo Ope',
      selector: 'invoiceType',
      sortable: true
    },
    {
      name: 'Fecha emision',
      selector: 'emissionDate',
      sortable: true
    },
    {
      name: 'N Documento',
      selector: `numerodcto`,
      
      sortable: true
    },
    {
      name: 'Fecha vencimiento',
      selector: 'expirationDate',
      sortable: true
    },
    {
      name: 'DT/RT',
      selector: 'porcentaje_detraccion',
      sortable: true
    },
    {
      name: 'MO',
      selector: 'mo',
      sortable: true
    },
    {
      name: 'Monto total',
      selector: 'monto_total',
      sortable: true
    },
    {
      name: 'TC',
      selector: 'tasa',
      sortable: true
    },
    {
      name: 'Dias de adelanto',
      selector: 'dias_adelanto',
      sortable: true
    },
    {
      name: 'Monto total neto',
      selector: 'monto_total_neto',
      sortable: true
    },
    {
      name: 'Actions',
      allowOverflow: true,
      cell: () => {
        return (
          <div className='d-flex'>
            <Button className='' color='primary'>Enviar</Button>
            {/* <UncontrolledDropdown>
           
              <DropdownMenu end>
                <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
                  <FileText size={15} />
                  <span className='align-middle ms-50'>Details</span>
                </DropdownItem>
               
              </DropdownMenu>
            </UncontrolledDropdown> */}
            {/* <Edit size={15} /> */}
          </div>
        )
      }
    }
  ]
  
  return (
    <div>
      <form onSubmit={handleSubmit(submit)}>
        <h3>CONSULTAR XML</h3>
        <div className='mb-1' xl='4' md='6' sm='12'>
          <Label className='form-label' for='carpeta'>Directorio a consultar</Label>
          <Controller
            defaultValue=''
            control={control}
            id='carpeta'
            name='carpeta'
            render={({ field }) => (
              <Input
                placeholder='Ingrese el nombre del directorio'
                invalid={errors.carpeta && true}
                {...field}
              />
            )}
          />
        </div>

        <Button className='mb-2' color='primary'>Enviar</Button>
      </form>

      <div className='react-dataTable'>
        {xml ?
          <DataTable
            noHeader
            pagination
            data={xml}
            columns={cols}
            className='react-dataTable'
            sortIcon={<ChevronDown size={10} />}
            paginationRowsPerPageOptions={[10, 25, 50, 100]}
          />
          :
          null
        }
      </div>
    </div>
  )
}

export default XmlRead