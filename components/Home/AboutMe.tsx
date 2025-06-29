import { BriefcaseBusiness, GraduationCap, Info, User } from "lucide-react";
import React from "react";

const AboutMe = () => {
  return (
    <div className="mt-[70px]">
      <div className=" flex items-center justify-end  px-4 py-2">
        <div className="relative">
          <p className="font-IRANSansXExtraBold text-[40px] text-right">
            درباره من
            {/* Lorem,ipsum. */}
          </p>
          <div className="w-[70%] h-[3px] absolute bottom-0 translate-y-2 right-0 bg-[#5c416e] rounded-full"></div>
        </div>
      </div>
      {/* //!درباره */}
      
      <div className="grid grid-cols-2 max-xl:grid-cols-1 gap-4 my-10" style={{ direction: "rtl" }}>

      
      <div className=" text-right p-7 rounded-md border border-black/[0.2] dark:border-white/[0.2] relative">
        <div className="flex gap-2 justify-start items-center">
          <div className="relative flex items-center justify-center rounded-full w-10 h-10 dark:bg-slate-700 bg-slate-300">
            <User />
          </div>
          <h4 className="font-IRANSansXBold">مختصری راجب من</h4>

        </div>

        <div className="relative mt-2">
          {/* //! Line of right of text */}
          <div className="absolute top-0 right-[1.25rem] w-[2px] bg-black/30 dark:bg-white/30 bottom-0"></div>

          <p className="pr-[50px] pl-[8px] font-IRANSansXLight">
            {/* لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و
            کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی
            در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را
            می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی
            الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. */}
            من محسن خجسته نژاد متولد 81، ساکن غرب تهران و ترم آخر کارشناسی
            نرم افزار هستم. در دوسال اخیر
            اکثر وقتم را روی یادگیری و حل چالش های مربوط به برنامه نویسی تحت وب
            کرده ام تا قبل از اتمام دانشگاه، تجربه کار داشته باشم
          </p>
        </div>
      </div>
      {/* //!تحصیلات */}
      <div className=" text-right p-7 rounded-md border border-black/[0.2] dark:border-white/[0.2] relative">
        <div className="flex gap-2 justify-start items-center">
          <div className="relative flex items-center justify-center rounded-full w-10 h-10 dark:bg-slate-700 bg-slate-300">
            <GraduationCap />
          </div>
          <h4 className="font-IRANSansXBold text-[20px]">تحصیلات</h4>

        </div>

        <div className="relative mt-2">
          {/* //! Line of right of text */}
          <div className="absolute top-0 right-[1.25rem] w-[2px] rounded-full bg-black/30 dark:bg-white/30 bottom-0"></div>

          <div className="pr-[50px] pl-[8px] font-IRANSansXLight">
            {/* لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و
            کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی
            در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را
            می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی
            الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. */}
            <div className="flex items-start justify-center flex-col gap-1">
              <p className="font-IRANSansXMedium text-[16px]">دانشگاه ملی مهارت انقلاب اسلامی تهران</p>
              <p className="text-[14px] font-IRANSansXRegular">کاردانی پیوسته مهندسی نرم افزار کامپیوتر</p>
              <p className="text-[12px] font-IRANSansXUltraLight">1399-1402</p>
            </div>
            <div className="mt-5 flex items-start justify-center flex-col gap-1 ">
              <p className="font-IRANSansXMedium text-[16px]">دانشگاه ملی مهارت شهید بابایی قزوین</p>
              <p className="text-[14px] font-IRANSansXRegular">کارشناسی ناپیوسته مهندسی حرفه ای نرم افزار کامپیوتر</p>
              <p className="text-[12px] font-IRANSansXUltraLight">1402-1404</p>
            </div>
          </div>
        </div>
      </div>
      {/* //!شغل */}
      <div className=" text-right p-7 rounded-md border border-black/[0.2] dark:border-white/[0.2] relative">
        <div className="flex gap-2 justify-start items-center">
          <div className="relative flex items-center justify-center rounded-full w-10 h-10 dark:bg-slate-700 bg-slate-300">
          <BriefcaseBusiness />          </div>
          <h4 className="font-IRANSansXBold">سابقه کاری</h4>

        </div>

        <div className="relative mt-2">
          {/* //! Line of right of text */}
          <div className="absolute top-0 right-[1.25rem] w-[2px] bg-black/30 dark:bg-white/30 bottom-0"></div>

          <p className="pr-[50px] pl-[8px] font-IRANSansXLight">
            {/* لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با */}
            تا به حال سابقه کاری مرتبط نداشته ام
          </p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default AboutMe;
