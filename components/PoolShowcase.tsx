"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpDown } from "lucide-react";

const TOKENS = ["USDC", "USDT", "EURC"];
const TOKEN_COLOR: Record<string, string> = {
  USDC: "bg-blue-500",
  USDT: "bg-emerald-500",
  EURC: "bg-violet-500",
};

const POOL_COMPOSITION = [
  { token: "USDC", pct: 42.3, color: "bg-blue-500" },
  { token: "USDT", pct: 38.1, color: "bg-emerald-500" },
  { token: "EURC", pct: 19.6, color: "bg-violet-500" },
];

export default function PoolShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [fromToken, setFromToken] = useState("USDC");
  const [toToken, setToToken] = useState("USDT");
  const [fromAmount, setFromAmount] = useState("1000");

  const toAmount =
    fromAmount ? (parseFloat(fromAmount) * 0.9999).toFixed(2) : "";

  return (
    <section ref={ref} className="py-28 px-4 bg-[#0a0a14]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            The Stable Pool
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            Deep liquidity for USDC, USDT, and EURC on Stellar — built on
            Stabble&apos;s battle-tested AMM with institutional-grade security.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="max-w-xl mx-auto glass-card rounded-2xl overflow-hidden"
        >
          {/* Pool header */}
          <div className="p-6 border-b border-violet-900/20">
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="flex items-center mb-2">
                  {TOKENS.map((t, i) => (
                    <div
                      key={t}
                      className={`w-7 h-7 rounded-full ${TOKEN_COLOR[t]} border-2 border-[#0d0d1e] flex items-center justify-center text-xs font-bold text-white ${i > 0 ? "-ml-1.5" : ""}`}
                    >
                      {t[0]}
                    </div>
                  ))}
                  <span className="text-white font-semibold ml-2 text-sm">
                    {TOKENS.join(" · ")}
                  </span>
                </div>
                <span className="text-xs text-violet-400 bg-violet-900/30 border border-violet-800/40 px-2 py-0.5 rounded-full">
                  Stable Pool
                </span>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500">Swap fee</div>
                <div className="text-sm text-white font-medium">0.01%</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "TVL", value: "$12.4M" },
                { label: "APY", value: "4.2%" },
                { label: "24h Volume", value: "$890.5K" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-white/5 rounded-xl p-3 text-center"
                >
                  <div className="text-base font-semibold text-white">
                    {s.value}
                  </div>
                  <div className="text-xs text-gray-500">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Swap form */}
          <div className="p-6">
            <div className="flex gap-2 mb-5">
              {["Swap", "Deposit", "Withdraw"].map((t) => (
                <button
                  key={t}
                  className={`text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${
                    t === "Swap"
                      ? "bg-violet-600 text-white"
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* From */}
            <div className="bg-white/5 rounded-xl p-4 mb-2">
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span>From</span>
                <span>Balance: 5,000.00</span>
              </div>
              <div className="flex items-center gap-3">
                <select
                  value={fromToken}
                  onChange={(e) => setFromToken(e.target.value)}
                  className="bg-white/10 border border-white/10 rounded-lg px-2.5 py-1.5 text-sm font-semibold text-white"
                >
                  {TOKENS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  className="flex-1 bg-transparent text-right text-xl font-semibold text-white outline-none placeholder:text-gray-600"
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center my-2">
              <button className="w-9 h-9 rounded-lg bg-violet-900/50 border border-violet-700/50 flex items-center justify-center hover:bg-violet-800/50 transition-colors">
                <ArrowUpDown className="w-4 h-4 text-violet-400" />
              </button>
            </div>

            {/* To */}
            <div className="bg-white/5 rounded-xl p-4 mb-4">
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span>To (estimated)</span>
                <span>Balance: 0.00</span>
              </div>
              <div className="flex items-center gap-3">
                <select
                  value={toToken}
                  onChange={(e) => setToToken(e.target.value)}
                  className="bg-white/10 border border-white/10 rounded-lg px-2.5 py-1.5 text-sm font-semibold text-white"
                >
                  {TOKENS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <div className="flex-1 text-right text-xl font-semibold text-gray-400">
                  {toAmount || "0.00"}
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="bg-violet-900/10 border border-violet-900/20 rounded-xl p-3 mb-4 space-y-1.5">
              {[
                ["Slippage Tolerance", "0.01%"],
                ["Price Impact", "< 0.01%"],
                [
                  "Min. Received",
                  toAmount
                    ? `${(parseFloat(toAmount) * 0.999).toFixed(2)} ${toToken}`
                    : `0.00 ${toToken}`,
                ],
                ["Network Fee", "~0.00001 XLM"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between text-xs">
                  <span className="text-gray-500">{k}</span>
                  <span className="text-gray-300">{v}</span>
                </div>
              ))}
            </div>

            <button className="w-full bg-violet-600 hover:bg-violet-500 text-white font-semibold py-3.5 rounded-xl transition-all duration-200">
              Connect Wallet to Swap
            </button>
          </div>

          {/* Composition bar */}
          <div className="px-6 pb-6">
            <div className="text-xs text-gray-500 mb-3 font-medium">
              Pool Composition
            </div>
            <div className="space-y-2.5">
              {POOL_COMPOSITION.map((item) => (
                <div key={item.token} className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${item.color}`} />
                  <div className="flex-1 bg-white/5 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full ${item.color}`}
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-400 w-10 text-right">
                    {item.pct}%
                  </span>
                  <span className="text-xs text-gray-600 w-10">
                    {item.token}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
