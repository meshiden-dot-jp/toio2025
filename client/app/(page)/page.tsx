import React from 'react'
import { Button } from '@/components/ui/button'
import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert"

const page = () => {
  return (
    <div className='flex flex-col items-center justify-center h-full w-[70%] mx-auto'>
      <Alert variant="destructive" className='w-1/2 flex mt-12'>
        <AlertDescription className=''>開発者より：２人プレイ、２人プレイ（発展）は開発中です。</AlertDescription>
      </Alert>
      <h1>ゲームを選択</h1>
      <ul className='flex flex-col items-center justify-center gap-4 mt-8 w-1/2'>
        <li className='w-full'><a href="/one_player"><Button className='w-full'>１人プレイ</Button></a></li>
        <li className='w-full'><a href="/two_players"><Button variant="outline" className='w-full'>２人プレイ</Button></a></li>
        <li className='w-full'><a href="/two_players_ex"><Button variant="outline" className='w-full'>２人プレイ（発展）</Button></a></li>
      </ul>
    </div>
  )
}

export default page