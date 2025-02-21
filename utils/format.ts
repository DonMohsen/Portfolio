export const toPersianDigits = (num: number | string): string => {
    return num.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);
  };
  