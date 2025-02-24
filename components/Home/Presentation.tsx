"use server"
import Link from "next/link";
import { Button } from "../ui/button";
import { HiOutlineMail } from "react-icons/hi";
import { LuGithub } from "react-icons/lu";
import { PiTelegramLogoBold } from "react-icons/pi";
import { SlSocialLinkedin } from "react-icons/sl";
import GitHubContributions from "./GitHubContributions";
import ResumeDownloadButton from "./ResumeDownloadButton";
import { ArrowLeft } from "lucide-react";

const Presentation = () => {
  return (
    <div className="absolute w-full  z-[60]  h-full flex flex-col text-black  dark:text-white items-center justify-center  bg-opacity-40 py-2 px-6 text-center rounded-xl -translate-y-[10%]">
      <h1 className="text-6xl max-md:text-5xl max-sm:text-3xl mb-3 font-IRANSansXBlack ">
        محسن خجسته نژاد
        {/* Lorem ipsum dolor. */}
        </h1>
      <p className="text-[20px] max-sm:text-[15px] "> 
      برنامه نویس اپلیکیشن های تحت وب <br/> متمرکز روی فرانت اند
      {/* Lorem ipsum dolor  sit amet consectetur adipisicing <br/> elit dolor Lorem, ipsum.. */}
      </p>
      <div className="flex items-center justify-center  w-full gap-3 mt-4 ">
        <Link
          target="_blank"
          rel="noopener noreferrer"
          className="hover:bg-purple-950 dark:hover:bg-purple-200 w-8 h-8 rounded-full bg-black dark:bg-white flex items-center justify-center relative z-10"
          href="https://github.com/donmohsen"
            aria-label="GitHub Profile"

        >
          <LuGithub
            width={100}
            height={100}
            className="w-4 h-4 absolute z-[20] text-white dark:text-black"
          />
        </Link>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          className="hover:bg-purple-950 dark:hover:bg-purple-200 w-8 h-8 rounded-full bg-black dark:bg-white flex items-center justify-center relative z-10"
          href="https://t.me/donmohsen"
            aria-label="Telegram Account"

        >
          <PiTelegramLogoBold 
            width={100}
            height={100}
            className="w-4 h-4 absolute z-[20] text-white dark:text-black"
          />
        </Link>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          className="hover:bg-purple-950 dark:hover:bg-purple-200 w-8 h-8 rounded-full bg-black dark:bg-white flex items-center justify-center relative z-10"
          href="mailto:mohsenkhojastehnezhad@gmail.com"
            aria-label="Gmail"

        >
          <HiOutlineMail
            width={100}
            height={100}
            className="w-4 h-4 absolute z-[20] text-white dark:text-black"
          />
        </Link>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          className="hover:bg-purple-950 dark:hover:bg-purple-200 w-8 h-8 rounded-full bg-black dark:bg-white flex items-center justify-center relative z-10"
          href="https://www.linkedin.com/in/mohsen-khojasteh-nezhad"
            aria-label="Linkedin Profile"

        >
          <SlSocialLinkedin 
            width={100}
            height={100}
            className="w-4 h-4 absolute z-[20] text-white dark:text-black"
          />
        </Link>
      </div>
    <div className="mt-5 flex items-center justify-center gap-3">
      <Button 
      className="group rounded-md text-xs md:text-sm border-2 font-IR
      ANSansXRegular  border-black dark:border-white shadow-none hover:bg-slate-200 dark:hover:bg-[#362144] flex items-center justify-center"
    >
<ArrowLeft className="group-hover:-translate-x-1 -translate-y-[1px] translate-x-1 transition-transform duration-300 " />     
 <p className="font-IRANSansXDemiBold">
       پروژه ها
      </p>
      </Button>
      <ResumeDownloadButton/>
    </div>
       <div className="mx-auto p-4">
      <div className="max-sm:mt-5">
        <GitHubContributions />
        {/* <GitHubRepos /> */}
        {/* <GitHubLanguages /> */}
      </div>
    </div>
    </div>
  );
};

export default Presentation;
