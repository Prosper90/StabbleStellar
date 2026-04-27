"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowUpDown, ChevronDown } from "lucide-react";
import { useStellarWallet } from "@/hooks/useStellarWallet";

// ─── Mock data ───────────────────────────────────────────────────────────────

const TOKENS = [
  { symbol: "USDC",  color: "bg-blue-500",  balance: "5,234.50" },
  { symbol: "EURCV", color: "bg-amber-500",  balance: "3,100.00" },
  { symbol: "EURC",  color: "bg-violet-500", balance: "1,890.75" },
];

const POOL = {
  tvl: "$12,400,000",
  apy: "4.2%",
  volume24h: "$890,500",
  fee: "0.01%",
  lpSupply: "12,234,891",
  composition: [
    { token: "USDC",  amount: "$5,243,200", pct: 42.3, color: "bg-blue-500"  },
    { token: "EURCV", amount: "$4,724,640", pct: 38.1, color: "bg-amber-500" },
    { token: "EURC",  amount: "$2,432,160", pct: 19.6, color: "bg-violet-500"},
  ],
};

const RECENT_TXS = [
  { type: "Swap",     from: "1,000 USDC",              to: "999.90 EURCV",                         time: "2m ago",  addr: "GBXXX...1234" },
  { type: "Deposit",  from: "500 USDC + 500 EURCV",     to: "999.50 SBLP",                          time: "8m ago",  addr: "GCYYY...5678" },
  { type: "Swap",     from: "2,500 EURC",               to: "2,499.75 USDC",                        time: "15m ago", addr: "GDZZZ...9012" },
  { type: "Withdraw", from: "1,200 SBLP",               to: "507 USDC + 457 EURCV + 234 EURC",     time: "23m ago", addr: "GBWWW...3456" },
  { type: "Swap",     from: "300 EURCV",                to: "299.97 USDC",                          time: "31m ago", addr: "GCAAA...7890" },
];

type Tab = "swap" | "deposit" | "withdraw";

// ─── Page ────────────────────────────────────────────────────────────────────

