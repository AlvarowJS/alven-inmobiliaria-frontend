import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useEffect, useState } from "react";
import { DownloadCloud, Search } from "react-feather";
import "flatpickr/dist/themes/airbnb.css";
import Flatpickr from "react-flatpickr";
import {
   Button,
   Modal,
   ModalHeader,
   ModalBody,
   ModalFooter,
   Input,
   Table,
   Pagination,
   PaginationItem,
   PaginationLink,
} from "reactstrap";
import { left } from "@popperjs/core";
import ModalExcelOperaciones from "./ModalExcelOperaciones";
const URL = 'https://notify.grupogenera.pe/api/v1/decargar-excel/'
export default function FilterSection({ transUnicos, getProv, getMon, getOpe, getDate, getMonedaActive, args, data }) {
   const [prov, setProv] = useState(null);
   const [provFilter, setProvFilter] = useState("");
   const [arrayID, setArrayID] = useState([])
   const [modalExcel, setModalExcel] = useState(false)

   const toggleExcel = () => {
      setModalExcel(!modalExcel)
   };

   useEffect(() => {
      setArrayID(data)

   }, [data])

   const descargarExcel = ([arrayID]) => {
      // toggleExcel.call()
      let argIds = []
      for (let i = 0; i < arrayID.length; i++) {
         argIds.push(arrayID[i].id)
      }
      console.log(argIds)
      let consulta = argIds.join(',')
      window.open(`${URL}${consulta}`, "_blank");
   }

   const pageSize = 5;
   const itemsPerPage = transUnicos.filter(
      (trans) =>
         trans.ope_cliente.razon_social.toLowerCase().includes(provFilter) || trans.ope_cliente.ruc.includes(provFilter)
   ).length;
   const pageCount = Math.ceil(itemsPerPage / pageSize);
   const [currentPage, setCurrentPage] = useState(0);

   function changePage(e, index) {
      e.preventDefault();
      setCurrentPage(index);
   }

   const optionMultiSelect = [
      { value: 0, label: "Pendiente" },
      { value: 1, label: "Abonar" },
   ];
   const animatedComponents = makeAnimated();

   const style = {
      input: (styles) => ({ ...styles, width: "20rem" }),
      control: (styles) => ({ ...styles, backgroundColor: "white" }),
      multiValue: (styles, { data }) => {
         return {
            ...styles,
            backgroundColor: "#E97451",
         };
      },
      option: (styles, { data, isDisabled, isFocused, isSelected }) => {
         return {
            ...styles,
            backgroundColor: isSelected ? "#E3DAC9" : undefined,
            color: isDisabled ? "#ccc" : isSelected ? "black" : data.color,
         };
      },
      multiValueLabel: (styles, { data }) => ({
         ...styles,
         color: "black",
      }),
   };

   const [modal, setModal] = useState(false);
   const toggle = () => setModal(!modal);
   const notToggle = () => setModal(modal);
   return (
      <div
         style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            backgroundColor: "white",
            borderRadius: "0.5rem",
            padding: "10px",
         }}
      >
         <ModalExcelOperaciones
            toggleExcel={toggleExcel}
            modalExcel={modalExcel}
            setModalExcel={setModalExcel}
            arrayID={arrayID}
         />
         <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
               <div className="input-group" style={{ display: "flex", alignItems: "center" }}>
                  <label htmlFor="proveedor">Proveedor:</label>
                  <Input
                     style={{ marginLeft: ".5rem", height: "2.5rem", borderRadius: ".25rem", minWidth: "28rem" }}
                     placeholder="Selecciona proveedor"
                     value={prov}
                     disabled
                  />
                  <div style={{ marginLeft: ".5rem" }}>
                     <div style={{ display: "flex", gap: ".5rem" }}>
                        <Button
                           onClick={toggle}
                           style={{ height: "2.5rem", display: "flex", justifyContent: "center", alignItems: "center" }}
                        >
                           <Search size={20} />
                        </Button>
                        <Button
                           onClick={() => {
                              getProv("");
                              setProv("");
                           }}
                           color="danger"
                           style={{ height: "2.5rem", display: "flex", justifyContent: "center", alignItems: "center" }}
                        >
                           Limpiar
                        </Button>
                     </div>

                     <Modal isOpen={modal} toggle={toggle} {...args} style={{ width: "40rem" }}>
                        <ModalHeader toggle={toggle}>Proveedores</ModalHeader>
                        <ModalBody style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                           {transUnicos.length === 0 ? (
                              <p>Loading Data...</p>
                           ) : (
                              <div
                                 style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}
                              >
                                 <Input
                                    style={{ minWidth: "20rem", height: "2.5rem" }}
                                    placeholder="Selecciona proveedor"
                                    onChange={(e) => setProvFilter(e.target.value)}
                                 />
                                 <Table hover>
                                    <thead>
                                       <tr>
                                          <th>#</th>
                                          <th>Proveedor</th>
                                          <th>RUC</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                       {transUnicos
                                          .filter(
                                             (trans) =>
                                                trans.ope_cliente.razon_social.toLowerCase().includes(provFilter) ||
                                                trans.ope_cliente.ruc.includes(provFilter)
                                          )
                                          .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
                                          .map((trans, index) => (
                                             <tr
                                                key={index}
                                                onClick={() => {
                                                   setProv(
                                                      `${trans.ope_cliente.razon_social} - ${trans.ope_cliente.ruc} `
                                                   );
                                                   toggle();
                                                   getProv(trans.ope_cliente.ruc);
                                                }}
                                             >
                                                <th scope="row">{trans.id}</th>
                                                <td>{trans.ope_cliente.razon_social}</td>
                                                <td>{trans.ope_cliente.ruc}</td>
                                             </tr>
                                          ))}
                                    </tbody>
                                 </Table>
                                 <div>
                                    <Pagination>
                                       <PaginationItem disabled={currentPage <= 0}>
                                          <PaginationLink
                                             onClick={(e) => changePage(e, currentPage - 1)}
                                             previous
                                             href="#"
                                          />
                                       </PaginationItem>
                                       {[...Array(pageCount)].map((page, i) => (
                                          <PaginationItem key={i} active={i === currentPage}>
                                             <PaginationLink onClick={(e) => changePage(e, i)} href="#">
                                                {i + 1}
                                             </PaginationLink>
                                          </PaginationItem>
                                       ))}

                                       <PaginationItem disabled={currentPage >= pageCount - 1}>
                                          <PaginationLink
                                             onClick={(e) => changePage(e, currentPage + 1)}
                                             next
                                             href="#"
                                          />
                                       </PaginationItem>
                                    </Pagination>
                                 </div>
                              </div>
                           )}
                        </ModalBody>
                        <ModalFooter>
                           <Button color="secondary" onClick={toggle}>
                              Cancel
                           </Button>
                        </ModalFooter>
                     </Modal>
                  </div>
               </div>
            </div>
            <div>
               <span style={{ marginRight: ".5rem" }}>Fecha:</span>
               <Flatpickr
                  data-enable-time
                  options={{
                     mode: "range",
                     dateFormat: "Y-m-d",
                  }}
                  style={{
                     width: "20rem",
                     height: "2.73rem",
                     border: "1px solid #00000040",
                     borderRadius: ".25rem",
                     paddingLeft: "1rem",
                  }}
                  placeholder="Seleccione la fecha"
                  onChange={(e) => {
                     getDate(
                        e[0] == undefined ? null : new Date(e[0]).toLocaleDateString("sv"),
                        e[1] == undefined ? null : new Date(e[1]).toLocaleDateString("sv")
                     );
                  }}
               />
            </div>
            <div
               style={{
                  marginLeft: "10rem"
               }}
            >
               <Button
                  onClick={toggleExcel}
                  // onClick={() => descargarExcel([arrayID])}
                  color='success'
               >
                  <DownloadCloud />
                  Descargar Excel
               </Button>
            </div>
         </div>

         <div style={{ display: "flex", gap: "4rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
               <span style={{ marginRight: ".5rem" }}>Moneda:</span>
               PEN
               <label
                  htmlFor="moneda"
                  className="form-check form-switch"
                  style={{ display: "flex", alignItems: "center" }}
               >
                  <input
                     type="checkbox"
                     role="switch"
                     className="form-check-input"
                     defaultChecked={false}
                     onChange={(e) => {
                        getMon(e.target.checked == true ? "USD" : "MN"), getMonedaActive(e.target.checked);
                     }}
                     style={{ backgroundColor: "#E25822" }}
                  />
                  <span style={{ marginLeft: ".5rem" }}>USD</span>
               </label>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
               <label style={{ marginRight: ".5rem" }}>Estatus OPE:</label>
               <Select
                  options={optionMultiSelect}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  isMulti
                  styles={style}
                  components={animatedComponents}
                  onChange={(e) => getOpe(e.map((e) => e.value))}
                  defaultValue={optionMultiSelect}
               />
            </div>
         </div>
      </div>
   );
}
