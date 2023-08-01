import React, { useState, useEffect } from "react";
import {test} from "../assets/test.jsx";
import {NavbarItems} from "../assets/NavbarElements.jsx";


const Mempool= () => {
    return(
        <div className="relative flex -top-[50rem] w-fit left-[20rem]">
            {test.map((item) => {
            return(
                <div>

                 <div className="mb-[5rem] mr-[5rem]">
                <ul>
                    <li>
                        <div className=" flex relative ">
                        <div className="relative w-[10rem] h-[10rem] bg-box ">
                            <div className="relative w-[1.3rem] h-full skew-y-[45deg] top-[-0.6rem] left-[-1.3rem] bg-Shadow"/>
                            <div className="relative w-[10rem] h-[1.3rem] skew-x-[45deg] top-[-11.3rem] left-[-0.7rem] bg-Shadow"/>

                            <p className="relative top-[-10rem] w-fit z-10">asdad</p>

                        </div>
                        </div>
                    </li>
                </ul>
                 </div>

                    <div className="mb-[5rem] mr-[5rem]">
                        <ul>
                            <li>
                                <div className="flex relative ">
                                    <div className="relative w-[10rem] h-[10rem] bg-box ">
                                        <div className="relative w-[1.3rem] h-full skew-y-[45deg] top-[-0.6rem] left-[-1.3rem] bg-Shadow"/>
                                        <div className="relative w-[10rem] h-[1.3rem] skew-x-[45deg] top-[-11.3rem] left-[-0.7rem] bg-Shadow"/>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="mr-[5rem]">
                        <ul>
                            <li>
                                <div className="flex relative ">
                                    <div className="relative w-[10rem] h-[10rem] bg-box ">
                                        <div className="relative w-[1.3rem] h-full skew-y-[45deg] top-[-0.6rem] left-[-1.3rem] bg-Shadow"/>
                                        <div className="relative w-[10rem] h-[1.3rem] skew-x-[45deg] top-[-11.3rem] left-[-0.7rem] bg-Shadow"/>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    </div>
                );
            })}




           </div>

    );

}
export default Mempool;