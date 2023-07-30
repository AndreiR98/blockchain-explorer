import {FaHome,FaWallet} from "react-icons/fa";
import {FaChartSimple} from "react-icons/fa6";

export  const NavbarItems=[
    {
        id: 1,
        title: "Home",
        path: "/",
        className: "flex relative w-fit  hover:text-textcolor  ",
        logo:<FaHome/>,
    },
    {
        id: 2,
        title: "Charts",
        path: "/charts",
        className: "flex relative  w-fit hover:text-textcolor  ",
       logo:<FaChartSimple/>,
    },
    {
        id: 3,
        title: "Wallet",
        path: "/wallet",
        className: "flex relative  w-fit hover:text-textcolor  ",
        logo:<FaWallet/>,
    },
    {
        id: 4,
        title: "Mempool",
        path: "/mempool",
        className: "flex relative  w-fit hover:text-textcolor  ",

    },
];