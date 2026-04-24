import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { ArrowRightLeft, RefreshCcw, TrendingUp, Info } from "lucide-react";

const CURRENCIES = [
  { code: "usd", name: "US Dollar", symbol: "$" },
  { code: "eur", name: "Euro", symbol: "€" },
  { code: "gbp", name: "British Pound", symbol: "£" },
  { code: "ngn", name: "Nigerian Naira", symbol: "₦" },
  { code: "ghs", name: "Ghanaian Cedi", symbol: "₵" },
  { code: "zar", name: "SA Rand", symbol: "R" },
  { code: "cad", name: "Canadian Dollar", symbol: "C$" },
  { code: "aud", name: "Australian Dollar", symbol: "A$" },
  { code: "jpy", name: "Japanese Yen", symbol: "¥" },
  { code: "cny", name: "Chinese Yuan", symbol: "¥" }
];

export function CurrencyConverter() {
  const [amount, setAmount] = useState<number>(1000);
  const [fromCurrency, setFromCurrency] = useState("usd");
  const [toCurrency, setToCurrency] = useState("ngn");
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [rate, setRate] = useState<number | null>(null);

  const convert = async () => {
    if (!amount) return;
    setLoading(true);
    try {
      // Using the more comprehensive Fawaz Ahmed Currency API
      const resp = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency}.json`);
      const data = await resp.json();
      
      const currentRate = data[fromCurrency][toCurrency];
      if (currentRate) {
        setResult(amount * currentRate);
        setRate(currentRate);
      }
    } catch (err) {
      console.error("Conversion failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(convert, 500);
    return () => clearTimeout(timeout);
  }, [amount, fromCurrency, toCurrency]);

  const swapCurrencies = () => {
      const temp = fromCurrency;
      setFromCurrency(toCurrency);
      setToCurrency(temp);
  };

  return (
    <div className="max-w-2xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="bg-white p-6 md:p-8 rounded-[32px] shadow-2xl shadow-blue-900/10 border border-[var(--border)] relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--blue-primary)]/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--blue-primary)] flex items-center justify-center text-white shadow-lg shadow-blue-900/20">
                    <RefreshCcw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                </div>
                <div>
                    <h3 className="text-lg font-black text-[var(--blue-dark)] leading-none mb-1">Currency Converter</h3>
                    <p className="text-[10px] font-bold text-[var(--muted-foreground)] uppercase tracking-widest">Real-time exchange rates</p>
                </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-[var(--secondary)] flex items-center justify-center text-[var(--muted-foreground)] opacity-50">
                <Info className="w-4 h-4" />
            </div>
        </div>

        <div className="space-y-4">
            {/* Amount Input */}
            <div className="relative group/input">
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    placeholder="Enter amount"
                    className="w-full h-14 pl-6 pr-16 bg-[var(--secondary)]/50 rounded-2xl text-xl font-bold border-2 border-transparent focus:border-[var(--blue-primary)] focus:bg-white transition-all outline-none"
                />
                <div className="absolute right-6 top-1/2 -translate-y-1/2 text-sm font-black text-[var(--muted-foreground)] uppercase">
                    {fromCurrency}
                </div>
            </div>

            {/* Selectors Row */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
                <select
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                    className="flex-1 w-full h-14 px-4 bg-[var(--secondary)]/50 rounded-2xl text-sm font-bold border-2 border-transparent focus:border-[var(--blue-primary)] focus:bg-white transition-all outline-none appearance-none cursor-pointer"
                >
                    {CURRENCIES.map(curr => (
                        <option key={curr.code} value={curr.code}>{curr.code.toUpperCase()} — {curr.name}</option>
                    ))}
                </select>

                <button 
                  onClick={swapCurrencies}
                  className="w-12 h-12 rounded-xl bg-white border border-[var(--border)] flex items-center justify-center text-[var(--blue-primary)] hover:bg-[var(--blue-primary)] hover:text-white transition-all shadow-sm active:scale-90"
                >
                    <ArrowRightLeft className="w-5 h-5" />
                </button>

                <select
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                    className="flex-1 w-full h-14 px-4 bg-[var(--secondary)]/50 rounded-2xl text-sm font-bold border-2 border-transparent focus:border-[var(--blue-primary)] focus:bg-white transition-all outline-none appearance-none cursor-pointer"
                >
                    {CURRENCIES.map(curr => (
                        <option key={curr.code} value={curr.code}>{curr.code.toUpperCase()} — {curr.name}</option>
                    ))}
                </select>
            </div>
        </div>

        {/* Result Area */}
        <div className="mt-8 p-6 rounded-2xl bg-[var(--blue-dark)] text-white relative items-center justify-between flex">
            <div className="relative z-10">
                <div className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-1">Result</div>
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black">
                        {loading ? "..." : result?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <span className="text-sm font-bold opacity-70 uppercase">{toCurrency}</span>
                </div>
            </div>
            
            {rate && (
                <div className="text-right flex flex-col items-end">
                    <div className="flex items-center gap-1 text-green-400 font-bold text-xs mb-1">
                        <TrendingUp className="w-3 h-3" />
                        Live Rate
                    </div>
                    <div className="text-[10px] font-mono text-white/40">
                        1 {fromCurrency.toUpperCase()} = {rate.toFixed(4)} {toCurrency.toUpperCase()}
                    </div>
                </div>
            )}
        </div>
      </motion.div>
    </div>
  );
}
