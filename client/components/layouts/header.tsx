"use client";

// import { useState, useEffect } from "react";
import React from 'react'
import Nav from './nav'
import Image from 'next/image';
const Header = () => {
    return (
        <div className='sticky top-0 w-full z-30 text-black bg-white/80 backdrop-saturate-[180%] backdrop-blur-xl no-print'>
            <div className='lg:h-14 h-12 m-auto flex justify-center items-center'>
                <a className='flex' href="/">
                    <Image
                        src="/image.png"
                        alt="toio2025 logo"
                        width={100}
                        height={40}
                        className='h-[20px] w-auto'
                        priority={true}
                        loading="eager"
                    />
                </a>
                <ul id='header'  className='gap-8 font-bold lg:flex hidden text-sm'>
                    <Nav />
                </ul>
            </div>
        </div>
    )
}

export default Header