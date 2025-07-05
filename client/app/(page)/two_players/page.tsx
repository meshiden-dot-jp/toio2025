import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const notfound = () => {
    return (
        <div className="sm:w-[70%] w-[90%] m-auto flex-grow">
            <h1 className=''>###</h1>
            <div className='sm:flex gap-12'>
                <div className='sm:w-1/2'>
                    <h2 className='pt-0'>調整中</h2>
                    <p className=''>このページは現在調整中で稼働しておりません。サービス開始までしばらくお待ちください。</p>
                </div>
                <div className='sm:w-1/2'>
                    <h2 className='sm:pt-0'>Under adjustment</h2>
                    <p className=''>This page is currently under adjustment and not operational. Please wait for a while until the service starts.</p>
                </div>
            </div>

            <div className="flex justify-center pt-10">
                <Button asChild className='mt-3 mb-24 sm:mt-20'>
                    <Link className="sm:w-[50%] w-full" href="/">トップへ戻る</Link>
                </Button>

            </div>
        </div>
    )
}

export default notfound