import Link from "next/link";
import { Button } from "../ui/button";
import { SiGithub } from "react-icons/si";
import { BsTelegram } from "react-icons/bs";
import { CgMail } from "react-icons/cg";
import Image from "next/image";
import { MdEmail } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import { LuGithub } from "react-icons/lu";
import { FaLinkedinIn, FaTelegramPlane } from "react-icons/fa";

const Presentation = () => {
  return (
    <div className="absolute w-full  z-[60] mx-[5px] h-full flex flex-col text-black  dark:text-white items-center justify-center  bg-opacity-40 py-2 px-6 text-center rounded-xl">
      <h1 className="text-7xl ">Text Text</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, rem
        reiciendis aliquam facere quod saepe?
      </p>
      <div className="flex items-center justify-center  w-full gap-3 mt-4 ">
        <Link
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 rounded-full bg-black dark:bg-white flex items-center justify-center relative z-10"
          href="https://github.com/MohsenDorado"
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
          className="w-8 h-8 rounded-full bg-black dark:bg-white flex items-center justify-center relative z-10"
          href="https://t.me/donmohsen"
        >
          <FaTelegramPlane
            width={100}
            height={100}
            className="w-6 h-6 absolute z-[20] text-white dark:text-black"
          />
        </Link>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 rounded-full bg-black dark:bg-white flex items-center justify-center relative z-10"
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
          className="w-8 h-8 rounded-full bg-black dark:bg-white flex items-center justify-center relative z-10"
          href="https://www.linkedin.com/in/mohsen-khojasteh-nezhad"
        >
          <FaLinkedinIn
            width={100}
            height={100}
            className="w-6 h-6 absolute z-[20] text-white dark:text-black"
          />
        </Link>
      </div>

      <Button>Click</Button>
    </div>
  );
};

export default Presentation;
