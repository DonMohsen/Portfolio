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
    className="group rounded-md text-xs md:text-sm border-2 font-IRANSansXDemiBold  border-black dark:border-white shadow-none hover:bg-slate-200 dark:hover:bg-[#362144] flex items-center justify-center"
  >
    {downloadLoading ? (
      <div className="flex items-center justify-center gap-2">
        <div className="w-5 h-5 border-2 border-gray-300 border-t-black dark:border-t-white rounded-full animate-spin"></div>
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center">
        {/* ✅ Add transition here to fix animation issue */}
        <ArrowDown className="w-8 h-8 group-hover:translate-y-[6px] max-sm:translate-y-[6px] transition-transform duration-300" />
        <Space className="w-8 h-8 -translate-y-1" />
      </div>
    )}
    <p className="flex items-center justify-center">
      دانلود رزومه
    </p>
  </Button>  )
}

export default ResumeDownloadButton