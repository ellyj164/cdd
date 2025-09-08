import React, { useState, useEffect } from 'react';
import { Globe, DollarSign, MapPin, ChevronDown, Check, TrendingUp, Coins } from 'lucide-react';

// Multi-Currency Support Component
export const MultiCurrencySelector = ({ 
  selectedCurrency, 
  onCurrencyChange, 
  amount = null 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [exchangeRates, setExchangeRates] = useState({});
  const [loading, setLoading] = useState(false);

  // Comprehensive currency data
  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar', flag: '🇺🇸', region: 'Americas' },
    { code: 'EUR', symbol: '€', name: 'Euro', flag: '🇪🇺', region: 'Europe' },
    { code: 'GBP', symbol: '£', name: 'British Pound', flag: '🇬🇧', region: 'Europe' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen', flag: '🇯🇵', region: 'Asia' },
    { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', flag: '🇨🇳', region: 'Asia' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', flag: '🇨🇦', region: 'Americas' },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', flag: '🇦🇺', region: 'Oceania' },
    { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc', flag: '🇨🇭', region: 'Europe' },
    { code: 'KRW', symbol: '₩', name: 'South Korean Won', flag: '🇰🇷', region: 'Asia' },
    { code: 'INR', symbol: '₹', name: 'Indian Rupee', flag: '🇮🇳', region: 'Asia' },
    { code: 'BRL', symbol: 'R$', name: 'Brazilian Real', flag: '🇧🇷', region: 'Americas' },
    { code: 'MXN', symbol: '$', name: 'Mexican Peso', flag: '🇲🇽', region: 'Americas' },
    { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', flag: '🇸🇬', region: 'Asia' },
    { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar', flag: '🇭🇰', region: 'Asia' },
    { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar', flag: '🇳🇿', region: 'Oceania' },
    { code: 'SEK', symbol: 'kr', name: 'Swedish Krona', flag: '🇸🇪', region: 'Europe' },
    { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone', flag: '🇳🇴', region: 'Europe' },
    { code: 'DKK', symbol: 'kr', name: 'Danish Krone', flag: '🇩🇰', region: 'Europe' },
    { code: 'RUB', symbol: '₽', name: 'Russian Ruble', flag: '🇷🇺', region: 'Europe' },
    { code: 'ZAR', symbol: 'R', name: 'South African Rand', flag: '🇿🇦', region: 'Africa' }
  ];

  // Simulate real-time exchange rates
  useEffect(() => {
    const fetchExchangeRates = async () => {
      setLoading(true);
      // Mock exchange rates (in production, use real API like exchangerate-api.com)
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockRates = {
        USD: 1.00,
        EUR: 0.85,
        GBP: 0.73,
        JPY: 149.50,
        CNY: 7.25,
        CAD: 1.35,
        AUD: 1.52,
        CHF: 0.91,
        KRW: 1325.00,
        INR: 83.15,
        BRL: 5.20,
        MXN: 18.50,
        SGD: 1.34,
        HKD: 7.85,
        NZD: 1.64,
        SEK: 10.85,
        NOK: 10.45,
        DKK: 6.92,
        RUB: 92.50,
        ZAR: 18.75
      };
      
      setExchangeRates(mockRates);
      setLoading(false);
    };

    fetchExchangeRates();
    
    // Update rates every 5 minutes
    const interval = setInterval(fetchExchangeRates, 300000);
    return () => clearInterval(interval);
  }, []);

  const selectedCurrencyData = currencies.find(c => c.code === selectedCurrency) || currencies[0];
  
  const convertAmount = (amount, fromCurrency, toCurrency) => {
    if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) return amount;
    
    const usdAmount = amount / exchangeRates[fromCurrency];
    return (usdAmount * exchangeRates[toCurrency]).toFixed(2);
  };

  const groupedCurrencies = currencies.reduce((acc, currency) => {
    if (!acc[currency.region]) acc[currency.region] = [];
    acc[currency.region].push(currency);
    return acc;
  }, {});

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <span className="text-lg">{selectedCurrencyData.flag}</span>
        <span className="font-medium">{selectedCurrencyData.symbol}</span>
        <span className="text-sm text-gray-600 dark:text-gray-400">{selectedCurrencyData.code}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-xl max-h-96 overflow-y-auto">
          <div className="p-4 border-b border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Select Currency</h3>
              {loading && (
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600"></div>
                  <span>Updating rates...</span>
                </div>
              )}
            </div>
            {amount && (
              <div className="mt-2 p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Current amount:</span>
                  <span className="font-medium">
                    {selectedCurrencyData.symbol}{amount}
                  </span>
                </div>
              </div>
            )}
          </div>

          {Object.entries(groupedCurrencies).map(([region, regionCurrencies]) => (
            <div key={region}>
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-gray-700/50">
                {region}
              </div>
              {regionCurrencies.map(currency => {
                const convertedAmount = amount ? convertAmount(amount, selectedCurrency, currency.code) : null;
                const isSelected = currency.code === selectedCurrency;
                
                return (
                  <button
                    key={currency.code}
                    onClick={() => {
                      onCurrencyChange(currency.code);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                      isSelected ? 'bg-primary-50 dark:bg-primary-900/20 border-r-2 border-primary-500' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{currency.flag}</span>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{currency.symbol}</span>
                            <span className="text-sm font-medium">{currency.code}</span>
                            {isSelected && <Check className="h-4 w-4 text-primary-600" />}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{currency.name}</div>
                        </div>
                      </div>
                      {convertedAmount && !isSelected && (
                        <div className="text-right">
                          <div className="text-sm font-medium">{currency.symbol}{convertedAmount}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Rate: {exchangeRates[currency.code]?.toFixed(4)}
                          </div>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          ))}

          <div className="p-4 border-t border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50">
            <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
              <TrendingUp className="h-3 w-3" />
              <span>Exchange rates updated every 5 minutes</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Multi-Language Support Component
export const MultiLanguageSelector = ({ 
  selectedLanguage, 
  onLanguageChange 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', region: 'Global' },
    { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', region: 'Europe' },
    { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', region: 'Europe' },
    { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', region: 'Europe' },
    { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', region: 'Europe' },
    { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹', region: 'Europe' },
    { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', region: 'Europe' },
    { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳', region: 'Asia' },
    { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', region: 'Asia' },
    { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷', region: 'Asia' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', region: 'Asia' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', region: 'Middle East' },
    { code: 'th', name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭', region: 'Asia' },
    { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳', region: 'Asia' },
    { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷', region: 'Europe' },
    { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱', region: 'Europe' },
    { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱', region: 'Europe' },
    { code: 'sv', name: 'Swedish', nativeName: 'Svenska', flag: '🇸🇪', region: 'Europe' },
    { code: 'da', name: 'Danish', nativeName: 'Dansk', flag: '🇩🇰', region: 'Europe' },
    { code: 'no', name: 'Norwegian', nativeName: 'Norsk', flag: '🇳🇴', region: 'Europe' }
  ];

  const selectedLanguageData = languages.find(l => l.code === selectedLanguage) || languages[0];

  const groupedLanguages = languages.reduce((acc, language) => {
    if (!acc[language.region]) acc[language.region] = [];
    acc[language.region].push(language);
    return acc;
  }, {});

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <Globe className="h-4 w-4" />
        <span className="text-lg">{selectedLanguageData.flag}</span>
        <span className="text-sm font-medium">{selectedLanguageData.nativeName}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-72 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-xl max-h-96 overflow-y-auto">
          <div className="p-4 border-b border-gray-200 dark:border-gray-600">
            <h3 className="text-lg font-medium">Select Language</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Choose your preferred language for the interface
            </p>
          </div>

          {Object.entries(groupedLanguages).map(([region, regionLanguages]) => (
            <div key={region}>
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-gray-700/50">
                {region}
              </div>
              {regionLanguages.map(language => {
                const isSelected = language.code === selectedLanguage;
                
                return (
                  <button
                    key={language.code}
                    onClick={() => {
                      onLanguageChange(language.code);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                      isSelected ? 'bg-primary-50 dark:bg-primary-900/20 border-r-2 border-primary-500' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{language.flag}</span>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{language.nativeName}</span>
                            {isSelected && <Check className="h-4 w-4 text-primary-600" />}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{language.name}</div>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Regional Settings Component
export const RegionalSettings = ({ 
  selectedRegion, 
  onRegionChange 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const regions = [
    { code: 'US', name: 'United States', flag: '🇺🇸', currency: 'USD', language: 'en', dateFormat: 'MM/DD/YYYY' },
    { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP', language: 'en', dateFormat: 'DD/MM/YYYY' },
    { code: 'CA', name: 'Canada', flag: '🇨🇦', currency: 'CAD', language: 'en', dateFormat: 'DD/MM/YYYY' },
    { code: 'AU', name: 'Australia', flag: '🇦🇺', currency: 'AUD', language: 'en', dateFormat: 'DD/MM/YYYY' },
    { code: 'DE', name: 'Germany', flag: '🇩🇪', currency: 'EUR', language: 'de', dateFormat: 'DD.MM.YYYY' },
    { code: 'FR', name: 'France', flag: '🇫🇷', currency: 'EUR', language: 'fr', dateFormat: 'DD/MM/YYYY' },
    { code: 'ES', name: 'Spain', flag: '🇪🇸', currency: 'EUR', language: 'es', dateFormat: 'DD/MM/YYYY' },
    { code: 'IT', name: 'Italy', flag: '🇮🇹', currency: 'EUR', language: 'it', dateFormat: 'DD/MM/YYYY' },
    { code: 'JP', name: 'Japan', flag: '🇯🇵', currency: 'JPY', language: 'ja', dateFormat: 'YYYY/MM/DD' },
    { code: 'CN', name: 'China', flag: '🇨🇳', currency: 'CNY', language: 'zh', dateFormat: 'YYYY/MM/DD' },
    { code: 'KR', name: 'South Korea', flag: '🇰🇷', currency: 'KRW', language: 'ko', dateFormat: 'YYYY.MM.DD' },
    { code: 'IN', name: 'India', flag: '🇮🇳', currency: 'INR', language: 'hi', dateFormat: 'DD/MM/YYYY' },
    { code: 'BR', name: 'Brazil', flag: '🇧🇷', currency: 'BRL', language: 'pt', dateFormat: 'DD/MM/YYYY' },
    { code: 'MX', name: 'Mexico', flag: '🇲🇽', currency: 'MXN', language: 'es', dateFormat: 'DD/MM/YYYY' }
  ];

  const selectedRegionData = regions.find(r => r.code === selectedRegion) || regions[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <MapPin className="h-4 w-4" />
        <span className="text-lg">{selectedRegionData.flag}</span>
        <span className="text-sm font-medium">{selectedRegionData.name}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-xl max-h-96 overflow-y-auto">
          <div className="p-4 border-b border-gray-200 dark:border-gray-600">
            <h3 className="text-lg font-medium">Regional Settings</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Select your region for localized pricing and content
            </p>
          </div>

          {regions.map(region => {
            const isSelected = region.code === selectedRegion;
            
            return (
              <button
                key={region.code}
                onClick={() => {
                  onRegionChange(region);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                  isSelected ? 'bg-primary-50 dark:bg-primary-900/20 border-r-2 border-primary-500' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{region.flag}</span>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{region.name}</span>
                        {isSelected && <Check className="h-4 w-4 text-primary-600" />}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {region.currency} • {region.language} • {region.dateFormat}
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default {
  MultiCurrencySelector,
  MultiLanguageSelector,
  RegionalSettings
};