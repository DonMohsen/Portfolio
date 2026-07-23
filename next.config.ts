import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const isDev = process.env.NODE_ENV === "development";

const productionHeaders = isDev
  ? []
  : [
      {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      },
    ];

const nextConfig: NextConfig = {
  // Source maps inflate transfer + parse in audits; keep off for production clients.
  productionBrowserSourceMaps: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/donmohsen/**",
      },
    ],
    ...(isDev ? { dangerouslyAllowLocalIP: true } : {}),
  },
  experimental: {
    // Do NOT include framer-motion here — it caused duplicate chunk emission
    // under Turbopack. Eager framer was fixed by removing it from not-found /
    // loading.tsx instead.
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-icons",
      "@heroicons/react",
    ],
    optimizeCss: true,
    inlineCss: false,
  },
  turbopack: {
    resolveAlias: {
      "next/dist/build/polyfills/polyfill-module": "./empty-polyfill.js",
    },
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "next/dist/build/polyfills/polyfill-module": require.resolve(
          "./empty-polyfill.js"
        ),
      };
    }
    return config;
  },
  async redirects() {
    return [
      {
        source: "/projects",
        destination: "/fa/work",
        permanent: true,
      },
      {
        source: "/projects/:slug",
        destination: "/fa/work/:slug",
        permanent: true,
      },
      {
        source: "/:locale(fa|en)/projects",
        destination: "/:locale/work",
        permanent: true,
      },
      {
        source: "/:locale(fa|en)/projects/:slug",
        destination: "/:locale/work/:slug",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [...securityHeaders, ...productionHeaders],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
