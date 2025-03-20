export function getPersianNumbers(text: string): string {
    const persianNumerals = '۰۱۲۳۴۵۶۷۸۹';
    const arabicNumerals = '0123456789';

    return text.split('').map(char => {
        const index = arabicNumerals.indexOf(char);
        return index !== -1 ? persianNumerals[index] : char;
    }).join('');
}
