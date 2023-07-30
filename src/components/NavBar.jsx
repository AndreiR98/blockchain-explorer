import React, {useState} from "react";
import {Link} from "react-router-dom";
import {NavbarItems} from "../assets/NavbarElements.jsx";
import { FaCubes, FaArrowLeft , FaArrowRight } from "react-icons/fa6";


const NavBar = () => {


    return(

        <>

            <nav className="relative font-body h-screen ">
                <div className=" relative flex h-fit mb-[10rem]">
                    <Link  to="/"
                           className="flex relative font-body lg3:text-2xl lg3:w-[27rem] lg:text-xl lg:w-[25rem] ss:text-xl xs:text-3xl xss:text-3xl  duration-1000  justify-between hover:text-textcolor  "
                    >
                        <FaCubes/> ROTEALA BLOCKCHAIN EXPLORER </Link>
                </div>

                <ul
                    className="font-body relative w-[10rem] text-xl space-y-5 h-screen border-r-2 border-t-0 translate-x-100 "

                >
                    {NavbarItems.map((item) => {
                        return (
                            <li key={item.id} >
                                <Link to={item.path}
                                      className={item.className}
                                >{item.logo}{item.title}</Link>
                            </li>
                        );
                    })}

                </ul>

            </nav>


        </>
    );
}
export default NavBar;