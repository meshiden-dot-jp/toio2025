import React from 'react'
import Copyright from './copyright'

const footer = () => {
    return (
        <div className=' text-[#6c6c6c] no-print'>
            <div className='h-auto w-[90%]  m-auto'>
                <Copyright />
            </div>
        </div>
    )
}

export default footer