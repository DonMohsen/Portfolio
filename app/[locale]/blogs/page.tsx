import React from 'react'
import { Metadata } from "next";

type Params = Promise<{locale: string}>;

export async function generateMetadata(props: {params: Params}): Promise<Metadata> {
  const {locale} = await props.params;
  const isFa = locale === "fa";
  return {
    title: isFa ? "بلاگ | محسن خجسته نژاد" : "Blog | Mohsen Khojasteh Nezhad",
    description: isFa
      ? "نوشته های شخصی و فنی محسن خجسته نژاد."
      : "Personal and technical articles by Mohsen Khojasteh Nezhad.",
    alternates: {
      canonical: `/${locale}/blogs`
    }
  };
}

const BlogPage =async ({ params }: {params: Params}) => {
  const {locale} = await params;
  const isFa = locale === "fa";
  return (
    <div className="mt-24 px-6 py-10 max-w-4xl mx-auto">
        <h1>
            {isFa ? "محسن خجسته نژاد" : "Mohsen Khojasteh Nezhad"}
        </h1>
        <p className="mt-3">
            {isFa
              ? "این بخش به زودی با مقاله‌های فنی و تجربه‌های توسعه نرم‌افزار تکمیل می‌شود."
              : "This section will soon include technical articles and software engineering notes."}
        </p>
        
    </div>
  )
}

export default BlogPage

export const revalidate=600;
