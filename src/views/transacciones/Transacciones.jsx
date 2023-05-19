import React, { useEffect, useState } from "react";
import Datatable from "react-data-table-component";
import axios from "axios";
import { useNavigate, useNavigation } from 'react-router-dom';
import { Send, AlertCircle, Airplay, Edit } from "react-feather";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import FilterSection from "./FilterSection";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import GraficosKpi from "./GraficosKpi";
import { Button, Col, Row } from "reactstrap";
import Informacion from "./Informacion";
import ModalEditTransaccion from "./ModalEditTransaccion";
import { useForm } from "react-hook-form";
import "./style.css";

const Transacciones = () => {
   const navigate = useNavigate()
   const [activeRow, setActiveRow] = useState(null);
   const [loadingRow, setLoadingRow] = useState(null);

   const [transacciones, setTransacciones] = useState([]);
   const [data, setData] = useState(transacciones);
   const [prov, setProv] = useState("");
   const [mon, setMon] = useState("MN");
   const [ope, setOpe] = useState([0, 1]);
   const [startDate, setStartDate] = useState(null);
   const [endDate, setEndDate] = useState(null);
   const [transUnicos, setTransUnicos] = useState([]);
   const [montoSumado, setMontoSumado] = useState(0);
   const [estadoTrans, setEstadoTrans] = useState(false)
   const URL_SEND_INVOICE = "https://notify.grupogenera.pe/api/v1/cavali_transaccion_factura";

   const [pending, setPending] = useState(true);
   const [monedaActive, setMonedaActive] = useState(null);

   //Modal Edit Transaccion
   const [objUpdate, setObjUpdate] = useState();
   const [fechaVencimiento, setFechaVencimiento] = useState();
   const [fechaDesembol, setFechaDesembol] = useState();
   const [tipoDocumento, setTipoDocumento] = useState();
   const [tipoLegal, setTipoLegal] = useState();
   const [tipoOperacion, setTipoOperacion] = useState();
   const [neto, setNeto] = useState();
   const [montoBase, setMontoBase] = useState();
   const [retraccion, setRetraccion] = useState();
   const [porcFinan, setPorcFinan] = useState();
   const [monedaSymbol, setMonedaSymbol] = useState();
   const [factorMensual, setFactorMensual] = useState();
   const [sub_total, setSub_total] = useState();
   const [tipoCambio, setTipoCambio] = useState();
   const [edicionManual, setEdicionManual] = useState();
   const [montoTotal, setMontoTotal] = useState();
   const [fechaGenera, setFechaGenera] = useState();


   const MySwal = withReactContent(Swal);

   const rowStyle = (row) => ({
      cursor: "pointer",
      ...(activeRow === row && { backgroundColor: "#F9F9F9", pointerEvents: "none" })
   });

   const activeRowClass = (row) => (activeRow === row ? "active-row" : "");

   const [modal, setModal] = useState(false);
   const toggle = () => {
      setModal(!modal);
      if (objUpdate !== undefined) {
         reset(defaultValues);
      }
   };

   const filterProv = (array) => {
      return array.filter((item) => item.ope_cliente.ruc.includes(prov));
   };

   const filterMon = (array) => {
      return array.filter((item) => item.moneda.includes(mon));
   };

   const filterOpe = (array) => {
      if (ope.length === 0) {
         return array;
      }
      return array.filter((item) => ope.includes(item.estado));
   };

   const filterDate = (array) => {
      if (startDate !== null || endDate !== null) {
         return array.filter((item) => item.fecha_vencimiento > startDate && item.fecha_vencimiento < endDate);
      } else if (startDate === null && endDate === null) {
         return array;
      }
   };

   useEffect(() => {
      function fetchData() {
         axios.get("https://notify.grupogenera.pe/api/v1/get-all-transaccion").then((res) => {
            setTransacciones(res.data.data);
            setData(res.data.data.filter((trans) => trans.moneda == mon));
            setTransUnicos(
               res.data.data.reduce((unique, o) => {
                  if (!unique.some((obj) => obj.ope_cliente.razon_social === o.ope_cliente.razon_social)) {
                     unique.push(o);
                  }
                  return unique;
               }, [])
            );
         });
      }
      fetchData();
   }, [estadoTrans]);

   //Funcionalidad Filtro

   useEffect(() => {
      let filterData = transacciones;
      filterData = filterProv(filterData);
      filterData = filterMon(filterData);
      filterData = filterOpe(filterData);
      filterData = filterDate(filterData);
      setData(filterData);
   }, [prov, mon, ope, startDate, endDate]);

   //Funcionalidad suma de montos neto

   useEffect(() => {
      if (data.length !== 0) {
         setPending(false);
      }

      let montoSumado =
         data.length === 0
            ? "0"
            : data.reduce((acc, el) => {
               return acc + parseFloat(el.monto_neto);
            }, 0);
      setMontoSumado(montoSumado.toLocaleString("en-US"));
   }, [data]);

   function calcularDiasDePago(fechaPago) {
      const diaPago = new Date(fechaPago);
      const hoy = new Date();

      let diasRestantes = diaPago.getTime() - hoy.getTime();
      diasRestantes = Math.round(diasRestantes / (1000 * 3600 * 24));
      return diaPago.getTime() - hoy.getTime() == 0 ? "Hoy" : diasRestantes;
   }

   async function conseguirTransaccion(row) {
      setActiveRow(row);
      setLoadingRow(row);
      await axios
         .post(URL_SEND_INVOICE, {
            id: row.id,
            name: row.name_xml,
            ope_cliente_id: row.ope_cliente_id,
            ope_deudor_id: row.ope_deudor_id,
            nro_dcto: row.nro_dcto,
            monto_neto: parseFloat(row.monto_neto),
            fecha_vencimiento: row.fecha_vencimiento,
            fileXML: row.file_xml

            // ope_deudor_id: row.ope_deudor_id,
            // tipo_operacion: row.tipo_operacion,
            // tipo_legal: row.tipo_legal,
            // tipo_cambio: row.tipo_cambio,
            // tipo_documento: row.tipo_documento,
            // nro_dcto: row.nro_dcto,
            // fecha_emision: row.fecha_emision,
            // fecha_vencimiento: row.fecha_vencimiento,
            // fecha_desembolso: row.fecha_desembolso,
            // fecha_cavali: row.fecha_cavali,
            // porc_financiamiento: row.porc_financiamiento,
            // porc_retenido: row.porc_retenido,
            // factor_mensual: row.factor_mensual,
            // monto_total: row.monto_total,
            // monto_igv: row.monto_igv,
            // igv: row.igv,
            // monto_a_pagar: row.monto_a_pagar,
            // concepto: row.concepto,
            // moneda: row.moneda,
            // monto_neto: row.monto_neto,
            // dias_adelanto: row.dias_adelanto,
            // monto_base_operacion: row.monto_base_operacion,
            // monto_financiado: row.monto_financiado,
            // monto_descuento: row.monto_descuento,
            // monto_cavali: row.monto_cavali,
            // abonar_al_vencimiento: row.abonar_al_vencimiento,
            // monto_a_pagar_deudor: row.monto_a_pagar_deudor,
         })
         .then((res) => {
            setEstadoTrans(false)
            console.log(res.data);
            if (res.data == 'Se ejecuto el proceso correctamente.') {
               setEstadoTrans(true)
               MySwal.fire({
                  icon: "success",
                  text: "La informacion fue enviada con exito",
               });
            } else if (res.data == 'La factura no se encuentra en el estado requerido: Registrada o Pre-Registrada.') {
               setEstadoTrans(true)
               MySwal.fire({
                  icon: "warning",
                  text: res.data,
               });
            } else if (res.data == 'El  MONTO NETO PENDIENTE debe ser menor o igual al monto neto pendiente de pago inicial.') {
               setEstadoTrans(true)
               MySwal.fire({
                  icon: "warning",
                  text: res.data,
               });
            }

         })
         .catch((err) => {
            MySwal.fire({
               icon: "error",
               text: "Ocurrio un error al enviar la informacion",
               title: "Revise bien sus datos",
            });
            console.log(err);
         })
         .finally(() => {
            setActiveRow(null);
            setLoadingRow(null);
         });
   }

   function getProv(prov) {
      setProv(prov);
   }

   function getMon(mon) {
      setMon(mon);
   }

   function getMonedaActive(mon) {
      setMonedaActive(mon);
   }

   function getOpe(mon) {
      setOpe(mon);
   }

   function getDate(startDate, endDate) {
      setStartDate(startDate);
      setEndDate(endDate);
   }

   const getTransaccionById = (id) => {
      setEstadoTrans(false)
      navigate(`/form-transaccion/${id}`)
      // toggle.call();
      // axios
      //    .get(`https://notify.grupogenera.pe/api/v1/get-transaccion/${id}/`)
      //    .then((res) => {
      //       setObjUpdate(res?.data.data);
      //       const object = res?.data.data;
      //       reset(object);
      //       setFechaVencimiento(object.fecha_vencimiento);
      //       setFechaDesembol(object.fecha_desembolso);
      //       setTipoDocumento(object.tipo_documento);
      //       setTipoLegal(object.tipo_legal);
      //       setTipoOperacion(object.tipo_operacion);
      //       setNeto(parseFloat(object.monto_neto).toFixed(2));
      //       setMontoTotal(parseFloat(object?.monto_total).toFixed(2));
      //       setMontoBase(object.monto_base_operacion);
      //       setRetraccion(object.porc_retenido);
      //       setPorcFinan(object.porc_financiamiento);
      //       setMonedaSymbol(object.moneda);
      //       setFactorMensual(object.factor_mensual);
      //       setSub_total(parseFloat(object?.monto_sub_total).toFixed(2));
      //       setTipoCambio(object.tipo_cambio);
      //       setEdicionManual(object.edicion_manual);
      //       setFechaGenera(object.fecha_genera);
      //       setEstadoTrans(true)
      //    })
      //    .catch((err) => console.log(err));
   };

   const columns = [
      {
         name: "#",
         selector: (row, index) => `# ${index + 1}`,
         center: true,
         style: {
            color: "#007FFF",
            fontWeight: "800",
         },
         minWidth: "4rem",
      },
      {
         name: <AlertCircle size={20} />,
         selector: (row, index) => (
            <div
               style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  gap: "1rem",
               }}
            >
               <a id="tooltip">
                  <Airplay size={20} color={"#89CFF0"} />
               </a>
               <Tooltip
                  anchorSelect="#tooltip"
                  place="top"
                  style={{ display: "flex", flexDirection: "column", borderRadius: ".5rem", padding: "1rem" }}
               >
                  <div>
                     <p style={{ lineHeight: "1rem" }}> #Fact: {index} </p>
                     <p style={{ lineHeight: "1rem" }}>Fec. Pago: {row.fecha_vencimiento} </p>
                     <p style={{ lineHeight: "1rem" }}>
                        Financiado:
                        {row.monto_financiado == 0
                           ? row.moneda === "MN"
                              ? "S/. 0.00"
                              : "$ 0.00"
                           : row.moneda === "MN"
                              ? `/S. ${parseFloat(row.monto_financiado).toFixed(2)}`
                              : `$ ${parseFloat(row.monto_financiado).toFixed(2)}`}
                     </p>
                  </div>
               </Tooltip>

               <span
                  style={{
                     padding: ".25rem .75rem",
                     borderRadius: "1rem",
                     fontWeight: "800",
                     backgroundColor: row.estado == 0 ? "#FE5A1D40" : "#66FF0050",
                  }}
               >
                  {row.estado_factura}
               </span>
            </div>
         ),
         // center: true,
         minWidth: "12rem",
      },
      {
         name: "PROVEEDOR",
         selector: (row) => (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", alignItems: "flex-start" }}>
               <span>{row.ope_cliente.razon_social}</span>
               <span style={{ fontSize: "0.8rem", color: "#BEBFC5" }}>{row.ope_cliente.ruc}</span>
            </div>
         ),
         minWidth: "15rem",
         sortable: true,
      },
      {
         name: "DEUDOR",
         selector: (row) => row.ope_deudor.razon_social,
         center: true,
         minWidth: "20rem",
      },
      {
         name: "MONTO NETO",
         selector: (row) =>
            row.monto_neto == null
               ? row.moneda === "MN"
                  ? "S/ 0"
                  : "$ 0"
               : row.moneda === "MN"
                  ? `S/ ${parseFloat(row.monto_neto).toLocaleString("en-US")}`
                  : `$ ${parseFloat(row.monto_neto).toLocaleString("en-US")}`,
         center: true,
      },
      {
         name: "FECHA PAGO",
         selector: (row) => (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
               <span>{(row?.fecha_vencimiento).replace(/^(\d{4})-(\d{2})-(\d{2})$/, "$3/$2/$1")}</span>
               <span
                  id="dias-pago"
                  style={{
                     backgroundColor: calcularDiasDePago(row.fecha_vencimiento) >= 0 ? "#03C03C50" : "#FF080050",
                     color: calcularDiasDePago(row.fecha_vencimiento) >= 0 ? "#1E4D2B" : "#B22222",
                     fontWeight: "800",
                     padding: "0.5rem 1rem",
                     borderRadius: "1rem",
                  }}
               >
                  {calcularDiasDePago(row.fecha_vencimiento)} Dias
               </span>
            </div>
         ),
         center: true,
      },
      {
         name: "TIPO",
         selector: (row) => row.tipo_operacion,
         center: true,
      },
      {
         name: "ACTIONS",
         cell: (row) => (
            <div
               style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  // width: "100%",
                  // height: "100%",
               }}
            >
               <Send onClick={() => conseguirTransaccion(row)} style={{ cursor: "pointer" }} />
               {loadingRow === row && <div className="spinner"></div>}

               <Button
                  color="btn-flat-warning"
                  className="btn-flat-warning"
                  onClick={() => getTransaccionById(row?.id)}
               >
                  <Edit />
               </Button>
            </div>
         ),
         center: true,
      }
      // ,
      // {
      //    name: "",
      //    cell: (row) => (
      //       <div className={`spinner-container ${activeRowClass(row)}`}>
      //          {loadingRow === row && <div className="spinner"></div>}
      //       </div>
      //    )
      // }
   ];

   const defaultValues = {
      dias_adelanto: "",
      factor_mensual: "",
      fecha_desembolso: "",
      fecha_emision: "",
      fecha_vencimiento: "",
      monto_a_pagar: "",
      monto_base_operacion: "",
      monto_cavali: "",
      monto_descuento: "",
      monto_financiado: "",
      monto_igv: "",
      monto_neto: "",
      nro_dcto: "",
      porc_financiamiento: "",
      porc_retenido: "",
      razon_social_deudor: "",
      razon_social_proveedor: "",
      ruc_deudor: "",
      ruc_proveedor: "",
      tipo_cambio: "",
      tipo_documento: "",
      tipo_legal: "",
      tipo_operacion: "",
      zip_code: "",
   };

   const customStyles = {
      headCells: {
         style: {
            backgroundColor: "#B7C8B5",
            fontSize: "1rem",
            fontWeight: "800",
            textAlign: "center",
         },
      },
      rows: {
         style: {
            minHeight: "5rem",

            textAlign: "center", // override the row height
         },
      },
   };

   const paginationComponentOptions = {
      rowsPerPageText: "Filas por página",
      rangeSeparatorText: "de",
      selectAllRowsItem: true,
      selectAllRowsItemText: "Todos",
   };

   const {
      handleSubmit,
      control,
      register,
      reset,
      setError,
      formState: { errors },
   } = useForm();

   const updateOperation = (id, data) => {
      setEstadoTrans(false)
      axios
         .patch(`https://notify.grupogenera.pe/api/v1/update-transaccion/${id}`, data)
         .then((res) => {
            setEstadoTrans(true)
            console.log(res.data.data);
         })
         .catch((err) => console.log(err));
   };

   const submit = (data) => {
      console.log(data);
      setEstadoTrans(false)
      if (objUpdate !== undefined) {
         setEstadoTrans(true)
         updateOperation(objUpdate.id, data);
         reset(defaultValues);
         toggle.call();
      } else {
         setEstadoTrans(true)
         reset(defaultValues);
         toggle.call();
      }
   };

   return (
      <div>
         {/* <Col lg='12' sm='12'> */}
         <Row className="match-height">
            <Col lg="4" sm="6">
               <GraficosKpi />
            </Col>
            <Col lg="8" sm="12">
               <Informacion cols={{ md: "3", sm: "6", xs: "12" }} />
            </Col>
         </Row>
         {/* </Col> */}

         <FilterSection
            transacciones={transacciones}
            getProv={getProv}
            getMon={getMon}
            getOpe={getOpe}
            getDate={getDate}
            getMonedaActive={getMonedaActive}
            transUnicos={transUnicos}
            data={data}
         />
         <br />
         <Datatable
            columns={columns}
            data={data}
            customStyles={customStyles}
            pagination="true"
            paginationComponentOptions={paginationComponentOptions}
            search
            progressPending={pending}
            progressComponent={<span>Loading data ....</span>}
            noDataComponent={<span>No se encontraron transacciones</span>}
         />
         <div
            style={{
               width: "100%",
               backgroundColor: "white",
               marginTop: "2rem",
               display: "flex",
               alignItems: "center",
               padding: "1rem",
               gap: "1rem",
               justifyContent: "flex-end",
            }}
         >
            <h5 style={{ margin: "0", color: "#000", fontWeight: "bold", fontSize: "1.25rem" }}>Monto Neto:</h5>
            <p
               style={{
                  margin: "0",
                  color: "#000",
                  fontWeight: "500",
                  fontSize: "1rem",
               }}
            >
               {monedaActive === true ? `$ ${montoSumado}` : `S/. ${montoSumado}`}
            </p>
         </div>
         <ModalEditTransaccion
            toggle={toggle}
            modal={modal}
            setModal={setModal}
            handleSubmit={handleSubmit}
            submit={submit}
            control={control}
            register={register}
            reset={reset}
            errors={errors}
            objUpdate={objUpdate}
            fechaDesembol={fechaDesembol}
            setFechaDesembol={setFechaDesembol}
            fechaVencimiento={fechaVencimiento}
            setFechaVencimiento={setFechaVencimiento}
            setTipoDocumento={setTipoDocumento}
            setTipoLegal={setTipoLegal}
            setTipoOperacion={setTipoOperacion}
            tipoDocumento={tipoDocumento}
            tipoLegal={tipoLegal}
            tipoOperacion={tipoOperacion}
            setNeto={setNeto}
            setMontoTotal={setMontoTotal}
            setMontoBase={setMontoBase}
            setRetraccion={setRetraccion}
            setPorcFinan={setPorcFinan}
            neto={neto}
            montoTotal={montoTotal}
            montoBase={montoBase}
            retraccion={retraccion}
            porcFinan={porcFinan}
            setMonedaSymbol={setMonedaSymbol}
            monedaSymbol={monedaSymbol}
            setFactorMensual={setFactorMensual}
            factorMensual={factorMensual}
            setSub_total={setSub_total}
            sub_total={sub_total}
            setTipoCambio={setTipoCambio}
            tipoCambio={tipoCambio}
            setEdicionManual={setEdicionManual}
            edicionManual={edicionManual}
            setFechaGenera={setFechaGenera}
            fechaGenera={fechaGenera}
         />
      </div>
   );
};

export default Transacciones;
