import React, { Fragment, useEffect, useState } from "react";
import { Breadcrumb, Col, Card, Row, Button, Label, Input } from "reactstrap";
import { useForm } from "react-hook-form";
const URL = "/v1/presentacion";
const URLUPDATE = "/v1/presentacion-foto";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import alvenApi from "../../api/alvenApi";
import TablaPresentacion from "./TablaPresentacion";
import FormPresentacion from "./FormPresentacion";
import CartaPresentacion from "./CartaPresentacion";
import FormGenerador from "./FormGenerador";
const MySwal = withReactContent(Swal);

const Presentacion = () => {
  const token = localStorage.getItem("token");
  const nombrecompleto = localStorage.getItem("nombre");
  const telefono = localStorage.getItem("numero");
  const [data, setData] = useState();
  const [modal, setModal] = useState(false);
  const [modalGenerador, setModalGenerador] = useState(false)
  const [refresh, setRefresh] = useState(false);
  const [actualizacion, setActualizacion] = useState(false);
  const [fotos, setFotos] = useState();
  const [frase, setFrase] = useState()
  const [imagenFondo, setImagenFondo] = useState()

  const [searchValue, setSearchValue] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const {
    handleSubmit,
    control,
    register,
    reset,
    setError,
    formState: { errors },
  } = useForm();
  const getAuthHeaders = () => ({
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  const defaultValuesForm = {
    nombre: "",
    foto: "",
  };

  const handleFilter = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value === '') {
      setFilteredData(data); // Si no hay valor de búsqueda, mostrar todos los datos
    } else {
      const filtered = data.filter((item) =>
        item.nombre.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  useEffect(() => {
    alvenApi
      .get(`${URL}`, getAuthHeaders())
      .then((res) => {
        setData(res.data);
        setFilteredData(res.data);

      })
      .catch((err) => { });
  }, [refresh]);

  const generadorPresentacion = (imagen,) => {

  }
  const toggle = () => {
    setActualizacion(false);
    reset(defaultValuesForm);
    setModal(!modal);
  };

  const toggleActualizacion = () => {
    setModal(!modal);
  };

  const toggleGenerador = (imagen) => {
    setImagenFondo(imagen)
    setModalGenerador(!modalGenerador)

  }


  const updatePresentacion = (id, data) => {
    const f = new FormData();
    f.append("id", data.id);
    f.append("nombre", data.nombre);
    f.append("foto", fotos);

    alvenApi
      .post(`${URLUPDATE}`, f, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        reset(defaultValuesForm);
        toggle.call();
        setRefresh(!refresh);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Presentación Actualizada",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => console.log(err));
  };

  const crearPresentacion = (data) => {
    const f = new FormData();
    f.append("nombre", data.nombre);
    f.append("foto", fotos);
    alvenApi
      .post(URL, f, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        reset(defaultValuesForm);
        toggle.call();
        setRefresh(!refresh);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Presentación Registrada",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => null);
  };

  const updatePresentacionById = (id) => {
    toggleActualizacion.call();
    setActualizacion(true);
    alvenApi
      .get(`${URL}/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        reset(res?.data);
      })
      .catch((err) => console.log(err));
  };

  const deletePresentacionId = (id) => {
    return MySwal.fire({
      title: "¿Estás seguro de eliminar?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-outline-danger ms-1",
      },
      buttonsStyling: false,
    }).then(function (result) {
      if (result.value) {
        alvenApi
          .delete(`${URL}/${id}`, {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((res) => {
            setRefresh(!refresh);
          })
          .catch((err) => null);
      }
    });
  };

  const submit = (data) => {
    if (actualizacion) {
      updatePresentacion(data?.id, data);
    } else {
      crearPresentacion(data);
    }
  };

  return (
    <Fragment>
      <Card className="p-4">
        <Row>
          <Col sm="6" className="d-flex align-items-center px-0 px-lg-1">
            <Button className="mt-sm-0 mt-1" color="primary" onClick={toggle}>
              Subir nueva imagen
            </Button>
          </Col>
          <Col sm="6" className="d-flex align-items-center px-0 px-lg-1">
            <Label className='me-1' for='search-input'>
              Buscar
            </Label>
            <Input
              className='dataTable-filter'
              type='text'
              bsSize='sm'
              id='search-input'
              value={searchValue}
              onChange={handleFilter}
            />
          </Col>
        </Row>
      </Card>
      <Breadcrumb
        title="Datatables Advance"
        data={[{ title: "Datatables" }, { title: "Datatables Advance" }]}
      />
      <Row>
        <Col sm="12">
          <TablaPresentacion
            updatePresentacionById={updatePresentacionById}
            deletePresentacionId={deletePresentacionId}
            toggleGenerador={toggleGenerador}
            modalGenerador={modalGenerador}
            data={data}
            filteredData={filteredData}
            searchValue={searchValue}
          />
        </Col>
      </Row>

      <FormPresentacion
        setFotos={setFotos}
        toggle={toggle}
        toggleActualizacion={toggleActualizacion}
        modal={modal}
        setModal={setModal}
        handleSubmit={handleSubmit}
        submit={submit}
        control={control}
        register={register}
        reset={reset}
        errors={errors}
      />

      <FormGenerador
        toggleGenerador={toggleGenerador}
        modalGenerador={modalGenerador}
        setFrase={setFrase}
        frase={frase}
        imagenFondo={imagenFondo}
        nombrecompleto={nombrecompleto}
        telefono={telefono}
      />

    </Fragment>
  );
};

export default Presentacion;
