"use client"
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { ArrowDown, Space } from 'lucide-react'

const ResumeDownloadButton = () => {
    const [downloadLoading, setDownloadLoading] = useState(false)
    const handleDownload = () => {
        setDownloadLoading(true);
      
        // File URL (served from Next.js public folder)
        const fileUrl = "/MohsenKhPersianCV.pdf"; // Relative to the public folder
      
        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = "MohsenKhPersianCV.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      
        setTimeout(() => {
          setDownloadLoading(false);
        }, 1500);
      };
      
  return (
    <Button
    onClick={handleDownload}
    disabled={downloadLoading}
    className="group rounded-full p-5 text-xs hover:brightness-75 z-50 md:text-sm border-none font-IRANSansXDemiBold w-full  shadow-none bg-slate-200 dark:bg-[#362144] flex items-center justify-center"
  >
    {downloadLoading ? (
      <div className="flex items-center justify-center gap-2">
        <div className="w-5 h-5 border-2 border-gray-300 border-t-black dark:border-t-white rounded-full animate-spin"></div>
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center -translate-y-1">
        <ArrowDown className="w-8 h-8 group-hover:translate-y-[6px] max-md:translate-y-[6px] transition-transform duration-300" />
        <Space className="w-8 h-8 -translate-y-1" />
      </div>
    )}
    <p className="flex items-center justify-center">
      دانلود رزومه
    </p>
  </Button>  )
}

export default ResumeDownloadButton