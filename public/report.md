Insights
Render blocking requests Est savings of 280 ms
Requests are blocking the page's initial render, which may delay LCP. Deferring or inlining can move these network requests out of the critical path.FCPLCPUnscored
URL
Transfer Size
Duration
localhost 1st party
14.6 KiB	530 ms
…chunks/app_%5Blocale%5D_iransans_12c8894a_module_d21fe7f9.css(localhost)
0.8 KiB
340 ms
…chunks/app_globals_71f961d1.css(localhost)
13.8 KiB
190 ms
Forced reflow
A forced reflow occurs when JavaScript queries geometric properties (such as offsetWidth) after styles have been invalidated by a change to the DOM state. This can result in poor performance. Learn more about forced reflows and possible mitigations.Unscored
Top function call
Total reflow time
_fb3181a8._.js:529
14 ms
Source
Total reflow time
[unattributed]
28 ms
_fb3181a8._.js:519
1 ms
node_modules_e1d5eb16._.js:2945
4 ms
_fb3181a8._.js:529
14 ms
Network dependency tree
Avoid chaining critical requests by reducing the length of chains, reducing the download size of resources, or deferring the download of unnecessary resources to improve page load.LCPUnscored
Maximum critical path latency: 799 ms
Initial Navigation
/en(localhost) - 457 ms, 28.73 KiB
…chunks/app_globals_71f961d1.css(localhost) - 567 ms, 13.78 KiB
/fonts/IRANSansXDemiBold.ttf(localhost) - 799 ms, 38.25 KiB
/fonts/IRANSansXUltraLight.ttf(localhost) - 797 ms, 38.26 KiB
/fonts/IRANSansXRegular.ttf(localhost) - 753 ms, 37.17 KiB
/fonts/IRANSansXMedium.ttf(localhost) - 726 ms, 38.22 KiB
/fonts/IRANSansXLight.ttf(localhost) - 716 ms, 38.36 KiB
/fonts/IRANSansXBold.ttf(localhost) - 699 ms, 38.31 KiB
/fonts/IRANSansXExtraBold.ttf(localhost) - 683 ms, 38.15 KiB
…chunks/app_%5Blocale%5D_iransans_12c8894a_module_d21fe7f9.css(localhost) - 568 ms, 0.81 KiB
Preconnected origins
preconnect hints help the browser establish a connection earlier in the page load, saving time when the first request for that origin is made. The following are the origins that the page preconnected to.
no origins were preconnected
Preconnect candidates
Add preconnect hints to your most important origins, but try to use no more than 4.
No additional origins are good candidates for preconnecting
Legacy JavaScript Est savings of 8 KiB
Polyfills and transforms enable older browsers to use new JavaScript features. However, many aren't necessary for modern browsers. Consider modifying your JavaScript build process to not transpile Baseline features, unless you know you must support older browsers. Learn why most sites can deploy ES6+ code without transpilingFCPLCPUnscored
URL
Wasted bytes
localhost 1st party
8.1 KiB
…chunks/node_modules_next_dist_f3530cac._.js(localhost)
8.1 KiB
node_modules_next_dist_f3530cac._.js:36
Array.prototype.at
node_modules_next_dist_f3530cac._.js:16
Array.prototype.flat
node_modules_next_dist_f3530cac._.js:18
Array.prototype.flatMap
node_modules_next_dist_f3530cac._.js:32
Object.fromEntries
node_modules_next_dist_f3530cac._.js:39
Object.hasOwn
node_modules_next_dist_f3530cac._.js:10
String.prototype.trimEnd
node_modules_next_dist_f3530cac._.js:10
String.prototype.trimStart
LCP breakdown
3rd parties
These insights are also available in the Chrome DevTools Performance Panel - record a trace to view more detailed information.
Diagnostics
Reduce JavaScript execution time 2.9 s
Consider reducing the time spent parsing, compiling, and executing JS. You may find delivering smaller JS payloads helps with this. Learn how to reduce Javascript execution time.TBTUnscored
URL
Total CPU Time
Script Evaluation
Script Parse
localhost 1st party
3,767 ms	2,158 ms	455 ms
…chunks/node_modules_next_dist_compiled_a0e4c7b4._.js(localhost)
1,361 ms
1,291 ms
10 ms
/en(localhost)
882 ms
95 ms
22 ms
…chunks/_fb3181a8._.js(localhost)
434 ms
261 ms
4 ms
…chunks/node_modules_next_dist_compiled_next-devtools_index_….js(localhost)
260 ms
149 ms
56 ms
…chunks/turbopack-_23a915ee._.js(localhost)
242 ms
234 ms
5 ms
…chunks/node_modules_f1c3c35f._.js(localhost)
235 ms
64 ms
82 ms
…chunks/node_modules_next_dist_compiled_react-dom_1e674e59._.js(localhost)
99 ms
21 ms
75 ms
…chunks/node_modules_next_dist_client_17643121._.js(localhost)
69 ms
23 ms
39 ms
…chunks/node_modules_2c3aa153._.js(localhost)
69 ms
5 ms
63 ms
…chunks/node_modules_framer-motion_dist_es_56f45d1f._.js(localhost)
64 ms
7 ms
56 ms
…chunks/node_modules_5f9c5326._.js(localhost)
52 ms
7 ms
42 ms
Unattributable
699 ms	20 ms	0 ms
Unattributable
699 ms
20 ms
0 ms
Free VPN for Chrome - VPN Proxy VeePN Chrome Extension 
369 ms	298 ms	2 ms
chrome-extension://majdfhpaihoncoakbjgbdhglocklcgno/assets/webcomponents-bundle-Cazg7WE4.js
294 ms
247 ms
1 ms
chrome-extension://majdfhpaihoncoakbjgbdhglocklcgno/assets/client-BGioy6-K.js
76 ms
51 ms
1 ms
Minimize main-thread work 5.1 s
Consider reducing the time spent parsing, compiling and executing JS. You may find delivering smaller JS payloads helps with this. Learn how to minimize main-thread workTBTUnscored
Category
Time Spent
Script Evaluation
2,566 ms
Other
1,410 ms
Script Parsing & Compilation
537 ms
Style & Layout
356 ms
Rendering
159 ms
Parse HTML & CSS
37 ms
Minify CSS Est savings of 2 KiB
Minifying CSS files can reduce network payload sizes. Learn how to minify CSS.FCPLCPUnscored
URL
Transfer Size
Est Savings
localhost 1st party
13.8 KiB	2.1 KiB
…chunks/app_globals_71f961d1.css(localhost)
13.8 KiB
2.1 KiB
Minify JavaScript Est savings of 302 KiB
Minifying JavaScript files can reduce payload sizes and script parse time. Learn how to minify JavaScript.FCPLCPUnscored
URL
Transfer Size
Est Savings
localhost 1st party
962.6 KiB	300.0 KiB
…chunks/node_modules_next_dist_client_17643121._.js(localhost)
119.6 KiB
52.9 KiB
…chunks/node_modules_next_dist_compiled_react-dom_1e674e59._.js(localhost)
177.7 KiB
48.0 KiB
…chunks/node_modules_f1c3c35f._.js(localhost)
144.2 KiB
40.2 KiB
…chunks/node_modules_5f9c5326._.js(localhost)
105.4 KiB
37.0 KiB
…chunks/node_modules_2c3aa153._.js(localhost)
119.7 KiB
26.1 KiB
…chunks/node_modules_framer-motion_dist_es_56f45d1f._.js(localhost)
114.5 KiB
25.6 KiB
…chunks/node_modules_e1d5eb16._.js(localhost)
27.2 KiB
12.6 KiB
…chunks/node_modules_next_dist_f3530cac._.js(localhost)
38.0 KiB
12.3 KiB
…chunks/node_modules_next_dist_compiled_a0e4c7b4._.js(localhost)
27.7 KiB
11.9 KiB
…chunks/node_modules_next_dist_compiled_react-server-dom-tur….js(localhost)
30.1 KiB
10.3 KiB
…chunks/turbopack-_23a915ee._.js(localhost)
18.1 KiB
8.9 KiB
…chunks/node_modules_next_dist_be32b49c._.js(localhost)
21.7 KiB
8.9 KiB
…chunks/_fb3181a8._.js(localhost)
7.8 KiB
2.6 KiB
…chunks/_c997b2f9._.js(localhost)
10.9 KiB
2.5 KiB
Unattributable
6.7 KiB	2.3 KiB
chrome-extension://gppongmhjkpfnbhagpmjfkannfbllamg/js/content.js
6.7 KiB
2.3 KiB
Page prevented back/forward cache restoration 4 failure reasons
Many navigations are performed by going back to a previous page, or forwards again. The back/forward cache (bfcache) can speed up these return navigations. Learn more about the bfcacheUnscored
Failure reason
Failure type
Pages with WebSocket cannot enter back/forward cache.
Pending browser support
/en(localhost)
Pages whose main resource has cache-control:no-store cannot enter back/forward cache.
Not actionable
/en(localhost)
Back/forward cache is disabled because some JavaScript network request received resource with `Cache-Control: no-store` header.
Not actionable
/en(localhost)
Back/forward cache is disabled because WebSocket has been used.
Not actionable
/en(localhost)
Reduce unused JavaScript Est savings of 872 KiB
Reduce unused JavaScript and defer loading scripts until they are required to decrease bytes consumed by network activity. Learn how to reduce unused JavaScript.FCPLCPUnscored
URL
Transfer Size
Est Savings
localhost 1st party
999.8 KiB	614.8 KiB
…chunks/node_modules_next_dist_compiled_next-devtools_index_….js(localhost)
218.8 KiB
143.9 KiB
…chunks/node_modules_2c3aa153._.js(localhost)
119.7 KiB
115.7 KiB
…chunks/node_modules_framer-motion_dist_es_56f45d1f._.js(localhost)
114.5 KiB
104.3 KiB
…chunks/node_modules_5f9c5326._.js(localhost)
105.4 KiB
77.2 KiB
…chunks/node_modules_next_dist_client_17643121._.js(localhost)
119.6 KiB
65.5 KiB
…chunks/node_modules_next_dist_compiled_react-dom_1e674e59._.js(localhost)
177.7 KiB
62.2 KiB
…chunks/node_modules_f1c3c35f._.js(localhost)
144.2 KiB
46.0 KiB
Free VPN for Chrome - VPN Proxy VeePN Chrome Extension 
415.8 KiB	257.1 KiB
chrome-extension://majdfhpaihoncoakbjgbdhglocklcgno/assets/client-BGioy6-K.js
188.3 KiB
110.4 KiB
chrome-extension://majdfhpaihoncoakbjgbdhglocklcgno/assets/webcomponents-bundle-Cazg7WE4.js
123.8 KiB
85.5 KiB
chrome-extension://majdfhpaihoncoakbjgbdhglocklcgno/assets/index-b-XrjRCK.js
103.6 KiB
61.2 KiB
Avoid long main-thread tasks 16 long tasks found
User Timing marks and measures 24 user timings
More information about the performance of your application. These numbers don't directly affect the Performance score.
Passed audits (15)
Show
91
Accessibility
These checks highlight opportunities to improve the accessibility of your web app. Automatic detection can only detect a subset of issues and does not guarantee the accessibility of your web app, so manual testing is also encouraged.
Contrast
Background and foreground colors do not have a sufficient contrast ratio.
Low-contrast text is difficult or impossible for many users to read. Learn how to provide sufficient color contrast.
Failing Elements
Production
<p class=" rounded-[4px] p-[4px] max-md:text-[10px] text-[12px] font-IRANSansXDemi…">
Quaiz Production 90% +5
<a class="relative overflow-hidden group border-black/[0.1] dark:border-white/[0.4…" href="/en/projects/41">
These are opportunities to improve the legibility of your content.
Internationalization and localization
<html> element does not have a [lang] attribute
If a page doesn't specify a lang attribute, a screen reader assumes that the page is in the default language that the user chose when setting up the screen reader. If the page isn't actually in the default language, then the screen reader might not announce the page's text correctly. Learn more about the lang attribute.
Failing Elements
html.dark
These are opportunities to improve the interpretation of your content by users in different locales.
Navigation
Heading elements are not in a sequentially-descending order
Properly ordered headings that do not skip levels convey the semantic structure of the page, making it easier to navigate and understand when using assistive technologies. Learn more about heading order.
Failing Elements
Quick Intro
<h4 class="font-IRANSansXBold">
These are opportunities to improve keyboard navigation in your application.
Additional items to manually check (10)
Show
These items address areas which an automated testing tool cannot cover. Learn more in our guide on conducting an accessibility review.
Passed audits (21)
Show
Not applicable (36)
Show
96
Best Practices
General
Issues were logged in the Issues panel in Chrome Devtools
Missing source maps for large first-party JavaScript
Trust and Safety
Ensure CSP is effective against XSS attacks
Use a strong HSTS policy
Ensure proper origin isolation with COOP
Mitigate clickjacking with XFO or CSP
Mitigate DOM-based XSS with Trusted Types
Passed audits (11)
Show
Not applicable (2)
Show
92
SEO
These checks ensure that your page is following basic search engine optimization advice. There are many additional factors Lighthouse does not score here that may affect your search ranking, including performance on Core Web Vitals. Learn more about Google Search Essentials.
Content Best Practices
Document does not have a valid rel=canonicalPoints to another `hreflang` location (http://localhost:3000/en)
Format your HTML in a way that enables crawlers to better understand your app’s content.
