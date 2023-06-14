// ** React Imports
import { Link,useNavigate } from "react-router-dom";
import { useSkin } from "@hooks/useSkin";
import { ChevronLeft } from "react-feather";
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  Label,
  Input,
  Button,
} from "reactstrap";
import illustrationsLight from "@src/assets/images/pages/forgot-password-v2.svg";
import illustrationsDark from "@src/assets/images/pages/forgot-password-v2-dark.svg";
import './styles/style.css'
import "@styles/react/pages/page-authentication.scss";
import axios from "axios";
import { Controller, useForm } from 'react-hook-form'
import { useState } from "react";

// const URL = 'https://notify.grupogenera.pe/api/create'
const URL = 'https://notify.grupogenera.pe/api/create'
const ForgotPassword = () => {
  const navigate = useNavigate()
  const { skin } = useSkin();
  const source = skin === "dark" ? illustrationsDark : illustrationsLight;
  const { handleSubmit, control, register, reset, formState: { errors } } = useForm()
  const [mensaje, setMensaje] = useState(false)
  const [mensajeError, setMensajeError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const submit = data => {
    setIsLoading(true)
    setMensaje(false)
    setMensajeError(false)
    axios.post(URL, data)
      .then(res => {
        setIsLoading(false)
        setMensaje(true)

      })
      .catch(err => {
        setIsLoading(false)
        setMensajeError(true)
      })
  }

  return (
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner m-0">
        <Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>

          <h2 className="brand-text text-primary ms-1">Genera</h2>
        </Link>
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img className="img-fluid" src={source} alt="Login Cover" />
          </div>
        </Col>
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="4"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="fw-bold mb-1">
              ¿Olvidaste tu contraseña? 🔑
            </CardTitle>
            <CardText className="mb-2">
              Ingrese su correo electrónico y le enviaremos instrucciones para restablecer su contraseña
            </CardText>
            <Form
              className="auth-forgot-password-form mt-2"
              onSubmit={handleSubmit(submit)}
            >
              <div className="mb-1">
                <Label className="form-label" for="login-email">
                  Email
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='email'
                  name='email'
                  render={({ field }) => (
                    <Input
                      type="email"
                      invalid={errors.key && true}
                      placeholder="john@example.com"
                      {...field}
                    />
                  )}
                />
              </div>
              {mensaje ? <p className="local_mensaje">Revise su correo para reiniciar su contraseña</p> : null}
              {mensajeError ? <p className="local_color">Ha ocurrido un error</p> : null}
              {isLoading ? <div className='spinner'></div> : null}
              <Button color="primary" block disabled={isLoading}>
                Enviar enlace de reinicio
              </Button>
              
            </Form>
            <p className="text-center mt-2">
              <Link to="/login">
                <ChevronLeft className="rotate-rtl me-25" size={14} />
                <span className="align-middle">Retroceder para iniciar sesión</span>
              </Link>
            </p>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default ForgotPassword;
