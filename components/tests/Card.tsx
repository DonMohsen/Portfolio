import clsx from 'clsx';
import { Carrot, Github, ShoppingBag } from 'lucide-react';
import React from 'react';
import { LuGithub } from 'react-icons/lu';

interface CardProps {
  children?:React.ReactNode
  buttonChildren?:React.ReactNode
}

const Card: React.FC<CardProps> = ({children,buttonChildren= '' }) => {
  return (
    <div className='relative mb-10 w-[300px] h-[400px]'>
        <div className='absolute bottom-0 left-0 w-[60px] h-[60px] rounded-[20px] '>
    {buttonChildren||
            <div className="bg-slate-400 w-full h-full rounded-[20px]">
            </div>
            }
        </div>

 <div className='clipped-lb relative'>
 {children}
 </div>
    </div>
  );
};

export default Card;