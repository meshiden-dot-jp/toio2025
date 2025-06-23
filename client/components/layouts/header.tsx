"use client";

// import { useState, useEffect } from "react";
import React from 'react'
import Nav from './nav'
const Header = () => {
    return (
        <div className='sticky top-0 w-full z-50 text-black bg-white/80 backdrop-saturate-[180%] backdrop-blur-xl no-print'>
            <div className='lg:h-14 h-12 m-auto flex justify-center items-center'>
                <a className='flex' href="/">
                    <p className='lg:text-3xl text-2xl leading-[48px] font-[din-2014] font-bold'>1Player</p>
                </a>
                <ul id='header'  className='gap-8 font-bold lg:flex hidden text-sm'>
                    <Nav />
                </ul>
            </div>
        </div>
    )
}

export default Header