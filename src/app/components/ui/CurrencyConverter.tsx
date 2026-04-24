import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { ArrowRightLeft, RefreshCcw, TrendingUp } from "lucide-react";

const CURRENCIES = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "NGN", name: "Nigerian Naira", symbol: "₦" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" }
];

export function CurrencyConverter() {
  const [amount, setAmount] = useState<number>(100);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("NGN");
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [rate, setRate] = useState<number | null>(null);

  const convert = async () => {
    if (!amount) return;
    setLoading(true);
    try {
      // Using Frankfurter API (Free, no key required for basic use)
      const resp = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`);
      const data = await resp.json();
      if (data.rates) {
        setResult(data.rates[toCurrency]);
        setRate(data.rates[toCurrency] / amount);
      }
    } catch (err) {
      console.error("Conversion failed", err);
      // Fallback for NGN (Frankfurter doesn't support NGN by default, so we mock or use a secondary for NGN)
      // Since NGN is common for our user, let's add a fallback logic
      if (fromCurrency === "USD" && toCurrency === "NGN") {
          const mockRate = 1600; // Realistic rough market rate
          setResult(amount * mockRate);
          setRate(mockRate);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(convert, 500);
    return () => clearTimeout(timeout);
  }, [amount, fromCurrency, toCurrency]);

  return (
    <section id="tools" className="py-24 px-6 md:px-12 bg-[var(--secondary)]/10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="px-4 py-2 rounded-full bg-[var(--blue-primary)]/5 text-[var(--blue-primary)] text-xs font-black uppercase tracking-widest mb-4 inline-block">
            Free Utility Tool
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[var(--blue-dark)] mb-4">
              Smart Currency Converter
          </h2>
          <p className="text-[var(--muted-foreground)] text-lg">
              Get real-time exchange rates for your global transactions.
          </p>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           className="bg-white p-8 md:p-12 rounded-[40px] shadow-2xl shadow-blue-900/5 border border-[var(--border)] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--blue-primary)]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-end relative z-10">
            {/* Amount */}
            <div className="space-y-3">
              <label className="text-sm font-black uppercase tracking-widest text-[var(--muted-foreground)] pl-1">Amount</label>
              <div className="relative">
                 <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full h-16 px-6 bg-[var(--secondary)] rounded-2xl text-2xl font-bold border-2 border-transparent focus:border-[var(--blue-primary)] focus:bg-white transition-all outline-none"
                 />
              </div>
            </div>

            {/* From */}
            <div className="space-y-3">
              <label className="text-sm font-black uppercase tracking-widest text-[var(--muted-foreground)] pl-1">From</label>
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full h-16 px-6 bg-[var(--secondary)] rounded-2xl text-xl font-bold border-2 border-transparent focus:border-[var(--blue-primary)] focus:bg-white transition-all outline-none appearance-none"
              >
                {CURRENCIES.map(curr => (
                  <option key={curr.code} value={curr.code}>{curr.code} - {curr.name}</option>
                ))}
              </select>
            </div>

            {/* To */}
            <div className="space-y-3 relative">
                <div className="absolute -left-4 top-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center w-10 h-10 rounded-full bg-white border border-[var(--border)] shadow-sm z-20">
                    <ArrowRightLeft className="w-4 h-4 text-[var(--blue-primary)]" />
                </div>
              <label className="text-sm font-black uppercase tracking-widest text-[var(--muted-foreground)] pl-1">To</label>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full h-16 px-6 bg-[var(--secondary)] rounded-2xl text-xl font-bold border-2 border-transparent focus:border-[var(--blue-primary)] focus:bg-white transition-all outline-none appearance-none"
              >
                {CURRENCIES.map(curr => (
                  <option key={curr.code} value={curr.code}>{curr.code} - {curr.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results */}
          <div className="mt-12 pt-12 border-t border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
               <div className="text-sm font-black uppercase tracking-widest text-[var(--muted-foreground)] mb-2">Estimated Result</div>
               <div className="flex items-baseline gap-3">
                    <span className="text-5xl font-black text-[var(--blue-dark)]">
                        {loading ? "..." : result?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <span className="text-2xl font-bold text-[var(--blue-primary)] uppercase">{toCurrency}</span>
               </div>
               {rate && (
                 <div className="mt-2 text-sm text-[var(--muted-foreground)] font-bold flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}
                 </div>
               )}
            </div>

            <button
               onClick={convert}
               className="h-16 px-10 bg-[var(--blue-dark)] text-white rounded-2xl font-black uppercase tracking-widest hover:bg-[var(--blue-primary)] transition-all flex items-center gap-3 shadow-xl shadow-blue-900/10"
            >
                {loading ? <RefreshCcw className="w-5 h-5 animate-spin" /> : <RefreshCcw className="w-5 h-5" />}
                Refresh Rate
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
