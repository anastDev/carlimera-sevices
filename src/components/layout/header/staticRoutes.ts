import {CarFront, House, Info, Mail} from "lucide-react";

export const staticRoutes = [
    {
        title: "Home",
        path: "/",
        Icon: House,
    },
    {
        title: "Browse Cars",
        path: "/cars",
        Icon: CarFront,
    },
    {
        title: "About Us",
        path: "/about",
        Icon: Info,
    },
    {
        title: "Contact",
        path: "/contact",
        Icon: Mail,
    },
];