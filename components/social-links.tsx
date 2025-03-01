import { InfiniteScrollingForCard } from './Home/Hero/infinite-scrolling-for-card'
import Link from 'next/link'
import { LuGithub } from 'react-icons/lu'
import { PiTelegramLogoBold } from 'react-icons/pi'
import { HiOutlineMail } from 'react-icons/hi'
import { SlSocialLinkedin } from 'react-icons/sl'
const SocialLinks = () => {
  return (
    <div className="flex items-center justify-center  w-full gap-3 ">
        
    
    <Link
          target="_blank"
          rel="noopener noreferrer"
          className=" w-8 h-8 rounded-full  flex items-center justify-center relative z-10"
          href="https://github.com/donmohsen"
            aria-label="GitHub Profile"

        >
          <LuGithub
            width={100}
            height={100}
            className="w-6 h-6 absolute z-[20] text-black dark:text-white"
          />
        </Link>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          className=" w-8 h-8 rounded-full  flex items-center justify-center relative z-10"
          href="https://t.me/donmohsen"
            aria-label="Telegram Account"

        >
          <PiTelegramLogoBold 
            width={100}
            height={100}
            className="w-6 h-6 absolute z-[20] text-black dark:text-white"
          />
        </Link>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          className=" w-8 h-8 rounded-full  flex items-center justify-center relative z-10"
          href="mailto:mohsenkhojastehnezhad@gmail.com"
            aria-label="Gmail"

        >
          <HiOutlineMail
            width={100}
            height={100}
            className="w-6 h-6 absolute z-[20] text-black dark:text-white"
          />
        </Link>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          className=" w-8 h-8 rounded-full  flex items-center justify-center relative z-10"
          href="https://www.linkedin.com/in/mohsen-khojasteh-nezhad"
            aria-label="Linkedin Profile"

        >
          <SlSocialLinkedin 
            width={100}
            height={100}
            className="w-6 h-6 absolute z-[20] text-black dark:text-white"
          />
        </Link>
        </div>
  )
  
}

export default SocialLinks