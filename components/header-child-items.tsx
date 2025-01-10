"use client"
import { webRoutesType } from '@/app/Types/webRoutesTypes'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'

const HeaderChildItems = ({items}:{items:webRoutesType[]}) => {
    //   const [openChildren, setOpenChildren] = useState<any>({});
    
  return (
    <AnimatePresence>
   

                 <motion.div
                      initial={{
                        opacity: 0,
                        y: -20,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                    //   exit={{
                    //     opacity: 0,
                    //     y: -20,
                    //   }}
                      transition={{
                        duration:0.5
                      }}
                 className={clsx(`fixed top-[0%]  left-[40%] h-[50%] w-full mt-[50px] flex items-center justify-center bg-black`,)}>
                   {/* {item.text} */}
                   {items.map((item)=>(
                    <div className='text-white'>
                        {item.text}
                    </div>
                   ))}
                 </motion.div>
                 </AnimatePresence>
  )
}

export default HeaderChildItems