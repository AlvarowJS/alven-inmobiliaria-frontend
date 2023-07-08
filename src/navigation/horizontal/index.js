import { Mail, Home, Upload, Eye, Folder, CreditCard, Users, MessageSquare, File, User, MessageCircle } from "react-feather";

export default [
  {
    id: "inventario",
    title: "Inventario",
    icon: <Home size={20} />,
    navLink: "/inventario",
  },
  {
    id: "clientes",
    title: "Clientes",
    icon: <Users size={20} />,
    navLink: "/clientes",
  },
  {
    id: "asesores",
    title: "Asesores",
    icon: <User size={20} />,
    navLink: "/asesores",
  },
  {
    id: "medios",
    title: "Medios de contacto",
    icon: <MessageSquare size={20} />,
    navLink: "/medios",
  },
  {
    id: "mensajes",
    title: "Mensajes",
    icon: <MessageCircle size={20} />,
    navLink: "/mensajes",
  },
];
