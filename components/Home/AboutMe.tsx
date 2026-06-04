import { BriefcaseBusiness, GraduationCap, User } from "lucide-react";
import React from "react";
import { getLocale } from "next-intl/server";

const AboutMe = async () => {
  const locale = await getLocale();
  const isFa = locale === "fa";

  return (
    <div className="mt-[70px]">
      <div className=" flex items-center justify-end  px-4 py-2">
        <div className="relative">
          <h2 className="font-IRANSansXExtraBold text-[40px] text-right">
            {isFa ? "درباره من" : "About Me"}
          </h2>
          <div className="w-[70%] h-[3px] absolute bottom-0 translate-y-2 right-0 bg-[#5c416e] rounded-full"></div>
        </div>
      </div>
      {/* //!درباره */}

      <div
        className="grid grid-cols-2 max-xl:grid-cols-1 gap-4 my-10"
        style={{ direction: isFa ? "rtl" : "ltr" }}
      >
        <div className=" text-right p-7 max-md:p-2 rounded-md border border-black/[0.2] dark:border-white/[0.2] relative">
          <div className="flex gap-2 justify-start items-center">
            <div className="relative flex items-center justify-center rounded-full w-10 h-10 dark:bg-slate-700 bg-slate-300">
              <User />
            </div>
            <h3 className="font-IRANSansXBold">{isFa ? "مختصری راجب من" : "Quick Intro"}</h3>
          </div>

          <div className="relative mt-2">
            {/* //! Line of right of text */}
            <div className={`absolute top-0 w-[2px] bg-black/30 dark:bg-white/30 bottom-0 ${isFa ? "right-[1.25rem]" : "left-[1.25rem]"}`}></div>

            <p className={`${isFa ? "pr-[50px] max-md:pr-[40px]" : "pl-[50px] max-md:pl-[40px] text-left"} font-IRANSansXLight`}>
              {isFa
                ? "توسعه‌دهنده فرانت‌اند با بیش از یک سال تجربه در ساخت اپلیکیشن‌های مقیاس‌پذیر و واکنش‌گرا با React، Next.js و TypeScript. تجربه عملی در استفاده از AI Agent ها در اپلیکیشن‌های واقعی، همراه با دانش SEO و اصول رنکینگ گوگل."
                : "Front-end developer with 1+ year of hands-on experience building scalable, responsive products using React, Next.js and TypeScript. I also implement practical AI agents in production-grade workflows and care deeply about technical SEO."}
            </p>
          </div>
        </div>
        {/* //!تحصیلات */}
        <div className=" text-right p-7 max-md:p-2 rounded-md border border-black/[0.2] dark:border-white/[0.2] relative">
          <div className="flex gap-2 justify-start items-center">
            <div className="relative flex items-center justify-center rounded-full w-10 h-10 dark:bg-slate-700 bg-slate-300">
              <GraduationCap />
            </div>
            <h3 className="font-IRANSansXBold text-[20px]">{isFa ? "تحصیلات" : "Education"}</h3>
          </div>

          <div className="relative mt-2">
            {/* //! Line of right of text */}
            <div className={`absolute top-0 w-[2px] rounded-full bg-black/30 dark:bg-white/30 bottom-0 ${isFa ? "right-[1.25rem]" : "left-[1.25rem]"}`}></div>

            <div className={`${isFa ? "pr-[50px] max-md:pr-[40px]" : "pl-[50px] max-md:pl-[40px] text-left"} font-IRANSansXLight`}>
              {/* لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و
            کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی
            در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را
            می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی
            الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. */}
              <div className="flex items-start justify-center flex-col gap-1">
                <p className="font-IRANSansXMedium text-[16px]">
                  {isFa ? "دانشگاه ملی مهارت انقلاب اسلامی تهران" : "Enghelab Eslami National University of Skills, Tehran"}
                </p>
                <p className="text-[14px] font-IRANSansXRegular">
                  {isFa ? "کاردانی پیوسته مهندسی نرم افزار کامپیوتر" : "Associate Degree in Computer Software Engineering"}
                </p>
                <p className="text-[12px] font-IRANSansXUltraLight">
                  {isFa ? "1399-1402" : "2020-2023"}
                </p>
              </div>
              <div className="mt-5 flex items-start justify-center flex-col gap-1 ">
                <p className="font-IRANSansXMedium text-[16px]">
                  {isFa ? "دانشگاه ملی مهارت شهید بابایی قزوین" : "Shahid Babaei National University of Skills, Qazvin"}
                </p>
                <p className="text-[14px] font-IRANSansXRegular">
                  {isFa ? "کارشناسی ناپیوسته مهندسی حرفه ای نرم افزار کامپیوتر" : "B.Sc. in Professional Computer Software Engineering"}
                </p>
                <p className="text-[12px] font-IRANSansXUltraLight">
                  {isFa ? "1402-1404" : "2023-2025"}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* //!شغل */}
        <div className=" text-right p-7 max-md:p-2 rounded-md border xl:col-span-2  border-black/[0.2] dark:border-white/[0.2] relative">
          <div className="flex gap-2 justify-start items-center">
            <div className="relative flex items-center justify-center rounded-full w-10 h-10 dark:bg-slate-700 bg-slate-300">
              <BriefcaseBusiness />{" "}
            </div>
            <h3 className="font-IRANSansXBold">{isFa ? "سابقه کاری" : "Experience"}</h3>
          </div>

          <div className="relative mt-2">
            {/* //! Line of right of text */}
            <div className={`absolute top-0 w-[2px] bg-black/30 dark:bg-white/30 bottom-0 ${isFa ? "right-[1.25rem]" : "left-[1.25rem]"}`}></div>

            <div className={`${isFa ? "pr-[50px] max-md:pr-[40px]" : "pl-[50px] max-md:pl-[40px] text-left"} font-IRANSansXLight`}>
              {/* لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و
            کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی
            در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را
            می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی
            الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. */}
              <div className="flex items-start justify-center flex-col gap-1">
                <p className="font-IRANSansXBold text-[16px] w-full flex items-center justify-between ">
                  {isFa ? "کارآموز فرانت‌اند" : "Front-end Intern"}
                  <span className="text-black/[0.5] dark:text-white/[0.5] font-IRANSansXLight max-md:text-[12px]">
                    {isFa ? "1403/04-1403/06" : "Jul 2024 - Sep 2024"}
                  </span>
                </p>
                <p className="text-[14px] font-IRANSansXLight">{isFa ? "هلدینگ های‌وب" : "HiWeb Holding"}</p>
                <ul className="list-none">
                  <li className="text-[14px] pt-2 font-IRANSansXMedium">
                    {isFa
                      ? "طراحی و پیاده‌سازی رابط‌های کاربری مقیاس‌پذیر با React و Redux."
                      : "Built scalable UI features using React and Redux."}
                </li>
                  <li className="text-[14px] pt-2 font-IRANSansXMedium">
                    {isFa
                      ? "یادگیری سریع ابزارهای جدید مانند SCSS و Jest و هماهنگی با جریان کاری تیم."
                      : "Quickly adopted SCSS and Jest while aligning with team workflow."}
                </li>
                <li className="text-[14px] pt-2 font-IRANSansXMedium">
                  {isFa
                    ? "همکاری نزدیک با طراحان و تیم بک‌اند برای بهبود کیفیت و زمان تحویل."
                    : "Collaborated closely with design and backend teams to improve delivery quality."}
                </li>
                </ul>
              </div>
                 <div className="flex items-start justify-center flex-col gap-1 mt-5">
                <p className="font-IRANSansXBold text-[16px] w-full flex items-center justify-between ">
                  {isFa ? "برنامه‌نویس فرانت‌اند" : "Front-end Developer"}
                  <span className="text-black/[0.5] dark:text-white/[0.5] font-IRANSansXLight max-md:text-[12px]">
                    {isFa ? "1403/09-1404/04" : "Dec 2024 - Jul 2025"}
                  </span>
                </p>
                <p className="text-[14px] font-IRANSansXLight">{isFa ? "شرکت تات بیکران" : "Tat Bikeran Co."}</p>
                <ul className="list-none">
                  <li className="text-[14px] pt-2 font-IRANSansXMedium">
                    {isFa
                      ? "توسعه و نگهداری کامپوننت‌های React و یکپارچه‌سازی با وردپرس از طریق WP REST API."
                      : "Maintained React components and integrated them with WordPress through WP REST API."}
                </li>
                <li className="text-[14px] pt-2 font-IRANSansXMedium">
                    {isFa
                      ? "همکاری با تیم طراحی و SEO برای بهبود تجربه کاربری و سرعت تحویل."
                      : "Worked with design and SEO teams to improve UX and delivery speed."}
                </li>
                <li className="text-[14px] pt-2 font-IRANSansXMedium">
                    {isFa
                      ? "یادگیری سریع ابزارهای جدید و درک بهتر ابعاد محصول و فروش در توسعه وب."
                      : "Rapidly learned adjacent skills and gained stronger product/business perspective."}
                </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
