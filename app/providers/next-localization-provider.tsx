import { NextIntlClientProvider } from 'next-intl';
type NextLocalizationProviderProps = {
    children: React.ReactNode;
  };
  
function NextLocalizationProvider({  children}:NextLocalizationProviderProps) {
  return (
    <NextIntlClientProvider>
        {children}
    </NextIntlClientProvider>
  );
}

export default NextLocalizationProvider;
