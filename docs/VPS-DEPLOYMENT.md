# راه‌اندازی پورتفولیو روی VPS شخصی

این سند برای استقرار همان اپلیکیشنی است که الان روی لوکال با `npm run dev` اجرا می‌شود: **Next.js 16** (فرانت‌اند + API Routes بک‌اند) + **PostgreSQL** + **Prisma**.

## محتویات بسته `portfolio-vps-release.tar.gz`

| بخش | مسیر |
|-----|------|
| سورس کامل اپ | ریشه آرشیو |
| مستندات استقرار | `VPS-DEPLOYMENT.md` |
| نمونه متغیرهای محیطی | `.env.example` |
| ساختار دیتابیس | `database/schema.sql` |
| دامپ کامل دیتابیس | `database/full-dump.sql` |
| دامپ فقط داده | `database/data.sql` |
| مایگریشن‌های Prisma | `prisma/migrations/` |

> **امنیت:** فایل‌های `.env` واقعی داخل آرشیو نیستند. روی سرور `.env` خودتان را بسازید.

---

## پیش‌نیازهای سرور

- Ubuntu 22.04+ (یا توزیع مشابه)
- **Node.js 20 LTS** یا جدیدتر
- **PostgreSQL 15+**
- **nginx** (پروکسی معکوس)
- **certbot** (SSL رایگان Let's Encrypt) — اختیاری ولی توصیه‌شده
- حداقل **1 GB RAM** (برای `next build` بهتر است 2 GB باشد)

```bash
# نمونه نصب روی Ubuntu
sudo apt update
sudo apt install -y curl nginx postgresql postgresql-contrib

# Node 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

node -v   # v20.x
npm -v
```

---

## ۱. انتقال و استخراج بسته

روی کامپیوتر خودتان (قبل از آپلود، اگر دامپ ندارید):

```bash
npm run db:dump        # دامپ از دیتابیس فعلی
npm run package:vps    # ساخت tar.gz
```

فایل خروجی: `release/portfolio-vps-release.tar.gz`

روی VPS:

```bash
mkdir -p ~/apps/portfolio
cd ~/apps/portfolio
tar -xzf portfolio-vps-release.tar.gz --strip-components=1
# اگر ساختار پوشه‌دار است:
# tar -xzf portfolio-vps-release.tar.gz
# cd portfolio-vps-release
```

---

## ۲. راه‌اندازی PostgreSQL

```bash
sudo -u postgres psql
```

```sql
CREATE USER portfolio WITH PASSWORD 'یک-رمز-قوی';
CREATE DATABASE portfolio OWNER portfolio;
\q
```

### روش A — بازیابی دامپ کامل (پیشنهادی)

اگر `database/full-dump.sql` موجود است:

```bash
export DATABASE_URL="postgresql://portfolio:یک-رمز-قوی@localhost:5432/portfolio"
psql "$DATABASE_URL" -f database/full-dump.sql
```

### روش B — ساخت از صفر با Prisma

```bash
cp .env.example .env
# DATABASE_URL را در .env تنظیم کنید

npm ci
npx prisma migrate deploy
npx prisma db seed    # اختیاری: بلاگ‌های اولیه از کد
```

### روش C — فقط اسکیما + داده جدا

```bash
psql "$DATABASE_URL" -f database/schema.sql
psql "$DATABASE_URL" -f database/data.sql
```

---

## ۳. تنظیم متغیرهای محیطی

```bash
cp .env.example .env
nano .env
```

| متغیر | الزامی | توضیح |
|-------|--------|-------|
| `DATABASE_URL` | بله | اتصال PostgreSQL روی VPS |
| `AUTH_SECRET` | بله | حداقل ۳۲ کاراکتر تصادفی (برای JWT ادمین) |
| `ADMIN_USERNAME` | بله | نام کاربری پنل ادمین |
| `ADMIN_PASSWORD` | بله | حداقل ۱۲ کاراکتر — در اولین لاگین ادمین ساخته می‌شود |
| `NEXT_PUBLIC_SITE_URL` | بله | آدرس نهایی سایت، مثلاً `https://donmohsen.ir` |
| `OPENROUTER_API_KEY` | خیر | فقط برای `/api/chat` |
| `CLOUDINARY_*` | خیر | اگر آپلود تصویر از ادمین نیاز دارید |

تولید `AUTH_SECRET`:

```bash
openssl rand -base64 32
```

---

## ۴. بیلد و اجرای اپلیکیشن

```bash
npm ci
npm run build
npm run start
```

اپ روی پورت **3000** بالا می‌آید. برای تست:

```bash
curl -I http://127.0.0.1:3000
```

### اجرای دائم با PM2

```bash
sudo npm install -g pm2
pm2 start npm --name portfolio -- start
pm2 save
pm2 startup   # دستور نمایش‌داده‌شده را اجرا کنید
```

---

## ۵. nginx به‌عنوان Reverse Proxy

`/etc/nginx/sites-available/portfolio`:

```nginx
server {
    listen 80;
    server_name donmohsen.ir www.donmohsen.ir;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### SSL با certbot

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d donmohsen.ir -d www.donmohsen.ir
```

بعد از SSL، `NEXT_PUBLIC_SITE_URL` را به `https://donmohsen.ir` تنظیم و دوباره بیلد بگیرید:

```bash
npm run build
pm2 restart portfolio
```

---

## ۶. استقرار با Docker (اختیاری)

```bash
cp .env.example .env
# DATABASE_URL را برای سرویس db در docker-compose.vps.yml هماهنگ کنید

docker compose -f docker-compose.vps.yml up -d --build
```

---

## ۷. مسیرهای مهم اپ

| مسیر | کاربرد |
|------|--------|
| `/` | صفحه اصلی (ریدایرکت به locale) |
| `/fa` / `/en` | نسخه فارسی / انگلیسی |
| `/fa/projects` | پروژه‌ها |
| `/fa/blogs` | بلاگ |
| `/admin` | پنل مدیریت |
| `/admin/login` | ورود ادمین |
| `/api/*` | API بک‌اند Next.js |

---

## ۸. به‌روزرسانی بعدی

```bash
cd ~/apps/portfolio
# بسته جدید را آپلود و استخراج کنید
npm ci
npm run build
pm2 restart portfolio
```

اگر اسکیما عوض شده:

```bash
npx prisma migrate deploy
```

---

## ۹. عیب‌یابی

| مشکل | راه‌حل |
|------|--------|
| `P1001` اتصال دیتابیس | `DATABASE_URL`، فایروال، وضعیت PostgreSQL را بررسی کنید |
| `ADMIN_PASSWORD must be at least 12 characters` | رمز ادمین در `.env` کوتاه است |
| تصاویر لود نمی‌شوند | Cloudinary و `remotePatterns` در `next.config.ts` را بررسی کنید |
| 502 از nginx | `pm2 status` — اپ روی 3000 باید Running باشد |
| بیلد کم حافظه می‌خورد | swap اضافه کنید یا لوکال بیلد بگیرید و `.next` را کپی کنید |

---

## ۱۰. معادل لوکال (همان رفتار فعلی)

```bash
cp .env.example .env    # DATABASE_URL را پر کنید
npm ci
npx prisma migrate deploy
npm run dev             # http://localhost:3000
```

این همان جریان توسعه‌ای است که الان سالم روی لوکال دارید؛ روی VPS فقط `build` + `start` + nginx اضافه می‌شود.
