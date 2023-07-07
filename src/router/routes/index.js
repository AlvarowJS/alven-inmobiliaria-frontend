// ** React Imports
import React, { useEffect } from "react";

import { Fragment, lazy } from "react";
import { Route, Navigate, useNavigate } from "react-router-dom";
// ** Layouts
import BlankLayout from "@layouts/BlankLayout";
import VerticalLayout from "@src/layouts/VerticalLayout";
import HorizontalLayout from "@src/layouts/HorizontalLayout";
import LayoutWrapper from "@src/@core/layouts/components/layout-wrapper";
// ** Route Components
import PublicRoute from "@components/routes/PublicRoute";

// ** Utils
import { isObjEmpty } from "@utils";
import Clientes from "../../views/clientes/Clientes";

// import OperacionesTrans from "../../views/operaciones/OperacionesTrans";
import Inventario from "../../views/inventario/Inventario";
import Asesor from "../../views/asesores/Asesor";
import RegistrarPropiedad from "../../views/inventario/RegistrarPropiedad";
import Mensajes from "../../views/mensajes/Mensajes";
import Medio from "../../views/medio/Medio";

const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
  horizontal: <HorizontalLayout />,
};

// ** Document title
const TemplateTitle = "%s - Vuexy React Admin Template";

// ** Default Route
const DefaultRoute = "/login";

const Error = lazy(() => import("../../views/Error"));

const AuthGuard = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      navigate("/login");
    } else {
      // Aquí debe validar su token con su servidor para asegurarse de que es válido
      // Si el token no es válido, llame a "navigate" para redirigir al usuario a la página de inicio de sesión
      if(role === "1"){
        
      } else if(role === "2") {        
        const restrictedRoutes = ["/registrar-propiedad/:id","/asesores","/medios","/mensajes"];        
        if (restrictedRoutes.includes(window.location.pathname)) {
          navigate("/error"); 
        }
      }
      else{
        navigate("/error")
      }
    }
  }, [navigate]);

  return <LayoutWrapper>{children}</LayoutWrapper>;
};

// const navigate = useNavigate();
// ** Merge Routes
const Routes = [
  {
    path: "/",
    index: true,
    element: <Navigate replace to={DefaultRoute} />,

  },
  {
    path: "/inventario",
    element: <AuthGuard><Inventario /></AuthGuard>,
  },
  {
    path: "/clientes",
    element: <AuthGuard><Clientes /></AuthGuard>,

  },
  {
    path: "/registrar-propiedad/:id",
    element: <AuthGuard><RegistrarPropiedad /></AuthGuard>,

  },
  {
    path: "/asesores",
    element: <AuthGuard><Asesor /></AuthGuard>,
  },
  {
    path: "/medios",
    element: <AuthGuard><Medio /></AuthGuard>,
  },
  {
    path: "/mensajes",
    element: <AuthGuard><Mensajes /></AuthGuard>,
  },
  {
    path: "/error",
    element: <Error />,
    meta: {
      layout: "blank",
    },

  },

];

const getRouteMeta = (route) => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return { routeMeta: route.meta };
    } else {
      return {};
    }
  }
};

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout, defaultLayout) => {
  const LayoutRoutes = [];

  if (Routes) {
    Routes.filter((route) => {
      let isBlank = false;
      // ** Checks if Route layout or Default layout matches current layout
      if (
        (route.meta && route.meta.layout && route.meta.layout === layout) ||
        ((route.meta === undefined || route.meta.layout === undefined) &&
          defaultLayout === layout)
      ) {
        const RouteTag = PublicRoute;
        // ** Check for public or private route
        if (route.meta) {
          route.meta.layout === "blank" ? (isBlank = true) : (isBlank = false);
        }
        if (route.element) {
          const Wrapper =
            // eslint-disable-next-line multiline-ternary
            isObjEmpty(route.element.props) && isBlank === false
              ? // eslint-disable-next-line multiline-ternary
              LayoutWrapper
              : Fragment;

          route.element = (
            <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
              <RouteTag route={route}>{route.element}</RouteTag>
            </Wrapper>
          );
        }

        // Push route to LayoutRoutes
        LayoutRoutes.push(route);
      }
      return LayoutRoutes;
    });
  }
  return LayoutRoutes;
};

const getRoutes = (layout) => {
  const defaultLayout = layout || "vertical";
  const layouts = ["vertical", "horizontal", "blank"];

  const AllRoutes = [];

  layouts.forEach((layoutItem) => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout);

    AllRoutes.push({
      path: "/",
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes,
    });
  });
  return AllRoutes;
};

export { DefaultRoute, TemplateTitle, Routes, getRoutes };
