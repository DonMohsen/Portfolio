import Image from "next/image";
import React from "react";

import SocialLinks from "./social-links";
import ResumeDownloadButton from "./Home/ResumeDownloadButton";
import ProjectsScoutButton from "./projects-scout-button";
import { InfiniteScrollingForCard } from "./Home/Hero/infinite-scrolling-for-card";
import GitHubWeekGrid from "./Home/GitHubContributions";
import { IoLocationOutline } from "react-icons/io5";

const PersonalCard = () => {
  return (
    <div className="relative h-[100vh] min-h-[700px] ">
      {/* //!Top SECTION */}
      <div className="bg-[#353535] h-[200px]  relative flex justify-center">
        <Image
          className="rounded-full absolute bottom-[-25px] left-1/2 transform -translate-x-1/2 w-[100px] h-[100px]"
          alt="Profile-pic"
          src="/image-placeholder.webp"
          width={200}
          height={200}
        />
      </div>
      <div className="w-full flex items-center justify-center flex-col mt-10 px-[5%]">
        <h1 className="text-center font-IRANSansXBlack text-xl">
          {/* لورم اخیرسوم */}
          محسن خجسته نژاد
        </h1>
        <h2 className="text-center mt-2 font-IRANSansXRegular">
          {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, qui. */}
          برنامه نویس اپلیکیشن های تحت وب <br /> متمرکز روی فرانت اند
        </h2>
        <h3 className="mt-2 flex items-center justify-center gap-2 text-center">
          <p className="font-IRANSansXLight">
            {/* Lorem ipsum dolor sit. */}
            تهران منطقه۹
          </p>
          <IoLocationOutline />
        </h3>
        <div className="mt-10">
          <SocialLinks />
        </div>
        <div className="flex items-center justify-center gap-6 mt-10">
          <ProjectsScoutButton />
          <ResumeDownloadButton />
        </div>
        {/* <div className="mt-5 max-sm:hidden">
          <GitHubWeekGrid />
        </div> */}
      </div>
      <div className="absolute bottom-0 w-full h-auto ">
        <InfiniteScrollingForCard />
      </div>
    </div>
  );
};

export default PersonalCard;