export default function PoolPage() {
  const { address, connect, disconnect } = useStellarWallet();
  const walletConnected = !!address;
  const [tab, setTab] = useState<Tab>("swap");

  return (
    <div className="min-h-screen bg-[#08080f]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        {/* Page header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            {POOL.composition.map((c, i) => (
              <div
                key={c.token}
                className={`w-8 h-8 rounded-full ${c.color} border-2 border-[#08080f] flex items-center justify-center text-xs font-bold text-white ${i > 0 ? "-ml-3" : ""}`}
              >
                {c.token[0]}
              </div>
            ))}
            <h1 className="text-2xl font-bold text-white ml-1">
              USDC · EURCV · EURC
            </h1>
            <span className="text-xs text-violet-400 bg-violet-900/30 border border-violet-800/40 px-2.5 py-1 rounded-full">
              Stable Pool
            </span>
          </div>
          <p className="text-gray-500 text-sm">
            Provide stablecoin liquidity and earn trading fees with minimal
            impermanent loss.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* ── Left panel ───────────────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-5">
            {/* Pool stats */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-4">
                Pool Overview
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { k: "TVL",       v: POOL.tvl       },
                  { k: "APY",       v: POOL.apy       },
                  { k: "24h Volume",v: POOL.volume24h  },
                  { k: "Swap Fee",  v: POOL.fee       },
                  { k: "LP Supply", v: POOL.lpSupply  },
                  { k: "Assets",    v: "3"            },
                ].map(({ k, v }) => (
                  <div key={k} className="bg-white/5 rounded-xl p-3">
                    <div className="text-xs text-gray-500 mb-1">{k}</div>
                    <div className="text-sm font-semibold text-white">{v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pool composition */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-4">
                Pool Composition
              </h3>
              <div className="space-y-4">
                {POOL.composition.map((item) => (
                  <div key={item.token}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="flex items-center gap-1.5 text-gray-300">
                        <span className={`w-2 h-2 rounded-full ${item.color}`} />
                        {item.token}
                      </span>
                      <span className="text-gray-400">
                        {item.amount}{" "}
                        <span className="text-gray-600">({item.pct}%)</span>
                      </span>
                    </div>
                    <div className="bg-white/5 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full ${item.color} transition-all`}
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Your position */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-4">
                Your Position
              </h3>
              {walletConnected ? (
                <div className="space-y-3">
                  {[
                    { label: "LP Tokens",   value: "2,543.21 SBLP" },
                    { label: "Pool Share",  value: "0.0208%"        },
                    { label: "USDC Value",  value: "$1,077.27"      },
                    { label: "EURCV Value", value: "$970.41"        },
                    { label: "EURC Value",  value: "$498.47"        },
                    { label: "Total Value", value: "$2,546.15"      },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between text-sm">
                      <span className="text-gray-500">{label}</span>
                      <span className="text-white font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-500 text-sm mb-4">
                    Connect your wallet to see your position.
                  </p>
                  <button
                    onClick={connect}
                    className="bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-5 py-2 rounded-xl transition-colors"
                  >
                    Connect Wallet
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ── Right panel: Trade interface ──────────────────────────────── */}
          <div className="lg:col-span-3">
            <div className="glass-card rounded-2xl overflow-hidden">
              {/* Tabs */}
              <div className="flex border-b border-violet-900/20">
                {(["swap", "deposit", "withdraw"] as Tab[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`flex-1 py-4 text-sm font-medium capitalize transition-colors ${
                      tab === t
                        ? "text-white border-b-2 border-violet-500 bg-violet-900/10"
                        : "text-gray-500 hover:text-gray-300"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {tab === "swap" && (
                  <SwapTab walletConnected={walletConnected} onConnect={connect} />
                )}
                {tab === "deposit" && (
                  <DepositTab walletConnected={walletConnected} onConnect={connect} />
                )}
                {tab === "withdraw" && (
                  <WithdrawTab walletConnected={walletConnected} onConnect={connect} />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Recent transactions ───────────────────────────────────────── */}
        <div className="mt-8 glass-card rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-violet-900/20">
            <h3 className="text-lg font-semibold text-white">
              Recent Transactions
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-violet-900/10">
                  {["Type", "From", "To", "Time", "Wallet"].map((h) => (
                    <th key={h} className="px-6 py-3 text-left text-xs text-gray-600 font-medium whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {RECENT_TXS.map((tx, i) => (
                  <tr key={i} className="border-b border-violet-900/10 hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        tx.type === "Swap"
                          ? "bg-blue-900/30 text-blue-400"
                          : tx.type === "Deposit"
                          ? "bg-emerald-900/30 text-emerald-400"
                          : "bg-orange-900/30 text-orange-400"
                      }`}>
                        {tx.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">{tx.from}</td>
                    <td className="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">{tx.to}</td>
                    <td className="px-6 py-4 text-xs text-gray-500 whitespace-nowrap">{tx.time}</td>
                    <td className="px-6 py-4 text-xs text-gray-600 font-mono whitespace-nowrap">{tx.addr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// ─── Shared helpers ───────────────────────────────────────────────────────────

function TokenSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-white/10 border border-white/10 rounded-xl pl-3 pr-8 py-2 text-sm font-semibold text-white cursor-pointer focus:outline-none focus:border-violet-500 transition-colors"
      >
        {TOKENS.map((t) => (
          <option key={t.symbol} value={t.symbol}>{t.symbol}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-xs">
      <span className="text-gray-500">{label}</span>
      <span className="text-gray-300">{value}</span>
    </div>
  );
}

// ─── Swap tab ─────────────────────────────────────────────────────────────────

function SwapTab({ walletConnected, onConnect }: { walletConnected: boolean; onConnect: () => void }) {
  const [fromToken, setFromToken] = useState("USDC");
  const [toToken, setToToken]     = useState("EURCV");
  const [fromAmount, setFromAmount] = useState("");

  const fromBal   = TOKENS.find((t) => t.symbol === fromToken)?.balance ?? "0.00";
  const toBal     = TOKENS.find((t) => t.symbol === toToken)?.balance   ?? "0.00";
  const toAmount  = fromAmount ? (parseFloat(fromAmount) * 0.9999).toFixed(2) : "";
  const fee       = fromAmount ? (parseFloat(fromAmount) * 0.0001).toFixed(4) : "0.0000";
  const minRcvd   = toAmount   ? (parseFloat(toAmount)   * 0.999 ).toFixed(2) : "0.00";

  const handleFlip = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
  };

  return (
    <div>
      {/* From */}
      <div className="bg-white/5 rounded-xl p-4 mb-2">
        <div className="flex justify-between text-xs text-gray-500 mb-3">
          <span>From</span>
          <span>Balance: {walletConnected ? fromBal : "—"}</span>
        </div>
        <div className="flex items-center gap-3">
          <TokenSelect value={fromToken} onChange={setFromToken} />
          <input
            type="number"
            value={fromAmount}
            onChange={(e) => setFromAmount(e.target.value)}
            className="flex-1 bg-transparent text-right text-2xl font-semibold text-white outline-none placeholder:text-gray-700"
            placeholder="0.00"
            min="0"
          />
        </div>
        {walletConnected && !fromAmount && (
          <button
            onClick={() => setFromAmount(fromBal.replace(/,/g, ""))}
            className="text-xs text-violet-400 hover:text-violet-300 mt-2 block ml-auto"
          >
            MAX
          </button>
        )}
      </div>

      {/* Flip */}
      <div className="flex justify-center my-3">
        <button
          onClick={handleFlip}
          className="w-10 h-10 rounded-xl bg-violet-900/50 border border-violet-700/50 flex items-center justify-center hover:bg-violet-700/50 hover:scale-110 transition-all"
        >
          <ArrowUpDown className="w-4 h-4 text-violet-400" />
        </button>
      </div>

      {/* To */}
      <div className="bg-white/5 rounded-xl p-4 mb-4">
        <div className="flex justify-between text-xs text-gray-500 mb-3">
          <span>To (estimated)</span>
          <span>Balance: {walletConnected ? toBal : "—"}</span>
        </div>
        <div className="flex items-center gap-3">
          <TokenSelect value={toToken} onChange={setToToken} />
          <div className="flex-1 text-right text-2xl font-semibold text-gray-400">
            {toAmount || "0.00"}
          </div>
        </div>
      </div>

      {fromAmount && (
        <div className="bg-violet-900/10 border border-violet-900/20 rounded-xl p-3 mb-4 space-y-1.5">
          <InfoRow label="Rate"          value={`1 ${fromToken} ≈ 0.9999 ${toToken}`} />
          <InfoRow label="Price Impact"  value="< 0.01%"                               />
          <InfoRow label="Fee (0.01%)"   value={`${fee} ${fromToken}`}                 />
          <InfoRow label="Min. Received" value={`${minRcvd} ${toToken}`}               />
          <InfoRow label="Network Fee"   value="~0.00001 XLM"                          />
        </div>
      )}

      <button
        onClick={!walletConnected ? onConnect : undefined}
        className="w-full bg-violet-600 hover:bg-violet-500 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 disabled:opacity-40"
        disabled={walletConnected && !fromAmount}
      >
        {!walletConnected ? "Connect Wallet" : !fromAmount ? "Enter an Amount" : "Swap Now"}
      </button>
    </div>
  );
}

// ─── Deposit tab ──────────────────────────────────────────────────────────────

function DepositTab({ walletConnected, onConnect }: { walletConnected: boolean; onConnect: () => void }) {
  const [amounts, setAmounts] = useState(["", "", ""]);

  const update = (i: number, v: string) => {
    const next = [...amounts];
    next[i] = v;
    setAmounts(next);
  };

  const total      = amounts.reduce((s, a) => s + (parseFloat(a) || 0), 0);
  const lpEstimate = total > 0 ? (total * 0.9995).toFixed(2) : "0.00";
  const poolShare  = total > 0 ? ((total / 12_400_000) * 100).toFixed(5) : "0.00000";

  return (
    <div>
      <p className="text-sm text-gray-400 mb-5">
        Deposit any combination of stablecoins. You receive SBLP tokens representing your pool share.
      </p>

      {TOKENS.map((token, i) => (
        <div key={token.symbol} className="bg-white/5 rounded-xl p-4 mb-3">
          <div className="flex justify-between text-xs text-gray-500 mb-3">
            <span>{token.symbol}</span>
            <span>Balance: {walletConnected ? token.balance : "—"}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full ${token.color} flex items-center justify-center text-xs font-bold text-white flex-shrink-0`}>
              {token.symbol[0]}
            </div>
            <input
              type="number"
              value={amounts[i]}
              onChange={(e) => update(i, e.target.value)}
              className="flex-1 bg-transparent text-right text-xl font-semibold text-white outline-none placeholder:text-gray-700"
              placeholder="0.00"
              min="0"
            />
          </div>
        </div>
      ))}

      {total > 0 && (
        <div className="bg-violet-900/10 border border-violet-900/20 rounded-xl p-3 mb-4 space-y-1.5">
          <InfoRow label="Total Deposit Value" value={`$${total.toFixed(2)}`}  />
          <InfoRow label="LP Tokens (SBLP)"    value={`~${lpEstimate}`}        />
          <InfoRow label="Pool Share"           value={`~${poolShare}%`}       />
          <InfoRow label="Price Impact"         value="< 0.01%"                />
          <InfoRow label="Network Fee"          value="~0.00001 XLM"           />
        </div>
      )}

      <button
        onClick={!walletConnected ? onConnect : undefined}
        className="w-full bg-violet-600 hover:bg-violet-500 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 disabled:opacity-40"
        disabled={walletConnected && total === 0}
      >
        {!walletConnected ? "Connect Wallet" : total === 0 ? "Enter Amounts" : "Deposit Liquidity"}
      </button>
    </div>
  );
}

// ─── Withdraw tab ─────────────────────────────────────────────────────────────

function WithdrawTab({ walletConnected, onConnect }: { walletConnected: boolean; onConnect: () => void }) {
  const [lpAmount, setLpAmount] = useState("");
  const userLp = "2,543.21";

  const amount = parseFloat(lpAmount) || 0;
  const usdc  = (amount * 0.423).toFixed(2);
  const eurcv = (amount * 0.381).toFixed(2);
  const eurc  = (amount * 0.196).toFixed(2);

  return (
    <div>
      <p className="text-sm text-gray-400 mb-5">
        Burn SBLP tokens to receive USDC, EURCV, and EURC proportional to the pool composition.
      </p>

      <div className="bg-white/5 rounded-xl p-4 mb-4">
        <div className="flex justify-between text-xs text-gray-500 mb-3">
          <span>SBLP — Stabble LP Token</span>
          <span>Balance: {walletConnected ? userLp : "—"}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white/10 border border-white/10 rounded-xl px-3 py-2 text-sm font-semibold text-white flex-shrink-0">
            SBLP
          </div>
          <input
            type="number"
            value={lpAmount}
            onChange={(e) => setLpAmount(e.target.value)}
            className="flex-1 bg-transparent text-right text-2xl font-semibold text-white outline-none placeholder:text-gray-700"
            placeholder="0.00"
            min="0"
          />
        </div>
        {walletConnected && (
          <button
            onClick={() => setLpAmount(userLp.replace(",", ""))}
            className="text-xs text-violet-400 hover:text-violet-300 mt-2 block ml-auto"
          >
            MAX
          </button>
        )}
      </div>

      {amount > 0 && (
        <>
          <div className="text-xs text-gray-500 mb-2">You will receive (estimated):</div>
          <div className="space-y-2 mb-4">
            {[
              { token: "USDC",  amount: usdc,  color: "bg-blue-500"  },
              { token: "EURCV", amount: eurcv, color: "bg-amber-500" },
              { token: "EURC",  amount: eurc,  color: "bg-violet-500"},
            ].map((item) => (
              <div key={item.token} className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full ${item.color} flex items-center justify-center text-xs font-bold text-white`}>
                    {item.token[0]}
                  </div>
                  <span className="text-sm text-gray-300">{item.token}</span>
                </div>
                <span className="text-sm font-semibold text-white">{item.amount}</span>
              </div>
            ))}
          </div>
          <div className="bg-violet-900/10 border border-violet-900/20 rounded-xl p-3 mb-4 space-y-1.5">
            <InfoRow label="Total Value"   value={`~$${(amount * 1.0012).toFixed(2)}`} />
            <InfoRow label="Price Impact"  value="< 0.01%"                              />
            <InfoRow label="Network Fee"   value="~0.00001 XLM"                         />
          </div>
        </>
      )}

      <button
        onClick={!walletConnected ? onConnect : undefined}
        className="w-full bg-violet-600 hover:bg-violet-500 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 disabled:opacity-40"
        disabled={walletConnected && amount === 0}
      >
        {!walletConnected ? "Connect Wallet" : amount === 0 ? "Enter Amount" : "Withdraw Liquidity"}
      </button>
    </div>
  );
}
