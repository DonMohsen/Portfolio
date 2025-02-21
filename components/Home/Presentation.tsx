import Link from "next/link";
import { Button } from "../ui/button";
import { HiOutlineMail } from "react-icons/hi";
import { LuGithub } from "react-icons/lu";
import { PiTelegramLogoBold } from "react-icons/pi";
import { SlSocialLinkedin } from "react-icons/sl";

const Presentation = () => {
  return (
    <div className="absolute w-full  z-[60]  h-full flex flex-col text-black  dark:text-white items-center justify-center  bg-opacity-40 py-2 px-6 text-center rounded-xl">
      <h1 className="text-6xl max-md:text-5xl max-sm:text-3xl mb-3 font-extrabold ">محسن خجسته نژاد</h1>
      <p className="text-[20px] max-sm:text-[15px]">
      برنامه نویس اپلیکیشن های تحت وب
      </p>
      <div className="flex items-center justify-center  w-full gap-3 mt-4 ">
        <Link
          target="_blank"
          rel="noopener noreferrer"
          className="hover:bg-purple-950 dark:hover:bg-purple-200 w-10 h-10 rounded-full bg-black dark:bg-white flex items-center justify-center relative z-10"
          href="https://github.com/donmohsen"
        >
          <LuGithub
            width={100}
            height={100}
            className="w-6 h-6 absolute z-[20] text-white dark:text-black"
          />
        </Link>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          className="hover:bg-purple-950 dark:hover:bg-purple-200 w-10 h-10 rounded-full bg-black dark:bg-white flex items-center justify-center relative z-10"
          href="https://t.me/donmohsen"
        >
          <PiTelegramLogoBold 
            width={100}
            height={100}
            className="w-6 h-6 absolute z-[20] text-white dark:text-black"
          />
        </Link>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          className="hover:bg-purple-950 dark:hover:bg-purple-200 w-10 h-10 rounded-full bg-black dark:bg-white flex items-center justify-center relative z-10"
          href="mailto:mohsenkhojastehnezhad@gmail.com"
        >
          <HiOutlineMail
            width={100}
            height={100}
            className="w-6 h-6 absolute z-[20] text-white dark:text-black"
          />
        </Link>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          className="hover:bg-purple-950 dark:hover:bg-purple-200 w-10 h-10 rounded-full bg-black dark:bg-white flex items-center justify-center relative z-10"
          href="https://www.linkedin.com/in/mohsen-khojasteh-nezhad"
        >
          <SlSocialLinkedin 
            width={100}
            height={100}
            className="w-6 h-6 absolute z-[20] text-white dark:text-black"
          />
        </Link>
      </div>

      <Button 
      className="bg-black dark:bg-white mt-3 px-10 text-white text-center flex items-center justify-center  dark:text-black rounded-xl hover:bg-purple-950 dark:hover:bg-purple-200"
      >دانلود رزومه</Button>
    </div>
  );
};

export default Presentation;
