import React, { Fragment, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import {
  Card,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Row,
  Col,
  Button,
} from "reactstrap";
import DataTable from "react-data-table-component";
import { ChevronDown, Delete, Edit, Trash } from "react-feather";
import { useNavigate } from "react-router-dom";
import alvenApi from "../../api/alvenApi";
const URL = "/v1/cliente/";

const TablaCliente = ({ updateClienteById, estado, deleteClienteById,modal }) => {
  console.log(estado, "asdasda");

  const navigate = useNavigate();
  let token = localStorage.getItem("token");
  const role = localStorage?.getItem("role");

  const [idPropiedad, setIdPropiedad] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchValue, setSearchValue] = useState("");
  const [getData, setGetData] = useState();
  const [getAllData, setGetAllData] = useState();
  const [getTotalData, setGetTotalData] = useState();
  const [store, setStore] = useState();
  const [filter, setFilter] = useState();

  const dispatch = useDispatch();

  const handleFilter = (e) => {
    setSearchValue(e.target.value);
  };

  // Columnas
  const serverSideColumns = [
    {
      sortable: true,
      name: "ID",
      minWidth: "25px",
      maxWidth: "70px",
      selector: (row) => row.id,
    },
    {
      sortable: true,
      name: "Nombre",
      minWidth: "125px",
      selector: (row) => row.nombre,
    },
    {
      sortable: true,
      name: "Apellido Paterno",
      minWidth: "155px",
      selector: (row) => row.apellido_paterno,
    },
    {
      sortable: true,
      name: "Apellido Materno",
      minWidth: "155px",
      selector: (row) => row.apellido_materno,
    },

    {
      sortable: true,
      name: "Asesor",
      minWidth: "225px",
      selector: (row) => {
        const nombre = row?.asesor?.nombre;
        const apellidos = row?.asesor?.apellidos;

        if (nombre === undefined && apellidos === undefined) {
          return "sin asesor";
        }
        // row?.asesor?.nombre + ' ' + row?.asesor?.apellidos
        return nombre + " " + apellidos;
      },

      // cell: row => {
      //     return (
      //         <div className='local_buttons'>

      //         </div>
      //     )
      // }
    },
    // {
    //     sortable: true,
    //     name: 'Cedula',
    //     minWidth: '125px',
    //     selector: row => row.cedula
    // },
    {
      sortable: true,
      name: "Email",
      minWidth: "225px",
      selector: (row) => row.email,
    },
    {
      sortable: true,
      name: "Celular",
      minWidth: "175px",
      selector: (row) => row.celular,
    },
    {
      sortable: true,
      name: "Interesado",
      minWidth: "175px",
      selector: (row) => row.interesado,
    },
    {
      sortable: true,
      name: "Medio de contacto",
      minWidth: "175px",
      selector: (row) => row.medio_contacto,
    },

    {
      name: "Acciones",
      sortable: true,
      allowOverflow: true,
      cell: (row) => {
        return (
          <div className="local_buttons">
            <button
              className="btn btn-warning my-1"
              onClick={() => updateClienteById(row?.id)}
            >
              <Edit />
            </button>
            {role == "1" ? (
              <button
                className="btn btn-danger mb-1"
                onClick={() => deleteClienteById(row?.id)}
              >
                <Trash />
              </button>
            ) : null}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    alvenApi
      .get(URL, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setGetData(res.data);
        // setGetAllData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [estado, modal]);

  useEffect(() => {
    setFilter(
      getData?.filter(
        (e) =>
          e.nombre &&
          (e.nombre + " " + e.apellido_paterno + " " + e.apellido_materno)
            ?.toLowerCase()
            .indexOf(searchValue?.toLowerCase()) !== -1
      )
    );
  }, [searchValue,modal, estado]);

  const handlePerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value));
  };

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  const paginationComponentOptions = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  const CustomPagination = () => {
    const count = Math.ceil(getTotalData / rowsPerPage);

    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        breakLabel="..."
        pageCount={Math.ceil(count) || 1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        activeClassName="active"
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={(page) => handlePagination(page)}
        pageClassName="page-item"
        breakClassName="page-item"
        nextLinkClassName="page-link"
        pageLinkClassName="page-link"
        breakLinkClassName="page-link"
        previousLinkClassName="page-link"
        nextClassName="page-item next-item"
        previousClassName="page-item prev-item"
        containerClassName={
          "pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"
        }
      />
    );
  };
  return (
    <Fragment>
      <Card>
        <CardHeader className="border-bottom">
          <CardTitle tag="h4">Administrar Clientes</CardTitle>
        </CardHeader>
        <Row className="mx-0 mt-1 mb-50">
          <Col sm="6">
            {/* <div className="d-flex align-items-center">
              <Label for="sort-select">Mostrar</Label>
              <Input
                className="dataTable-select"
                type="select"
                id="sort-select"
                value={rowsPerPage}
                onChange={(e) => handlePerPage(e)}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={75}>75</option>
                <option value={100}>100</option>
              </Input>
              <Label for="sort-select">entradas</Label>
            </div> */}
          </Col>
          <Col
            className="d-flex align-items-center justify-content-sm-end mt-sm-0 mt-1"
            sm="6"
          >
            <Label className="me-1" for="search-input">
              Buscar
            </Label>
            <Input
              className="dataTable-filter"
              type="text"
              bsSize="sm"
              id="search-input"
              // value={searchValue}
              onChange={handleFilter}
            />
          </Col>
        </Row>
        <div className="react-dataTable">
          <DataTable
            noHeader
            pagination
            // paginationServer
            paginationComponentOptions={paginationComponentOptions}
            className="react-dataTable"
            columns={serverSideColumns}
            sortIcon={<ChevronDown size={10} />}
            // paginationComponent={CustomPagination}
            data={searchValue ? filter : getData}
          />
        </div>
      </Card>
    </Fragment>
  );
};

export default TablaCliente;
