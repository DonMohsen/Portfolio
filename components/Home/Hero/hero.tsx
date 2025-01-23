import React from 'react'
import { GridBg } from './grid-bg'
import { InfiniteScrolling } from './infinite-scrolling'
import { Button } from '@/components/ui/button'
import Presentation from '../Presentation'

const Hero = () => {
  return (
    <>
         <div className="w-full absolute items-center h-[100vh] justify-center">
    <GridBg/>
    </div>
    <Presentation/>
    
  
    <div className="w-full min-h-[500px] md:min-h-[700px] absolute items-center h-[100vh] justify-center ">

    <InfiniteScrolling/>
    </div>
    </>
  )
}

export default Hero