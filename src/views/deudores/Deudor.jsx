import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { Button, Input } from "reactstrap";
import "./deudor.scss";
import { Edit } from "react-feather";
import { useForm, Controller } from 'react-hook-form'
import FormDeudor from "./FormDeudor";
const URLGET = 'https://notify.grupogenera.pe/api/v1/deudor/'
const URLUPDATE = 'https://notify.grupogenera.pe/api/v1/deudor_update'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
export default function Deudor() {
   const [deudores, setDeudores] = useState([]);
   const [data, setData] = useState([]);
   const [filter, setFilterText] = useState("");

   const [modal, setModal] = useState(false)
   const [objUpdate, setObjUpdate] = useState()
   const [distritoVal, setDistritoVal] = useState()
   const [provinciaVal, setProvinciaVal] = useState()
   const [departamentoVal, setDepartamentoVal] = useState()
   const [estadoUbi, setEstadoUbi] = useState(false)
   const [estadoLista, setEstadoLista] = useState(false)

   const { handleSubmit, control, register, reset, setError, formState: { errors } } = useForm()
   const defaultValues = {
      ruc: '',
      direccion: '',
      razon_social: '',
      departamento_nombre: '',
      provincia_nombre: '',
      distrito_nombre: ''
   }

   console.log(distritoVal, provinciaVal, departamentoVal)
   const submit = data => {

      updateDeudorById(objUpdate.id, data)
      toggle.call()
   }
   const updateDeudorById = (id, data) => {
      axios.put(`${URLUPDATE}/${id}`, data)
         .then(res => {
            setEstadoLista(true)
            MySwal.fire({
               icon: 'success',
               title: 'Actualizado!',
               text: 'El registro a sido actualizado.',
               customClass: {
                  confirmButton: 'btn btn-success'
               }
            })
         })
         .catch(err => console.log(err))
   }


   const toggle = () => {
      setModal(!modal)
      if (objUpdate !== undefined) {
         reset(defaultValues)
      }
   };
   const updateCliente = (id) => {
      setEstadoUbi(true)
      setEstadoLista(false)

      toggle.call()
      axios.get(`${URLGET}${id}`)
         .then(res => {
            setObjUpdate(res?.data)
            const object = res?.data
            reset(object)
            setDepartamentoVal(object?.departamento_nombre)
            setDistritoVal(object?.distrito_nombre)
            setProvinciaVal(object?.provincia_nombre)
            console.log(res)
         })
         .catch(err => console.log(err))

   }

   function filterText(array) {
      return array.filter(
         (deudor) =>
            deudor.ruc.includes(filter) ||
            deudor.razon_social.toLowerCase().includes(filter) ||
            deudor.direccion.toLowerCase().includes(filter) ||
            deudor.ubigeo.distrito.toLowerCase().includes(filter) ||
            deudor.ubigeo.provincia.toLowerCase().includes(filter)
      );
   }

   useEffect(() => {
      async function fetchData() {
         await axios.get("https://notify.grupogenera.pe/api/v1/deudor").then((res) => {
            setDeudores(res.data.data), setData(res.data.data);
         });
      }
      fetchData();
   }, [estadoLista]);

   useEffect(() => {
      let result = filterText(deudores);
      setData(result);
   }, [filter]);

   const columns = [
      {
         name: "#",
         id: 1,
         selector: (row, index) => index,
         center: true,
         style: {
            fontWeight: "800",
            color: "blue",
         },
      },
      {
         name: "RUC",
         selector: (row) => row.ruc,
         sortable: true,
      },
      {
         name: "Razon Social",
         selector: (row) => row.razon_social,
         sortable: true,
         minWidth: "20rem",
      },
      {
         name: "Direccion",
         selector: (row) =>
            row.direccion == null || row.direccion == "" ? <span>No se encontro direccion</span> : row.direccion,
         sortable: true,
         wrap: true,
      },
      {
         name: "Distrito",
         selector: (row) => row.ubigeo.distrito_nombre,
         sortable: true,
         center: true,
      },
      {
         name: "Provincia",
         sortable: true,
         center: true,
         selector: (row) => row.ubigeo.provincia_nombre,
      },
      {
         name: "Acciones",
         sortable: true,
         center: true,
         cell: (row) => (
            <div className='local_buttons'>
               <Button color='btn-flat-warning' className='btn-flat-warning' onClick={() => updateCliente(row?.id)}>
                  <Edit />
               </Button>
            </div>
         ),
         center: true,
      }
   ];

   const customStyles = {
      rows: {
         style: {
            minHeight: "72px", // override the row height
         },
      },
      headCells: {
         style: {
            paddingLeft: "8px", // override the cell padding for head cells
            paddingRight: "8px",
            fontSize: "1rem",
            textTransform: "Uppercase",
            backgroundColor: "#EFDECD",
         },
      },
      cells: {
         style: {
            paddingLeft: "8px", // override the cell padding for data cells
            paddingRight: "8px",
         },
      },
   };

   return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
         Deudor
         <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
            Buscar:
            <Input
               style={{ width: "20rem", marginLeft: ".5rem" }}
               bsSize="sm"
               placeholder="Ingrese la informacion"
               onChange={(e) => setFilterText(e.target.value)}
            />
         </div>
         <FormDeudor
            toggle={toggle}
            modal={modal}
            setModal={setModal}
            handleSubmit={handleSubmit}
            submit={submit}
            control={control}
            register={register}
            reset={reset}
            errors={errors}
            setDepartamentoVal={setDepartamentoVal}
            departamentoVal={departamentoVal}
            setDistritoVal={setDistritoVal}
            distritoVal={distritoVal}
            setProvinciaVal={setProvinciaVal}
            provinciaVal={provinciaVal}
            setEstadoUbi={setEstadoUbi}
            estadoUbi={estadoUbi}
         />
         <DataTable columns={columns} data={data} customStyles={customStyles} pagintaion defaultSortFieldId={1} />
      </div>
   );
}
