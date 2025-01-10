import React from 'react'
import { GridBg } from './grid-bg'
import { InfiniteScrolling } from './infinite-scrolling'

const Hero = () => {
  return (
    <>
         <div className="w-full absolute items-center h-[100vh] justify-center">
    <GridBg/>
    </div>
    <div className="w-full absolute items-center h-[100vh] justify-center">

    <InfiniteScrolling/>
    </div>
    </>
  )
}

export default Hero