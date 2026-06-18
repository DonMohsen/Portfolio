import { BlogPost } from "./types";

/** Seed-only catalog — not used at runtime. Data lives in Prisma `BlogPost`. */
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "nextjs-static-performance",
    publishedAt: "2026-03-12",
    category: "tech",
    heroImage: "/projects/listing/Gemini_Generated_Image_q0eg6yq0eg6yq0eg.webp",
    readTimeMinutes: 6,
    views: 1240,
    likes: 48,
    title: {
      en: "Shipping Next.js pages with static performance budgets",
      fa: "تحویل صفحات Next.js با بودجه عملکرد استاتیک",
    },
    excerpt: {
      en: "How I keep mobile LCP under two seconds while deferring heavy client islands.",
      fa: "چطور LCP موبایل را زیر دو ثانیه نگه می‌دارم و جزایر سنگین کلاینت را به تعویق می‌اندازم.",
    },
    headings: [
      {
        id: "why-static-budgets",
        text: {
          en: "Why static performance budgets matter",
          fa: "چرا بودجه عملکرد استاتیک مهم است",
        },
      },
      {
        id: "defer-client-islands",
        text: {
          en: "Deferring heavy client islands",
          fa: "به‌تعویق انداختن جزایر سنگین کلاینت",
        },
      },
      {
        id: "measuring-lcp",
        text: {
          en: "Measuring LCP in production",
          fa: "اندازه‌گیری LCP در پروداکشن",
        },
      },
    ],
    contentHtml: {
      en: `
        <h2 id="why-static-budgets">Why static performance budgets matter</h2>
        <p>Performance budgets turn abstract goals into concrete constraints. When every route has a bundle ceiling, teams negotiate trade-offs earlier instead of after launch.</p>
        <p>For portfolio and marketing sites, static generation keeps TTFB predictable and lets the CDN do most of the work.</p>
        <h2 id="defer-client-islands">Deferring heavy client islands</h2>
        <p>Not every interaction needs hydration on first paint. I isolate charts, theme toggles, and carousels behind dynamic imports and intersection observers.</p>
        <ul>
          <li>Keep the hero and primary copy server-rendered.</li>
          <li>Load non-critical widgets after <code>requestIdleCallback</code> or viewport entry.</li>
          <li>Prefer CSS for layout shifts instead of client measurement.</li>
        </ul>
        <h2 id="measuring-lcp">Measuring LCP in production</h2>
        <p>Lab scores are useful, but field data tells you what real users experience. I pair Lighthouse CI with RUM snippets on key templates.</p>
        <blockquote>Ship fast first, then protect the budget with CI guardrails.</blockquote>
      `,
      fa: `
        <h2 id="why-static-budgets">چرا بودجه عملکرد استاتیک مهم است</h2>
        <p>بودجه عملکرد اهداف انتزاعی را به محدودیت‌های مشخص تبدیل می‌کند. وقتی هر مسیر سقف bundle دارد، تیم‌ها زودتر درباره trade-off تصمیم می‌گیرند.</p>
        <p>برای سایت‌های پرتفولیو و مارکتینگ، تولید استاتیک TTFB را قابل پیش‌بینی نگه می‌دارد و بیشتر کار را به CDN می‌سپارد.</p>
        <h2 id="defer-client-islands">به‌تعویق انداختن جزایر سنگین کلاینت</h2>
        <p>هر تعامل به hydration در اولین paint نیاز ندارد. نمودارها، سوییچ تم و کاروسل‌ها را پشت dynamic import و intersection observer جدا می‌کنم.</p>
        <ul>
          <li>هیرو و متن اصلی را server-rendered نگه دارید.</li>
          <li>ویجت‌های غیرحیاتی را بعد از ورود به viewport بارگذاری کنید.</li>
          <li>برای جلوگیری از layout shift از CSS استفاده کنید.</li>
        </ul>
        <h2 id="measuring-lcp">اندازه‌گیری LCP در پروداکشن</h2>
        <p>امتیاز آزمایشگاهی مفید است، اما داده میدانی تجربه واقعی کاربر را نشان می‌دهد. Lighthouse CI را با RUM روی قالب‌های کلیدی ترکیب می‌کنم.</p>
        <blockquote>اول سریع تحویل دهید، بعد بودجه را با CI محافظت کنید.</blockquote>
      `,
    },
    conclusionHtml: {
      en: "<p>Static budgets are not bureaucracy—they are a shared language between design, engineering, and delivery.</p>",
      fa: "<p>بودجه استاتیک بوروکراسی نیست؛ زبان مشترک طراحی، مهندسی و تحویل است.</p>",
    },
    faq: [
      {
        question: {
          en: "What is a good LCP target for blogs?",
          fa: "هدف مناسب LCP برای بلاگ چقدر است؟",
        },
        answer: {
          en: "Under 2.5 seconds on mobile field data is a solid baseline for content-heavy pages.",
          fa: "زیر ۲.۵ ثانیه در داده میدانی موبایل برای صفحات محتوامحور خط پایه خوبی است.",
        },
      },
      {
        question: {
          en: "Should every component be a server component?",
          fa: "آیا همه کامپوننت‌ها باید server component باشند؟",
        },
        answer: {
          en: "No. Use client components only where interaction or browser APIs are required.",
          fa: "خیر. فقط جایی که تعامل یا API مرورگر لازم است از client component استفاده کنید.",
        },
      },
    ],
  },
  {
    slug: "frontend-architecture-notes",
    publishedAt: "2026-02-28",
    category: "tech",
    heroImage: "/projects/listing/Gemini_Generated_Image_7wp2nr7wp2nr7wp2.webp",
    readTimeMinutes: 5,
    views: 890,
    likes: 31,
    title: {
      en: "Frontend architecture notes from real product work",
      fa: "یادداشت‌های معماری فرانت‌اند از کار روی محصول واقعی",
    },
    excerpt: {
      en: "Patterns that survived production: boundaries, caching, and predictable data flow.",
      fa: "الگوهایی که در پروداکشن ماندگار شدند: مرزبندی، کش و جریان داده قابل پیش‌بینی.",
    },
    headings: [
      {
        id: "boundaries",
        text: { en: "Module boundaries", fa: "مرزبندی ماژول‌ها" },
      },
      {
        id: "caching",
        text: { en: "Caching layers", fa: "لایه‌های کش" },
      },
    ],
    contentHtml: {
      en: `
        <h2 id="boundaries">Module boundaries</h2>
        <p>Clear folder boundaries reduce accidental coupling. I keep route-specific UI near the route and shared primitives in a thin design layer.</p>
        <h2 id="caching">Caching layers</h2>
        <p>Cache at the edge for public pages, revalidate on a schedule, and invalidate surgically when admin content changes.</p>
      `,
      fa: `
        <h2 id="boundaries">مرزبندی ماژول‌ها</h2>
        <p>مرزهای شفاف پوشه‌ای coupling تصادفی را کم می‌کند. UI مخصوص هر route را نزدیک همان route نگه می‌دارم و primitiveهای مشترک را در لایه طراحی نازک.</p>
        <h2 id="caching">لایه‌های کش</h2>
        <p>صفحات عمومی را در لبه cache کنید، با زمان‌بندی revalidate کنید و هنگام تغییر محتوا در admin به‌صورت هدفمند invalidate کنید.</p>
      `,
    },
    conclusionHtml: {
      en: "<p>Architecture is the sum of constraints you accept on purpose.</p>",
      fa: "<p>معماری مجموع محدودیت‌هایی است که عمداً می‌پذیرید.</p>",
    },
    faq: [
      {
        question: {
          en: "How do you avoid over-abstracting early?",
          fa: "چطور از abstract زودهنگام جلوگیری می‌کنید؟",
        },
        answer: {
          en: "Wait for the second real use case before extracting shared abstractions.",
          fa: "قبل از استخراج abstraction مشترک، منتظر دومین use case واقعی بمانید.",
        },
      },
    ],
  },
  {
    slug: "building-with-ai-agents",
    publishedAt: "2026-01-18",
    category: "personal",
    heroImage: "/projects/listing/Gemini_Generated_Image_q0eg6yq0eg6yq0eg.webp",
    readTimeMinutes: 4,
    views: 2100,
    likes: 72,
    title: {
      en: "Building with AI agents without losing engineering discipline",
      fa: "ساختن با AI Agent بدون از دست دادن انضباط مهندسی",
    },
    excerpt: {
      en: "Practical ways I use AI in delivery while keeping reviews, tests, and ownership clear.",
      fa: "روش‌های عملی استفاده از AI در تحویل، با حفظ بازبینی، تست و مالکیت شفاف.",
    },
    contentHtml: {
      en: "<p>AI agents accelerate exploration, but humans still own architecture decisions and production risk.</p>",
      fa: "<p>AI Agentها کاوش را سریع‌تر می‌کنند، اما تصمیم‌های معماری و ریسک پروداکشن هنوز مالک انسانی دارند.</p>",
    },
  },
  {
    slug: "portfolio-seo-checklist",
    publishedAt: "2025-12-05",
    category: "tech",
    heroImage: "/projects/listing/Gemini_Generated_Image_7wp2nr7wp2nr7wp2.webp",
    readTimeMinutes: 7,
    views: 1560,
    likes: 55,
    title: {
      en: "A technical SEO checklist for developer portfolios",
      fa: "چک‌لیست سئوی فنی برای پرتفولیوی توسعه‌دهندگان",
    },
    excerpt: {
      en: "Structured data, canonical URLs, and server-rendered content that search engines can trust.",
      fa: "داده ساختاریافته، URL کانونیکال و محتوای رندر سرور که موتورهای جستجو به آن اعتماد کنند.",
    },
    contentHtml: {
      en: "<p>Technical SEO for portfolios is mostly about crawlability, stable URLs, and honest metadata.</p>",
      fa: "<p>سئوی فنی پرتفولیو بیشتر درباره crawlability، URL پایدار و metadata صادقانه است.</p>",
    },
  },
];
