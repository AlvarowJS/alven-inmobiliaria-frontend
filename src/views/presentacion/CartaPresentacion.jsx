import React from "react";
import logo from "../../assets/images/logo/logo2.png";
const CartaPresentacion = () => {
  return (
    <div>
      <div
        // ref={imgRef}
        style={{ position: "relative", display: "inline-block" }}
      >
        <img
          src="https://alven-inmobiliaria.com.mx/assets/portada1-d674c4a8.png"
          alt="Imagen"
          style={{ width: "1200px", height: "700px" }}
        />
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo negro semi-transparente
          }}
        ></div>
        {/* Logo in the top-left corner */}
        <div
          style={{
            position: "absolute",
            top: "20px", // Añadido margen superior
            left: "20px", // Añadido margen izquierdo
            width: "200px",
            height: "200px",
            backgroundColor: "white",
            borderRadius: "50%", // Hacer el fondo circular
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{
              width: "70%", // Ajustar para que quepa dentro del círculo
              height: "70%", // Ajustar para que quepa dentro del círculo
              borderRadius: "50%", // Si el logo también debe ser circular
            }}
          />
        </div>

        <p
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            color: "white",
            fontSize: "44px",
            fontWeight: "bold",
            textShadow: "2px 2px 4px #000",
            marginLeft: "400px",
            marginTop: "50px",
            marginRight: "20px",
            wordBreak: "break-word",
            lineHeight: "1.2",
            // backgroundColor: "red",
            padding: 4,
            borderRadius: 4,
          }}
        >
          SI DESEAS VENDER, COMPRAR O RENTAR, NO DUDES EN CONTACTARNOS SOMOS
          PROFESIONALES INMOBILIARIOS
        </p>

        {/* Second paragraph in the bottom-right corner */}
        <p
          style={{
            position: "absolute",
            bottom: "0",
            right: "0",
            color: "white",
            fontSize: "44px",
            fontWeight: "bold",
            textShadow: "2px 2px 4px #000",
            marginBottom: "20px",
            marginRight: "20px",
          }}
        >
          Enrique Costa Murillo AnastacioBunger
          <br />
          <br />
          <br />
          Tel: 55 555 555
        </p>
      </div>
      {/* <button onClick={handleDownload}>Descargar imagen</button> */}
    </div>
  );
};

export default CartaPresentacion;
