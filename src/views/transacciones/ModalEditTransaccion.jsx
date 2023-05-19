import React, { useEffect, useState } from "react";
import { Button, Input, Label, Col, Row, Modal, ModalHeader, ModalBody, InputGroup, InputGroupText } from "reactstrap";
import { Controller } from "react-hook-form";
import "./../operaciones/operacion.css"

export default function ModalEditTransaccion({
    modal,
    toggle,
    handleSubmit,
    submit,
    control,
    register,
    errors,
    objUpdate,
    fechaDesembol,
    setFechaDesembol,
    fechaVencimiento,
    setFechaVencimiento,
    setTipoDocumento,
    setTipoLegal,
    setTipoOperacion,
    tipoDocumento,
    tipoLegal,
    tipoOperacion,
    setNeto,
    setMontoTotal,
    setRetraccion,
    setPorcFinan,
    neto,
    montoTotal,
    montoBase,
    retraccion,
    porcFinan,
    setMonedaSymbol,
    monedaSymbol,
    setFactorMensual,
    factorMensual,
    setSub_total,
    sub_total,
    setTipoCambio,
    tipoCambio,
    setEdicionManual,
    edicionManual,
    setFechaGenera,
    fechaGenera
}) {
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        if (objUpdate !== undefined) {
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }
    }, []);

    // calculos
    const [diasAdelanto, setDiasAdelanto] = useState();

    // resultados
    const [montoFinanciado, setMontoFinanciado] = useState();
    const [montoDescuento, setMontoDescuento] = useState();
    const [montoCavali, setMontoCavali] = useState();
    const [costosOperativos, setCostosOperativos] = useState();
    const [montoIgv, setMontoIgv] = useState();
    const [montoAbonar, setMontoAbonar] = useState();
    const [montoVencimiento, setMontoVencimiento] = useState();
    const [montoPagarDeudor, setMontoPagarDeudor] = useState();
    const [igvCal, setIgvCal] = useState();

    // fechas
    useEffect(() => {
        let diffDays
        let diffTime
        const date1 = new Date(fechaDesembol);
        const date2 = new Date(fechaVencimiento);
        const date3 = new Date(fechaGenera);
        if (fechaGenera != null) {
            console.log('genera')
            diffTime = Math.abs(date2.getTime() - date3.getTime());
            diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            console.log(diffDays)
            setDiasAdelanto(diffDays)
        } else {
            console.log('no genera')
            diffTime = Math.abs(date2.getTime() - date1.getTime());
            diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            setDiasAdelanto(diffDays)
        }
    }, [fechaDesembol, fechaVencimiento, fechaGenera]);

    // monto financiado
    useEffect(() => {
        let valTipLegal = tipoLegal;
        let valMontoFinanciado;
        if (valTipLegal == "KW") {
            valMontoFinanciado = (montoTotal - Math.round(montoTotal * (retraccion / 100))).toFixed(2);
        } else {
            valMontoFinanciado = (porcFinan / 100) * (neto * tipoCambio).toFixed(2);
        }
        setMontoFinanciado(valMontoFinanciado);
    }, [tipoLegal, montoTotal, retraccion, tipoCambio, neto, porcFinan]);

    // Descuento
    // $descuento = (($factorMensual / 100) / 30) * $diasAdelanto * $montoFinanciado;

    useEffect(() => {
        let valMontoDescuento;
        valMontoDescuento = ((factorMensual / 100 / 30) * diasAdelanto * montoFinanciado).toFixed(2);

        setMontoDescuento(valMontoDescuento);
    }, [diasAdelanto, montoFinanciado, factorMensual]);

    // Costo operativo

    useEffect(() => {
        let valCostoOperativos;
        if (tipoLegal == "OC" || tipoLegal == "KW") {
            valCostoOperativos = 0;
        } else if (tipoDocumento == "FE" || tipoDocumento == "LT") {
            if (monedaSymbol == "MN") {
                if (neto <= 5000) {
                    valCostoOperativos = 25;
                } else if (neto <= 10000 && neto >= 5000) {
                    valCostoOperativos = 60;
                } else if (neto <= 25000 && neto >= 10000) {
                    valCostoOperativos = 90;
                } else if (neto <= 50000 && neto >= 25000) {
                    valCostoOperativos = 120;
                } else if (neto <= 100000 && neto >= 50000) {
                    valCostoOperativos = 180;
                } else {
                    valCostoOperativos = 300;
                }
            } else if (monedaSymbol == "USD") {
                if (neto <= 1500) {
                    valCostoOperativos = 8;
                } else if (neto <= 3000 && neto >= 1500) {
                    valCostoOperativos = 20;
                } else if (neto <= 8000 && neto >= 3000) {
                    valCostoOperativos = 30;
                } else if (neto <= 16000 && neto >= 8000) {
                    valCostoOperativos = 40;
                } else if (neto <= 30000 && neto >= 16000) {
                    valCostoOperativos = 60;
                } else {
                    valCostoOperativos = 100;
                }
            }
        }
        setCostosOperativos(valCostoOperativos);
    }, [monedaSymbol, tipoDocumento, tipoLegal, tipoOperacion]);

    // Costo cavali

    useEffect(() => {
        let cavali;
        if (tipoDocumento == "LT") {
            cavali = 0;
        } else if (tipoOperacion == "A") {
            if (monedaSymbol == "USD") {
                cavali = 1.2;
            } else if ((monedaSymbol = "MN")) {
                cavali = 3.85;
            } else {
                cavali = 0;
            }
        } else {
            cavali = 0;
        }

        setMontoCavali(cavali);
    }, [monedaSymbol, tipoDocumento]);

    // IGV
    useEffect(() => {
        let valMontoIgv;
        if (tipoLegal == "KW") {
            valMontoIgv = (
                0.18 *
                (parseFloat(montoDescuento) + parseFloat(costosOperativos) + parseFloat(montoCavali))
            ).toFixed(2);
        } else {
            valMontoIgv = (0.18 * (parseFloat(costosOperativos) + parseFloat(montoCavali))).toFixed(2);
        }
        setMontoIgv(valMontoIgv);
    }, [tipoLegal, montoDescuento, costosOperativos, montoCavali]);

    // Monto abonar
    useEffect(() => {
        let valMontoAbonar;
        if (tipoLegal == "KW") {
            valMontoAbonar = neto;
        } else {
            valMontoAbonar = (montoFinanciado - montoDescuento - costosOperativos - montoCavali - montoIgv).toFixed(2);
        }
        setMontoAbonar(valMontoAbonar);
    }, [montoFinanciado, montoDescuento, costosOperativos, montoCavali]);

    // Abonar el vencimiento
    useEffect(() => {
        let valMontoVencimiento;
        if (tipoDocumento == "OC") {
            valMontoVencimiento = 0;
        } else if (tipoLegal == "KW") {
            valMontoVencimiento = 0;
        } else {
            valMontoVencimiento = ((1 - porcFinan / 100) * (neto * tipoCambio)).toFixed(2);
        }
        setMontoVencimiento(valMontoVencimiento);
    }, [tipoDocumento, tipoLegal, porcFinan, montoBase, tipoCambio, neto]);

    useEffect(() => {
        let valMontoPagarDeudor;
        if (tipoLegal == "KW") {
            valMontoPagarDeudor = (
                parseFloat(neto) +
                parseFloat(montoDescuento) +
                parseFloat(costosOperativos) +
                parseFloat(montoCavali) +
                parseFloat(montoIgv)
            ).toFixed(2);
        } else {
            valMontoPagarDeudor = 0;
        }
        setMontoPagarDeudor(valMontoPagarDeudor);
    }, [neto, montoDescuento, costosOperativos, montoCavali, montoIgv]);

    useEffect(() => {
        if (monedaSymbol == "MN") {
            setTipoCambio(1);
        } else {
            setTipoCambio(3.8);
        }
    }, [monedaSymbol]);

    // monto neto
    useEffect(() => {
        let valNeto;
        if (edicionManual == false) {
            valNeto = (montoTotal - Math.round((retraccion / 100) * montoTotal)).toFixed(2);
            setNeto(valNeto);
        }
    }, [montoTotal, retraccion]);

    console.log(neto);

    // Igv v2
    useEffect(() => {
        let valIgv;
        valIgv = (sub_total * 0.18).toFixed(2);
        setIgvCal(valIgv);
    }, [sub_total]);

    // Total
    useEffect(() => {
        let valMontoTotal;
        valMontoTotal = (parseFloat(sub_total) + parseFloat(igvCal)).toFixed(2);
        console.log(valMontoTotal, "cambia");
        setMontoTotal(valMontoTotal);
    }, [igvCal, sub_total]);

    // edicion manual
    useEffect(() => {
        let valEdicionManual;
        valEdicionManual = edicionManual;
        setEdicionManual(valEdicionManual);
    }, [edicionManual]);

    // FOrmatear datos
    useEffect(() => { }, []);

    const handleChangeMontoTotal = (event) => {
        const newValue = event.target.value;
        const regex = /^[+-]?\d+(\.\d{0,2})?$/; // Expresión regular que permite hasta 2 decimales

        if (regex.test(newValue)) {
            // Verificar si el nuevo valor cumple con la expresión regular
            setMontoTotal(newValue); // Asignar el nuevo valor al estado local
        }
    };
    const handleChangeSubTotal = (event) => {
        const newValue = event.target.value;
        const regex = /^[+-]?\d+(\.\d{0,2})?$/; // Expresión regular que permite hasta 2 decimales

        if (regex.test(newValue)) {
            // Verificar si el nuevo valor cumple con la expresión regular
            setSub_total(newValue); // Asignar el nuevo valor al estado local
        }
    };
    const handleChangeMontoNeto = (event) => {
        const newValue = event.target.value;
        const regex = /^[+-]?\d+(\.\d{0,2})?$/; // Expresión regular que permite hasta 2 decimales

        if (regex.test(newValue)) {
            // Verificar si el nuevo valor cumple con la expresión regular
            setNeto(newValue); // Asignar el nuevo valor al estado local
        }
    };
    const handleChangeMontoFactorMensual = (event) => {
        const newValue = event.target.value;
        const regex = /^[+-]?\d+(\.\d{0,2})?$/; // Expresión regular que permite hasta 2 decimales

        if (regex.test(newValue)) {
            // Verificar si el nuevo valor cumple con la expresión regular
            setFactorMensual(newValue); // Asignar el nuevo valor al estado local
        }
    };
    const handleChangeMontoPorcFinan = (event) => {
        const newValue = event.target.value;
        const regex = /^[+-]?\d+(\.\d{0,2})?$/; // Expresión regular que permite hasta 2 decimales

        if (regex.test(newValue)) {
            // Verificar si el nuevo valor cumple con la expresión regular
            setPorcFinan(newValue); // Asignar el nuevo valor al estado local
        }
    };
    const handleChangeMontoPorcRetenido = (event) => {
        const newValue = event.target.value;
        const regex = /^[+-]?\d+(\.\d{0,2})?$/; // Expresión regular que permite hasta 2 decimales

        if (regex.test(newValue)) {
            // Verificar si el nuevo valor cumple con la expresión regular
            setRetraccion(newValue); // Asignar el nuevo valor al estado local
        }
    };
    const handleChangeMontoTipoCambio = (event) => {
        const newValue = event.target.value;
        const regex = /^[+-]?\d+(\.\d{0,2})?$/; // Expresión regular que permite hasta 2 decimales

        if (regex.test(newValue)) {
            // Verificar si el nuevo valor cumple con la expresión regular
            setTipoCambio(newValue); // Asignar el nuevo valor al estado local
        }
    };
    const handleChangeIgv = (event) => {
        const newValue = event.target.value;
        const regex = /^[+-]?\d+(\.\d{0,2})?$/; // Expresión regular que permite hasta 2 decimales
        if (regex.test(newValue)) {
            // Verificar si el nuevo valor cumple con la expresión regular
            setIgvCal(newValue); // Asignar el nuevo valor al estado local
        }
    };

    return (
        <div>
            <Modal isOpen={modal} toggle={toggle} className="modal-dialog modal-lg">
                <ModalHeader toggle={toggle}></ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit(submit)}>
                        <div className="text-center mb-2">
                            <h1 className="mb-1">Confirmar datos de la operación</h1>
                            <p>Revise los datos de la factura para continuar su operación</p>
                        </div>
                        <Row className="mb-2">
                            <Label className="form-label">RUC PROVEEDOR</Label>

                            <Col md="4" lg="4" sm="12">
                                <Controller
                                    defaultValue=""
                                    control={control}
                                    id="ruc_proveedor"
                                    name="ruc_proveedor"
                                    render={({ field }) => (
                                        <Input
                                            type="text"
                                            placeholder="ingre el ruc"
                                            invalid={errors.ruc_proveedor && true}
                                            {...field}
                                        />
                                    )}
                                />
                            </Col>
                            <Col md="8" lg="8" sm="12">
                                <Controller
                                    defaultValue=""
                                    control={control}
                                    id="razon_social_proveedor"
                                    name="razon_social_proveedor"
                                    render={({ field }) => (
                                        <Input
                                            type="text"
                                            placeholder="ingrese la razon social"
                                            invalid={errors.razon_social_proveedor && true}
                                            {...field}
                                        />
                                    )}
                                />
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Label className="form-label">RUC DEUDOR</Label>

                            <Col md="4" lg="4" sm="12">
                                <Controller
                                    defaultValue=""
                                    control={control}
                                    id="ruc_deudor"
                                    name="ruc_deudor"
                                    render={({ field }) => (
                                        <Input
                                            type="text"
                                            placeholder="ingre el ruc"
                                            invalid={errors.ruc_deudor && true}
                                            {...field}
                                        />
                                    )}
                                />
                            </Col>
                            <Col>
                                <Controller
                                    defaultValue=""
                                    control={control}
                                    id="razon_social_deudor"
                                    name="razon_social_deudor"
                                    render={({ field }) => (
                                        <Input
                                            type="text"
                                            placeholder="ingre la razón social"
                                            invalid={errors.razon_social_deudor && true}
                                            {...field}
                                        />
                                    )}
                                />
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <Label className="form-label"> #Factura</Label>
                                <Controller
                                    defaultValue=""
                                    control={control}
                                    id="nro_dcto"
                                    name="nro_dcto"
                                    render={({ field }) => (
                                        <Input type="text" placeholder="E001-0000" invalid={errors.nro_dcto && true} {...field} />
                                    )}
                                />
                            </Col>
                            <Col>
                                <Label className="form-label"> Fecha de Emision</Label>

                                <InputGroup className="input-group-merge mb-2">
                                    <InputGroupText>
                                        <input
                                            className="local_date"
                                            type="date"
                                            id="fecha_emision"
                                            {...register("fecha_emision")}
                                        />
                                    </InputGroupText>
                                </InputGroup>
                            </Col>
                            <Col>
                                <Label className="form-label">Fecha de vencimiento</Label>

                                <InputGroup className="input-group-merge mb-2">
                                    <InputGroupText>
                                        <input
                                            className="local_date"
                                            type="date"
                                            id="fecha_vencimiento"
                                            {...register("fecha_vencimiento")}
                                            onChange={(e) => setFechaVencimiento(e.target.value)}
                                        />
                                    </InputGroupText>
                                </InputGroup>
                            </Col>
                            <Col>
                                <Label className="form-label">Moneda</Label>

                                <InputGroupText>
                                    <select
                                        className="local_select"
                                        {...register("moneda")}
                                        onChange={(e) => setMonedaSymbol(e.target.value)}
                                    >
                                        <option value=""></option>
                                        <option value="MN">Soles</option>
                                        <option value="USD">Dolares</option>
                                    </select>
                                </InputGroupText>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <Label className="form-label">Subtotal</Label>
                                <InputGroup className="input-group-merge mb-2">
                                    <InputGroupText>
                                        {monedaSymbol == "MN" ? "S/." : "$"}

                                        <input
                                            className="local_input"
                                            type="number"
                                            id="monto_sub_total"
                                            {...register("monto_sub_total")}
                                            value={sub_total}
                                            onChange={handleChangeSubTotal}
                                        />
                                    </InputGroupText>
                                </InputGroup>
                            </Col>
                            <Col>
                                <Label className="form-label"> IGV</Label>
                                <InputGroup className="input-group-merge mb-2">
                                    <InputGroupText>
                                        {monedaSymbol == "MN" ? "S/." : "$"}

                                        <input
                                            className="local_input"
                                            type="number"
                                            step=".01"
                                            id="igv"
                                            {...register("igv")}
                                            value={igvCal}
                                            onChange={handleChangeIgv}
                                        />
                                    </InputGroupText>
                                </InputGroup>
                            </Col>
                            <Col>
                                <Label className="form-label">Total</Label>
                                <InputGroup className="input-group-merge mb-2">
                                    <InputGroupText>
                                        {monedaSymbol == "MN" ? "S/." : "$"}
                                        <input
                                            className="local_input"
                                            type="number"
                                            step=".01"
                                            id="monto_total"
                                            {...register("monto_total")}
                                            value={montoTotal}
                                            onChange={handleChangeMontoTotal}
                                        />
                                    </InputGroupText>
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <Label className="form-label"> * Factor Mensual</Label>
                                <InputGroup className="input-group-merge mb-2">
                                    {/* <Controller
                                        defaultValue=''
                                        control={control}
                                        id='factor_mensual'
                                        name='factor_mensual'
                                        render={({ field }) => (
                                            <Input
                                                type='number'
                                                invalid={errors.factor_mensual && true}
                                                {...field}

                                            />
                                        )}
                                    /> */}
                                    <InputGroupText>
                                        <input
                                            className="local_input_4"
                                            type="number"
                                            step=".01"
                                            id="factor_mensual"
                                            {...register("factor_mensual")}
                                            onChange={handleChangeMontoFactorMensual}
                                            value={factorMensual}
                                            required
                                        />
                                        %
                                    </InputGroupText>
                                </InputGroup>
                            </Col>
                            <Col>
                                <Label className="form-label">* % PF</Label>
                                <InputGroup className="input-group-merge mb-2">
                                    <InputGroupText>
                                        <input
                                            className="local_input_4"
                                            type="number"
                                            id="porc_financiamiento"
                                            {...register("porc_financiamiento")}
                                            onChange={handleChangeMontoPorcFinan}
                                            value={porcFinan}
                                            // onChange={e => setPorcFinan(e.target.value)}
                                            required
                                        />
                                        %
                                    </InputGroupText>
                                </InputGroup>
                            </Col>
                            <Col>
                                <Label className="form-label">* % DT/RT</Label>
                                <InputGroup className="input-group-merge mb-2">
                                    <InputGroupText>
                                        <input
                                            className="local_input_4"
                                            type="number"
                                            id="porc_retenido"
                                            {...register("porc_retenido")}
                                            onChange={handleChangeMontoPorcRetenido}
                                            value={retraccion}
                                            // onChange={e => setRetraccion(e.target.value)}
                                            required
                                        />
                                        %
                                    </InputGroupText>
                                </InputGroup>
                            </Col>
                            <Col>
                                <Label className="form-label">Tipo de cambio</Label>
                                <InputGroup className="input-group-merge mb-2">
                                    <InputGroupText>
                                        <input
                                            className="local_input"
                                            type="number"
                                            id="tipo_cambio"
                                            {...register("tipo_cambio")}
                                            onChange={handleChangeMontoTipoCambio}
                                            value={tipoCambio}
                                        />
                                        {monedaSymbol == "MN" ? "S/." : "$"}
                                    </InputGroupText>
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col md={3}>
                                <Label className="form-label">* Tipo de Operación</Label>
                                <InputGroupText>
                                    <select
                                        className="local_select3"
                                        {...register("tipo_operacion")}
                                        onChange={(e) => setTipoOperacion(e.target.value)}
                                        required
                                    >
                                        <option value=""></option>
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                    </select>
                                </InputGroupText>
                            </Col>
                            <Col md={3}>
                                <Label className="form-label">* Tipo Documento</Label>
                                <InputGroupText>
                                    <select
                                        className="local_select3"
                                        {...register("tipo_documento")}
                                        onChange={(e) => setTipoDocumento(e.target.value)}
                                        required
                                    >
                                        <option value={""}></option>
                                        <option value={"FE"}>Factura Electron</option>
                                        <option value={"LT"}>Letra</option>
                                        <option value={"OC"}>Orden de compra</option>
                                    </select>
                                </InputGroupText>
                            </Col>
                            <Col md={3}>
                                <Label className="form-label">* Tipo Legal</Label>
                                <InputGroupText>
                                    <select
                                        className="local_select3"
                                        {...register("tipo_legal")}
                                        onChange={(e) => setTipoLegal(e.target.value)}
                                        required
                                    >
                                        <option value={""}></option>
                                        <option value={"KW"}>Financiamiento KW</option>
                                        <option value={"OC"}>Financiamiento OC</option>
                                        <option value={"Descuento"}>Descuento</option>
                                    </select>
                                </InputGroupText>


                            </Col>
                            <Col md={3}>
                                <Label className="form-label">Estado Factura</Label>
                                <InputGroupText>
                                    <select
                                        className="local_select3"
                                        {...register("estado_factura")}
                                        onChange={(e) => setTipoLegal(e.target.value)}
                                        required
                                    >
                                        <option value={""}></option>
                                        <option value={"Pendiente"}>Pendiente</option>
                                        <option value={"Abonado"}>Abonado</option>
                                        <option value={"Realizado"}>Realizado</option>
                                    </select>
                                </InputGroupText>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <Label className="form-label"> * Monto Neto</Label>
                                <InputGroup className="input-group-merge mb-2">
                                    <InputGroupText className={!edicionManual ? "local_group_input" : ""}>
                                        {monedaSymbol == "MN" ? "S/." : "$"}

                                        <input
                                            className="local_input"
                                            type="number"
                                            step=".01"
                                            id="monto_neto"
                                            {...register("monto_neto")}
                                            value={neto}
                                            required
                                            onChange={handleChangeMontoNeto}
                                            disabled={!edicionManual}
                                        />
                                    </InputGroupText>
                                </InputGroup>
                            </Col>
                            <Col>
                                <Label className="form-label"> Monto Financiado</Label>
                                <InputGroup className="input-group-merge mb-2">
                                    <InputGroupText className="local_group_input">
                                        {monedaSymbol == "MN" ? "S/." : "$"}
                                        <input
                                            className="local_input"
                                            type="number"
                                            step=".01"
                                            id="monto_financiado"
                                            {...register("monto_financiado")}
                                            value={parseFloat(montoFinanciado).toFixed(2)}
                                            disabled
                                        />
                                    </InputGroupText>
                                </InputGroup>
                            </Col>
                            <Col>
                                <Label className="form-label">Descuento</Label>
                                <InputGroup className="input-group-merge mb-2">
                                    <InputGroupText className="local_group_input">
                                        {monedaSymbol == "MN" ? "S/." : "$"}
                                        <input
                                            className="local_input"
                                            type="number"
                                            step=".01"
                                            id="monto_descuento"
                                            {...register("monto_descuento")}
                                            value={parseFloat(montoDescuento).toFixed(2)}
                                            disabled
                                        />
                                    </InputGroupText>
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <Label className="form-label"> Costo Operativo</Label>
                                <InputGroup className="input-group-merge mb-2">
                                    <InputGroupText className="local_group_input">
                                        {monedaSymbol == "MN" ? "S/." : "$"}
                                        <input
                                            className="local_input"
                                            type="number"
                                            step=".01"
                                            id="monto_costo_operativo"
                                            {...register("monto_costo_operativo")}
                                            value={parseFloat(costosOperativos).toFixed(2)}
                                            disabled
                                        />
                                    </InputGroupText>
                                </InputGroup>
                            </Col>
                            <Col>
                                <Label className="form-label"> Cavali</Label>
                                <InputGroup className="input-group-merge mb-2">
                                    <InputGroupText className="local_group_input">
                                        {monedaSymbol == "MN" ? "S/." : "$"}
                                        <input
                                            className="local_input"
                                            type="number"
                                            step=".01"
                                            id="monto_cavali"
                                            {...register("monto_cavali")}
                                            value={parseFloat(montoCavali).toFixed(2)}
                                            disabled
                                        />
                                    </InputGroupText>
                                </InputGroup>
                            </Col>
                            <Col>
                                <Label className="form-label">IGV</Label>
                                <InputGroup className="input-group-merge mb-2">
                                    <InputGroupText className="local_group_input">
                                        {monedaSymbol == "MN" ? "S/." : "$"}
                                        <input
                                            className="local_input"
                                            type="number"
                                            step=".01"
                                            id="monto_igv"
                                            {...register("monto_igv")}
                                            value={parseFloat(montoIgv).toFixed(2)}
                                            disabled
                                        />
                                    </InputGroupText>
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <Label className="form-label"> Monto Abonar</Label>
                                <InputGroup className="input-group-merge mb-2">
                                    <InputGroupText className="local_group_input">
                                        {monedaSymbol == "MN" ? "S/." : "$"}

                                        <input
                                            className="local_input"
                                            type="number"
                                            step=".01"
                                            id="monto_abonar"
                                            {...register("monto_abonar")}
                                            value={parseFloat(montoAbonar).toFixed(2)}
                                            disabled
                                        />
                                    </InputGroupText>
                                </InputGroup>
                            </Col>
                            <Col>
                                <Label className="form-label"> Abonar al Vencimiento</Label>
                                <InputGroup className="">
                                    <InputGroupText className="local_group_input">
                                        {monedaSymbol == "MN" ? "S/." : "$"}
                                        <input
                                            className="local_input"
                                            type="number"
                                            step=".01"
                                            id="monto_vencimiento"
                                            {...register("monto_vencimiento")}
                                            value={parseFloat(montoVencimiento).toFixed(2)}
                                            disabled
                                        />
                                    </InputGroupText>
                                </InputGroup>
                            </Col>
                            <Col>
                                <Label className="form-label">Monto a Pagar Deudor</Label>
                                <InputGroup className="input-group-merge mb-2">
                                    <InputGroupText className="local_group_input">
                                        $
                                        <input
                                            className="local_input"
                                            type="number"
                                            step=".01"
                                            id="monto_a_pagar"
                                            {...register("monto_a_pagar")}
                                            value={parseFloat(montoPagarDeudor).toFixed(2)}
                                            disabled
                                        />
                                    </InputGroupText>
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col >
                                <Label className='form-label'>Fecha Pago Genera</Label>
                                <InputGroup className='input-group-merge mb-2'>
                                    <InputGroupText>
                                        <input className='local_input_4' type="date" id="fecha_genera" {...register('fecha_genera')} onChange={e => setFechaGenera(e.target.value)} />
                                    </InputGroupText>
                                </InputGroup>
                            </Col >
                            <Col>
                                <Label className="form-label"> Fecha Pago Cavali</Label>
                                {/* <Controller
                                    defaultValue=""
                                    control={control}
                                    id="fecha_cavali"
                                    name="fecha_cavali"
                                    render={({ field }) => (
                                        <Input type="date" invalid={errors.fecha_cavali && true} {...field} />
                                    )}
                                /> */}
                                <InputGroup className='input-group-merge mb-2'>
                                    <InputGroupText>
                                        <input className='local_input_4' type="date" id="fecha_cavali" {...register('fecha_cavali')} required />
                                    </InputGroupText>
                                </InputGroup>
                            </Col>
                            <Col>
                                <Label className="form-label">Fecha de Desembolso</Label>
                                <InputGroup className="input-group-merge mb-2">
                                    <InputGroupText>
                                        <input
                                            className="local_input_4"
                                            type="date"
                                            id="fecha_desembolso"
                                            {...register("fecha_desembolso")}
                                            onChange={(e) => setFechaDesembol(e.target.value)}
                                            required
                                        />
                                    </InputGroupText>
                                </InputGroup>
                            </Col>
                            <Col>
                                <Label className="form-label">Dias de Adelanto</Label>
                                <InputGroup className="input-group-merge mb-2">
                                    <InputGroupText className="local_group_input">
                                        #
                                        <input
                                            className="local_input_4"
                                            type="number"
                                            id="dias_adelanto"
                                            {...register("dias_adelanto")}
                                            value={diasAdelanto}
                                            disabled
                                        />
                                    </InputGroupText>
                                </InputGroup>
                            </Col>
                        </Row>
                        <div className="local_footer_form">
                            <div className="local_butons_switch">
                                <div className="f">
                                    <label className="switch">
                                        <input
                                            type="checkbox"
                                            {...register("edicion_manual")}
                                            onChange={(e) => setEdicionManual(e.target.checked)}
                                        />
                                        <span className="slider round"></span>
                                    </label>
                                    Editar manualmente el monto neto de la operación
                                </div>
                            </div>
                            <div className="local_butons_form">
                                <Button color="secondary" onClick={toggle}>
                                    Cancelar
                                </Button>
                                <Button className="mx-2" color="info">
                                    Grabar
                                </Button>
                            </div>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
        </div>
    );
}
